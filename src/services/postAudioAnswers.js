"use server";

import * as http from "@/lib/http";
import getSchedules from "./getSchedule";

export default async function postAudioAnswers(questionId, file) {
  try {
    const { scheduleId } = await getSchedules();
    const data = new FormData();
    data.append("scheduleId", scheduleId);
    data.append("questionId", questionId);
    data.append("audio", file, "audio.mp3");
    const res = await http.post("/answers/audio", data, {
      formData: true,
    });

    if(res.data != null) {
      return {
        status: true
      }
    } else {
      return {
        status: false
      }
    }
  } catch (e) {
    throw new Error("Something wrong" + e.toString());
  }
}
