
var score = 0;
var platforms;
var mana = 50;
class Stage1 extends Phaser.Scene {
    constructor() {
        super({key:"Stage1"});
    }
     preload(){
        this.load.spritesheet('PLAYER', 'assets/Icons/player1.png',{
            frameWidth: 84, frameHeight: 84
        }) 
        this.load.image ('background', 'assets/Icons/background.png'), 
        this.load.audio('test',['assets/Audio/song1.wav','assets/audio/song2.wav','assets/audio/song3.wav','assets/audio/song4']),
        this.load.audio('tutoroll',['assets/Audio/lol.mp3']),
        this.load.image('projectile', 'assets/Icons/projectile.png'),
        this.load.image('projectile2', 'assets/icons/projectile2.png'),
        this.load.audio('fireball', 'assets/Audio/fireballsound.wav'),
        this.load.audio('MainMenu',['assets/Audio/MainMenu.wav'],
        this.load.image('platform','assets/Icons/platform.png'),
        this.load.image('bomb','assets/Icons/bomb.png'),
        this.load.image('demon','assets/Icons/demon1.png'),
        this.load.audio('summonsound','assets/Audio/Satan.wav'),
        this.load.image('sky','assets/Icons/sky.png'),
        this.load.image('star','assets/Icons/star.png'),
        this.load.image('movingplatform', 'assets/Icons/platform.png'),this);
    }
     create (){
        let bg = this.add.image(0,0,'sky').setOrigin(0,0);
        Align.scaleToGameW(bg, 2);
        //
        //
        //
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 908, 'platform').setScale(10).refreshBody();
        platforms.create(550,575,'platform');
        platforms.create(50,420,'platform');
        platforms.create(750,380,'platform');
        platforms.createMultiple(775,400, 'platform');
        //
        //
        //
        //
        //
        //
        var movingplatform = this.physics.add.image(400,250, 'movingplatform')
            movingplatform.setImmovable(true)
            movingplatform.setVelocity(100,-100);
            movingplatform.body.setAllowGravity(false);
        this.tweens.timeline({
            targets: movingplatform.body.velocity,
            loop: -1,
            tweens: [
                { x:    0, y: 0, duration: 2000, ease: 'Stepped' },
                { x:    0, y:    0, duration: 1000, ease: 'Stepped' },
                { x:  200, y:  0, duration: 4000, ease: 'Stepped' },
                { x:    0, y: 0, duration: 2000, ease: 'Stepped' },
                { x:    0, y:    0, duration: 1000, ease: 'Stepped' },
                { x: -200, y:  0, duration: 4000, ease: 'Stepped' }
              ]
            });
        //
        //
        //
        this.player = this.physics.add.sprite(0,600, 'PLAYER');
        Align.scaleToGameW(this.player,.03);
        this.image2 = this.add.image('demon');
        this.demonsummoning = this.sound.add('summonsound');
        this.fireballeffect = this.sound.add("fireball");
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_F = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        //
        //
        //   
        //
        //
        //
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms)
        this.physics.add.collider(this.player, movingplatform);
        //
        //
        //
        //window.scene = this;
        this.cameras.main.setBounds(0,0,bg.displayWidth,bg.displayHeight);
        this.cameras.main.startFollow(this.player)
        //
        //
        //
        var stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
        stars.children.iterate(function (child) {
        
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.8));
        
        });
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(stars, movingplatform);
        this.physics.add.overlap(this.player, stars, collectStar, null, this);
        function collectStar (player, star)
{
    star.disableBody(true, true);
    score += 10;
    if (score == 120) {
        this.scene.start("Stage2")
    }
};
        //
        //
        //
        function collide (movingplatform,player) {
            if (movingplatform.body.moves && movingplatform.body.touching.up && player.body.touching.down) {
                    player.setGravityY(10000);
            }
        }
        this.blockGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11,
            height: bg.displayHeight,
            width: bg.displayWidth
        })
        //this.blockGrid.showNumbers();
        //
        //
        //
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('PLAYER', { start: 20, end: 25 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: this.anims.generateFrameNumbers('PLAYER', { start: 0, end: 3}),
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('PLAYER', { start: 14, end: 19 }),
        frameRate: 10,
        repeat: -1
    },this);
        //
        //
        //
            this.input.keyboard.on('keyup_P', function(event) {
                if (this.key_A.isDown) {
                    var physicsImage = this.physics.add.image(this.player.x, this.player.y, "projectile").setScale(0.75);
                    physicsImage.setVelocity(Phaser.Math.RND.integerInRange (-200,200) -600, -100);
                    physicsImage.x = this.player.x + -100;
                    this.player.setTint(0xff0000);
                    this.fireballeffect.play(); 
                }
                else if (this.key_D.isDown) {
                    var physicsImage2 = this.physics.add.image(this.player.x, this.player.y, "projectile2").setScale(0.75); 
                    physicsImage2.setVelocity(Phaser.Math.RND.integerInRange (200,-200) + 600, -100 );
                    physicsImage2.x = this.player.x + 100;

                    this.player.setTint(0xff0000)
                    this.fireballeffect.play();
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
     //
     //
     //
     update () 
     {
        if (this.key_A.isDown)
    {
        this.player.setVelocityX(-160);
    
        this.player.anims.play('left', true);
    }
    else if (this.key_D.isDown)
    {
        this.player.setVelocityX(160);
    
        this.player.anims.play('right', true);
    }
    else
    {
        this.player.setVelocityX(0);
    
        this.player.anims.play('turn');
    }
    
    if (this.key_W.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-350);
    }
    }
}