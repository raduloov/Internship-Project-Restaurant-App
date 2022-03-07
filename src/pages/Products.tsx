import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uiActions } from '../store/ui-slice';
import { apiActions } from '../store/api-slice';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ProductRow from '../components/Items/ProductRow';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(20);
  const [sortByName, setSortByName] = useState<string | null>('asc');
  const [sortByCategory, setSortByCategory] = useState<string | null>(null);
  const [idToDelete, setIdToDelete] = useState<string>('');

  const dispatch = useDispatch();

  const { baseUrl } = useSelector((state: any) => state.api);
  const { token } = useSelector((state: any) => state.auth);
  const { categories, confirmDeleteProduct } = useSelector(
    (state: any) => state.api
  );

  const confirmDeleteProductHandler = (productId: string) => {
    dispatch(uiActions.toggleConfirmDeleteModal('product'));
    setIdToDelete(productId);
  };

  const getProducts = useCallback(
    async (categoryId = '', sortBy = '', sortDirection = 'Asc') => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${baseUrl}/products?${
            categoryId !== '' && `CategoryId=${categoryId}`
          }&Page=${currentPage}&PageSize=20&SortBy=${sortBy}&SortDirection=${sortDirection}`,
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
    if (confirmDeleteProduct) {
      const deleteProduct = async () => {
        try {
          await fetch(
            `https://devcamp-2022-1-restaurant.azurewebsites.net/api/products/${idToDelete}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
        } catch (error) {
          throw error;
        }
      };

      deleteProduct();
      dispatch(apiActions.confirmDeleteProduct());

      // Rerender the users after a brief pause so the new data will have time to be updated
      setTimeout(() => {
        getProducts();
      }, 500);
    }
  }, [confirmDeleteProduct, idToDelete, token, dispatch, getProducts]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const showForCategoryHandler = () => {
    if (selectedCategory === 'all') {
      getProducts();
    } else {
      getProducts(selectedCategory);
    }
  };

  const sortByNameHandler = () => {
    setSortByCategory(null);

    if (sortByName === 'asc') {
      setSortByName('desc');
      getProducts('', '', 'desc');
    } else {
      setSortByName('asc');
      getProducts();
    }
  };

  const sortByCategoryHandler = () => {
    setSortByName(null);

    if (sortByCategory === 'asc') {
      setSortByCategory('desc');
      getProducts('', 'category', 'desc');
    } else {
      setSortByCategory('asc');
      getProducts('', 'category');
    }
  };

  // Change page
  const paginate = (pageNumber: number | string) => {
    if (typeof pageNumber === 'number') {
      setCurrentPage(pageNumber);
      getProducts();
    } else if (pageNumber === 'prev' && currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    } else if (
      pageNumber === 'next' &&
      currentPage < Math.ceil(totalProducts / productsPerPage)
    ) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <Card
      title="Products"
      button="Add a new product"
      to="new-product"
      className="w-[1350px]"
    >
      <div className="flex justify-between mb-4">
        <div className="flex flex-col w-full pr-5">
          <label htmlFor="product-name">Product</label>
          <Input
            type="text"
            id="product-name"
            placeholder="Product name"
            className="mt-2"
          />
        </div>
        <div className="flex flex-col w-full pr-5">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            className="border-2 border-gray-300 rounded-md p-1 outline-primary mt-2"
            onChange={event => setSelectedCategory(event.target.value)}
            value={selectedCategory}
          >
            <option value="all">All</option>
            {categories.map(function rc(category: any) {
              if (category.subcategories.length === 0) {
                return (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                );
              }

              return category.subcategories.map(rc);
            })}
          </select>
        </div>
        <div className="flex items-center w-full">
          <Button
            onClick={showForCategoryHandler}
            className="text-primary border-primary hover:bg-primary mt-4 h-10"
          >
            <i className="fa-solid fa-filter"></i> Filter
          </Button>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 2fr 2fr',
          gridTemplateRows: '1fr',
          borderBottom: '1px solid black',
          padding: 5
        }}
      >
        <div>
          <button onClick={sortByNameHandler} className="font-bold pl-2">
            Name{' '}
            {sortByName ? (
              sortByName === 'asc' ? (
                <i className="fa-solid fa-sort-up"></i>
              ) : (
                <i className="fa-solid fa-sort-down"></i>
              )
            ) : (
              <i className="fa-solid fa-sort"></i>
            )}
          </button>
        </div>
        <div>
          <button onClick={sortByCategoryHandler} className="font-bold">
            Category{' '}
            {sortByCategory ? (
              sortByCategory === 'asc' ? (
                <i className="fa-solid fa-sort-up"></i>
              ) : (
                <i className="fa-solid fa-sort-down"></i>
              )
            ) : (
              <i className="fa-solid fa-sort"></i>
            )}
          </button>
        </div>
        <div className="flex justify-end">
          <p className="font-bold">Price</p>
        </div>
      </div>
      <div className="border-b-2 border-gray-200 mb-5">
        {isLoading && <LoadingSpinner />}
        {products.map((product: any) => (
          <ProductRow
            onDelete={confirmDeleteProductHandler}
            name={product.name}
            category={product.category}
            price={product.price}
            productId={product.id}
            key={product.id}
          />
        ))}
      </div>
      <Pagination
        totalPages={Math.ceil(totalProducts / productsPerPage)}
        currentPage={currentPage}
        paginate={paginate}
      />
    </Card>
  );
};

export default Products;
