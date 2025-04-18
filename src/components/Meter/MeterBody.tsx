import { donationPercentage, is100Percent, isNegative } from "../../utils/util";

import styles from "./Meter.module.css";

function MeterBody({
  donated,
  goal,
}: {
  donated: number | null;
  goal: number | null;
}) {
  const donatedWithCommas = donated?.toLocaleString();

  return (
    <>
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
          {is100Percent(donated, goal) || isNegative(donated, goal)
            ? ""
            : `$${donatedWithCommas} Donated`}
        </strong>
        <strong
          className={styles.total}
          style={{
            bottom: `${donationPercentage(donated, goal)}`,
            width: "31px",
          }}
        >
          {is100Percent(donated, goal) || isNegative(donated, goal)
            ? ""
            : `___`}
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
    </>
  );
}

export default MeterBody;
