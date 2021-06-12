import React, { useState } from "react";

function Expiration({ leftover }) {
  const expiration = new Date(leftover.expiration);
  const [timeLeftObj, setTimeLeftObj] = useState()

  function timerFunction() {
    const now = new Date().getTime();
    const timeLeft = expiration - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (timeLeft > 0) {
      setTimeLeftObj({
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          expired: false,
      })
    } else {
      setTimeLeftObj({ expired: true })
    }
  }

  setInterval(timerFunction, 1000);

  return (
    <div>
    {timeLeftObj &&
      (timeLeftObj.expired ? (
        <p>Expired Message</p>
      ) : (
        <>

          <p>{timeLeftObj.days} d</p>
          <p>{timeLeftObj.hours} h</p>
          <p>{timeLeftObj.minutes} m</p>
          <p>{timeLeftObj.seconds} s</p>
        </>
      ))
    }
    </div>
  );
}

export default Expiration;
