import { useEffect, useState } from "react"

export const useEffectSkipMount = (cb: VoidFunction, dependancyArr: any[]) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if (!mounted) {
            setMounted(true)
            return
        }
        cb()
    }, dependancyArr)
}