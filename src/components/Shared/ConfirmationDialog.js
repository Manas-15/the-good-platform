import React, { useState, useEffect } from "react";
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
}) {
  const [isDisabled, setIsDisabled] = useState(actionType === donationPreferenceConstants.SUSPEND);
  return (
    <>     
      <Modal show={open} onHide={handleCancel} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontSize: "18"}}>
          {ReactHtmlParser(content)}
          {actionType === donationPreferenceConstants.SUSPEND && (
            <div className="mt-3">
              <select
                className="form-select col-md-6"
                aria-label="Select Duration"
                onChange={(e) => setIsDisabled(e.target.value === "Select Duration (Months)")}
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
          <Button variant="primary" onClick={handleConfirm} disabled={isDisabled}>
            Confirm
          </Button>
          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
