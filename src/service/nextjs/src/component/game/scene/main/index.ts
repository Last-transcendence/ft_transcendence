import Phaser from 'phaser';
import { Socket } from 'socket.io-client';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

class Main extends Phaser.Scene {
	private ball!: Phaser.Physics.Arcade.Image;

	private myPaddle!: Phaser.Physics.Arcade.Image;
	private enemyPaddle!: Phaser.Physics.Arcade.Image;

	private myScore!: Phaser.GameObjects.Text;
	private enemyScore!: Phaser.GameObjects.Text;

	private readyText!: Phaser.GameObjects.Text;
	private networkDelayText!: Phaser.GameObjects.Text;

	private keys!: Phaser.Types.Input.Keyboard.CursorKeys;

	private isPlaying: boolean = false;

	private navigate!: AppRouterInstance;
	private socket!: Socket;
	private room: string = '';

	private resetFlag: boolean = true;

	constructor() {
		super({ key: 'Main', active: true });
		this.events = new Phaser.Events.EventEmitter();
	}

	init(data: { navigate: AppRouterInstance; socket: Socket; room: string }) {
		const { navigate, socket, room } = data;

		if (this.scene) {
			this.scene.setVisible(false);
		}

		this.navigate = navigate;
		this.socket = socket;
		this.room = room;

		if (this.socket) {
			this.initSocket();
		}
	}

	initSocket() {
		this.socket.on('start', response => {
			this.isPlaying = true;
			if (this.ball) {
				this.ball.setVelocity(response.ball.velocityX, response.ball.velocityY);
			}
		});
		this.socket.on('move', response => {
			if (this.enemyPaddle) {
				this.enemyPaddle.x = 360 - response.x;
			}
		});
		this.socket.on('score', response => {
			if (response.state === 'network-delay') {
				this.reset(this.game.canvas.width / 2, this.game.canvas.height / 2, 0, 0);
				if (this.readyText) {
					this.readyText.setVisible(false);
				}
				if (this.networkDelayText) {
					this.networkDelayText.setVisible(true);
				}
				setTimeout(() => {
					if (this.readyText) {
						this.readyText.setVisible(true);
					}
					if (this.networkDelayText) {
						this.networkDelayText.setVisible(false);
					}
				}, 2000);
				return;
			}
			if (response.state === 'confirmed') {
				this.reset(this.game.canvas.width / 2, this.game.canvas.height / 2, 0, 0);
				if (this.myScore) {
					this.myScore.setText(parseInt(response.score, 10).toString());
				}
				return;
			}
			if (this.ball && this.ball.y < 628) {
				this.socket.emit('score', {
					room: this.room,
					score: parseInt(this.enemyScore.text, 10),
					state: 'network-delay',
				});
				this.reset(this.game.canvas.width / 2, this.game.canvas.height / 2, 0, 0);
				return;
			}
			this.socket.emit('score', {
				room: this.room,
				score: response.score,
				state: 'confirmed',
			});
			this.reset(this.game.canvas.width / 2, this.game.canvas.height / 2, 0, 0);
			if (this.enemyScore) {
				this.enemyScore.setText(parseInt(response.score, 10).toString());
			}
		});
		this.socket.on('end', response => {
			this.socket.off('start');
			this.socket.off('move');
			this.socket.off('score');
			this.socket.off('end');

			if (!this.scene) {
				this.navigate.push('/');
			}

			if (response.state === 'DISCONNECTED') {
				this.scene.start('Disconnected', {
					navigate: this.navigate,
				});
				return;
			}

			this.scene.start('Result', {
				navigate: this.navigate,
				socket: this.socket,
				me: {
					nickname: response.me.nickname,
					profileImageURI: response.me.profileImageURI,
					score: this.myScore.text,
				},
				opponent: {
					nickname: response.opponent.nickname,
					profileImageURI: response.opponent.profileImageURI,
					score: this.enemyScore.text,
				},
			});
		});
	}

	reset(x: number, y: number, velocityX: number, velocityY: number) {
		this.resetFlag = false;
		this.isPlaying = false;

		if (this.ball) {
			this.ball.setVisible(false);
			this.ball.setVelocity(velocityX, velocityY);
			this.ball.setPosition(x, y);
			this.ball.setVisible(true);
		}
		if (this.myPaddle) {
			this.myPaddle.setVelocity(0, 0);
		}
		if (this.enemyPaddle) {
			this.enemyPaddle.setVelocity(0, 0);
		}
		if (this.readyText) {
			this.readyText.setVisible(true);
		}

		setTimeout(() => {
			this.resetFlag = true;
		}, 1000);
	}

	score() {
		if (!this.ball) {
			return;
		}

		if (10 < this.ball.y && this.ball.y < 630) {
			return;
		}

		this.reset(this.ball.x, this.ball.y, 0, 0);

		if (this.ball.y <= 10 && this.socket) {
			this.socket.emit('score', {
				room: this.room,
				score: parseInt(this.myScore.text, 10) + 1,
				state: 'pending',
			});
		}
	}

	preload() {
		this.load.image('ball', '/ball.png');
		this.load.image('paddle', '/paddle.png');
	}

	initBall() {
		this.ball = this.physics.add.image(
			this.game.canvas.width / 2,
			this.game.canvas.height / 2,
			'ball',
		);
		this.ball.setCollideWorldBounds(true);
		this.ball.setBounce(1, 1);
		this.ball.setVelocity(0, 0);
	}

	initPaddle() {
		const x: number = this.game.canvas.width / 2;

		this.myPaddle = this.physics.add.image(x, 610, 'paddle');
		this.enemyPaddle = this.physics.add.image(x, 30, 'paddle');
		this.myPaddle.setImmovable(true);
		this.enemyPaddle.setImmovable(true);
	}

	initScore() {
		const x = this.game.canvas.width / 2;
		const y = this.game.canvas.height / 4;
		const textConfig: Phaser.Types.GameObjects.Text.TextStyle = {
			fontFamily: 'Inter',
			fontSize: '32px',
			color: '#ffffff',
		};

		this.myScore = this.add.text(x, y * 3, '0', textConfig).setOrigin(0.5, 0.5);
		this.enemyScore = this.add.text(x, y, '0', textConfig).setOrigin(0.5, 0.5);
	}

	initReadyText() {
		const x: number = this.game.canvas.width / 2;
		const y: number = this.game.canvas.height / 2 - 80;
		const textConfig: Phaser.Types.GameObjects.Text.TextStyle = {
			fontFamily: 'Inter',
			fontSize: '24px',
			color: '#ffffff',
		};

		this.readyText = this.add.text(x, y, 'Press space to ready', textConfig).setOrigin(0.5, 0.5);
	}

	initNetworkDelayText() {
		const x: number = this.game.canvas.width / 2;
		const y: number = this.game.canvas.height / 2 - 80;
		const textConfig: Phaser.Types.GameObjects.Text.TextStyle = {
			fontFamily: 'Inter',
			fontSize: '20px',
			color: '#ffffff',
		};

		this.networkDelayText = this.add
			.text(x, y, 'Network delay detected\n         Restart game...', textConfig)
			.setOrigin(0.5, 0.5)
			.setVisible(false);
	}

	initMiddleLine() {
		const x: number = this.game.canvas.width / 2;
		const y: number = this.game.canvas.height / 2;
		const xWidth: number = this.game.canvas.width;
		const yWidth: number = 1;
		const color: number = 0xffffff;

		this.add.rectangle(x, y, xWidth, yWidth, color).setOrigin(0.5, 0.5);
	}

	create() {
		if (this.socket && this.scene) {
			this.scene.setVisible(true);
		}
		this.initBall();
		this.initPaddle();
		this.physics.add.collider(this.ball, this.myPaddle);
		this.physics.add.collider(this.ball, this.enemyPaddle);
		this.initScore();
		this.initReadyText();
		this.initNetworkDelayText();
		this.initMiddleLine();

		if (this.input.keyboard) {
			this.keys = this.input.keyboard.createCursorKeys();
		}

		this.reset(this.game.canvas.width / 2, this.game.canvas.height / 2, 0, 0);
	}

	update(time: number, delta: number) {
		if (this.socket && time % 100 < delta) {
			this.socket.emit('connected', { room: this.room });
		}

		if (!this.isPlaying) {
			if (this.room === '' || !this.resetFlag || !this.keys.space?.isDown) {
				return;
			}
			if (!this.readyText || !this.readyText.visible) {
				return;
			}
			this.readyText.setVisible(false);
			setTimeout(() => {
				if (this.socket) {
					this.socket.emit('ready', {
						room: this.room,
					});
				}
			}, 1000);
			return;
		}

		if (this.keys && this.myPaddle && this.enemyPaddle) {
			if (this.keys.left?.isDown) {
				this.myPaddle.setVelocityX(-400);
			} else if (this.keys.right?.isDown) {
				this.myPaddle.setVelocityX(400);
			} else {
				this.myPaddle.setVelocityX(0);
			}

			this.myPaddle.x = Phaser.Math.Clamp(
				this.myPaddle.x,
				this.myPaddle.width / 2,
				this.game.canvas.width - this.myPaddle.width / 2,
			);
		}

		if (this.socket) {
			this.socket.emit('move', {
				room: this.room,
				x: this.myPaddle.x,
			});
		}

		this.score();
	}
}

export default Main;
