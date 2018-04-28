let score = 0;
let collision = false;
let add = false;
let lives = 3;
let a = 5;

const endPanel = document.querySelector('.end-panel');
const playBtn = document.querySelector('.play-again');
const message = document.querySelector('#msg')

const livesCounter = document.getElementById('lives');
const hearts = document.getElementsByClassName('fa-heart');
const scores = document.getElementById('score');
scores.innerText = score;

// Enemies our player must avoid
const Enemy = function () {
    this.x = Math.floor(Math.random() * 400);
    this.y = 64 + ((Math.floor(Math.random() * 4)) * 82);
    this.speed = Math.floor(Math.random() * 100) + 50;
    this.width = 80;
    this.height = 60;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > 500) {
        this.reset();
    }
};

Enemy.prototype.reset = function () {
    this.x = -100;
    this.y = 64 + ((Math.floor(Math.random() * 4)) * 82);
}

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

Player.prototype.update = function () {
    if (this.y < 50) {
        add = true;
        setTimeout(function () {
            addPts();
            player.reset();
        }, 200);
    }
    this.checkCollisions();
}

Player.prototype.checkCollisions = function () {
    for (let i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 70 &&
            this.x + 60 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 &&
            65 + this.y > allEnemies[i].y) {
            collision = true;
            setTimeout(function () {
                loseLive();
                player.reset();
//                allEnemies.forEach(function (e) {
//                    e.reset();
//                });
            }, 200);
        }
    }
}

const allEnemies = [];
const player = new Player;

while (a > 0) {
    var enemy = new Enemy;
    allEnemies.push(enemy);
    a--;
}

function loseLive() {
    if (collision) {
        lives--;
        hearts[lives].className = 'far fa-heart';
        collision = false;
    }
    if (lives === 0) {
        message.innerText = 'Game Over!';
        endPanel.style.visibility = 'visible';
    }
}

function addPts() {
    if (add) {
        score += 10;
        scores.innerText = score;
        add = false;
    }
}

function restartGame() {
    lives = 3;
    for (h of hearts) {
        h.className = 'fas fa-heart';
    };
    score = 0;
    scores.innerText = score;
}

document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

playBtn.addEventListener('click', function () {
    restartGame();
    endPanel.style.visibility = 'hidden';
    message.innerText = '';
});
