import { createContext, useReducer} from "react";
import { Bracket, IRoundProps } from 'react-brackets';



const rounds: IRoundProps[] = [
  {
    title: "Round one" as string,
    seeds: [
      {
        id: 1 as number,
        date: new Date().toDateString() as string,
        teams: [{ name: "Competitor A" }, { name: "Competitor B" }] as any,
      },
      {
        id: 2 as number,
        date: new Date().toDateString() as string,
        teams: [{ name: "Competitor C" }, { name: "Competitor D" }] as any,
      },
    ],
  },
  {
    title: "Round two" as string,
    seeds: [
      {
        id: 3 as number,
        date: new Date().toDateString() as string,
        teams: [{ name: "Competitor A" }, { name: "Competitor C" }] as any,
      },
    ],
  },
];

export const initialState = {
  isSettingDilagogOpen: false,
  rounds: rounds,
};

interface ModalRendererProps {
  title: string;
  children: React.ReactNode;
}

type ReducerType = {
  state: typeof initialState;
  dispatch: React.Dispatch<any>;
};

type ActionType = {
  type: string;
  payload?: any;
};

export const reducer = ( action: ActionType ,state: typeof initialState) : typeof initialState => {
  switch (action.type) {
    // Player One Score Actions
    case "PLAYER_ONE_ADD_SCORE_ONE":
      return {
        ...state,
      };
    // Settings
    case "OPEN_SETTINGS":
      return {
        ...state,
        isSettingDilagogOpen: (state.isSettingDilagogOpen = true),
      };
    case "CLOSE_SETTINGS":
      return {
        ...state,
        isSettingDilagogOpen: (state.isSettingDilagogOpen = false),
        //isMatchReset: (state.isMatchReset = true),
      };
    // Reset Actions
    case "RESET_STATE":
      return {
        ...initialState,
        isSettingDilagogOpen: false,
      }; // initialState;
    default:
      return state;
  }
};

export const BracketsContext = createContext<ReducerType | null>(null);

export const BracketsProvider = ({ children }: { children: React.ReactNode }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BracketsContext.Provider value={{ state, dispatch }}>
      {children}
    </BracketsContext.Provider>
  );
}

