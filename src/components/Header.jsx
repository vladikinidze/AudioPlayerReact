import {FaBars} from "react-icons/fa";
import Button from "./UI/Button";
import SearchInput from "./UI/SearchInput";


function Header({openSidebar, searchOnInput}) {

    function clickHandler() {
        openSidebar('-translate-x-full', 'translate-x-0')
    }

    return (
        <header
            className="bg-[#070707] flex justify-between items-center py-[10px] px-[13px] sm:px-[32px] sticky top-0 z-10">
            <div className="flex">
                <button className="mr-[8px] text-[#969696] p-1 -ml-1.5 inline-block sidebarHide:hidden"
                        onClick={clickHandler}>
                    <FaBars className="h-6 w-6"/>
                </button>
                <SearchInput className="hidden sidebarHide:flex" onInput={searchOnInput}/>
                {/*<a href="/" className="mr-[8px] text-[#969696] p-1 cursor-not-allowed">*/}
                {/*    <ChevronLeftIcon className="h-6 w-6"/>*/}
                {/*</a>*/}
                {/*<a href="/" className="ml-[8px] text-[#969696] p-1 cursor-not-allowed">*/}
                {/*    <ChevronRightIcon className="h-6 w-6"/>*/}
                {/*</a>*/}
            </div>
            <div>
                <Button className="text-gray-400 hover:text-white">
                    Регистрация
                </Button>
                <Button primary>
                    Вход
                </Button>
            </div>
        </header>
    );
}

export default Header;