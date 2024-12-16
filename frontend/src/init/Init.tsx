import { ReactNode, useEffect } from "react"
import { useDispatch } from "react-redux"
import { getSession, isValidToken, setSession } from "../auth/utils"
import { setUser, setInitialized } from "../redux/auth/auth.slice"
import { setImages } from "../redux/image/image.slice"
import { getAllImages } from "../services/image.service"
import { getUser } from "../services/user.service"
import ImageType from "../types/image.type"
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
                const images: ImageType[] = await getAllImages()
                dispatch(setImages(images))
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