import { IconName, icons } from "@/lib/icons";

interface RootObject {
  title: string;
  description: string;
  items: Item[];
}

interface Item {
  icon: IconName;
  title: string;
  description: string;
}

export default function Features({ data }: { data: RootObject }) {
  return (
    <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-muted">
      <div className="container px-6 md:px-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {data.title}
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl">
            {data.description}
          </p>
        </div>
        <div className="grid gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.items.map((item, index) => {
            const IconComponent = icons[item.icon];
            return (
              <div
                key={index}
                className="flex flex-col items-center space-y-4 rounded-xl border p-6 shadow-sm"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-center">
                  {item.title}
                </h3>
                <p className="text-center text-muted-foreground text-sm md:text-base">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
