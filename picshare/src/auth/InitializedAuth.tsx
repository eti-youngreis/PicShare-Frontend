import { ReactNode, useEffect } from "react"
import { getSession, isValidToken, setSession } from "./utils"
import { useDispatch } from "react-redux"
import { setInitialized, setUser } from "../redux/auth/auth.slice"
import { getUser } from "../services/user.service"
import { UserType } from "../types/user.types"
import { useAppSelector } from "../redux/store"
import { selectAuth } from "../redux/auth/auth.selectors"

type Props = {
    children: ReactNode
}
export default function InitializedAuth({ children }: Props) {
    const dispatch = useDispatch()
    const { isInitialized } = useAppSelector(selectAuth)

    useEffect(() => {
        const fetchData = async () => {
            const token: string | null = getSession()
            if (token && isValidToken(token)) {
                try {
                    const user: UserType = await getUser(token)
                    dispatch(setUser({ id: user.id, fullName: user.fullName! }))
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
