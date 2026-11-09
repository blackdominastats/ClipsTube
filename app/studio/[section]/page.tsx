import Link from "next/link";
import {redirect} from "next/navigation";
import {createClient} from "@/lib/supabase/server";
import {Upload,PlaySquare,Settings} from "lucide-react";
export default async function StudioSection({params}:{params:Promise<{section:string}>}){
 const {section}=await params,s=await createClient();
 if(!s)redirect("/auth");
 const a=await s.auth.getUser();if(!a.data.user)redirect("/auth");
 const {data:channel}=await s.from("channels").select("id,title").eq("owner_id",a.data.user.id).maybeSingle();
 if(section==="content"){
  const {data:videos}=await s.from("videos").select("id,title,status,visibility,view_count,created_at").eq("channel_id",channel?.id??"").order("created_at",{ascending:false});
  return <main className="studio-section"><header><Link href="/studio">← Dashboard</Link><h1>Channel content</h1><p>Manage the videos on your channel.</p></header><div className="studio-panel"><div className="studio-section-head"><b>Videos</b><Link className="primary-button" href="/studio/upload"><Upload size={16}/> Upload</Link></div>{videos?.length?videos.map(v=><div className="studio-video-row" key={v.id}><div className="mini-thumb">▶</div><div><b>{v.title}</b><small>{v.status} · {v.visibility} · {(v.view_count??0).toLocaleString()} views</small></div></div>):<div className="studio-empty"><PlaySquare size={28}/><b>No content yet</b><p>Your uploaded videos will appear here.</p></div>}</div></main>;
 }
 if(section==="upload")return <main className="studio-section"><header><Link href="/studio">← Dashboard</Link><h1>Upload videos</h1><p>Publish a video to your ClipsTube channel.</p></header><div className="studio-panel upload-not-ready"><Upload size={34}/><h2>Video uploads are not enabled yet</h2><p>Your ClipsTube database is ready to store video records, but secure video storage, transcoding and playback still need to be connected.</p><p>We will use a dedicated video service so large files do not pass through the website server. Uploads will remain disabled until processing, moderation and playback checks are in place.</p><Link href="/studio" className="secondary-button">Back to Studio</Link></div></main>;
 return <main className="studio-section"><header><Link href="/studio">← Dashboard</Link><h1>Studio settings</h1><p>Channel and account settings.</p></header><div className="studio-panel"><Settings/><h2>{channel?.title??"Your channel"}</h2><p>Channel settings and profile editing will be added in the next development stage.</p></div></main>;
}