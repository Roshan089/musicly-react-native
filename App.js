import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Allmusic from './src/screen/allmusic';
import Player from './src/screen/player';
import Allplaylist from './src/screen/allplaylist';
import * as  MediaLibrary from "expo-media-library"
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  
  const[allsongs,setallsongs]=useState('no permission')

  const permissionPopUp = async () => {
    Alert.alert("Permission Required", "This app requires permission to access your media library", [
        {
            text: "Accept", onPress: () => {
                MediaLibrary.requestPermissionsAsync()
                getAllSongs()
            }
        },
        { text: "Cancel", onPress: () => permissionPopUp() }
    ])
}
const getpermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    // console.log(permission);

    // {"canAskAgain": true, "expires": "never", "granted": true, "status": "granted"}
    // {"canAskAgain": true, "expires": "never", "granted": false, "status": "undetermined"}

    if (permission.granted == true) {
        console.log("Permission Granted, showing all music");
        getAllSongs();
    }

    if (permission.granted == false && permission.canAskAgain == true) {
        const askpermission = await MediaLibrary.requestPermissionsAsync();
        // console.log(askpermission);

        if (askpermission.status == "denied" && askpermission.canAskAgain == true) {
            permissionPopUp();
            getAllSongs();
            console.log("Permission Denied, Please allow permission to show all music");
        }
        if (askpermission.status == "granted") {
            getAllSongs()
            console.log("Permission Granted, showing all music");
        }
        if (askpermission.status == "denied" && askpermission.canAskAgain == false) {
            console.log("Can't Show Music");
        }
    }
}
const getAllSongs = async () => {
    const songs = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
    })
   
     //console.log(songs);
     setallsongs(songs.assets)
   // return songs?.assets;
    console.log(allsongs);
}

useEffect(() => {
  getpermission();
  
}, [])
  
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
