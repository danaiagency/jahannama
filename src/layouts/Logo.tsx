import { logoImage } from "@/data/images";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return <img src={logoImage(dark)} alt="جهان‌نما" className="h-8 w-auto" />;
}
