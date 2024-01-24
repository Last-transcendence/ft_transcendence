import Phaser from 'phaser';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Socket } from 'socket.io-client';

class Queue extends Phaser.Scene {
	private navigate!: AppRouterInstance;
	private socket!: Socket;
	private gameRoomId!: string | null;

	private loadingText!: Phaser.GameObjects.Text[];
	private loadingTextIdx: number = 0;

	constructor(navigate: AppRouterInstance, socket: Socket, gameRoomId: string | null) {
		super({ key: 'Queue', active: true });
		this.events = new Phaser.Events.EventEmitter();
		this.navigate = navigate;
		this.socket = socket;
		this.gameRoomId = gameRoomId;
	}

	preload() {}

	initLoadingText() {
		const x: number = this.game.canvas.width / 2;
		const y: number = this.game.canvas.height / 2;
		const textConfig: Phaser.Types.GameObjects.Text.TextStyle = {
			fontFamily: 'Inter',
			fontSize: '24px',
			color: '#ffffff',
		};

		this.loadingText = [
			this.add.text(x, y, 'Waiting for opponent', textConfig).setOrigin(0.5, 0.5),
			this.add.text(x, y, 'Waiting for opponent.', textConfig).setOrigin(0.5, 0.5),
			this.add.text(x, y, 'Waiting for opponent..', textConfig).setOrigin(0.5, 0.5),
			this.add.text(x, y, 'Waiting for opponent...', textConfig).setOrigin(0.5, 0.5),
		];
		this.loadingText.forEach(text => {
			text.setOrigin(0.5, 0.5);
			text.setVisible(false);
		});
		this.loadingText[0].setVisible(true);
	}

	initSocket() {
		this.socket.on('matched', response => {
			this.socket.off('matched');

			setTimeout(() => {
				this.scene.start('Main', {
					navigate: this.navigate,
					socket: this.socket,
					room: response.room,
				});
			}, 1000);
		});
		this.socket.emit('queue');
	}

	create() {
		if (this.gameRoomId) {
			this.scene.start('Main', {
				navigate: this.navigate,
				socket: this.socket,
				room: this.gameRoomId,
			});
		}

		this.initLoadingText();
		this.initSocket();
	}

	update(time: number, delta: number) {
		if (time % 1000 < delta) {
			this.loadingText[this.loadingTextIdx].setVisible(false);
			this.loadingTextIdx = (this.loadingTextIdx + 1) % this.loadingText.length;
			this.loadingText[this.loadingTextIdx].setVisible(true);
		}
	}
}

export default Queue;
