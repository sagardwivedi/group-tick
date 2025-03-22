import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RootObject {
  title: string;
  description: string;
  buttons: Button[];
  image: Image;
}

interface Image {
  src: string;
  alt: string;
}

interface Button {
  href: string;
  text: string;
  icon?: string;
}

export default function Hero({ data }: { data: RootObject }) {
  return (
    <section className="py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {data.title}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {data.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href={data.buttons[0].href}>{data.buttons[0].text}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={data.buttons[1].href}>
                  {data.buttons[1].text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <Image
            src={data.image.src}
            width={550}
            height={550}
            alt={data.image.alt}
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
          />
        </div>
      </div>
    </section>
  );
}
