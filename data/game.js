



var game;
window.onload = function() {
    var isMobile = navigator.userAgent.indexOf("Mobile");
    if (isMobile == -1) {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }

var w = 480
var h = 640
if (isMobile != -1) {
    w = window.innerWidth;
  h = window.innerHeight;
}
}
var config = {
    type: Phaser.AUTO,
    width: 1919,
    height: 960,
    parent: 'phaser.game',
    physics: {
        default:'arcade',
        arcade: {
         gravity: {y : 300},
         debug: false
        },
        scale: {
            mode:Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    },
        scene: [MainMenu,Stage1,Stage2]
    

    
};

    game = new Phaser.Game(config);
