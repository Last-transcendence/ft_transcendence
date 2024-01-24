import Phaser from 'phaser';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

class Disconnected extends Phaser.Scene {
	private navigate!: AppRouterInstance;

	private title!: Phaser.GameObjects.Text;
	private button!: Phaser.GameObjects.Text;

	constructor() {
		super({ key: 'Disconnected', active: true });
		this.events = new Phaser.Events.EventEmitter();
	}

	preload() {}

	init(data: { navigate: AppRouterInstance }) {
		const { navigate } = data;

		this.scene.setVisible(false);

		this.navigate = navigate;
	}

	create() {
		if (this.navigate) {
			this.scene.setVisible(true);
		}

		const x = this.game.renderer.width / 2;
		const y = this.game.renderer.height / 8;
		const titleTextConfig: Phaser.Types.GameObjects.Text.TextStyle = {
			fontFamily: 'Inter',
			fontSize: '16px',
			color: '#ffffff',
		};
		const buttonTextConfig: Phaser.Types.GameObjects.Text.TextStyle = {
			fontFamily: 'Inter',
			fontSize: '24px',
			color: '#ffffff',
		};

		this.title = this.add
			.text(x, 2 * y, 'Oops... opponent is disconnected', titleTextConfig)
			.setOrigin(0.5);

		this.button = this.add
			.text(x, 6 * y, 'Back to home', buttonTextConfig)
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
				this.navigate?.push('/');
			});
	}

	update() {}
}

export default Disconnected;
