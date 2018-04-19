var lives = 3;


// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 80;
    this.height = 60;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.speed*dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    if (this.x > 500) {
        return this.x = -100;
        
    }
//     if (player.x < this.x + this.width &&
//   player.x + player.width > this.x &&
//   player.y < this.y + this.height &&
//   player.height + player.y > this.y) {
//    
//    }
  

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = 'images/char-boy.png'
    this.x = 200;
    this.y = 380;
    this.height = 75;
    this.width = 60;
};


Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

   
Player.prototype.handleInput = function (evn) {
    switch (evn) {
        case 'left':
            if (this.x > 0) {
                this.x -= 100;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= 80;
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x += 100;
            }
            break;
        case 'down':
            if (this.y < 380) {
                this.y += 80;
            }
            break;
    }
};


Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
    
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player;

var enemy = new Enemy(-60, 60, 40);
var enemy2 = new Enemy(-80, 145, 50);
var enemy3 = new Enemy(-100, 230, 70);

allEnemies.push(enemy, enemy2, enemy3);
Player.prototype.update = function () {
  for (var i = 0; i<allEnemies.length; i++){
       if (this.x < allEnemies[i].x + 70  &&
            this.x + 60 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 &&
            65 + this.y > allEnemies[i].y){
        
           player.reset();
           lives--; 
           if (lives === 0) {
               alert('you lose!');
               lives = 3;
           }
           
   } }

}
     
//check();
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

