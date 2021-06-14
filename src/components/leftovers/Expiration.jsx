import React, { useState } from "react";
import { useEffect } from "react";
import { Label, Icon } from 'semantic-ui-react'

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
        <Label as='a' color='red' ribbon>Expired Message</Label>
      ) : (
        <>
          {timeLeftObj.days ? (
            <Label as='a' color='blue' ribbon><Icon name='clock outline'/>{timeLeftObj.days} days left</Label>
          ) : timeLeftObj.hours ? (
            <Label as='a' color='orange' ribbon><Icon name='clock outline'/>{timeLeftObj.hours} hours</Label>
          ) : timeLeftObj.minutes ? (
            <Label as='a' color='red' ribbon><Icon name='clock outline'/>{timeLeftObj.minutes} minutes left</Label>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

export default Expiration;
