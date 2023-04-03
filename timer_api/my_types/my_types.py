from dataclasses import dataclass
from collections.abc import Callable

@dataclass
class HIIT:
    rounds: int
    rest: int
    train: int

    def __post_init__(self):
        if 1 <= self.rounds <= 15:
            pass
        else:
            raise ValueError("Rounds must be between 1 and 15")

        if 30 <= self.rest <= 60 * 2:
            pass
        else:
            raise ValueError("Rest must be between 30 and 120")

        if 1 <= self.train <= 60 * 4:
            pass
        else:
            raise ValueError("Train must be between 60 and 240")


@dataclass
class Timer_Dict:
    seconds: int
    color_on: Callable[None, None]
    color_off: Callable[None, None]
    current_round: int
