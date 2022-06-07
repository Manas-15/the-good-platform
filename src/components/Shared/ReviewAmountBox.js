import "./../../assets/css/loader.scss";
import "antd/dist/antd.css";

export default function ReviewAmountBox({ selectedAmount }) {
  return (
    <div className="donation-review-amount">
      <h3 className="selected-donation-amount">
        &#8377;{selectedAmount?.toLocaleString()}
      </h3>
      <span className="selected-donation-frequency">One Time Donation</span>
    </div>
  );
}
