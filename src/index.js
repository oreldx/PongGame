const canvas = document.querySelector('canvas');
const lScore = document.querySelector('.opposite-score');
const ctx = canvas.getContext("2d");

let score = 0;

let ball_radius = 10;
let ball = {
    'x' : canvas.width/2-ball_radius/2,
    'y' : canvas.height/2-ball_radius/2,
    'dx' : -2.5,
    'dy' : 2.5,
}

let brick_width = 20;
let brick_height = 60;
let brick = {
    'x': 10,
    'y': canvas.height/2 - brick_width,
}

let brick_opposite = {
    'x': canvas.width - 10 - brick_width,
    'y': canvas.height/2 - brick_width,
}

function newRound(){
    ball['x'] = canvas.width/2-ball_radius/2;
    ball['y'] = canvas.height/2-ball_radius/2;
}

function detectCollision() {
    // Check if ball && brick same Y
    if (brick['y']+ball['dy'] < ball['y']+ball['dy']-ball_radius/2 && ball['y']+ball['dy']+ball_radius/2 <  brick['y']+ball['dx'] + brick_height){
        // Check if ball && brick same X
        if (ball['x']+ball['dx']- ball_radius/2 - brick['x'] - brick_width < 0 && ball['dx']< 0){
            console.log(ball['dx'])
            ball['dx'] *= -1;
        }
    }
    // Check if ball collide ennemy side (here always perfect)
    if (ball['x']+ball['dx']+ball_radius/2 > brick_opposite['x']) {
        ball['dx'] *= -1;
    }
    else if (ball['x']+ball['dx']-ball_radius/2 < 0 ) {
        score += 1;
        console.log(score);
        lScore.innerHTML = parseInt(score);
        newRound();
    }

    // Check if ball collide Y side of the box
    if (ball['y']+ball['dx']+ball_radius/2 > canvas.height || ball['y']+ball['dx']-ball_radius/2 < 0 ) {
        ball['dy'] *= -1;
    }
}

function updateBall() {
    detectCollision();
    ball['x'] += ball['dx'];
    ball['y'] += ball['dy'];
}

function drawBall(){
    updateBall();
    ctx.beginPath();
    ctx.arc(ball['x'], ball['y'], ball_radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.stroke();
    ctx.fill()
    ctx.closePath();
}

function updateBrick(y) {
    brick['y'] = y;
}


function drawBrick(brickD) {
    
    ctx.beginPath();
    ctx.rect(brickD['x'], brickD['y'], brick_width, brick_height);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function brickBounds(position) {
    if (position < brick_height/2) {
        y = 0
    }
    else if (position > canvas.height-brick_height/2){
        y = canvas.height - brick_height
    }
    else {
        y = position - brick_height/2
    }
    
    return y
}

function brickMove(event) {
    
    var canvasLocation = canvas.getBoundingClientRect();
    var mouseLocation = event.clientY - canvasLocation.y
    
    y = brickBounds(mouseLocation)
    
    updateBrick(y)
}

function updateBrickOpposed (){
    brick_opposite['y'] = ball['y'] - brick_height/2 + 50
    
    brick_opposite['y'] = brickBounds(brick_opposite['y'])
}

function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath();
    ctx.rect(canvas.width/2-3, 0, 3, canvas.height);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    
    reset(false)
    
    drawBrick(brick)
    
    drawBall()
    
    updateBrickOpposed()

    drawBrick(brick_opposite)

}


canvas.addEventListener('mousemove', brickMove);
setInterval(draw, 10)