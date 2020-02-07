var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 960,
    physics: {
        default:'arcade',
        arcade: {
         gravity: {y : 200}
        }
    },
    scene: [MainMenu,Stage1 ]

};

var game = new Phaser.Game(config);