"use server";

import * as http from "@/lib/http";
import getSchedules from "./getSchedule";

export default async function postAnswers(answers, isWriting = false) {
  try {
    const { scheduleId } = await getSchedules();
    const answerSubmit = [];
    for (let questionId in answers) {
      if(isWriting) {
        answerSubmit.push({
          questionId: questionId,
          text: answers[questionId],
        });
      } else {
        answerSubmit.push({
          questionId: questionId,
          selectOptionId: answers[questionId],
        });
      }
    }
    const res = await http.put("/answers", {
      scheduleId: scheduleId,
      answers: answerSubmit,
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
