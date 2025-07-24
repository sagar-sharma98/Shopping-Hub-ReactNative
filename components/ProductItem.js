import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";

export default function ProductItem({
  item,
  onPress,
  wishlist = false,
  removeWishlistItemHandler,
  addWishlistItem,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        {wishlist && (
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => removeWishlistItemHandler(item.id)}
          >
            <EvilIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onPress}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text>{item.price ? item.price.toFixed(2) : ""}</Text>
            {!wishlist && (
              <TouchableOpacity onPress={() => addWishlistItem(item)}>
                <FontAwesome name="heart-o" size={20} />
              </TouchableOpacity>
            )}
          </View>
          <Button style={styles.button} title="Buy Now" onPress={onPress} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productContainer: {
    flex: 1,
    margin: 10,
    padding: 8,
    height: 320,
    elevation: 4,
    backgroundColor: "white",
    borderColor: "black",
    gap: 2,
  },

  closeIcon: {
    position: "absolute",
    top: 2,
    right: 2,
    zIndex: 10,
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 4,
  },

  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    borderBottomColor: "black",
  },

  infoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  titleContainer: {
    height: 50,
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontWeight: "600",
    fontSize: 14,
  },

  button: {
    marginTop: 2,
    width: "100%",
  },
});
