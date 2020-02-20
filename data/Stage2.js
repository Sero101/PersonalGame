var hits = 0;
class Stage2 extends Phaser.Scene {
    constructor() {
        super({key:"Stage2"});
    }
    preload(){
        this.load.image('enemy', 'assets/Icons/FlameDemon.png')
        this.load.image('enemy2', 'assets/Icons/FlameDemonEvolved.png')
        this.load.image("tileset", 'assets/Tileset/tileset.png')
        this.load.audio('fireball', 'assets/Audio/fireballsound.wav'),
        this.load.tilemapTiledJSON("map", "assets/Maps/map.json")
        this.load.spritesheet('PLAYER', 'assets/Icons/dude.png',{
            frameWidth: 32, frameHeight: 48
        }) 
    }
    create (){
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_F = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.fireballeffect = this.sound.add("fireball");
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        //
        //
        
        let map = this.add.tilemap("map");
        let tileset = map.addTilesetImage("tileset", "tileset");
        //
        //
        let background = map.createStaticLayer("background", [tileset], 0,0).setDepth(-1);
        let world = map.createStaticLayer("world", [tileset], 0,0);
        this.physics.add.staticGroup()
        //
        //
        this.player = this.physics.add.sprite(0,700, 'PLAYER').setScale(0.75);
        this.enemy = this.physics.add.group();
        this.enemy2 = this.physics.add.group();
        //
        //
        var x = (this.player.x < 400) ? Phaser.Math.Between(400,800) : Phaser.Math.Between(0,400);

        var enemy  = this.enemy.create(x, 16, 'enemy').setScale(1.2);
        enemy.setCollideWorldBounds(true);
        enemy.setBounce(.6);
        this.enemy.setVelocityX(300);
        this.enemy.setVelocityY(30);
        var enemy2 = this.enemy2.create(x, 16, 'enemy2').setScale(1.6)
        enemy2.setCollideWorldBounds(true);
        enemy.setBounce(.3);
        this.enemy2.setVelocityX(200);
        this.enemy2.setVelocityY(15);
        //
        //
        this.physics.add.collider(enemy, world);
        this.physics.add.collider(enemy2, world);
        //
        //
        function hitEnemy (player, enemy){
            this.physics.pause();
            this.player.setTint(0xff0000);
            this.player.anims.play('turn');
            score = 0;
            this.scene.start("MainMenu");
        }
        function hitEnemy (player, enemy2){
            this.physics.pause();
            this.player.setTint(0xff0000);
            this.player.anims.play('turn');
            score = 0;
            this.scene.start("MainMenu");
        }
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        world.setCollisionByProperty({collides:true});
        world.setCollision([11])
        world.setCollisionBetween(1, 50);
        this.physics.add.collider(this.player, world);
        
        this.physics.add.collider(this.player, this.enemy, hitEnemy, null, this);
        //
        //
        
        //
        //
        this.cameras.main.setBounds(0,0,background.displayWidth,background.displayHeight);
        this.cameras.main.startFollow(this.player)
        this.blockGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11,
            height: background.displayHeight,
            width: background.displayWidth
        })
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
        this.input.keyboard.on('keyup_P', function(event) {
            if (this.key_A.isDown) {
                var physicsImage = this.physics.add.image(this.player.x, this.player.y, "projectile").setScale(0.55);
                physicsImage.setVelocity(Phaser.Math.RND.integerInRange (-200,200) -600, -100);
                physicsImage.x = this.player.x + -100;
                this.fireballeffect.play();
                this.physics.add.collider(physicsImage, enemy, function (physicsImage, enemy) {
                    physicsImage.destroy();
                    enemy.destroy();

                });
                this.physics.add.collider(physicsImage, world, function(physicsImage, world) {
                    physicsImage.destroy();
                });
                this.physics.add.collider(physicsImage, enemy2, function(physicsImage, enemy2) {
                    physicsImage.destroy();
                    hits += 1;
                    if (hits == 10) {
                        enemy2.destroy();
                    }
                })
            }
            else if (this.key_D.isDown) {
                var physicsImage2 = this.physics.add.image(this.player.x, this.player.y, "projectile2").setScale(0.55); 
                physicsImage2.setVelocity(Phaser.Math.RND.integerInRange (200,-200) + 600, -100 );
                physicsImage2.x = this.player.x + 100;

                this.fireballeffect.play();
                this.physics.add.collider(physicsImage2, enemy, function (physicsImage2, enemy) {
                    physicsImage2.destroy();
                    enemy.destroy();
                });
                this.physics.add.collider(physicsImage2, world, function(physicsImage2, world) {
                    physicsImage2.destroy();
                }) ;
                this.physics.add.collider(physicsImage2, enemy2, function(physicsImage2, enemy2) {
                    physicsImage2.destroy();
                    hits += 1;
                    if (hits == 10) {
                        enemy2.destroy();
                    }
                })
            }
            },this);
            //
            //
    }
    update () 
    {
          if (this.key_A.isDown)
        {
            this.player.setVelocityX(-240);

            this.player.anims.play('left', true);
        }
        else if (this.key_D.isDown)
        {
            this.player.setVelocityX(240);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }
   
   if (this.key_W.isDown && this.player.body.blocked.down)
   {
       this.player.setVelocityY(-350);
   }
}
}