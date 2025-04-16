import donationPercentage from "../../utils/donationPercentage.tsx";

import styles from "./Meter.module.css";

function Meter({
  donated,
  goal,
  subtitle,
}: {
  donated: string;
  goal: string;
  subtitle: string;
  thankYou: string;
}) {
  const goalWithCommas = Number(goal)?.toLocaleString();
  const donatedWithCommas = Number(donated)?.toLocaleString();
  const is100Percent = Number(donated) / Number(goal) === 1;

  return (
    <div className={styles.donationMeter}>
      <strong className={styles.title}>IONA Fundraiser</strong>
      <strong className={styles.subtitle}>{subtitle ? subtitle : ""}</strong>
      <strong className={styles.goal}>
        {is100Percent
          ? `Goal of $${goalWithCommas} achieved!`
          : `Goal $${goalWithCommas}`}
      </strong>
      <span className={styles.glass}>
        <strong
          className={styles.total}
          style={{ bottom: "40%", marginRight: "20px" }}
        >
          {is100Percent ? "" : `Donated $${donatedWithCommas}`}
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
