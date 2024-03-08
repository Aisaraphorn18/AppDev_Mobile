import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import HomeScreen from "../screen/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function BottomNavbar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  }
});
