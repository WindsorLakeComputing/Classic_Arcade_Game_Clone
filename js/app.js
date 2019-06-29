// Enemies our player must avoid
function EnemyFactory() {
    return new Enemy(Enemy.startingX, (this.getRndInteger(1, 5) * 84.166), this.getRndInteger(100, 500));
};
    Enemy = function(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
};

Enemy.startingX = 0.415;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x  >= 500){
        this.x = 0.415;
    }
    this.x = this.x + (this.speed * dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    if(this.y  <= 0){
        this.x = Player.startingX;
        this.y = Player.startingY;
    }
    if((this.keyPressed === 'up')  && (this.y > 0)){
        this.y = this.y -= Player.moveY; 
    }
    if((this.keyPressed === 'down') && (this.y < Player.startingY)){
        this.y = this.y += Player.moveY;   
    }
    if((this.keyPressed === 'right')  && (this.x < Player.boardBoundaryRight)){
        this.x = this.x += Player.moveX; 
    }
    if((this.keyPressed === 'left')  && (this.x > Player.boardBoundaryLeft)){
        this.x = this.x -= Player.moveX; 
    }
    this.keyPressed = null;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {
    this.keyPressed = keyPressed;
};

Player.startingX = 210.415;
Player.startingY = 404;
Player.moveX = 101;
Player.moveY = 84.166;
Player.boardBoundaryRight = 378.747;
Player.boardBoundaryLeft = 42.118;


// Now instantiate your objects.
let numInitEnemies = 3;
let allEnemies = [];

for(numInitEnemies; numInitEnemies > 0; numInitEnemies--){
    enemy = EnemyFactory();
    allEnemies.push(enemy);
}

// Place the player object in a variable called player
let player = new Player(Player.startingX, Player.startingY);

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
