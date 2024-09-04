"use server"
import * as http from "@/lib/http";

export async function getExamID (){
        try {
            const data = http.get('/shedules');
            return data;
        }  catch (e) {
            throw new Error ("Something wrong" + e.toString());
          }
};

export async function getExam () {
    try {
        const Schedule = getExamID();
        const questionData = http.get(`/exam/${Schedule.examId}`);
        return questionData;
    } catch {
        throw new Error ("Có gì đó sai sai?" + e.toString());
    }
};

export default async function getQuestion() {
    try {  
    const slug = params.slug;
        const data = http.get(`exam/{examId}?skill=${slug[0]}&part=${slug[1]}`);
        return data;
  } catch (e) {
    throw new Error ("Something wrong" + e.toString());
  }
};