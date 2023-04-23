from collections import deque

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger

from lights.lights import Lights
from my_types.my_types import HIIT, Timer_Dict


class Trainer:
    def __init__(self, scheduler: BackgroundScheduler):
        self.scheduler = scheduler
        self.scheduled = False
        self.job = None
        self.scheduler.start()
        self.lights = Lights()
        self.red = self.lights.red_on
        self.yellow = self.lights.yellow_on
        self.green = self.lights.green_on
        self.all_off = self.lights.all_off

    def post_schedule(self, HIIT: HIIT):
        self.HIIT = HIIT

        my_list: list[Timer_Dict] = []
        for round in range(1, self.HIIT.rounds + 1):
            if round == 1:
                my_list.append(Timer_Dict(3, self.yellow, self.all_off, round))

            seconds_in_round = Timer_Dict(self.HIIT.train - 10, self.green, self.lights.all_off, round)
            my_list.append(seconds_in_round)

            ten_seconds_to_rest = Timer_Dict(10, self.yellow, self.all_off, round)
            my_list.append(ten_seconds_to_rest)

            if round != self.HIIT.rounds:
                seconds_in_rest = Timer_Dict(self.HIIT.rest - 5, self.red, self.all_off, round)
                my_list.append(seconds_in_rest)

                five_second_warning = Timer_Dict(5, self.yellow, self.all_off, round)
                my_list.append(five_second_warning)

        self.rounds = deque(my_list)

    def start(self):
        try:
            this_round = self.rounds.popleft()
            this_round.color_off()
            this_round.color_on()
            trigger = IntervalTrigger(seconds=this_round.seconds)
            self.job = self.scheduler.add_job(self.start, trigger=trigger, max_instances=1, coalesce=True)
        except IndexError:
            print("You're done!")
            self.all_off()
            self.scheduler.remove_all_jobs()
            self.job = None

    def stop(self):
        self.all_off()
        self.scheduler.remove_all_jobs()
        print("Goodbye!")

    def pause(self):
        if self.job is not None:
            self.job.pause()
            print("Paused")

    def resume(self):
        if self.job is not None:
            self.job.resume()
            print("Resumed")
