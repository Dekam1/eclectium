import axios from "axios";
import addCompetitions from "../store/actionsCreators/addCompetitions";
import addMyCompetitions from "../store/actionsCreators/addMyCompetitions";

export function axiosCustomers(loader) {
    return dispatch => {
        loader(true);
        axios.get('https://647b9749d2e5b6101db174ef.mockapi.io/competitions')
            .then(response => {
                dispatch(addCompetitions(response.data))
            }).catch(err => {
                alert('При загрузке произошла ошибка :(')
            })
        axios.get('https://647b9749d2e5b6101db174ef.mockapi.io/my-competitions')
            .then(response => {
                dispatch(addMyCompetitions(response.data))
                loader(false);
            }).catch(err => {
                alert('При загрузке произошла ошибка :(');
                loader(false);
            })
    }
}