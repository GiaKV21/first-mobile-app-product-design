import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Navbar from "./components/Navbar";

const screenWidth = Dimensions.get("window").width;

export default function CartScreen() {
  const [cart, setCart] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const stored = await AsyncStorage.getItem("cart");
    let parsed = stored ? JSON.parse(stored) : [];
    parsed = parsed.map((item: any) => ({
      ...item,
      quantity: item.quantity ?? 1,
    }));
    setCart(parsed);
  };

  const saveCart = async (newCart: any[]) => {
    setCart(newCart);
    await AsyncStorage.setItem("cart", JSON.stringify(newCart));
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 0) }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updated);
    AsyncStorage.setItem("cart", JSON.stringify(updated));
  };

  const clearCart = async () => {
    Alert.alert("Clear Cart", "Are you sure you want to remove all items?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("cart");
          setCart([]);
        },
      },
    ]);
  };

  const getTotal = () => {
    return cart
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCart();
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} contentFit="cover" />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>
          ${parseFloat(item.price.replace("$", ""))} × {item.quantity}
        </Text>

        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
            <Text style={styles.qtyButton}>–</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
            <Text style={styles.qtyButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right", "bottom"]}
    >
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>🛒 Your Cart</Text>
          {cart.length > 0 && (
            <TouchableOpacity onPress={clearCart}>
              <Text style={styles.clearAll}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>

        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty.</Text>
            <TouchableOpacity onPress={() => router.push("/")}>
              <Text style={styles.shopLink}>← Browse Games</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              contentContainerStyle={{ paddingBottom: 220 }}
            />

            <View
              style={[styles.totalBar, { paddingBottom: insets.bottom + 100 }]}
            >
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalPrice}>${getTotal()}</Text>
            </View>

            <TouchableOpacity
              style={styles.buyNowButton}
              onPress={() =>
                Alert.alert("Purchase", "Checkout not implemented yet")
              }
            >
              <Text style={styles.buyNowText}>Buy Now</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Navbar variant="cart" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 20 : 24,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#f5c518",
  },
  clearAll: {
    fontSize: 15,
    color: "#ff4d4d",
    fontWeight: "600",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#1d1d1d",
    borderRadius: 14,
    marginBottom: 18,
    overflow: "hidden",
    borderColor: "#2c2c2c",
    borderWidth: 1,
  },
  image: {
    width: screenWidth * 0.32,
    height: screenWidth * 0.32,
    backgroundColor: "#222",
  },
  details: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },
  price: {
    fontSize: 15,
    color: "#4caf50",
    fontWeight: "bold",
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  qtyButton: {
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "#333",
    color: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  qty: {
    fontSize: 17,
    fontWeight: "500",
    color: "#fff",
  },
  totalBar: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: "#1a1a1a",
    paddingVertical: 18,
    paddingHorizontal: 26,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#2a2a2a",
    borderWidth: 1,
  },
  totalText: {
    fontSize: 19,
    fontWeight: "600",
    color: "#fff",
  },
  totalPrice: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#f5c518",
  },
  buyNowButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#f5c518",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buyNowText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#121212",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 17,
    color: "#aaa",
    marginBottom: 12,
  },
  shopLink: {
    color: "#f5c518",
    fontSize: 17,
    fontWeight: "600",
  },
});
