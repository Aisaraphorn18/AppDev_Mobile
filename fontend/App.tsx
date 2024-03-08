import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import Navigation from "./src/widget/Navigation";

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    // fontSize: 25,
    // color: "white",
    // backgroundColor: "green",
    margin: 5,
    padding: 5,
    height: 90,
    width: 300,
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16
  }
});
