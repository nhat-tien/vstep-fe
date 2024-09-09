"use server";

import * as http from "@/lib/http";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login({ email, password }) {
  try {
    const res = await http.post(
      "/login",
      { email: email, password: password },
      { auth: false },
    );
    if (res["status"] == 200) {
      cookies().set({
        name: "access_token",
        value: res["accessToken"],
        httpOnly: true,
        sameSite: "Strict",
      });
      return {
        ok: true,
        message: "Login successful",
      };
    } else {
      return {
        ok: false,
        message: "Some thing wrong: " + res["message"],
      };
    }
  } catch (e) {
    console.log(e);
    throw new Error("Fail to login");
  }
}

export async function logout() {
  try {
    const res = await http.del("/logout");
    if (res["status"] == 200) {
      cookies().delete("access_token");
    }
  } catch (e) {
    throw new Error(e);
  }
  redirect("/");
}

export async function isLogin() {
   return cookies().has('access_token');
}
