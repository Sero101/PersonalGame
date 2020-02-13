var config = {
    type: Phaser.AUTO,
    width: 1800,
    height: 800,
    physics: {
        default:'arcade',
        arcade: {
         gravity: {y : 300},
         debug: false
        },
        scale: {
            mode:Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_VERTICALLY
        }
    },
    scene: [MainMenu,Stage1]
    

    
};

var game = new Phaser.Game(config);
