import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import styles from "../styles/styles";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../firebase-auth";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
export default function LogoutScreen({ navigation }) {
    const dispatch = useDispatch();

  const handleLogout = async() => {
    try {
        await signOut(firebaseAuth);
        dispatch(authActions.userLogout());
        navigation.replace("login");
    } catch (error) {
         console.error("Logout error:", error.message);
    }
  };

  const handleCancel = () => {
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you sure you want to log out?</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
  },
  logoutButton: {
    backgroundColor: "#e53935",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: "#9e9e9e",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});