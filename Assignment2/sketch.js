// Define color array
var colors=['red','orange', 'yellow','green', 'cyan','blue', 'magenta','brown','white', 'black'];
// Define selected color index
var selectedColorIndex=0;
// Height and Width of one cell in color palette
var palette_cell_size=30;
// x,y coordinates of previous point to draw lines from point to point
var x, y;
// Indicate if currently drawing
var drawing=false;

function setup() {
  // using 500x500 Canvas size
  createCanvas(500,500);
  // To use a thicker pen stroke
  strokeWeight(10);
  // Make background white
  background(255, 255, 255);
}

//this method gets called repeatedly so that color palette will stay on top all the time.
function draw() {
  // Disable stroke
  noStroke();
  // Drawing each cell in color palette
  for(let i=0;i<colors.length;i++){
    // using color at index = i as fill color
    fill(colors[i]);
    // Draws a rectangle at 0,i*palette_cell_size with width and height equals palette_cell_size
    rect(0,i*palette_cell_size,palette_cell_size,palette_cell_size);
  }
  // Enable stroke again
  stroke(colors[selectedColorIndex]);
}

//this method gets called when mouse is pressed
function mousePressed(){
  // Check if mouse is within color palette - must meet all conditions to be true
  if(mouseX>=0 && mouseX<palette_cell_size && mouseY>=0 && mouseY<(colors.length*palette_cell_size)){
    // Divide y coordinate by cell size to get selectedColorIndex
    selectedColorIndex=floor(mouseY/palette_cell_size);
    // Using selectedColorIndex as stroke color
    stroke(colors[selectedColorIndex]);
    // When not drawing yet
    drawing=false;  
  }else{
    // Marking current point as starting point
    x=mouseX;
    y=mouseY;
    // Drawing now
    drawing=true;
  }
}

//Function for mouse dragged
function mouseDragged(){
  // Check if drawing flag is true before drawing
  if(drawing){
    // To draw a line from (x,y) to current mouse position
    line(x,y, mouseX, mouseY);
    // To set current mouse position as new x,y coordinates
    x=mouseX;
    y=mouseY;
  }
}