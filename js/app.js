let score = 0;
let lives = 3;
let level = 1;
let extraSpeed = 0;
// checking if the Player collided with an enemy or crossed the board
let collision = false;
let crossed = false;

// array of images of gems
const gemIcons = ['images/GemBlue.png', 'images/GemGreen.png', 'images/GemOrange.png'];

const allEnemies = [];
// the array of gems contains 3 gems - blue, green and orange
//they appear an the board at random 
//after being collected they are hidden
const gems = [];

const endPanel = $('.end-panel');
endPanel.hide();
const scores = $('#score');
const msg = $('#msg');
const lvl = $('#lvl');
const livesCounter = $('#lives');
const hearts = $('.fa-heart');
scores.text(score);
lvl.text(level);

// SuperClass for all characters
class Char {
    constructor(x, y, sprite, height, width) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.width = width;
        this.height = height;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    reset(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Player extends Char {
    constructor(x = 200, y = 380, sprite = 'images/char-boy.png', height = 75, width = 60) {
        super(x, y, sprite, height, width);
    }
    render() {
        super.render();
    }
    reset(x = 200, y = 380) {
        super.reset(x, y);
    }
    // move limitations
    handleInput(evn) {
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
    }
    // collision detection with enemies
    checkCollisions() {
        for (let i = 0; i < allEnemies.length; i++) {
            if (this.x < allEnemies[i].x + 70 && this.x + 60 > allEnemies[i].x &&
                this.y < allEnemies[i].y + 50 && 65 + this.y > allEnemies[i].y) {
                collision = true;
                setTimeout(() => {
                    loseLive();
                    player.reset();
                }, 200);
            }
        }
    }
    // collision detection with gems
    collectGem() {
        for (let i = 0; i < gems.length; i++) {
            if (this.x < gems[i].x + 40 && this.x + 80 > gems[i].x &&
                this.y < gems[i].y + 20 && this.y + 70 > gems[i].y) {
                addPts();
                gems[i].reset();
            }
        }
    }
    update() {
        if (this.y < 50) {
            // kind of 
            crossed = true;
            // setTimeout to show the last step (that the player reaches the other side of the board)
            setTimeout(() => {
                levelUp();
                player.reset();
            }, 200);
        }
        this.checkCollisions();
        this.collectGem();
    }
}
// 
class Enemy extends Char {
    constructor(x = -100, y, sprite = 'images/enemy-bug.png', height = 60, width = 80) {
        super(x, y, sprite, height, width);
        this.y = 64 + ((Math.floor(Math.random() * 4)) * 82);
        this.speed = Math.floor(Math.random() * 100) + 50; + extraSpeed;
    }
    render() {
        super.render();
    }
    reset(x, y) {
        this.x = -100;
        this.y = 64 + ((Math.floor(Math.random() * 4)) * 82);
    }
    update(dt) {
        this.x += this.speed * dt;
        if (this.x > 500) {
            this.reset();
        }
    }
}

class Gem extends Char {
    constructor(col, x = -100, y = -100, sprite, height = 50, width = 50) {
        super(x, y, sprite, height, width);
        // choose spite image from the array
        this.sprite = gemIcons[col];
    }
    render() {
        super.render();
    }
    // changes the x and y to let the gem appear again on the board after being hidden
    changeLoc() {
        this.x = 50 + Math.floor(Math.random() * 400);
        this.y = 112 + ((Math.floor(Math.random() * 4)) * 82);
    }
    hideGem() {
        this.x = -100;
        this.y = -100;
    }
    reset() {
        this.hideGem();
        let time = Math.floor(Math.random() * 6000);
        setTimeout(randomGem, time);
    }
}

const player = new Player;

for (let i = 0; i < 3; i++) {
    const gem = new Gem(i);
    gems.push(gem);
    const enemy = new Enemy;
    allEnemies.push(enemy);
}
//delay for the first gem to appear
setTimeout(randomGem, 4000);

function randomGem() {
    let rand = Math.floor(Math.random() * 3);
    gems[rand].changeLoc();
}


function loseLive() {
    if (collision) {
        lives--;
        hearts[lives].className = 'far fa-heart';
        collision = false;
    }
    if (lives === 0) {
        msg.html(`<h2>Game Over!</h2><br><p>Your score: ${score}</p>`)
        endPanel.show();
    }
}
//
function levelUp() {
    if (crossed) {
        level++;
        lvl.text(level);
        addPts();
        crossed = false;
        checkLevel();
    }
    if (score === 300) {
        msg.html(`<h2>You win!</h2><br><p>Your score: ${score}</p>`);
        endPanel.show();
    }
}
// adds ten points to the score
function addPts() {
    score += 10;
    scores.text(score);
}

function restartGame() {
    lives = 3;
    for (h of hearts) {
        h.className = 'fas fa-heart';
    };
    score = 0;
    level = 1;
    extraSpeed = 0;
    scores.text(score);
    lvl.text(level);
    // resets the enemies' location
    allEnemies.forEach(function (e) {
        e.reset();
    });
    // deletion of 2 of the enemies
    while (allEnemies.length > 3) {
        allEnemies.pop();
    }
    gems.forEach(function (e) {
        e.hideGem();
    });
    setTimeout(randomGem, 4000);
}
//changes the difficulty of the game
function checkLevel() {
    switch (level) {
        case 3:
            extraSpeed += 50;
            break;
        case 6:
            var enemy = new Enemy;
            allEnemies.push(enemy);
            break;
        case 9:
            extraSpeed += 20;
            break;
        case 12:
            var enemy = new Enemy;
            allEnemies.push(enemy);
            break;
        case 15:
            msg.html(`<h2>You win!</h2><br><p>Your score: ${score}</p>`);
            endPanel.show();
    }
}

$(document).keyup((e) => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

$('.play-again').on('click', () => {
    restartGame();
    endPanel.hide();
    msg.text('');
});
