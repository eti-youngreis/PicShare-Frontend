import { ReactNode } from "react"
import { selectAuth } from "../redux/auth/auth.selectors"
import { Navigate } from "react-router-dom"
import { PATHS } from "../routes/paths"
import { useSelector } from "react-redux"

type Props = {
    children: ReactNode
}

export default function AuthGuard({ children }: Props) {
    const { isAuthenticated, isInitialized } = useSelector(selectAuth);

    if (!isInitialized) {
        return <h1>Loading...</h1>
    }

    if (!isAuthenticated) {
        return <Navigate to={PATHS.SignIn} />
    }

    return <>{children}</>
}