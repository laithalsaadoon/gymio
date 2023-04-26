import os

if "wsl" not in os.uname().release.lower():
    from lights.lights import Lights

from collections import deque
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from my_types import Workout, Timer


class Trainer:
    def __init__(self, scheduler: BackgroundScheduler):
        self.scheduler = scheduler
        self.job = None
        self.scheduler.start()
        if "wsl" not in os.uname().release.lower():
            self.lights = Lights()
            self.red = self.lights.red_on
            self.yellow = self.lights.yellow_on
            self.green = self.lights.green_on
            self.all_off = self.lights.all_off
            self.yellow_blink = self.lights.yellow_blink
        # shadow the light functions if we're on WSL for local testing without lights
        else:
            self.red, self.yellow, self.green, self.all_off, self.yellow_blink = (
                lambda: print("red"),
                lambda: print("yellow"),
                lambda: print("green"),
                lambda: print("all off"),
                lambda x: print("yellow blink"),
            )

    def post_schedule(self, HIIT: Workout):
        self.HIIT = HIIT

        my_list: list[Timer] = []
        for round in range(1, self.HIIT.rounds + 1):
            if round == 1:
                my_list.append(
                    Timer(
                        seconds=3,
                        is_blink=False,
                        color_on=self.yellow,
                        color_off=self.all_off,
                        current_round=round,
                    )
                )

            seconds_in_round = Timer(
                seconds=self.HIIT.train - 10,
                is_blink=False,
                color_on=self.green,
                color_off=self.all_off,
                current_round=round,
            )
            my_list.append(seconds_in_round)

            ten_seconds_to_rest = Timer(
                seconds=10,
                is_blink=True,
                color_on=self.yellow_blink,
                color_off=self.all_off,
                current_round=round,
            )
            my_list.append(ten_seconds_to_rest)

            if round != self.HIIT.rounds:
                # If this is the last round, don't add the rest time
                seconds_in_rest = Timer(
                    seconds=self.HIIT.rest - 10,
                    is_blink=False,
                    color_on=self.red,
                    color_off=self.all_off,
                    current_round=round,
                )
                my_list.append(seconds_in_rest)

                five_second_warning = Timer(
                    seconds=10,
                    is_blink=True,
                    color_on=self.yellow_blink,
                    color_off=self.all_off,
                    current_round=round,
                )
                my_list.append(five_second_warning)

        self.rounds = deque(my_list)
        self.start()

    def start(self):
        try:
            this_round = self.rounds.popleft()
            this_round.color_off()
            if this_round.is_blink:
                times_to_blink = this_round.seconds // 2
                this_round.color_on(times_to_blink)
            else:
                this_round.color_on()

            if self.job is not None:
                self.job.remove()

            trigger = IntervalTrigger(seconds=this_round.seconds)
            self.job = self.scheduler.add_job(
                self.start, trigger=trigger, max_instances=1, coalesce=True
            )
        except IndexError:
            print("You're done!")
            self.all_off()
            self.scheduler.remove_all_jobs()
            self.job = None

    def stop(self):
        self.all_off()
        self.scheduler.remove_all_jobs()
        self.job = None
        print("Goodbye!")

    def pause(self):
        if self.job is not None:
            self.job.pause()
            print("Paused")

    def resume(self):
        if self.job is not None:
            self.job.resume()
            print("Resumed")
