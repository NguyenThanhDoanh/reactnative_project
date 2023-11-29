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



export default function Register({ navigation }) {

    const [email, setEmail] = useState('doanh@gmail.com');
    const [password, setPassword] = useState('123456');
    const [name, setName] = useState('Doanh');
    const [avatar,setAvatar] = useState('');
    const [phone, setPhone] = useState('123465');
    const registerUser = async () => {
      try{
        await createUserWithEmailAndPassword(authentication, email, password)
        .then (userCredential => { 
          const UserUID = userCredential.user.uid;
          const docRef = doc(db, 'ChatStore', UserUID);
          const docSnaps = setDoc(docRef, {
            name,
            email,
            phone,
            password,
            avatarUrl: avatar ? avatar:"https://catscanman.net/wp-content/uploads/2023/02/meme-buon-ngu-2.png",
            UserUID
          });
          
        })
        return true;
      } catch (error) {
        
        return false;
      }
    
    }
    
    
    return (
        <View style={{backgroundColor:"#FFFFFF", flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontWeight:700,fontSize:36,color:"#5CE1FE", flex:0.2}}>Đăng ký</Text>
            <View style={{flex:0.6,justifyContent:'space-around'}}>
            <TouchableOpacity style={{borderWidth:1, borderRadius:10, borderColor:'#5CE1FE', width:279,height:44, paddingLeft:20}} >
                <Text style={{  }}>Name</Text>
                <TextInput
                  style={{fontWeight:400,fontSize:20,height:44}}
                  placeholder="Name"
                  placeholderTextColor={'#00000085'}
                  value={name}
                  onChangeText={text => setName(text)}
                />
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:1, borderRadius:10, borderColor:'#5CE1FE', width:279,height:44, paddingLeft:20}} >
                <Text style={{  }}>Email</Text>
                <TextInput
                  style={{fontWeight:400,fontSize:20,height:44}}
                  placeholder="Email"
                  placeholderTextColor={'#00000085'}
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:1, borderRadius:10, borderColor:'#5CE1FE', width:279,height:44, paddingLeft:20}} >
                <Text style={{  }}>Phone</Text>
                <TextInput
                  style={{fontWeight:400,fontSize:20,height:44}}
                  placeholder="Số điện thoại"
                  placeholderTextColor={'#00000085'}
                  value={phone}
                  onChangeText={text => setPhone(text)}
                />
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:1, borderRadius:10, borderColor:'#5CE1FE', width:279,height:44, paddingLeft:20}} >
                <Text style={{  }}>Mật Khẩu</Text>
                <TextInput
                  style={{fontWeight:400,fontSize:20,height:44}}
                  placeholder="Mật khẩu"
                  placeholderTextColor={'#00000085'}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:1, borderRadius:10, borderColor:'#5CE1FE', width:279,height:44, paddingLeft:20}} >
                <Text style={{  }}>AvatarUrl</Text>
                <TextInput
                  style={{fontWeight:400,fontSize:20,height:44}}
                  placeholder="AvatarUrl"
                  placeholderTextColor={'#00000085'}
                  onChangeText={text => setAvatar(text)}
                />
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
            onPress={async () => {
              const registerSuccess = await registerUser();
              if (registerSuccess) {
                navigation.navigate('Login');
              }
              else {
                alert('Đăng ký thất bại');
              }
            }}
            style={{backgroundColor:"#5CE1FE",borderRadius:30,width:197,height:62,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:"#FFFFFF",fontSize:24, fontWeight:700}}>Đăng ký</Text>
            </TouchableOpacity>
          
            
        </View>
    );
}