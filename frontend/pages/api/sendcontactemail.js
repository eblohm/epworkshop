const sgMail = require('@sendgrid/mail');

export function makeContactEmailHTML(name, email, message, reason) {
  return `
  <div className="email" style="border: 1px solid black; padding: 20px; font-family: sans-serif; line-height: 2; font-size: 20px;">
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
    <p>Reason For Contacting Us: ${reason}</p>
    <p>Message: ${message}</p>
  </div>
  `;
}

export default async function (req, res) {
  sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

  const msg = {
    to: [
      'eric@epworkshop.com',
      'phil@epworkshop.com',
      'contact@epworkshop.com',
    ],
    from: 'noreply@epworkshop.com',
    replyTo: req.body.email || '',
    subject: 'New Contact Submission from EP Workshop',
    text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nReason for Contacting: ${req.body.reason}\nMessage: ${req.body.message}`,
    html: makeContactEmailHTML(
      req.body.name,
      req.body.email,
      req.body.message,
      req.body.reason
    ),
  };

  try {
    await sgMail.send(msg);
    res.status(200).send('Message sent successfully.');
  } catch (error) {
    console.error(`ERROR: ${error}`);
    res.status(400).send('Message not sent.');
  }
}
