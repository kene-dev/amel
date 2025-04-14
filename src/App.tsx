import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { AdminLayout, HomeLayout } from './layouts';
import { Account, Cart, CheckOut, CommunityPage, DistributorsPage, ErrorPage, HomePage, LoginPage, RegisterPage, ShopPage, SingleProduct } from './routes';
import AboutPage from './routes/AboutPage';
import { Coupons, Dashboard, Orders, Products } from './routes/admin';
import { ProtectedRoute } from './components';
import ProductCatalogue from './routes/ProductCatalogue';
import ProductDetails from './routes/ProductDetails';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomeLayout />,
            children: [
                { index: true, element: <HomePage /> },
                { path: 'about', element: <AboutPage /> },
                { path: 'our-community', element: <CommunityPage /> },
                { path: 'distributors', element: <DistributorsPage /> },
                { path: 'product-catalogue', element: <ProductCatalogue/> },
                { path: 'product-catalogue/:id', element: <ProductDetails/> },
                { path: 'shop', element: <ShopPage /> },
                { path: 'shop/:id', element: <SingleProduct /> },
                {
                    path: 'cart',
                    element: <Cart />
                },
                {
                    path: 'cart/checkout',
                    element: (
                        <ProtectedRoute>
                            <CheckOut />
                        </ProtectedRoute>
                    )
                },
                {
                    path: 'account',
                    element: (
                        <ProtectedRoute>
                            <Account />
                        </ProtectedRoute>
                    )
                },
                { path: 'login', element: <LoginPage /> },
                { path: '/signup', element: <RegisterPage /> }
            ],
            errorElement: <ErrorPage />
        },

        {
            path: '/admin',
            element: <AdminLayout />,
            children: [
                {
                    index: true,
                    element: (
                        <ProtectedRoute adminOnly>
                            <Dashboard />
                        </ProtectedRoute>
                    )
                },
                {
                    path: 'coupons',
                    element: (
                        <ProtectedRoute adminOnly>
                            <Coupons />
                        </ProtectedRoute>
                    )
                },
                {
                    path: 'orders',
                    element: (
                        <ProtectedRoute adminOnly>
                            <Orders />
                        </ProtectedRoute>
                    )
                },
                {
                    path: 'products',
                    element: (
                        <ProtectedRoute adminOnly>
                            <Products />
                        </ProtectedRoute>
                    )
                }
            ],
            errorElement: <ErrorPage />
        }
    ]);
    return <RouterProvider router={router} />;
}

export default App;
