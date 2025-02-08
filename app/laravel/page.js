import Link from "next/link";
import Folders from "../components/folders";

export default function Home(){
    return(
        <div>
        <Link href={'/'}>test</Link>
        <Folders FoldersPath={'C:/xampp/htdocs/laravel'} />
        </div>
    );
}