import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-[#003366] mb-8">关于滨华 | About PinHwa</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">认识滨华 | Meet PinHwa</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Learn about Pin Hwa High School's mission, vision, and values.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">校史 | School History</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Discover the rich history of Pin Hwa High School since its founding.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">校景 | School Scene</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Explore our beautiful campus facilities and learning environment.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">三机构 | Three Institutions</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Learn about our three core institutions and their roles.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

