import { useState } from "react"
import { VStack, ScrollView, Text, useToast } from "@gluestack-ui/themed"
import { useNavigation } from '@react-navigation/native'

import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"
import { useAuth } from "@hooks/useAuth"
import { AppError } from "@utils/AppError"

import { Header } from "@components/Header"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { ToastMessage } from "@components/ToastMessage"

type FormDataProps = {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido'),
  password: yup.string().required('Informe seua senha.')
})

export function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const toast = useToast()
  const navigator = useNavigation<AuthNavigatorRoutesProps>()

  const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  })

  async function handleSignIn({email, password}: FormDataProps) {
    try {
      setIsLoading(true)
      await signIn(email, password);
    } catch(error) {
      setIsLoading(false)
      console.log(error)
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde'
      toast.show({
        placement: 'top',
        render: ({id}) => (
          <ToastMessage
            id={id}
            title={title}
            action="error"
            onClose={() => toast.close(id)}
        /> )
      })      
    }
  }

  function handleRegister( ) {
    navigator.navigate('register')
  }

  return (
  <ScrollView 
    contentContainerStyle={{ flexGrow: 1}}
    showsVerticalScrollIndicator={false}
  >
    <VStack flex={1} bgColor="$white">
      <Header 
        title="Acesse sua conta"
        subtitle="Informe seu e-mail e senha para entrar"
      />

      <VStack flex={1} px="$10" pb="$16">
        <Controller 
          control={control}
          name="email"
          render={({field: {onChange, value}}) => (
            <Input 
              label="E-mail"
              icon='mail'
              placeholder="mail@exemplo.br"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}                  
            />
          )}
        />

        <Controller 
          control={control}
          name="password"
          render={({field: {onChange, value}}) => (            
            <Input 
              label="Senha"
              icon="key-round"
              placeholder="Sua senha" 
              secureTextEntry
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}                     
              />
            )}
        />

        <Button 
          title="Acessar"
          icon="arrow-right"
          onPress={handleSubmit(handleSignIn)}
          isLoading={isLoading}   
        />
      </VStack>
      <VStack px="$10" pb="$16">
        <Text mb='$3' >Ainda não tem uma conta?</Text>
        <Button 
          title="Cadastrar"
          variant="outline"
          icon="arrow-right"
          onPress={handleRegister}
        />
      </VStack>
    </VStack>
    </ScrollView>
  )
}
