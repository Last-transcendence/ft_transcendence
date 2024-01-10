enum Mode {
	NORMAL,
	HARD,
	RANK,
}

enum Result {
	LOSE,
	WIN,
	DRAW,
}

type Game = {
	id: string;
	userId1: string;
	userId2: string;
	userScore1: number;
	userScore2: number;
	mode: Mode;
	result: Result;
};

export default Game;
