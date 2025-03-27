import { VStack, ScrollView, Text } from "@gluestack-ui/themed"

export function Home() {
  return (
    <VStack flex={1} bgColor="$shapeBackground">
      <VStack flex={1} px="$10" pb="$16">
        <Text mb='$3'>Home</Text>
      </VStack>
    </VStack>
  )
}