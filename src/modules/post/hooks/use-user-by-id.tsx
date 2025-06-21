import { useEffect, useState } from "react"
import { IUser } from "../../auth/types"

export function useUserByID(id: number) {
    const [user, setUser] = useState<IUser>()
    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch(`http://192.168.1.106:3000/user/${id}`)
                const user = await response.json()
                if (user.status === "error"){
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
    return {user: user}
}


