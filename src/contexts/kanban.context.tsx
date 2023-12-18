import { createContext, useContext } from 'react';
import { IKanban, initialData } from '../initial-data';
import { stateAction } from '../reducers/kanban.reducer';


export const StateContext = createContext<IKanban | null>(null);
export const StateDispatchContext = createContext<React.Dispatch<stateAction> | null>(null);


export const useStateContext = () => {
    const stateContext = useContext(StateContext);

    if (!stateContext) {
        throw new Error(
            "stateContext has to be used within <StateContext.Provider>"
        );
    }

    return stateContext;
};

export const useStateDispatchContext = () => {
    const stateDispatchContext = useContext(StateDispatchContext);

    if (!stateDispatchContext) {
        throw new Error(
            "stateDispatchContext has to be used within <StateDispatchContext.Provider>"
        );
    }

    return stateDispatchContext;
};