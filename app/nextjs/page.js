'use client';

import useAuthCheck from '/hooks/useAuthCheck';
import Folders from "../components/folders";

export default function Home(){
        const { user, loading } = useAuthCheck('/nextjs'); 
    return(
        <div>
        <Folders FoldersPath={'/home/abdoraquibi/Desktop/NextJS'} />
        <Folders FoldersPath={'/home/abdoraquibi/Desktop/main'} />
        </div>
    );
}