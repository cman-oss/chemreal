import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText, CheckCircle } from 'lucide-react';

export const Privacy: React.FC = () => {
  const sections = [
    { title: "Data Collection", content: "We collect only the necessary information to provide our chemical intelligence services, including user credentials and chemical inventory data provided by your organization." },
    { title: "Data Usage", content: "Your data is used exclusively for regulatory analysis, compliance monitoring, and providing AI-driven substitution recommendations. We do not sell your data to third parties." },
    { title: "Data Security", content: "All data is encrypted at rest and in transit using industry-standard AES-256 and TLS 1.3 protocols. Our infrastructure is hosted in SOC 2 Type II compliant data centers." },
    { title: "Your Rights", content: "You have the right to access, correct, or delete your data at any time. For enterprise accounts, data retention policies can be customized to meet your internal compliance requirements." },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <header className="mb-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center mx-auto mb-8 emerald-glow">
          <Shield className="w-10 h-10 text-accent-emerald" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6">
          Privacy <span className="text-accent-emerald">Policy</span>
        </h1>
        <p className="text-xl text-zinc-muted font-medium leading-relaxed">
          Last updated: April 7, 2026
        </p>
      </header>

      <div className="space-y-12 mb-32">
        {sections.map((section, idx) => (
          <div key={idx} className="glass-panel rounded-[2.5rem] p-10 border border-zinc-border relative overflow-hidden">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6 flex items-center">
              <div className="w-8 h-8 rounded-xl bg-industrial-900 border border-zinc-border flex items-center justify-center mr-4">
                <span className="text-xs font-black text-accent-emerald">{idx + 1}</span>
              </div>
              {section.title}
            </h2>
            <p className="text-zinc-muted leading-relaxed font-medium">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-[3rem] p-12 border border-zinc-border text-center relative overflow-hidden">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">Questions?</h2>
        <p className="text-zinc-muted font-medium mb-8">
          If you have any questions about our privacy practices, please contact our Data Protection Officer.
        </p>
        <a href="mailto:privacy@chemxgen.io" className="inline-flex items-center px-10 py-4 bg-accent-emerald text-industrial-950 font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-emerald-400 transition-all emerald-glow">
          Contact DPO
        </a>
      </div>
    </div>
  );
};
