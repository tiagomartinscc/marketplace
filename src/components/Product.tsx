import { Button, Image, Card, Text, HStack } from "@gluestack-ui/themed"
import { TouchableOpacity } from "react-native"

type Props = {
  title: string
  priceInCents: number
  image: string
}

export function Product({title, priceInCents, image}: Props) {
  const formatPrice = new Intl.NumberFormat("pt-BR", { style: "decimal" })
  .format(priceInCents / 100)

  return (
    <TouchableOpacity>
      <Card p="$2" height="$full" borderRadius="$lg" maxWidth={160} m="$3"  justifyContent="flex-start">
        <Image 
          source={{
            uri: image
          }}
          resizeMode="cover"
          alt="Image"
          rounded="$md"
          alignSelf="center"
        />
        <Text>{title}</Text>
        <HStack justifyContent="flex-start">
          <Text fontSize="$xs" fontWeight="$bold" >R$ </Text>
          <Text fontWeight="$bold">{formatPrice}</Text>
        </HStack>
      </Card>
    </TouchableOpacity>
  )
}