class Stage2 extends Phaser.Scene {
    constructor() {
        super({key:"Stage2"});
    }
    preload(){
        this.load.image("tileset", 'assets/Tileset/tileset.png')
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
        this.player = this.physics.add.sprite(0,700, 'PLAYER');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        world.setCollisionByProperty({collides:true});
        world.setCollision([11])
        world.setCollisionBetween(1, 50);
        this.physics.add.collider(this.player, world);
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
        //
        //
        this.input.keyboard.on('keyup_P', function(event) {
            if (this.key_A.isDown) {
                var physicsImage = this.physics.add.image(this.player.x, this.player.y, "projectile");
                physicsImage.setVelocity(Phaser.Math.RND.integerInRange (-200,200) -600, -100);
                physicsImage.x = this.player.x + -100;
                this.fireballeffect.play(); 
            }
            else if (this.key_D.isDown) {
                var physicsImage2 = this.physics.add.image(this.player.x, this.player.y, "projectile2"); 
                physicsImage2.setVelocity(Phaser.Math.RND.integerInRange (200,-200) + 600, -100 );
                physicsImage2.x = this.player.x + 100;

                this.fireballeffect.play();
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