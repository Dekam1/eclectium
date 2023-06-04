import React from "react";
import style from "./style.module.scss";
import Timer from "../timer/Timer";
import Participant from "../participant/Participant";

export default function CompetitionsCard({
    id,
    text,
    start,
    price,
    members,
    addedToMyCompetitions,
    addCompetition
}) {

    const { title, subtitle } = text;

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