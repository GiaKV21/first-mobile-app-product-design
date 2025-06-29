import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "./components/Navbar";

export default function ProfilePage() {
  const [username, setUsername] = React.useState("(guest)");
  const router = useRouter();

  React.useEffect(() => {
    AsyncStorage.getItem("isLoggedIn").then((loggedIn) => {
      if (loggedIn !== "true") {
        router.replace("/login");
      } else {
        AsyncStorage.getItem("username").then((value) => {
          if (value) setUsername(value);
        });
      }
    });
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(["isLoggedIn", "username"]);
    Alert.alert("Logged Out", "You have been successfully logged out.");
    router.push("/");
  };

  const openLocationSettings = async () => {
    const { openSettings } = await import("expo-linking");
    openSettings();
  };

  const openNotificationSettings = async () => {
    const { openSettings } = await import("expo-linking");
    openSettings();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>👤 Profile</Text>

      <View style={styles.box}>
        <Text style={styles.label}>Logged in as:</Text>
        <Text style={styles.username}>{username}</Text>
      </View>

      <TouchableOpacity
        style={styles.permissionButton}
        onPress={openLocationSettings}
      >
        <Text style={styles.permissionText}>📍 Location Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.permissionButton}
        onPress={openNotificationSettings}
      >
        <Text style={styles.permissionText}>🔔 Notification Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ marginTop: "auto" }}>
        <Navbar variant="profile" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f5c518",
    textAlign: "center",
    marginBottom: 40,
  },
  box: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  label: {
    color: "#888",
    fontSize: 14,
  },
  username: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 6,
  },
  permissionButton: {
    backgroundColor: "#1e1e1e",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  permissionText: {
    color: "#f5c518",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
