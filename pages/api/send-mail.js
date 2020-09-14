const fs = require("fs");
const path = require("path");
const { BASE_URL } = require("next/config").default().publicRuntimeConfig;

const config = {
  mailgun_key: process.env.MAILGUN_KEY,
  mailgun_domain: process.env.MAILGUN_DOMAIN
};

async function sendEmail(subject, html, to) {
  var mailgun = require("mailgun-js")({
    apiKey: config.mailgun_key,
    domain: config.mailgun_domain
  });

  const from = "lullaby@aerolab.co";

  var data = {
    from,
    to,
    subject,
    html
  };

  mailgun.messages().send(data, function(error, body) {
    if (error) {
      console.error("Problem sending email", error);
    }
  });
}

export default (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (!config.mailgun_key || !config.mailgun_domain) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Could not send the email", sent: true }));
    return;
  }

  const { frequency, email } = req.body;
  if (
    !frequency ||
    frequency < 0 ||
    frequency > 20000 ||
    typeof email !== "string" ||
    !email.includes("@")
  ) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Bad request", sent: true }));
    return;
  }

  const emailTemplate = fs.readFileSync(
    path.resolve("./public/static/emails/diagnostic-en.html"),
    `utf-8`
  );

  const emailHtml = emailTemplate
    .replace(/{{FREQUENCY}}/g, frequency)
    .replace(/{{EMAIL}}/g, email)
    .replace(/{{BASE_URL}}/g, BASE_URL)
    .replace(/{{TREATMENT_URL}}/g, `${BASE_URL}/en/treatment/${frequency}`)
    .replace(/{{INSTRUCTIONS_URL}}/g, `${BASE_URL}/en/instructions`);

  sendEmail("Your Tinnitus Diagnostic", emailHtml, email);

  res.statusCode = 200;
  res.end(JSON.stringify({ sent: true }));
};
