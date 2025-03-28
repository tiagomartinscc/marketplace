import { VStack, ScrollView, Text } from "@gluestack-ui/themed"
import { HeaderUser } from "@components/HeaderUser"
import { Search } from "@components/Search"
import { Product } from "@components/Product"

export function Home() {
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