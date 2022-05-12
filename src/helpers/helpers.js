import { donationPreferenceConstants } from "../constants";
export const ProcessHelper = (data) => {
  return data?.filter(
    (preference) =>
      preference?.isDeleted === false &&
      !preference?.batchId &&
      (preference?.status === donationPreferenceConstants?.RESUMED ||
        preference?.status === null)
  );
};
