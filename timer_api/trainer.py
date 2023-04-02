from my_types import HIIT, Timer_Dict
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.triggers.cron import CronTrigger
from collections import deque


class Trainer:
    def __init__(self, scheduler: BackgroundScheduler):
        self.scheduler = scheduler
        self.scheduled = False
        self.job = None
        self.scheduler.start()

    def post_schedule(self, HIIT: HIIT):
        self.HIIT = HIIT

        my_list: list[Timer_Dict] = []
        for round in range(1, self.HIIT.rounds + 1):
            if round == 1:
                my_list.append(Timer_Dict(3, "yellow", round))

            seconds_in_round = Timer_Dict(self.HIIT.train - 10, "green", round)
            my_list.append(seconds_in_round)

            ten_seconds_to_rest = Timer_Dict(10, "yellow", round)
            my_list.append(ten_seconds_to_rest)

            if round != self.HIIT.rounds:
                seconds_in_rest = Timer_Dict(self.HIIT.rest - 5, "red", round)
                my_list.append(seconds_in_rest)

                five_second_warning = Timer_Dict(5, "yellow", round)
                my_list.append(five_second_warning)

        self.rounds = deque(my_list)

    def start(self):
        try:
            round = self.rounds.popleft()
            print(round.__dict__)

            if self.job is not None:
                self.job.remove()

            self.job = self.scheduler.add_job(
                self.start, "interval", seconds=round.seconds
            )

        except IndexError:
            print("You're done!")
            self.job.remove()
            self.scheduled = False
            self.job = None

    def stop(self):
        self.scheduler.shutdown()
        print("Goodbye!")

    def pause(self):
        if self.job is not None:
            self.job.pause()
            print("Paused")

    def resume(self):
        if self.job is not None:
            self.job.resume()
            print("Resumed")

