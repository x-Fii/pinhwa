export default function ContactPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-[#003366] mb-8">联系本校 | Contact Our School</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-[#003366] mb-4">Contact Information</h2>
          <p className="text-lg">Pin Hwa High School</p>
          <p className="text-lg">Jalan Samudra Utara, Taman Samudra</p>
          <p className="text-lg">34000 Taiping, Perak, Malaysia</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-[#003366] mb-4">Get in Touch</h2>
          <p className="text-lg">Phone: +605-808 6572</p>
          <p className="text-lg">Fax: +605-808 6573</p>
          <p className="text-lg">Email: smpinhwa@edu.my</p>
        </div>
      </div>
    </div>
  );
}

