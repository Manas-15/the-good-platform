import { Button, Modal } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
export default function DonationConsent({
  closeCheck,
  amount,
  selectedCharity,
  employee,
  frequency,
  open,
  handleCheck,
}) {
  return (
    <Modal show={open} onHide={closeCheck} size="lg" backdrop="static">
      <Modal.Header closeButton className="fs-2">
        <Modal.Title>Donation Consent</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <table width={"100%"}>
          <tr>
            <th width={"30%"}>
              <span className="text-primary">Donor Name:</span>
            </th>
            <th width={"30%"}>
              <span className="text-primary">Charity Program:</span>
            </th>
            <th width={"20%"} className="text-right">
              <span className="text-primary">Donation Amount:</span>
            </th>
            <th width={"20%"} className="text-center">
              <span className="text-primary">Frequency:</span>
            </th>
          </tr>
          <tr>
            <td>{employee?.name}</td>
            <td>{selectedCharity?.charityName}</td>
            <td className="text-right">{amount}</td>
            <td className="text-center">{frequency}</td>
          </tr>
        </table>
        <div className="row mt-5">
          <div className="col-md-12">
            <p>
              I authorize you to debit my account with the amounts of direct
              debits, with this welfare association in accordance with this
              authority until further notice. I agree that this authority is
              subject to my bank's terms and conditions that relate to my
              account. The specific terms and conditions are listed on the
              donation form. I acknowledge my first credit card donation will be
              debited immediately and my regular donation will be debited on or
              around my selected date of each month. I also confirm that I am at
              least 18 years of age and that I look forward to supporting this
              welfare association ongoing monthly donations for two years or
              longer. [Frequency: {frequency}]
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="default"
          className="btn btn-primary"
          onClick={handleCheck}
        >
          Authorize
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
