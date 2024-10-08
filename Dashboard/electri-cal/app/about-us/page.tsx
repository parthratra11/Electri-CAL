import React from "react";
import Header from "../components/About/Header";
import Intro from "../components/About/Intro";
import Team from "../components/About/Team";
import Footer from "../components/About/Footer";

const AboutUsPage = () => {
  return (
    <>
      <div className="py-5 pl-5 pr-5 h-screen overflow-hidden">
        <Header />
        <main className="flex flex-col justify-between lg:flex-row w-full h-full max-w-8xl mx-auto my-6 p-4">
          <Intro />
          <Team />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AboutUsPage;
