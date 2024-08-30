"use server"
import * as http from "@/lib/http"

export default async function getProfile() {
  try {
    const data = await http.get('/me');
    return data;
  } catch (e) {
    throw new Error("Something wrong" + e.toString());
  }
}
