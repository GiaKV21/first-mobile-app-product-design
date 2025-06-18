import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";

export const GAMES = [
  {
    id: "1",
    title: "Elden Ring",
    studio: "FromSoftware",
    rating: 9.8,
    price: "$59.99",
    image: require("../assets/images/eldenring.jpg"),
  },
  {
    id: "2",
    title: "Dark Souls I",
    studio: "FromSoftware",
    rating: 9.5,
    price: "$49.99",
    image: require("../assets/images/darksoul1.jpg"),
  },
  {
    id: "3",
    title: "Dark Souls II",
    studio: "FromSoftware",
    rating: 9.7,
    price: "$39.99",
    image: require("../assets/images/darksoul2.jpg"),
  },
  {
    id: "4",
    title: "Dark Souls III",
    studio: "FromSoftware",
    rating: 9.9,
    price: "$59.99",
    image: require("../assets/images/darksoul3.jpg"),
  },
  {
    id: "5",
    title: "Nioh",
    studio: "Team Ninja",
    rating: 9.6,
    price: "$29.99",
    image: require("../assets/images/nioh.jpg"),
  },
];

export default function HomePage() {
  return (
    <ScrollView style={styles.background} contentContainerStyle={styles.contentContainer} horizontal showsHorizontalScrollIndicator={false}>
      {GAMES.map((game) => (
        <Link key={game.id} href={`/product/${game.id}`} asChild>
          <TouchableOpacity style={styles.card}>
            <Image source={game.image} style={styles.image} contentFit="cover" transition={800} />
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={1}>{game.title}</Text>
              <Text style={styles.menuIcon}>⋮</Text>
            </View>
            <Text style={styles.studio}>{game.studio}</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.rating}>{game.rating}</Text>
              <Text style={styles.star}>★</Text>
              <View style={styles.priceTag}>
                <Text style={styles.priceText}>{game.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: "#F5F5F5" },
  contentContainer: { paddingVertical: 60, paddingHorizontal: 10 },
  card: {
    width: 240, height: 280, marginHorizontal: 10, backgroundColor: "#fff",
    borderRadius: 16, padding: 10, elevation: 3,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 3,
  },
  image: { width: "100%", height: 150, borderRadius: 12 },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  title: { flex: 1, fontSize: 14, fontWeight: "600" },
  menuIcon: { fontSize: 22, paddingHorizontal: 6, color: "#444" },
  studio: { fontSize: 11, color: "#666", marginVertical: 3 },
  detailsRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  rating: { fontSize: 14, fontWeight: "bold", color: "#333" },
  star: { fontSize: 14, color: "#FFD700", marginLeft: 4 },
  priceTag: { marginLeft: "auto", paddingVertical: 2, paddingHorizontal: 6, borderRadius: 4 },
  priceText: { fontSize: 12, fontWeight: "600", color: "#388E3C" },
});
