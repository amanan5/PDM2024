function setup() {
  createCanvas(2000, 2000);
  colorMode(RGB,100);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  // Example 1
  noStroke(); 
  fill('#39FF14');
  rect(75,60,350,200);
  stroke('black');
  strokeWeight(1);
  fill('white');
  circle(165,160,150);
  stroke('black');
  strokeWeight(1);
  fill('white');
  square(260,85,150);

  // Example 2
  noStroke();
  fill('rgba(255,0,0,0.25)');
  circle(225,400,100);
  fill('rgba(0,0,255,0.25)');
  circle(200,450,100);
  fill('rgba(0,255,0,0.25)');
  circle(250,450,100);

  // Example 3
  //PacMan
  noStroke();
  fill('black');
  rect(75,600,350,200);
  fill('yellow');
  arc(160,700,150,150,225,135,PIE);

  // Ghost
  noStroke();
  fill('red');
  rect(260,695,140,75);
  fill('red');
  arc(330,700,140,140,180,360,CHORD);
  fill('white');
  circle(295,700,45);
  circle(365,700,45);
  fill('blue');
  circle(295,700,30);
  circle(365,700,30);

  // Example 4 - Drawing the background
  noStroke();
  fill('#000080');
  strokeWeight(4);
  square(65,850,300);

  // Drawing the circle
  stroke('white');
  fill('green');
  circle(215,1000,200);

  // Drawing the star
  stroke('white');
  fill('red');
  beginShape();
  vertex(310,965); // right point
  vertex(250,965); 
  vertex(215,900); // top point
  vertex(185,965); // top left
  vertex(120,965);
  vertex(165,1015); // bottom middle
  vertex(155,1080); // bottom left
  vertex(215,1050); // middle bottom 
  vertex(275,1080); // bottom right
  vertex(265,1015); // top right
  endShape(CLOSE);
}

