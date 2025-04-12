import { useCallback, useState } from "react"
import { useFocusEffect } from '@react-navigation/native'

import { VStack, Text, useToast, Box } from "@gluestack-ui/themed"

import { HeaderUser } from "@components/HeaderUser"
import { Search } from "@components/Search"
import { Product } from "@components/Product"
import { api } from "@services/api"
import { ProductDTO } from "@dtos/ProductDTO"
import { AppError } from "@utils/AppError"
import { ToastMessage } from "@components/ToastMessage"
import { FlatList } from "react-native"
import { Loading } from "@components/Loading"

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
      console.log(data.products)
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
    <VStack bgColor="$white" flex={1}>
      <VStack mt="$10">
        <VStack px="$10">
          <HeaderUser />
          <Text mr='$6'>Explore produtos</Text>
          <Search />
        </VStack>
      </VStack>

      <VStack flex={1} py="$4" px="$1" height="$full" bgColor="$shapeBackground">
        {isLoading ? <Loading /> : (
          <FlatList
            data={products}
            keyExtractor={product => product.id}
            numColumns={2} // Define 2 colunas
            renderItem={({ item }) => (
              // <Text>{item.title}</Text>
              <Product data={item} />
            )}
            columnWrapperStyle={{ justifyContent: 'space-between' }} // Ajusta o espaçamento entre colunas
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        )}
      </VStack>

    </VStack>
  )
}