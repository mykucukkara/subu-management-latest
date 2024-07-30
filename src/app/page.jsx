import { cookies } from "next/headers";
import Logout from "../components/button/Logout";

export const getUser = async () =>
  fetch("http://localhost:3000/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Cookie: cookies().toString(),
    },
  }).then((res) => {
    // if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });

export default async function Home() {
  const { data } = await getUser();

  return (
    <main className="w-100 p-2">
      <header className="d-flex justify-content-between">
        <h3 className="text-center">Panel Sonraki Modüllerde eklenecek</h3>
        <Logout></Logout>
      </header>

      <p>
        İsim : <strong>{data?.name_surname}</strong>
      </p>

      <p>
        Kullanıcı Tipi :{" "}
        <strong>
          {data?.user_type == "academician" ? "Akademisyen" : "Mezun"}
        </strong>
      </p>
    </main>
  );
}
