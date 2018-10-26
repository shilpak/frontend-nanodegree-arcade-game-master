// Enemies our player must avoid
var Enemy = function(x, y, velocity) {

    this.x = x;
    this.y = y + 55;
    this.velocity = velocity;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.endValue = this.step * 5;
    this.resetPositon = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    if (this.x < this.endValue) {
        // You should multiply any movement by the dt parameter

        this.x += this.velocity * dt;
    } else {
        this.x = this.resetPositon;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Hero {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.step = 101;
        this.leap = 83;
        this.initialPosition_X = this.step * 2;
        this.initialPosition_Y = (this.leap * 4) + 55;
        this.x = this.initialPosition_X;
        this.y = this.initialPosition_Y;
        this.winner = false;
    }
    update() {
        for (let enemy of allEnemies) {

            if (this.y === enemy.y && (enemy.x + enemy.step / 2 > this.x && enemy.x < this.x + this.step / 2)) {
                this.reset();
            }
            if (this.y === 55) {
                this.winner = true;
            }
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(input) {
        if (input == 'left' && (this.x > 0)) {
            this.x -= this.step;
        }

        if (input == 'up' && (this.y > this.leap)) {
            this.y -= this.leap;
        }

        if (input == 'right' && (this.x < this.step * 4)) {
            this.x += this.step;
        }

        if (input == 'down' && (this.y < this.leap * 4)) {
            this.y += this.leap;
        }
    };

    reset() {
        this.y = this.initialPosition_Y;
        this.x = this.initialPosition_X;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Hero();
const bettle = new Enemy(-101, 0, 200);
const bettle1 = new Enemy(-101, 83, 300);
const bettle2 = new Enemy(-250, 83, 300);
const bettle3 = new Enemy(-350, 166, 300);
const allEnemies = [];
allEnemies.push(bettle, bettle1, bettle2, bettle3);


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