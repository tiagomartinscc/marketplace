import { Header } from "@components/Header";
import { VStack, Text } from "@gluestack-ui/themed";

export function Login() {
  return (
    <VStack flex={1} bgColor="$shape">
      <Header 
        title="Acesse sua conta"
        subtitle="Informe seu e-mail e senha para entrar"
      />
    </VStack>
  )
}