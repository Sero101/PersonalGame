var hits = 0;
var itempickup = 0;
class Stage2 extends Phaser.Scene {
    constructor() {
        super({key:"Stage2"});
    }
    preload(){
        this.load.image('enemy', 'assets/Icons/FlameDemon.png')
        this.load.audio('song5', 'assets/Audio/song5.wav')
        this.load.image('enemy2', 'assets/Icons/FlameDemonEvolved.png')
        this.load.image("tileset", 'assets/Tileset/tileset.png')
        this.load.image("item", 'assets/Icons/item.png'),
        this.load.audio('fireball', 'assets/Audio/fireballsound.wav'),
        this.load.tilemapTiledJSON("map", "assets/Maps/map.json")
        this.load.image('sky','assets/Icons/sky.png'),
        this.load.spritesheet('PLAYER', 'assets/Icons/dude.png',{
            frameWidth: 32, frameHeight: 48
        }) 
    }
    create (){
        let song5 = this.sound.add("song5");
        var songcomplete = {
            volume: 0.5 ,
            rate : 1,
            loop : true,
        }
        if (SoundtrackSong1 == 1) {
            song5.play(songcomplete);
            
        }
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
        let background = map.createStaticLayer("background", [tileset], 0,0).setDepth(-1)
        Align.scaleToGameW(background, 1)
        let mappy = map.createStaticLayer("world", [tileset], 0,0).setOrigin(0,0);
        Align.scaleToGameW(mappy, 1);
        this.physics.add.staticGroup();
        //
        //
        this.player = this.physics.add.sprite(0,800, 'PLAYER').setScale(0.4);
        this.enemy = this.physics.add.group();
        this.enemy2 = this.physics.add.group();
        //
        //
        this.blockGrid = new AlignGrid({
            scene: this,
            rows: 22,
            cols: 22,
            height: background.displayHeight,
            width: background.displayWidth
        })
        //
        //
        this.cameras.main.setBounds(0, 0,1900,960);
        this.physics.world.setBounds(0,0,1900,960)
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setZoom(3);
        //
        //
        var item = this.physics.add.group({
            key: 'item',
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
        item.children.iterate(function (child) {
        
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
        
        });
        this.physics.add.collider(item, mappy);
        this.physics.add.overlap(this.player, item, collectItem, null, this);
        function collectItem (player, item)
{
    item.disableBody(true, true);
    itempickup += 1
};
        //
        //
        var x = (this.player.x < 400) ? Phaser.Math.Between(400,800) : Phaser.Math.Between(0,400);

        var enemy  = this.enemy.create(x, 16, 'enemy').setScale(0.4);
        enemy.setCollideWorldBounds(true);
        
        enemy.setBounce(.6);
        this.enemy.setVelocityX(300);
        this.enemy.setVelocityY(30);
        var enemy2 = this.enemy2.create(x, 16, 'enemy2').setScale(0.2)
        enemy2.setCollideWorldBounds(true);
        enemy2.setBounce(.6);
        this.enemy2.setVelocityX(400);
        this.enemy2.setVelocityY(60);
        //
        //
        //
        //
        this.physics.add.collider(enemy, mappy);
        this.physics.add.collider(enemy2, mappy);
        //
        //
        function hitEnemy (player, enemy){
            this.physics.pause();
            this.player.setTint(0xff0000);
            this.player.anims.play('turn');
            score = 0;
            song5.stop();
            this.scene.start("MainMenu");
        }
        function hitEnemy2 (player, enemy2){
            this.physics.pause();
            this.player.setTint(0xff0000);
            this.player.anims.play('turn');
            score = 0;
            song5.stop();
            this.scene.start("MainMenu");
        }
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        mappy.setCollisionByProperty({collides:true});
        mappy.setCollision([11])
        mappy.setCollisionBetween(1, 50);
        this.physics.add.collider(this.player, mappy);
        
        this.physics.add.collider(this.player, this.enemy, hitEnemy, null, this);
        this.physics.add.collider(this.player, this.enemy2, hitEnemy2, null, this);
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('PLAYER', { start: 20, end: 29 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('PLAYER', { start: 0, end: 9}),
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('PLAYER', { start: 10, end: 19 }),
            frameRate: 10,
            repeat: -1
        },this);
        //
        //
        this.input.keyboard.on('keyup_P', function(event) {
            if (this.key_A.isDown) {
                var physicsImage = this.physics.add.image(this.player.x, this.player.y, "projectile").setScale(0.35);
                physicsImage.setVelocity(Phaser.Math.RND.integerInRange (-200,200) -450, -100);
                physicsImage.x = this.player.x + -10;
                this.fireballeffect.play();
                this.physics.add.collider(physicsImage, enemy, function (physicsImage, enemy) {
                    physicsImage.destroy();
                    enemy.destroy();

                });
                this.physics.add.collider(physicsImage, mappy, function(physicsImage, mappy) {
                    physicsImage.destroy();
                });
                this.physics.add.collider(physicsImage, enemy2, function(physicsImage, enemy2) {
                    physicsImage.destroy();
                    hits += 1;
                    if (hits == 5) {
                        enemy2.destroy();
                        score += 10;
                    }
                })
            }
            else if (this.key_D.isDown) {
                var physicsImage2 = this.physics.add.image(this.player.x, this.player.y, "projectile2").setScale(0.35); 
                physicsImage2.setVelocity(Phaser.Math.RND.integerInRange (200,-200) + 450, -100 );
                physicsImage2.x = this.player.x + 10;

                this.fireballeffect.play();
                this.physics.add.collider(physicsImage2, enemy, function (physicsImage2, enemy) {
                    physicsImage2.destroy();
                    enemy.destroy();
                });
                this.physics.add.collider(physicsImage2, mappy, function(physicsImage2, mappy) {
                    physicsImage2.destroy();
                }) ;
                this.physics.add.collider(physicsImage2, enemy2, function(physicsImage2, enemy2) {
                    physicsImage2.destroy();
                    hits += 1;
                    if (hits == 5) {
                        enemy2.destroy();
                        score += 10;
                    }
                })
            }
            if (score == 130) {
                    song5.stop();
                    this.scene.start("MainMenu")
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
       this.player.setVelocityY(-280);
       if (itempickup == 1) {
           this.player.setVelocityY(-560)
       }
   }
    }
}