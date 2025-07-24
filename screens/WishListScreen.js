import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../components/ProductItem";
import { useNavigation } from "@react-navigation/native";
import { productActions } from "../store/product-slice";

export default function WishListScreen() {
  const wishList = useSelector((state) => state.product.wishList);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const renderWishListItem = (itemData) => {
    const wishListHandler = () => {
      navigation.navigate("ProductDetails", { id: itemData.item.id });
    };

    const removeWishlistItemHandler = (id) => {
      dispatch(productActions.removeWishListItem(id));
    };

    const addWishlistItem = (id) => {
      dispatch(productActions.addToWishList(id));
    }



    return (
      <View style={styles.gridItem}>
        <ProductItem
          item={itemData.item}
          onPress={wishListHandler}
          removeWishlistItemHandler={removeWishlistItemHandler}
          addWishlistItem={addWishlistItem}
          wishlist={true}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {wishList.length > 0 ? (
        <FlatList
          data={wishList}
          keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
          renderItem={renderWishListItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.title}>Your bag is empty.</Text>
          <Text style={styles.subtext}>
            Once you add something to your wishlist – it will appear here. Ready
            to shop?
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AllCategories")}
          >
            <Text style={styles.buttonText}>SHOP NOW</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  gridItem: {
    width: "48%",
    margin: 4,
  },

  columnWrapper: {
    justifyContent: "space-between",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 6,
  },

  subtext: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
    textAlign: "center",
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
    paddingHorizontal: 10,
  },
});
