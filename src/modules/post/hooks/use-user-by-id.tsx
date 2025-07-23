import { useEffect, useState } from "react"
import { IUser } from "../../auth/types"
import { API_BASE_URL } from "../../../settings"

export function useUserByID(id: number) {
    const [user, setUser] = useState<IUser>()
    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch(`${API_BASE_URL}/user/${id}`)
                const user = await response.json()
                if (user.status === "error") {
                    return
                }
                setUser(user.data)
            }
            catch (error) {

                if (error instanceof Error) {

                    console.log(error)
                }
            }
        }
        getUser()

    }, [id])
    return { user: user }
}


