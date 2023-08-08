import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Allmusic from './src/screen/allmusic';
import Player from './src/screen/player';
import Allplaylist from './src/screen/allplaylist';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="allmusic" component={Allmusic} options={
            { headerShown: false }
          } />
      <Stack.Screen name="player" component={Player} options={
            { headerShown: false }
          } />
           <Stack.Screen name="allplaylists" component={Allplaylist } options={
            { headerShown: false }
          } />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
