import styles from "./App.module.css";

function NegativeBalance() {
  return (
    <p className={styles.negativeBalance}>
      Please check your sheet. Your donated balance is negative.
    </p>
  );
}

export default NegativeBalance;
