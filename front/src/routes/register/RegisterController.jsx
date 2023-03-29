import React, { useState, useEffect } from 'react';
import {
  FaArrowAltCircleUp,
  FaArrowAltCircleDown,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
} from 'react-icons/fa';

const RegisterController = ({ socket }) => {
  const [UpKeyDown, setUpKeyDown] = useState(false);
  const [DownKeyDown, setDownKeyDown] = useState(false);
  const [LeftKeyDown, setLeftKeyDown] = useState(false);
  const [RightKeyDown, setRightKeyDown] = useState(false);

  const logKeyDown = (direction, number) => {
    console.log(`${direction} Key is down`, number);
    socket.emit(`go_${direction}`, { name: `go ${direction}`, data: number });
    
  };

  const createInterval = (callback) => {
    return setInterval(callback, 100);
  };

  const clearAndNullifyInterval = (intervalId) => {
    clearInterval(intervalId);
    return null;
  };

  const [UpIntervalId, setUpIntervalId] = useState(null);
  const [DownIntervalId, setDownIntervalId] = useState(null);
  const [LeftIntervalId, setLeftIntervalId] = useState(null);
  const [RightIntervalId, setRightIntervalId] = useState(null);

  useEffect(() => {
    setUpIntervalId((prevIntervalId) =>
      UpKeyDown && prevIntervalId === null
        ? createInterval(() => logKeyDown('straight',2))
        : !UpKeyDown && prevIntervalId !== null
        ? clearAndNullifyInterval(prevIntervalId)
        : prevIntervalId
    );
  }, [UpKeyDown]);

  useEffect(() => {
    setDownIntervalId((prevIntervalId) =>
      DownKeyDown && prevIntervalId === null
        ? createInterval(() => logKeyDown('back',3))
        : !DownKeyDown && prevIntervalId !== null
        ? clearAndNullifyInterval(prevIntervalId)
        : prevIntervalId
    );
  }, [DownKeyDown]);

  useEffect(() => {
    setLeftIntervalId((prevIntervalId) =>
      LeftKeyDown && prevIntervalId === null
        ? createInterval(() => logKeyDown('left',1))
        : !LeftKeyDown && prevIntervalId !== null
        ? clearAndNullifyInterval(prevIntervalId)
        : prevIntervalId
    );
  }, [LeftKeyDown]);

  useEffect(() => {
    setRightIntervalId((prevIntervalId) =>
      RightKeyDown && prevIntervalId === null
        ? createInterval(() => logKeyDown('right',4))
        : !RightKeyDown && prevIntervalId !== null
        ? clearAndNullifyInterval(prevIntervalId)
        : prevIntervalId
    );
  }, [RightKeyDown]);

  return (
    <div className="RegisterController">
      <div className="controller__up">
        <FaArrowAltCircleUp
          size="100"
          color="#022a17"
          onKeyDown={() => setUpKeyDown(true)}
          onKeyUp={() => setUpKeyDown(false)}
          onTouchStart={() => setUpKeyDown(true)}
          onTouchEnd={() => setUpKeyDown(false)}
          tabIndex="0"
        />
      </div>
      <div className="controller__down">
        <FaArrowAltCircleLeft
          size="100"
          color="#022a17"
          onKeyDown={() => setLeftKeyDown(true)}
          onKeyUp={() => setLeftKeyDown(false)}
          onTouchStart={() => setLeftKeyDown(true)}
          onTouchEnd={() => setLeftKeyDown(false)}
          tabIndex="0"
        />
        <FaArrowAltCircleDown
          size="100"
          color="#022a17"
          onKeyDown={() => setDownKeyDown(true)}
          onKeyUp={() => setDownKeyDown(false)}
          onTouchStart={() => setDownKeyDown(true)}
          onTouchEnd={() => setDownKeyDown(false)}
          tabIndex="0"
          />
          <FaArrowAltCircleRight
          size="100"
          color="#022a17"
          onKeyDown={() => setRightKeyDown(true)}
          onKeyUp={() => setRightKeyDown(false)}
          onTouchStart={() => setRightKeyDown(true)}
          onTouchEnd={() => setRightKeyDown(false)}
          tabIndex="0"
          />
          </div>
          </div>
          );
          };
          
          export default RegisterController;