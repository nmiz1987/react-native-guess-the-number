import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export default function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginHorizontal: 24,
    marginTop: 36,
    backgroundColor: Colors.primary800,
    borderRadius: 20,
    elevation: 4, //shadow - android only
    shadowColor: "black", //ios only
    shadowOffset: { width: 0, height: 2 }, //ios only
    shadowRadius: 6, //ios only
    shadowOpacity: 0.25, //ios only
  },
});
