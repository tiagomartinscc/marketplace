import { useState } from "react"
import { VStack, ScrollView, Text } from "@gluestack-ui/themed"
import { useNavigation } from '@react-navigation/native'

import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Header } from "@components/Header"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"

type FormDataProps = {
  name: string
  phone: string
  email: string
  password: string
  passwordConfirmation: string
}

const signInSchema = yup.object({
  name: yup.string().required('Informe o nome.').email('Nome inválido'),
  phone: yup.string().required('Informe o telefone.').email('Telefone inválido'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido'),
  password: yup.string().required('Informe seua senha.'),
  passwordConfirmation: yup.string().required('Informe a confirmação da senha.')
})

export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  
  const navigator = useNavigation<AuthNavigatorRoutesProps>()
  
  const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  })

  async function handleRegister({email, password}: FormDataProps) {
    try {
      setIsLoading(true)
      console.log(email, password)
      // await signIn(email, password);
    } catch(error) {
      setIsLoading(false)
      // const isAppError = error instanceof AppError
      // const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde'
      // toast.show({
      //   placement: 'top',
      //   render: ({id}) => (
      //     <ToastMessage
      //       id={id}
      //       title={title}
      //       action="error"
      //       onClose={() => toast.close(id)}
      //   /> )
      // })      
    }
  }

  function handleLogin() {
    navigator.navigate('login')
  }

  return (
  <ScrollView 
    contentContainerStyle={{ flexGrow: 1}}
    showsVerticalScrollIndicator={false}
  >
    <VStack flex={1} bgColor="$white">
      <Header 
        title="Crie sua conta"
        subtitle="Informe os seus dados pessoais e de acesso"
      />

      <VStack flex={1} px="$10" pb="$16">
        
        <Controller 
          control={control}
          name="name"
          render={({field: {onChange, value}}) => (
            <Input 
              label="Nome"
              icon='user'
              placeholder="seu nome completo"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}                  
            />
          )}
        />

        <Controller 
          control={control}
          name="phone"
          render={({field: {onChange, value}}) => (
            <Input 
              label="Telefone"
              icon='phone'
              placeholder="(00) 00000-0000"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.phone?.message}                  
            />
          )}
        />

        <Text fontWeight="$bold" fontFamily="$heading" mb="$3">Acesso</Text>

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

        <Controller 
          control={control}
          name="passwordConfirmation"
          render={({field: {onChange, value}}) => (            
            <Input 
              label="Confirmar Senha"
              icon="key-round"
              placeholder="Confirme a senha" 
              secureTextEntry
              onChangeText={onChange}
              value={value}
              errorMessage={errors.passwordConfirmation?.message}                     
              />
            )}
        />        

        <Button 
          title="Cadastrar"
          icon="arrow-right"
          onPress={handleSubmit(handleRegister)}
          isLoading={isLoading}   
        />
      </VStack>
      <VStack px="$10" pb="$16">
        <Text mb='$3' >Já tem uma conta?</Text>
        <Button 
          title="Acessar"
          variant="outline"
          icon="arrow-right"
          onPress={handleLogin}
        />
      </VStack>
    </VStack>
    </ScrollView>
  )
}