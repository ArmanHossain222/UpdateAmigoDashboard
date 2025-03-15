import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  useCreateFlashSaleMutation,
  useDeleteFlashSaleMutation,
  useDeleteFlashSaleProductMutation,
  useEditFlashSaleMutation,
  useGetAllFlashSalesProductsQuery,
  useGetFlashSalesProductByIdQuery,
  useGetFlashSalesQuery,
} from "../Redux/features/flashSales/flashSales";
import LoadingIcon from "../assets/loading_content.svg";

const FlashSells = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [flashSell, setFlashSell] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlashSale, setSelectedFlashSale] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    end_date: "",
    status: "active",
  });

  const { data: flashSalesData, isLoading } = useGetFlashSalesQuery();
  const flashSales = flashSalesData?.data || [];
  const { data: flashSalesProduct } =
    useGetFlashSalesProductByIdQuery(selectedFlashSale);
  const { data: flashSalesList } = useGetAllFlashSalesProductsQuery();
  const { data: flashSalesProducts } = useGetAllFlashSalesProductsQuery();
  const [deleteFlashSaleProduct] = useDeleteFlashSaleProductMutation();

  const [deleteFlashSale] = useDeleteFlashSaleMutation();
  const [createFlashSale] = useCreateFlashSaleMutation();
  const [editFlashSale] = useEditFlashSaleMutation();

  const flashSalesItems = flashSalesProducts?.data?.find(
    (flashSale) => flashSale.id === selectedFlashSale
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      const isEditFlashSalesUpdated = await editFlashSale(formData).unwrap();
      if (isEditFlashSalesUpdated.status === 200) {
        toast.success("Flash Sale updated successfully");
      } else {
        toast.error("Error updating flash sale");
      }
      setIsEdit(false);
    } else {
      const newFlashSale = {
        id: flashSales.length + 1,
        ...formData,
      };
      const isFlashSaleCreated = await createFlashSale(newFlashSale).unwrap();
      if (isFlashSaleCreated.status === 200) {
        toast.success("Flash Sale created successfully");
      } else {
        toast.error("Error creating flash sale");
      }
    }
    setFormData({
      title: "",
      start_date: "",
      end_date: "",
      status: "active",
    });
  };

  const handleEdit = (flashSale) => {
    setIsEdit(true);
    setFormData(flashSale);
  };

  const handleDelete = async (flashSaleId) => {
    const isFlashSaleDeleted = await deleteFlashSale(flashSaleId).unwrap();
    if (isFlashSaleDeleted.status === 200) {
      toast.success("Flash Sale deleted successfully");
    } else {
      toast.error("Error deleting flash sale");
    }
  };

  const handleAddProductClick = (flashSaleId) => {
    setSelectedFlashSale(flashSaleId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFlashSale(null);
  };

  const handleFlashSalesDelete = (flashSalesProductId) => {
    const id = {
      flash_sale_id: flashSalesItems?.id,
      product_id: flashSalesProductId,
    };

    try {
      deleteFlashSaleProduct(id).unwrap();
      toast.success("Flash Sale Product deleted successfully");
    } catch (error) {
      toast.error("Error deleting flash sale product");
    }
  };

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
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Flash Sale Management</h1>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Flash Sale Title"
            required
          />
          <input
            type="datetime-local"
            name="start_date"
            value={formData.start_date}
            onChange={handleInputChange}
            className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            required
          />
          <input
            type="datetime-local"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
            className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {isEdit ? "Save Changes" : "Create Flash Sale"}
          </button>
        </form>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">All Flash Sales</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Start Date</th>
              <th className="px-6 py-3 text-left">End Date</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flashSales.map((flashSale) => (
              <tr key={flashSale.id} className="border-t">
                <td className="px-6 py-4">{flashSale.title}</td>
                <td className="px-6 py-4">{flashSale.start_date}</td>
                <td className="px-6 py-4">{flashSale.end_date}</td>
                <td className="px-6 py-4">{flashSale.status}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleAddProductClick(flashSale?.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    View product
                  </button>
                  <button
                    onClick={() => handleEdit(flashSale)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(flashSale.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-[80%] max-w-4xl p-6 rounded-lg shadow-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left">Image</th>
                  <th className="px-6 py-3 text-left">Product Name</th>
                </tr>
              </thead>
              <tbody>
                {flashSalesItems?.products.map((flashSale) => (
                  <tr key={flashSale.flash_sale_id} className="border-t">
                    <td className="px-6 py-4">
                      {flashSale?.photos?.[0] && (
                        <img
                          src={`https://api.lavogos.com/${flashSale.photos[0].file_path}/${flashSale.photos[0].file_name}`}
                          alt="Product"
                          className="w-10 h-10 rounded shadow mr-2"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">{flashSale.product_name}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleFlashSalesDelete(flashSale.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
            {/* <form onSubmit={handleFlashSalesDelete} className="grid gap-4">
							<select
								className="border px-3 py-2 rounded-md w-full"
								value={flashSell}
								onChange={(e) => setFlashSell(1)}
							>
								<option value="">Select Flash Sales Item</option>
								{flashSalesItems?.products?.map((flashSales) => (
									<option
										key={flashSales.flash_sale_id}
										value={flashSales.flash_sale_id}
									>
										{flashSales.product_name}
									</option>
								))}
							</select>
						</form> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashSells;

// {
//   "id": 1,
//   "title": "asdasdad",
//   "start_date": "2025-01-13 02:55:51",
//   "end_date": "2025-01-13 02:55:51",
//   "status": "active",
//   "created_at": "2025-01-12T21:49:30.000000Z",
//   "updated_at": "2025-01-12T21:49:30.000000Z",
//   "flash_sale_products": [
//       {
//           "id": 1,
//           "flash_sale_id": 1,
//           "product_id": 1,
//           "created_at": "2025-01-12T21:53:45.000000Z",
//           "updated_at": "2025-01-12T21:53:45.000000Z"
//       }
//   ]
// }
