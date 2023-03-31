import "./Loading.style.scss";
import loading from "../../assets/loading/loading.gif";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Swal from "sweetalert2";

// 나중에 배포주소로 바꿔주기
// const socket = io("https://j8b310.p.ssafy.io");
const socket = io("http://localhost:3001");

const LoadingPage = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    Swal.fire({
      title: "스캔 취소",
      text: "스캔을 취소하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "네",
      denyButtonText: "아니오",
    }).then((res) => {
      if (res.isConfirmed) {
        navigate("/home");
      }
    });
  };

  useEffect(() => {
    socket.emit("run_mapping", {
      data: "mapping start",
    });

    socket.on("run_mapping", (data) => {
      if (data === -1) {
        console.log("종료조건", data);
        navigate("/home");
      }
    });
  }, []);

  useEffect(() => {
    socket.on("finished_mapping", (data) => {
      console.log("finished mapping", data);
      navigate("/home");
    });

    return () => {
      socket.off("finished_mapping");
    };
  }, []);

  // 버튼 누를 시 로딩
  // 끝나면 확인 모달 띄우고 다시 home으로
  return (
    <div className="LoadingPage">
      <div className="loading__header">
        <div className="loading__header--back">
          <AiOutlineArrowLeft size="32" color="white" onClick={handleCancel} />
        </div>
      </div>
      <h2 className="loading-title">집을 스캔 중입니다..</h2>
      <img src={loading} alt="로딩중" />
      <h2 className="loading-content">
        이 작업은 집 크기에 따라 수십 분이 소요됩니다.
      </h2>
    </div>
  );
};

export default LoadingPage;
