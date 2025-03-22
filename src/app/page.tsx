import data from "@/app/data.json";
import {
  CTA,
  Features,
  Footer,
  Header,
  Hero,
  HowItWorks,
  Testimonials,
} from "@/components/landing-page";

export const experimental_ppr = true;

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header data={data.header} />
      <main className="flex-1">
        <Hero data={data.hero} />
        <Features data={data.features} />
        <HowItWorks data={data.howItWorks} />
        <Testimonials data={data.testimonials} />
        <CTA data={data.cta} />
      </main>
      <Footer data={data.footer} />
    </div>
  );
}
