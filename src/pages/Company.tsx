import React from 'react';
import { motion } from 'motion/react';
import { Building, Globe, MapPin, Briefcase, Mail, Phone, ExternalLink } from 'lucide-react';

export const Company: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <header className="mb-20">
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6">
          The <span className="text-accent-emerald">Company</span>
        </h1>
        <p className="text-xl text-zinc-muted max-w-3xl font-medium leading-relaxed">
          ChemXGen Systems Inc. is a leading provider of molecular intelligence and digital compliance solutions for the global chemical industry.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
        <div className="lg:col-span-2 space-y-12">
          <div className="glass-panel rounded-[2.5rem] p-10 border border-zinc-border relative overflow-hidden">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8 flex items-center">
              <Building className="w-6 h-6 mr-3 text-accent-emerald" />
              Corporate Profile
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="text-[10px] font-black text-zinc-muted uppercase tracking-widest">Founded</div>
                <div className="text-lg font-bold text-white">2022</div>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] font-black text-zinc-muted uppercase tracking-widest">Headquarters</div>
                <div className="text-lg font-bold text-white">San Francisco, CA</div>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] font-black text-zinc-muted uppercase tracking-widest">Legal Entity</div>
                <div className="text-lg font-bold text-white">ChemXGen Systems Inc.</div>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] font-black text-zinc-muted uppercase tracking-widest">Status</div>
                <div className="text-lg font-bold text-accent-emerald flex items-center">
                  <div className="w-2 h-2 rounded-full bg-accent-emerald mr-2 animate-pulse"></div>
                  Active Operations
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[2.5rem] p-10 border border-zinc-border relative overflow-hidden">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8 flex items-center">
              <MapPin className="w-6 h-6 mr-3 text-accent-emerald" />
              Global Presence
            </h2>
            <div className="space-y-6">
              {[
                { city: "San Francisco", region: "North America", type: "HQ & Engineering" },
                { city: "Berlin", region: "Europe", type: "Regulatory & Compliance" },
                { city: "Singapore", region: "Asia-Pacific", type: "Supply Chain Operations" },
              ].map((office, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-industrial-950/50 rounded-2xl border border-zinc-border">
                  <div>
                    <div className="text-white font-bold uppercase tracking-tight">{office.city}</div>
                    <div className="text-[10px] text-zinc-muted font-black uppercase tracking-widest">{office.region}</div>
                  </div>
                  <div className="text-[10px] font-black text-accent-emerald uppercase tracking-widest border border-accent-emerald/20 px-3 py-1 rounded-full">
                    {office.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-panel rounded-[2.5rem] p-10 border border-zinc-border relative overflow-hidden">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8">Contact</h3>
            <div className="space-y-6">
              <a href="mailto:info@chemxgen.io" className="flex items-center gap-4 text-zinc-muted hover:text-accent-emerald transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-industrial-900 border border-zinc-border flex items-center justify-center group-hover:emerald-glow transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold">info@chemxgen.io</span>
              </a>
              <div className="flex items-center gap-4 text-zinc-muted group">
                <div className="w-10 h-10 rounded-xl bg-industrial-900 border border-zinc-border flex items-center justify-center group-hover:emerald-glow transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold">+1 (888) CHEMXGEN</span>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[2.5rem] p-10 border border-zinc-border relative overflow-hidden">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8">Careers</h3>
            <p className="text-xs text-zinc-muted leading-relaxed mb-6">
              Join our team of scientists, engineers, and regulatory experts in building the future of chemical intelligence.
            </p>
            <button className="w-full py-4 bg-accent-emerald text-industrial-950 font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center">
              View Open Positions
              <ExternalLink className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
