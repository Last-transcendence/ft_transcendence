import Phaser from 'phaser';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface UserData {
	nickname: string;
	profileImageURI: string;
	score: number;
}

class Result extends Phaser.Scene {
	private navigate!: AppRouterInstance;
	private me!: UserData;
	private opponent!: UserData;

	constructor() {
		super({ key: 'Result', active: true });
		this.events = new Phaser.Events.EventEmitter();
	}

	preload() {}

	init(data: { navigate: AppRouterInstance; me: UserData; opponent: UserData }) {
		const { navigate, me, opponent } = data;

		this.scene.setVisible(false);

		this.navigate = navigate;
		this.me = me;
		this.opponent = opponent;

		console.log('Result: me', this.me);
		console.log('Result: opponent', this.opponent);
	}

	initSocket() {}

	initTitle(win: boolean) {
		const x = this.game.renderer.width / 2;
		const y = this.game.renderer.height / 8;
		const textConfig: Phaser.Types.GameObjects.Text.TextStyle = {
			fontFamily: 'Inter',
			fontSize: '40px',
			color: '#ffffff',
		};
		const result = win ? 'You Win!' : 'You Lose!';

		this.add.text(x, y, result, textConfig).setOrigin(0.5);
	}

	initUserData(user: UserData, x: number) {
		const { nickname, profileImageURI, score } = user;
		const y = this.game.renderer.height / 2;
		const textConfig: Phaser.Types.GameObjects.Text.TextStyle = {
			fontFamily: 'Inter',
			fontSize: '24px',
			color: '#ffffff',
		};

		this.add.text(x, y - 100, nickname, textConfig).setOrigin(0.5);
		this.add.image(x, y, profileImageURI).setOrigin(0.5);
		this.add.text(x, y + 100, score.toString(), textConfig).setOrigin(0.5);
	}

	initButton() {
		const x = this.game.renderer.width / 2;
		const y = (this.game.renderer.height / 8) * 7;
		const textConfig: Phaser.Types.GameObjects.Text.TextStyle = {
			fontFamily: 'Inter',
			fontSize: '20px',
			color: '#ffffff',
		};

		this.add
			.text(x, y, 'Back to home', textConfig)
			.setOrigin(0.5)
			.setInteractive()
			.on('pointerdown', () => {
				this.navigate.push('/');
			});
	}

	create() {
		if (this.navigate && this.me && this.opponent) {
			this.scene.setVisible(true);
		}
		if (this.me && this.opponent) {
			this.initTitle(this.me.score > this.opponent.score);
			this.initUserData(this.me, this.game.renderer.width / 4);
			this.add
				.text(this.game.renderer.width / 2, this.game.renderer.height / 2, ':', {
					fontFamily: 'Inter',
					fontSize: '24px',
					color: '#ffffff',
				})
				.setOrigin(0.5);
			this.initUserData(this.opponent, (this.game.renderer.width / 4) * 3);
			this.initButton();
		}
	}

	update() {}
}

export default Result;
