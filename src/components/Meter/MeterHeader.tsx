import { is100Percent } from "../../utils/util";

import styles from "./Meter.module.css";

function MeterHeader({
  donated,
  goal,
  subtitle,
  title,
}: {
  donated: number | null;
  goal: number | null;
  subtitle: string;
  title: string;
}) {
  const goalWithCommas = goal?.toLocaleString();

  return (
    <>
      <div>
        <strong className={styles.title}>{title}</strong>
        <strong className={styles.subtitle}>{subtitle ? subtitle : ""}</strong>
        <strong className={styles.goal}>
          {is100Percent(donated, goal)
            ? `Goal of $${goalWithCommas} achieved!`
            : `Goal $${goalWithCommas}`}
        </strong>
      </div>
    </>
  );
}

export default MeterHeader;
