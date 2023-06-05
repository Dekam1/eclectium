import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import CompetitionsCard from "../components/competitions-card/CompetitionsCard";
import Loader from "../components/loader/Loader";
import { useSelector } from "react-redux";

export default function Main({ loaded, addedToMyCompetitions }) {
    const competitions = useSelector(state => state.competitions);
    const userCompetitions = useSelector(state => state.myCompetitions);
    const buttonsText = ['Current competitions', 'My competitions', 'Archive'];
    const [activeButton, setActiveButton] = React.useState(buttonsText[0]);

    function changeActiveButton(current) {
        setActiveButton(current);
    }

    function changedCurrent() {
        switch (activeButton) {
            case buttonsText[0]:
                return competitions.length
                    ? competitions
                    : null

            case buttonsText[1]:
                return userCompetitions.length
                    ? userCompetitions
                    : null
            default:
                return null;
        }
    }

    console.log(competitions)

    return (
        loaded
            ? <Loader />
            : <div className="container">
                <div className="options">
                    <div className="options__right">
                        <div className="options__links">
                            <NavLink to='/eclectium'>
                                <h1>Competitions</h1>
                            </NavLink>
                            <NavLink to='/ratings'>
                                <h2>Rating</h2>
                            </NavLink>
                        </div>
                        <div className="options__buttons">
                            {buttonsText.map(button => (
                                <Button
                                    key={button}
                                    text={button}
                                    activeButton={activeButton}
                                    changeActiveButton={changeActiveButton}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <main className="main">
                    <ul className="competitions">
                        {changedCurrent() ? changedCurrent().map(competition => (
                            <CompetitionsCard
                                key={competition.id}
                                addedToMyCompetitions={addedToMyCompetitions(competition.id)}
                                {...competition}
                            />
                        )) : <li className="competitions_nothing-found">Ничего не найдено</li>}
                    </ul>
                </main>
            </div>
    )
}