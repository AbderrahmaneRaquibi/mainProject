'use client';

import useAuthCheck from '/hooks/useAuthCheck';
import Folders from "../components/folders";

export default function Home(){
    const { user, loading } = useAuthCheck('/laravel'); 
    return(
        <div>
        <Folders FoldersPath={'/opt/lampp/htdocs/laravel'} />
        </div>
    );
}
