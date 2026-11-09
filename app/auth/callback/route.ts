import {NextResponse,type NextRequest} from "next/server";
import {createServerClient} from "@supabase/ssr";
export async function GET(request:NextRequest){
 const {searchParams,origin}=new URL(request.url),code=searchParams.get("code");
 if(code){
  const response=NextResponse.redirect(new URL("/",origin));
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if(url&&key){
   const supabase=createServerClient(url,key,{cookies:{getAll:()=>request.cookies.getAll(),setAll(values){values.forEach(({name,value,options})=>response.cookies.set(name,value,options));}}});
   await supabase.auth.exchangeCodeForSession(code);
  }
  return response;
 }
 return NextResponse.redirect(new URL("/auth?error=callback",origin));
}