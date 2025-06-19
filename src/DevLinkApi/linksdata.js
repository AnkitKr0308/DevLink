import conf from "../conf/conf";

const base_url = conf.LinkApiGetUser;

export async function GetLinkbyUser(UserId, Search) {
  try {
    let url = `${base_url}/${UserId}`;
    if (Search) {
      url += `?search=${encodeURIComponent(Search)}`;
    }
    const response = await fetch(url);
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

export const UpdateLinkData = async (id, updatedLinkData) => {
  try {
    const response = await fetch(`${base_url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedLinkData),
    });
    if (!response.ok) {
      console.error("Error updating details");
    } else {
      return response.json();
    }
  } catch (error) {
    console.error("Error updating record", error);
  }
};
