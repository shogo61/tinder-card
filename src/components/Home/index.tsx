import React, { useState, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
// import Card from "./components/Card";
import { X, Heart } from "lucide-react";
import styles from "./index.module.scss"; // styles from "./index.module.scss"; を追加

interface Profile {
  id: number;
  name: string;
  age: number;
  image: string;
}

const profiles: Profile[] = [
  {
    id: 1,
    name: "Sarah",
    age: 25,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    name: "Jake",
    age: 30,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    name: "Emily",
    age: 28,
    image: "/placeholder.svg?height=400&width=300",
  },
];

export default function TinderSwipe() {
  const [currentProfile, setCurrentProfile] = useState(0);
  const [lastDirection, setLastDirection] = useState<string | null>(null);
  const constraintsRef = useRef(null);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      handleSwipe("right");
    } else if (info.offset.x < -threshold) {
      handleSwipe("left");
    }
  };

  const handleSwipe = (direction: "left" | "right") => {
    setLastDirection(direction);
    setCurrentProfile((prev) => (prev + 1) % profiles.length);
  };

  const handleButtonClick = (direction: "left" | "right") => {
    handleSwipe(direction);
  };

  return (
    <div className={styles.container}>
      <div ref={constraintsRef} className={styles.cardContainer}>
        {profiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            animate={{
              scale: index === currentProfile ? 1 : 0.9,
              opacity: index === currentProfile ? 1 : 0,
              zIndex: profiles.length - index,
            }}
            transition={{ duration: 0.3 }}
            className={styles.card}
          >
            <div className={styles.cardInner}>
              <img
                src="https://picsum.photos/200/300"
                alt={profile.name}
                className={styles.cardImage}
              />
              <div className={styles.cardInfo}>
                <h2 className={styles.cardName}>{profile.name}</h2>
                <p className={styles.cardAge}>{profile.age} years old</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.buttonLeft}
          onClick={() => handleButtonClick("left")}
        >
          <X className={styles.buttonIcon} />
        </button>
        <button
          className={styles.buttonRight}
          onClick={() => handleButtonClick("right")}
        >
          <Heart className={styles.buttonIcon} />
        </button>
      </div>
      {lastDirection && (
        <div className={styles.lastSwipe}>
          Last swipe: {lastDirection === "left" ? "Nope" : "Like"}
        </div>
      )}
    </div>
  );
}
