import React from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  useDeleteSubscriberMutation,
  useGetSubscriberListQuery,
} from "../Redux/features/users/authApi";
import LoadingIcon from "../assets/loading_content.svg";

const Subscription = () => {
  const { data, isLoading } = useGetSubscriberListQuery();
  const subscriptions = data?.data;
  const [deleteSubscriber, { isLoading: isDeletedSubscriberLoading }] =
    useDeleteSubscriberMutation();

  const handleDelete = async (id) => {
    try {
      const isDeletedSubscriber = await deleteSubscriber(id).unwrap();
      if (isDeletedSubscriber.status === 200) {
        toast.success("Subscriber deleted successfully");
      } else {
        toast.error("Error deleting subscriber");
      }
    } catch (error) {
      toast.error("Error deleting subscriber");
    }
  };

  // If loading then show loading animations
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
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-5">Subscription List</h2>
      <div className="space-y-4">
        {subscriptions?.map((subscription) => (
          <div
            key={subscription.id}
            className="flex justify-between items-center p-4 border rounded shadow"
          >
            <div>
              <span>{subscription.email}</span>
            </div>
            <div>
              <button
                onClick={() => handleDelete(subscription.id)}
                className="bg-red-500 text-white py-1 px-3 rounded"
              >
                {isDeletedSubscriberLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Subscription;
