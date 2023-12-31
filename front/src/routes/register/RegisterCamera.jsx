import "./Register.style.scss";
import { useState, useEffect } from "react";
import noCameraImg from "../../assets/register/Camera-not-Working.png"

const RegisterCamera = ({ setCameraData, socket }) => {
  // 들어가는 정보 : plant_img, plant_position_x, plant_position_y, plant_original_name
  const [camera, setCamera] = useState(false);

  const cameraSource = camera.plant_img ? `data:image/jpeg;base64,${camera.plant_img}` : noCameraImg

  useEffect(() => {
    socket.on("streaming_image", (data) => {
      setCamera(data);
      setCameraData(data)
    });

    return () => {
      socket.off("streaming_image");
    };
  }, []);

  socket.on();

  return (
    <div className="RegisterCamera">
      {/* 카메라 들어갈 부분 */}
      <div className="camera__container">
        <img
          className="camera__screen"
          src={cameraSource}
          alt=""
          />
      </div>
      {camera.plant_img ? (
        <h4 className="camera__title">화분을 화면 중앙에 맞춰주세요</h4>
      ) : (
        <h4 className="camera__title">연결된 카메라가 없습니다.</h4>
      )}
      <div className="camera-buttons">
        {/* <button className="camera-button" onClick={handleLiftUp}>
          들기
        </button> */}
        {/* <button className="camera-button">
          <BsCameraFill
            size="32"
            className="camera-button__img"
            // color="#022a17"
            onClick={handleCapture}
          />
        </button> */}
        {/* <button className="camera-button" onClick={handleLiftDown}>
          놓기
        </button> */}
      </div>
    </div>
  );
};

export default RegisterCamera;