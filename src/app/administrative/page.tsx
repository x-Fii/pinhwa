import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdministrativePage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-[#003366] mb-8">行政组织 | Administrative Organization</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">校长室 | Principal's Office</CardTitle>
          </CardHeader>
          <CardContent>
            <p>School leadership and principal's program.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">教务处 | Academic Affairs</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Academic programs and curriculum management.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">训导处 | Disciplinary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Student discipline and welfare.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">辅导处 | Counseling</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Student counseling and guidance services.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">联课处 | Co-curricular</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Co-curricular activities and clubs.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">体育处 | Sports</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Sports programs and physical education.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">总务处 | General Affairs</CardTitle>
          </CardHeader>
          <CardContent>
            <p>General administration and logistics.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">舍务处 | Dormitory</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Student dormitory management.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

