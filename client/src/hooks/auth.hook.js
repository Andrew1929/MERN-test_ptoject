import {useCallback, useState , useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token , setToken ] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId , setUserId ] = useState(null)

    const login = useCallback( (jwtKey, Id) => {
        setToken(jwtKey)
        setUserId(Id)

        localStorage.setItem(storageName,JSON.stringify({
            userId: Id , token: jwtKey
        }))
    } , [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    } , [])

   useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if(data && data.token){
        login(data.token , data.userId)
    }
    setReady(true)
   } , [login])

    return {login,logout,token,userId,ready}
}