import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import { 
  useFonts,
  Inter_700Bold,
} from '@expo-google-fonts/inter'

import { 
  Poppins_400Regular,
} from '@expo-google-fonts/poppins'

export default function App() {
  const [ fontsLoaded ] = useFonts({Inter_700Bold, Poppins_400Regular})

  return (
    <View>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

