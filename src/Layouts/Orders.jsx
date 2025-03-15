import {
  DollarSign,
  Download,
  Hourglass,
  Loader2,
  PackageCheck,
  Truck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import html2pdf from 'html2pdf.js';
import { formatDate } from "../../utils/formattedDate";
import LoadingIcon from "../assets/loading_content.svg";
import {
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
} from "../Redux/features/orders/ordersApi";

const OrderManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState();
  const [isOpenCustomerDetails, setIsOpenCustomerDetails] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { data: orderList, isLoading, isError } = useGetOrderQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  // Status counts
  const totalOrders = orderList?.data?.length;
  const pendingOrders = orderList?.data?.filter(order => order.status === "pending").length;
  const processingOrders = orderList?.data?.filter(order => order.status === "processing").length;
  const paidOrders = orderList?.data?.filter(order => order.status === "paid").length;
  const deliveredOrders = orderList?.data?.filter(order => order.status === "delivered").length;
  const cancelledOrders = orderList?.data?.filter(order => order.status === "cancelled").length;

  const selectedOrderDetails = orderList?.data?.find(order => order.id === selectedOrderId);
  
  const shipping_cost = selectedOrderDetails?.shipping_cost;
  const subtotal = selectedOrderDetails?.purchase_details?.reduce(
    (acc, item) => acc + item.unit_price * item.quantity,
    0
  );

  // Function to generate and download PDF
  const handleDownloadPDF = () => {
    const element = document.getElementById('invoice-content');
    const opt = {
      margin: 1,
      filename: `invoice-${selectedOrderDetails?.invoice_no}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
    toast.success("PDF download started!");
  };

  // Function to update order status
  const handleUpdateOrderStatus = async ({ order_id, status }) => {
    const updateOrderInfo = {
      order_id,
      status,
      order_type: ["single"],
      note: "urgent",
    };

    try {
      const isOrderUpdated = await updateOrderStatus(updateOrderInfo).unwrap();
      if (isOrderUpdated?.status === 200) {
        toast.success("Order status updated successfully");
      } else {
        toast.error("Error occurred while order updating");
      }
    } catch (error) {
      toast.error("Error occurred while order updating");
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-screen">
      <img src={LoadingIcon || "/placeholder.svg"} alt="loading_animation" className="w-[120px] h-[120px]" />
    </div>
  );

  if (!isLoading && isError) return <div>Error fetching data</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Order Management</h1>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 max-w-4xl mx-auto flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by Customer Name or Order ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-1/3 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="paid">Paid</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
        <div className="p-6 rounded-xl shadow-lg text-white text-center flex flex-col items-center bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 transition-transform duration-300">
          <PackageCheck size={32} className="mb-2" />
          <h2 className="text-lg font-bold">Total Orders</h2>
          <p className="text-4xl font-semibold">{totalOrders}</p>
        </div>

        <div className="p-6 rounded-xl shadow-lg text-white text-center flex flex-col items-center bg-gradient-to-r from-yellow-400 to-yellow-600 hover:scale-105 transition-transform duration-300">
          <Hourglass size={32} className="mb-2" />
          <h2 className="text-lg font-bold">Pending Orders</h2>
          <p className="text-4xl font-semibold">{pendingOrders}</p>
        </div>

        <div className="p-6 rounded-xl shadow-lg text-white text-center flex flex-col items-center bg-gradient-to-r from-purple-500 to-purple-700 hover:scale-105 transition-transform duration-300">
          <Loader2 size={32} className="mb-2" />
          <h2 className="text-lg font-bold">Processing Orders</h2>
          <p className="text-4xl font-semibold">{processingOrders}</p>
        </div>

        <div className="p-6 rounded-xl shadow-lg text-white text-center flex flex-col items-center bg-gradient-to-r from-green-500 to-green-700 hover:scale-105 transition-transform duration-300">
          <DollarSign size={32} className="mb-2" />
          <h2 className="text-lg font-bold">Paid Orders</h2>
          <p className="text-4xl font-semibold">{paidOrders}</p>
        </div>

        <div className="p-6 rounded-xl shadow-lg text-white text-center flex flex-col items-center bg-gradient-to-r from-teal-500 to-teal-700 hover:scale-105 transition-transform duration-300">
          <Truck size={32} className="mb-2" />
          <h2 className="text-lg font-bold">Delivered Orders</h2>
          <p className="text-4xl font-semibold">{deliveredOrders}</p>
        </div>

        <div className="p-6 rounded-xl shadow-lg text-white text-center flex flex-col items-center bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 transition-transform duration-300">
          <XCircle size={32} className="mb-2" />
          <h2 className="text-lg font-bold">Cancelled Orders</h2>
          <p className="text-4xl font-semibold">{cancelledOrders}</p>
        </div>
      </div>

      {/* Order List */}
      <div className="overflow-x-auto bg-white p-6 rounded-md shadow-md mb-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Customer Name</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Total Price</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderList?.data
              .filter((order) => {
                const matchesSearch = order.recipient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  order.id.toString().includes(searchQuery);
                const matchesStatus = statusFilter === "all" || order.status === statusFilter;
                return matchesSearch && matchesStatus;
              })
              .map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="px-6 py-3">{order.id}</td>
                  <td className="px-6 py-3">{order.recipient_name}</td>
                  <td className="px-6 py-3">
  {new Date(order.order_date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
   
    hour12: true,
  })}
</td>

                  <td className="px-6 py-3">{order.status}</td>
                  <td className="px-6 py-3">{order.total}</td>
                  <td className="px-2 py-2 space-x-4 flex items-center">
                    <button
                      onClick={() => handleUpdateOrderStatus({ order_id: order.id, status: "pending" })}
                      className={`${
                        order.status === "pending" 
                          ? "bg-red-500 hover:bg-red-600" 
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white px-4 py-2 rounded-md`}
                    >
                      Pending
                    </button>

                    <button
                      onClick={() => handleUpdateOrderStatus({ order_id: order.id, status: "processing" })}
                      className={`${
                        order.status === "processing" 
                          ? "bg-red-500 hover:bg-red-600" 
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white px-4 py-2 rounded-md`}
                    >
                      Processing
                    </button>

                    <button
                      onClick={() => handleUpdateOrderStatus({ order_id: order.id, status: "paid" })}
                      className={`${
                        order.status === "paid" 
                          ? "bg-red-500 hover:bg-red-600" 
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white px-4 py-2 rounded-md`}
                    >
                      Paid
                    </button>

                    <button
                      onClick={() => handleUpdateOrderStatus({ order_id: order.id, status: "delivered" })}
                      className={`${
                        order.status === "delivered" 
                          ? "bg-red-500 hover:bg-red-600" 
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white px-4 py-2 rounded-md`}
                    >
                      Delivered
                    </button>

                    <button
                      onClick={() => handleUpdateOrderStatus({ order_id: order.id, status: "cancelled" })}
                      className={`${
                        order.status === "cancelled" 
                          ? "bg-red-500 hover:bg-red-600" 
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white px-4 py-2 rounded-md`}
                    >
                      Cancelled
                    </button>

                    <button
                      onClick={() => {
                        setSelectedOrderId(order.id);
                        setIsOpenCustomerDetails(true);
                      }}
                      className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
                    >
                      Customer Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Modal */}
      {isOpenCustomerDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-center border-b pb-2">
                Customer details
              </h2>
              <button
                onClick={handleDownloadPDF}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center gap-2"
              >
                <Download size={20} />
                Download PDF
              </button>
            </div>

            {/* Invoice Content */}
            <div id="invoice-content" className="min-h-auto bg-gray-100 p-4 rounded-lg">
              <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                {/* Header */}
                <div className="border-b pb-4 mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">
                    Order Invoice
                  </h1>
                  <p className="text-sm text-gray-500">
                    Invoice{" "}
                    <span className="font-medium">
                      #{selectedOrderDetails?.invoice_no}
                    </span>{" "}
                    | {formatDate(selectedOrderDetails?.order_date)}
                  </p>
                </div>

                {/* Customer Details */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Customer Details
                  </h2>
                  <p className="text-gray-600 capitalize">
                    Name: {selectedOrderDetails?.recipient_name}
                  </p>
                  <p className="text-gray-600 capitalize">
                    Address: {selectedOrderDetails?.recipient_address}
                  </p>
                  <p className="text-gray-600">
                    Phone No: {selectedOrderDetails?.recipient_phone}
                  </p>
                </div>

                {/* Order Details */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Order Details
                  </h2>
                  <table className="w-full table-auto border-collapse">
                  <thead>
                      <tr className="text-left border-b">
                        <th className="py-2 text-gray-600">Item</th>
                        <th className="py-2 text-gray-600">Quantity</th>
                        <th className="py-2 text-gray-600">Price</th>
                        <th className="py-2 text-gray-600">Size</th>
                        <th className="py-2 text-gray-600">Total (BDT)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrderDetails?.purchase_details?.map((item) => (
                        <tr key={item?.id} className="border-b">
                          <td className="py-2 text-gray-800 capitalize">
                            {item.product_name}
                          </td>
                          <td className="py-2 text-gray-800">
                            {item.quantity}
                          </td>
                          <td className="py-2 text-gray-800">
                            BDT {item.unit_price}
                          </td>
                          <td className="py-2 text-gray-800">
                            {item?.variants ?? "N/A"}
                          </td>
                          <td className="py-2 text-gray-800">
                            BDT {item.unit_price * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Summary
                  </h2>
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>BDT {subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charge:</span>
                    <span>BDT {shipping_cost}</span>
                  </div>
                  <div className="flex justify-between text-gray-800 font-bold">
                    <span>Total:</span>
                    <span>BDT {subtotal + shipping_cost}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-10 text-sm text-gray-500">
                  <p>Thank you for shopping with us!</p>
                  <p>If you have any questions, contact amigobd99@gmail.com </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-2.5">
              <button
                onClick={() => setIsOpenCustomerDetails(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default OrderManagement;