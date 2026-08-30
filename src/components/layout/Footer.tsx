import { Link } from "react-router-dom";
import { MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { toPersianDigits } from "@/utils/format";
import Logo from "./Logo";
import InstagramIcon from "@/components/ui/InstagramIcon";

const footerLinks = [
  { to: "/about", label: "درباره ما" },
  { to: "/contact", label: "تماس با ما" },
  { to: "/shop", label: "فروشگاه" },
  { to: "/terms", label: "قوانین و مقررات" },
  { to: "/shipping", label: "شرایط ارسال" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-7 text-ink-soft">
            {siteConfig.brand.fullName} با تمرکز بر کیفیت ساخت و طراحی ماندگار، مبلمانی می‌سازد
            که سال‌ها همراه خانه شما بماند.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {[
              { href: siteConfig.social.instagram, Icon: InstagramIcon, label: "اینستاگرام" },
              { href: siteConfig.social.whatsapp, Icon: MessageCircle, label: "واتساپ" },
              { href: siteConfig.social.rubika, Icon: Send, label: "روبیکا" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink-soft transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">لینک‌های سریع</h4>
          <ul className="mt-4 flex flex-col gap-3">
            {footerLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-ink-soft hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">اطلاعات تماس</h4>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-soft">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-ink-faint" strokeWidth={1.75} />
              <span dir="ltr" className="tnum">
                {toPersianDigits(siteConfig.contact.mobile)}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" strokeWidth={1.75} />
              <a
                href={siteConfig.contact.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                {siteConfig.contact.address}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5">
        <p className="container-page text-center text-xs text-ink-faint">
          © {toPersianDigits(1404)} {siteConfig.brand.fullName}. تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}
