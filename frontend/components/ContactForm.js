import React, { useState } from 'react';
import styled from 'styled-components';
import useForm from '../lib/useForm';

const ContactFormStyles = styled.form`
  width: 300px;
  margin: 0 auto;

  h2 {
    text-align: center;
  }

  fieldset {
    border: none;

    label {
      display: block;
      margin-bottom: 2rem;

      &.first-label {
        margin-top: 2rem;
      }

      span {
        display: inline-block;
        margin-bottom: 0.5rem;
      }
    }

    input,
    select,
    textarea {
      display: block;
      font-family: 'Gotham Pro', sans-serif;
      font-size: 1.4rem;
      max-width: 300px;
      padding: 0.5rem;
      width: 100%;
    }

    input,
    textarea {
      border: 1px solid var(--grey);
      border-radius: 5px;
    }

    textarea {
      height: 100px;
      resize: none;
    }

    button {
      background-color: var(--black);
      border-radius: 2px;
      border: none;
      color: var(--white);
      font-size: 1.6rem;
      padding: 1rem;
    }
  }
`;

function ContactForm() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: '',
    email: '',
    message: '',
    reason: 'General Inquiry',
  });

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const handleResponse = (status, msg) => {
    if (status === 200) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg },
      });
      clearForm();
    } else {
      setStatus({
        info: { error: true, msg },
      });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    // Send the email
    const res = await fetch('/api/sendcontactemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    const text = await res.text;
    handleResponse(res.status, text);
    resetForm();
  }

  const contactReasons = [
    'General Inquiry',
    'Custom Work',
    'Help With An Order',
  ];

  return (
    <>
      {!status.info.error && status.info.msg && (
        <p>Thanks for contacting us! We will get in touch with you shortly.</p>
      )}
      {status.info.error && (
        <p>There was an error sending your message, please try again.</p>
      )}
      {!status.info.error && !status.info.msg && (
        <ContactFormStyles method="post" onSubmit={handleSubmit}>
          <fieldset disabled={status.submitting} aria-busy={status.submitting}>
            <h2>Contact Us</h2>
            <label className="first-label" htmlFor="name">
              <span>Name</span>
              <input
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="name"
                value={inputs.name}
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="email">
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                autoComplete="email"
                value={inputs.email}
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="reason">
              <span>Reason For Contacting Us:</span>
              <select
                name="reason"
                value={inputs.reason}
                onChange={handleChange}
                required
              >
                {contactReasons.map((contactReason) => (
                  <option key={contactReason} value={contactReason}>
                    {contactReason}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="message">
              <span>Message</span>
              <textarea
                name="message"
                placeholder="Message"
                value={inputs.message}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Send Message</button>
          </fieldset>
        </ContactFormStyles>
      )}
    </>
  );
}

export default ContactForm;
