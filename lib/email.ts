import nodemailer from "nodemailer";
import { ReservationRow } from "./supabase";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thegirlyclub.fr";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const fromEmail = process.env.SMTP_FROM ?? smtpUser;

const transporter =
  smtpHost && smtpPort && smtpUser && smtpPass
    ? nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort),
        secure: Number(smtpPort) === 465,
        auth: { user: smtpUser, pass: smtpPass },
      })
    : null;

export async function sendBookingConfirmationEmail(reservation: ReservationRow) {
  if (!transporter) {
    console.log(
      "SMTP non configuré — email de confirmation non envoyé (normal tant que le domaine n'est pas prêt)."
    );
    return;
  }

  try {
    await transporter.sendMail({
      from: `The Girly Club <${fromEmail}>`,
      to: reservation.contact_email,
      subject: `Réservation confirmée — ${reservation.event_title}`,
      html: buildConfirmationEmailHtml(reservation),
    });
  } catch (err) {
    console.error("Erreur envoi email de confirmation:", err);
  }
}

function buildConfirmationEmailHtml(reservation: ReservationRow): string {
  const participants = (reservation.participants as string[])
    .map((name) => `<li style="margin:0 0 6px;">${escapeHtml(name)}</li>`)
    .join("");

  return `<!doctype html>
<html lang="fr">
  <body style="margin:0;padding:0;background-color:#f5f1ee;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f1ee;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#ffffff;">
            <tr>
              <td style="background-color:#6F0E16;padding:32px 40px;text-align:center;">
                <img src="${siteUrl}/images/logo/logo-white-crop.png" width="140" height="115" alt="The Girly Club" style="display:inline-block;width:140px;height:115px;" />
              </td>
            </tr>
            <tr>
              <td style="padding:40px;">
                <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#6F0E16;">Réservation confirmée</p>
                <h1 style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#141010;">${escapeHtml(reservation.event_title)}</h1>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#3a332f;border-top:1px solid #e8e1da;">
                  <tr>
                    <td style="padding:16px 0 8px;border-bottom:1px solid #e8e1da;">Date</td>
                    <td style="padding:16px 0 8px;border-bottom:1px solid #e8e1da;text-align:right;font-weight:bold;">${escapeHtml(reservation.event_date)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid #e8e1da;">Participantes</td>
                    <td style="padding:8px 0;border-bottom:1px solid #e8e1da;text-align:right;font-weight:bold;">${reservation.num_participants}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;">Montant réglé</td>
                    <td style="padding:8px 0;text-align:right;font-weight:bold;color:#6F0E16;">${reservation.total_price}€</td>
                  </tr>
                </table>

                <p style="margin:24px 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8a7e78;">Participantes</p>
                <ul style="margin:0;padding-left:18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#3a332f;">
                  ${participants}
                </ul>

                <p style="margin:32px 0 0;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:15px;color:#3a332f;line-height:1.6;">
                  À très vite pour cette expérience entre girls.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#141010;padding:24px 40px;text-align:center;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 14px;">
                  <tr>
                    <td style="padding:0 8px;">
                      <a href="https://www.instagram.com/thegirlyclubgc" target="_blank">
                        <img src="${siteUrl}/images/email/instagram.png" width="22" height="22" alt="Instagram" style="display:block;width:22px;height:22px;" />
                      </a>
                    </td>
                    <td style="padding:0 8px;">
                      <a href="https://www.tiktok.com/@the.girlyclub" target="_blank">
                        <img src="${siteUrl}/images/email/tiktok.png" width="22" height="22" alt="TikTok" style="display:block;width:22px;height:22px;" />
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#ffffff99;">The Girly Club</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
