int ledPins[] = {10, 11, 12}; // Pins connected to the LEDs
int numberOfLives = 3;        // Default number of lives

void setup() {
  Serial.begin(57600);         // Start serial communication at 9600 bps
  for (int i = 0; i < 3; i++) {
    pinMode(ledPins[i], OUTPUT);
    digitalWrite(ledPins[i], HIGH); // Turn all LEDs on initially
  }
}

void loop() {
  if (Serial.available() > 0) {
    numberOfLives = Serial.parseInt(); // Read the number of lives from serial
    updateLEDs(numberOfLives);
  }
}

void updateLEDs(int lives) {
  // Turn off LEDs based on the number of lives
  for (int i = 0; i < 3; i++) {
    if (i < lives) {
      digitalWrite(ledPins[i], HIGH); // LED on (if lives still remaining for this LED)
    } else {
      digitalWrite(ledPins[i], LOW); // LED off (lives lost)
    }
  }
}
