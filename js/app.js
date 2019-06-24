// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 0;
    this.y = 235.668;
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //console.log(`Enemy is being updated dt:${dt}`)
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //console.log(`inside enemy update ... this.x = ${this.x}`)
    //console.log(`inside enemy update ... this.y = ${this.y}`)
    if(this.x  >= 500){
        this.x = 0;
    }
    this.x = this.x + 1;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
let Player = function() {
    this.x = 210.415;
    this.y = 404;
    this.sprite = 'images/char-boy.png';
}
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function() {
    console.log(`inside of Player's update() keyPressed is ${this.keyPressed}`)
    if((this.keyPressed === 'up')  && (this.y > 0)){
        this.y = this.y -= 84.166; 
    }
    if((this.keyPressed === 'down') && (this.y < 404)){
        this.y = this.y += 84.166;   
    }
    if((this.keyPressed === 'right')  && (this.x < 378.747)){
        this.x = this.x += 101; 
    }
    if((this.keyPressed === 'left')  && (this.x > 42.118)){
        this.x = this.x -= 101; 
    }
    this.keyPressed = null;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {
    console.log(`Key pressed is ${keyPressed}`)

    this.keyPressed = keyPressed;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let anEnemy = new Enemy();
let allEnemies = [];
allEnemies.push(anEnemy);
// Place the player object in a variable called player
let player = new Player();



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
