let player, ball, violetBricks, yellowBricks, redBricks, cursors
let openingText, gameOverText, playerWonText;;
let gameStarted = false;

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 640,
    debug: true,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload,
        create,
        update,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false
        },
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('ball', 'assets/images/ball_32_32.png');
    this.load.image('paddle', 'assets/images/paddle_128_32.png');
    this.load.image('brick1', 'assets/images/brick1_64_32.png');
    this.load.image('brick2', 'assets/images/brick2_64_32.png');
    this.load.image('brick3', 'assets/images/brick3_64_32.png');
}

function create() {
    player = this.physics.add.sprite(
        400, // x position
        600, // y position
        'paddle', // key of image for the sprite
    );

    ball = this.physics.add.sprite(
        400, // x position
        565, // y position
        'ball', // key of image for the sprite
    );

    violetBricks = this.physics.add.group({
        key: 'brick1',
        repeat: 9, // create 10 total copies of the sprite
        immovable: true,
        setXY: {
            x: 80, // intial x position
            y: 140, // intial y position
            stepX: 70 // step next sprite x over value
        }
    });

    yellowBricks = this.physics.add.group({
        key: 'brick2',
        repeat: 9,
        immovable: true,
        setXY: {
            x: 80,
            y: 90,
            stepX: 70
        }
    });

    redBricks = this.physics.add.group({
        key: 'brick3',
        repeat: 9,
        immovable: true,
        setXY: {
            x: 80,
            y: 40,
            stepX: 70
        }
    });


    // Create start now text
    openingText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'Press SPACE to Start',
        {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '50px',
            fill: '#fff'
        },
    );

    openingText.setOrigin(0.5)

    // Create game over text 
    gameOverText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'Game Over',
        {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '50px',
            fill: '#fff'
        },
    );
    gameOverText.setOrigin(0.5);
    // Make game over text invisible
    gameOverText.setVisible(false);

    playerWonText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'You Won!',
        {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '50px',
            fill: '#fff'
        },
    );
    playerWonText.setOrigin(0.5);
    // Make game won text invisible
    playerWonText.setVisible(false);

    // keyboard input variable
    cursors = this.input.keyboard.createCursorKeys();

    // Collision settings
    player.setCollideWorldBounds(true);
    ball.setCollideWorldBounds(true);
    ball.setBounce(1, 1);

    this.physics.world.checkCollision.down = false;
    this.physics.add.collider(ball, violetBricks, hitBrick, null, this);
    this.physics.add.collider(ball, yellowBricks, hitBrick, null, this);
    this.physics.add.collider(ball, redBricks, hitBrick, null, this);

    player.setImmovable(true);
    this.physics.add.collider(ball, player, hitPlayer, null, this);
}

function update() {
    if (isGameOver(this.physics.world)) {
        gameOverText.setVisible(true);
        ball.disableBody(true, true);
    } else if (isWon()){
        playerWonText.setVisible(true);
        ball.disableBody(true, true);
    } else {
        if (!gameStarted){
            ball.setX(player.x);

            // Start Game Logic 
            if (cursors.space.isDown){
                gameStarted = true;
                ball.setVelocityY(-200);
                openingText.setVisible(false);
            }
        }

        player.body.setVelocityX(0);

        if (cursors.left.isDown){
            player.body.setVelocityX(-350);
        } else if (cursors.right.isDown){
            player.body.setVelocityX(350);
        }
    }
}

function isGameOver(world) {
    return ball.body.y > world.bounds.height;
}

function isWon() {
    return violetBricks.countActive() + yellowBricks.countActive() + redBricks.countActive() == 0;
}

function hitBrick(ball, brick) {
    brick.disableBody(true, true);

    if (ball.body.velocity.x == 0) {
        randNum = Math.random();
        if (randNum >= 0.5) {
            ball.body.setVelocityX(150);
        } else {
            ball.body.setVelocityX(-150);
        }
    }
}

function hitPlayer(ball, player) {
    ball.setVelocityY(ball.body.velocity.y - 5);

    let newXVelocity = Math.abs(ball.body.velocity.x) + 5;

    if (ball.x < player.x) {
        ball.setVelocityX(-newXVelocity);
    } else {
        ball.setVelocityX(newXVelocity);
    }
}