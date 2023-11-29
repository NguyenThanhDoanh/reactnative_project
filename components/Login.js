import React, { useState } from 'react';
import { View, Text, Image, Button, Pressable, TextInput, FlatList, ScrollView, TouchableOpacity, SectionList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '../firebase/firebaseconfig';
import { db } from '../firebase/firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';



export default function Login({ navigation }) {

    const [email, setEmail] = useState('doanh@gmail.com');
    const [password, setPassword] = useState('123456');
    const loginUser = async () => {
      try {
        await signInWithEmailAndPassword(authentication, email, password);
        console.log('Đăng nhập thành công');
        return true;
      } catch (error) {
        console.log('Đăng nhập thất bại:', error);
        return false;
      }
    }
    
    return (
        <View style={{backgroundColor:"#FFFFFF", flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontWeight:700,fontSize:36,color:"#5CE1FE", flex:0.2}}>CHATAPP</Text>
            <View style={{flex:0.6,justifyContent:'space-around'}}>
           
                <TouchableOpacity style={{borderWidth:1, borderRadius:10, borderColor:'#5CE1FE', width:279,height:44, paddingLeft:20}} >
                <Text style={{  }}>Email:</Text>
                <TextInput
                  style={{fontWeight:400,fontSize:20,height:44}}
                  placeholder="Email"
                  placeholderTextColor={'#00000085'}
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
                </TouchableOpacity>
                
                <TouchableOpacity style={{borderWidth:1, borderRadius:10, borderColor:'#5CE1FE', width:279,height:44, paddingLeft:20}} >
                <Text style={{  }}>Password:</Text>
                 <TextInput
                  style={{fontWeight:400,fontSize:20,height:44}}
                  placeholder="Mật khẩu"
                  placeholderTextColor={'#00000085'}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
                </TouchableOpacity>
               
            </View>
            
            <TouchableOpacity 
            onPress={
              async () => {
                const loginSuccess = await loginUser();
                if (loginSuccess) {
                  navigation.navigate('Main_Chat');
                }
                else {
                  alert('Đăng nhập thất bại');
                }
              }
            }
            style={{backgroundColor:"#5CE1FE",borderRadius:30,width:197,height:62,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:"#FFFFFF",fontSize:24, fontWeight:700}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={
               () => {
                  navigation.navigate('Register');
              }
            }
            style={{backgroundColor:"#5CE1FE",borderRadius:30,width:197,height:62,alignItems:'center',justifyContent:'center',marginTop:10}}>
                <Text style={{color:"#FFFFFF",fontSize:24, fontWeight:700}}>Register</Text>
            </TouchableOpacity>
            
        </View>
    );
}