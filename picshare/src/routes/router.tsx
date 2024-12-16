import { Navigate, createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Layout from '../layouts/MainLayout'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import { PATHS } from './paths'
import GuestGuard from '../auth/GuestGuard'
import ImagesGallery from '../pages/ImagesGallery'
import React from 'react'

export const router = createBrowserRouter([
    {
        path: PATHS.Home,
        element: <Layout />,
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: '*',
                element: <Navigate to='/home' />,
            },
            {
                path: PATHS.Gallery,
                element: <ImagesGallery />
            }
        ]
    },
    { path: PATHS.SignIn, element: <GuestGuard><SignIn /></GuestGuard> },
    { path: PATHS.SignUp, element: <GuestGuard><SignUp /></GuestGuard> },
    {
        path: '', element: <Navigate to={PATHS.Home} />
    }
])
