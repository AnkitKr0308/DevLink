import conf from "../conf/conf";
// import authervice from "../appwrite/auth";

const base_url = conf.LinkApiGetUser;

export async function GetLinkbyUser(UserId) {
  try {
    // const user = await authervice.getCurrentUser();
    // const UserId = user.email;
    const response = await fetch(`${base_url}/${UserId}`);
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error("Error fetching api details");
    throw error;
  }
}

export const AddLink = async (linkdata) => {
  const response = await fetch(`${base_url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(linkdata),
  });

  if (!response.ok) {
    console.error("Error adding details");
  } else {
    return response.json();
  }
};
