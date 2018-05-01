let score = 0;
let collision = false;
let add = false;
let lives = 3;
let a = 3;
let level = 1;
let extraSpeed = 0;

const endPanel = $('.end-panel');
const msg = $('#msg');
const livesCounter = $('lives');
const hearts = $('.fa-heart');
$('#score').text(score);
$('#lvl').text(level);

// Enemies our player must avoid
class Enemy {
    constructor() {
        this.x = Math.floor(Math.random() * 400);
        this.y = 64 + ((Math.floor(Math.random() * 4)) * 82);
        this.speed = Math.floor(Math.random() * 100) + 50 + extraSpeed;
        this.width = 80;
        this.height = 60;
        this.sprite = 'images/enemy-bug.png';
    }
    update(dt) {
        this.x += this.speed * dt;
        if (this.x > 500) {
            this.reset();
        }
    }
    reset() {
        this.x = -100;
        this.y = 64 + ((Math.floor(Math.random() * 4)) * 82);
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 380;
        this.height = 75;
        this.width = 60;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
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
    reset() {
        this.x = 200;
        this.y = 380;
    }
    checkCollisions() {
        for (let i = 0; i < allEnemies.length; i++) {
            if (this.x < allEnemies[i].x + 70 && this.x + 60 > allEnemies[i].x &&
                this.y < allEnemies[i].y + 50 && 65 + this.y > allEnemies[i].y) {
                collision = true;
                setTimeout(function () {
                    loseLive();
                    player.reset();
                }, 200);
            }
        }
    }
    collectGem() {
        for (let i = 0; i < gems.length; i++) {
            if (this.x < gems[i].x + 40 &&
                this.x + 80 > gems[i].x &&
                this.y < gems[i].y + 20 &&
                70 + this.y > gems[i].y) {
                gems[i].gemReset();
            }
        }
    }
    update() {
        if (this.y < 50) {
            add = true;
            setTimeout(function () {
                addPts();
                player.reset();
            }, 200);
        }
        this.checkCollisions();
        this.collectGem();
    }
};


const gemIcons = ['images/GemBlue.png', 'images/GemGreen.png', 'images/GemOrange.png'];
let rand = Math.floor(Math.random() * 3);

class Gem {
    constructor(col) {
        this.x = -100;
        this.y = -100;
        this.width = 50;
        this.height = 50;
        this.sprite = gemIcons[col];
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    changeLoc() {
        this.x = 50 + Math.floor(Math.random() * 400);
        this.y = 112 + ((Math.floor(Math.random() * 4)) * 82);
    }

    hide() {
        this.x = -100;
        this.y = -100;
    }
    gemReset() {
        this.hide();
        score += 10;
        $('#score').text(score);
        let time = Math.floor(Math.random() * 6000);
        setTimeout(function () {
            rand = Math.floor(Math.random() * 3);
            gems[rand].changeLoc();
        }, time);
    }

}

setTimeout(() => {
    gems[rand].changeLoc();
}, 4000);

const gems = [];
const gemBlue = new Gem(0),
    gemGreen = new Gem(1),
    gemOrange = new Gem(2);
gems.push(gemBlue, gemGreen, gemOrange);

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
        msg.html(`<h2>Game Over!</h2><br><p>Your score: ${score}</p>`)
        endPanel.css('visibility', 'visible');
    }
}

function addPts() {
    if (add) {
        level++;
        $('#lvl').text(level);
        score += 10;
        $('#score').text(score);
        add = false;
        checkLevel();

    }
    if (score === 300) {
        msg.text('You win!');
        endPanel.css('visibility', 'visible');
    }
}

function restartGame() {
    lives = 3;
    for (h of hearts) {
        h.className = 'fas fa-heart';
    };
    score = 0;
    level = 1;
    $('#score').text(score);
    $('#lvl').text(level);
    allEnemies.forEach(function (e) {
        e.reset();
    });
    while (allEnemies.length > 3) {
        allEnemies.pop();
    }
    extraSpeed = 0;
    gems.forEach(function (e) {
        e.hide();
    });
}

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
            endPanel.css('visibility', 'visible');
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
    endPanel.css('visibility', 'hidden');
    msg.text('');
});
