import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './routes/login';
import { action as loginAction, } from "./routes/login";
import HomePage from './routes/home';
import ResellerPage, { loader as resellersLoader, deleteResellerAction } from './routes/module-1/resellers';
import ResellerEditPage, { resellerLoader, resellerUpdateAction, resellerCreateAction } from './routes/module-1/reseller';
import SupplierStatPage, { supplierStatsLoader } from './routes/module-3/supplierstat';
import ImportOrdersPage, { importOrdersLoader } from './routes/module-3/importorders';
import ImportOrderPage, { importOrderLoader } from './routes/module-3/importorder';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    action: loginAction,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/resellers",
    element: <ResellerPage />,
    loader: resellersLoader,
    action: deleteResellerAction
  },
  {
    path: "/resellers/create",
    element: <ResellerEditPage />,
    action: resellerCreateAction,
    loader: resellerLoader,
  },
  {
    path: "/resellers/update/:resellerId",
    element: <ResellerEditPage isUpdate={true} />,
    action: resellerUpdateAction,
    loader: resellerLoader
  },
  {
    path: "/suppliers/stat",
    element: <SupplierStatPage />,
    loader: supplierStatsLoader
  },
  {
    path: "/suppliers/:supplierId/orders",
    element: <ImportOrdersPage />,
    loader: importOrdersLoader,
  },
  {
    path: "/suppliers/orders/:importOrderId",
    element: <ImportOrderPage />,
    loader: importOrderLoader,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
