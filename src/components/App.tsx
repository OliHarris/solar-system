import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";

import Article from "./Article";
import Planet from "./Planet";

const App = () => {
  const [wikiHeading, setWikiHeading] = useState<string>("");
  const [wikiArticle, setWikiArticle] = useState<string>("");
  const [wikiAnchor, setWikiAnchor] = useState<string>("");

  const wikiApiUrlRef = useRef<string>();
  const wikiUrlRef = useRef<string>();

  // one set of values for raw URLs
  const wikiRawString: string = "https://en.wikipedia.org/wiki/";
  const wikiApiRawString: string =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&origin=*&titles=";

  const updateDiagram = useCallback((article: string) => {
    wikiApiUrlRef.current = wikiApiRawString + article;
    wikiUrlRef.current = wikiRawString + article;

    // populate info from Wiki Api JSON file
    axios
      .get(wikiApiUrlRef.current)
      .then((response) => {
        const pageInfo = response.data.query.pages;
        Object.keys(pageInfo).forEach((key) => {
          const pageExtract = pageInfo[key];
          setWikiHeading(pageExtract.title);
          setWikiArticle(pageExtract.extract);
          if (wikiUrlRef.current) {
            setWikiAnchor(wikiUrlRef.current);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    updateDiagram("Solar_System");
  }, [updateDiagram]);

  const planets = [
    {
      id: "mercury",
      link: "Mercury_(planet)",
      title:
        "Mercury&#013;Size = 0.38 Earth Diameters&#013;Distance from Sun = 0.39 Astronomical Units",
      moons: 0,
    },
    {
      id: "venus",
      link: "Venus",
      title:
        "Venus&#013;Size = 0.95 Earth Diameters&#013;Distance from Sun = 0.723 Astronomical Units",
      moons: 0,
    },
    {
      id: "earth",
      link: "Earth",
      title:
        "Earth&#013;Size = 1 Earth Diameter&#013;Distance from Sun = 1 Astronomical Unit",
      moons: 1,
    },
    {
      id: "mars",
      link: "Mars",
      title:
        "Mars&#013;Size = 0.53 Earth Diameters&#013;Distance from Sun = 1.524 Astronomical Units",
      moons: 2,
    },
    {
      id: "jupiter",
      link: "Jupiter",
      title:
        "Jupiter&#013;Size = 11.19 Earth Diameters&#013;Distance from Sun = 5.203 Astronomical Units",
      moons: 0,
    },
    {
      id: "saturn",
      link: "Saturn",
      title:
        "Saturn&#013;Size = 9.40 Earth Diameters&#013;Distance from Sun = 9.539 Astronomical Units",
      moons: 0,
    },
    {
      id: "uranus",
      link: "Uranus",
      title:
        "Uranus&#013;Size = 4.04 Earth Diameters&#013;Distance from Sun = 19.18 Astronomical Units",
      moons: 0,
    },
    {
      id: "neptune",
      link: "Neptune",
      title:
        "Neptune&#013;Size = 3.88 Earth Diameters&#013;Distance from Sun = 30.06 Astronomical Units",
      moons: 0,
    },
  ];

  return (
    <main>
      <div id="main-background">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
      <Article
        wikiHeading={wikiHeading}
        wikiArticle={wikiArticle}
        wikiAnchor={wikiAnchor}
      />
      <section id="canvas">
        <div id="center-canvas">
          <div id="sun">
            {/* 174px diameter */}
            <button onClick={() => updateDiagram("Sun")}>
              Sun
              <span>10x smaller</span>
            </button>
          </div>
          <Planet details={planets[0]} updateDiagram={updateDiagram} />
          <Planet details={planets[1]} updateDiagram={updateDiagram} />
          <Planet details={planets[2]} updateDiagram={updateDiagram} />
          <Planet details={planets[3]} updateDiagram={updateDiagram} />
          <Planet details={planets[4]} updateDiagram={updateDiagram} />
          <Planet details={planets[5]} updateDiagram={updateDiagram} />
          <Planet details={planets[6]} updateDiagram={updateDiagram} />
          <Planet details={planets[7]} updateDiagram={updateDiagram} />
        </div>
      </section>
    </main>
  );
};

export default App;
