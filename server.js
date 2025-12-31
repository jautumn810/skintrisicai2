const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 5500;
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Generate ETag based on file content hash and mtime
function generateETag(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const content = fs.readFileSync(filePath);
    const hash = crypto.createHash('md5').update(content).digest('hex').substring(0, 16);
    return `"${hash}-${stats.mtime.getTime()}"`;
  } catch {
    return `"${Date.now()}"`;
  }
}

const server = http.createServer((req, res) => {
  // Handle cache clear utility
  if (req.url === '/clear-cache.html' || req.url === '/clear-cache') {
    const clearCachePath = path.join(__dirname, 'clear-cache.html');
    if (fs.existsSync(clearCachePath)) {
      const content = fs.readFileSync(clearCachePath);
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content);
      return;
    }
  }
  
  let pathname = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  
  // Security: prevent directory traversal
  if (pathname.includes('..')) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Handle public assets - if path starts with /public/, serve from public folder
  // Otherwise, serve from root
  let filePath;
  if (pathname.startsWith('/public/')) {
    filePath = path.join(__dirname, pathname.slice(1)); // Remove leading /
  } else {
    filePath = path.join(__dirname, pathname.startsWith('/') ? pathname.slice(1) : pathname);
  }

  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const stats = fs.statSync(filePath);
      const etag = generateETag(filePath);
      const lastModified = stats.mtime.toUTCString();
      
      // FORCE NO CACHE for HTML, CSS, and JS files - NEVER return 304 for these
      const forceNoCache = ['.html', '.css', '.js'].includes(ext);
      
      // NEVER return 304 for HTML/CSS/JS - always serve fresh content
      // This ensures the browser always gets the latest version
      // Force fresh file read every time - no in-memory caching
      let content = fs.readFileSync(filePath);
      
      // For HTML files, inject a unique version hash and timestamp into the page
      if (ext === '.html') {
        const htmlString = content.toString();
        const timestamp = Date.now();
        const versionHash = timestamp.toString(36) + Math.random().toString(36).substring(7);
        
        // Update or add version meta tag
        let updatedHtml = htmlString;
        if (updatedHtml.includes('data-version=')) {
          updatedHtml = updatedHtml.replace(/data-version="[^"]*"/g, `data-version="${versionHash}"`);
          updatedHtml = updatedHtml.replace(/<meta name="version" content="[^"]*"/g, `<meta name="version" content="${versionHash}"`);
        } else {
          updatedHtml = updatedHtml.replace(
            /<meta charset="UTF-8">/,
            `<meta charset="UTF-8">\n  <meta name="version" content="${versionHash}" data-version="${versionHash}">`
          );
        }
        
        // Update or add timestamp to html tag
        if (updatedHtml.includes('data-timestamp=')) {
          updatedHtml = updatedHtml.replace(/data-timestamp="[^"]*"/g, `data-timestamp="${timestamp}"`);
        } else {
          updatedHtml = updatedHtml.replace(
            /<html[^>]*>/,
            `<html lang="en" data-timestamp="${timestamp}">`
          );
        }
        
        content = Buffer.from(updatedHtml);
      }
      
      // ULTRA-AGGRESSIVE no-cache headers - especially for HTML/CSS/JS
      const headers = {
        'Content-Type': contentType,
        'Cache-Control': forceNoCache 
          ? 'no-cache, no-store, must-revalidate, max-age=0, private' 
          : 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Content-Type-Options': 'nosniff'
      };
      
      // For HTML/CSS/JS, add extra headers to prevent ANY caching
      if (forceNoCache) {
        headers['Last-Modified'] = new Date().toUTCString();
        headers['ETag'] = `"${Date.now()}-${Math.random()}"`;
        headers['X-Timestamp'] = Date.now().toString();
        headers['X-Cache-Bust'] = Math.random().toString(36);
        // Prevent proxy caching
        headers['Vary'] = '*';
        // Set past date to ensure browser doesn't use stale content
        headers['Date'] = new Date().toUTCString();
      } else {
        headers['Last-Modified'] = lastModified;
        headers['ETag'] = etag;
        headers['Vary'] = 'Accept-Encoding';
      }
      
      res.writeHead(200, headers);
      res.end(content);
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  }
});

server.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please close the application using it.`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});

