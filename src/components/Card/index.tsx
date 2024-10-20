import { css } from "@emotion/react";
// import { HStack, VStack } from "@styled-system/jsx"
import styles from "./index.module.scss";

type HomeProps = {
  title: string;
  img: string;
  caption: string;
};

const Home = ({ title, img, caption }: HomeProps) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <img className={styles.img} src={img} alt={`${title}の画像`} />
      <p className={styles.caption}>{caption}</p>
    </div>
  );
};

export default Home;
