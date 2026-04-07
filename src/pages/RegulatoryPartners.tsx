import React from 'react';
import { motion } from 'motion/react';
import { Shield, Globe, FileText, CheckCircle, ExternalLink, Database } from 'lucide-react';

export const RegulatoryPartners: React.FC = () => {
  const partners = [
    { name: "ECHA", full: "European Chemicals Agency", region: "Europe", type: "REACH, CLP, BPR" },
    { name: "EPA", full: "Environmental Protection Agency", region: "North America", type: "TSCA, FIFRA" },
    { name: "OECD", full: "Organisation for Economic Co-operation", region: "Global", type: "Chemical Safety" },
    { name: "UN GHS", full: "Globally Harmonized System", region: "Global", type: "Classification & Labelling" },
    { name: "METI", full: "Ministry of Economy, Trade and Industry", region: "Asia-Pacific", type: "CSCL" },
    { name: "K-REACH", full: "South Korea REACH", region: "Asia-Pacific", type: "Chemical Control" },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <header className="mb-20">
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6">
          Regulatory <span className="text-accent-emerald">Partners</span>
        </h1>
        <p className="text-xl text-zinc-muted max-w-3xl font-medium leading-relaxed">
          ChemXGen maintains deep integrations with global regulatory frameworks to ensure real-time compliance and data accuracy.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {partners.map((partner, idx) => (
          <div key={idx} className="glass-panel rounded-3xl p-8 border border-zinc-border group hover:border-accent-emerald/30 transition-all">
            <div className="flex items-center justify-between mb-8">
              <div className="w-14 h-14 rounded-2xl bg-industrial-900 border border-zinc-border flex items-center justify-center text-accent-emerald font-black text-xl group-hover:emerald-glow transition-all">
                {partner.name}
              </div>
              <div className="text-[10px] font-black text-zinc-muted uppercase tracking-widest border border-zinc-border px-3 py-1 rounded-full">
                {partner.region}
              </div>
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">{partner.full}</h3>
            <p className="text-xs text-zinc-muted font-medium mb-6">{partner.type}</p>
            <div className="pt-6 border-t border-zinc-border flex items-center justify-between">
              <div className="flex items-center text-accent-emerald text-[10px] font-black uppercase tracking-widest">
                <CheckCircle className="w-3 h-3 mr-2" />
                Verified Node
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-muted hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-[3rem] p-12 border border-zinc-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-emerald/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-24 h-24 rounded-3xl bg-industrial-900 border border-zinc-border flex items-center justify-center shrink-0">
            <Database className="w-12 h-12 text-accent-emerald" />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Real-Time Data Synchronization</h2>
            <p className="text-zinc-muted font-medium leading-relaxed">
              Our platform synchronizes with global regulatory databases every 15 minutes, ensuring that your inventory is always checked against the most recent watchlists and restrictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
