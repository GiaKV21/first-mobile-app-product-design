import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { GAMES } from "../index";

export default function ProductPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const product = GAMES.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground source={product.image} style={styles.image} imageStyle={{ borderRadius: 16 }}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButtonTop}>
          <Text style={styles.backTextTop}>← Back</Text>
        </TouchableOpacity>
      </ImageBackground>

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.studio}>{product.studio}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.stock}>In stock - Usually ships in 2-3 days</Text>

      <TouchableOpacity style={styles.cartButton}>
        <Text style={styles.cartButtonText}>ADD TO CART</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  studio: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    color: "#388E3C",
    marginBottom: 10,
  },
  stock: {
    fontSize: 14,
    color: "green",
    marginBottom: 20,
  },
  cartButton: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  cartButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  backButtonTop: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    position: "absolute",
    top: 40,
    left: 20,
    borderRadius: 20,
  },
  backTextTop: {
    color: "white",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    marginTop: 20,
  },
  backText: {
    color: "blue",
  },
});
