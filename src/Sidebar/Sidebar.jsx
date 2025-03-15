import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logout } from "../Redux/features/users/authSlice";

const menuItem = [
	// { path: "/", name: "Overview", icon: "🏠" },
	// { path: "/Analytics", name: "Analytics", icon: "📊" },
	{ path: "/", name: "Orders", icon: "🛒" },
	{ path: "/add-new-product", name: "Add Product", icon: "📦" },
	{ path: "/products", name: "Products", icon: "📦" },
	// { path: "/Reports", name: "Reports", icon: "📑" },
	{ path: "/categories", name: "Categories", icon: "📂" }, // Updated icon for Categories
	{ path: "/subcription", name: "Subcription", icon: "📂" }, // Updated icon for Categories
	{ path: "/flash-sells", name: "Flash sells", icon: "📂" }, // Updated icon for Categories
	{ path: "/banner", name: "Banner", icon: "📂" },

];

const otherItems = [
	{ path: "/Settings", name: "Settings", icon: "⚙️" },
	{ path: "/support", name: "Help & Support", icon: "❓" },
];

const Sidebar = () => {
	const { user } = useAuth();
	const [isOpen, setIsOpen] = useState(true);
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef(null);
	const dispatch = useDispatch();
	const router = useNavigate();

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const handleLogoutUser = () => {
		setShowDropdown(false);
		dispatch(logout());
		router("/login");
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			className={`bg-[#2D2F39] ${
				isOpen ? "w-[256px]" : "w-[60px]"
			} h-screen sticky left-0 top-0 duration-500 border-r border-b-red-500`}
		>
			{/* Sidebar Header */}
			<div
				className={`flex justify-around items-center py-6 border-b border-b-[#D9D9D9]`}
			>
				<h1
					className={`${
						isOpen ? "block" : "hidden"
					} text-white font-bold text-2xl`}
				>
					AmigoFabric
				</h1>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					className={`${isOpen ? "block" : "hidden"}`}
					onClick={toggleSidebar}
				>
					<path d="M8.23603 8.2359..." fill="black" />
				</svg>
			</div>

			{/* Menu Items */}
			<div className="h-[calc(100vh-150px)] overflow-y-auto relative">
				{menuItem.map((item, index) => (
					<li className="list-none" key={index}>
						<NavLink
							to={item.path}
							className={({ isActive }) =>
								`nav-bg ${
									isActive ? "bg-red-500" : "hover:bg-gray-700"
								} text-white block p-4 rounded-md ${
									isOpen ? "block" : "hidden"
								}`
							}
						>
							<div className="flex gap-x-3 text-white">
								<div>{item.icon}</div>
								<div className={`${isOpen ? "block" : "hidden"}`}>
									{item.name}
								</div>
							</div>
						</NavLink>
					</li>
				))}

				<h2
					className={`${
						isOpen ? "block" : "hidden"
					} text-lg font-bold px-4 py-3 mt-2 bg-gray-200 border rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-300`}
				>
					Others
				</h2>

				<ul>
					{otherItems.map((item, index) => (
						<li className="list-none" key={index}>
							<NavLink to={item.path} className={"nav-bg"}>
								<div className="flex gap-x-3 text-white">
									<div>{item.icon}</div>
									<div className={`${isOpen ? "block" : "hidden"}`}>
										{item.name}
									</div>
								</div>
							</NavLink>
						</li>
					))}
				</ul>
			</div>

			{/* User Account Panel */}
			<div
				className={`absolute bottom-6 left-0 w-full px-4 ${
					isOpen ? "block" : "flex justify-center"
				}`}
			>
				<div className="flex items-center gap-x-3 p-3 rounded-lg bg-gray-800 shadow-md relative">
					<img
						src={"noman.jpg"}
						alt="User Avatar"
						className="rounded-full w-[40px] h-[40px] shadow-lg border-2 border-gray-200"
					/>
					{isOpen && (
						<div className="flex flex-col gap-y-2">
							<span className="text-white text-sm font-semibold tracking-wide">
								{user?.name}
							</span>
						</div>
					)}

					{/* 3-Dot Menu */}
					<div className="relative ml-auto" ref={dropdownRef}>
						<button
							onClick={toggleDropdown}
							className="text-white focus:outline-none"
						>
							⋮ {/* Vertical Ellipsis */}
						</button>

						{showDropdown && (
							<div
								className="absolute top-full right-0 mt-[6px] text-center bg-red-500 text-white font-[700] rounded-md shadow-lg w-40"
								onClick={(e) => e.stopPropagation()} // Stop event propagation
							>
								<span
									className="text-gray-700 block px-4 hover:bg-gray-100"
									onClick={handleLogoutUser} // Close the dropdown on link click
								>
									Log Out
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
