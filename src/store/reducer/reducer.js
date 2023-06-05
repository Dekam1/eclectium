import initialState from "../initialState";
import ACTIONS from "../actions";

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.ADD_COMPETITIONS:
            return {
                ...state,
                competitions: action.payload
            }

        case ACTIONS.ADD_MY_COMPETITIONS:
            return {
                ...state,
                myCompetitions: action.payload
            }

        case ACTIONS.ADD_TY_MY_COMPETITIONS:
            return {
                ...state,
                myCompetitions: [
                    ...state.myCompetitions,
                    action.payload
                ]
            }

        case ACTIONS.DELETE_COMPETITIONS:
            return {
                ...state,
                myCompetitions: [
                    ...state.myCompetitions.filter(competition => {
                        return competition.parentId !== action.payload
                    })
                ]
            }

        default:
            return state
    }
}