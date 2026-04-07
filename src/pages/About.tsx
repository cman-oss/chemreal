import React from 'react';
import { motion } from 'motion/react';
import { Beaker, Globe, Shield, Users, Target, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <header className="mb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6">
          Our <span className="text-accent-emerald">Mission</span>
        </h1>
        <p className="text-xl text-zinc-muted max-w-3xl mx-auto font-medium leading-relaxed">
          ChemXGen was founded with a singular purpose: to bridge the gap between complex molecular science and the digital requirements of modern global commerce.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
        <div className="glass-panel rounded-[2.5rem] p-10 border border-zinc-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-emerald/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6 flex items-center">
            <Target className="w-6 h-6 mr-3 text-accent-emerald" />
            The Vision
          </h2>
          <p className="text-zinc-muted leading-relaxed font-medium">
            We envision a world where chemical supply chains are fully transparent, inherently safe, and digitally traceable. By leveraging advanced AI and molecular intelligence, we empower companies to make better decisions for their business and the planet.
          </p>
        </div>

        <div className="glass-panel rounded-[2.5rem] p-10 border border-zinc-border relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6 flex items-center">
            <Award className="w-6 h-6 mr-3 text-blue-500" />
            Our Values
          </h2>
          <p className="text-zinc-muted leading-relaxed font-medium">
            Scientific integrity, radical transparency, and technological excellence drive everything we do. We believe that compliance shouldn't be a burden, but a competitive advantage in the transition to a circular economy.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Global Impact</h2>
          <div className="h-1 w-20 bg-accent-emerald mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Countries Served", value: "45+", icon: Globe },
            { label: "Active Nodes", value: "1,200+", icon: Shield },
            { label: "Research Partners", value: "85+", icon: Beaker },
            { label: "Industry Experts", value: "250+", icon: Users },
          ].map((stat, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-3xl border border-zinc-border text-center group hover:border-accent-emerald/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-industrial-900 border border-zinc-border flex items-center justify-center mx-auto mb-6 group-hover:emerald-glow transition-all">
                <stat.icon className="w-6 h-6 text-accent-emerald" />
              </div>
              <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-[10px] font-black text-zinc-muted uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
