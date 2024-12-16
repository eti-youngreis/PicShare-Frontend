import { Outlet } from "react-router-dom";
import NavBar from "../sections/nav-bar/NavBar";
import SideBar from '../sections/side-bar/SideBar'
export default function Layout() {
    return <>
        <header><NavBar /></header>
        {/* <main><SideBar /></main> */}
        <main><Outlet/></main>
        <footer></footer>
    </>
}