

type Game = {
	id: string;
	player1Id: string;
	player2Id: string;
	player1Score: number;
	player2Score: number;
	mode: Mode;
	result: string;
	createdAt: string;
	updatedAt: string;
};

export default Game;
