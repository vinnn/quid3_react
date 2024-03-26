import { Outlet } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
// import FormNewCategory from './FormNewCategory';
// import FormNewQanda from './FormNewQanda';
// import FormNewGame from './FormNewGame';
import NewCategoryForm from '../../features/categories/NewCategoryForm';
import NewQandaForm from '../../features/qandas/NewQandaForm';

export default function Admin() {


    return (
        <div>
            <AdminNavBar />

            <NewCategoryForm />
            <NewQandaForm />
            {/* <FormNewCategory /> */}
            {/* <FormNewQanda />             */}
            {/* <FormNewGame />    */}

            <Outlet/>
        </div>
    )
}