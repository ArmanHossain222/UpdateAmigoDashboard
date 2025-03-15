import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useGetCategoriesQuery } from "../Redux/features/categories/categoriesApi";
import { useUploadProductMutation } from "../Redux/features/products/productsApi";

const variantOptions = ["XS", "S", "M", "L", "XL", "XXL"];

export default function AddNewProduct() {
  const [preview, setPreview] = useState([]);
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    description: "",
    stock: "yes",
    regular_price: "",
    offer_price: "",
    photos: [],
    variants: [],
    category_id: "",
    subCategory: "",
  });
  const [uploadProduct] = useUploadProductMutation();
  const [isVariantDropdownOpen, setIsVariantDropdownOpen] = useState(false);
  const { data: categories } = useGetCategoriesQuery();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array

    // Map files into objects with desired structure
    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name, // Optional: file name
    }));

    // Update state to include new photos
    setNewProduct((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos], // Append new objects
    }));

    // Update preview state
    setPreview((prev) => [...prev, ...newPhotos.map((photo) => photo.preview)]);

    e.target.value = ""; // Clear file input
  };

  const toggleVariantDropdown = () => {
    setIsVariantDropdownOpen((prev) => !prev);
  };

  const handleVariantSelection = (variant) => {
    setNewProduct((prev) => {
      const updatedVariants = prev.variants.includes(variant)
        ? prev.variants.filter((v) => v !== variant)
        : [...prev.variants, variant];

      return { ...prev, variants: updatedVariants };
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("product_name", newProduct?.product_name);
      formData.append("description", newProduct?.description);
      formData.append("regular_price", newProduct?.regular_price);
      formData.append("offer_price", newProduct?.offer_price);
      newProduct.variants.forEach((variant) => {
        formData.append("variants[]", variant);
      });
      formData.append("category_id", newProduct.category_id);
      formData.append("stock", newProduct?.stock);
      // Correctly append the file objects from `photos`
      newProduct.photos.forEach((photo, index) => {
        formData.append(`photos[${index}]`, photo.file);
      });

      await uploadProduct(formData).unwrap();
      toast.success("Product has been uploaded.");
      setNewProduct({
        product_name: "",
        description: "",
        stock: "yes",
        regular_price: "",
        offer_price: "",
        photos: [],
        variants: [],
        category_id: "",
        subCategory: "",
      });
      setPreview([]);
    } catch (err) {
      toast.error(err?.data?.message || "Error uploading product");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleAddProduct}>
          <input
            type="text"
            name="product_name"
            placeholder="Product Name"
            value={newProduct.product_name}
            onChange={handleInputChange}
            className="bg-gray-700 text-white px-4 py-2 rounded"
            required
          />
          <select
            name="category_id"
            value={newProduct.category_id}
            onChange={(e) =>
              setNewProduct((prev) => ({
                ...prev,
                category_id: e.target.value,
              }))
            }
            className="bg-gray-700 text-white px-4 py-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories?.data?.map((category) => (
              <option key={category?.id} value={category?.id}>
                {category?.category_name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="regular_price"
            placeholder="Regular Price"
            value={newProduct.regular_price}
            onChange={handleInputChange}
            className="bg-gray-700 text-white px-4 py-2 rounded"
            required
          />
          <input
            type="number"
            name="offer_price"
            placeholder="Offer Price"
            value={newProduct.offer_price}
            onChange={handleInputChange}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          />
          <select
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            <option value="yes">In Stock</option>
            <option value="no">Out of Stock</option>
          </select>

          <div className="col-span-2">
            <label className="block mb-2 font-semibold">Variants:</label>
            <div className="flex gap-2 flex-wrap">
              {variantOptions.map((variant) => (
                <button
                  type="button"
                  key={variant}
                  onClick={() => handleVariantSelection(variant)}
                  className={`px-4 py-2 rounded ${
                    newProduct.variants.includes(variant)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>

          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="bg-gray-700 text-white px-4 py-2 rounded col-span-2"
          />
          <div className="flex flex-wrap gap-4 col-span-2">
            {preview.length > 0 &&
              preview.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={`Product preview ${index}`}
                    className="w-16 h-16 rounded shadow"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview((prev) =>
                        prev.filter((_, idx) => idx !== index)
                      );
                      setNewProduct((prev) => ({
                        ...prev,
                        photos: prev.photos.filter((_, idx) => idx !== index),
                      }));
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    X
                  </button>
                </div>
              ))}
            <textarea
              name="description"
              placeholder="Description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="bg-gray-700 text-white px-4 py-2 rounded col-span-2 w-full"
            ></textarea>
          </div>

          <button
            type="submit"
            className="col-span-2 bg-blue-600 px-4 py-2 rounded text-white font-bold hover:bg-blue-700"
          >
            Add Product
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
