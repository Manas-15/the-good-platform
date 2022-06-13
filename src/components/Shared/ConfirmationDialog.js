import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import { donationPreferenceConstants } from "../../constants";
const durationOptions = [];
for (var i = 1; i <= 12; i++) {
  durationOptions.push({ value: i, label: i });
}
export default function ConfirmationDialog({
  title,
  actionType,
  content,
  handleConfirm,
  open,
  handleCancel,
  duration,
  totalEmployee,
  totalProgram,
  totalAmount
}) {
  const [isDisabled, setIsDisabled] = useState(
    actionType === donationPreferenceConstants.SUSPEND
  );
  const changeDuration = (value) => {
    if (value === "Select Duration (Months)") {
      setIsDisabled(true);
    } else {
      duration(value);
      setIsDisabled(false);
    }
  };
  return (
    <>
      <Modal show={open} onHide={handleCancel} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "18" }}>
          {ReactHtmlParser(content)}
          {totalEmployee && (
            <>
              <p className="mt-4">
                <strong>Total employees donating:</strong>&nbsp;{totalEmployee}
              </p>
            </>
          )}
          {totalProgram && (
            <>
              <p>
                <strong>Total programs benefits:</strong>&nbsp;{totalProgram}
              </p>
            </>
          )}
          {totalAmount && (
            <>
              <p>
                <strong>Total amount:</strong>&nbsp;
                {ReactHtmlParser(donationPreferenceConstants?.CURRENCY)}
                {totalAmount}
              </p>
            </>
          )}
          {actionType === donationPreferenceConstants.SUSPEND && (
            <div className="mt-3">
              <select
                className="form-select col-md-6"
                aria-label="Select Duration"
                onChange={(e) => changeDuration(e.target.value)}
              >
                <option selected>Select Duration (Months)</option>
                {durationOptions.map((duration, index) => (
                  <option value={duration.value} key={index}>
                    {duration.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleConfirm}
            disabled={isDisabled}
            className="btn btn-custom"
          >
            Yes
          </button>
          <Button variant="danger" onClick={handleCancel}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
