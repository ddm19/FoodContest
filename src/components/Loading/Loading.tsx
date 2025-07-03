import "./Loading.scss";

interface LoadingProps {
  text?: string;
}
const Loading = (props: LoadingProps) => {
  const { text } = props;
  return (
    <span className="loading">
      {text && <h1 className="loading__text">{text}</h1>}
      <div id="cooking">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div id="area">
          <div id="sides">
            <div id="pan"></div>
            <div id="handle"></div>
          </div>
          <div id="pancake">
            <div id="pastry"></div>
          </div>
        </div>
      </div>
    </span>
  );
};

export default Loading;
