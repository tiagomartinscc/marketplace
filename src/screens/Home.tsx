import { VStack, ScrollView, Text } from "@gluestack-ui/themed"
import { HeaderUser } from "@components/HeaderUser"

export function Home() {
  return (
    <VStack flex={1} bgColor="$shapeBackground" mt="$10">
      <VStack flex={1} px="$10" pb="$16">
        <HeaderUser />
        <Text mb='$3'>Explore produtos</Text>
        
      </VStack>
    </VStack>
  )
}