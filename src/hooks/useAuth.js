import { useGetUserInfoQuery } from '../Redux/features/users/authApi';

const useAuth = () => {
    const {data, isLoading, isError} = useGetUserInfoQuery();
    return {user: data?.user, isLoading, isError};
};

export default useAuth;