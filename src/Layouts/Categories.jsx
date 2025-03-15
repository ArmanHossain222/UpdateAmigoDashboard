import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../Redux/features/categories/categoriesApi";
import LoadingIcon from "../assets/loading_content.svg";

const Categories = () => {
  const [newCategory, setNewCategory] = useState("");
  const [updateCategoryInfo, setUpdateCategoryInfo] = useState({
    isUpdating: false,
    categoryData: {},
  });
  const [editedCategory, setEditedCategory] = useState("");
  // const [subCategoryInput, setSubCategoryInput] = useState({});

  // Add category mutation
  const [addNewCategory, { isLoading: isAddCategoryLoading }] =
    useCreateCategoryMutation();
  // Get category query
  const { data: categoryData, isLoading, isError } = useGetCategoriesQuery();
  // delete category mutation
  const [deleteCategory] = useDeleteCategoryMutation();
  // Update category mutation
  const [updateCategory, { isLoading: isUpdateCategoryLoading }] =
    useUpdateCategoryMutation();

  // adding a new category
  const handleAddCategory = async () => {
    if (newCategory.trim() === "") return;

    try {
      const category = {
        category_id: Date.now(),
        category_name: newCategory,
        icon: null,
        order: null,
        status: "active",
      };
      await addNewCategory(category).unwrap();
      setNewCategory("");
      toast.success("Successfully added category.");
    } catch (error) {
      toast.error("Error occurred while adding category.");
    }
  };

  // handle delete category
  const handleDeleteCategory = async (category_id) => {
    try {
      await deleteCategory(category_id).unwrap();
      toast.success("Successfully deleted a category");
    } catch (error) {
      toast.error("Error occurred while deleting a category");
    }
  };

  // handle updated category name
  const handleUpdateCategory = async (category) => {
    const categoryInfo = {
      ...category.categoryData,
      category_name: editedCategory,
    };
    try {
      updateCategory(categoryInfo).unwrap();
      setEditedCategory("");
      setUpdateCategoryInfo({
        isUpdating: false,
        categoryData: {},
      });
      toast.success("category has been updated.");
    } catch (error) {
      setUpdateCategoryInfo({
        isUpdating: false,
        categoryData: {},
      });
      toast.error("Error occurred while updating category.");
    }
  };

  // If loading all the categories
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <img
          src={LoadingIcon}
          alt="loading_animation"
          className="w-[120px] h-[120px]"
        />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Manage Categories
      </h1>

      {/* Add Category */}
      <div className="flex items-center mb-8 gap-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter category name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddCategory}
          disabled={isAddCategoryLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {isAddCategoryLoading ? "Adding..." : "Add Category"}
        </button>
      </div>

      {/* Display Categories */}
      <div className="space-y-6">
        {categoryData?.data?.map((category, index) => (
          <div key={index} className="p-6 bg-white shadow rounded-lg relative">
            <span
              className="absolute top-6 right-6 cursor-pointer"
              onClick={() => handleDeleteCategory(category?.id)}
            >
              {/* <svg
								stroke="red"
								fill="red"
								strokeWidth="0"
								viewBox="0 0 24 24"
								height="1.2em"
								width="1.2em"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
							</svg> */}
            </span>
            <h2 className="text-xl font-semibold text-gray-700">
              {category.category_name}
            </h2>

            <div>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                onClick={() => {
                  setUpdateCategoryInfo({
                    isUpdating: true,
                    categoryData: category,
                  });
                  setEditedCategory(category?.category_name);
                }}
              >
                Edit
              </button>
            </div>

            {/* Add Subcategory */}
            {/* <div className="flex items-center mt-4 gap-4">
              <input
                type="text"
                value={subCategoryInput[index] || ""}
                onChange={(e) =>
                  setSubCategoryInput({
                    ...subCategoryInput,
                    [index]: e.target.value,
                  })
                }
                placeholder={`Add a subcategory to ${category.name}`}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                // onClick={() => handleAddSubCategory(index)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Subcategory
              </button>
            </div> */}

            {/* Display Subcategories */}
            {/* {category.subcategories.length > 0 && (
              <ul className="mt-4 space-y-2">
                {category.subcategories.map((sub, subIndex) => (
                  <li
                    key={subIndex}
                    className="text-gray-600 text-sm pl-4 border-l-4 border-green-500"
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            )} */}
          </div>
        ))}
        <ToastContainer />
      </div>

      {/* Edit Modal */}
      {updateCategoryInfo.isUpdating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-center border-b pb-2">
              Edit category
            </h2>
            {/* Edit Category */}
            <div className="flex items-center mb-8 gap-4">
              <input
                type="text"
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
                placeholder="Enter category name"
                className="w-full flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() =>
                  setUpdateCategoryInfo({
                    isUpdating: false,
                    categoryData: {},
                  })
                }
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateCategory(updateCategoryInfo)}
                disabled={isUpdateCategoryLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {isUpdateCategoryLoading ? "Loading..." : "Update Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
