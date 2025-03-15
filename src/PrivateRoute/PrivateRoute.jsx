import { useNavigate } from "react-router-dom";
import loading from "../assets/loading.gif";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { user, isLoading, isError } = useAuth();
  const router = useNavigate();

  // Display a loading message while user state is loading
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#FBFBFB]">
        <img src={loading} alt="loading gif" className="w-[500px]" />
      </div>
    );

  // Redirect to login if there is an error
  if (!isLoading && isError) {
    router("/login");
    return null;
  }

  if (user?.role === "Super Admin") {
    return children;
  }
}
