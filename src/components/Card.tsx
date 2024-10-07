import React, { ReactNode, useMemo, useRef, useState } from "react";
import TinderCard, { Direction } from "react-tinder-card";

const db = [
  {
    name: "Richard Hendricks",
    url: "./img/richard.jpg",
  },
  {
    name: "Erlich Bachman",
    url: "./img/erlich.jpg",
  },
  {
    name: "Monica Hall",
    url: "./img/monica.jpg",
  },
  {
    name: "Jared Dunn",
    url: "./img/jared.jpg",
  },
  {
    name: "Dinesh Chugtai",
    url: "./img/dinesh.jpg",
  },
];

function Card() {
  const [lastDirection, setLastDirection] = useState<Direction>();

  const swiped = (direction: Direction, name: string) => {
    console.log(`${name}がスワイプされました`);
    setLastDirection(direction);
  };

  const outOfFrame = (name: string) => {
    console.log(`${name}が外に出ました`);
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <h1>React Tinder Card</h1>
      <div className="cardContainer">
        {db.map((data) => (
          <TinderCard
            className="swipe"
            key={data.name}
            onSwipe={(dir) => swiped(dir, data.name)}
            onCardLeftScreen={() => outOfFrame(data.name)}
          >
            <div
              style={{ backgroundImage: "url(" + data.url + ")" }}
              className="card"
            >
              <h3>{data.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      {lastDirection ? (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="infoText" />
      )}
    </div>
  );
}

export default Card;
