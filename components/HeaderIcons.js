import { View, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar } from "react-native-elements";

export default function HeaderfIcons({ navigation }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const userHandler = () => {
    if (isAuthenticated) {
      navigation.navigate("logout");
    } else {
      navigation.navigate("login");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.navigate("wishlist")}
      >
        <FontAwesome name="heart" size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.navigate("cartDetails")}
      >
        <FontAwesome name="shopping-cart" size={20} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={userHandler}>
        {isAuthenticated ? (
          <Avatar
            rounded
            size={20}
            source={{ uri: "https://i.pravatar.cc/150" }} // Replace with actual user photo
          />
        ) : (
          <FontAwesome name="user" size={20} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingRight: 8,
  },
  icon: {
    marginLeft: 16,
  },
});
