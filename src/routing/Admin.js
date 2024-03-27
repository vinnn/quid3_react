import { Outlet } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import NewCategoryForm from '../features/categories/NewCategoryForm';
import NewQandaForm from '../features/qandas/NewQandaForm';

export default function Admin() {


    return (
        <div>
            <AdminNavBar />

            <NewCategoryForm />
            <NewQandaForm />


            <Outlet/>
        </div>
    )
}