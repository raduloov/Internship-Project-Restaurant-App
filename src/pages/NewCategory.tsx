import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import ErrorText from '../components/ErrorText';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { uiActions } from '../store/ui-slice';

const NewCategory = () => {
  const [enteredName, setEnteredName] = useState<string>('');
  const [selectedParent, setSelectedParent] = useState<string>('None');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();

  const { token } = useSelector((state: any) => state.auth);
  const { baseUrl, categories } = useSelector((state: any) => state.api);

  const createCategory = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/categories`, {
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
      setSelectedParent('None');

      dispatch(uiActions.toggleSuccessModal('Category added'));
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  const createCategoryHandler = async () => {
    setError('');

    if (enteredName.length > 100 || enteredName.trim().length === 0) {
      setError('Name is required and must not exceed 100 characters!');
      return;
    }

    const data = {
      name: enteredName,
      parentId: selectedParent === 'None' ? null : selectedParent
    };

    createCategory(data);
  };

  return (
    <div className="flex flex-col">
      <div className="text-gray-500 mb-3">
        <p>
          <Link
            to="/categories"
            className="text-primary underline-offset-2 underline"
          >
            Categories
          </Link>{' '}
          / Add a new category
        </p>
      </div>
      <Card title="Add a new category" className="w-[500px]">
        <div className="flex flex-col mt-3">
          <label htmlFor="category">Category</label>
          <Input
            type="text"
            id="category"
            placeholder="Category name"
            onChange={(event: any) => setEnteredName(event.target.value)}
            value={enteredName}
          />
        </div>
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <>
            <div className="flex flex-col mt-4">
              <label htmlFor="parent-category">Parent Category</label>
              <select
                className="border-2 border-gray-300 rounded-md p-1 outline-primary"
                id="category"
                onChange={event => setSelectedParent(event.target.value)}
                value={selectedParent}
              >
                <option value="none">None</option>
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
            {error && <ErrorText error={error} />}
            <div className="flex justify-end mt-4">
              <Button
                className="text-primary border-primary hover:bg-primary"
                onClick={createCategoryHandler}
              >
                Save
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default NewCategory;
