"use server"
import * as http from "@/lib/http";
import { env } from "@/lib/env";

export async function getSchedules (){
    try {
            const { data } = await http.get('/schedules');
            return data;
    }  catch (e) {
            throw new Error ("Something wrong" + e.toString());
    }
};

export default async function getQuestion (skill, part) {
    try {  
        const schedule = await getSchedules();
        const examId = schedule.examId; 
        const  { data }  = await http.get(`/exam/${examId}?skill=${skill}&part=${part}`);
        console.log(data);

        const ModifyData = data.map(item => {
            return {
              ...item,
              fileUrl: item.fileUrl ? `http://${env("backendIP")}/storage/${item.fileUrl}` : '',
            };
        }
        );

        return ModifyData;
  } catch (e) {
    throw new Error ("Something wrong" + e.toString());
  }
};