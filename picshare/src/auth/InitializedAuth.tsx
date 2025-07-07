import { ReactNode, useEffect } from "react"
import { getSession, isValidToken, setSession } from "./utils"
import { useDispatch } from "react-redux"
import { setInitialized, setUser } from "../redux/auth/auth.slice"
import { UserType } from "../types/user.types"
import { getCurrentUser } from "../services/user.service"

type Props = {
    children: ReactNode
}
export default function InitializedAuth({ children }: Props) {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            const token: string | null = getSession()
            if (token && isValidToken(token)) {
                try {
                    const user: UserType = await getCurrentUser()
                    dispatch(setUser({ id: user.id, fullName: user.fullName!, email: user.email! }))
                    setSession(token)
                } catch (error) {
                    // Handle error
                    console.error("Error fetching user:", error)
                }
                finally {
                    dispatch(setInitialized())
                }
            } else {
                dispatch(setInitialized())
            }
        }

        fetchData()
    }, [])

    return <>{children}</>
}
