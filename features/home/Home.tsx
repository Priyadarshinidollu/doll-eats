"use client";
import About from "../about/About";
import Contact from "../contact/Contact";
import Hero from "../hero/Hero";
import Menu from "../menu/Menu";
import Offers from "../offers/Offers";

const Home = () => {
  return (
    <div id="home" className="">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Hero />
      </div>
      <Menu />
      <Offers />
      <About />
      <Contact />
    </div>
  );
};

export default Home;
