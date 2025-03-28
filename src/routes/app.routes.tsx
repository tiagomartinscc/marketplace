import { Platform } from 'react-native'
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

import { gluestackUIConfig } from '../../config/gluestack-ui.config'

import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'
import { Product } from '@screens/Product'

import UserSvg from '@assets/user.svg'
import ProductsSvg from '@assets/products.svg'

type AppRoutes = {
  home: undefined;
  profile: undefined;
  product: {productId: string};
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { tokens } = gluestackUIConfig
  const iconSize = tokens.space["6"]

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: tokens.colors.orangeBase,
      tabBarInactiveTintColor: tokens.colors.gray100,
      tabBarShowLabel: true,
      tabBarStyle: {
        backgroundColor: tokens.colors.white,
        borderTopWidth: 0,
        height: Platform.OS === 'android' ? 80 : 98,
        paddingBottom: tokens.space['12'],
        paddingTop: tokens.space['2'],
      }
    }}>
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: "Produtos",
          tabBarIcon: ({color}) => <ProductsSvg fill={color} width={iconSize} height={iconSize} />
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({color}) => <UserSvg fill={color} width={iconSize} height={iconSize} />
        }}
      />
    </Navigator>
  )
}
