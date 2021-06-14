import React, { useState } from "react";
import { useEffect } from "react";

function Expiration({ leftover }) {
  const expiration = new Date(leftover.expiration);
  const [timeLeftObj, setTimeLeftObj] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeLeftObj(calculateTimeLeft());
  }, []);

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = expiration - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        expired: false,
      };
    } else {
      timeLeft = {
        expired: true,
      };
    }

    return timeLeft;
  }

  return (
    <div>
      {timeLeftObj.expired ? (
        <p>Expired Message</p>
      ) : (
        <>
          {timeLeftObj.days ? (
            <p>{timeLeftObj.days} days left</p>
          ) : timeLeftObj.hours ? (
            <p>{timeLeftObj.hours} hours</p>
          ) : timeLeftObj.minutes ? (
            <p>{timeLeftObj.minutes} minutes left</p>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

export default Expiration;
