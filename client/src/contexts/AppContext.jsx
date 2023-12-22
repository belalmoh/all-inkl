import { createContext, useReducer } from "react";

const AppContext = createContext();

const AppActions = {
    CONNECT: 'CONNECT',
    DISCONNECT: 'DISCONNECT',

    SET_QUERY: 'SET_QUERY',
    SUBMIT_QUERY: 'SUBMIT_QUERY',

    SET_X_AXIS: 'SET_X_AXIS',
    SET_Y_AXIS: 'SET_Y_AXIS',

    SET_DATA: 'SET_DATA'
};


const AppContextReducer = (state, action) => {

    const {type, payload} = action;

    switch (type) {
        case AppActions.CONNECT:
            return {...state, isConnected: true};

        case AppActions.SET_QUERY:
            const {query} = payload;
            return {...state, query};

        case AppActions.DISCONNECT:
            return {...state, isConnected: false};

        case AppActions.SET_X_AXIS:
            const {xAxis} = payload;
            return {...state, xAxis};

        case AppActions.SET_Y_AXIS:
            const {yAxis} = payload;
            return {...state, yAxis};

        case AppActions.SET_DATA:
            const {databaseResults} = payload;
            return {...state, databaseResults}
        default:
            return state;
    }
}


const initialState = {
    isConnected: false,
    query: null,
    xAxis: 0,
    yAxis: 0,
    databaseResults: []
}

const AppContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppContextReducer, initialState);

    const value = {state, dispatch};

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, AppContextProvider, AppActions};