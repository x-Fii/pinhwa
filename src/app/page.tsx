import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/layout/SplitHero';
import RevealCard from '@/components/cards/RevealCard';
import AnnouncementCard from '@/components/cards/AnnouncementCard';
import MarketingPopup from '@/components/modals/MarketingPopup';
import SidebarHabits from '@/components/layout/SidebarHabits';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';

// ============================================
// 7 Habits Data for RevealCard Grid
// ============================================


const HABITS = [
  {
    id: 1,
    title: 'Be Proactive',
    subtitle: '主动积极',
    imageSrc: '/img/7habits/first.jpg',
    href: '/leadership/habits',
  },
  {
    id: 2,
    title: 'Begin with the End in Mind',
    subtitle: '以终为始',
    imageSrc: '/img/7habits/second.jpg',
    href: '/leadership/habits',
  },
  {
    id: 3,
    title: 'Put First Things First',
    subtitle: '要事第一',
    imageSrc: '/img/7habits/third.jpg',
    href: '/leadership/habits',
  },
  {
    id: 4,
    title: 'Think Win-Win',
    subtitle: '双赢思维',
    imageSrc: '/img/7habits/fourth.jpg',
    href: '/leadership/habits',
  },
  {
    id: 5,
    title: 'Seek First to Understand',
    subtitle: '知彼解己',
    imageSrc: '/img/7habits/fifth.jpg',
    href: '/leadership/habits',
  },
  {
    id: 6,
    title: 'Synergize',
    subtitle: '统合综效',
    imageSrc: '/img/7habits/sixth.jpg',
    href: '/leadership/habits',
  },
  {
    id: 7,
    title: 'Sharpen the Saw',
    subtitle: '不断更新',
    imageSrc: '/img/7habits/seventh.jpg',
    href: '/leadership/habits',
  },
];


// ============================================
// Latest News Data
// ============================================

const LATEST_NEWS = [
  {
    id: 1,
    date: '06-02-2026',
    title: '《情出于篮》滨华杯 3人篮球赛',
    href: '/upload/news/20260206162752.jpeg',
  },
  {
    id: 2,
    date: '28-01-2026',
    title: '2026年玻璃诗征稿活动',
    href: '/upload/news/20260128170055.pdf',
  },
  {
    id: 3,
    date: '08-01-2026',
    title: '2025年初中统考荣誉榜',
    href: '/upload/news/08012026-1.pdf',
  },
  {
    id: 4,
    date: '08-01-2026',
    title: '2025年高中统考荣誉榜',
    href: '/upload/news/09012026-2.pdf',
  },
  {
    id: 5,
    date: '03-01-2026',
    title: '2026课室平面图',
    href: '/upload/news/20260103221832.pdf',
  },
  {
    id: 6,
    date: '01-01-2026',
    title: '2026上半年行事历 / 2026 1st Half Administrative Calendar',
    href: '/upload/news/20260101161636.pdf',
  },
  {
    id: 7,
    date: '17-10-2025',
    title: '给家长与老师的一封信 / A Letter to Parents and Teachers',
    href: '/upload/news/20251017074351.pdf',
  },
  {
    id: 8,
    date: '08-10-2025',
    title: '滨华中学假冒订货声明 / Statement on Fraudulent Orders Made in the Name of Pin Hwa High School',
    href: '/upload/news/20251008141409.pdf',
  },
  {
    id: 9,
    date: '14-08-2025',
    title: '最新消息：改道期间雨天开放A门接送学生安排 / Latest Update: Opening of Gate A for Student Drop-off or Pick-up on Rainy Days During the Temporary Traffic Diversion Period',
    href: '/upload/news/20250815131859.pdf',
  },
  {
    id: 10,
    date: '29-07-2025',
    title: '2025年8月交通改道通告 / August 2025 Traffic Diversion Notice',
    href: '/upload/news/20250729161148.pdf',
  },
  {
    id: 11,
    date: '11-04-2025',
    title: '学费缴费系统迁移至 Pin Hwa Mobile App通告 / Migration to Pin Hwa Mobile App for Fee Payments Notice',
    href: '/upload/news/20250411124455.pdf',
  },
  {
    id: 12,
    date: '05-02-2025',
    title: '滨华云系统通告 / Notice on Pin Hwa Cloud System',
    href: '/upload/news/20250205121937.pdf',
  },
];

// ============================================
// Partner Links
// ============================================

const PARTNERS = [
  { name: '马来西亚台湾留学生', url: 'https://www.faatum.com.my/', logo: '/img/malaysiataiwan.png' },
  { name: 'Just English', url: 'https://www.justenglish.com/', logo: '/img/justenglishcenter.png' },
  { name: 'The Leader in Me', url: 'https://www.theleaderinme.org/', logo: '/img/LearderInMe.png' },
  { name: '董总', url: 'https://www.dongzong.my/', logo: '/img/dongzhong.png' },
  { name: '学校简介影片', url: '/schoolvideo.html', logo: '/img/banner-school.jpg' },
];

// ============================================
// Page Component
// ============================================

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />

      {/* Marketing Popup (Client Component) */}
      <MarketingPopup />

      {/* Parallax Hero Section */}
      <Hero />

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          {/* Sidebar - 7 Habits (25%) */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <SidebarHabits />
            </div>
          </aside>

          {/* Main Content Area (75%) */}
          <div className="w-full lg:w-3/4 space-y-8">
            {/* Latest News */}
            <Card className="shadow-md border-t-4 border-t-[#003366]">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold text-[#003366] flex items-center gap-2">
                  <Newspaper className="w-5 h-5" />
                  最新消息 Latest News
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {LATEST_NEWS.map((news) => (
                    <li key={news.id} className="flex items-start gap-3 group">
                      <span className="text-[#CC0000] font-medium text-sm whitespace-nowrap">
                        {news.date}
                      </span>
                      <a
                        href={news.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-700 hover:text-[#003366] hover:underline leading-tight"
                      >
                        {news.title}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <Link href="/news">
                    <Button variant="outline" className="text-[#003366] border-[#003366] hover:bg-[#003366] hover:text-white">
                      Read More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Announcement */}
            <AnnouncementCard />

            {/* 7 Habits Section with RevealCard Grid */}
            <section>
              <h2 className="text-2xl font-bold text-[#003366] mb-6 text-center">
                7 Habits of Highly Effective People
                <span className="block text-lg font-normal text-gray-600 mt-1">
                  高效能人士的七个习惯
                </span>
              </h2>
              
              {/* Responsive Grid: 1 col mobile, 2 cols tablet, 3-4 cols desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {HABITS.map((habit) => (
                  <RevealCard
                    key={habit.id}
                    title={habit.title}
                    subtitle={habit.subtitle}
                    imageSrc={habit.imageSrc}
                    href={habit.href}
                  />
                ))}
              </div>
              
              {/* View All Link */}
              <div className="mt-6 text-center">
                <Link href="/leadership/habits">
                  <Button variant="outline" className="text-[#003366] border-[#003366] hover:bg-[#003366] hover:text-white">
                    View All 7 Habits →
                  </Button>
                </Link>
              </div>
            </section>

            {/* Partner Links */}
            <Card className="shadow-md">
              <CardContent className="p-4">
                <div className="flex flex-wrap justify-center items-center gap-4">
                  {PARTNERS.map((partner, index) => (
                    <a
                      key={index}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform hover:scale-105 p-2 bg-white/10 backdrop-blur-sm rounded-lg"
                    >
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={120}
                        height={50}
                        className="h-auto object-contain"
                      />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#003366] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="https://smpinhwa.edu.my/img/logo-footer.png"
                  alt="Pin Hwa Footer Logo"
                  width={80}
                  height={80}
                  className="h-auto"
                />
                <div>
                  <h3 className="font-bold text-lg">滨华中学</h3>
                  <p className="text-sm text-gray-300">Pin Hwa High School Klang</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-300">NO.13, JALAN GOH HOCK HUAT,</span>
                </li>
                <li className="text-gray-300">41400 KLANG, SELANGOR D.E. MALAYSIA.</li>
                <li className="pt-2">
                  <strong>Telephone:</strong> +603 – 33426388, +603 – 33428398, +603 – 33446388
                </li>
                <li>
                  <strong>Telephone (Dorm):</strong> +603 – 33446289, +603 – 33441731
                </li>
                <li>
                  <strong>Fax:</strong> +603 – 33438128
                </li>
                <li>
                  <strong>Email:</strong> <a href="mailto:smpinhwa@gmail.com" className="hover:underline">smpinhwa@gmail.com</a>
                </li>
              </ul>
            </div>

            {/* Quick Links 1 */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://smpinhwa.edu.my/administrative/administrative.html" className="hover:underline">行政架构</a></li>
                <li><a href="https://smpinhwa.edu.my/knowingpinhwa/badge.html" className="hover:underline">认识滨华</a></li>
                <li><a href="https://smpinhwa.edu.my/administrative/principalprogram16-17.html" className="hover:underline">校长室</a></li>
                <li><a href="https://smpinhwa.edu.my/administrative/deanjobtask.html" className="hover:underline">教务处</a></li>
                <li><a href="https://smpinhwa.edu.my/administrative/disciplinaryoffice.html" className="hover:underline">训导处</a></li>
              </ul>
            </div>

            {/* Quick Links 2 */}
            <div>
              <h3 className="font-bold text-lg mb-4">&nbsp;</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://smpinhwa.edu.my/administrative/counselingjobtask.html" className="hover:underline">辅导处</a></li>
                <li><a href="https://smpinhwa.edu.my/administrative/sportsjobtask.html" className="hover:underline">体育处</a></li>
                <li><a href="https://smpinhwa.edu.my/administrative/curricularjobtask.html" className="hover:underline">联课处</a></li>
                <li><a href="https://smpinhwa.edu.my/administrative/generaljobtask.html" className="hover:underline">总务处</a></li>
                <li><a href="https://smpinhwa.edu.my/administrative/resourcecenter.html" className="hover:underline">资源馆</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className="bg-gray-800 text-white text-center py-4 text-sm">
        <p>Copyrights © 2018 滨华中学 Pin Hwa High School Klang. 保留所有权利. All Right Reserved.</p>
      </div>
    </div>
  );
}

