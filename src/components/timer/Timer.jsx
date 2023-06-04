import React from "react";
import style from "./style.module.scss";

export default function Timer({ start }) {
    const [timerDays, setTimerDays] = React.useState('00');
    const [timerHours, setTimerHours] = React.useState('00');
    const [timerMinutes, setTimerMinutes] = React.useState('00');

    let interval = React.useRef();

    const startTimer = () => {
        const countDownDate = new Date(start).getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            if (distance < 0) {
                clearInterval(interval.current);
            } else {
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
            }
        }, 1000)
    };

    React.useEffect(() => {
        startTimer();
        const clear = interval.current;
        return () => {
            clearInterval(clear);
        }
    })

    return (
        <div>
            <span className={style.competitions__span}>
                <b>{timerDays}</b>
                <span>Days</span>
            </span>
            <span className={style.competitions__span}>
                <b>{timerHours}</b>
                <span>Hours</span>
            </span>
            <span className={style.competitions__span}>
                <b>{timerMinutes}</b>
                <span>Minutes</span>
            </span>
        </div>
    )
}