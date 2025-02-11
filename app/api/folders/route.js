// app/api/folders/route.js or pages/api/folders.js

import fs from 'fs';
import path from 'path';

export async function GET(request) {
  const url = new URL(request.url);
  const FoldersPath = url.searchParams.get('folderPath'); // Get folder path from query params

  if (!FoldersPath) {
    return new Response('Folder path is required', { status: 400 });
  }

  try {
    const folderNames = fs.readdirSync(FoldersPath)
      .filter(item => fs.statSync(path.join(FoldersPath, item)).isDirectory());
    
    return new Response(JSON.stringify({ folderNames }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response('Error reading folder path', { status: 500 });
  }
}
