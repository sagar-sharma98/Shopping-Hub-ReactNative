import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

export default function CartScreen({ navigation }) {
  const cart = useSelector((state) => state.cart.cart);
  const totalItem = useSelector((state) => state.cart.totalItem);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemName}>{item.title}</Text>
      <Text style={styles.itemPrice}>₹ {item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length > 0 ? (
        <>
          <View style={styles.summary}>
            <Text style={styles.title}>YOUR BAG</Text>
            <Text style={styles.text}>
              Total ({totalItem} items): ₹ {totalPrice}
            </Text>
            <Text style={styles.subtext}>
              Items in your bag are not reserved — checkout now to make them
              yours.
            </Text>
          </View>

          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
          />

          <View style={styles.orderBox}>
            <Text style={styles.title}>Order Summary</Text>
            <View style={styles.row}>
              <Text style={styles.text}>Items</Text>
              <Text style={styles.text}>₹ {totalPrice}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Delivery</Text>
              <Text style={styles.text}>Free</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>₹ {totalPrice}</Text>
            </View>
            <Text style={styles.subtext}>
              (This total includes all taxes and charges)
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Checkout Now</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.title}>Your bag is empty.</Text>
          <Text style={styles.subtext}>
            Once you add something to your bag – it will appear here.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AllCategories")}
          >
            <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  summary: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
  subtext: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
  },
  list: {
    flex: 1,
    marginTop: 8,
  },
  itemCard: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemName: {
    fontSize: 16,
    color: "#000",
  },
  itemPrice: {
    fontSize: 14,
    color: "#000",
  },
  orderBox: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ccc",
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
