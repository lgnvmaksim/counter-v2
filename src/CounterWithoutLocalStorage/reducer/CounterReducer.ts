import {ValueType} from "../CounterWithoutLocalStorage";

type actionType = onClickSetHandlerACType | onClickStartHandlerACType |
    onClickResetHandlerACType | onChangeHandlerACType

const initialState: ValueType = {
    minValue: 1,
    maxValue: 5,
    minEnteredValue: 0,
    maxEnteredValue: 0,
    startValue: null,
    step: 1,
}
export const CounterReducer = (state:ValueType=initialState, action:actionType):ValueType => {
    switch (action.type) {
        case "ON-CLICK-SET-HANDLER":{
            return {
                ...state,
                minEnteredValue: state.minValue,
                maxEnteredValue: state.maxValue,
                startValue: state.minValue,
            }
        }
        case "ON-CLICK-START-HANDLER":{
            return {
                ...state, startValue: state.startValue as number + state.step
            }
        }
        case "ON-CLICK-RESET-HANDLER":{
            return {
                ...state, startValue: state.minEnteredValue
            }
        }
        case "ON-CHANGE-HANDLER":{
            return {
                ...state, [action.payload.name]: action.payload.value
               , startValue:null
            }
        }
        default: return state
    }
};

type onClickSetHandlerACType = ReturnType<typeof onClickSetHandlerAC>
export const onClickSetHandlerAC = () => {
    return {
        type: 'ON-CLICK-SET-HANDLER'
    }as const
}

type onClickStartHandlerACType = ReturnType<typeof onClickStartHandlerAC>
export const onClickStartHandlerAC = () => {
    return {
        type: 'ON-CLICK-START-HANDLER'
    } as const
}

type onClickResetHandlerACType = ReturnType<typeof onClickResetHandlerAC>
export const onClickResetHandlerAC = () => {
    return {
        type: 'ON-CLICK-RESET-HANDLER'
    } as const
}

type onChangeHandlerACType = ReturnType<typeof onChangeHandlerAC>
export const onChangeHandlerAC = (name: string, value: number) => {
    return {
        type: 'ON-CHANGE-HANDLER',
        payload:{name, value}
    } as const
}