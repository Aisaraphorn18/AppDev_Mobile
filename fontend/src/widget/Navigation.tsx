import * as React from "react";
import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import HomeScreen from "../screen/HomeScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


function HeaderLogo() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center"
      }}
    >
      <Image
        style={{ width: 30, height: 30 }}
        source={require("../assets/favicon.png")}
      />
      <Text
        style={{
          color: "white",
          padding: 5,
          fontSize: 25,
          paddingLeft: 15,
          paddingBottom: 10
        }}
      >
        Home
      </Text>
    </View>
  );
}

function EmptyScreen() {
  return <View />;
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomNavbar() {
  const [getOption, setOption] = useState(false);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }
    }
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26}  />
          )
        }}
        // onPress={() => {
        //   setOption(false);
        // }}
      />
      <Tab.Screen
        name="Setting"
        component={EmptyScreen}
        options={{
          tabBarLabel: "Setting",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} size={26}  />
          )
        }}
        // onPress={() => {
        //   setOption(true);
        // }}
      />
    </Tab.Navigator>
  );
}

export default function TopNavbar() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "black"
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}
    >
      <Stack.Screen
        name="Home"
        component={BottomNavbar}
        options={{ headerTitle: () => <HeaderLogo />, headerShown: true }}
      />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
