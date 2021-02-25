const sgMail = require('@sendgrid/mail');

export function makeContactEmailHTML(name, id) {
  return `
  <div className="email" style="border: 1px solid black; padding: 20px; font-family: sans-serif; line-height: 2; font-size: 20px;">
    <p>New order from EP Workshop!</p>
    <p>Ordered By: ${name}</p>
    <p>Order ID: ${id}</p>
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
    replyTo: req.body.user.email || '',
    subject: 'New Order from EP Workshop',
    text: `Name: ${req.body.user.name}\nEmail: ${req.body.user.email}\nOrder ID: ${req.body.data.id}.`,
    html: makeContactEmailHTML(req.body.user.name, req.body.data.id),
  };

  try {
    await sgMail.send(msg);
    res.status(200).send('Message sent successfully.');
  } catch (error) {
    console.error(`ERROR: ${error}`);
    res.status(400).send('Message not sent.');
  }
}
