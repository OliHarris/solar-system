import { useState, useRef, useEffect, useCallback, MouseEvent } from "react";
import axios from "axios";
import parse from "html-react-parser";

interface ArticleInterface {
  wikiHeading: string;
  wikiArticle: string;
  wikiAnchor: string;
}
const Article = ({
  wikiHeading,
  wikiArticle,
  wikiAnchor,
}: ArticleInterface) => {
  const handlePauseAnimation = (event: MouseEvent<HTMLButtonElement>) => {
    document
      .querySelectorAll(
        ".planet-orbit, .planet-orbit li, #saturn .rings-position"
      )
      .forEach((item: Element) => {
        item.classList.toggle("paused");
      });

    const target = event.target as Element;
    // switch-on
    if (target.classList.contains("activated")) {
      target.classList.remove("activated");
      target.innerHTML = "Pause animation";
    } else {
      // switch-off
      target.classList.add("activated");
      target.innerHTML = "Play animation";
    }
  };

  const handleHideAnimation = (event: MouseEvent<HTMLButtonElement>) => {
    const centerCanvas = document.querySelector("#center-canvas") as Element;
    centerCanvas.classList.toggle("hide");

    const wikiParent = document.querySelector("#wikipedia-article") as Element;

    const target = event.target as Element;
    // switch-on
    if (target.classList.contains("activated")) {
      target.classList.remove("activated");
      target.innerHTML = "Hide animation";
      wikiParent.classList.remove("bright-text");
    } else {
      // switch-off
      target.classList.add("activated");
      target.innerHTML = "Show animation";
      wikiParent.classList.add("bright-text");
    }
  };

  return (
    // 1008px max-width
    <div className="row">
      <div className="small-12 columns">
        <section id="wikipedia-article">
          <h1>{wikiHeading}</h1>
          <div id="article">{parse(wikiArticle)}</div>
          <a href={wikiAnchor} target="_blank" rel="noreferrer">
            Read more on Wikipedia
          </a>
          <div id="dashboard" className="cf">
            <span>Sizes accurate: moons, distances and speed need work</span>
            <button id="pause" onClick={(e) => handlePauseAnimation(e)}>
              Pause animation
            </button>
            <button id="hide" onClick={(e) => handleHideAnimation(e)}>
              Hide animation
            </button>
          </div>
          <div className="background"></div>
        </section>
      </div>
    </div>
  );
};

interface PlanetInterface {
  details: {
    id: string;
    link: string;
    title: string;
    moons: number;
  };
  updateDiagram: (event: string) => void;
}
const Planet = ({ details, updateDiagram }: PlanetInterface) => {
  return (
    <div id={details.id} className="planet-orbit">
      <div className="position">
        {details.moons > 0 && (
          <ul className="moon-orbit">
            {[...Array(details.moons)].map((_item, index) => {
              return <li key={index} className={`moon-${index + 1}`}></li>;
            })}
          </ul>
        )}
        <button
          onClick={() => updateDiagram(details.link)}
          title={details.title}
        ></button>
      </div>
    </div>
  );
};

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
