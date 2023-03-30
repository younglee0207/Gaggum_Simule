import { io } from "socket.io-client";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { socketState, simulatorInfo } from "../../store";

const socket = io("http://j8b310.p.ssafy.io:3001");
// const socket = io("http://localhost:3001");

const Temp = () => {
  const [data, setData] = useRecoilState(socketState);
  const [data2, setData2] = useRecoilState(simulatorInfo);

  // useEffect(() => {
  //   socket.on("safety_status", (data) => {
  //     console.log("received update :", data);
  //     setData(data.data);
  //   });

  //   return () => {
  //     socket.off("safety_status");
  //   };
  // }, []);

  // socket.on("safety_status", (data) => {
  //   console.log("safety_status :", data);
  //   // setData(data);
  // });

  useEffect(() => {
    socket.on("simulator_info", (data) => {
      console.log("simulator_info :", data.environment);
      setData2(data);
    });

    // socket.on("testServer2Client", (data) => {
    //   console.log("Wlrgla", data);
    //   setData(data.timestamp);
    // });

    return () => {
      socket.off("simulator_info");
    };
  }, []);

  const handleRequestSocket = () => {
    console.log("button clicked");
    socket.emit("run_mapping", {
      data: "mapping start",
    });
  };

  const handleChange = () => {
    console.log("change handle");
  };

  return (
    <div className="temp">
      <h1>Temp 페이지</h1>
      <button onClick={handleRequestSocket}>요청</button>
      <h1>{data}</h1>
      <h2>data: {JSON.stringify(data2)}</h2>
    </div>
  );
};

export default Temp;
