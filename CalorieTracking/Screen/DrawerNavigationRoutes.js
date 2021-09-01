
import React from 'react';


import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import HomeScreen from './DrawerScreens/HomeScreen';
import HistoryScreen from './DrawerScreens/HistoryScreen';
import AddFoodScreen from './DrawerScreens/AddFoodScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import RegisterScreen from './RegisterScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#307ecc',
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      />
    </Stack.Navigator>
  );
};

const addFoodScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="AddFoodScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', 
        },
        headerTintColor: '#fff', 
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen
        name="AddFoodScreen"
        component={AddFoodScreen}
        options={{
          title: 'AddFood', 
        }}
      />
    </Stack.Navigator>
  )
}

const historyScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="HistoryScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', 
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          title: 'History', 
        }}
      />
    </Stack.Navigator>
  );
};


const DrawerNavigatorRoutes = (props) => {

  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: { marginVertical: 5, color: 'white' },
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="homeScreenStack"
        options={{ drawerLabel: 'Home Screen' }}
        component={homeScreenStack}
      />
      <Drawer.Screen
        name="historyScreenStack"
        options={{ drawerLabel: 'History Screen' }}
        component={historyScreenStack}
      />
      <Drawer.Screen
        name="addFoodScreenStack"
        options={{drawerLabel: 'Add Food Screen'}}
        component={addFoodScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;