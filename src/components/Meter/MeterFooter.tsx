import { isOver75Percent } from "../../utils/util";

import styles from "../../App.module.css";

function MeterFooter({
  description,
  donated,
  goal,
  thankYou,
}: {
  description: string;
  donated: number | null;
  goal: number | null;
  thankYou: string;
}) {
  return (
    <p className={styles.footer}>
      {isOver75Percent(donated, goal) && thankYou
        ? thankYou
        : description && description}
    </p>
  );
}

export default MeterFooter;
