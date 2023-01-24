import {ValueType} from "../CounterWithoutLocalStorage";

type actionType = onClickSetHandlerACType | onClickStartHandlerACType |
    onClickResetHandlerACType

export const CounterReducer = (state:ValueType, action:actionType):ValueType => {
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
                ...state, startValue: state.maxEnteredValue
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