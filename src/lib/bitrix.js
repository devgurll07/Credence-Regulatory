export async function sendToBitrix(e) {
  const base = process.env.BITRIX_WEBHOOK_URL;
  if (!base) {
    console.error("Bitrix: BITRIX_WEBHOOK_URL is not set");
    return null;
  }
  const url = `${base.endsWith("/") ? base : base + "/"}crm.lead.add.json`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          TITLE: `Website enquiry: ${e.service}`,
          NAME: e.name,
          PHONE: [{ VALUE: e.phone, VALUE_TYPE: "WORK" }],
          ...(e.email ? { EMAIL: [{ VALUE: e.email, VALUE_TYPE: "WORK" }] } : {}),
          SOURCE_ID: "WEB",
          SOURCE_DESCRIPTION: e.source_blog_slug
            ? `Blog: ${e.source_blog_slug}`
            : `Page: ${e.source_page || "unknown"}`,
          COMMENTS: `Country: ${e.country}\nService: ${e.service}\nMessage: ${e.message || "-"}${
            e.assignee_name ? `\nAssigned to: ${e.assignee_name}` : ""
          }`,
        },
        params: { REGISTER_SONET_EVENT: "Y" },
      }),
    });
    const json = await res.json();
    if (!json.result) {
      console.error("Bitrix rejected the lead:", res.status, JSON.stringify(json));
      return null;
    }
    return String(json.result);
  } catch (err) {
    console.error("Bitrix request failed:", err);
    return null;
  }
}