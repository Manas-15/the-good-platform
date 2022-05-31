import { donationPreferenceConstants } from "../constants";
export const ProcessHelper = (data, batchId) => {
  return data?.filter?.(
    (preference) => preference

    //     batchId
    // ? preference
    // : (preference?.isDeleted === false &&
    //   !preference?.batchId &&
    //   (preference?.status === donationPreferenceConstants?.RESUMED ||
    //     preference?.status === null))
  );
};
