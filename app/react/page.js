import Link from "next/link";
import Folders from "../components/folders";

export default function Home(){
    return(
        <div>
        <Folders FoldersPath={'/home/abdoraquibi/Desktop/ReactJS'} />
        </div>
    );
}