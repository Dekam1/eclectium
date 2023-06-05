import React from "react";
import style from "./style.module.scss";
import Timer from "../timer/Timer";
import Participant from "../participant/Participant";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import addTyMyCompetitions from "../../store/actionsCreators/addTyMyCompetitions";
import deleteCompetitions from "../../store/actionsCreators/deleteCompetitions";

export default function CompetitionsCard({
    id,
    text,
    start,
    price,
    members,
    addedToMyCompetitions,
}) {

    const userCompetitions = useSelector(state => state.myCompetitions);
    const dispatch = useDispatch();
    const { title, subtitle } = text;

    async function addCompetition(obj) {
        const findItem = userCompetitions.find(competition => competition.parentId === obj.id);

        try {
            if (findItem) {
                axios.delete(`https://647b9749d2e5b6101db174ef.mockapi.io/my-competitions/${findItem.id}`);
                dispatch(deleteCompetitions(obj.parentId));
            } else {
                dispatch(addTyMyCompetitions(obj))
                const { data } = await axios.post('https://647b9749d2e5b6101db174ef.mockapi.io/my-competitions', obj);
            }
        } catch (error) {
            alert('При запросе возникла ошибка :(')
        }
    }

    return (
        <li className={style.competitions__list}>
            <article>
                <div className={style.competitions__left}>
                    <h2>{title}</h2>
                    <p>Starts At {start.replace(':00', '')} (Moscow time)</p>
                </div>
                <div className={style.competitions__middle}>
                    <p>{subtitle}</p>
                    <div>
                        <span>Price: {price} $</span>
                        <span>{members} participants enrolled</span>
                    </div>
                </div>
                {addedToMyCompetitions
                    ? <Participant />
                    : <div className={style.competitions__right}>
                        <h2>Registration ends in:</h2>
                        <Timer
                            start={start}
                        />
                        <button
                            className={style.competitions__button}
                            onClick={() => addCompetition({
                                id,
                                parentId: id,
                                text,
                                start,
                                price,
                                members
                            })}
                        >
                            Participate
                        </button>
                    </div>}

            </article>
        </li>
    )
}