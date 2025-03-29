import { 
  useFonts,
  Inter_700Bold,
} from '@expo-google-fonts/inter'

import { 
  Poppins_400Regular,
} from '@expo-google-fonts/poppins'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from './config/gluestack-ui.config'

import { Routes } from '@routes/index'

import { Loading } from '@components/Loading'

import { AuthContextProvider } from '@contexts/AuthContext'

export default function App() {
  const [ fontsLoaded ] = useFonts({Inter_700Bold, Poppins_400Regular})

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GluestackUIProvider config={config} >
        <StatusBar style="auto" />
        <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
        </AuthContextProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

