# 🍴 Pin Hwa High School - Front-End Project Specification

A modern, responsive front-end across all devices. Built with **Next.js (App Router)**, **Tailwind CSS**, and **TypeScript**.

---

## 📂 Page Structure (Routing Mapping)

PinHwaHighSchool/
├── 首页 [Home] (/index.php)
├── 关于滨华 [About PinHwa] (/knowingpinhwa/)
│   ├── 认识滨华 [Meet PinHwa] (/knowingpinhwa/badge.html)
│   ├── 校史 [School history] (/knowingpinhwa/history.html)
│   ├── 校景 [School scene] (/knowingpinhwa/photo.html)
│   ├── 三机构 [Three institutions] (/knowingpinhwa/director.html)
│   └── 五星品质标准证书 [Five-star cert] (/knowingpinhwa/cert.html)
├── 行政组织 [Administrative Organization] (/administrative/)
│   ├── 行政架构 [Administrative structure] (/administrative/administrative.html)
│   ├── 校长室 [Principal's office] (/administrative/principalprogram.html)
│   ├── 教务处 [Academic Affairs] (/administrative/deanchart.html)
│   ├── 训导处 [Disciplinary] (/administrative/disciplinaryjobtask.html)
│   ├── 辅导处 [Counseling] (/administrative/counselingjobtask.html)
│   ├── 联课处 [Co-curricular] (/administrative/curricularjobtask.html)
│   ├── 体育处 [Sports] (/administrative/sportsjobtask.html)
│   ├── 总务处 [General Affairs] (/administrative/generaljobtask.html)
│   ├── 资源馆 [Resource Library] (🔗 https://sites.google.com/view/pinhwalibrary)
│   └── 舍务处 [Dormitory] (/administrative/dormitoryintro.html)
├── 自我领导力 [Self-leadership] (/leadership/)
│   ├── 扩展历程 [Expansion journey] (/leadership/expansion.html)
│   ├── 荣誉榜 [Roll of Honor] (/leadership/hallofcurricular-out-2026-sport.php)
│   ├── 影片库 [Video library] (/leadership/video.html)
│   └── 七个习惯 [7 Habits] (/leadership/7habits.html)
├── 多媒体资讯 [Multimedia Info] (/multimedia/)
│   ├── 滨讯 [Pin News] (/multimedia/pinnews.html)
│   └── 电子书 [E-book] (🔗 https://smpinhwa.ebook.hyread.com.tw)
├── 联系本校 [Contact our school] (../contact.html)
├── 活动报导 [Event Report] (Root /)
│   ├── 学校消息 [School news] (/latest-news.php)
│   ├── 校园报报看 [Campus reports] (/schoolvideo.html)
│   ├── 校园新闻 [Campus News] (/activities.php)
│   ├── 感谢赞助 [Thanks for sponsorship] (/thanks.php)
│   └── 校园SOP [Campus SOP] (/sop.php)
├── 新生注册 [New Student Registration] (/upload/)
│   ├── 电子书 [E-book] (🔗 https://smpinhwa.edu.my/upload/ebook/newenrollment/2026/2026studentenrollment.html)
│   └── PDF档 [PDF file] (/upload/2026PinHwaStudentEnrollment3.pdf)
├── FPX 缴费 [FPX Payment] (🔗 https://app-smpinhwa.skribblelearn.com/#/login)
└── 招聘 [Recruitment] (🔗 https://smpinhwa.edu.my/upload/announcement/20260227162055.pdf)

---

## 🏗️ Tech Stack

| Component | Technology | Why? |
| --- | --- | --- |
| **Build Tool / Framework** | **Next.js 14+ (App Router)** | Built-in routing, Server-Side Rendering (SEO), and fast Turbopack compilation. |
| **Language** | **TypeScript** | Catch errors at compile-time and enforce strict data interfaces for school records. |
| **Styling** | **Tailwind CSS** | Utility-first CSS for rapid, consistent UI development without bloated stylesheets. |
| **UI Components** | **shadcn/ui** | Accessible, unstyled components built on Radix UI. Copy-paste approach avoids vendor lock-in. |
| **State Management** | **TanStack Query (React Query)** | Efficient server state caching, deduping multiple requests for news/events, and background fetching. |
| **Validation** | **Zod** | Schema validation with TypeScript support, critical for processing new student enrollment forms safely. |

---

## 📂 Project Structure

PinHwaHighSchool-Web/
├── public/                   # Static assets
│   ├── images/               # School photos, campus scenes
│   ├── docs/                 # 2026 Enrollment PDFs & Announcements
│   └── icons/                # School logo and favicons
├── src/
│   ├── app/                  # App Router (The Core)
│   │   ├── (home)/           # Group: Marketing pages
│   │   │   ├── page.tsx      # Home (index.php replacement)
│   │   │   └── contact/      # Contact Us page
│   │   ├── about/            # About PinHwa (knowingpinhwa/)
│   │   │   ├── badge/        # Meet PinHwa
│   │   │   ├── history/      # School History
│   │   │   └── gallery/      # School Scene
│   │   ├── admin/            # Administrative Organization
│   │   ├── enrollment/       # New Student Registration
│   │   ├── layout.tsx        # Global Layout (Navbar + Footer)
│   │   └── globals.css       # Tailwind & Global Styles
│   ├── components/           # React Components
│   │   ├── ui/               # shadcn/ui (Button, Nav, Accordion)
│   │   ├── layout/           # Shared Navigation & Sidebar
│   │   └── cards/            # News & Event Report Cards
│   ├── lib/                  # Logic & Utils
│   │   ├── constants.ts      # STORE EXTERNAL LINKS HERE (FPX, E-book)
│   │   └── utils.ts          # Tailwind Class Merger (cn)
├── tailwind.config.ts        # Design tokens (Brand Colors)
├── next.config.mjs           # Next.js Settings
└── package.json              # Dependencies

---

## 🛠️ Implementation Details

**Phase 1 — Core Architecture Setup**

1. Initialize Next.js project with App Router, TypeScript, and Tailwind CSS.
2. Install and configure `shadcn/ui` and initialize global CSS variables matching Pin Hwa High School's brand colors (Primary: Blue/Red depending on brand guidelines).
3. Build the `RootLayout` (`src/app/layout.tsx`) including a responsive Navigation Menu with dropdowns for the complex nested folder structure.

**Phase 2 — Route Generation & Static Pages**

1. Generate the folder structure inside `src/app/` matching the Page Structure tree.
2. Implement static content pages (`/knowingpinhwa`, `/administrative`) utilizing markdown rendering or static React components.
3. Configure `next/link` for all internal routing to ensure instant client-side navigation. Use standard `<a>` tags with `target="_blank"` for external links (FPX, E-book).

**Phase 3 — Dynamic Content & Forms**

1. Setup TanStack Query in a custom provider for fetching dynamic data (Event Reports, News).
2. Build the "Contact our school" and "New Student Registration" interfaces using `react-hook-form` integrated with `Zod` schemas for strict validation before submission.
3. Handle PDF rendering/download links directly from the `public/` directory.

---

## 🚀 Getting Started

1. **Clone the repository:**
`git clone <repository-url>`
2. **Install dependencies:**
`npm install`
3. **Set up environment variables:**
Copy `.env.example` to `.env` and fill in necessary API keys (if headless CMS is used later).
4. **Run the development server:**
`npm run dev`
5. **Open your browser:**
Navigate to `http://localhost:3000` to view the application.

---

## 💡 Key Features

* **Optimized Routing:** Nested layouts and file-based routing handle the school's deep administrative hierarchy smoothly.
* **Accessible Navigation:** Mega-menu style navigation utilizing Radix UI primitives for keyboard accessibility and screen-reader support.
* **Responsive Media:** Fully responsive photo galleries and video libraries optimized using `next/image` to prevent layout shift and reduce load times.
* **Type-Safe Data:** Form submissions (enrollment, contact) are strictly validated client-side and server-side using Zod.

---

## 📝 Available Scripts

* `npm run dev`: Starts the Next.js development server with Fast Refresh.
* `npm run build`: Creates an optimized production build.
* `npm run start`: Starts a Node.js server serving the production build.
* `npm run lint`: Runs ESLint to catch syntax and style errors.
* `npm run typecheck`: Runs the TypeScript compiler to check for type errors without emitting files.

---

## 📄 License

Proprietary Software. All rights reserved by Pin Hwa High School.