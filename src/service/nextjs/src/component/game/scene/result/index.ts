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

	private title!: Phaser.GameObjects.Text;
	private button!: Phaser.GameObjects.Text;

	constructor() {
		super({ key: 'Result', active: true });
		this.events = new Phaser.Events.EventEmitter();
	}

	preload() {
		if (this.me && this.me.profileImageURI) {
			this.load.image(
				`${this.me.profileImageURI}`,
				'https://dev.transcendence.42seoul.kr/upload/' + this.me.profileImageURI,
			);
		}
		if (this.opponent && this.opponent.profileImageURI) {
			this.load.image(
				`${this.opponent.profileImageURI}`,
				'https://dev.transcendence.42seoul.kr/upload/' + this.opponent.profileImageURI,
			);
		}
		this.load.image(
			'defaultProfileImage',
			'https://dev.transcendence.42seoul.kr/upload/unknown_user.png',
		);
	}

	init(data: { navigate: AppRouterInstance; me: UserData; opponent: UserData }) {
		const { navigate, me, opponent } = data;

		if (this.scene) {
			this.scene.setVisible(false);
		}

		this.navigate = navigate;
		this.me = me;
		this.opponent = opponent;
	}

	initTitle(win: boolean) {
		const x = this.game.renderer.width / 2;
		const y = this.game.renderer.height / 8;
		const textConfig: Phaser.Types.GameObjects.Text.TextStyle = {
			fontFamily: 'Inter',
			fontSize: '40px',
			color: '#ffffff',
		};
		const result = win ? 'You Win!' : 'You Lose!';

		this.title = this.add.text(x, y, result, textConfig).setOrigin(0.5);
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
		this.add.text(x, y + 100, score.toString(), textConfig).setOrigin(0.5);

		const circle = this.add.circle(x, y, 50, 0xffffff);
		const mask = circle.createGeometryMask();
		const profileImage = this.add.image(x, y, profileImageURI || 'defaultProfileImage');
		const ratio = 100 / Math.max(profileImage.width, profileImage.height);
		profileImage.setMask(mask);
		profileImage.setScale(ratio);
	}

	initButton() {
		const x = this.game.renderer.width / 2;
		const y = (this.game.renderer.height / 8) * 7;
		const textConfig: Phaser.Types.GameObjects.Text.TextStyle = {
			fontFamily: 'Inter',
			fontSize: '20px',
			color: '#ffffff',
		};

		this.button = this.add
			.text(x, y, 'Back to home', textConfig)
			.setOrigin(0.5)
			.setInteractive()
			.on('pointerover', () => {
				this.input.setDefaultCursor('pointer');
				this.button.setBackgroundColor('#ffffff');
				this.button.setColor('#000000');
			})
			.on('pointerout', () => {
				this.input.setDefaultCursor('default');
				this.button.setBackgroundColor('#000000');
				this.button.setColor('#ffffff');
			})
			.on('pointerdown', () => {
				this.navigate.push('/game/callback');
			});
	}

	create() {
		if (this.navigate && this.me && this.opponent && this.scene) {
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
