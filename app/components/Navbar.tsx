import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  variant?: "home" | "cart" | "profile" | "product";
};

export default function Navbar({ variant = "home" }: Props) {
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => router.push("/")}>
        <View style={styles.tab}>
          <Ionicons
            name="home-outline"
            size={24}
            color={variant === "home" ? "#f5c518" : "#aaa"}
          />
          <Text style={[styles.label, variant === "home" && styles.active]}>
            Home
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/cart")}>
        <View style={styles.tab}>
          <Ionicons
            name="cart-outline"
            size={24}
            color={variant === "cart" ? "#f5c518" : "#aaa"}
          />
          <Text style={[styles.label, variant === "cart" && styles.active]}>
            Cart
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/profile")}>
        <View style={styles.tab}>
          <Ionicons
            name="person-outline"
            size={24}
            color={variant === "profile" ? "#f5c518" : "#aaa"}
          />
          <Text style={[styles.label, variant === "profile" && styles.active]}>
            Profile
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1a1a1a",
    borderTopWidth: 1,
    borderColor: "#2a2a2a",
    paddingTop: 10,
    paddingBottom: 14,
  },
  tab: {
    alignItems: "center",
    gap: 2,
  },
  label: {
    fontSize: 12,
    color: "#aaa",
  },
  active: {
    color: "#f5c518",
    fontWeight: "600",
  },
});
