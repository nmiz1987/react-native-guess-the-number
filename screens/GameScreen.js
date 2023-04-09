import { View, StyleSheet, Alert, FlatList } from "react-native";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import { useState, useEffect } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({ userNumber, onGameOver }) {
	const initialGuess = generateRandomBetween(1, 100, userNumber);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [guessRounds, setGuessRounds] = useState([initialGuess]);

	useEffect(() => {
		if (currentGuess === userNumber) {
			onGameOver(guessRounds.length);
			minBoundary = 1;
			maxBoundary = 100;
		}
	}, [currentGuess, userNumber, onGameOver]);

	function nextGuessHandler(direction) {
		if (
			(direction === "lower" && currentGuess < userNumber) ||
			(direction === "greater" && currentGuess > userNumber)
		) {
			Alert.alert("Don't lie!", "You know that this is wrong...", [
				{ text: "Sorry!", style: "cancel" },
			]);
			return;
		}
		if (direction === "lower") {
			maxBoundary = currentGuess;
		} else {
			minBoundary = currentGuess + 1;
		}
		const newRndNumber = generateRandomBetween(
			minBoundary,
			maxBoundary,
			currentGuess
		);
		setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
		setCurrentGuess(newRndNumber);
	}

	function generateRandomBetween(min, max, exclude) {
		const rndNum = Math.floor(Math.random() * (max - min)) + min;

		if (rndNum === exclude) {
			return generateRandomBetween(min, max, exclude);
		} else {
			return rndNum;
		}
	}

	return (
		<View style={styles.screen}>
			<Title title="Opponent's Guess!" />
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card>
				<InstructionText style={styles.instructionText}>
					Hight or Lower?
				</InstructionText>
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
							<Ionicons name="md-remove" size={24} color="white" />
						</PrimaryButton>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
							<Ionicons name="md-add" size={24} color="white" />
						</PrimaryButton>
					</View>
				</View>
			</Card>
			<View style={styles.listContainer}>
				<FlatList
					data={guessRounds} // the list source
					renderItem={(itemData) => (
						<GuessLogItem
							roundNumber={guessRounds.length - itemData.index}
							guess={itemData.item}
						/>
					)} // what will return in every round
					keyExtractor={(item) => item} // the unique key for every child
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingTop: 50,
		paddingHorizontal: 20,
	},
	instructionText: {
		marginBottom: 12,
	},
	buttonsContainer: {
		marginVertical: 10,
		flexDirection: "row",
	},
	buttonContainer: {
		flex: 1,
	},
	listContainer: {
		flex: 1,
		padding: 16,
	},
});
