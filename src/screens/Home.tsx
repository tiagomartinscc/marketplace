import { VStack, ScrollView, Text } from "@gluestack-ui/themed"
import { HeaderUser } from "@components/HeaderUser"
import { Search } from "@components/Search"

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
        
      </VStack>

    </ScrollView>
  )
}