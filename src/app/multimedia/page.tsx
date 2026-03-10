import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MultimediaPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-[#003366] mb-8">多媒体资讯 | Multimedia Info</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">滨讯 | Pin News</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Latest news and updates from Pin Hwa.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">电子书 | E-book</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access our digital library collection.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

