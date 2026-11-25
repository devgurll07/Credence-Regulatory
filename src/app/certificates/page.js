import CertificateGallery from "../../components/CertificateGallery";
import { certificates } from "../../data/certificates";

export const metadata = {
  title: "Certificates & Licences | Credence Regulatory",
  description: "Certificates and licences we have helped our clients obtain: LMPC, FSSAI, E-Waste, BIS Hallmark and more.",
};

export default function CertificatesPage() {
  return (
    <main>
      <CertificateGallery
        items={certificates}
        eyebrow="Credence Regulatory"
        title="Our Certificates & Licences"
        subtitle="A few of the certificates and licences we have helped our clients obtain."
      />
    </main>
  );
}