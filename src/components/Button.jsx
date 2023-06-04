export default function Button({ text, activeButton, changeActiveButton }) {
    return (
        <button
            className={activeButton === text ? 'active' : ''}
            onClick={() => changeActiveButton(text)}
        >
            {text}
        </button>
    )
}