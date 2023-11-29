import React, { useState } from 'react';
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
import { useEffect } from 'react';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { authentication, db } from '../firebase/firebaseconfig';
import moment from 'moment';
import {Linking} from 'react-native'


const Tab = createBottomTabNavigator();



function ListChat({ navigation }) {
  const currentDate = moment(Date.now()).format('MMMM Do YYYY');
  const [users, setUsers] = useState([]);
  const getUser = async () => {
    const docRef = collection(db, 'ChatStore');
    const qr = query(docRef, where('UserUID', '!=', authentication?.currentUser?.uid));
    const docSnaps = onSnapshot(qr, (onSnapshot) => {
      let data = []
      onSnapshot.docs.forEach((user) => {
        data.push({ ...user.data() });
        setUsers(data);
      })
    })
  }
  useEffect(() => {
    getUser();
  }, [])

  return (
    <ScrollView>
      <FlatList
        data={users}
        key={e => e.email}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Screen_03',{item:item})}>
              <View style={{ width: 380, height: 65, flexDirection: 'row', justifyContent: "space-between", marginTop: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                  <Image source={item.avatarUrl} style={{ width: 48, height: 48, borderRadius: 100 }} />
                  <View style={{ }}>
                    <Text numberOfLines={1} style={{fontWeight: 650, fontSize: 17,width:100 }}>{item.name}</Text>
                    <Text numberOfLines={1} style={{ fontWeight: 400, fontSize: 15, color: '#8A8E9C',width:190 }}>{item.email}</Text>
                  </View>
                </View>
                <View style={{ paddingRight: 10 }}>
                  <Text style={{ alignSelf: 'center' }}>{currentDate}</Text>
                  <View style={{ marginTop: 10, backgroundColor: '#7287EA', alignSelf: 'center', borderColor: 'black', borderRadius: 100, borderWidth: 1, width: 20, height: 20 }}>
                    <Text style={{ alignSelf: 'center', color: 'white' }}>9</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </ScrollView>
  );
}
function Calls({ navigation }) {
  
  const currentDate = moment(Date.now()).format('MMMM Do YYYY');
  const [users, setUsers] = useState([]);
  const getUser = async () => {
    const docRef = collection(db, 'ChatStore');
    const qr = query(docRef, where('UserUID', '!=', authentication?.currentUser?.uid));
    const docSnaps = onSnapshot(qr, (onSnapshot) => {
      let data = []
      onSnapshot.docs.forEach((user) => {
        data.push({ ...user.data() });
        setUsers(data);
        
      })
    })
  }
  useEffect(() => {
    getUser();
  }, [])
  return (
    <ScrollView>
      <FlatList
        data={users}
        key={e => e.email}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => {Linking.openURL(`tel:${item.phone}`)}}>
              <View style={{ width: 380, height: 65, flexDirection: 'row', justifyContent: "space-between", marginTop: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                  <Image source={item.avatarUrl} style={{ width: 48, height: 48, borderRadius: 100 }} />
                  <View style={{ }}>
                    <Text numberOfLines={1} style={{fontWeight: 650, fontSize: 17,width:100 }}>{item.name}</Text>
                    <Text numberOfLines={1} style={{ fontWeight: 400, fontSize: 15, color: '#8A8E9C',width:190 }}>{item.email}</Text>
                  </View>
                </View>
                <View style={{ paddingRight: 10 }}>
                  <Text style={{ alignSelf: 'center' }}>{currentDate}</Text>
                  <View style={{ marginTop: 10, backgroundColor: '#7287EA', alignSelf: 'center', borderColor: 'black', borderRadius: 100, borderWidth: 1, width: 20, height: 20 }}>
                    <Text style={{ alignSelf: 'center', color: 'white' }}>9</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </ScrollView>
  );
}
function Friends({ navigation }) {
  return (
    <View>

    </View>
  );
}
function Settings({ navigation }) {
  const [user, setUser] = useState();
  const getUser = async () => {
    const userUID = authentication?.currentUser?.uid;
  
    if (userUID) {
      const docRef = doc(db, 'ChatStore', userUID);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUser([userData]);
      } else {
        console.log('Người dùng không tồn tại');
        setUser([]); 
      }
    } else {
      console.log('Không có người dùng hiện tại');
      setUser([]);
    }
  };
  
  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <ScrollView>
      <FlatList
        data={user}
        key={e => e.email}
        renderItem={({ item }) => {
          return (
            <View style={{  }}>
              <View style={{ width: 380, height: 80, flexDirection: 'row', justifyContent: "space-between", marginTop: 10, borderWidth:1,alignItems:'center',marginLeft:5}}>
                <View style={{ flexDirection: 'row', flex: 0.6, justifyContent: 'space-around'}}>
                  <Image source={item.avatarUrl} style={{ width: 48, height: 48, borderRadius: 100 }} />
                  <View style={{ }}>
                    <Text numberOfLines={1} style={{fontWeight: 650, fontSize: 17,width:100 }}>{item.name}</Text>
                    <Text numberOfLines={1} style={{ fontWeight: 400, fontSize: 15, color: '#8A8E9C',width:100 }}>{item.phone}</Text>
                  </View>
                </View>
                <View style={{  }}><AntDesign name="right" size={24} color="black" /></View>
              </View>
              <View style={{ width: 380, height: 65, flexDirection: 'row', justifyContent: "space-between", marginTop: 30, borderWidth:1,alignItems:'center',marginLeft:5}}>
                <View style={{ flexDirection: 'row',paddingLeft:10}}>
                  <View style={{ }}>
                    <Text  style={{fontWeight: 650, fontSize: 17 }}>General</Text>
                  </View>
                </View>
                <View style={{  }}><AntDesign name="right" size={24} color="black" /></View>
              </View>
              <View style={{ width: 380, height: 65, flexDirection: 'row', justifyContent: "space-between", marginTop: 10, borderWidth:1,alignItems:'center',marginLeft:5}}>
                <View style={{ flexDirection: 'row',paddingLeft:10}}>
                  <View style={{ }}>
                    <Text  style={{fontWeight: 650, fontSize: 17 }}>Notifications & Sounds</Text>
                  </View>
                </View>
                <View style={{  }}><AntDesign name="right" size={24} color="black" /></View>
              </View>
              <View style={{ width: 380, height: 65, flexDirection: 'row', justifyContent: "space-between", marginTop: 10, borderWidth:1,alignItems:'center',marginLeft:5}}>
                <View style={{ flexDirection: 'row',paddingLeft:10}}>
                  <View style={{ }}>
                    <Text  style={{fontWeight: 650, fontSize: 17 }}>Chats</Text>
                  </View>
                </View>
                <View style={{  }}><AntDesign name="right" size={24} color="black" /></View>
              </View>
              <View style={{ width: 380, height: 65, flexDirection: 'row', justifyContent: "space-between", marginTop: 30, borderWidth:1,alignItems:'center',marginLeft:5}}>
                <View style={{ flexDirection: 'row',paddingLeft:10}}>
                  <View style={{ }}>
                    <Text  style={{fontWeight: 650, fontSize: 17 }}>Data & Storage Usage</Text>
                  </View>
                </View>
                <View style={{  }}><AntDesign name="right" size={24} color="black" /></View>
              </View>
              <View style={{ width: 380, height: 65, flexDirection: 'row', justifyContent: "space-between", marginTop: 10, borderWidth:1,alignItems:'center',marginLeft:5}}>
                <View style={{ flexDirection: 'row',paddingLeft:10}}>
                  <View style={{ }}>
                    <Text  style={{fontWeight: 650, fontSize: 17 }}>Privacity & Security</Text>
                  </View>
                </View>
                <View style={{  }}><AntDesign name="right" size={24} color="black" /></View>
              </View>
              <View style={{ width: 380, height: 65, flexDirection: 'row', justifyContent: "space-between", marginTop: 30, borderWidth:1,alignItems:'center',marginLeft:5}}>
                <View style={{ flexDirection: 'row',paddingLeft:10}}>
                  <View style={{ }}>
                    <Text  style={{fontWeight: 650, fontSize: 17 }}>Help</Text>
                  </View>
                </View>
                <View style={{  }}><AntDesign name="right" size={24} color="black" /></View>
              </View>
              <View style={{ marginTop:20 }}><Button title="LogOut" onPress={() => { navigation.navigate('Login') }} /></View>
            </View>
              

              
              
          )
        }}
      />
    </ScrollView>
  );
}

export default function Main_Chat() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: true,
      headerStyle: {
        backgroundColor: '#5CE1FE'
      },
      tabBarActiveBackgroundColor: '#7287EA',
    })}>
      <Tab.Screen name="Chats" component={ListChat}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
          ),
          tabBarActiveTintColor: 'black'
        }}

      />
      <Tab.Screen name="Calls" component={Calls}
        options={{
          tabBarLabel: 'Calls',
          tabBarIcon: ({ color, size }) => (
            <Feather name="phone" size={24} color="black" />
          ),
          tabBarActiveTintColor: 'black',

        }}
      />
      <Tab.Screen name="Friends" component={Friends}
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={24} color="black" />
          ),
          tabBarActiveTintColor: 'black'
        }}
      />
      <Tab.Screen name="Settings" component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={24} color="black" />
          ),
          tabBarActiveTintColor: 'black'
        }}
      />
    </Tab.Navigator>
  );
}