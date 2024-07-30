export const getUser = async () =>
  fetch("http://localhost:3000/api/user", {
    method: "GET",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    credentials: "include",
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });
