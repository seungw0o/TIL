import Button from "./Button";
import styles from "./App.module.css";


function App() {
  return (
    <div>
      <h1 className={styles.title}>Welocome back!!!</h1>
      <Button text={"continue"} />
    </div>
  );
}

export default App;
