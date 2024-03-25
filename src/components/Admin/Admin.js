import { Outlet } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import FormNewCategory from './FormNewCategory';
// import FormNewQanda from './FormNewQanda';
// import FormNewGame from './FormNewGame';

export default function Admin() {


    return (
        <div>
            <AdminNavBar />

            <FormNewCategory />
            {/* <FormNewQanda />             */}
            {/* <FormNewGame />    */}

            <Outlet/>
        </div>
    )
}