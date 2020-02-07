class MainMenu extends Phaser.Scene {
    constructor() {
        super({key:"MainMenu"});
    }
    preload(){
        this.load.audio('MainMenu',['assets/songs/MainMenu.wav']);
    }

    create () {
        this.Main = this.add.text(250,-250, "Manboy And The Last Code", {font:"60px Impact"});
        this.text = this.add.text(250,-50, "Press Anywhere To Start Game", {font:"35px Impact"});
        this.text2 = this.add.text(225,-50, "Press H For Main Menu Music", {font:"35px Impact"});
        this.soundFXMain = this.sound.add("MainMenu", {loop: "MainMenu"});
        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "h") {
                this.soundFXMain.play();
            }
        },this);
        var tween = this.tweens.add({
            targets: this.text,
            x:650,
            y:300,
            duration:2000,
            ease:"Elastic",
            easeParams:[1.5,0.5],
            delay:1000,
            onComplete:function(src,tgt) {
                tgt [0] .setColor("Gold");
            }
        },)
        var tween = this.tweens.add({
            targets: this.text2,
            x:650,
            y:350,
            duration:2000,
            ease:"Elastic",
            easeParams:[1.5,0.5],
            delay:1000,
            onComplete:function(src,tgt) {
                tgt [0] .setColor("Gold");
            }
        },)
        var tween2 = this.tweens.add({
            targets: this.Main,
            x:550,
            y:200,
            duration:2000,
            ease:"Elastic",
            easeParams:[1.5,0.5],
            delay:1250,
            onComplete:function(src,tgt) {
                tgt [0] .setColor("Gold");
            }
        }, this);
        this.input.on('pointerdown', function(event) {
            if (event) {
                event.input = this.text;
            }
            this.soundFXMain.pause("MainMenu");
            this.scene.start("Stage1");
        },this);
    }
}