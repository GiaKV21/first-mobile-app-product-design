import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { GAMES } from "../index";

export default function ProductPage() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const product = GAMES.find((p) => p.id === id);

  const addToCart = async () => {
    if (!product) {
      Alert.alert("Error", "Product not found.");
      return;
    }

    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      await AsyncStorage.setItem("redirectTo", "/cart");
      router.push("/login");
      return;
    }

    try {
      const cartData = await AsyncStorage.getItem("cart");
      const cart = cartData ? JSON.parse(cartData) : [];

      const existing = cart.find((item: any) => item.id === product.id);
      if (existing) {
        Alert.alert("Already in Cart", "This product is already in your cart.");
        return;
      }

      const updatedCart = [...cart, { ...product, quantity: 1 }];
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));

      Alert.alert("Added", `${product.title} was added to your cart.`);
    } catch (err) {
      console.error("Add to cart error:", err);
      Alert.alert("Error", "Unable to add product to cart.");
    }
  };

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>Product not found.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.shopLink}>← Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <ImageBackground
          source={product.image}
          style={styles.image}
          imageStyle={styles.imageRounded}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.studio}>{product.studio}</Text>
          <Text style={styles.rating}>{product.rating} ★</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>{product.price}</Text>

          <TouchableOpacity style={styles.addButton} onPress={addToCart}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buyNowButton}
            onPress={() =>
              Alert.alert("Checkout", "Buy Now is not implemented yet.")
            }
          >
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Navbar variant="product" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  image: {
    height: 320,
    justifyContent: "flex-start",
  },
  imageRounded: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    margin: 20,
    borderRadius: 20,
    width: 40,
    alignItems: "center",
  },
  backText: {
    color: "#fff",
    fontSize: 18,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#f5c518",
    marginBottom: 4,
  },
  studio: {
    fontSize: 15,
    color: "#aaa",
    marginBottom: 2,
  },
  rating: {
    fontSize: 15,
    color: "#FFD700",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: "#ccc",
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    color: "#4caf50",
    fontWeight: "bold",
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#333",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  buyNowButton: {
    backgroundColor: "#f5c518",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buyNowText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#121212",
  },
  errorText: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
    marginTop: 100,
  },
  shopLink: {
    color: "#f5c518",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
});
