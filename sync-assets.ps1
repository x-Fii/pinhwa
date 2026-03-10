# 1. Create the directories safely
New-Item -ItemType Directory -Force -Path "public/img/7habits", "public/images/slides"

# 2. Define the assets to download
$baseUrl = "https://smpinhwa.edu.my/img"
$assets = @(
    "logo.png", "slogan.png", "banner-school.jpg", 
    "malaysiataiwan.png", "dongzhong.png", "justenglishcenter.png",
    "LearderInMe.png"
)

# 3. Download main assets
foreach ($file in $assets) {
    $dest = "public/img/$file"
    Write-Host "Downloading $file..." -ForegroundColor Cyan
    try {
        Invoke-WebRequest -Uri "$baseUrl/$file" -OutFile $dest -ErrorAction Stop
    } catch {
        Write-Host "Failed to download $file. It might not exist at that path." -ForegroundColor Yellow
    }
}

# 4. Download 7 habits images
$habits = @("first.jpg", "second.jpg", "third.jpg", "fourth.jpg", "fifth.jpg", "sixth.jpg", "seventh.jpg")
foreach ($file in $habits) {
    $dest = "public/img/$file"
    Write-Host "Downloading 7habits $file..." -ForegroundColor Cyan
    try {
        Invoke-WebRequest -Uri "$baseUrl/$file" -OutFile $dest -ErrorAction Stop
    } catch {
        Write-Host "Failed to download $file." -ForegroundColor Yellow
    }
}

# 5. Download slides
$slides = @("slide3.jpg", "slide4.jpg")
$slideNames = @("slide1.jpg", "slide2.jpg")
for ($i = 0; $i -lt $slides.Length; $i++) {
    $dest = "public/images/slides/$($slideNames[$i])"
    Write-Host "Downloading $($slides[$i])..." -ForegroundColor Cyan
    try {
        Invoke-WebRequest -Uri "https://smpinhwa.edu.my/images/slides/$($slides[$i])" -OutFile $dest -ErrorAction Stop
    } catch {
        Write-Host "Failed to download $($slides[$i])." -ForegroundColor Yellow
    }
}

Write-Host "Sync Complete! Check your public/img folder." -ForegroundColor Green
</parameter>
</create_file>
