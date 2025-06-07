import { useEffect, useState } from "react"
import { IUser } from "../../auth/types"

export function useUserByID(id: number) {
    const [user, setUser] = useState<IUser>()
    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch(`http://192.168.1.104:3000/user/${id}`)
                const user = await response.json()

                setUser(user)
                console.log("=====================")
                console.log(user)

            }
            catch (error) {

                if (error instanceof Error) {
                    console.log("=====================")
                    console.log(error)
                }

            }

        }
        getUser()

    }, [])
    return {user: user}
}


