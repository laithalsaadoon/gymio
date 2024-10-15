from lights.lights import Lights
from gpiozero import Button as GPIOButton
from database.database import SessionLocal
from database.models import ButtonRestDuration
import threading

class Button:
    def __init__(self, lights: Lights):
        self.lights = lights
        self.db = SessionLocal()
        self.physical_button = GPIOButton(21)  # Assuming the button is connected to GPIO 21
        self.physical_button.when_pressed = self.handle_button_press

    def handle_button_press(self):
        # Get the button duration from the database
        button_rest_duration = self.db.query(ButtonRestDuration).filter(ButtonRestDuration.id == 1).first()
        
        if button_rest_duration:
            duration = button_rest_duration.duration
            
            # Turn the light red
            self.lights.all_off()
            self.lights.red_on()
            
            # Use a timer to turn the light green after the duration
            def turn_green():
                self.lights.all_off()
                self.lights.green_on()
            
            # Start a timer that will call turn_green after the duration
            timer = threading.Timer(duration, turn_green)
            timer.start()
        else:
            print("No button duration set in the database.")

    def close(self):
        self.db.close()
        self.physical_button.close()  # Clean up the GPIO resources
