import Link from "next/link";
import { signIn, signUp } from "@/lib/actions";
import { createClient } from "@/lib/supabase/server";
export default async function AuthPage({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}) {
 const p=await searchParams,s=await createClient(),a=s?await s.auth.getUser():{data:{user:null}};
 if(a.data.user)return <main className="auth-page"><div className="auth-card"><Link className="brand" href="/"><span className="brand-mark"><i/></span><b>ClipsTube</b></Link><h1>You’re signed in</h1><p>Return to ClipsTube to continue watching.</p><Link className="primary-button" href="/">Continue</Link></div></main>;
 return <main className="auth-page"><div className="auth-card"><Link className="brand" href="/"><span className="brand-mark"><i/></span><b>ClipsTube</b></Link><h1>Sign in to ClipsTube</h1><p>Like videos, subscribe to channels and create your own channel.</p>
 {p["check-email"]&&<div className="success-note">Check your email to confirm your account.</div>}
 {p.error&&<div className="error-note">{p.error==="not-configured"?"Supabase environment variables have not been added yet.":p.error==="password"?"Use a password with at least 10 characters.":"We couldn't complete that request. Check your details."}</div>}
 <form action={signIn} className="auth-form"><h2>Sign in</h2><label>Email<input name="email" type="email" required autoComplete="email"/></label><label>Password<input name="password" type="password" required autoComplete="current-password"/></label><button className="primary-button">Sign in</button></form>
 <div className="auth-divider">New to ClipsTube?</div><form action={signUp} className="auth-form"><h2>Create an account</h2><label>Display name<input name="name" required maxLength={60}/></label><label>Email<input name="email" type="email" required autoComplete="email"/></label><label>Password<input name="password" type="password" minLength={10} required autoComplete="new-password"/></label><button className="secondary-button">Create account</button></form>
 <p className="small-print">By creating an account, you agree to follow ClipsTube’s community and safety rules.</p><Link className="back-link" href="/">← Back to ClipsTube</Link></div></main>;
}