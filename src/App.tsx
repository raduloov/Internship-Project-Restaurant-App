import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { authActions } from './store/auth-slice';
import { apiActions } from './store/api-slice';
import Layout from './layout/Layout';
import Login from './pages/auth/Login';
import Profile from './pages/Profile';
import Tables from './pages/Tables';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Users from './pages/Users';
import Categories from './pages/Categories';
import NewProduct from './pages/NewProduct';
import NewCategory from './pages/NewCategory';
import NewUser from './pages/NewUser';
import EditUser from './pages/EditUser';
import ManageTable from './pages/ManageTable';
import ProtectedRoute from './pages/auth/ProtectedRoute';
import EditCategory from './pages/EditCategory';
import EditProduct from './pages/EditProduct';
import ManageOrder from './pages/ManageOrder';
import ViewOrder from './pages/ViewOrder';
import SuccessModal from './components/Modal/SuccessModal';
import ConfirmDeleteModal from './components/Modal/ConfirmDelete';
import ErrorModal from './components/Modal/ErrorModal';

function App() {
  const { isLoggedIn, token } = useSelector((state: any) => state.auth);
  const {
    errorType,
    successType,
    deleteType,
    showErrorModal,
    showSuccessModal,
    showConfirmDeleteModal
  } = useSelector((state: any) => state.ui);
  const { baseUrl } = useSelector((state: any) => state.api);

  const dispatch = useDispatch();

  // Getting the categories here since they are needed in multiple places
  const getCategories = useCallback(async () => {
    try {
      const response = await fetch(`${baseUrl}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const categories = await response.json();

      dispatch(apiActions.setCategories(categories.data));
    } catch (error) {
      throw error;
    }
  }, [baseUrl, dispatch, token]);

  useEffect(() => {
    dispatch(authActions.checkForUser());

    if (isLoggedIn) {
      getCategories();
    }
  }, [dispatch, isLoggedIn, getCategories]);

  return (
    <BrowserRouter>
      <Layout>
        {showErrorModal && <ErrorModal type={errorType} />}
        {showSuccessModal && <SuccessModal type={successType} />}
        {showConfirmDeleteModal && <ConfirmDeleteModal type={deleteType} />}
        <Routes>
          <Route path="/" element={<Navigate to="/tables" />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/tables">
              <Route index element={<Tables />} />
              <Route
                path="/tables/manage-table/:tableId"
                element={<ManageTable />}
              />
            </Route>
            <Route path="/orders">
              <Route index element={<Orders />} />
              <Route
                path="/orders/manage-order/:orderId"
                element={<ManageOrder />}
              />
              <Route path="/orders/:orderId" element={<ViewOrder />} />
            </Route>
            <Route path="/products">
              <Route index element={<Products />} />
              <Route path="/products/new-product" element={<NewProduct />} />
              <Route
                path="/products/edit-product/:productId"
                element={<EditProduct />}
              />
            </Route>
            <Route path="/categories">
              <Route index element={<Categories />} />
              <Route path="/categories/new-category" element={<NewCategory />} />
              <Route
                path="/categories/edit-category/:categoryId"
                element={<EditCategory />}
              />
            </Route>
            <Route path="/users">
              <Route index element={<Users />} />
              <Route path="/users/new-user" element={<NewUser />} />
              <Route path="/users/edit-user/:userId" element={<EditUser />} />
            </Route>
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
