import React from 'react';
import { motion } from 'motion/react';
import { Code, Key, Globe, Shield, Copy, Check, Terminal } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const ApiAccess: React.FC = () => {
  const [apiKey] = useState('cx_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    toast.success('API Key copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-3">API Access</h1>
        <p className="text-zinc-muted font-medium">Integrate ChemXGen intelligence directly into your laboratory workflows.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* API Key Section */}
          <div className="glass-panel rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-emerald/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <h2 className="text-xl font-bold text-white mb-6 flex items-center uppercase tracking-wider">
              <Key className="w-5 h-5 mr-3 text-accent-emerald" />
              Production Credentials
            </h2>

            <div className="bg-industrial-950 border border-zinc-border rounded-2xl p-6 flex items-center justify-between group">
              <div className="font-mono text-accent-emerald text-sm break-all">
                {apiKey}
              </div>
              <button 
                onClick={copyToClipboard}
                className="ml-4 p-3 bg-industrial-900 border border-zinc-border hover:border-accent-emerald/50 rounded-xl transition-all text-zinc-muted hover:text-accent-emerald"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <p className="mt-4 text-[10px] text-zinc-muted uppercase tracking-widest font-bold">
              Keep this key secure. Do not share it in public repositories.
            </p>
          </div>

          {/* Documentation Snippet */}
          <div className="glass-panel rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center uppercase tracking-wider">
              <Terminal className="w-5 h-5 mr-3 text-accent-emerald" />
              Quick Start
            </h2>

            <div className="bg-industrial-950 rounded-2xl p-6 font-mono text-sm overflow-x-auto border border-zinc-border">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <pre className="text-slate-300">
{`curl -X POST https://api.chemxgen.io/v1/synthesis \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "compound": "Caffeine",
    "priority": "high",
    "webhook_url": "https://your-lab.com/webhooks"
  }'`}
              </pre>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-8 border-accent-emerald/20">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">API Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-muted font-bold uppercase tracking-widest">Synthesis Engine</span>
                <div className="flex items-center text-accent-emerald text-[10px] font-black uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-accent-emerald mr-2 animate-pulse"></div>
                  Operational
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-muted font-bold uppercase tracking-widest">Regulatory Radar</span>
                <div className="flex items-center text-accent-emerald text-[10px] font-black uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-accent-emerald mr-2 animate-pulse"></div>
                  Operational
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-muted font-bold uppercase tracking-widest">DPP Registry</span>
                <div className="flex items-center text-accent-emerald text-[10px] font-black uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-accent-emerald mr-2 animate-pulse"></div>
                  Operational
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">Rate Limits</h3>
            <p className="text-xs text-zinc-muted leading-relaxed mb-6">
              Your current tier allows for <span className="text-white font-bold">1,000 requests/hour</span>. Upgrade to Enterprise for unlimited throughput.
            </p>
            <button className="w-full py-3 bg-industrial-900 border border-zinc-border hover:border-accent-emerald/50 rounded-xl text-[10px] font-black text-white uppercase tracking-widest transition-all">
              View Usage Metrics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
