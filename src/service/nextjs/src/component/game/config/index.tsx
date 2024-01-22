import { GameInstance } from '@ion-phaser/react';

const Config: GameInstance = {
	title: 'Pong',
	width: 360,
	height: 640,
	type: 0,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			fps: 60,
		},
	},
};

import('phaser').then(Phaser => {
	Config.type = Phaser.AUTO;
});

export default Config;
