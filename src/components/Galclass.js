import React, { useState } from "react";
import GalaxyCard from "./galclass/GalaxyCard";
import SeleCard from "./galclass/SeleCard";
import "./Galclass.css";

const images = [
  "/images/ellip-NGC-4621-Messier-59.jpg",
  "/images/UGC-6093.jpg",
  "/images/irregular-NGC-2337.jpg",
];

const Galclasspage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  return (
    <div className="galclass-container">
      <div className="galclass-left">
        <button onClick={prevImage} className="galclass-left__prev"></button>
        <button onClick={nextImage} className="galclass-left__next"></button>
        <GalaxyCard imageUrl={images[currentImageIndex]} />
      </div>
      <div className="galclass-right">
        <SeleCard />
      </div>
    </div>
  );
};

export default Galclasspage;
