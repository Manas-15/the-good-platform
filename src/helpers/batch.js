const getLengthHelper = (data, type) => {
  return data?.filter?.(
    (data) =>
      data?.totalOrganizationCount !==
      data?.receivedOrganizationIds?.split(",")?.length
  );
};

export { getLengthHelper };
