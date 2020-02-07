var config = {
    type: Phaser.AUTO,
    width: 1800,
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