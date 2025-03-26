import { Center, VStack, Image, Text, Heading } from "@gluestack-ui/themed";
import Logo from '@assets/logo.svg'

type Props = {
  title: string
  subtitle: string
}

export function Header({title, subtitle}: Props) {
  return (
    <VStack>
      <Center marginVertical="$10">
        <Logo />
        <Heading size="2xl" mt="$6">{title}</Heading>
        <Text>{subtitle}</Text>
      </Center>
    </VStack>
  )
}