import { applyMiddleware } from "redux";

import { createStore } from "react-hooks-global-state";

const defaultLocalState = {
    filters: [],
    workoutSetupModal: false,
    rounds: { "label": "3", "value": 3 },
    roundsVal: 3,
    roundLengthVal: 60,
    restLengthVal: 30,
    roundLength: { "label": "60 seconds", "value": 60 },
    restLength: { "label": "30 seconds", "value": 30 },
    workout: 'weights',
};

const LOCAL_STORAGE_KEY = "gymio-state";

const parseState = (str) => {
    try {
        const state = JSON.parse(str || '');
        // if (typeof state.count !== 'number') throw new Error();
        // if (typeof state.person.age !== 'number') throw new Error();
        // if (typeof state.person.firstName !== 'string') throw new Error();
        // if (typeof state.person.lastName !== 'string') throw new Error();
        return state;
    } catch (e) {
        return null;
    }
};
const stateFromStorage = parseState(localStorage.getItem(LOCAL_STORAGE_KEY));
const initialState = stateFromStorage || defaultLocalState;
initialState.workoutSetupModal = false;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setWorkout':
            return { ...state, workout: action.workout };
        case 'setRestLength':
            return {
                ...state,
                restLength: action.restLength
            };
        case 'setRestLengthVal':
            return {
                ...state,
                restLengthVal: action.restLengthVal
            };
        case 'setRoundLength':
            return {
                ...state,
                roundLength: action.roundLength
            };
        case 'setRoundLengthVal':
            return {
                ...state,
                roundLengthVal: action.roundLengthVal
            };
        case 'setWorkoutSetupModal':
            return {
                ...state,
                workoutSetupModal: action.payload
            };
        case 'increment': return {
            ...state,
            count: state.count + 1,
        };
        case 'decrement': return {
            ...state,
            count: state.count - 1,
        };
        case 'setFirstName': return {
            ...state,
            person: {
                ...state.person,
                firstName: action.firstName,
            },
        };
        case 'setLastName': return {
            ...state,
            person: {
                ...state.person,
                lastName: action.lastName,
            },
        };
        case 'setAge': return {
            ...state,
            person: {
                ...state.person,
                age: action.age,
            },
        };
        case 'setFilters': return {
            ...state,
            filters: action.filters,
        };
        case 'setRounds': return {
            ...state,
            rounds: action.rounds,
        };
        case 'setRoundsVal': return {
            ...state,
            roundsVal: action.roundsVal,
        };
        default: return state;
    }
};

const saveStateToStorage = (
    { getState }
) => (next) => (action) => {
    const returnValue = next(action);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(getState()));
    return returnValue;
};

export const { dispatch, useStoreState } = createStore(
    reducer,
    initialState,
    applyMiddleware(saveStateToStorage),
);