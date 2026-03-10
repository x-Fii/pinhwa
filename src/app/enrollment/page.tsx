import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EXTERNAL_LINKS } from "@/lib/constants";

export default function EnrollmentPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-[#003366] mb-8">新生注册 | New Student Registration</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">电子书 | E-book</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">2026 Student Enrollment Guide</p>
            <a 
              href={EXTERNAL_LINKS.ENROLLMENT_EBOOK.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-[#CC0000] hover:bg-[#990000] text-white font-medium rounded-md transition-colors"
            >
              View E-book
            </a>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-[#003366]">PDF档 | PDF File</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">2026 PinHwa Student Enrollment Form</p>
            <a 
              href="/docs/2026PinHwaStudentEnrollment3.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-[#003366] hover:bg-[#001a33] text-white font-medium rounded-md transition-colors"
            >
              Download PDF
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

