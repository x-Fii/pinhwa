import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LeadershipPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-[#003366] mb-8">自我领导力 | Self-Leadership</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">扩展历程 | Expansion Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Our journey of growth and leadership development.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">荣誉榜 | Roll of Honor</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Our students' achievements and accolades.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">影片库 | Video Library</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Educational videos and resources.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">七个习惯 | 7 Habits</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The 7 Habits of Highly Effective People program.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

