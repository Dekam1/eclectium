import ACTIONS from "../actions"

export default function addCompetitions(payload) {
    return {
        type: ACTIONS.ADD_COMPETITIONS,
        payload
    }
}