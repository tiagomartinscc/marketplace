import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'
import { Box } from '@gluestack-ui/themed'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

import { useAuth } from '@hooks/useAuth'
import { Loading } from '@components/Loading'

export function Routes() {
  const { isLogged, isLoadingUserStorageData } = useAuth()
  // console.log('isLogged', isLogged)
  
  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.shapeBackground

  if(isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="$shapeBackground">
      <NavigationContainer theme={theme}>
        {isLogged ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}