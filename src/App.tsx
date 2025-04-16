import { useEffect, useRef, useState } from "react";
import Meter from "./components/Meter/Meter";

import styles from "./App.module.css";

function App() {
  const [data, setData] = useState({
    donated: "",
    goal: "",
    subtitle: "",
    thankYou: "",
  });
  const [loading, setLoading] = useState(true);
  const donatedRef = useRef("");
  const sheetId = "1vcTGSL2rpZiBWqVzEpJa_cL18sDaeLP8E4LtLi1XxFM";
  const sheet = "Sheet2";
  const key = import.meta.env.VITE_GOOGLE_SHEETS_KEY;
  const { donated, goal, subtitle, thankYou } = data;
  const isOver75Percent = (Number(donated) / Number(goal)) * 100 > 75;

  useEffect(() => {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheet}?key=${key}`
    )
      .then((response) => response.json())
      .then((result) => {
        const donated = result.values[1][2];
        donatedRef.current = result.values[1][2];
        const goal = result.values[1][3];
        const subtitle = result.values[1][5];
        const thankYou = result.values[1][6];

        document.body.style.backgroundColor =
          result.values[1][7] === undefined
            ? "lightsteelblue"
            : `${result.values[1][7]}`;
        document.body.style.transition = "background-color 3s ease";

        setData({
          donated,
          goal,
          subtitle,
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
      fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheet}?key=${key}`
      )
        .then((response) => response.json())
        .then((result) => {
          if (donatedRef.current == result.values[1][2]) {
            console.log(
              "donated amount did not change, no need to update state"
            );
            return;
          } else {
            donatedRef.current = result.values[1][2];
            setData((prev) => ({
              ...prev,
              donated: result.values[1][2],
            }));
            console.log("updated state and donated ref");
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
      <p className={styles.thankYou}>
        {isOver75Percent && thankYou ? thankYou : ""}
      </p>
    </>
  );
}

export default App;
