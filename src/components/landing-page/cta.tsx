import Link from "next/link";
import { Button } from "@/components/ui/button";

interface RootObject {
  title: string;
  description: string;
  buttons: Button[];
}

interface Button {
  text: string;
  href: string;
  variant: string;
}

export default function CTA({ data }: { data: RootObject }) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {data.title}
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl">
              {data.description}
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            {data.buttons.map((button, index) => (
              <Button
                key={index}
                size="lg"
                variant={
                  button.variant as
                    | "link"
                    | "default"
                    | "destructive"
                    | "outline"
                    | "secondary"
                    | "ghost"
                }
                asChild
              >
                <Link href={button.href}>{button.text}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
