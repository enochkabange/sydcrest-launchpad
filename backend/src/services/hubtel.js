/**
 * Hubtel MoMo payment initiation.
 *
 * UNVERIFIED — no sandbox or live Hubtel credentials exist yet (see
 * .env.example), so this has never made a real call. The request shape
 * below matches Hubtel's documented Receive Money (Direct Debit) API from
 * public docs as of this writing, but Hubtel's API has changed shape
 * before and a POS Sales ID (a separate merchant identifier beyond the
 * client id/secret) may also be required — confirm both against
 * https://developers.hubtel.com before this goes anywhere near a real
 * payment. Follows the same no-credentials-no-op convention as
 * services/whatsapp.js: a missing config must degrade, never crash a
 * booking request.
 */

const enabled = Boolean(process.env.HUBTEL_CLIENT_ID && process.env.HUBTEL_CLIENT_SECRET);

const CHANNELS = {
  mtn_momo: 'mtn-gh',
  vodafone_cash: 'vodafone-gh',
  airteltigo_money: 'tigo-gh',
};

/**
 * Initiates a mobile money charge. Returns { skipped: true } if Hubtel
 * isn't configured — callers must handle that by leaving the booking in a
 * "payment pending, contact support" state rather than failing outright.
 */
async function initiateMoMoPayment({ amount, phone, paymentMethod, reference, description, callbackUrl }) {
  if (!enabled) {
    console.info('[hubtel] disabled — would have charged %s GHS %s via %s (ref %s)', phone, amount, paymentMethod, reference);
    return { skipped: true, reason: 'Hubtel not configured' };
  }

  const channel = CHANNELS[paymentMethod];
  if (!channel) return { error: `Unsupported payment method: ${paymentMethod}` };

  try {
    const auth = Buffer.from(`${process.env.HUBTEL_CLIENT_ID}:${process.env.HUBTEL_CLIENT_SECRET}`).toString('base64');
    // Endpoint path is the part most likely to have drifted — verify
    // against current docs before relying on this.
    const res = await fetch(`https://rmp.hubtel.com/v1/merchantaccount/merchants/${process.env.HUBTEL_CLIENT_ID}/receive/mobilemoney`, {
      method: 'POST',
      headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        CustomerMsisdn: phone,
        Channel: channel,
        Amount: amount,
        PrimaryCallbackUrl: callbackUrl,
        Description: description,
        ClientReference: reference,
      }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.Message || `Hubtel returned ${res.status}` };
    return { transactionId: data.Data?.TransactionId, raw: data };
  } catch (err) {
    console.error('[hubtel] payment initiation failed for ref %s: %s', reference, err.message);
    return { error: err.message };
  }
}

module.exports = { initiateMoMoPayment, enabled };
