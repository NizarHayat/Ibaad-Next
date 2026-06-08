// app/page.tsx
import Navbar from "./components/Navbar/Navbar";

import PageHero from "./components/Hero";
import Footer from "./components/Footer";
// import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Navbar />
  {/* <PageHero eyebrow={"This is how it works"} heading={undefined} description={"Hello"} stats={[]} /> */}
  <PageHero/>
  <Footer />
      {/* <Services />  */}
    </>
  );
}