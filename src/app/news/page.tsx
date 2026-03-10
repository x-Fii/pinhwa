import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewsPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-[#003366] mb-8">活动报导 | Event Report</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">学校消息 | School News</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Latest updates and announcements from the school.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">校园报报看 | Campus Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Video reports from campus activities.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">感谢赞助 | Thanks for Sponsorship</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Thank you to our generous sponsors and partners.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">校园SOP | Campus SOP</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Standard operating procedures for campus activities.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

