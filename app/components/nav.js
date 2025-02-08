import Link from "next/link";
export default function Nav() {
    return (
        // <div className="min-h-screen flex flex-col" style={{ position: "relative", zIndex: 2 }}>
            
            <div className="w-64 bg-gray-800 text-white p-4 h-[75vh]" id="sidebar">
                <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                <ul>
                    <li className="mb-4">
                        <Link href={"/"} className="hover:text-gray-300" >Home</Link>
                    </li>
                    <li className="mb-4">
                        <Link href={"/php"} className="hover:text-gray-300" >PHP</Link>
                    </li>
                    <li className="mb-4">
                        <Link href={"/laravel"} className="hover:text-gray-300" >LARAVEL</Link>
                    </li>
                    <li className="mb-4">
                        <Link href={"/wordpress"} className="hover:text-gray-300" >WORDPRESS</Link>
                    </li>
                    <li className="mb-4">
                        <Link href={"/react"} className="hover:text-gray-300" >REACT</Link>
                    </li>
                    <li className="mb-4">
                        <Link href={"/nextjs"} className="hover:text-gray-300" >NEXTJS</Link>
                    </li>
                </ul>
            </div>

            // <iframe src="https://ttyd.raquibi.space" className=" w-[205%] md:w-[339%] lg:w-[455%] h-[25vh]" frameBorder="0"></iframe>
        // </div>
    );
}