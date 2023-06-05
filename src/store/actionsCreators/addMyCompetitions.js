import ACTIONS from "../actions"

export default function addMyCompetitions(payload) {
    return {
        type: ACTIONS.ADD_MY_COMPETITIONS,
        payload
    }
}