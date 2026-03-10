const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const cmd = `curl -L "${url}" -o "${dest}"`;
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.log(`Failed: ${url}`);
        reject(error);
        return;
      }
      console.log(`Downloaded: ${dest}`);
      resolve();
    });
  });
};

const run = async () => {
  // Create directories
  const dirs = ['public/img', 'public/img/7habits', 'public/images/slides'];
  dirs.forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });

  const assets = [
    ['https://smpinhwa.edu.my/img/logo.png', 'public/img/logo.png'],
    ['https://smpinhwa.edu.my/img/slogan.png', 'public/img/slogan.png'],
    ['https://smpinhwa.edu.my/img/banner-school.jpg', 'public/img/banner-school.jpg'],
    ['https://smpinhwa.edu.my/img/malaysiataiwan.png', 'public/img/malaysiataiwan.png'],
    ['https://smpinhwa.edu.my/img/dongzhong.png', 'public/img/dongzhong.png'],
    ['https://smpinhwa.edu.my/img/justenglishcenter.png', 'public/img/justenglishcenter.png'],
    ['https://smpinhwa.edu.my/img/LearderInMe.png', 'public/img/LearderInMe.png'],
    ['https://smpinhwa.edu.my/img/first.jpg', 'public/img/first.jpg'],
    ['https://smpinhwa.edu.my/img/second.jpg', 'public/img/second.jpg'],
    ['https://smpinhwa.edu.my/img/third.jpg', 'public/img/third.jpg'],
    ['https://smpinhwa.edu.my/img/fourth.jpg', 'public/img/fourth.jpg'],
    ['https://smpinhwa.edu.my/img/fifth.jpg', 'public/img/fifth.jpg'],
    ['https://smpinhwa.edu.my/img/sixth.jpg', 'public/img/sixth.jpg'],
    ['https://smpinhwa.edu.my/img/seventh.jpg', 'public/img/seventh.jpg'],
    ['https://smpinhwa.edu.my/images/slides/slide3.jpg', 'public/images/slides/slide1.jpg'],
    ['https://smpinhwa.edu.my/images/slides/slide4.jpg', 'public/images/slides/slide2.jpg'],
  ];

  for (const [url, dest] of assets) {
    try {
      await download(url, dest);
    } catch (e) {
      console.log(`Error downloading ${url}: ${e.message}`);
    }
  }
  console.log('Done!');
};

run();
</parameter>
</create_file>
