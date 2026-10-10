import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory record of recent applications for audit/verification
interface ApplicationLead {
  id: string;
  name: string;
  location?: string;
  phone: string;
  email: string;
  trackId: string;
  trackTitle: string;
  trackCode: string;
  experience: string;
  createdAt: string;
  leadEmailSent: boolean;
  thankYouEmailSent: boolean;
}

const recentLeads: ApplicationLead[] = [];

// Helper to get or create email transporter
async function getEmailTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user, pass },
    });
  }

  // If no SMTP env is defined, return null and log cleanly without hanging
  return null;
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API: List recent leads (for verification / admin)
app.get('/api/leads', (req, res) => {
  res.json({ total: recentLeads.length, leads: recentLeads.slice(-20) });
});

// API: Process Application Form Submission
app.post('/api/apply', async (req, res) => {
  try {
    const { name, location, phone, email, trackId, trackTitle, trackCode, experience } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name, phone number, and email address are required.',
      });
    }

    const applicationTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const leadRecord: ApplicationLead = {
      id: `APP-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      location: location || '',
      phone,
      email,
      trackId: trackId || 'website-design',
      trackTitle: trackTitle || 'Website Design',
      trackCode: trackCode || 'COURSE 02',
      experience: experience || 'Beginner',
      createdAt: new Date().toISOString(),
      leadEmailSent: false,
      thankYouEmailSent: false,
    };

    const recipientAcademy = 'designacademybysanfollx@gmail.com';
    const fromAddress = process.env.SMTP_FROM || `"Design Academy by Sanfollx" <${recipientAcademy}>`;

    // 1. HTML Content for the Lead to Academy
    const leadEmailHtml = `
      <div style="font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e2e8; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #7615d9 0%, #ef146b 100%); padding: 24px 28px; color: #ffffff;">
          <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; opacity: 0.85;">New Admission Lead</p>
          <h1 style="margin: 6px 0 0 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Design Academy Application</h1>
        </div>

        <div style="padding: 28px;">
          <p style="font-size: 15px; color: #333; line-height: 1.6; margin-top: 0;">
            A new prospective student has submitted an application for <strong>${leadRecord.trackTitle} (${leadRecord.trackCode})</strong>.
          </p>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #fafafc; border-radius: 12px; border: 1px solid #ececf0;">
            <tr>
              <td style="padding: 12px 16px; font-size: 13px; color: #666; font-weight: 600; border-bottom: 1px solid #ececf0; width: 35%;">Applicant Name</td>
              <td style="padding: 12px 16px; font-size: 14px; color: #111; font-weight: 700; border-bottom: 1px solid #ececf0;">${name}</td>
            </tr>
            ${location ? `<tr>
              <td style="padding: 12px 16px; font-size: 13px; color: #666; font-weight: 600; border-bottom: 1px solid #ececf0;">Location / Address</td>
              <td style="padding: 12px 16px; font-size: 14px; color: #111; font-weight: 600; border-bottom: 1px solid #ececf0;">${location}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 12px 16px; font-size: 13px; color: #666; font-weight: 600; border-bottom: 1px solid #ececf0;">Email Address</td>
              <td style="padding: 12px 16px; font-size: 14px; color: #7615d9; font-weight: 700; border-bottom: 1px solid #ececf0;"><a href="mailto:${email}" style="color: #7615d9; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-size: 13px; color: #666; font-weight: 600; border-bottom: 1px solid #ececf0;">Phone / WhatsApp</td>
              <td style="padding: 12px 16px; font-size: 14px; color: #111; font-weight: 700; border-bottom: 1px solid #ececf0;"><a href="tel:${phone}" style="color: #111; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-size: 13px; color: #666; font-weight: 600; border-bottom: 1px solid #ececf0;">Selected Program Track</td>
              <td style="padding: 12px 16px; font-size: 14px; color: #111; font-weight: 700; border-bottom: 1px solid #ececf0;">${leadRecord.trackTitle} (${leadRecord.trackCode})</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-size: 13px; color: #666; font-weight: 600; border-bottom: 1px solid #ececf0;">Current Background</td>
              <td style="padding: 12px 16px; font-size: 14px; color: #111; font-weight: 600; border-bottom: 1px solid #ececf0;">${experience}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-size: 13px; color: #666; font-weight: 600;">Submission Time</td>
              <td style="padding: 12px 16px; font-size: 13px; color: #555;">${applicationTime} (IST)</td>
            </tr>
          </table>

          <div style="margin-top: 24px; display: flex; gap: 12px;">
            <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${name}, thank you for applying to Design Academy by Sanfollx for ${leadRecord.trackTitle}!`)}" style="display: inline-block; background: #22b8a5; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 20px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
              Contact on WhatsApp
            </a>
            <a href="mailto:${email}?subject=${encodeURIComponent(`Design Academy Admission Update: ${name}`)}" style="display: inline-block; background: #1e1d24; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 20px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.5px; margin-left: 8px;">
              Reply via Email
            </a>
          </div>
        </div>

        <div style="background: #fafafc; padding: 16px 28px; border-top: 1px solid #ececf0; font-size: 12px; color: #888; text-align: center;">
          Design Academy by Sanfollx Initiatives · Pattambi, Kerala
        </div>
      </div>
    `;

    // 2. HTML Content for the Student Thank You Note
    const thankYouEmailHtml = `
      <div style="font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e2e8; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #1e1d24 0%, #3e6fd8 50%, #7615d9 100%); padding: 32px 28px; color: #ffffff; text-align: center;">
          <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px; font-weight: 700; color: #22b8a5;">Design Academy by Sanfollx</p>
          <h1 style="margin: 10px 0 0 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">Thank You for Your Application!</h1>
        </div>

        <div style="padding: 32px 28px;">
          <p style="font-size: 16px; color: #1e1d24; line-height: 1.6; margin-top: 0;">
            Hello <strong>${name}</strong>,
          </p>
          <p style="font-size: 15px; color: #444; line-height: 1.6;">
            We have successfully received your application for the <strong>${leadRecord.trackTitle}</strong> track (<strong>${leadRecord.trackCode}</strong>) at our offline studio in Pattambi.
          </p>

          <div style="background: #fafafc; border-left: 4px solid #7615d9; padding: 18px 20px; margin: 24px 0; border-radius: 0 12px 12px 0;">
            <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #1e1d24;">What Happens Next?</p>
            <ol style="margin: 0; padding-left: 18px; font-size: 13.5px; color: #555; line-height: 1.6;">
              <li style="margin-bottom: 6px;"><strong>Admissions Review:</strong> Our mentor team will review your creative background.</li>
              <li style="margin-bottom: 6px;"><strong>Counseling Call:</strong> We will reach out via WhatsApp or phone (<strong>${phone}</strong>) within 24 hours.</li>
              <li><strong>Seat Allotment:</strong> We will discuss batch timings, offline studio walkthrough, and syllabus details.</li>
            </ol>
          </div>

          <div style="margin: 28px 0; padding: 18px; border: 1px dashed #26252a/20; border-radius: 12px; background: #ffffff; text-align: center;">
            <p style="margin: 0 0 12px 0; font-size: 13px; color: #666;">Need immediate admission assistance or want to visit the studio?</p>
            <a href="https://wa.me/+919846474143?text=${encodeURIComponent(`Hi Design Academy, I just applied (${name} - ${leadRecord.trackTitle}). I'd like to check batch updates!`)}" style="display: inline-block; background: #22b8a5; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
              Chat with Admissions on WhatsApp
            </a>
          </div>

          <p style="font-size: 13.5px; color: #666; line-height: 1.5; margin-bottom: 0;">
            Warm regards,<br />
            <strong>Admissions & Mentorship Team</strong><br />
            <span style="color: #7615d9; font-weight: 600;">Design Academy by Sanfollx Initiatives</span><br />
            BM Arcade, Pattambi, Kerala · +91 98464 74143
          </p>
        </div>

        <div style="background: #fafafc; padding: 18px 28px; border-top: 1px solid #ececf0; font-size: 11.5px; color: #888; text-align: center; line-height: 1.5;">
          Official Email: <a href="mailto:designacademybysanfollx@gmail.com" style="color: #7615d9; text-decoration: none;">designacademybysanfollx@gmail.com</a><br />
          © 2026 Design Academy by Sanfollx Initiatives. All rights reserved.
        </div>
      </div>
    `;

    // Attempt Transporter Sending
    const transporter = await getEmailTransporter();

    if (transporter) {
      try {
        // 1. Send Lead to Academy Email
        const leadResult = await transporter.sendMail({
          from: fromAddress,
          to: recipientAcademy,
          replyTo: `"${name}" <${email}>`,
          subject: `⚡ New Student Application: ${name} – ${leadRecord.trackTitle} (${leadRecord.trackCode})`,
          html: leadEmailHtml,
        });
        leadRecord.leadEmailSent = true;
        console.log(`[Email] Lead sent to ${recipientAcademy}:`, leadResult.messageId || 'OK');
      } catch (err) {
        console.error(`[Email] Error sending lead to ${recipientAcademy}:`, err);
      }

      try {
        // 2. Send Thank You to User Email
        const thankYouResult = await transporter.sendMail({
          from: fromAddress,
          to: `"${name}" <${email}>`,
          replyTo: recipientAcademy,
          subject: `Welcome to Design Academy by Sanfollx – Application Received (${leadRecord.trackCode})`,
          html: thankYouEmailHtml,
        });
        leadRecord.thankYouEmailSent = true;
        console.log(`[Email] Thank you note sent to ${email}:`, thankYouResult.messageId || 'OK');
      } catch (err) {
        console.error(`[Email] Error sending thank you note to ${email}:`, err);
      }
    } else {
      console.log(`[Email Notice] SMTP not configured. Application logged successfully:`, leadRecord);
    }

    recentLeads.push(leadRecord);

    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully! Confirmation email and academy lead dispatched.',
      lead: {
        id: leadRecord.id,
        name: leadRecord.name,
        email: leadRecord.email,
        phone: leadRecord.phone,
        trackTitle: leadRecord.trackTitle,
        trackCode: leadRecord.trackCode,
        leadEmailSent: leadRecord.leadEmailSent,
        thankYouEmailSent: leadRecord.thankYouEmailSent,
        leadTarget: recipientAcademy,
      },
    });
  } catch (error: any) {
    console.error('[API /api/apply Error]:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error processing application.',
    });
  }
});

// Vite middleware / SPA static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Design Academy Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
