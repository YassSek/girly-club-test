import nodemailer from "nodemailer";
import { ReservationRow } from "./supabase";

// -----------------------------------------------------------------------
// Email de confirmation de réservation, envoyé automatiquement dès qu'un
// paiement est validé (voir app/api/webhook/route.ts).
//
// Utilise Nodemailer (une librairie standard, pas un service tiers) pour
// envoyer via n'importe quel serveur SMTP classique. Tant que les
// variables SMTP_* ne sont pas renseignées, cette fonction ne fait rien
// — le site continue de fonctionner normalement, juste sans email.
//
// Pour l'activer une fois le domaine (thegirlyclub.fr) vérifié :
// 1. Crée une adresse email sur le domaine (ex: reservations@thegirlyclub.fr)
//    depuis Hostinger → Emails, dans le panneau du compte.
// 2. Récupère les identifiants SMTP de cette boîte (Hostinger → Emails →
//    "Configuration du client de messagerie" ou équivalent) : hôte, port,
//    utilisateur, mot de passe.
// 3. Renseigne SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM dans
//    les variables d'environnement (Vercel + .env.local).
// L'envoi s'active alors automatiquement, sans toucher au code.
// -----------------------------------------------------------------------

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
        secure: Number(smtpPort) === 465, // 465 = SSL direct, 587 = STARTTLS
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
    // Un souci d'envoi d'email ne doit jamais faire échouer la
    // confirmation de la réservation elle-même — juste un log pour
    // pouvoir investiguer a posteriori.
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
                <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-style:italic;color:#ffffff;font-size:26px;letter-spacing:0.02em;">the girly club</p>
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
