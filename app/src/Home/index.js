import stockGif from "./stocks.gif";
import styles from "./styles.module.scss";

const Home = () => (
  <section className={styles.home}>
    <h1>Welcome to Stock Hacks!</h1>
    <p>This is a new-investor-friendly blog to learn about stock market 101</p>
    <img src={stockGif} alt="stock list" />
  </section>
);

export default Home;
