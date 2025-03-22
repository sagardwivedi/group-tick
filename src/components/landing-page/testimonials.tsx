import Image from "next/image";

interface RootObject {
  title: string;
  description: string;
  items: Item[];
}

interface Item {
  text: string;
  author: Author;
}

interface Author {
  name: string;
  role: string;
  avatar: string;
}

export default function Testimonials({ data }: { data: RootObject }) {
  return (
    <section
      id="testimonials"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {data.title}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {data.description}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col space-y-4 rounded-lg border p-6 shadow-sm"
            >
              <p className="text-muted-foreground">{item.text}</p>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gray-100 p-1">
                  <Image
                    src={item.author.avatar}
                    width={40}
                    height={40}
                    alt="User Avatar"
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-medium">{item.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.author.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
