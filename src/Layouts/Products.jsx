import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CloseIcon from "../assets/icons/CloseIcon";
import { useGetCategoriesQuery } from "../Redux/features/categories/categoriesApi";
import {
  useCreateFlashSaleProductMutation,
  useGetFlashSalesQuery,
} from "../Redux/features/flashSales/flashSales";
import {
  useDeleteProductMutation,
  useEditProductMutation,
  useGetProductsQuery,
} from "../Redux/features/products/productsApi";

const Products = () => {
  const [flashSell, setFlashSell] = useState(""); // Set an initial value like an empty string or any default value.
  const [openFlashSellModal, setOpenFlashSellModal] = useState(false); // state for FlashSell modal
  const { data: products, isLoading } = useGetProductsQuery();
  const [editProduct] = useEditProductMutation();
  const [deleteProduct, { isLoading: isProductDeleteLoading }] =
    useDeleteProductMutation();
  const { data: categories } = useGetCategoriesQuery();
  const { data: flashSalesData } = useGetFlashSalesQuery();
  const [createFlashSaleProduct] = useCreateFlashSaleProductMutation();

  const activeFlashSalesData = flashSalesData?.data?.filter(
    (flashSale) => flashSale.status === "active"
  );

  const [preview, setPreview] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState();

  const selectedProduct = products?.data?.find(
    (product) => product.id === selectedProductId
  );

  const [newProduct, setNewProduct] = useState({
    product_name: selectedProduct?.product_name || "",
    description: selectedProduct?.description || "",
    stock: "yes",
    regular_price: selectedProduct?.regular_price || "",
    photos: [],
    variants: "",
    category_id: selectedProduct?.category_id || "",
    subCategory: "",
  });

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

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      category_id: value, // Set category_id instead of category
      subCategory: "", // Reset subcategory when category changes
    }));
  };
  const variantOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleVariantSelection = (variant) => {
    setNewProduct((prev) => {
      const updatedVariants = prev.variants.includes(variant)
        ? prev.variants.filter((v) => v !== variant)
        : [...prev.variants, variant];

      return { ...prev, variants: updatedVariants };
    });
  };

  const handleAddFlashSell = (productId) => {
    setOpenFlashSellModal(true); // Open FlashSell Modal
    setSelectedProductId(productId);
  };

  const handleFlashSellSubmit = async (e) => {
    e.preventDefault();

    const newFlashSale = {
      product_id: selectedProductId,
      flash_sale_id: flashSell,
    };

    const res = await createFlashSaleProduct(newFlashSale).unwrap();

    if (res.status === 200) {
      toast.success("FlashSell has been created successfully!");
    } else {
      toast.error("Failed to create FlashSell!");
    }

    setOpenFlashSellModal(false); // Close FlashSale Modal after submission
  };

  // Deleting a product
  const handleDelete = async (product_id) => {
    try {
      await deleteProduct(product_id).unwrap();
      toast.success("Product has been deleted.");
    } catch (error) {
      toast.error("Error occurred while deleting product.");
    }
  };

  const handleEditModal = async (productId) => {
    setOpenEditModal(true);
    setSelectedProductId(productId);
  };

  const handleEditProduct = async (e) => {
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

      const updatedData = {
        productId: selectedProductId,
        formData: formData,
      };

      // Dispatch the mutation to upload the product with image
      const res = await editProduct(updatedData).unwrap();
      console.log(res);

      if (res.errors) {
        return toast.error("Failed to update product!");
      }

      toast.success("Product has been updated successfully.");

      // Reset form
      setNewProduct({
        product_name: "",
        description: "",
        stock: "yes",
        regular_price: "",
        offer_price: "",
        photos: [],
        variants: "",
        category_id: "",
        subCategory: "",
      });
      setPreview(null);

      setOpenEditModal(false);
    } catch (err) {
      toast.error("Failed to update product!");
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Product Inventory</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2">Product ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">regular_Price</th>
                <th className="px-4 py-2">offer_Price</th>
                <th className="px-4 py-2">Stock</th>
                <th className="px-4 py-2">Variants</th>
                <th className="px-4 py-2">Images</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.data?.map((product) => (
                <tr key={product.id} className="hover:bg-gray-700">
                  <td className="px-4 py-2">{product.id}</td>
                  <td className="px-4 py-2">{product.product_name}</td>
                  <td className="px-4 py-2">{product.regular_price}</td>
                  <td className="px-4 py-2">{product.offer_price}</td>
                  <td className="px-4 py-2">{product.stock}</td>
                  <td className="px-4 py-2">{product.variants}</td>
                  <td className="px-4 py-2">
                    <div className="flex">
                      {product?.photos?.map((productPhoto, idx) => (
                        <img
                          key={idx}
                          src={`https://api.amigofabric.com/uploads/products/${product.photos[0].file_name}`}
                          alt="Product"
                          className="w-10 h-10 rounded shadow mr-2"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleAddFlashSell(product.id)}
                      className="bg-green-500 px-2 py-1 rounded text-white hover:bg-yellow-600"
                    >
                      Add FlashSell
                    </button>
                    <button
                      onClick={() => handleEditModal(product?.id)}
                      className="bg-yellow-500 px-2 py-1 rounded text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
                    >
                      {isProductDeleteLoading ? "Loading..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
      {openEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md max-w-2xl w-full relative">
            <h2 className="text-xl font-semibold mb-4 text-center border-b pb-2 dark:text-black">
              Update product details
            </h2>
            <div
              onClick={() => setOpenEditModal(false)}
              className="absolute top-1.5 right-1.5 cursor-pointer bg-red-600 rounded-full text-white p-2"
            >
              <CloseIcon />
            </div>
            <form
              className="grid grid-cols-2 gap-4"
              onSubmit={handleEditProduct}
            >
              <input
                type="text"
                name="product_name"
                placeholder="Product Name"
                defaultValue={selectedProduct?.product_name}
                onChange={handleInputChange}
                className="bg-gray-700 text-white px-4 py-2 rounded"
                required
              />
              <select
                name="category_id"
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    category_id: e.target.value,
                  }))
                }
                value={newProduct.category_id || selectedProduct?.category_id}
                className="bg-gray-700 text-white px-4 py-2 rounded"
                required
              >
                <option value="">Select Category</option>
                {categories?.data?.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    defaultValue={category.id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
              <textarea
                name="description"
                placeholder="Description"
                defaultValue={
                  newProduct.description || selectedProduct?.description
                }
                onChange={handleInputChange}
                className="bg-gray-700 text-white px-4 py-2 rounded col-span-2"
              ></textarea>
              <input
                type="number"
                name="regular_price"
                placeholder="Regular Price"
                defaultValue={
                  newProduct.regular_price || selectedProduct?.regular_price
                }
                onChange={handleInputChange}
                className="bg-gray-700 text-white px-4 py-2 rounded"
                required
              />
              <input
                type="number"
                name="offer_price"
                placeholder="Offer Price"
                defaultValue={
                  newProduct.offer_price || selectedProduct?.offer_price
                }
                onChange={handleInputChange}
                className="bg-gray-700 text-white px-4 py-2 rounded"
              />
              <div className="col-span-2">
                <label className="block mb-2 font-semibold">Varient:</label>
                <div className="flex gap-2 flex-wrap">
                  {variantOptions.map((variant) => (
                    <button
                      type="button"
                      key={variant}
                      onClick={() => handleVariantSelection(variant)}
                      className={`px-4 py-2 rounded ${newProduct.variants.includes(variant)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-300"
                        }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
              <select
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                className="bg-gray-700 text-white px-4 py-2 rounded"
              >
                <option value="yes">In Stock</option>
                <option value="no">Out of Stock</option>
              </select>

              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="bg-gray-700 text-white px-4 py-2 rounded col-span-2"
              />
              <div className="flex flex-wrap gap-4 col-span-2">
                {preview?.length > 0 &&
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
                            photos: prev.photos.filter(
                              (_, idx) => idx !== index
                            ),
                          }));
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        X
                      </button>
                    </div>
                  ))}
              </div>
              <button
                type="submit"
                className="col-span-2 bg-blue-600 px-4 py-2 rounded text-white font-bold hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {openFlashSellModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Add FlashSell</h2>
            <div
              onClick={() => setOpenFlashSellModal(false)}
              className="absolute top-1.5 right-1.5 cursor-pointer bg-red-600 rounded-full text-white p-2"
            >
              <CloseIcon />
            </div>
            <form onSubmit={handleFlashSellSubmit} className="grid gap-4">
              <select
                className="border px-3 py-2 rounded-md w-full"
                value={flashSell}
                onChange={(e) => setFlashSell(e.target.value)}
              >
                <option value="">Select Flash Sales Item</option>
                {activeFlashSalesData?.map((flashSales) => (
                  <option key={flashSales.id} value={flashSales.id}>
                    {flashSales.title}
                  </option>
                ))}
              </select>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit FlashSell
                </button>
                <button
                  type="button"
                  onClick={() => setOpenFlashSellModal(false)} // Close the popup on cancel
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
