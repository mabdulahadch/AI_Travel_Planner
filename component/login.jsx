import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function login() {

    const router= useRouter();
  return (
    <View>
      <Image
        source={require('./../assets/images/loginimage.jpeg')}
            style={{
                width:'100%',
                height:500
            }}
      />
      <View style={styles.container}>
        <Text style={{
            fontSize:30,
            fontFamily:'outfit-bold',
            textAlign:'center',
            marginTop:10

        }}>AI Travel Planner </Text>

        <Text style={{
            fontFamily:'outfit',
            fontSize:17,
            textAlign:'center',
            color:Colors.GREY,
            marginTop:25
        }}>
            Discover your next adventure effortlessly. Personalized itineraries at your fongertips. Travel smater with AI-driver insights.
        </Text>
            {/* path must be ('auth/sign-in') */}
        <TouchableOpacity 
            style={styles.button}
            onPress={()=> router.push('auth/sign-in')}

        >
            <Text style={{
                color:Colors.WHITE,
                textAlign:'center',
                fontFamily:'outfit-medium'
            }}>
                Get Started
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.WHITE,
        marginTop:-20,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:25,
        height:'100%'
    },
    button:{
        padding:20,
        backgroundColor:Colors.PRIMARY,
        borderRadius:99,
        marginTop:'10%'
    }
})