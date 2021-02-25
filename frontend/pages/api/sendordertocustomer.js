const sgMail = require('@sendgrid/mail');

export function makeContactEmailHTML(name, id) {
  return `
  <div className="email" style="border: 1px solid black; padding: 20px; font-family: sans-serif; line-height: 2; font-size: 20px;">
    <p>Thanks, ${name} for your order from EP Workshop!</p>
    <p><a href="https://www.epworkshop.com/order/${id}">Click here to view your order details</a></p>
    <p>You will receive another email when your order ships.</p>
  </div>
  `;
}

export default async function (req, res) {
  sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

  const msg = {
    to: req.body.user.email,
    from: 'noreply@epworkshop.com',
    replyTo: req.body.user.email || '',
    subject: 'Your Order Confirmation from EP Workshop',
    text: `Thanks ${req.body.user.name}!\n\nOrder Details: https://www.epworkshop.com/order/${req.body.data.id}\nYou will receive another email when your order ships.`,
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
