
import { View, Text, Image, Button, Pressable, TextInput, FlatList, ScrollView, TouchableOpacity, SectionList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { authentication } from '../firebase/firebaseconfig';
import { addDoc, collection, serverTimestamp , doc, onSnapshot, query, orderBy} from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';

function HeaderBar({ navigation,item }) {
  return (
    <View style={{ height: 65, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',backgroundColor:'#2D9EB7' }}>
      <TouchableOpacity onPress={() => { navigation.navigate('Main_Chat') }} style={{flex:0.3}}>

        <Ionicons name="arrow-back" size={30} color="black" />

      </TouchableOpacity>
      <View style={{flex:0.3,alignItems:'center'}}>
        <Text style={{ color: '#262933', fontSize: 20, fontWeight: 650 }}>{item.name}</Text>
        <Text style={{}}>Online</Text>
      </View>
      <View style={{ flexDirection: 'row',flex:0.3,justifyContent:'space-around' }}>
        <TouchableOpacity onPress={() => { }}>

          <MaterialIcons name="call" size={30} color="black" />

        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }}>

          <MaterialCommunityIcons name="account-details" size={30} color="black" />

        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Screen_03({ navigation ,route}) {
  const uid = route.params.item.UserUID;
  const {item} = route.params;
  const [messages, setMessages] = useState([]);
  const currentUser = authentication?.currentUser?.uid;
  

  useEffect(() => {
    const chatId = uid > currentUser ? `${uid + '-' + currentUser}` : `${currentUser + '-' + uid}`;
    const docref = doc(db, 'chatrooms', chatId);
    const colRef = collection(docref, 'messages');
    const q = query(colRef, orderBy('createdAt',"desc"));
    const unsubcribe = onSnapshot(q, (onSnap) => {
      const allMsg = onSnap.docs.map(mes => {
        if(mes.data().createdAt){
          return{
            ...mes.data(),
            createdAt:mes.data().createdAt.toDate()
          }
        }else{
          return{
            ...mes.data(),
            createdAt:new Date()
          }
        }
        

      })
      setMessages(allMsg)
    })

      return () => {
        unsubcribe()
      }
  },[])

  const onSend = useCallback((messagesArray) => {
    const msg = messagesArray[0];
    // console.log(myMsg)
    const myMsg = {
      ...msg,
      sentBy:currentUser,
      sentTo:uid,
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg))
    const chatId = uid > currentUser ? `${uid + '-' + currentUser}` : `${currentUser + '-' + uid}`;
    const docref = doc(db, 'chatrooms', chatId);
    const colRef = collection(docref, 'messages');
    const chatSnap = addDoc(colRef, {
      ...myMsg,
      createdAt:serverTimestamp(),
    })

  }, [])
  return (
    <View style={{ flex: 1 }}>
    <HeaderBar navigation={navigation} item={item}/>
    <View style={{ flex: 0.9 }}>
      <GiftedChat
        messages={messages}
        onSend={text => onSend(text)}
        user={{
          _id: currentUser,
          
        }}
      />
    </View>
  </View>
  )
}

const styles = StyleSheet.create({})