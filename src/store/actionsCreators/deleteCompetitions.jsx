import ACTIONS from "../actions"

export default function deleteCompetitions(payload) {
    return {
        type: ACTIONS.DELETE_COMPETITIONS,
        payload
    }
}