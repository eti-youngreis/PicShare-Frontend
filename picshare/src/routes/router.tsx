import { Navigate, createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Layout from '../layouts/MainLayout'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import { PATHS } from './paths'
import GuestGuard from '../auth/GuestGuard'
import AuthGuard from '../auth/AuthGuard'
import PhotosGallery from '../pages/PhotosGallery'
import MyAccount from '../sections/nav-bar/MyAccount'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: PATHS.Home,
                element: <HomePage />
            },
            {
                path: PATHS.SignIn,
                element: <GuestGuard><SignIn /></GuestGuard>
            },
            {
                path: PATHS.SignUp,
                element: <GuestGuard><SignUp /></GuestGuard>
            },
            {
                path: PATHS.AllPhotographers,
                element: <PhotosGallery />
            },
            {
                path: PATHS.Gallery,
                element: <PhotosGallery />
            },
            {
                path: PATHS.MyAccount,
                element: <AuthGuard><MyAccount /></AuthGuard>
            },
            {
                path: '',
                element: <Navigate to={PATHS.Home} />
            },
            {
                path: '*',
                element: <Navigate to={PATHS.Home} />
            }
        ]
    }
])
