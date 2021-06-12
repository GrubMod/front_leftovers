import React, { useState } from "react";
import { useEffect } from "react";

function Expiration({ leftover }) {
  const expiration = new Date(leftover.expiration);
  const timerObj = {
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
    expired: false,
  };
  const [timeLeftObj, setTimeLeftObj] = useState(timerObj);

  // timerFunction()

  useEffect(() => {
    function timerFunction() {
      const now = new Date().getTime();
      const timeLeft = expiration - now;

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      console.log(timeLeftObj);

      if (timeLeft > 0) {
        setTimeLeftObj({
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          expired: false,
        });
      } else {
        setTimeLeftObj({ ...timerObj, expired: true });
      }
    }
    timerFunction();
  }, []);

  // setInterval(timerFunction, 5000);

  return (
    <div>
      {timeLeftObj.expired ? (
        <p>Expired Message</p>
      ) : (
        <>
          {timeLeftObj.days ? <p>{timeLeftObj.days} d</p> : ""}
          {timeLeftObj.hours ? <p>{timeLeftObj.hours} h</p> : ""}
          {timeLeftObj.minutes ? <p>{timeLeftObj.minutes} m</p> : ""}
          {/* <p>{timeLeftObj.hours} h</p>
          <p>{timeLeftObj.minutes} m</p>
          <p>{timeLeftObj.seconds} s</p> */}
        </>
      )}
    </div>
  );
}

export default Expiration;
