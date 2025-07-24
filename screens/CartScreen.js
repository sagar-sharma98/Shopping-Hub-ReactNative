import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function CartScreen({ navigation }) {
  const cart = useSelector((state) => state.cart.cart);
  const totalItem = useSelector((state) => state.cart.totalItem);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  const handleIncrement = (id) => {
    dispatch(cartActions.increaseQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(cartActions.decreaseQuantity(id));
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemCard}>
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => handleRemoveItem(item.id)}
        >
          <EvilIcons name="close" size={26} color="black" />
        </TouchableOpacity>

        <Image source={{ uri: item.image }} style={styles.itemImage} />

        <View style={styles.itemInfo}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.itemPrice}>
            ₹ {item.itemTotalPrice.toFixed(2)}
          </Text>

          <View style={styles.quantityWrapper}>
            <Text style={styles.quantityLabel}>Quantity</Text>

            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => handleDecrement(item.id)}
                style={styles.quantityButton}
              >
                <AntDesign name="minus" size={16} color="black" />
              </TouchableOpacity>

              <Text style={styles.quantityText}>{item.quantity}</Text>

              <TouchableOpacity
                onPress={() => handleIncrement(item.id)}
                style={styles.quantityButton}
              >
                <AntDesign name="plus" size={16} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {cart.length > 0 ? (
        <>
          <View style={styles.summary}>
            <Text style={styles.title}>YOUR BAG</Text>
            <Text style={styles.text}>
              Total ({totalItem} items): ₹ {totalPrice.toFixed(2)}
            </Text>
            <Text style={styles.subtext}>
              Items in your bag are not reserved — checkout now to make them
              yours.
            </Text>
          </View>

          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
          />

          <View style={styles.orderBox}>
            <Text style={styles.title}>Order Summary</Text>
            <View style={styles.row}>
              <Text style={styles.text}>Items</Text>
              <Text style={styles.text}>₹ {totalItem}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Delivery</Text>
              <Text style={styles.text}>Free</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>₹ {totalPrice.toFixed(2)}</Text>
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

const styles = StyleSheet.create({
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
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderWidth: 1, // border all around
    borderColor: "#ccc",
    borderRadius: 4, // smooth corners
    backgroundColor: "#fcfafaff", // optional subtle background
    position: "relative",
    minHeight: 140,
    marginBottom: 12, // spacing between cards
  },
  closeIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
    padding: 6,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
    resizeMode: "contain",
  },
  itemInfo: {
    flex: 1,
    paddingRight: 60, // increased to prevent title from going under the icon
  },
  itemName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,
    flexWrap: "wrap",
  },
  itemPrice: {
    fontSize: 14,
    color: "#000",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  quantityWrapper: {
    marginTop: 12,
  },

  quantityLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginBottom: 4,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: "#aaa",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },

  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
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
    marginTop: 16,
    alignItems: "center",
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 10
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
});
