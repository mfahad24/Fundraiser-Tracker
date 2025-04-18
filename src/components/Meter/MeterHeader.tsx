import { is100Percent } from "../../utils/util";

import styles from "./Meter.module.css";

function MeterHeader({
  donated,
  goal,
  subtitle,
}: {
  donated: number | null;
  goal: number | null;
  subtitle: string;
}) {
  const goalWithCommas = goal?.toLocaleString();

  return (
    <>
      <strong className={styles.title}>IONA Fundraiser</strong>
      <strong className={styles.subtitle}>{subtitle ? subtitle : ""}</strong>
      <strong className={styles.goal}>
        {is100Percent(donated, goal)
          ? `Goal of $${goalWithCommas} achieved!`
          : `Goal $${goalWithCommas}`}
      </strong>
    </>
  );
}

export default MeterHeader;
