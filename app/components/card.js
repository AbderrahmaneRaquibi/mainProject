"use client";
import { GitFork } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CheckCircle, ExternalLink, Loader2 } from "lucide-react";


const Card = ({ title, subtitle, FoldersPath, folder, projectPath, setSelectedProject }) => {
  const router = useRouter();

  const showToast = (message, icon) => {
    toast.custom((t) => (
      <div className={`flex items-center p-4 rounded-lg bg-gray-900/90 shadow-lg shadow-blue-500/20 border border-gray-700 transition-all duration-300 
        ${t.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
        {icon}
        <span className="text-white ml-3">{message}</span>
      </div>
    ), { position: "top-right", duration: 3000 });
  };

  const handleProjectClick = () => {
    showToast(`Opening ${title} on VSCode...`, <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />);
    setSelectedProject?.(projectPath);
    // 🔹 Delay navigation to make sure the state is updated
    setTimeout(() => {
      router.push(`/vscode?folder=${encodeURIComponent(projectPath)}`);
    }, 4000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(subtitle);
    showToast("Copied to clipboard!", <CheckCircle className="w-5 h-5 text-emerald-400" />);

  };

  const handleLinkClick = (e) => {
    e.preventDefault(); // Prevent the default link behavior

    // Show the toast
    showToast(`Redirecting...`, <ExternalLink className="w-5 h-5 text-green-400" />);


    // Delay the navigation by 2 seconds (2000 milliseconds)
    setTimeout(() => {
      window.open(
        `https://projects.raquibi.space/${FoldersPath.split('/').pop()}/${folder}`,
        "_blank"
      );
    }, 1000);
  };

  return (
    <div key={folder} className="w-fit min-w-0 transition-all duration-300 hover:animate-card-hover">
      <div className="bg-card rounded-lg border border-card-border p-4 shadow-lg hover:bg-card-hover transition-colors duration-200">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
              <GitFork className="w-4 h-4 text-text-primary" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-text-primary font-medium leading-none">{title}</h3>
              <div className="relative group w-fit">
                <p
                  className="text-text-secondary text-sm mt-3 truncate max-w-[200px] cursor-pointer"
                  onClick={() => copyToClipboard("Copied to clipboard!")}
                >
                  {subtitle}
                  {/* alt text */}
                  <span className="absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap bg-blue-500 text-white font-bold text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {subtitle}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
  {/* Open Project Link */}
  <div className="relative group flex items-center">
    <a
      href={`https://projects.raquibi.space/${FoldersPath.split('/').pop()}/${folder}`}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full transition-colors"
      onClick={handleLinkClick} // Trigger the toast on link click
    >
<Image
  src="/openpro.png"
  alt="Open Project"
  width={24}
  height={24}
  className="w-6 h-6"
/>

    </a>
    <span className="absolute left-1/2 bottom-full -translate-x-1/2 whitespace-nowrap bg-blue-500 text-white font-bold text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
      Open Project
    </span>
  </div>

  {/* Button to Open in VSCode */}
  <div className="relative group flex items-center">
    <button onClick={handleProjectClick} className="text-blue-500 underline text-center">
    <Image
  src="/code.png"
  alt="Open in VSCode"
  width={24}
  height={24}
  className="w-6 h-6"
/>

    </button>
    <span className="absolute left-1/2 bottom-full -translate-x-1/2 whitespace-nowrap bg-blue-500 text-white font-bold text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
      Open in VSCode
    </span>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default Card;
