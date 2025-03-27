import { HStack, VStack, Text, Heading, Icon } from "@gluestack-ui/themed"
import { TouchableOpacity } from "react-native"
import { ArrowRight } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from "@routes/app.routes"


export function HeaderUser() {
  const navigator = useNavigation<AppNavigatorRoutesProps>()
  function handleProfile() {
    navigator.navigate('profile')
  }

  return (
    <HStack>
      <Text>Foto</Text>
      <VStack ml="$6">
        <Text fontSize="$md" fontWeight="$bold" fontFamily="$heading" mb="$3">Olá, Tiago</Text>
        <TouchableOpacity onPress={handleProfile}>
          <HStack gap="$3">
            <Text color="$orangeBase">Ver perfil</Text>
            <Icon size='xl' color="$orangeBase" as={ArrowRight} />
          </HStack>
        </TouchableOpacity>
        
      </VStack>
    </HStack>
  )
}