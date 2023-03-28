import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
  return (
    <div className="cards">
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/ellip-NGC-4621-Messier-59.jpg"
              text="This luminous orb is the galaxy NGC 4621, better known as Messier 59. As this latter moniker indicates, the galaxy is listed in the famous catalog of deep-sky objects compiled by French comet-hunter Charles Messier in the 18th century. "
              label="Elliptical"
              path="https://www.nasa.gov/image-feature/goddard/2019/hubble-sees-a-galaxy-bucking-the-trend"
            />
            <CardItem
              src="images/UGC-6093.jpg"
              text="This image, captured by the NASA/ESA Hubble Space Telescope’s Wide Field Camera 3 (WFC3), shows a galaxy named UGC 6093. As can be easily seen, UGC 6093 is something known as a barred spiral galaxy — it has beautiful arms that swirl outwards from a bar slicing through the galaxy’s center. "
              label="Spiral"
              path="https://www.nasa.gov/image-feature/goddard/2018/hubbles-barred-and-booming-spiral-galaxyhttps://www.nasa.gov/image-feature/goddard/2018/hubbles-barred-and-booming-spiral-galaxy"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/hubble_ngc3226_27_acs_1_v2_cont4_final_3filters.jpg"
              text="This NASA Hubble Space Telescope image finds the large spiral galaxy, NGC 3227, wrapped in a turbulent gravitational dance with its companion, the elliptical galaxy NGC 3226. "
              label="News"
              path="https://www.nasa.gov/image-feature/goddard/2022/hubble-captures-a-galactic-dance"
              //path="/services"
            />
            <CardItem
              src="images/develop-massive-Ellip.jpg"
              text="This graphic shows the evolutionary sequence in the growth of massive elliptical galaxies over 13 billion years, as gleaned from space-based and ground-based telescopic observations. The growth of this class of galaxies is quickly driven by rapid star formation and mergers with other galaxies."
              label="News"
              path="https://www.nasa.gov/jpl/spitzer/galaxies-20140129"
              //path="/products"
            />
            <CardItem
              src="images/hubble_stsci-01g2qq6vynngwmfa90bhq9eavb.jpg"
              text="This collection of 36 images from NASA's Hubble Space Telescope features galaxies that are all hosts to both Cepheid variables and supernovae. These two celestial phenomena are both crucial tools used by astronomers to determine astronomical distance, and have been used to refine our measurement of the Hubble constant, the expansion rate of the universe."
              label="News"
              path="https://www.nasa.gov/feature/goddard/2022/hubble-reaches-new-milestone-in-mystery-of-universes-expansion-rate"
              //path="/sign-up"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
