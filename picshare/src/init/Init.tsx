import { ReactNode, useEffect } from "react"
import { useDispatch } from "react-redux"
import { getSession, isValidToken, setSession } from "../auth/utils"
import { setUser, setInitialized } from "../redux/auth/auth.slice"
import { setPhotos } from "../redux/photo/photo.slice"
import { getCurrentUser } from "../services/user.service"
import { PhotoType } from "../types/photo.type"
import { UserType } from "../types/user.types"
import { getAllPhotos } from "../services/photo.service"

type Props = {
    children: ReactNode
}
export default function Init({ children }: Props) {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAuthData = async () => {
            const token: string | null = getSession()
            if (token && isValidToken(token)) {
                try {
                    const user: UserType = await getCurrentUser()
                    dispatch(setUser(user))
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
        const fetchData = async () => {
            try {
                const photos: PhotoType[] = await getAllPhotos()
                dispatch(setPhotos(photos))
            }
            catch (error) {
                console.error("Error fetching data: ", error)
            }
        }
        fetchAuthData()
        fetchData()
    }, [dispatch])
    return <>{children}</>
}