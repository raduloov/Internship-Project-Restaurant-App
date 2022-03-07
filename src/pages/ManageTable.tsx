import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { uiActions } from '../store/ui-slice';
import { apiActions } from '../store/api-slice';
import ProductItem from '../components/Items/ProductItem';
import TableCategories from '../components/Items/TableCategories';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import CurrentOrderItems from '../components/Items/CurrentOrderItems';

const ManageTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [tableInfo, setTableInfo] = useState<any>({});
  const [orderInfo, setOrderInfo] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { baseUrl, categories, confirmDeleteOrder } = useSelector(
    (state: any) => state.api
  );
  const { token } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { tableId } = useParams();

  const getProducts = useCallback(
    async (categoryId: string) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${baseUrl}/products?PageSize=6&Page=${currentPage}&${
            categoryId !== '' && `CategoryId=${categoryId}`
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const data = await response.json();

        setProducts(data.items);
        setTotalProducts(data.totalCount);
        setIsLoading(false);
      } catch (error) {
        throw error;
      }
    },
    [baseUrl, token, currentPage]
  );

  useEffect(() => {
    getProducts('');
  }, [getProducts]);

  useEffect(() => {
    const getTableInfo = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${baseUrl}/tables/${tableId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();

        setTableInfo(data);

        if (data.order) {
          setSelectedProducts(data.order.products);
          setOrderInfo(data.order);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    };

    getTableInfo();
  }, [baseUrl, token, tableId]);

  const selectProductHandler = useCallback(
    async (productId: string) => {
      try {
        const response = await fetch(`${baseUrl}/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const { data } = await response.json();

        const existingProduct = selectedProducts.find(
          (product: any) => product.id === productId
        );

        let newProducts;
        if (!existingProduct) {
          newProducts = [
            ...selectedProducts,
            {
              id: data.id,
              name: data.name,
              description: data.description,
              categoryId: data.categoryId,
              category: data.category,
              price: data.price,
              quantity: 1
            }
          ];

          setSelectedProducts(newProducts);
        } else {
          existingProduct.quantity++;
          const filteredProducts = selectedProducts.filter(
            (product: any) => product.id !== productId
          );
          newProducts = [...filteredProducts, existingProduct];
        }
      } catch (error) {
        throw error;
      }
    },
    [baseUrl, selectedProducts, token]
  );

  const deleteProductHandler = (productId: number) => {
    const filteredProducts = selectedProducts.filter(
      (product: any) => product.id !== productId
    );

    setSelectedProducts(filteredProducts);
  };

  const editOrder = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/orders/${orderInfo.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        dispatch(uiActions.toggleErrorModal('Something went wrong :c'));
        setIsLoading(false);
        return;
      }

      setIsLoading(false);

      dispatch(uiActions.toggleSuccessModal('Order updated'));
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  // Save functionality does not work since API always returns an error
  const saveOrderHandler = () => {
    const data = {
      ...orderInfo,
      tableId: tableId,
      products: selectedProducts
    };

    editOrder(data);
  };

  const completeOrderHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/orders/${orderInfo.id}/complete`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        dispatch(uiActions.toggleErrorModal('Something went wrong :c'));
        setIsLoading(false);
        return;
      }

      dispatch(uiActions.toggleSuccessModal('Order completed'));
      setIsLoading(false);
      return navigate(`/orders/${orderInfo.id}`);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const confirmDeleteOrderHandler = () => {
    dispatch(uiActions.toggleConfirmDeleteModal('order'));
  };

  useEffect(() => {
    if (confirmDeleteOrder) {
      const deleteUser = async () => {
        try {
          await fetch(`${baseUrl}/orders/${orderInfo.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        } catch (error) {
          throw error;
        }
      };

      deleteUser();
      dispatch(apiActions.confirmDelete('order'));
      return navigate('/tables');
    }
  }, [baseUrl, orderInfo.id, confirmDeleteOrder, token, dispatch, navigate]);

  // Change page
  const paginate = (pageNumber: number | string) => {
    if (typeof pageNumber === 'number') {
      setCurrentPage(pageNumber);
      getProducts('');
    } else if (pageNumber === 'prev' && currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    } else if (pageNumber === 'next' && currentPage < Math.ceil(totalProducts / 6)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="w-[1500px]">
      <div>
        <h2 className="text-3xl">Table #{tableInfo.id}</h2>
        <div className="flex justify-between mt-2">
          <p>Capacity: {tableInfo.capacity}</p>
          <p>Waiter: {tableInfo.order ? tableInfo.order.userName : 'N/A'}</p>
        </div>
      </div>
      <div className="flex border-2 border-gray-200 rounded-md p-4 shadow-md justify-between mt-3">
        <div className="w-2/3">
          <TableCategories categories={categories} renderProducts={getProducts} />
          <div className="mt-3">
            <p className="text-2xl">Products</p>
            <div className="flex flex-wrap">
              {isLoading && <LoadingSpinner />}
              {!isLoading &&
                products &&
                products.map((product: any) => (
                  <ProductItem
                    onSelect={selectProductHandler}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    key={product.id}
                  />
                ))}
            </div>
            <Pagination
              totalPages={Math.ceil(totalProducts / 6)}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        </div>
        <div className="w-1/3">
          <CurrentOrderItems
            isLoading={isLoading}
            selectedProducts={selectedProducts}
            onSaveOrder={saveOrderHandler}
            onDeleteProduct={deleteProductHandler}
            onCompleteOrder={completeOrderHandler}
            onDiscardOrder={confirmDeleteOrderHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageTable;
