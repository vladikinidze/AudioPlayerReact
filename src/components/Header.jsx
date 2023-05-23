import {FaBars} from "react-icons/fa";
import Button from "./UI/Button";
import SearchInput from "./UI/SearchInput";
import Reg from "./Reg";
import Auth from "./Auth";


function Header({openSidebar, searchOnInput, modal}) {
    return (
        <header
            className="bg-[#070707] flex justify-between items-center py-[10px] px-[13px] sm:px-[32px] sticky top-0 z-10">
            <div className="flex">
                <button className="mr-[8px] text-[#969696] p-1 -ml-1.5 inline-block sidebarHide:hidden"
                        onClick={() => openSidebar('-translate-x-full', 'translate-x-0')}>
                    <FaBars className="h-6 w-6"/>
                </button>
                <SearchInput className="hidden sidebarHide:flex" onInput={searchOnInput}/>
            </div>
            <div>
                <Button className="text-gray-400 hover:text-white hover:scale-105" onClick={() => modal.open(<Reg openModal={modal.open}/>)}>
                    Регистрация
                </Button>
                <Button primary className="hover:scale-105 bg-white" onClick={() => modal.open(<Auth openModal={modal.open}/>)}>
                    Вход
                </Button>
            </div>
        </header>
    );
}

export default Header;