# Pin Hwa High School - Folder Scaffolding Script
# Run this script in PowerShell to create the full directory structure

$ErrorActionPreference = "Stop"
$rootPath = "c:\Users\anas7\Documents\CLICK-IX INTERN\pinhwa\src\app"

# Define the folder structure based on README.md
$folders = @(
    "(home)",
    "(home)/contact",
    "about",
    "about/badge",
    "about/history",
    "about/gallery",
    "about/director",
    "about/cert",
    "administrative",
    "administrative/principal",
    "administrative/academic",
    "administrative/discipline",
    "administrative/counseling",
    "administrative/curricular",
    "administrative/sports",
    "administrative/general",
    "administrative/dormitory",
    "leadership",
    "leadership/expansion",
    "leadership/honor",
    "leadership/video",
    "leadership/habits",
    "multimedia",
    "multimedia/news",
    "multimedia/ebook",
    "news",
    "events",
    "enrollment",
    "enrollment/ebook",
    "sop",
    "thanks"
)

# Create each folder with page.tsx
foreach ($folder in $folders) {
    $fullPath = Join-Path $rootPath $folder
    
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
    }
    
    # Create page.tsx for each folder
    $pagePath = Join-Path $fullPath "page.tsx"
    $pageTitle = ($folder -split '/')[-1] -replace '\(home\)', 'Home'
    $pageTitle = $pageTitle -replace '[_-]', ' '
    
    $content = "import { Metadata } from 'next'`n`nexport const metadata: Metadata = {`n  title: '$pageTitle | Pin Hwa High School',`n  description: 'Pin Hwa High School - A premier educational institution'`n}`n`nexport default function Page() {`n  return (`n    <main className='container mx-auto px-4 py-8'>`n      <h1 className='text-3xl font-bold text-[#003366]'>$pageTitle</h1>`n      <p className='mt-4 text-gray-600'>Page under construction</p>`n    </main>`n  )`n}`n"
    
    if (-not (Test-Path $pagePath)) {
        [System.IO.File]::WriteAllText($pagePath, $content, [System.Text.Encoding]::UTF8)
    }
}

# Create layout.tsx files for nested routes
$layoutFolders = @(
    "(home)",
    "about",
    "administrative",
    "leadership",
    "multimedia",
    "enrollment"
)

foreach ($folder in $layoutFolders) {
    $fullPath = Join-Path $rootPath $folder
    $layoutPath = Join-Path $fullPath "layout.tsx"
    
    $layoutContent = "import { ReactNode } from 'react'`n`nexport default function Layout({`n  children,`n}: {`n  children: ReactNode`n}) {`n  return (`n    <div className='min-h-screen bg-gray-50'>`n      {children}`n    </div>`n  )`n}`n"
    
    if (-not (Test-Path $layoutPath)) {
        [System.IO.File]::WriteAllText($layoutPath, $layoutContent, [System.Text.Encoding]::UTF8)
    }
}

# Create components directories
$componentDirs = @(
    "src/components/ui",
    "src/components/layout",
    "src/components/cards",
    "src/components/modals",
    "src/lib",
    "src/hooks",
    "public/images",
    "public/docs",
    "public/icons"
)

foreach ($dir in $componentDirs) {
    $fullPath = Join-Path "c:\Users\anas7\Documents\CLICK-IX INTERN\pinhwa" $dir
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
    }
}

Write-Host "Folder structure created successfully!"

