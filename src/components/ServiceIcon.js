import { Globe, Copyright, ShieldCheck, Plane, Scale, Building2, Factory, Ship, Home, Handshake } from "lucide-react";

const icons = { Globe, Copyright, ShieldCheck, Plane, Scale, Building2, Factory, Ship, Home, Handshake };

export default function ServiceIcon({ name, className = "h-9 w-9" }) {
  const Icon = icons[name] || Globe;
  return <Icon className={className} strokeWidth={1.5} />;
}
