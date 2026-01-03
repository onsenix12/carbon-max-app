import { NextResponse } from "next/server";

export async function GET() {
  // #region agent log
  const logEndpoint = 'http://127.0.0.1:7243/ingest/ff043c46-ebaa-49ee-a75d-5e6b254857f8';
  fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/health/route.ts:6',message:'Health check GET request received',data:{timestamp:new Date().toISOString()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  return NextResponse.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    server: "running"
  });
}

