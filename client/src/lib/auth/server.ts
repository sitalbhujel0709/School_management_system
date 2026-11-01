import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getServerUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) {
    return null;
  }
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data.data.user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
