import classes from "./Switch.module.css"

function Switch({className, onChange, value}) {
    return (
        <input type="checkbox"
               checked={value}
               onChange={event => onChange(event.target.checked)}
               className={`${classes.input} ${className}`}/>
    );
}

export default Switch;