import React, { ReactNode, useContext } from "react";
import ToolBar from './ToolBar';
import Logo from "../../assets/Logo.asset";
import { AppContext } from '../Layout';
import { Link } from "react-router-dom";
import NavbarRight from "./NavbarRight";


function NbLeft(props: {children: ReactNode}){
    return(
        <div className="flex gap-4 justify-start items-center">
            {props.children}
        </div>
    )
}

function NbCompDrop(props: {
    icon: React.FC<{className: string}>,
    children: ReactNode,
    active: boolean,
    onClick: () => void;
}){
    const activeClass = props.active ? "bg-blue-500 rounded-lg" : "bg-primary";

    return(
        <button className={`flex flex-wrap items-center ${activeClass} hover:bg-blue-500 hover:rounded-lg active:bg-secondary px-2 py-2 mx-1`} onClick={props.onClick}>
                <props.icon className="w-6 h-6"/>
                <div>{props.children}</div>
                {/*<Arrow/>*/}
        </button>
    )
}

function NbTitle(props: {children: ReactNode}){
    return(
        <div className="flex justify-center grow">
            <div className="text-white flex gap-2 items-center font-bold text-xl px-1">
                {props.children}
            </div>
        </div>
    )
}

function Navbar() {
    const { mode, page, setPage } = useContext(AppContext)

    return (
        <div className="bg-primary text-white p-2 grid grid-cols-3">
            <NbLeft>
                <Link to="/" onClick={() => setPage('menu')}><Logo/></Link>
                {page === 'creation' && mode === 'edit' && <ToolBar />}
            </NbLeft>
            <NbTitle>
                {mode === 'view' && <div>Preview of </div>}
                {page === 'creation' && (
                <>
                  <div>Untitled-1</div>
                </>
                )}
                {page === 'menu' && <div>My maps</div>}
            </NbTitle>
            <NavbarRight />
        </div>
    )
}

export { Navbar, NbLeft, NbCompDrop, NbTitle }
