import { Center, Spinner } from "@gluestack-ui/themed"

export function Loading() {
  return (
    <Center flex={1} bg="$shape">
      <Spinner color="$orangeBase" />
    </Center>
  )
}