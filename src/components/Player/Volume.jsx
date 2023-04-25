import Range from "../UI/Range/Range"

function Volume({setVolume}) {

    function onChangeHandle(e) {
        setVolume(e);
    }

    return (
        <div className="grow">
            <Range />
            {/*<Range onChange={e => onChangeHandle(e)}*/}
            {/*       thumbSize={9}*/}
            {/*       height={5}*/}
            {/*       width="100%"*/}
            {/*       thumbColor={{*/}
            {/*           r: 28,*/}
            {/*           g: 185,*/}
            {/*           b: 85,*/}
            {/*           a: 1,*/}
            {/*       }}*/}
            {/*       fillColor={{*/}
            {/*           r: 179,*/}
            {/*           g: 179,*/}
            {/*           b: 179,*/}
            {/*           a: 1,*/}
            {/*       }}*/}
            {/*       trackColor={{*/}
            {/*           r: 56,*/}
            {/*           g: 56,*/}
            {/*           b: 56,*/}
            {/*           a: 1,*/}
            {/*       }}*/}
            {/*/>*/}
        </div>
    );
}

export default Volume;