import { createContext, useReducer, useContext } from "react";

const StoreStateContext = createContext();
const StoreDispatchContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

const initState = {
  latLong: "",
  coffeeStores: [],
};

function storeReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG:
      return { ...state, latLong: action.payload.latLong };
    case ACTION_TYPES.SET_COFFEE_STORES:
      return { ...state, coffeeStores: action.payload.coffeeStores };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initState);
  return (
    <StoreStateContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreStateContext.Provider>
  );
};

export default StoreProvider;

export function useStoreState() {
  const context = useContext(StoreStateContext);
  if (!context) {
    throw new Error("Cannot find StoreProvider");
  }

  return context;
}

export function useStoreDispatch() {
  const context = useContext(StoreDispatchContext);
  if (!context) {
    throw new Error("Cannot find StoreProvider");
  }

  return context;
}
