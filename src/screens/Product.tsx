import { VStack, Text, HStack, Icon} from "@gluestack-ui/themed"
import { TouchableOpacity } from "react-native"
import { ArrowLeft } from "lucide-react-native"
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from "@routes/app.routes"

export function Product() {
  const navigator = useNavigation<AppNavigatorRoutesProps>();
  function handleGoBack() {
    navigator.goBack()
  }

  return (
    <VStack flex={1} bgColor="$shapeBackground" mt="$10">
      <VStack flex={1} px="$10" pb="$16">
      <TouchableOpacity onPress={handleGoBack}>
          <HStack gap="$3" mb="$5">
            <Icon size='xl' color="$orangeBase" as={ArrowLeft} />
            <Text color="$orangeBase">Voltar</Text>
          </HStack>
        </TouchableOpacity>
        <Text mb='$3'>Product</Text>
      </VStack>
    </VStack>
  )
}