import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export default function PrimaryButton({ children, onPress }) {
	return (
		<View style={styles.buttonOuterContainer}>
			<Pressable
				style={({ pressed }) =>
					pressed
						? [styles.buttonInnerContainer, styles.pressed] // for iPhone!
						: styles.buttonInnerContainer
				}
				onPress={onPress}
				android_ripple={{ color: Colors.primaryRipple }} //android only!!
			>
				<Text style={styles.buttonText}>{children}</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonOuterContainer: {
		borderRadius: 28,
		margin: 4,
		overflow: "hidden",
	},
	buttonInnerContainer: {
		backgroundColor: Colors.primary500,
		paddingVertical: 8,
		paddingHorizontal: 16,
		elevation: 2, //shadow - android only
	},
	buttonText: {
		color: "white",
		textAlign: "center",
		fontSize: 18,
		fontWeight: "bold",
	},
	pressed: {
		opacity: 0.75,
	},
});
