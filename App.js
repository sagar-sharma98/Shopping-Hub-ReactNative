import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import WishListScreen from "./screens/WishListScreen";
import CartScreen from "./screens/CartScreen";
import { Provider } from "react-redux";
import store from "./store";
import HeaderfIcons from "./components/HeaderIcons";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import AntDesign from "react-native-vector-icons/AntDesign";
import LogoutScreen from "./screens/LogoutScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            headerRight: () => <HeaderfIcons navigation={navigation} />,
            headerTitleAlign: "center",
            headerLeft: () => (
              <AntDesign
                name="home"
                size={24}
                style={{ marginLeft: 12 }}
                onPress={() => navigation.navigate("AllCategories")}
              />
            ),
            headerBackVisible: false, // <-- Hide back arrow
          })}
        >
          <Stack.Screen name="AllCategories" component={CategoriesScreen} />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
          />
          <Stack.Screen name="cartDetails" component={CartScreen} />
          <Stack.Screen name="wishlist" component={WishListScreen} />
          <Stack.Screen name="signup" component={SignupScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="logout" component={LogoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
