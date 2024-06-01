import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import ExportOrdersPage, { exportOrdersLoader } from './routes/module-2/exportorders';
import ResellerPickPage from './routes/module-2/resellerpick';
import ProductPickPage, { productsLoader } from './routes/module-2/productpick';
import ExportOrderCreationPage, { exportOrderLoader } from './routes/module-2/exportordercreation';
import ExportOrderConfirmPage, { exportOrderConfirmLoader } from './routes/module-2/exportorderconfirm';

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
  // Module 1
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
  // Module 2
  {
    path: "/resellers/exportorders",
    element: <ExportOrdersPage />,
    loader: exportOrdersLoader
  },
  {
    path: "/resellers/exportorders/create/reseller",
    element: <ResellerPickPage />,
    loader: resellersLoader,
  },
  {
    path: "/resellers/exportorders/create/products",
    element: <ProductPickPage />,
    loader: productsLoader,
  },
  {
    path: "/resellers/exportorders/create",
    element: <ExportOrderCreationPage />,
    loader: exportOrderLoader,
  },
  {
    path: "/resellers/exportorders/:exportOrderId/confirm",
    element: <ExportOrderConfirmPage/>,
    loader: exportOrderConfirmLoader,
  },
  // Module 3
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
