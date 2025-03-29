import AsyncStorage from "@react-native-async-storage/async-storage"

import { AUTH_TOKEN_STORAGE } from '@storage/storageConfig'

export async function storageAuthTokenSave(accessToken: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify(accessToken))
}

export async function storageAuthTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)
  const accessToken = response ? JSON.parse(response) : undefined
  return accessToken
}

export async function storageAuthTokenRemove() {
  return await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}