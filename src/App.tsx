import { useEffect, useRef, useState } from "react";
import Meter from "./components/Meter/Meter";

import { isOver75Percent, renderBackgroundColor } from "./utils/util";

import styles from "./App.module.css";

type Data = {
  donated: number | null;
  goal: number | null;
  subtitle: string;
  description: string;
  thankYou: string;
};

function App() {
  const [data, setData] = useState<Data>({
    donated: null,
    goal: null,
    subtitle: "",
    description: "",
    thankYou: "",
  });
  const [loading, setLoading] = useState(true);
  const donatedRef = useRef<HTMLInputElement | null | number>(null);
  const sheetId = "1vcTGSL2rpZiBWqVzEpJa_cL18sDaeLP8E4LtLi1XxFM";
  const sheet = "Sheet2";
  const key = import.meta.env.VITE_GOOGLE_SHEETS_KEY;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheet}?key=${key}`;

  const { donated, goal, subtitle, description, thankYou } = data;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        const donated = Number(result.values[1][2]);
        donatedRef.current = Number(result.values[1][2]);
        const goal = Number(result.values[1][3]);
        const subtitle = result.values[1][5];
        const description = result.values[1][6];
        const thankYou = result.values[1][7];

        renderBackgroundColor(result.values[1][8]);

        setData({
          donated,
          goal,
          subtitle,
          description,
          thankYou,
        });
      })
      .catch((error) => {
        console.error("The fetch failed with this error: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          if (donatedRef.current == result.values[1][2]) {
            console.log(
              "donated amount did not change, no need to update state"
            );
            return;
          } else {
            donatedRef.current = Number(result.values[1][2]);
            setData((prev) => ({
              ...prev,
              donated: Number(result.values[1][2]),
            }));
            console.log("updated state and ref");
          }
        })
        .catch((error) =>
          console.error(
            "The interval fetch call failed with this error:",
            error
          )
        );
    }, 45000); // 45 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <Meter
          donated={donated}
          goal={goal}
          subtitle={subtitle}
          thankYou={thankYou}
        />
      )}
      <p className={styles.footer}>
        {isOver75Percent(donated, goal) && thankYou
          ? thankYou
          : description && description}
      </p>
    </>
  );
}

export default App;
