import React from 'react';
import { motion } from 'motion/react';
import { FileText, CheckCircle, AlertCircle, Shield, Scale } from 'lucide-react';

export const Terms: React.FC = () => {
  const sections = [
    { title: "Acceptance of Terms", content: "By accessing or using the ChemXGen platform, you agree to be bound by these Terms of Service and all applicable laws and regulations." },
    { title: "Use License", content: "Permission is granted to temporarily download one copy of the materials (information or software) on ChemXGen Systems Inc.'s website for personal, non-commercial transitory viewing only." },
    { title: "Disclaimer", content: "The materials on ChemXGen Systems Inc.'s website are provided on an 'as is' basis. ChemXGen Systems Inc. makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights." },
    { title: "Limitations", content: "In no event shall ChemXGen Systems Inc. or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ChemXGen Systems Inc.'s website." },
    { title: "Governing Law", content: "These terms and conditions are governed by and construed in accordance with the laws of California and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location." },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <header className="mb-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center mx-auto mb-8 emerald-glow">
          <Scale className="w-10 h-10 text-accent-emerald" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6">
          Terms of <span className="text-accent-emerald">Service</span>
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
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">Need Legal Help?</h2>
        <p className="text-zinc-muted font-medium mb-8">
          If you have any questions about these terms, please contact our legal department.
        </p>
        <a href="mailto:legal@chemxgen.io" className="inline-flex items-center px-10 py-4 bg-accent-emerald text-industrial-950 font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-emerald-400 transition-all emerald-glow">
          Contact Legal
        </a>
      </div>
    </div>
  );
};
