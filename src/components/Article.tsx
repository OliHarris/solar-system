import { MouseEvent } from "react";
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
export default Article;
