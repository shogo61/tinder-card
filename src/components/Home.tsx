// import { css } from "@emotion/react";
import React, { useState, useMemo, useRef, useEffect } from "react";
import TinderCard, { Direction } from "react-tinder-card";
import FavoriteIcon from "@mui/icons-material/Favorite";
import UndoIcon from "@mui/icons-material/Undo";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

const db = ["book5", "book4", "book3", "book2", "book1"];

function Advanced() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState<Direction>();
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    console.log(`${lastDirection}にスワイプしました`);
  }, [currentIndex, lastDirection]);

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

  const swiped = (direction: Direction, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: string, idx: number) => {
    currentIndexRef.current >= idx &&
      childRefs[idx].current !== null &&
      childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir: Direction) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div style={styles.container}>
      <div style={styles.cardContainer}>
        {db.map((_, idx) => (
          <TinderCard
            ref={childRefs[idx]}
            className="swipe"
            key={db[idx]}
            onSwipe={(dir) => swiped(dir, idx)}
            onCardLeftScreen={() => outOfFrame(db[idx], idx)}
          >
            <div style={styles.card}>
              <h2>{db[idx]}</h2>
              <img
                onMouseDown={(e) => e.preventDefault()}
                src="https://picsum.photos/200/300"
                alt=""
                style={styles.img}
              />
              <p style={styles.caption}>
                本に関する適当な説明。本に関する適当な説明。本に関する適当な説明。本に関する適当な説明。本に関する適当な説明。
              </p>
            </div>
          </TinderCard>
        ))}
      </div>
      <div style={styles.buttons}>
        <button
          style={{
            ...styles.button,
            backgroundColor: !canSwipe ? "darkgray" : "skyblue",
          }}
          onClick={() => swipe("left")}
        >
          <FavoriteIcon />
        </button>
        <button
          style={{
            ...styles.button,
            backgroundColor: !canGoBack ? "darkgray" : "skyblue",
          }}
          onClick={() => goBack()}
        >
          <UndoIcon />
        </button>
        <button
          style={{
            ...styles.button,
            backgroundColor: !canSwipe ? "darkgray" : "skyblue",
          }}
          onClick={() => swipe("right")}
        >
          <ThumbDownAltIcon />
        </button>
      </div>
    </div>
  );
}

// emotionで行けるようになればcss()に変える。
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    height: "500px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    height: "500px",
    width: "300px",
    background: "#fff",
    border: "2px solid #000",
    borderRadius: "8px",
    overflow: "hidden",
    textAlign: "center",
  },
  img: {
    width: "200px",
    height: "300px",
  },
  caption: {
    margin: "8px",
    whiteSpace: "wrap",
    border: "1px solid #555",
    borderRadius: "4px",
  },
  buttons: {
    marginTop: "16px",
  },
  button: {
    padding: "8px",
    margin: "8px",
    borderRadius: "8px",
  },
};

export default Advanced;
