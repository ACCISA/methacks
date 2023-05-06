import { Outlet } from "react-router-dom";
import Header from './Header';
import HeaderIndex from "./HeaderIndex";

export default function Layout(){
    return (
        <main>
        <HeaderIndex />
        <Header className="relative" />
        <Outlet />
      </main>
    );
}
