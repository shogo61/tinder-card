import React, { useState, useMemo, useRef } from "react";
import TinderCard, { Direction } from "react-tinder-card";
import styles from "./card.module.scss";

const db = ["book5", "book4", "book3", "book2", "book1"];

function Advanced() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState<Direction>();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo<any>(
    () =>
      Array(db.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (
    direction: Direction,
    // nameToDelete: string,
    index: number
  ) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx &&
      childRefs[idx].current !== null &&
      childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir: Direction) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div>
      <h1>React Tinder Card</h1>
      <div className="cardContainer">
        {db.map((_, idx) => (
          <TinderCard
            ref={childRefs[idx]}
            className="swipe"
            key={db[idx]}
            onSwipe={(dir) => swiped(dir, idx)}
            onCardLeftScreen={() => outOfFrame(db[idx], idx)}
          >
            <div className={`${styles.card} ${styles["book-" + (idx + 1)]}`}>
              <h3>{db[idx]}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <button
          style={{ backgroundColor: !canSwipe ? "#c3c4d3" : undefined }}
          onClick={() => swipe("left")}
        >
          Swipe left!
        </button>
        <button
          style={{ backgroundColor: !canGoBack ? "#c3c4d3" : undefined }}
          onClick={() => goBack()}
        >
          Undo swipe!
        </button>
        <button
          style={{ backgroundColor: !canSwipe ? "#c3c4d3" : undefined }}
          onClick={() => swipe("right")}
        >
          Swipe right!
        </button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  );
}

export default Advanced;
