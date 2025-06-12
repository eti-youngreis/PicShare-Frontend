import { ReactNode, useEffect } from "react"
import { useDispatch } from "react-redux"
import { getSession, isValidToken, setSession } from "../auth/utils"
import { setUser, setInitialized } from "../redux/auth/auth.slice"
import { setPhotos } from "../redux/photo/photo.slice"
import { getAllImages } from "../services/photo.service"
import { getUser } from "../services/user.service"
import { PhotoType } from "../types/photo.type"
import { UserType } from "../types/user.types"

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
                    const user: UserType = await getUser(token)
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
                const images: PhotoType[] = await getAllImages()
                dispatch(setPhotos(images))
            }
            catch (error) {
                console.error("Error fetching data: ", error)
            }
        }
        fetchAuthData()
        fetchData()
    }, [])
    return <>{children}</>
}