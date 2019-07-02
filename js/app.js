'use strict';
class GamePiece {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
// Enemies our player must avoid
function EnemyFactory() {
    return new Enemy(0.415, (getRndInteger(1, 5) * 84.166), getRndInteger(100, 500));
};
class Enemy extends GamePiece {
    constructor(x, y, speed) {
        super(x, y);
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
    update(dt) {
        if (this.x >= 500) {
            this.x = 0.415;
        }
        this.x = this.x + (this.speed * dt);
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

class Player extends GamePiece {

    constructor(x, y) {
        super(x, y);
        this.startingX = 210.415;
        this.startingY = 404;
        this.moveX = 101;
        this.moveY = 84.166;
        this.boardBoundaryRight = 378.747;
        this.boardBoundaryLeft = 42.118;
        this.sprite = 'images/char-boy.png';
    }

    update() {
        if (this.y <= 0) {
            this.x = this.startingX;
            this.y = this.startingY;
        }
        if ((this.keyPressed === 'up') && (this.y > 0)) {
            this.y = this.y -= this.moveY;
        }
        if ((this.keyPressed === 'down') && (this.y < this.startingY)) {
            this.y = this.y += this.moveY;
        }
        if ((this.keyPressed === 'right') && (this.x < this.boardBoundaryRight)) {
            this.x = this.x += this.moveX;
        }
        if ((this.keyPressed === 'left') && (this.x > this.boardBoundaryLeft)) {
            this.x = this.x -= this.moveX;
        }
        this.keyPressed = null;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyPressed) {
        this.keyPressed = keyPressed;
    }
}

// Now instantiate your objects.
let numInitEnemies = 3;
let allEnemies = [];

for (numInitEnemies; numInitEnemies > 0; numInitEnemies--) {
    let enemy = EnemyFactory();
    allEnemies.push(enemy);
}

// Place the player object in a variable called player
let player = new Player(210.415, 404);

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});