let purple; // defining a global variable for color
let gold;
let x; // to move square around
let y; 
const size = 100; // constant size
let dragging = false; // boolean variable to check

function setup() {
  createCanvas(400, 400);
  purple = color('#461D7C'); // define new color with HEX code
  gold = color('#FDD023');
  x = width / 2;
  y = height / 2;
  // rectMode(CENTER); // position center instead of top left
}

function draw() {
  background(220);

  // if(mouseIsPressed) { // true, pressing mouse makes purple
  //   if(mouseX >= x && mouseX <= x + size && mouseY >= y && mouseY <= y + size) {// check if mouse is inside the square, all must be true
  //     fill(purple);
  //     stroke(gold);
    
  //     x += mouseX - pmouseX; // adding current position from previous to move
  //     y += mouseY - pmouseY; // same as above for y
  //   }
  // }
  // else {
  //   fill(gold); // using new gold if not pressed
  //   stroke(0);
  // } 
  square(x,y,size); // x,y,size variables are defined
}

function mousePressed() { // called every time mouse is pressed
  // console.log("mouseX: " + mouseX);// to print to console
  // console.log("x: " + x);
  if(mouseX >= x && mouseX <= x + size && mouseY >= y && mouseY <= y + size) // to check bounds 
  dragging = true;
  console.log(dragging);
}

function mouseReleased() { // to stop pressed function
  dragging = false;
}

function mouseDragged () { // dragged at all
  console.log(dragging);
  if(dragging) { // dragging is true
    x += mouseX - pmouseX; // update x and y when dragging is true for each mouse move
    y += mouseY - pmouseY; 
    console.log(x);
  }
}