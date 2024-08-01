import React from 'react';
import './FAQ.css'; // Import the CSS file for styles

const FAQ = () => {
  const faqs = [
    {
      question: 'How do I book a turf?',
      answer: 'You can book a turf by visiting our website and filling out the booking form.',
    },
    {
      question: 'What are the booking hours?',
      answer: 'Our booking hours are from 9:00 AM to 9:00 PM, Monday to Sunday.',
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking up to 24 hours before your scheduled time.',
    },
    {
      question: 'Is there a deposit required?',
      answer: 'Yes, we require a deposit to confirm your booking. The amount varies based on the duration and time of booking.',
    },
  ];

  return (
    <div className="faq">
      <h2>FAQ - Turf Booking</h2>
      <ul className="faq-list">
        {faqs.map((faq, index) => (
          <li key={index} className="faq-item">
            <button className="faq-question">{faq.question}</button>
            <div className="faq-answer">{faq.answer}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
