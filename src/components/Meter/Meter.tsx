import MeterHeader from "./MeterHeader";
import MeterBody from "./MeterBody";

import styles from "./Meter.module.css";

function Meter({
  donated,
  goal,
  subtitle,
}: {
  donated: number | null;
  goal: number | null;
  subtitle: string;
}) {
  return (
    <div className={styles.donationMeter}>
      <MeterHeader donated={donated} goal={goal} subtitle={subtitle} />
      <MeterBody donated={donated} goal={goal} />
    </div>
  );
}

export default Meter;
