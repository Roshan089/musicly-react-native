import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'



// icons import
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { backgroundColor1, backgroundColor2, primaryColor, themecol } from '../style/theam';


 

const BottomNav = ({ activepage ,navigation}) => {
   
    return (
        <View style={styles.container}>

 



            {
                activepage == 'allmusic' ?
                    <Entypo name="folder-music" size={50} color="black" style={styles.iconactive}
                       
                    />
                    : <Entypo name="folder-music" size={50} color="black" style={styles.icon}
                    onPress={()=> navigation.navigate('allmusic')}
                       
                    />
            }

{
                activepage == 'player' ?
                <Feather name="headphones" size={50} color="black" style={styles.iconactive} />
                       
                    
                    :  <Feather name="headphones" size={50} color="black" style={styles.icon}
                    onPress={()=> navigation.navigate('player')}
                    />
            }
           
           {
                activepage == 'allplaylists' ?
                <MaterialCommunityIcons name="playlist-music" size={50} color="black" style={styles.iconactive}/>


                    : <MaterialCommunityIcons name="playlist-music" size={50} color="black"  style={styles.icon}
                    onPress={()=> navigation.navigate('allplaylists')}/>
                       
                  
            }

           


         



          

        </View>
    )
}

export default BottomNav

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        backgroundColor:'black',
       borderTopLeftRadius:20,
      borderTopRightRadius:20,
    },
    icon: {
        color: primaryColor,
        marginHorizontal:100,
        
    },
    iconactive: {
        color: primaryColor,
        backgroundColor:themecol,
        borderRadius:50,
        padding:10,
        position:'absolute',
        bottom:0,
        left:'40%',
    }
})