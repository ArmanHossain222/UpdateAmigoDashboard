import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AddNewProduct from "./Layouts/AddNewProduct.jsx";
import Categories from "./Layouts/Categories.jsx";
import FlashSells from "./Layouts/FlashSells.jsx";
import LogIn from "./Layouts/LogIn.jsx";
import Messages from "./Layouts/Messages.jsx";
import Orders from "./Layouts/Orders.jsx";
import Products from "./Layouts/Products.jsx";
import Settings from "./Layouts/Settings.jsx";
import Subcription from "./Layouts/Subcription.jsx";
import Support from "./Layouts/Support.jsx";
import Transactions from "./Layouts/Transactions.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import { store } from "./Redux/store.js";
import BannerManagement from "./Layouts/Banner.jsx";
import CarouselUploader from "./Layouts/Banner2.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<PrivateRoute>
				<App />
			</PrivateRoute>
		),
		children: [
			{
				path: "/",
				element: <Orders />,
			},


			{
				path: "/banner",
				element: <BannerManagement />,
			},


			{
				path: "/banner2",
				element: <CarouselUploader />,
			},
			// {
			// 	path: "/Analytics",
			// 	element: <Analytics />,
			// },
			{
				path: "/products",
				element: <Products />,
			},
			{
				path: "/add-new-product",
				element: <AddNewProduct />,
			},
			// {
			// 	path: "/Orders",
			// 	element: <Orders />,
			// },
			{
				path: "/Transactions",
				element: <Transactions />,
			},
			// {
			// 	path: "/Reports",
			// 	element: <Reports />,
			// },
			{
				path: "/Settings",
				element: <Settings />,
			},
			{
				path: "/Messages",
				element: <Messages />,
			},
			{
				path: "/support",
				element: <Support />,
			},

			{
				path: "/categories",
				element: <Categories />,
			},
			{
				path: "/subcription",
				element: <Subcription />,
			},
			{
				path: "/flash-sells",
				element: <FlashSells />,
			},
		],
	},
	{
		path: "/login",
		element: <LogIn />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
