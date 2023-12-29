import Phaser from 'phaser';

class MainScene extends Phaser.Scene {
	private ball!: Phaser.Physics.Arcade.Image;

	private myPaddle!: Phaser.Physics.Arcade.Image;
	private enemyPaddle!: Phaser.Physics.Arcade.Image;

	private myScore!: Phaser.GameObjects.Text;
	private enemyScore!: Phaser.GameObjects.Text;

	private keys!: Phaser.Types.Input.Keyboard.CursorKeys;

	private isPlaying: boolean = false;

	constructor() {
		super({ key: 'MainScene', active: true });
		this.events = new Phaser.Events.EventEmitter();
	}

	reset() {
		this.ball.setVisible(false);
		this.ball.setPosition(this.game.canvas.width / 2, this.game.canvas.height / 2);
		this.ball.setVelocity(0, 0);
		this.ball.setVisible(true);

		this.myPaddle.setVelocity(0, 0);
		this.enemyPaddle.setVelocity(0, 0);

		this.isPlaying = false;
	}

	score() {
		if (10 < this.ball.y && this.ball.y < 630) {
			return;
		}

		if (this.ball.y <= 10) {
			this.myScore.setText((parseInt(this.myScore.text, 10) + 1).toString());
			this.events.emit('score', 'my');
		} else if (630 <= this.ball.y) {
			this.enemyScore.setText((parseInt(this.enemyScore.text, 10) + 1).toString());
			this.events.emit('score', 'enemy');
		}

		this.reset();
	}

	preload() {
		this.load.image('ball', '/ball.png');
		this.load.image('paddle', '/paddle.png');
	}

	create() {
		this.ball = this.physics.add.image(
			this.game.canvas.width / 2,
			this.game.canvas.height / 2,
			'ball',
		);
		this.ball.setCollideWorldBounds(true);
		this.ball.setBounce(1, 1);
		this.ball.setVelocity(0, 0);

		this.myPaddle = this.physics.add.image(this.game.canvas.width / 2, 610, 'paddle');
		this.myPaddle.setImmovable(true);

		this.enemyPaddle = this.physics.add.image(this.game.canvas.width / 2, 30, 'paddle');
		this.enemyPaddle.setImmovable(true);

		this.myScore = this.add
			.text(this.game.canvas.width / 2, (this.game.canvas.height / 4) * 3, '0', {
				fontSize: '32px',
				fontFamily: 'Inter',
				color: '#FFFFFF',
			})
			.setOrigin(0.5, 0.5);
		this.enemyScore = this.add
			.text(this.game.canvas.width / 2, this.game.canvas.height / 4, '0', {
				fontSize: '32px',
				fontFamily: 'Inter',
				color: '#FFFFFF',
			})
			.setOrigin(0.5, 0.5);

		this.add
			.rectangle(
				this.game.canvas.width / 2,
				this.game.canvas.height / 2,
				this.game.canvas.width,
				1,
				0xffffff,
			)
			.setOrigin(0.5, 0.5);

		this.physics.add.collider(this.ball, this.myPaddle);
		this.physics.add.collider(this.ball, this.enemyPaddle);

		if (this.input.keyboard) {
			this.keys = this.input.keyboard.createCursorKeys();
		}

		this.reset();
	}

	update(time: number, delta: number) {
		if (!this.isPlaying) {
			if (!this.keys.space?.isDown) {
				return;
			}
			const normal = 0.5;
			const hard = 0.75;

			this.isPlaying = true;

			this.ball.setVelocity(
				Phaser.Math.Between(-this.game.canvas.width * hard, this.game.canvas.width * hard),
				this.game.canvas.height * hard,
			);
		}

		if (!this.keys || !this.myPaddle || !this.enemyPaddle) {
			return;
		}

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
		this.enemyPaddle.x = Phaser.Math.Clamp(
			this.enemyPaddle.x,
			this.enemyPaddle.width / 2,
			this.game.canvas.width - this.enemyPaddle.width / 2,
		);

		this.score();
	}
}

export default MainScene;
