import { donationPercentage, is100Percent } from "../../utils/util";

import styles from "./Meter.module.css";

function Meter({
  donated,
  goal,
  subtitle,
}: {
  donated: number | null;
  goal: number | null;
  subtitle: string;
  thankYou: string;
}) {
  const goalWithCommas = goal?.toLocaleString();
  const donatedWithCommas = donated?.toLocaleString();

  return (
    <div className={styles.donationMeter}>
      <strong className={styles.title}>IONA Fundraiser</strong>
      <strong className={styles.subtitle}>{subtitle ? subtitle : ""}</strong>
      <strong className={styles.goal}>
        {is100Percent(donated, goal)
          ? `Goal of $${goalWithCommas} achieved!`
          : `Goal $${goalWithCommas}`}
      </strong>
      <span className={styles.glass}>
        <strong
          className={styles.total}
          style={{
            bottom: `${donationPercentage(donated, goal)}`,
            marginRight: "35px",
            width: "310px",
            textAlign: "right",
          }}
        >
          {is100Percent(donated, goal) ? "" : `$${donatedWithCommas} Donated`}
        </strong>
        <strong
          className={styles.total}
          style={{
            bottom: `${donationPercentage(donated, goal)}`,
            width: "31px",
          }}
        >
          {is100Percent(donated, goal) ? "" : `___`}
        </strong>
        <span
          className={styles.amount}
          style={{
            height: donationPercentage(donated, goal),
          }}
        ></span>
      </span>
      <div className={styles.bulb}>
        <span className={styles.redCircle}></span>
        <span className={styles.filler}>
          <span></span>
        </span>
      </div>
    </div>
  );
}

export default Meter;
