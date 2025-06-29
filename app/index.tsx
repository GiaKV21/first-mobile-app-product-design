import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Navbar from "./components/Navbar";

const screenWidth = Dimensions.get("window").width;

export const GAMES = [
  {
    id: "1",
    title: "Elden Ring",
    studio: "FromSoftware",
    rating: 9.8,
    price: "$59.99",
    image: require("../assets/images/eldenring.jpg"),
    description: "An epic dark fantasy RPG with vast open-world gameplay.",
  },
  {
    id: "2",
    title: "Dark Souls I",
    studio: "FromSoftware",
    rating: 9.5,
    price: "$49.99",
    image: require("../assets/images/darksoul1.jpg"),
    description: "Start your journey through Lordran, the unforgiving land.",
  },
  {
    id: "3",
    title: "Dark Souls II",
    studio: "FromSoftware",
    rating: 9.7,
    price: "$39.99",
    image: require("../assets/images/darksoul2.jpg"),
    description: "Fight through an eerie world in this hardcore RPG sequel.",
  },
  {
    id: "4",
    title: "Dark Souls III",
    studio: "FromSoftware",
    rating: 9.9,
    price: "$59.99",
    image: require("../assets/images/darksoul3.jpg"),
    description: "Final entry of the legendary series, full of intense action.",
  },
  {
    id: "5",
    title: "Nioh",
    studio: "Team Ninja",
    rating: 9.6,
    price: "$29.99",
    image: require("../assets/images/nioh.jpg"),
    description: "A fast-paced samurai slasher with Japanese mythology.",
  },
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const filteredGames = GAMES.filter((game) =>
    game.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.wrapper} edges={["top", "left", "right"]}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>🎮 Game Store</Text>
      </View>

      {/* Auth */}
      <View style={styles.authLinks}>
        <Text style={styles.authText} onPress={() => router.push("/login")}>
          Login
        </Text>
        <Text style={styles.authDivider}>|</Text>
        <Text style={styles.authText} onPress={() => router.push("/register")}>
          Register
        </Text>
      </View>

      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search games..."
        placeholderTextColor="#777"
        value={query}
        onChangeText={setQuery}
      />

      {/* Game Cards */}
      {filteredGames.length === 0 ? (
        <Text style={styles.emptyText}>No games found</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {filteredGames.map((game) => (
            <Link key={game.id} href={`/product/${game.id}`} asChild>
              <TouchableOpacity style={styles.card}>
                <Image
                  source={game.image}
                  style={styles.image}
                  contentFit="contain"
                />
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {game.title}
                  </Text>
                  <Text style={styles.cardStudio}>{game.studio}</Text>
                  <Text style={styles.cardDescription} numberOfLines={2}>
                    {game.description}
                  </Text>
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardRating}>{game.rating} ★</Text>
                    <Text style={styles.cardPrice}>{game.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>
      )}

      {/* Navbar with gesture-safe padding */}
      <View style={{ paddingBottom: insets.bottom || 12 }}>
        <Navbar variant="home" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#f5c518",
  },
  authLinks: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 10,
  },
  authText: {
    fontSize: 14,
    color: "#f5c518",
    fontWeight: "600",
    paddingHorizontal: 10,
  },
  authDivider: {
    fontSize: 14,
    color: "#666",
  },
  searchInput: {
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 12,
    fontSize: 15,
    color: "#fff",
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  card: {
    width: screenWidth * 0.75,
    backgroundColor: "#1d1d1d",
    marginRight: 16,
    borderRadius: 16,
    overflow: "hidden",
    borderColor: "#2c2c2c",
    borderWidth: 1,
    height: screenWidth * 0.75 * 1.2,
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#222",
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  cardStudio: {
    fontSize: 13,
    color: "#999",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardRating: {
    fontSize: 14,
    color: "#FFD700",
    fontWeight: "600",
  },
  cardPrice: {
    fontSize: 14,
    color: "#4caf50",
    fontWeight: "700",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 50,
  },
});
