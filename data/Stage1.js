var platforms;
var player;
class Stage1 extends Phaser.Scene {
    constructor() {
        super({key:"Stage1"});
    }
     preload(){
        this.load.spritesheet('PLAYER', 'assets/Icons/dude.png',{
            frameWidth: 32, frameHeight: 48
        }) 
        this.load.image ('background', 'assets/Icons/background.png'), 
        this.load.audio('test',['assets/audio/song1.wav','assets/audio/song2.wav','assets/audio/song3.wav','assets/audio/song4']),
        this.load.audio('tutoroll',['assets/audio/lol.mp3']),
        this.load.image('projectile', 'assets/Icons/projectile.png'),
        this.load.image('projectile2', 'assets/icons/projectile2.png'),
        this.load.audio('fireball', 'assets/audio/fireballsound.wav'),
        this.load.audio('MainMenu',['assets/audio/MainMenu.wav'],
        this.load.image('platform','assets/Icons/platform.png'),
        this.load.image('bomb','assets/Icons/bomb.png'),
        this.load.image('demon','assets/Icons/demon1.png'),
        this.load.audio('summonsound','assets/audio/Satan.wav'),
        this.load.image('sky','assets/Icons/sky.png'),this);
    }
     create (){
        this.add.image(900,400,'sky')
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'platform').setScale(2).refreshBody();
        platforms.create(600,400,'platform');
        platforms.create(50,250,'platform');
        platforms.create(750,220,'platform');
        player = this.physics.add.sprite(100,400, 'PLAYER');
        this.sprite = player
        this.image2 = this.add.image('demon');
        this.demonsummoning = this.sound.add('summonsound');
        this.fireballeffect = this.sound.add("fireball");
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_F = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platforms);
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('PLAYER', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'PLAYER', frame: 4 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('PLAYER', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    },this);
    
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
        
            this.input.keyboard.on('keyup_P', function(event) {
                if (this.key_A.isDown) {
                    var physicsImage = this.physics.add.image(this.sprite.x, this.sprite.y, "projectile");
                    physicsImage.setVelocity(Phaser.Math.RND.integerInRange (-200,200) -600, -100);
                    physicsImage.x = this.sprite.x + -100
                    this.fireballeffect.play();
                }
                else if (this.key_D.isDown) {
                    var physicsImage2 = this.physics.add.image(this.sprite.x, this.sprite.y, "projectile2"); 
                    physicsImage2.setVelocity(Phaser.Math.RND.integerInRange (200,-200) + 600, -100 );
                    physicsImage2.x = this.sprite.x + 100;
                    this.fireballeffect.play();
                }
                },this);
        
     
        if (this.key_D.isDown) {
            player.setVelocityX (Phaser.Math.RND.integerInRange(160,160) + 600, -100)
        }
        
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
     ,this)}
     update () 
     {
        if (this.key_A.isDown)
    {
        player.setVelocityX(-160);
    
        player.anims.play('left', true);
    }
    else if (this.key_D.isDown)
    {
        player.setVelocityX(160);
    
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
    
        player.anims.play('turn');
    }
    
    if (this.key_W.isDown && player.body.touching.down)
    {
        player.setVelocityY(-350);
    }
    }
}