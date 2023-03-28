import React from "react";
import "../../App.css";
import Cards from "../Cards";
import Header from "../Header";
//import HelloSection from "../HelloSection";
import Footer from "../Footer";

function Home() {
  return (
    <>
      <Header />
      {/*<HelloSection />*/}
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
