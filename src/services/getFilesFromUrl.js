"use client"
export default async function getFileFromUrl(url) {
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  const file = new File([buf], "audio.mp3",{type:"audio/mpeg"});
  const data = new FormData();
  data.append("audio", file, "audio.mp3");
  return data
}
