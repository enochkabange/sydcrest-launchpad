/**
 * Daily.co embedded video — room + meeting-token creation.
 *
 * Same no-credentials-no-op convention as services/hubtel.js and
 * services/whatsapp.js: a missing DAILY_API_KEY must degrade (callers
 * fall back to the plain-text `meet_link` field), never crash a session
 * or booking request. UNVERIFIED against a real Daily account — the
 * request shapes below match Daily's public REST docs
 * (https://docs.daily.co/reference/rest-api) as of this writing.
 */

const enabled = Boolean(process.env.DAILY_API_KEY);

async function dailyFetch(path, body) {
  const res = await fetch(`https://api.daily.co/v1${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.info || `Daily returned ${res.status}`);
  return data;
}

/**
 * Creates a Daily room. Returns { configured: false } if Daily isn't set
 * up — callers must leave `meet_link` as the fallback in that case.
 */
async function createRoom(name, { expiresAt } = {}) {
  if (!enabled) {
    console.info('[daily] disabled — would have created a room for %s', name);
    return { configured: false };
  }
  try {
    const room = await dailyFetch('/rooms', {
      name,
      privacy: 'private',
      properties: {
        enable_chat: false,
        exp: expiresAt ? Math.floor(new Date(expiresAt).getTime() / 1000) : Math.floor(Date.now() / 1000) + 2 * 60 * 60,
      },
    });
    return { configured: true, url: room.url, name: room.name };
  } catch (err) {
    console.error('[daily] room creation failed for %s: %s', name, err.message);
    return { configured: true, error: err.message };
  }
}

/** Issues a per-participant meeting token for an already-created room. */
async function createMeetingToken(roomName, { userName, isOwner = false } = {}) {
  if (!enabled) return { configured: false };
  try {
    const token = await dailyFetch('/meeting-tokens', {
      properties: { room_name: roomName, user_name: userName, is_owner: isOwner },
    });
    return { configured: true, token: token.token };
  } catch (err) {
    console.error('[daily] token issuance failed for room %s: %s', roomName, err.message);
    return { configured: true, error: err.message };
  }
}

module.exports = { createRoom, createMeetingToken, enabled };
