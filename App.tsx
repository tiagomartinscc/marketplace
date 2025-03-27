import { StatusBar } from 'expo-status-bar'
import { GluestackUIProvider } from '@gluestack-ui/themed'

import { 
  useFonts,
  Inter_700Bold,
} from '@expo-google-fonts/inter'

import { 
  Poppins_400Regular,
} from '@expo-google-fonts/poppins'

import { config } from './config/gluestack-ui.config'
import { Login } from '@screens/Login'
import { Register } from '@screens/Register'

import { Loading } from '@components/Loading'

export default function App() {
  const [ fontsLoaded ] = useFonts({Inter_700Bold, Poppins_400Regular})

  return (
    <GluestackUIProvider config={config} >
      <StatusBar style="auto" />
      {fontsLoaded ? <Register /> : <Loading />}
    </GluestackUIProvider>
  );
}

