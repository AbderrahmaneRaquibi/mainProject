import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Use an absolute path to your folder.
  // Either use forward slashes:
  const dirPath = 'C:/Users/Kival/Desktop/foldertest';
  // Or use escaped backslashes:
  // const dirPath = 'C:\\Users\\Kival\\Desktop\\foldertest';

  try {
    const files = fs.readdirSync(dirPath);
    const folders = files.filter((file) => {
      const filePath = path.join(dirPath, file);
      return fs.statSync(filePath).isDirectory();
    });
    res.status(200).json(folders);
  } catch (error) {
    console.error('Error reading directory:', error);
    res.status(500).json({ error: 'Error reading directory' });
  }
}
