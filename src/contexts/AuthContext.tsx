import { createContext, ReactNode, useEffect, useState } from "react"

import { api } from "@services/api"

import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from "@storage/storageAuthToken"
import { SellerDTO } from "@dtos/SellerDTO"

export type AuthContextDataProps = {
  seller: SellerDTO
  getProfile: () => Promise<SellerDTO>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoadingUserStorageData: boolean
  isLogged: boolean
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

type AuthContextProviderProps = {
  children: ReactNode
}

type ResponseProfileProps = {
  seller: SellerDTO
}

export function AuthContextProvider({children}: AuthContextProviderProps) {
  const [seller, setSeller] = useState<SellerDTO>({} as SellerDTO)
  const [isLogged, setIsLogged] = useState(false)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  function tokenApiUpdate(accessToken: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  }

  async function signIn(email: string, password:string) {
    try {
      const {data} = await api.post('/sellers/sessions', {email, password})

      if(data.accessToken) {
        setIsLoadingUserStorageData(true)
        tokenApiUpdate(data.accessToken)
        setIsLogged(true)
        await storageAuthTokenSave(data.accessToken)

        await getProfile()
      }
    } catch(error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function getProfile() {
    try {
      const {data} = await api.get<ResponseProfileProps>('/sellers/me')
      setSeller(data.seller)
      return data.seller
    } catch(error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      
      setIsLogged(false)
      setSeller({} as SellerDTO)
      await storageAuthTokenRemove()

    } catch(error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true)
      const accessToken = await storageAuthTokenGet()
      if (accessToken) {
        setIsLogged(true)
        tokenApiUpdate(accessToken)
        await getProfile()
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])  

  return (
      <AuthContext.Provider value={{
        seller, 
        getProfile,
        signIn,
        signOut,
        isLogged,
        isLoadingUserStorageData
      }}>
        {children}
      </AuthContext.Provider>
  )
}

