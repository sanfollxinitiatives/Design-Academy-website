<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

$raw_input = file_get_contents('php://input');
$data = json_decode($raw_input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON payload']);
    exit;
}

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$location = trim($data['location'] ?? '');
$trackTitle = trim($data['trackTitle'] ?? 'Website Design');
$trackCode = trim($data['trackCode'] ?? 'COURSE 02');
$experience = trim($data['experience'] ?? 'Beginner');

if (empty($name) || empty($email) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Name, email, and phone are required.']);
    exit;
}

// 1. Log lead locally so submissions are never lost
$lead_entry = [
    'id' => 'APP-' . time() . '-' . rand(100, 999),
    'name' => $name,
    'location' => $location,
    'phone' => $phone,
    'email' => $email,
    'trackTitle' => $trackTitle,
    'trackCode' => $trackCode,
    'experience' => $experience,
    'timestamp' => date('Y-m-d H:i:s T')
];

$leads_file = __DIR__ . '/leads.json';
$all_leads = file_exists($leads_file) ? json_decode(file_get_contents($leads_file), true) : [];
if (!is_array($all_leads)) {
    $all_leads = [];
}
$all_leads[] = $lead_entry;
@file_put_contents($leads_file, json_encode($all_leads, JSON_PRETTY_PRINT));

date_default_timezone_set('Asia/Kolkata');
$applicationTime = date('l, F j, Y, g:i:s A') . ' IST';
$cleanPhone = preg_replace('/[^0-9]/', '', $phone);

// 2. Admission Notification HTML
$leadEmailHtml = '
<div style="font-family: \'Plus Jakarta Sans\', -apple-system, BlinkMacSystemFont, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e2e8; border-radius: 16px; overflow: hidden;">
  <div style="background: linear-gradient(135deg, #7615d9 0%, #ef146b 100%); padding: 24px 28px; color: #ffffff;">
    <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; opacity: 0.85;">New Admission Lead</p>
    <h1 style="margin: 6px 0 0 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Design Academy Application</h1>
  </div>

  <div style="padding: 28px;">
    <p style="font-size: 15px; color: #333; line-height: 1.6; margin-top: 0;">
      A new prospective student has submitted an application for <strong>' . htmlspecialchars($trackTitle) . ' (' . htmlspecialchars($trackCode) . ')</strong>.
    </p>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #fafafc; border-radius: 12px; border: 1px solid #ececf0;">
      <tr>
        <td style="padding: 12px 16px; font-size: 13px; color: #666; font-weight: 600; border-bottom: 1px solid #ececf0; width: 35%;">Applicant Name</td>
        <td style="padding: 12px 16px; font-size: 14px; color: #111; font-weight: 700; border-bottom: 1px solid #ececf0;">' . htmlspecialchars($name) . '</td>
      </tr>
      ' . (!empty($location) ? '<tr>
        <td style="padding: 12px 16px; font-size: 13px; color: #666; font-weight: 600; border-bottom: 1px solid #ececf0;">Location / Address</td>
        <td style="padding: 12px 16px; font-size: 14px; color: #111; font-weight: 600; border-bottom: 1px solid #ececf0;">' . htmlspecialchars($location) . '</td>
      </tr>' : '') . '
      <tr>
        <td style="padding: 12px 16px; font-size: 13px; color: #666; font-weight: 600; border-bottom: 1px solid #ececf0;">Email Address</td>
        <td style="padding: 12px 16px; font-size: 14px; color: #7615d9; font-weight: 700; border-bottom: 1px solid #ececf0;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #7615d9; text-decoration: none;">' . htmlspecialchars($email) . '</a></td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; font-size: 13px; color: #666; font-weight: 600; border-bottom: 1px solid #ececf0;">Phone / WhatsApp</td>
        <td style="padding: 12px 16px; font-size: 14px; color: #111; font-weight: 700; border-bottom: 1px solid #ececf0;"><a href="tel:' . htmlspecialchars($phone) . '" style="color: #111; text-decoration: none;">' . htmlspecialchars($phone) . '</a></td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; font-size: 13px; color: #666; font-weight: 600; border-bottom: 1px solid #ececf0;">Selected Program Track</td>
        <td style="padding: 12px 16px; font-size: 14px; color: #111; font-weight: 700; border-bottom: 1px solid #ececf0;">' . htmlspecialchars($trackTitle) . ' (' . htmlspecialchars($trackCode) . ')</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; font-size: 13px; color: #666; font-weight: 600; border-bottom: 1px solid #ececf0;">Current Background</td>
        <td style="padding: 12px 16px; font-size: 14px; color: #111; font-weight: 600; border-bottom: 1px solid #ececf0;">' . htmlspecialchars($experience) . '</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; font-size: 13px; color: #666; font-weight: 600;">Submission Time</td>
        <td style="padding: 12px 16px; font-size: 13px; color: #555;">' . htmlspecialchars($applicationTime) . '</td>
      </tr>
    </table>

    <div style="margin-top: 24px; display: flex; gap: 12px;">
      <a href="https://wa.me/' . $cleanPhone . '?text=' . urlencode("Hi {$name}, thank you for applying to Design Academy by Sanfollx for {$trackTitle}!") . '" style="display: inline-block; background: #22b8a5; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 20px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
        Contact on WhatsApp
      </a>
      <a href="mailto:' . htmlspecialchars($email) . '?subject=' . urlencode("Design Academy Admission Update: {$name}") . '" style="display: inline-block; background: #1e1d24; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 20px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.5px; margin-left: 8px;">
        Reply via Email
      </a>
    </div>
  </div>

  <div style="background: #fafafc; padding: 16px 28px; border-top: 1px solid #ececf0; font-size: 12px; color: #888; text-align: center;">
    Design Academy by Sanfollx Initiatives · Pattambi, Kerala
  </div>
</div>';

// 3. Student Thank You Note HTML
$thankYouEmailHtml = '
<div style="font-family: \'Plus Jakarta Sans\', -apple-system, BlinkMacSystemFont, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e2e8; border-radius: 16px; overflow: hidden;">
  <div style="background: linear-gradient(135deg, #1e1d24 0%, #3e6fd8 50%, #7615d9 100%); padding: 32px 28px; color: #ffffff; text-align: center;">
    <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px; font-weight: 700; color: #22b8a5;">Design Academy by Sanfollx</p>
    <h1 style="margin: 10px 0 0 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">Thank You for Your Application!</h1>
  </div>

  <div style="padding: 32px 28px;">
    <p style="font-size: 16px; color: #1e1d24; line-height: 1.6; margin-top: 0;">
      Hello <strong>' . htmlspecialchars($name) . '</strong>,
    </p>
    <p style="font-size: 15px; color: #444; line-height: 1.6;">
      We have successfully received your application for the <strong>' . htmlspecialchars($trackTitle) . '</strong> track (<strong>' . htmlspecialchars($trackCode) . '</strong>) at our offline studio in Pattambi.
    </p>

    <div style="background: #fafafc; border-left: 4px solid #7615d9; padding: 18px 20px; margin: 24px 0; border-radius: 0 12px 12px 0;">
      <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #1e1d24;">What Happens Next?</p>
      <ol style="margin: 0; padding-left: 18px; font-size: 13.5px; color: #555; line-height: 1.6;">
        <li style="margin-bottom: 6px;"><strong>Admissions Review:</strong> Our mentor team will review your creative background.</li>
        <li style="margin-bottom: 6px;"><strong>Counseling Call:</strong> We will reach out via WhatsApp or phone (<strong>' . htmlspecialchars($phone) . '</strong>) within 24 hours.</li>
        <li><strong>Seat Allotment:</strong> We will discuss batch timings, offline studio walkthrough, and syllabus details.</li>
      </ol>
    </div>

    <div style="margin: 28px 0; padding: 18px; border: 1px dashed rgba(38,37,42,0.2); border-radius: 12px; background: #ffffff; text-align: center;">
      <p style="margin: 0 0 12px 0; font-size: 13px; color: #666;">Need immediate admission assistance or want to visit the studio?</p>
      <a href="https://wa.me/919846474143?text=' . urlencode("Hi Design Academy, I just applied ({$name} - {$trackTitle}). I'd like to check batch updates!") . '" style="display: inline-block; background: #22b8a5; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
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
</div>';

// 4. Robust Email Dispatch Function
function send_email_message($to, $subject, $html_content, $reply_to = null) {
    $smtp_host = 'ssl://smtp.hostinger.com';
    $smtp_port = 465;
    $smtp_user = 'academy@sanfollxinitiatives.com';
    $smtp_pass = 'Since2026!';
    $from_email = 'academy@sanfollxinitiatives.com';
    $from_name = 'Design Academy by Sanfollx';

    // Try Direct Hostinger SMTP Socket connection
    $socket = @fsockopen($smtp_host, $smtp_port, $errno, $errstr, 5);
    if ($socket) {
        $read = function($sock) {
            $data = '';
            while ($str = fgets($sock, 515)) {
                $data .= $str;
                if (substr($str, 3, 1) === ' ') break;
            }
            return $data;
        };
        $write = function($sock, $cmd) {
            fputs($sock, $cmd . "\r\n");
        };

        $read($socket);
        $write($socket, 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'));
        $read($socket);
        $write($socket, 'AUTH LOGIN');
        $read($socket);
        $write($socket, base64_encode($smtp_user));
        $read($socket);
        $write($socket, base64_encode($smtp_pass));
        $auth_res = $read($socket);

        if (strpos($auth_res, '235') !== false) {
            $write($socket, 'MAIL FROM:<' . $from_email . '>');
            $read($socket);
            $write($socket, 'RCPT TO:<' . $to . '>');
            $read($socket);
            $write($socket, 'DATA');
            $read($socket);

            $headers = "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
            $headers .= "From: {$from_name} <{$from_email}>\r\n";
            $headers .= "To: <{$to}>\r\n";
            $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
            if ($reply_to) {
                $headers .= "Reply-To: {$reply_to}\r\n";
            }
            $headers .= "Date: " . date('r') . "\r\n";

            $write($socket, $headers . "\r\n" . $html_content . "\r\n.");
            $data_res = $read($socket);
            $write($socket, 'QUIT');
            fclose($socket);

            if (strpos($data_res, '250') !== false) {
                return true;
            }
        } else {
            fclose($socket);
        }
    }

    // Fallback: Native PHP mail() with Hostinger mail agent
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: {$from_name} <{$from_email}>\r\n";
    if ($reply_to) {
        $headers .= "Reply-To: {$reply_to}\r\n";
    }
    $headers .= "X-Mailer: PHP/" . phpversion();

    return @mail($to, $subject, $html_content, $headers, "-f{$from_email}");
}

// 5. Send to Admissions
$leadSent = send_email_message(
    'designacademybysanfollx@gmail.com',
    "⚡ New Student Application: {$name} – {$trackTitle} ({$trackCode})",
    $leadEmailHtml,
    "\"{$name}\" <{$email}>"
);

// 6. Send to Student
$studentSent = send_email_message(
    $email,
    "Welcome to Design Academy by Sanfollx – Application Received",
    $thankYouEmailHtml,
    "Design Academy <designacademybysanfollx@gmail.com>"
);

echo json_encode([
    'success' => true,
    'leadTarget' => 'designacademybysanfollx@gmail.com',
    'studentEmail' => $email,
    'leadEmailDispatched' => $leadSent,
    'thankYouEmailDispatched' => $studentSent
]);
