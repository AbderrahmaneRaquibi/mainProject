"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function VSCODE({ projectPath: propProjectPath }) {
  const searchParams = useSearchParams();
  const projectPath = propProjectPath || searchParams.get("folder") || "/home/abdoraquibi/Desktop";
  const vscodeUrl = `https://vscode.raquibi.space/?folder=${encodeURIComponent(projectPath)}`;

  const [showIframe, setShowIframe] = useState(false);
  const toastShown = useRef(false); // ✅ Prevent multiple toast displays

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIframe(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!toastShown.current) { // ✅ Ensure toast appears only ONCE
      toast.custom(
        (t) => (
          <div className="flex items-center p-4 rounded-lg bg-gray-900/90 shadow-lg shadow-blue-500/20 border border-gray-700">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => window.open(vscodeUrl, "_blank")} // ✅ Open on click
            >
              <Image src="/openpro.png" alt="Open Project" width={30} height={30} className="mr-3" />
              <span className="text-white">Open in new tab</span>
            </div>
            <button
              className="ml-4 text-white font-bold"
              onClick={() => toast.dismiss(t.id)}
            >
              ✖
            </button>
          </div>
        ),
        { position: "top-right", duration: Infinity }
      );
      toastShown.current = true; // ✅ Mark toast as shown
    }
  }, []); // ✅ Only runs once when the component mounts

  return (
    <>
      {showIframe && (
        <iframe
          src={vscodeUrl}
          className="m-0 w-full h-full"
          loading="lazy"
          title="VSCODE"
        />
      )}
    </>
  );
}
