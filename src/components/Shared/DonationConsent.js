import { Button, Modal } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import { donationPreferenceConstants, payrollConstants } from "../../constants";
import donationsConsent from "./../../config/donationsConsent.json";
import { viewPortalConstants } from "../../constants";
export default function DonationConsent({
  closeCheck,
  amount,
  selectedCharity,
  employee,
  frequency,
  open,
  handleCheck
}) {
  const selectedCorporate = useSelector((state) => state.selectedCorporate);
  const currentPortal = useSelector((state) => state.currentView);
  const isCorporatePortal =
    currentPortal?.currentView === viewPortalConstants.CORPORATE_PORTAL;
  return (
    <Modal show={open} onHide={closeCheck} size="lg" backdrop="static">
      <Modal.Header closeButton className="fs-2">
        <Modal.Title>Donation Consent</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <table className="w-100">
          <thead>
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
          </thead>
          <tbody>
            <tr>
              <td>
                {isCorporatePortal
                  ? selectedCorporate?.corporate?.organizationName
                  : employee?.name}
              </td>
              <td>
                {selectedCharity?.charityName && selectedCharity?.charityName}
                {selectedCharity?.charityProgram &&
                  selectedCharity?.charityProgram}
              </td>
              <td className="text-right">
                {ReactHtmlParser(donationPreferenceConstants?.CURRENCY)}
                {amount}
              </td>
              <td className="text-center">{frequency}</td>
            </tr>
          </tbody>
        </table>
        <div className="row mt-5">
          <div className="col-md-12">
            <p>
              {donationsConsent?.consent} [Frequency: {frequency}]
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="default"
          className="btn btn-custom"
          onClick={handleCheck}
        >
          Authorize
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
