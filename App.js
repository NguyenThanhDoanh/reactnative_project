import { View, Text, Image, Button, Pressable, TextInput, FlatList, ScrollView, TouchableOpacity , SectionList,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Register from './components/Register'
import Main_Chat from './components/Main_Chat';
import Screen3 from './components/Screen3';
import Login from './components/Login';
const Stack = createNativeStackNavigator();
export default function App() {
    return ( 
      <NavigationContainer>
    <Stack.Navigator
    initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
      <Stack.Screen name="Main_Chat" component={Main_Chat} />
      <Stack.Screen name="Screen_03" component={Screen3} />
      <Stack.Screen name="Login" component={Login} />
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
