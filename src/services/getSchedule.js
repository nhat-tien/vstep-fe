"use server";
import * as http from "@/lib/http";

export default async function getSchedules() {
  try {
    const { data } = await http.get("/schedules");
    return data;
  } catch (e) {
    throw new Error("Something wrong" + e.toString());
  }
}
