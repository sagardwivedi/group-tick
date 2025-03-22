import Link from "next/link";
import { CheckCircle } from "lucide-react";

interface RootObject {
  logo: Logo;
  links: Link[];
}

interface Link {
  href: string;
  text: string;
}

interface Logo {
  icon: string;
  text: string;
}

export default function Footer({ data }: { data: RootObject }) {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2 font-bold">
          <CheckCircle className="h-6 w-6 text-primary" />
          <span>{data.logo.text}</span>
        </div>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} TaskCollab. All rights reserved.
        </p>
        <div className="flex gap-4">
          {data.links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
