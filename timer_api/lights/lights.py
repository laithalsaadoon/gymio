import gpiozero

GREEN = 13
YELLOW = 6
RED = 5


class Lights:
    def __init__(self):
        self.green = gpiozero.LED(GREEN)
        self.yellow = gpiozero.LED(YELLOW)
        self.red = gpiozero.LED(RED)

    def green_on(self):
        self.green.on()

    def yellow_on(self):
        self.yellow.on()

    def red_on(self):
        self.red.on()

    def all_off(self):
        self.green.off()
        self.yellow.off()
        self.red.off()

    def all_on(self):
        self.green.on()
        self.yellow.on()
        self.red.on()

    def green_off(self):
        self.green.off()

    def yellow_off(self):
        self.yellow.off()

    def red_off(self):
        self.red.off()
