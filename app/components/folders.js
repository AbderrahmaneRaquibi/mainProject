"use client";

import { useState, useEffect } from "react";
import Card from "./card";
import toast from "react-hot-toast";
import { SyncLoader } from "react-spinners";

export default function Folders({ FoldersPath }) {
  const [folderNames, setFolderNames] = useState([]);
  const sessionKey = `prevFolders_${FoldersPath}`; // Unique key for each page

  const showToast = (message, icon) => {
    toast.custom(
      (t) => (
        <div
          className={`flex items-center p-4 rounded-lg bg-gray-900/90 shadow-lg shadow-blue-500/20 border border-gray-700 transition-all duration-300 
          ${t.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
          {icon}
          <span className="text-white ml-3">{message}</span>
        </div>
      ),
      { position: "top-right", duration: 2000 }
    );
  };

  useEffect(() => {
    async function fetchFolders() {
      try {
        const response = await fetch(`/api/folders?folderPath=${FoldersPath}`);
        const data = await response.json();
        const newFolderList = data.folderNames || [];

        // Retrieve previously stored folders for this page
        const prevFolders = JSON.parse(sessionStorage.getItem(sessionKey)) || [];

        // Detect newly added folders
        const addedFolders = newFolderList.filter((folder) => !prevFolders.includes(folder));

        if (addedFolders.length > 0) {
          showToast(
            `New Projects added: ${addedFolders.join(", ")}`,
            <SyncLoader size={8} color="#3b82f6" />
          );
        }

        // Update state & store new list in sessionStorage (per page)
        setFolderNames(newFolderList);
        sessionStorage.setItem(sessionKey, JSON.stringify(newFolderList));
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    }

    if (FoldersPath) {
      fetchFolders();
      const interval = setInterval(fetchFolders, 5000);
      return () => clearInterval(interval);
    }
  }, [FoldersPath]); // Run when the folder path changes (new page or folder list update)

  return (
    <div>
      <h1>Projects</h1>

      {folderNames.length === 0 ? (
        <p>No project</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 grid-flow-row-dense p-4">
          {folderNames.map((folder) => {
            const projectPath = `${FoldersPath}/${folder}`;
            return (
              <Card
                key={folder}
                title={folder}
                subtitle={projectPath}
                FoldersPath={FoldersPath}
                folder={folder}
                projectPath={projectPath}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
