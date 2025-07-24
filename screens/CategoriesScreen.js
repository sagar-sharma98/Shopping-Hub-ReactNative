import { useLayoutEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../store/product-slice";
import ProductItem from "../components/ProductItem";
import { useNavigation } from "@react-navigation/native";
import { productActions } from "../store/product-slice";

function CategoriesScreen() {
  const products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    dispatch(fetchData());
  }, [navigation]);

  const addWishlistItem = (item) => {
    dispatch(productActions.addToWishList(item));
      navigation.navigate("wishlist");
  };

  const itemList = (itemData) => {
    const productDetailsHandler = () => {
      navigation.navigate("ProductDetails", {
        id: itemData.item.id,
      });
    };

    return (
      <ProductItem
        item={itemData.item}
        onPress={productDetailsHandler}
        addWishlistItem={addWishlistItem}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={itemList}
        numColumns={2}
      />
    </View>
  );
}

export default CategoriesScreen;
