import conf from "../conf/conf";

const base_url = conf.SupportApi;

export const createSupport = async (supportData) => {
  const respone = await fetch(`${base_url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supportData),
  });
  console.log(supportData);
  if (!respone.ok) {
    console.error("Error raising support request");
  } else {
    return await respone.json();
  }
};

export const GetSupportDataBySupportId = async (caseId) => {
  const response = await fetch(`${base_url}/CaseId/${caseId}`);

  if (!response.ok) {
    console.error("Error getting data");
  } else {
    return await response.json();
  }
};

export const GetSupportDataByEmail = async (Email) => {
  const response = await fetch(`${base_url}/Email/${Email}`);

  if (!response.ok) {
    console.error("Error getting data");
  } else {
    return await response.json();
  }
};
