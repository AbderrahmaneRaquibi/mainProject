import Link from "next/link";

export default function Nav() {
  return (
    <div className="w-64 h-[80vh] fixed  rounded-2xl border border-gray-700 bg-gray-900/90 shadow-lg shadow-blue-500/20 backdrop-blur-lg p-4 text-white transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-white/90">Dashboard</h2>
      <ul className="space-y-3">
        {[
          { name: "Home", path: "/" },
          { name: "PHP", path: "/php" },
          { name: "LARAVEL", path: "/laravel" },
          { name: "WORDPRESS", path: "/wordpress" },
          { name: "REACT", path: "/react" },
          { name: "NEXTJS", path: "/nextjs" },
        ].map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              className="block px-4 py-2 rounded-lg text-white/80 hover:bg-blue-500/20 hover:text-white transition-all duration-200"
            >
              {item.name}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/vscode">
            <button className="w-full mt-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20 flex justify-center items-center transition-all duration-200">
              VS CODE
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
