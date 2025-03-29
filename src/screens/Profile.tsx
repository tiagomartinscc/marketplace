import { VStack, Text, Icon, Box, Image} from "@gluestack-ui/themed"
import { TouchableOpacity } from "react-native"
import { LogOut } from "lucide-react-native"
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from "@routes/app.routes"

import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { useState } from "react"
import { useAuth } from "@hooks/useAuth"

type FormDataProps = {
  name: string
  phone: string
  email: string
  password: string
  newPassword: string
}

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome.').email('Nome inválido'),
  phone: yup.string().required('Informe o telefone.').email('Telefone inválido'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido'),
  password: yup.string().required('Informe seua senha.'),
  newPassword: yup.string().required('Informe a confirmação da senha.')
})

export function Profile() {
  const [isLoading, setIsLoading] = useState(false)
  const { signOut } = useAuth()
  const navigator = useNavigation<AppNavigatorRoutesProps>()

  const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
    resolver: yupResolver(profileSchema)
  })  

  function handleUpdate() {
    navigator.goBack()
  }

  async function handleLogout() {
    await signOut()
  }

  function handleGoBack() {
    navigator.goBack()
  }

  return (
    <VStack flex={1} bgColor="$shapeBackground" mt="$10">
      <VStack flex={1} px="$10" pb="$16">
        <Box 
          flexDirection="row"
          alignItems="flex-start"
          justifyContent="center"
          width="$full"
        >
          <Box flex={1} width="$1/3"></Box>

          <Box flex={1} width="$1/3" alignItems="center">
            <TouchableOpacity onPress={handleGoBack}>
              <Image
                source={{ uri: 'https://dummyimage.com/250/ffffff/000000' }}
                style={{ width: 100, height: 100 }}
                alt=""
              />
            </TouchableOpacity>
          </Box>

          <Box flex={1} width="$1/3" alignItems="flex-end">
            <TouchableOpacity onPress={handleLogout}>
              <Box
                borderColor="$danger"
                borderWidth={1}
                p="$2"
                borderRadius="$lg"
                width="$9"

              >
                  <Icon as={LogOut} color="$danger" />
              </Box>
          </TouchableOpacity>
          </Box>
        </Box>

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
              label="Senha atual"
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
          name="newPassword"
          render={({field: {onChange, value}}) => (            
            <Input 
              label="Nova Senha"
              icon="key-round"
              placeholder="Sua nova senha" 
              secureTextEntry
              onChangeText={onChange}
              value={value}
              errorMessage={errors.newPassword?.message}                     
              />
            )}
        />        

        <Button 
          title="Atualizar Cadastro"
          icon="arrow-right"
          onPress={handleSubmit(handleUpdate)}
          isLoading={isLoading}   
        />        
      
      </VStack>
    </VStack>
  )
}