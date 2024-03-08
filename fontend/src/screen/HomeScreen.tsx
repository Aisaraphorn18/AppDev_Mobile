import * as React from "react";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Table, Row, Rows } from "react-native-table-component";
import axios from "axios";
import { Checkbox } from "expo-checkbox";

export default function HomeScreen({ navigation }) {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");

  const tableHead = ["Check", "Name", "Qty", "Price"];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.172:5001/api/tabledata"
      );
      const formattedData = response.data.tableBody.map((item) => ({
        checkbox: false,
        id: item.id,
        name: item.name,
        qty: item.Qty,
        price: `$${item.Price}`
      }));
      setTableData(formattedData);
      setIsLoading(true);
      // console.log(response.data.tableBody);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCheckboxChange = (index) => {
    const newData = [...tableData];
    newData[index].checkbox = !newData[index].checkbox;
    setTableData(newData);
  };

  const handleInsert = async () => {
    try {
      if (!name || !qty || !price) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      const response = await axios.post(
        "http://192.168.1.172:5001/api/Insert",
        {
          name: name,
          Qty: qty,
          Price: price
        }
      );

      Alert.alert("Success", "Data inserted successfully");
      fetchData();
      setName("");
      setQty("");
      setPrice("");
    } catch (error) {
      console.error("Error inserting data:", error);
      Alert.alert("Error", "Failed to insert data. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const checkedRows = tableData.filter((item) => item.checkbox);
      if (checkedRows.length !== 1) {
        Alert.alert("Error", "Please select exactly one row to delete.");
        return;
      }
      const response = await axios.delete(
        "http://192.168.1.172:5001/api/Delete",
        { data: { name: checkedRows[0].id } }
      );
      Alert.alert("Success", "Data deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
      Alert.alert("Error", "Failed to delete data. Please try again.");
    }
  };

  const handleUpdate = async () => {
    try {
      const checkedRows = tableData.filter((item) => item.checkbox);
      if (checkedRows.length !== 1) {
        Alert.alert("Error", "Please select exactly one row to update.");
        return;
      }
      const response = await axios.put("http://192.168.1.172:5001/api/Update", {
        id: checkedRows[0].id,
        name: name,
        Qty: qty,
        Price: price
      });
      Alert.alert("Success", "Data updated successfully");
      fetchData();
      setName("");
      setQty("");
      setPrice("");
    } catch (error) {
      console.error("Error updating data:", error);
      Alert.alert("Error", "Failed to update data. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {isLoading && tableData.length > 0 ? (
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row
              data={tableHead}
              style={styles.head}
              textStyle={{ margin: 6, textAlign: "center" }}
            />
            <Rows
              data={tableData.map((rowData, index) => [
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={rowData.checkbox}
                    onValueChange={() => handleCheckboxChange(index)}
                    style={styles.checkbox}
                  />
                </View>,
                <Text style={{ margin: 6, textAlign: "center" }}>
                  {rowData.name}
                </Text>,
                <Text style={{ margin: 6, textAlign: "center" }}>
                  {rowData.qty}
                </Text>,
                <Text style={{ margin: 6, textAlign: "center" }}>
                  {rowData.price}
                </Text>
              ])}
              // textStyle={{ margin: 6, textAlign: "center" }}
            />
          </Table>
        ) : (
          <Text style={styles.noDataText}>No data available</Text>
        )}
        <View style={styles.insertContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Qty"
            value={qty}
            onChangeText={setQty}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
          />
          <View style={{padding:5}}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              onPress={handleInsert}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
          <View style={{padding:5}}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "orange" }]}
              onPress={handleUpdate}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
          <View style={{padding:5}}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "red" }]}
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff", textAlign: "center" },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray"
  },
  checkboxContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  checkbox: { alignSelf: "center" },
  insertContainer: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5
  },
  buttonText: { color: "white", textAlign: "center" }
});
