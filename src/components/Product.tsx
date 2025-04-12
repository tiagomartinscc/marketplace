import { TouchableOpacity } from "react-native"
import { Image, Text, HStack, Box, Card } from "@gluestack-ui/themed"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { useNavigation } from '@react-navigation/native'
import { ProductDTO } from "@dtos/ProductDTO"

type Props = {
  data: ProductDTO
}

export function Product({data}: Props) {
  console.log(data)
  const navigator = useNavigation<AppNavigatorRoutesProps>()
  const formatPrice = new Intl.NumberFormat("pt-BR", { style: "decimal" })
  .format(data.priceInCents / 100)

  function handleProductDetails(productId: string) {
    navigator.navigate('product', {productId})
  }

  return (
    <TouchableOpacity onPress={() => handleProductDetails(data.id)}>
      <Card px="$2" bg="$white" m="$3" h={180} w={170}>
        <Image
          source={{ uri: data.attachments[0].url }}
          style={{ width: "100%", height: 80 }}
          resizeMode="contain"
          alt="Image"
          rounded="$md"
          alignSelf="center"
        />
        <Text>{data.title}</Text>
        <HStack justifyContent="flex-start">
          <Text fontSize="$xs" fontWeight="$bold" >R$ </Text>
          <Text fontWeight="$bold">{formatPrice}</Text>
        </HStack>
      </Card>
    </TouchableOpacity>
  )
}