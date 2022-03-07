import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import CategoryTree from '../components/CategoryTree';
import { apiActions } from '../store/api-slice';
import { uiActions } from '../store/ui-slice';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string>('');

  const { token } = useSelector((state: any) => state.auth);
  const { baseUrl, confirmDeleteCategory } = useSelector((state: any) => state.api);

  const dispatch = useDispatch();

  const deleteCategoryHandler = (categoryId: string) => {
    dispatch(uiActions.toggleConfirmDeleteModal('category'));
    setIdToDelete(categoryId);
  };

  const getCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      setCategories(data.data);
      dispatch(apiActions.setCategories(data.data));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      throw error;
    }
  }, [baseUrl, dispatch, token]);

  useEffect(() => {
    if (confirmDeleteCategory) {
      const deleteCategory = async () => {
        try {
          const response = await fetch(`${baseUrl}/categories/${idToDelete}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const data = await response.json();

          if (
            data.messages &&
            data.messages[0] === 'There should be no products when deleting category'
          ) {
            dispatch(
              uiActions.toggleErrorModal(
                'This category has products attached. Cannot delete!'
              )
            );
            return;
          }
        } catch (error) {
          throw error;
        }
      };

      deleteCategory();
      dispatch(apiActions.confirmDeleteCategory());

      // Rerender the categories after a brief pause so the new data will have time to be updated
      setTimeout(() => {
        getCategories();
      }, 500);
    }
  }, [baseUrl, confirmDeleteCategory, idToDelete, token, dispatch, getCategories]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Card
      title="Categories"
      button="Add a new category"
      to="new-category"
      className="w-[1350px]"
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <CategoryTree data={categories} onDelete={deleteCategoryHandler} />
      )}
    </Card>
  );
};

export default Categories;
