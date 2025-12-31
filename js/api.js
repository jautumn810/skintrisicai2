const PHASE_ONE = "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne";
const PHASE_TWO = "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo";

export async function postPhaseOne(payload) {
  const res = await fetch(PHASE_ONE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Phase 1 API failed (${res.status}): ${text}`);
  }
  return res.json();
}

export async function postPhaseTwo(payload) {
  console.log('🔵 postPhaseTwo called with payload:', {
    keys: Object.keys(payload),
    hasImage: 'Image' in payload,
    hasimage: 'image' in payload,
    ImageLength: payload.Image?.length || payload.image?.length || 0
  });
  
  const body = JSON.stringify(payload);
  console.log('🔵 Request body size:', body.length);
  console.log('🔵 Request body preview (first 200 chars):', body.substring(0, 200));
  
  const res = await fetch(PHASE_TWO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  });

  console.log('🔵 API response status:', res.status);
  console.log('🔵 API response ok:', res.ok);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error('❌ API error response:', text);
    throw new Error(`Phase 2 API failed (${res.status}): ${text}`);
  }
  
  const json = await res.json();
  console.log('✅ API success response:', json);
  return json;
}

export async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

