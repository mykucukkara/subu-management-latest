export const signIn = async (data) =>
  fetch("/api/auth/sign-in", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });

export const signUp = async (data) => {
  const result = await fetch("/api/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

  return result.json();
};
