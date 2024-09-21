"use server";
import * as http from "@/lib/http";
import getSchedules from "./getSchedule";
import { env } from "@/lib/env";

export default async function postAudioAnswers(questionId, data) {
  try {
    const { scheduleId } = await getSchedules();
    data.append("scheduleId", scheduleId);
    data.append("questionId",questionId)
    const responses = await http.post("/answers/audio", data, {
      formData: true
    })
    if (responses.data) {
       return {
        status: true,
        url: `https://${env("backendIP")}/storage/${responses.data.audioUrl}`,
      }
    } else {
      return {
        status: false,
        message: responses.message,
      }
    }
  } catch (e) {
    throw new Error("Something wrong" + e.toString());
  }
}
