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
export default Planet;
