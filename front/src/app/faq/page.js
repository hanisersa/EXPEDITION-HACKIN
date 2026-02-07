'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqCategories = [
  {
    title: 'Getting Started',
    questions: [
      {
        q: 'What is Takaful?',
        a: 'Takaful is a community-powered skill exchange platform for Palestinians. Instead of using money, members exchange services using a points-based system. A doctor helps a teacher, a plumber helps a nurse — everyone contributes and benefits.',
      },
      {
        q: 'How do I create an account?',
        a: 'Click "Join Takaful" on the homepage, fill in your personal information, choose your location, and you\'re ready to start. It takes less than 2 minutes.',
      },
      {
        q: 'Is Takaful free to use?',
        a: 'Yes! Takaful is completely free. There are no fees or charges. The entire platform runs on a points-based exchange system — you earn points by helping others and spend them to get help.',
      },
    ],
  },
  {
    title: 'Points System',
    questions: [
      {
        q: 'How do points work?',
        a: 'Points are earned when you provide a service to someone. The number of points depends on the service category and complexity. For example, a medical consultation earns 50 points, while a tutoring session earns 25 points. You spend these points to request services from others.',
      },
      {
        q: 'How many points do I start with?',
        a: 'New members start with a welcome bonus of points so they can request their first service right away without needing to offer a service first.',
      },
      {
        q: 'How are point values determined?',
        a: 'Point values are based on the complexity and typical value of each service category, inspired by fair salary standards. Healthcare services earn more points than simpler tasks because they require more specialized skills.',
      },
      {
        q: 'Can I buy or sell points?',
        a: 'No. Points cannot be bought, sold, or traded for money. They can only be earned by providing services and spent by receiving services. This keeps the system fair for everyone.',
      },
    ],
  },
  {
    title: 'Services',
    questions: [
      {
        q: 'What kind of services can I offer?',
        a: 'Any skill you have! Healthcare, teaching, home repairs, technology, cooking, childcare, creative arts, transportation, and more. If you have a skill that can help someone, you can offer it on Takaful.',
      },
      {
        q: 'How do I request a service?',
        a: 'Browse the services page, find the service you need, and click "Request". The provider will review your request and accept it. You\'ll then coordinate the details directly.',
      },
      {
        q: 'What if a service provider doesn\'t show up?',
        a: 'If a provider doesn\'t fulfill the service, your points are refunded. You can also report the issue and we\'ll review it. Repeated no-shows lead to account restrictions.',
      },
      {
        q: 'Can I offer multiple services?',
        a: 'Absolutely! Many members offer several services based on their different skills. A teacher might also offer cooking lessons or translation services.',
      },
    ],
  },
  {
    title: 'Trust & Safety',
    questions: [
      {
        q: 'How do I know I can trust a provider?',
        a: 'Every member has a public profile with ratings and reviews from past service exchanges. You can see their rating, number of completed services, and read reviews before requesting help.',
      },
      {
        q: 'What if I have a problem with a service?',
        a: 'You can rate and review every service exchange. If there\'s a serious issue, contact our support team and we\'ll mediate the situation and take appropriate action.',
      },
      {
        q: 'Is my personal information safe?',
        a: 'Yes. We take privacy seriously. Your personal details are only shared with service providers when you initiate a request. We never sell or share your data with third parties.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({});

  const toggle = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #010d06 0%, #064E3B 50%, #0d9466 100%)' }} />
        <div className="absolute inset-0 keffiyeh-pattern" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10" style={{ textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <HelpCircle style={{ width: '28px', height: '28px', color: '#6ee7b7' }} />
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
            Frequently Asked <span className="bg-linear-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">Questions</span>
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(167,243,210,0.8)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Everything you need to know about Takaful and how the platform works.
          </p>
        </div>
      </section>

      {/* ===================== FAQ CONTENT ===================== */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container-custom" style={{ maxWidth: '800px' }}>
          {faqCategories.map((category) => (
            <div key={category.title} style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid #e5e7eb' }}>
                {category.title}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {category.questions.map((item) => {
                  const key = `${category.title}-${item.q}`;
                  const isOpen = openItems[key];
                  return (
                    <div key={key} style={{ border: '1px solid #f3f4f6', borderRadius: '14px', overflow: 'hidden', background: isOpen ? '#f9fafb' : 'white', transition: 'all 0.2s' }}>
                      <button
                        onClick={() => toggle(key)}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '16px 20px', border: 'none', background: 'transparent',
                          cursor: 'pointer', textAlign: 'left', gap: '12px',
                        }}
                      >
                        <span style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>{item.q}</span>
                        <ChevronDown style={{
                          width: '18px', height: '18px', color: '#9ca3af', flexShrink: 0,
                          transition: 'transform 0.2s',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }} />
                      </button>
                      {isOpen && (
                        <div style={{ padding: '0 20px 16px', fontSize: '14px', color: '#6b7280', lineHeight: 1.8 }}>
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
