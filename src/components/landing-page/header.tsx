import { Button } from "@/components/ui/button";
import { CheckCircle, Menu } from "lucide-react";
import Link from "next/link";

interface RootObject {
    logo: Logo;
    navLinks: NavLink[];
    authLinks: NavLink[];
}

interface NavLink {
    href: string;
    text: string;
}

interface Logo {
    icon: string;
    text: string;
}

export default function Header({ data }: { data: RootObject }) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <span>{data.logo.text}</span>
                </div>
                <nav className="hidden md:flex gap-6">
                    {data.navLinks.map((link, index) => (
                        <Link key={index} href={link.href} className="text-sm font-medium hover:text-primary">
                            {link.text}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <Link href={data.authLinks[0].href} className="hidden md:block text-sm font-medium hover:text-primary">
                        {data.authLinks[0].text}
                    </Link>
                    <Button asChild>
                        <Link href={data.authLinks[1].href}>{data.authLinks[1].text}</Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}