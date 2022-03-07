import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import LoadingSpinner from '../UI/LoadingSpinner';

const TableCategories: React.FC<{
  categories: any;
  renderProducts: (categoryId: string) => void;
}> = ({ categories, renderProducts }) => {
  const [currentCategories, setCurrentCategories] = useState(categories);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<any>([{ name: 'All', id: '' }]);

  const { token } = useSelector((state: any) => state.auth);
  const { baseUrl } = useSelector((state: any) => state.api);

  const showCategoryHandler = async (categoryId: string) => {
    const getCategory = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${baseUrl}/categories/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { data } = await response.json();
        renderProducts(categoryId);

        if (!categoryId) {
          setHistory([{ name: 'All', id: '' }]);
          renderProducts('');
        }

        const existingCategory = history.find(
          (category: any) => category.id === categoryId
        );

        if (existingCategory && categoryId !== '') {
          const newHistory = history.slice(0, history.indexOf(existingCategory) + 1);

          setHistory(newHistory);
          setCurrentCategories(data.subcategories);
          setIsLoading(false);
          return;
        }

        setIsLoading(false);

        return data;
      } catch (error) {
        setIsLoading(false);

        throw error;
      }
    };

    const data = await getCategory();

    if (data) {
      const { subcategories } = data;

      if (subcategories && subcategories.length > 0) {
        const newHistory = history;
        newHistory.push({
          name: data.name,
          id: data.id
        });

        setHistory(newHistory);

        setCurrentCategories(subcategories);
      } else if (Array.isArray(data)) {
        setCurrentCategories(data);
      }
    }
  };

  return (
    <div>
      <div>
        <div className="flex">
          {history.map((item: any) => (
            <div key={item.id} className="flex">
              <button
                onClick={() => showCategoryHandler(item.id)}
                className="underline text-primary mx-2"
              >
                {item.name}
              </button>
              <p>/</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex mt-3 flex-wrap">
        {isLoading && <LoadingSpinner />}
        {!isLoading &&
          currentCategories.map((category: any) => (
            <button
              onClick={() => showCategoryHandler(category.id)}
              className="m-2 flex items-center justify-center border-[1px] border-gray-500 rounded-md p-2 text-gray-500 shadow-md hover:bg-gray-500 hover:text-white duration-300"
              key={category.id}
            >
              {category.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default TableCategories;
