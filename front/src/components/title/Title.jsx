import "./Title.style.scss"

const Title = ({ className, text }) => {
  return (
    <div className="Title">
      <h1>{text}</h1>
      <hr />
    </div>
  )
};

export default Title