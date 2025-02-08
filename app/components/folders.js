import fs from 'fs';
import path from 'path';

function getFolderNames(dirPath) {
  return fs.readdirSync(dirPath)
    .filter(item => fs.statSync(path.join(dirPath, item)).isDirectory());
}

// Component to display folders
export default function Folders({ FoldersPath }) {
  // Ensure FoldersPath is used correctly as a string
  const folderNames = getFolderNames(FoldersPath); // No need for {} here
  console.log(folderNames);

  return (
    <div>
      <h1>Projects</h1>
      <div className='grid grid-cols-3 gap-4'>
        {folderNames.map((folder) => (
                  <div key={folder} className='w-64 h-64 bg-gray-200 rounded-lg p-4 text-black flex items-center justify-center '>
                    <h2 className='text-center '>{folder}</h2>
                  </div>
                ))}
      </div>
    </div>
  );
}
