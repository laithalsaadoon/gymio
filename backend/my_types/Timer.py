from pydantic import BaseModel
from collections.abc import Callable


class Timer(BaseModel):
    """Docstring for Timer.
    seconds: int
    is_blink: bool
    color_on: Callable[[None], None]
    color_off: Callable[[None], None]
    current_round: int
    """

    seconds: int
    is_blink: bool
    color_on: Callable[[None], None]
    color_off: Callable[[None], None]
    current_round: int
