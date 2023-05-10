function Title({title}) {
    return (
        <h3 className="mt-4 mb-1 font-semibold tracking-wide whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none">
            {title}
        </h3>
    );
}

export default Title;