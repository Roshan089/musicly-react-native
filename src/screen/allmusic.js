import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomNav from '../components/bottomnav'
import * as  MediaLibrary from "expo-media-library"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setallsongs } from '../redux/action';

const Allmusic = ({navigation}) => {

 //const[allsongs,setallsongs]=useState('no permission')

  const [mysongs]= useSelector(state=> state.allsongs)
   console.log(mysongs)

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
//const dispatch = useDispatch;
    if (permission.granted == true) {
        console.log("Permission Granted, showing all music");
        getAllSongs();
      //  dispatch(setallsongs(mysongs))
       console.log(mysongs);
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
const dispatch = useDispatch;
const getAllSongs = async () => {
    const songs = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
    })
     dispatch (setallsongs(songs));
        // console.log(songs);
       
}

useEffect(() => {
  getpermission();
  
}, [])
  return (
    <View style={styles.container}>
      <Text>Allmusic</Text>
      <View style={styles.bottomnav}>
        <BottomNav activepage={'allmusic'} navigation={navigation}/>
      </View>
    </View>
  )
}

export default Allmusic

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomnav: {
    position: 'absolute',
    bottom: 0,
    width:'100%',
    alignItems: 'center'
  }
})