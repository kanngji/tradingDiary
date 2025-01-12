"use client";

import { useState } from "react";
import styles from "./calendar.module.css";

export default function Calendar() {
  const today: Date = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(today);

  const startOfMonth: Date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth: Date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const daysInMonth: number[] = [];
  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    daysInMonth.push(i);
  }

  const changeMonth = (offset: number): void => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={() => changeMonth(-1)}>Prev</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        <button onClick={() => changeMonth(1)}>Next</button>
      </div>
      <div className={styles.days}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className={styles.dayHeader}>
            {day}
          </div>
        ))}
        {Array(startOfMonth.getDay())
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className={styles.empty}></div>
          ))}
        {daysInMonth.map((day) => (
          <div
            key={day}
            className={`${styles.day} ${
              day === today.getDate() &&
              currentDate.getMonth() === today.getMonth() &&
              currentDate.getFullYear() === today.getFullYear()
                ? styles.today
                : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
