'use client'

import { createContext, useContext } from 'react'

export interface User {
  _id: string
  fullName: string
  mobileNo: string
  email: string
  address: string
  shopName: string
  shopAddress: string
  isOwner: boolean
}

export const UserContext = createContext<User | null>(null)

export const useUser = () => {
  const ctx = useContext(UserContext)
  if (!ctx) {
    throw new Error('useUser must be used inside UserContext.Provider')
  }
  return ctx
}
