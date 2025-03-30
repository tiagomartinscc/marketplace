import { useCallback, useState } from "react"
import { useFocusEffect } from '@react-navigation/native'

import { VStack, ScrollView, Text, useToast } from "@gluestack-ui/themed"

import { HeaderUser } from "@components/HeaderUser"
import { Search } from "@components/Search"
import { Product } from "@components/Product"
import { api } from "@services/api"
import { ProductDTO } from "@dtos/ProductDTO"
import { AppError } from "@utils/AppError"
import { ToastMessage } from "@components/ToastMessage"

type ResponseProducts = {
  products: ProductDTO[]
}

export function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<ProductDTO[]>([])
  const toast = useToast()

  async function fetchProducts() {
    try {
      setIsLoading(true)
      const {data} = await api.get<ResponseProducts>('/products/me')
      console.log(data)
      setProducts(data.products)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível listar os produtos. Tente novamente mais tarde'
      toast.show({
        placement: 'top',
        render: ({id}) => (
          <ToastMessage
            id={id}
            title={title}
            action="error"
            onClose={() => toast.close(id)}
        /> )
      })      
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchProducts()
  }, []))  

  return (
    <ScrollView bgColor="$white">
      <VStack mt="$10">
        <VStack px="$10">
          <HeaderUser />
          <Text mr='$6'>Explore produtos</Text>
          <Search />
        </VStack>
      </VStack>

      <VStack flex={1} py="$4" px="$10" pb="$16" bgColor="$shapeBackground">
        <Product 
          title="Sofá"
          priceInCents={234589}
          image="https://images.colombo.com.br/produtos/942896/942896_S079Chumbo_03_g.jpg?ims=550x550"
        />
      </VStack>

    </ScrollView>
  )
}