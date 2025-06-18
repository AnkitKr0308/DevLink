import conf from "../conf/conf";

const base_url = conf.LinkApiGetUser;

export async function GetLinkbyUser(UserId) {
  try {
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
  try {
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
  } catch (error) {
    console.error("Error adding data", error);
  }
};

export const DeleteLink = async (id) => {
  try {
    const response = await fetch(`${base_url}/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return "Deleted successfully";
    } else {
      return "Error deleting record";
    }
  } catch (error) {
    console.error("Error deleting record", error);
  }
};
