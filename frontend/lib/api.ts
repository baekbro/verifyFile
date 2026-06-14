const BASE = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
}

export async function registerDocument(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${BASE}/documents/register`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  });
  return res.json();
}

export async function verifyDocument(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${BASE}/documents/verify`, { method: "POST", body: formData });
  return res.json();
}

export async function getHistory() {
  const res = await fetch(`${BASE}/documents/history`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}
