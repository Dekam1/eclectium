import style from "./style.module.scss";

export default function Loader() {
    return (
        <div className={style.loader}>
            <p>Загрузка...</p>
        </div>
    )
}