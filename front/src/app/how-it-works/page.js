'use client';

import { Heart, Coins, Handshake, ArrowRight, UserPlus, Search, Star, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    step: '01',
    icon: UserPlus,
    title: 'Create Your Account',
    desc: 'Sign up with your name and location. Tell the community what skills you can offer — whether it\'s healthcare, repairs, construction, or anything else.',
    details: ['Set your location', 'List your skills', 'Start exchanging services'],
    color: 'from-emerald-500 to-teal-600',
    iconColor: '#059669',
  },
  {
    step: '02',
    icon: Heart,
    title: 'Offer Your Skills',
    desc: 'Post the services you can provide. Set your availability and let the community know how you can help. Every skill matters — from surgery to sewing.',
    details: ['Describe your service', 'Set availability', 'Points auto-assigned by category'],
    color: 'from-rose-500 to-pink-600',
    iconColor: '#e11d48',
  },
  {
    step: '03',
    icon: Coins,
    title: 'Earn Points',
    desc: 'When you help someone, you earn points based on the service category and complexity. Points are fair and reflect real-world value inspired by salary standards.',
    details: ['Healthcare: 50 pts', 'Home Repairs: 30 pts', 'Technology: 45 pts', 'Education: 25 pts'],
    color: 'from-amber-500 to-orange-600',
    iconColor: '#d97706',
  },
  {
    step: '04',
    icon: Search,
    title: 'Find Help You Need',
    desc: 'Browse services offered by other community members. Filter by category, location, and availability. Find exactly the help you need.',
    details: ['Search by category', 'Filter by location', 'View provider ratings'],
    color: 'from-blue-500 to-indigo-600',
    iconColor: '#2563eb',
  },
  {
    step: '05',
    icon: Handshake,
    title: 'Request & Connect',
    desc: 'Use your earned points to request a service. The provider accepts your request, and you connect directly to arrange the details.',
    details: ['Send a request', 'Provider accepts', 'Arrange time & place'],
    color: 'from-violet-500 to-purple-600',
    iconColor: '#7c3aed',
  },
  {
    step: '06',
    icon: Star,
    title: 'Rate & Review',
    desc: 'After the service is completed, both sides rate and review the experience. This keeps the community trustworthy and helps others find quality help.',
    details: ['Rate the service', 'Leave a review', 'Build your reputation'],
    color: 'from-cyan-500 to-teal-600',
    iconColor: '#0891b2',
  },
];

export default function HowItWorksPage() {
  return (
    <div>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #010d06 0%, #064E3B 50%, #0d9466 100%)' }} />
        <div className="absolute inset-0 keffiyeh-pattern" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
            How <span className="bg-linear-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">Takaful</span> Works
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(167,243,210,0.8)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7 }}>
            Exchange skills with your community using points. No money needed — just your skills and willingness to help.
          </p>
        </div>
      </section>

      {/* ===================== STEPS ===================== */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container-custom">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {steps.map((item, idx) => (
              <div key={item.step} style={{ display: 'flex', gap: '32px', marginBottom: idx < steps.length - 1 ? '48px' : '0', position: 'relative' }}>
                {/* Timeline line */}
                {idx < steps.length - 1 && (
                  <div style={{ position: 'absolute', left: '31px', top: '72px', bottom: '-48px', width: '2px', background: '#e5e7eb' }} />
                )}
                {/* Icon */}
                <div style={{ flexShrink: 0 }}>
                  <div className={`bg-linear-to-br ${item.color}`} style={{ width: '64px', height: '64px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', position: 'relative', zIndex: 1 }}>
                    <item.icon style={{ width: '28px', height: '28px', color: 'white' }} />
                  </div>
                </div>
                {/* Content */}
                <div style={{ flex: 1, paddingTop: '4px' }}>
                  <div style={{ display: 'inline-block', background: '#111827', color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '6px', marginBottom: '10px' }}>
                    Step {item.step}
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.8, marginBottom: '14px' }}>{item.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {item.details.map((detail) => (
                      <span key={detail} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: item.iconColor, background: `${item.iconColor}10`, padding: '4px 10px', borderRadius: '999px', fontWeight: 500 }}>
                        <CheckCircle2 style={{ width: '12px', height: '12px' }} />
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="gradient-primary" style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="container-custom" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: 'white', marginBottom: '16px' }}>
            Ready to Start?
          </h2>
          <p style={{ color: 'rgba(167,243,208,0.8)', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.7, fontSize: '16px' }}>
            Your skills have value. Start exchanging today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/services/offer" className="btn-white" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', fontSize: '15px' }}>
              Offer Your Skills <Heart style={{ width: '16px', height: '16px' }} fill="currentColor" />
            </Link>
            <Link href="/services" style={{ color: 'white', border: '2px solid rgba(255,255,255,0.4)', padding: '14px 32px', borderRadius: '12px', fontWeight: 600, fontSize: '15px', textDecoration: 'none' }}>
              Browse Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
