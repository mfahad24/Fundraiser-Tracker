import { useEffect, useRef, useState } from "react";

import Meter from "./components/Meter/Meter";
import MeterFooter from "./components/Meter/MeterFooter";
import NegativeBalance from "./NegativeBalance";

import { renderBackgroundColor } from "./utils/util";

import styles from "./App.module.css";

type Data = {
  donated: number | null;
  goal: number | null;
  subtitle: string;
  description: string;
  thankYou: string;
};

/*
1. move fetch call to method so its not repeated
2. make sheetId, sheet, and key user enterable properties
3. tests
4. readme
5. add cookies / session storage 
*/

function App() {
  const [data, setData] = useState<Data>({
    donated: null,
    goal: null,
    subtitle: "",
    description: "",
    thankYou: "",
  });
  const [loading, setLoading] = useState(true);
  const [negativeBalance, setNegativeBalance] = useState<boolean>(false);
  const donatedRef = useRef<HTMLInputElement | null | number>(null);
  const sheetId = "1vcTGSL2rpZiBWqVzEpJa_cL18sDaeLP8E4LtLi1XxFM";
  const sheet = "donations";
  const key = import.meta.env.VITE_GOOGLE_SHEETS_KEY;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheet}?key=${key}`;

  const { donated, goal, subtitle, description, thankYou } = data;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        const { values } = result;

        const donated = Number(values[1][2]);
        donatedRef.current = Number(values[1][2]);
        const goal = Number(values[1][3]);
        const subtitle = values[1][5];
        const description = values[1][6];
        const thankYou = values[1][7];

        renderBackgroundColor(values[1][8]);

        if (donated / goal < 0) {
          setNegativeBalance(true);
        }

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
          const { values } = result;

          if (donatedRef.current == values[1][2]) {
            console.log(
              "donated amount did not change, no need to update state"
            );
            return;
          } else {
            donatedRef.current = Number(values[1][2]);
            setData((prev) => ({
              ...prev,
              donated: Number(values[1][2]),
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
    }, 4500000); //4500000 is temp, 45000 is intended

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {negativeBalance && <NegativeBalance />}
      {loading ? (
        <span className={styles.loading}>
          Loading<span className={styles.dots}></span>
        </span>
      ) : (
        <Meter donated={donated} goal={goal} subtitle={subtitle} />
      )}
      <MeterFooter
        description={description}
        donated={donated}
        goal={goal}
        thankYou={thankYou}
      />
    </>
  );
}

export default App;
