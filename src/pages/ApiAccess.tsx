import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Key, Globe, Shield, Copy, Check, Terminal, Activity, BarChart3, Clock, X, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const ApiAccess: React.FC = () => {
  const [apiKey] = useState('cx_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  const [copied, setCopied] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [totalRequests, setTotalRequests] = useState(14832);
  const [successRate, setSuccessRate] = useState(99.4);
  const [avgLatency, setAvgLatency] = useState(184);
  const [recentRequests, setRecentRequests] = useState([
    { path: '/v1/synthesis', method: 'POST', status: 200, latency: 182, time: 'Just now', size: '1.2kb' },
    { path: '/v1/compliance', method: 'GET', status: 200, latency: 94, time: '14 mins ago', size: '0.8kb' },
    { path: '/v1/dpp/registry', method: 'POST', status: 201, latency: 265, time: '36 mins ago', size: '2.1kb' },
    { path: '/v1/synthesis', method: 'POST', status: 429, latency: 12, time: '1 hr ago', size: '0.1kb' },
    { path: '/v1/compliance', method: 'GET', status: 200, latency: 110, time: '2 hrs ago', size: '0.7kb' }
  ]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    toast.success('API Key copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const simulateApiCall = () => {
    const endpoints = [
      { path: '/v1/synthesis', method: 'POST', successCode: 200 },
      { path: '/v1/compliance', method: 'GET', successCode: 200 },
      { path: '/v1/dpp/registry', method: 'POST', successCode: 201 }
    ];
    const item = endpoints[Math.floor(Math.random() * endpoints.length)];
    const isError = Math.random() < 0.05; // 5% chance of ratelimit for simulation realism
    const status = isError ? 429 : item.successCode;
    const latency = Math.floor(Math.random() * 200) + (isError ? 10 : 80);
    const size = (Math.random() * 2 + 0.3).toFixed(1) + 'kb';

    setTotalRequests(prev => prev + 1);
    setAvgLatency(prev => Math.round((prev * 9 + latency) / 10)); // running average weighted
    if (isError) {
      setSuccessRate(prev => Math.max(90, Math.round((prev * 49 + 0) / 50 * 10) / 10));
    } else {
      setSuccessRate(prev => Math.min(100, Math.round((prev * 49 + 100) / 50 * 10) / 10));
    }

    const newCall = {
      path: item.path,
      method: item.method,
      status: status,
      latency: latency,
      time: 'Just now',
      size: size
    };

    setRecentRequests(prev => [newCall, ...prev.slice(0, 4)]);
    toast.success(`API simulated: ${item.method} ${item.path} returned ${status} (${latency}ms)`);
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
            <button 
              onClick={() => setShowMetrics(true)}
              className="w-full py-3 bg-accent-emerald text-industrial-950 hover:bg-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all emerald-glow"
            >
              View Usage Metrics
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Modal Overlay */}
      <AnimatePresence>
        {showMetrics && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMetrics(false)}
              className="absolute inset-0 bg-industrial-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-industrial-900 border border-zinc-border rounded-[2rem] shadow-2xl p-8 md:p-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-accent-emerald/5 blur-[100px] rounded-full pointer-events-none"></div>

              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-border/40">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent-emerald/10 border border-accent-emerald/20 rounded-xl">
                    <Activity className="w-5 h-5 text-accent-emerald animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">API Node Telemetry</h3>
                    <p className="text-[10px] font-mono text-zinc-muted uppercase tracking-widest">Real-Time Client Dashboard</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowMetrics(false)}
                  className="p-2 hover:bg-industrial-800 rounded-xl border border-transparent hover:border-zinc-border transition-all text-zinc-muted hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dashboard Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-industrial-950/60 border border-zinc-border/50 rounded-2xl p-4">
                  <span className="text-[9px] font-black text-zinc-muted uppercase tracking-widest block mb-1">Total Active Calls</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-mono font-black text-white">{totalRequests.toLocaleString()}</span>
                    <span className="text-[9px] font-mono text-accent-emerald uppercase tracking-tighter">This Month</span>
                  </div>
                </div>

                <div className="bg-industrial-950/60 border border-zinc-border/50 rounded-2xl p-4">
                  <span className="text-[9px] font-black text-zinc-muted uppercase tracking-widest block mb-1">Success Rate</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-mono font-black text-accent-emerald">{successRate}%</span>
                    <span className="text-[9px] font-mono text-zinc-muted uppercase tracking-tighter">SLA Target 99.9%</span>
                  </div>
                </div>

                <div className="bg-industrial-950/60 border border-zinc-border/50 rounded-2xl p-4">
                  <span className="text-[9px] font-black text-zinc-muted uppercase tracking-widest block mb-1">Avg Latency</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-mono font-black text-white">{avgLatency}ms</span>
                    <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-tighter">Healthy</span>
                  </div>
                </div>
              </div>

              {/* Simulation Header / Option */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 bg-accent-emerald/5 border border-accent-emerald/10 rounded-2xl">
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider mb-0.5">Simulate Network Load</h4>
                  <p className="text-[10px] text-zinc-400 leading-normal">Test pipeline throughput by sending a synthetic request immediately.</p>
                </div>
                <button
                  onClick={simulateApiCall}
                  className="w-full sm:w-auto px-6 py-2.5 bg-accent-emerald text-industrial-950 text-[10px] font-black uppercase tracking-[0.15em] rounded-xl hover:bg-emerald-400 transition-all shadow-md shrink-0 whitespace-nowrap active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Activity className="w-3.5 h-3.5" /> Inject Telemetry Call
                </button>
              </div>

              {/* Recent Requests Terminal Section */}
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-accent-emerald" /> Live Traffic Stream
                </h4>
                <div className="bg-industrial-950 rounded-2xl border border-zinc-border overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-border bg-industrial-900/40 text-[9px] font-black text-zinc-muted uppercase tracking-widest font-mono">
                        <th className="px-6 py-3">Endpoint Method</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Latency</th>
                        <th className="px-6 py-3">Size</th>
                        <th className="px-6 py-3 text-right">Age</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-border/40 font-mono text-xs text-zinc-300">
                      {recentRequests.map((req, idx) => (
                        <tr key={idx} className="hover:bg-industrial-900/20 transition-colors">
                          <td className="px-6 py-3.5 flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black ${
                              req.method === 'POST' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                            }`}>
                              {req.method}
                            </span>
                            <span className="text-white font-medium">{req.path}</span>
                          </td>
                          <td className="px-6 py-3.5">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black ${
                              req.status < 300 ? 'bg-emerald-500/10 text-accent-emerald' : 'bg-red-500/10 text-red-400'
                            }`}>
                              {req.status} {req.status === 429 ? 'LIMITED' : 'OK'}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-zinc-400 font-bold">{req.latency}ms</td>
                          <td className="px-6 py-3.5 text-zinc-500">{req.size}</td>
                          <td className="px-6 py-3.5 text-right text-zinc-muted text-[10px]">{req.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
