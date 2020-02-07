class Stage1 extends Phaser.Scene {
    constructor() {
        super({key:"Stage1"});
    }

    preload(){
        this.load.image ('background', 'background.png')
        this.load.image('player','assets/icons/player.png', 
        this.load.audio('test',['assets/songs/song1.wav','assets/songs/song2.wav','assets/songs/song3.wav','assets/songs/song4']),
        this.load.audio('tutoroll',['assets/lol.mp3']),
        this.load.image('projectile', 'assets/Icons/projectile.png'),
        this.load.image('projectile2', 'assets/icons/projectile2.png')),
        this.load.audio('MainMenu',['assets/songs/MainMenu.wav'],this);
    }

    create (){
        this.image = this.add.image(850,400,'player'),
        
        
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_F = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        
        this.input.on('pointerdown',    function(event){
            if (event = 1) {
            event = 1;
            this.text = this.add.text(0,0, "Welcome Sir To The Testing Range!", { font:"30px Impact"});
            }
            else if (event = 1) {
               this.input.on('pointerup', function(event){
                 this.text = this.remove.text()  
               })
               
            }

            }
            ,this);
        this.input.keyboard.on('keyup_P', function(event) {
            if (this.key_A.isDown) {
                var physicsImage = this.physics.add.image(this.image.x, this.image.y, "projectile");
                physicsImage.setVelocity(Phaser.Math.RND.integerInRange (-200,200) -600, -100);
                physicsImage.x = this.image.x + -100
            }
            if (this.key_D.isDown) {
                var physicsImage2 = this.physics.add.image(this.image.x, this.image.y, "projectile2"); 
                physicsImage2.setVelocity(Phaser.Math.RND.integerInRange (200,-200) + 600, -100 );
                physicsImage2.x = this.image.x + 100
            }
        },this);
        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "r") {
                this.MainMenu = this.sound.add("MainMenu", {loop: "MainMenu"})
                this.MainMenu.pause(),
                this.soundFX.pause(),
                this.scene.start("MainMenu");
            }
        },this);
        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "3") {
                this.MainMenu = this.sound.add("MainMenu", {loop: "MainMenu"}),
                this.MainMenu.pause();
                this.soundFX = this.sound.add("test", {loop: "test"}),
        this.soundFX.play();
            }
        },this);
    }

    update (delta) {
        if (this.key_A.isDown)
            this.image.x += -3 ;
        if (this.key_D.isDown)
            this.image.x += 3;
        if (this.key_S.isDown)
            this.image.y += 3;
        if (this.key_W.isDown)
            this.image.y += -3 ;
    };      
 };
