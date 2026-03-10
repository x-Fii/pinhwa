const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const BASE_URL = 'https://smpinhwa.edu.my';
const OUTPUT_DIR = path.join(__dirname, 'public');

// Ensure directories exist
const dirs = [
  path.join(OUTPUT_DIR, 'img'),
  path.join(OUTPUT_DIR, 'img', '7habits'),
  path.join(OUTPUT_DIR, 'images'),
  path.join(OUTPUT_DIR, 'images', 'slides'),
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created: ${dir}`);
  }
});

// Helper function to download file
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    console.log(`Downloading: ${url}`);
    
    const file = fs.createWriteStream(filePath);
    
    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        console.log(`Redirecting to: ${redirectUrl}`);
        file.close();
        downloadFile(redirectUrl, filePath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(filePath, () => {});
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filePath}`);
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

// List of files to download
const assets = [
  // Main img folder
  { url: `${BASE_URL}/img/logo.png`, path: path.join(OUTPUT_DIR, 'img', 'logo.png') },
  { url: `${BASE_URL}/img/slogan.png`, path: path.join(OUTPUT_DIR, 'img', 'slogan.png') },
  { url: `${BASE_URL}/img/banner-school.jpg`, path: path.join(OUTPUT_DIR, 'img', 'banner-school.jpg') },
  { url: `${BASE_URL}/img/malaysiataiwan.png`, path: path.join(OUTPUT_DIR, 'img', 'malaysiataiwan.png') },
  { url: `${BASE_URL}/img/dongzhong.png`, path: path.join(OUTPUT_DIR, 'img', 'dongzhong.png') },
  { url: `${BASE_URL}/img/justenglishcenter.png`, path: path.join(OUTPUT_DIR, 'img', 'justenglishcenter.png') },
  { url: `${BASE_URL}/img/LearderInMe.png`, path: path.join(OUTPUT_DIR, 'img', 'LearderInMe.png') },
  
  // 7 Habits
  { url: `${BASE_URL}/img/first.jpg`, path: path.join(OUTPUT_DIR, 'img', 'first.jpg') },
  { url: `${BASE_URL}/img/second.jpg`, path: path.join(OUTPUT_DIR, 'img', 'second.jpg') },
  { url: `${BASE_URL}/img/third.jpg`, path: path.join(OUTPUT_DIR, 'img', 'third.jpg') },
  { url: `${BASE_URL}/img/fourth.jpg`, path: path.join(OUTPUT_DIR, 'img', 'fourth.jpg') },
  { url: `${BASE_URL}/img/fifth.jpg`, path: path.join(OUTPUT_DIR, 'img', 'fifth.jpg') },
  { url: `${BASE_URL}/img/sixth.jpg`, path: path.join(OUTPUT_DIR, 'img', 'sixth.jpg') },
  { url: `${BASE_URL}/img/seventh.jpg`, path: path.join(OUTPUT_DIR, 'img', 'seventh.jpg') },
  { url: `${BASE_URL}/img/7habits/habit-all.gif`, path: path.join(OUTPUT_DIR, 'img', '7habits', 'habit-all.gif') },
  
  // Slides
  { url: `${BASE_URL}/images/slides/slide3.jpg`, path: path.join(OUTPUT_DIR, 'images', 'slides', 'slide1.jpg') },
  { url: `${BASE_URL}/images/slides/slide4.jpg`, path: path.join(OUTPUT_DIR, 'images', 'slides', 'slide2.jpg') },
  
  // Marketing popup
  { url: `${BASE_URL}/images/marketing-popup.jpg`, path: path.join(OUTPUT_DIR, 'images', 'marketing-popup.jpg') },
];

// Download all files
async function downloadAll() {
  console.log('Starting download...\n');
  
  let success = 0;
  let failed = 0;
  
  for (const asset of assets) {
    try {
      await downloadFile(asset.url, asset.path);
      success++;
    } catch (err) {
      console.log(`FAILED: ${asset.url} - ${err.message}`);
      failed++;
    }
  }
  
  console.log(`\n=== Download Complete ===`);
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);
}

downloadAll();

