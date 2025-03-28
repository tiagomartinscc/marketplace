import { HStack, Icon, Box, Button } from "@gluestack-ui/themed"
import { Input } from './Input'

import { SlidersVertical } from 'lucide-react-native'

export function Search() {
  return (
    <HStack alignItems="center" justifyContent="space-between" gap="$6" width="80%">
      <Input
        placeholder="Pesquisar"
        icon="search"
      />

      <Button 
        bg="$shapeBackground"
        borderWidth={1}
        borderColor="$orangeBase"
        borderRadius="$xl"
        p="$0.5"
      >
        <Icon color="$orangeBase" as={SlidersVertical} size='sm' />
      </Button>
    </HStack>
  )
}