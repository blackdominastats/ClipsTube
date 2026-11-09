"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export async function signIn(data: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect("/auth?error=not-configured");
  const {error} = await supabase.auth.signInWithPassword({email:String(data.get("email")||""),password:String(data.get("password")||"")});
  if (error) redirect("/auth?error=invalid");
  redirect("/");
}
export async function signUp(data: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect("/auth?error=not-configured");
  const password=String(data.get("password")||"");
  if(password.length<10) redirect("/auth?error=password");
  const {error}=await supabase.auth.signUp({email:String(data.get("email")||""),password,options:{data:{full_name:String(data.get("name")||"")}}});
  if(error) redirect("/auth?error=signup");
  redirect("/auth?check-email=1");
}
export async function signOut() {
  const supabase=await createClient();
  if(supabase) await supabase.auth.signOut();
  redirect("/");
}