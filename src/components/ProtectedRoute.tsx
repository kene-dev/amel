import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { useGetSingleUserQuery } from '../features/auth/authApiSlice';

export const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) => {
    const {data} = useGetSingleUserQuery()
    const isAdmin = data?.roles?.includes('admin')
    const {access_token} = useSelector((state: RootState)  => state.auth)
    console.log(isAdmin)

    if (!access_token) {
        return <Navigate to='/login' replace />;
    }

    if (adminOnly && !isAdmin) {
        // redirect later to signup
        return <Navigate to='/shop' replace />;
    }

    return <>{children}</>;
};
