function Button({children: text, primary, className, onClick}) {
    const classes = primary
        ? "hover:bg-gray-100 text-[#2e2e2e] text-xs"
        : "text-white text-xs";

    return (
        <button className={`font-semibold leading-5 tracking-widest uppercase py-[9px] px-[17px] sm:px-[23px] rounded-full ${classes} ${className}`}
                onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;