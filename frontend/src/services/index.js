export const getRequest = async (url) => {
  const response = await fetch(url);

  const data = await response.json();
  if (!data.success) {
    let message = "An Error occurred :(";

    if (data?.message) {
      message = data.message;
    }

    return { success: false, message };
  }
  return data;
};

export const postRequest = async (url, body) => {
  console.log(body);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  console.log(response);

  const data = await response.json();
  console.log(data)

  if (!response.ok) {
    let message = "An error occurred :(";
    if (data?.message) {
      message = data.message;
    }

    if (data?.error) {
      message = data.error;
    }

    return { success: false, message };
  }
  return { success: true, data };
};
