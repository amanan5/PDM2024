let port;
let joyX = 0, joyY= 0, sw = 0;
let connectButton;
let circleX, circleY;
let speed = 3;


function setup() {
  port = createSerial();
  createCanvas(400, 400);
  circleX = width/2;
  circleY = height/2;

  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600); // automatically connected to joystick
  }
}

function draw() {
  background(220);

  let str = port.readUntil("\n");
  if (str) {
    let values = str.split(",");
    if (values.length > 2) {
      joyX = values[0];
      joyY = values[1];
      sw = values[2];

      if (joyX > 0) {
        circleX += speed;
      } else if (joyX < 0) {
        circleX -= speed;
      }
      if (joyY > 0) {
        circleY += speed;
      } else if (joyY < 0) {
        circleY -= speed;
      }
    }
  }
  noStroke();
  fill('purple');
  rect(0,0,width/2,height);
  fill('gold');
  rect(width/2,0,width/2,height);

  //ensure circle stays within the canvas
  circleX = constrain(circleX, 0, width);
  circleY = constrain(circleY,0,height);

  if (port.opened() && frameCount % 3 == 0) {
    let pixel = get(circleX, circleY);
    console.log(pixel);
    let message = `${pixel[0]} ${pixel[1]} ${pixel[2]}\n`;
    port.write(message);
  }

  stroke(0);
  if(sw == 1) {
    fill("black");
  } 
  else {
    fill(255);
  }
  circle(circleX, circleY, 5);
}

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 57600);
  } else {
    port.close();
  }
}
