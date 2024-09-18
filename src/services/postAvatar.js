"use server";

import * as http from "@/lib/http";
import getSchedules from "./getSchedule";

function DataURIToBlob(dataURI) {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
}

export default async function postAvatar(imgBase64) {
  try {
    const { scheduleId } = await getSchedules();
    const file = DataURIToBlob(imgBase64);
    const data = new FormData();
    data.append("examScheduleId", scheduleId);
    data.append("avatar", file, "avatar.jpg");
    const res = http.post("/schedules/avatar", data, {
      formData: true,
    });
    return res;
  } catch (error) {
    throw new Error("Something wrong" + error.toString());
  }
}
