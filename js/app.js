let lives = 3;

// Enemies our player must avoid
const Enemy = function () {
    this.x = Math.floor(Math.random() * 400);
    this.y = 64 + ((Math.floor(Math.random() * 4)) * 82);
    this.speed = Math.floor(Math.random() * 400) + 80;
    this.width = 80;
    this.height = 60;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;

    if (this.x > 500) {
        this.x = -100;
        this.y = 64 + ((Math.floor(Math.random() * 4)) * 82);
        this.speed = Math.floor(Math.random() * 100) + 50;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function () {
    this.sprite = 'images/char-boy.png';
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


Player.prototype.reset = function () {
    this.x = 200;
    this.y = 380;
}

const allEnemies = [];
const player = new Player;


let a = 0;
while (a < 5) {
    var enemy = new Enemy;
    allEnemies.push(enemy);
    a++
}

// allEnemies.push(enemy, enemy2, enemy3);
Player.prototype.update = function () {
    for (let i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 70 &&
            this.x + 60 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 &&
            65 + this.y > allEnemies[i].y) {

            player.reset();
            lives--;
            if (lives === 0) {
                alert('you lose!');
                lives = 3;
            }
        }
    }
}

//check();
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
