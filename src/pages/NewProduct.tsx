import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import { uiActions } from '../store/ui-slice';
import ErrorText from '../components/ErrorText';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const NewProduct = () => {
  const [enteredName, setEnteredName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('none');
  const [enteredDescription, setEnteredDescription] = useState<string>('');
  const [enteredPrice, setEnteredPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();

  const { token } = useSelector((state: any) => state.auth);
  const { baseUrl, categories } = useSelector((state: any) => state.api);

  const createProduct = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/products`, {
        method: 'POST',
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

      setEnteredName('');
      setSelectedCategory('none');

      dispatch(uiActions.toggleSuccessModal('Product added'));
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  const createProductHandler = async () => {
    setError('');

    if (enteredName.length > 100 || enteredName.trim().length === 0) {
      setError('Name is required and must not exceed 100 characters!');
      return;
    }
    if (selectedCategory === 'none') {
      setError('Selecting a category is required!');
      return;
    }
    if (enteredDescription.length > 100) {
      setError('The product description must not exceed 500 characters!');
      return;
    }
    if (enteredPrice === 0) {
      setError('Price is required!');
      return;
    }

    const data = {
      name: enteredName,
      description: enteredDescription,
      categoryId: selectedCategory,
      price: enteredPrice
    };

    createProduct(data);
  };

  return (
    <div className="flex flex-col">
      <div className="text-gray-500 mb-3">
        <p>
          <Link to="/products" className="text-primary underline-offset-2 underline">
            Products
          </Link>{' '}
          / Add a new product
        </p>
      </div>
      <Card title="Add a new product" className="w-[500px]">
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <>
            <div className="flex flex-col mt-3">
              <label htmlFor="product">Product</label>
              <Input
                type="text"
                id="product"
                placeholder="Product name"
                onChange={(event: any) => setEnteredName(event.target.value)}
                value={enteredName}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className="border-2 border-gray-300 rounded-md p-1 outline-primary"
                onChange={event => setSelectedCategory(event.target.value)}
                value={selectedCategory}
              >
                <option value="none">Select a category</option>
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
            <div className="flex flex-col mt-5">
              <label htmlFor="description">Description</label>
              <textarea
                className="resize-none border-2 border-gray-300 rounded-md p-1 outline-primary"
                placeholder="Product description"
                maxLength={500}
                onChange={(event: any) => setEnteredDescription(event.target.value)}
                value={enteredDescription}
              />
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="price">Price</label>
              <div className="flex items-center">
                <Input
                  type="number"
                  id="price"
                  className="w-full rounded-tr-none rounded-br-none border-r-0"
                  min={0}
                  required
                  onChange={(event: any) => setEnteredPrice(event.target.value)}
                  value={enteredPrice}
                />
                <div className="flex items-center border-2 border-gray-300 rounded-tr-md rounded-br-md h-full bg-gray-200 p-1">
                  <p>BGN</p>
                </div>
              </div>
            </div>
          </>
        )}
        {error && <ErrorText error={error} />}
        <div className="flex justify-end mt-4">
          <Button
            className="text-primary border-primary hover:bg-primary"
            onClick={createProductHandler}
          >
            Save
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NewProduct;
