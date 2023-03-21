import { Link } from "react-router-dom";
import { AiOutlineArrowLeft, AiFillPlusCircle } from "react-icons/ai";
import plantImg from "../../assets/plant/mokoko_01.gif";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleLeft,
  FaArrowAltCircleUp,
  FaArrowAltCircleRight,
} from "react-icons/fa";
const Register = () => {
  return (
    <div className="Register">
      <div className="justify" style={{ margin: 16 }}>
        <Link to={"/"} className="diary-item">
          {/* <FontAwesomeIcon icon={faArrowLeft} size="xl" color="#C1B5A9" /> */}
          <AiOutlineArrowLeft size="24" color="#022a17" />
        </Link>
        <div className="diary-item">
          <h1 style={{ margin: 0 }}>식물 등록하기</h1>
        </div>
        <div></div>
      </div>

      <hr style={{ margin: 0 }} />
      {/* hr밑으로 */}
      <div style={{ margin: 16 }}>
        <div
          className="img-div"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img className="img-plant" src={plantImg} alt="식물 사진" />
        </div>

        <div className="justify">
          <button>들기</button>

          {/* <div>
            <button
              className="diary-item"
              style={{ border: 0 }}
              onClick={openWriteModal}
            >
              놓기
            </button>
            {isWriteModalOpen && <WriteModal onClose={closeWriteModal} />}
          </div> */}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: 26,
          }}
        >
          <FaArrowAltCircleUp size="80" color="#022a17" />
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <FaArrowAltCircleLeft size="80" color="#022a17" />
          <FaArrowAltCircleDown size="80" color="#022a17" />
          <FaArrowAltCircleRight size="80" color="#022a17" />
        </div>
      </div>
    </div>
  );
};

export default Register;
