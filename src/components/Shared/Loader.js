import "./../../assets/css/loader.scss";
import "antd/dist/antd.css";

export default function Loader({ style }) {
  return (
    <div className="ant-spin-nested-loading">
      <div>
        <div
          className="ant-spin ant-spin-spinning ant-spin-show-text"
          aria-live="polite"
          aria-busy="true"
          style={style}
        >
          <span className="ant-spin-dot ant-spin-dot-spin">
            <i className="ant-spin-dot-item"></i>
            <i className="ant-spin-dot-item"></i>
            <i className="ant-spin-dot-item"></i>
            <i className="ant-spin-dot-item"></i>
          </span>
          <div className="ant-spin-text">Loading...</div>
        </div>
      </div>
    </div>
  );
}
