var centerX;
var centerY;
var b2;
var bobs;

function setup() {
    createCanvas(windowWidth, windowHeight);
    //initialize variables
    centerX = windowWidth / 2;
    centerY = windowHeight / 2;
    //initialize array
    bobs = new Array();
    for (var i = 0; i < 20; i++) {
        //add bobs to the array
        append(bobs, new bob(50 * i, 500, i * 10));
    }
    b2 = new bob(200, 300, 0);
}

function draw() {

    background(255);
    noStroke();

    for (var i = 0; i < bobs.length; i++) {
        if (keyIsPressed) {
            bobs[i].twitch();

        }
        bobs[i].display();
        bobs[i].move();
    }

    //only twitch on keyboard down
    if (keyIsPressed) {
        b2.twitch();
    }

    b2.display();
}

function mousePressed() {
    append(bobs, new bob(mouseX, mouseY, random(10)));
}


//Object Bob takes in an X, Y starting position. 
//Seed provides variation to the sin function so they all don't move in sync
function bob(x, y, seed = 0) {

    this.x = x;
    this.y = y;
    this.vel = 6;
    this.dir = random(0, TWO_PI);
    this.radius = random(10, 40);
    this.nearMouse = false;
    this.color = color(0, 0, 255);
    this.iter = seed;

    this.move = function() {
        //move the particle
        this.x += this.vel * cos(this.dir);
        this.y += this.vel * sin(this.dir);

        //check for x bounds
        if (this.x >= windowWidth || this.x <= 0) {
            this.dir = PI - this.dir;
        }
        //check for y bounds
        if (this.y >= windowHeight || this.y <= 0) {
            this.dir = -this.dir;
        }

        //slow around mouse 
        if (dist(this.x, this.y, mouseX, mouseY) < 80) {
            this.vel = 3;
        } else {
            this.vel = 6;
        }

    }

    this.twitch = function() {
        this.x += .9 * sin(this.iter);
        this.y += .9 * random(-1, 1);
    }

    this.display = function() {
        fill(this.color);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        this.iter += .2;
    }

}