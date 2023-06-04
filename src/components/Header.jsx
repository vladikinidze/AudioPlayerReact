import {FaBars} from "react-icons/fa";
import Button from "./UI/Button";
import SearchInput from "./UI/SearchInput";
import Reg from "./Reg";
import Auth from "./Auth";
import {useDispatch, useSelector} from "react-redux";
import DropDown from "./DropDown";
import {CLEAR_USER} from "../actions/userActions";
import {useNavigate} from "react-router-dom";
import {VscAccount, VscSettingsGear} from "react-icons/vsc";
import {IoMdExit} from "react-icons/io";

function Header({openSidebar, searchOnInput, modal}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dropDownMenu = [
        {
            text: "Аккаунт",
            action: () => {
                navigate("/account")
            },
            icon: <VscAccount className="h-5 w-5 mr-4" />
        },
        {
            text: "Настройки",
            action: () => {
                navigate("/settings")
            },
            icon: <VscSettingsGear className="h-5 w-5 mr-4" />
        },
        {
            text: "Выход",
            action: () => {
                localStorage.removeItem("auth");
                sessionStorage.removeItem("auth");
                dispatch({type: CLEAR_USER});
            },
            icon: <IoMdExit className="h-6 w-6 -ml-0.5 mr-4" />
        },
    ];
    const user = useSelector(state => state.user)

    return (
        <header
            className="bg-[#070707] flex justify-between items-center py-[10px] px-[13px] sm:px-[32px] sticky top-0 z-10">
            <div className="flex">
                <button className="mr-[8px] text-[#969696] p-1 -ml-1.5 inline-block sidebarHide:hidden"
                        onClick={() => openSidebar('-translate-x-full', 'translate-x-0')}>
                    <FaBars className="h-6 w-6"/>
                </button>
                <SearchInput className="hidden sidebarHide:flex"
                             onInput={searchOnInput}/>
            </div>
            <div>
                {user.guid
                    ? <DropDown text={user.username}
                                image={user.image}
                                items={dropDownMenu}
                                classname="w-[240px]"/>
                    :
                    <>
                        <Button className="text-gray-400 hover:text-white hover:scale-105"
                                onClick={() => modal.open(
                                    <Reg openModal={modal.open}
                                         onClose={modal.close}/>
                                )}>
                            Регистрация
                        </Button>
                        <Button primary className="hover:scale-105 bg-white"
                                onClick={() => modal.open(
                                    <Auth
                                        openModal={modal.open}
                                        onClose={modal.close}/>
                                )}>
                            Вход
                        </Button>
                    </>

                }
            </div>
        </header>
    );
}

export default Header;