"use server";
import * as http from "@/lib/http";
import getSchedules from "./getSchedule";

export default async function getCountSelectQuestion(skill, part) {
  try {
    const schedule = await getSchedules();
    const examId = schedule.examId;
    const res = await http.get(
      `/exam/${examId}/count?skill=${skill}&part=${part}`,
    );
    if(res.status != 200) {
      return 0;
    }
    return res.count;
  } catch (e) {
    throw new Error("Something wrong" + e.toString());
  }
}
