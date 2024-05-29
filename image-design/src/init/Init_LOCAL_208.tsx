import { ReactNode, useEffect } from "react"
import { useDispatch } from "react-redux"
import { getSession, isValidToken, setSession } from "../auth/utils"
import { setUser, setInitialized } from "../redux/auth/auth.slice"
import { selectDesignedImages } from "../redux/designedImage/designedImage.selector"
import { setDesignedImages } from "../redux/designedImage/designedImage.slice"
import { setDesignTemplates } from "../redux/designTemplate/designTemplate.slice"
import { setImages } from "../redux/image/image.slice"
import { getAllDesignedImages } from "../services/designedImage.service"
import { getAllTemplates } from "../services/designTemplate.service"
import { getAllImages } from "../services/image.service"
import { getUser } from "../services/user.service"
import DesignedImage from "../types/designedImage.type"
import DesignTemplate from "../types/designTemplate.type"
import ImageType from "../types/image.type"
import { UserType } from "../types/user.types"

type Props = {
    children: ReactNode
}
export default function Init({ children }: Props) {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const images: ImageType[] = await getAllImages()
                dispatch(setImages(images))
                const token: string | null = getSession()
                if (token && isValidToken(token)) {
                    try {
                        const user: UserType = await getUser(token)
                        dispatch(setUser({ id: user.id, fullName: user.fullName! }))
                        setSession(token)
                    } catch (error) {
                        console.error("Error fetching user:", error)
                    }
                    finally {
                        dispatch(setInitialized())
                    }
                } else {
                    dispatch(setInitialized())
                }
                dispatch(setImages(images))
            }
            catch (error) {
                console.error("Error fetching data: ", error)
            }
        }
        fetchData()
    }, [])
    return <>{children}</>
}