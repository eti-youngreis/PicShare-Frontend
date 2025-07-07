import { ReactNode } from "react"
import { selectAuth } from "../redux/auth/auth.selectors"
import { Navigate } from "react-router-dom"
import { PATHS } from "../routes/paths"
import { useAppSelector } from "../redux/store"

type Props = {
    children: ReactNode
}

export default function GuestGuard({ children }: Props) {
    const { isAuthenticated, isInitialized } = useAppSelector(selectAuth);
    if (isAuthenticated) {
        return <Navigate to={'/'} />
    }
    if (!isInitialized) {
        return <h1>Loading...</h1>
    }
    return <>{children}</>
}