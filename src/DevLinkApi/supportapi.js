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

export const getSupportData = async (SupportId) => {
  const response = await fetch(`${base_url}/${SupportId}`);

  if (!response.ok) {
    alert("Support ID doesn't exists");
  } else {
    return await response.json();
  }
};
