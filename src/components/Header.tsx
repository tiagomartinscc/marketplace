import { Center, VStack, Text, Heading } from "@gluestack-ui/themed";
import Logo from '@assets/logo.svg'

type Props = {
  title: string
  subtitle: string
}

export function Header({title, subtitle}: Props) {
  return (
    <VStack>
      <Center marginVertical="$10">
        <Logo width={64} />
        <Heading size="xl" mt="$6">{title}</Heading>
        <Text size="sm">{subtitle}</Text>
      </Center>
    </VStack>
  )
}