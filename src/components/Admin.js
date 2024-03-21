import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import Qandas from './Qandas';
import Categories from './Categories';
import Games from './Games';

export default function Admin() {




    return (
        <div>
            <AdminNavBar />
            <Outlet/>
        </div>
    )
}