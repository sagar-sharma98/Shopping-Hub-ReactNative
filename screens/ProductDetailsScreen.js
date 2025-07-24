import { useEffect, useLayoutEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../store/product-slice";
import AntDesign from "react-native-vector-icons/AntDesign";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";
import { cartActions } from "../store/cart-slice";

function ProductDetailsScreen({ route }) {
  const product = useSelector((state) => state.product.product);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const id = route.params.id;
  const cartHandler = () => {

    dispatch(cartActions.addToCart(product));
    navigation.navigate("cartDetails");
  };

  const wishListHandler = () => {
    dispatch(productActions.addToWishList(product));
    navigation.navigate("wishlist");
  };

  useLayoutEffect(() => {
    dispatch(productActions.getProductById(id));
  }, [id]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹ {product?.price ? product.price.toFixed(2) : "Loading..."}</Text>

        <View style={styles.ratingContainer}>
          <Text>rating</Text>
          <AntDesign name="star" size={14} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          onPress={cartHandler}
          title="Add to cart"
        />
        <Button
          style={styles.button}
          onPress={wishListHandler}
          title="Add to wishlist"
        />
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.offerContainer}>
          <Text style={styles.offerHeading}>best offer heading</Text>
          <View>
            <Text style={styles.offerDetails}>
              10% Discount on IDFC FIRST SWYP Credit Card.
            </Text>
            <Text style={styles.offerDetailsInfo}>
              Min Spend ₹850, Max Discount ₹350.
            </Text>
          </View>
          <View>
            <Text style={styles.offerDetails}>
              10% Discount on HSBC Credit Cards.
            </Text>
            <Text style={styles.offerDetailsInfo}>
              Min Spend ₹5000, Max Discount ₹1500.
            </Text>
          </View>
          <View>
            <Text style={styles.offerDetails}>EMI option available</Text>
            <Text style={styles.offerDetailsInfo}>
              EMI starting from Rs.35/month
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.description}>desctiption</Text>
          <Text style={styles.descriptionInfo}>{product.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },

  imageContainer: {
    width: "100%",
    aspectRatio: 1, // Maintains image ratio
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // Fixes image distortion
  },

  titleContainer: {
    marginBottom: 12,
    gap: 6,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: "#444",
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
  },

  detailContainer: {
    marginBottom: 16,
  },

  offerContainer: {
    padding: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginBottom: 16,
  },
  offerHeading: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 8,
  },
  offerDetails: {
    fontWeight: "600",
    fontSize: 14,
    marginTop: 6,
  },
  offerDetailsInfo: {
    fontWeight: "400",
    fontSize: 13,
    color: "#555",
  },

  description: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 8,
  },
  descriptionInfo: {
    fontSize: 14,
    fontWeight: "400",
    color: "#333",
    lineHeight: 20,
  },
});
