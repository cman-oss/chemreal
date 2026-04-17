import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, User, ArrowRight, Zap, ShieldCheck, Layers, Beaker, ArrowLeft, Clock, Tag } from 'lucide-react';
import { Link, useParams } from 'react-router';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  categories: string[];
  image: string;
  content: React.ReactNode;
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "the-molecular-pivot-navigating-compliance",
    title: "The Molecular Pivot: Navigating Compliance",
    excerpt: "How the shift from simple inhibition to strategic elimination reflects a broader evolution in industrial chemistry.",
    date: "Oct 24, 2026",
    author: "Dr. Julian Vane",
    readTime: "12 MIN READ",
    categories: ["Chemical Compliance", "AI in Manufacturing"],
    image: "https://picsum.photos/seed/chemistry/1200/800",
    content: (
      <div className="space-y-12">
        <section className="space-y-6">
          <p className="text-xl text-slate-300 leading-relaxed font-medium italic border-l-4 border-accent-emerald pl-8">
            "The shift from simple inhibition to strategic elimination reflects a broader evolution in drug discovery: the rise of new therapeutic modalities, where controlling a protein’s fate offers new ways to tune cellular signaling with greater precision."
          </p>
          <p className="text-lg text-zinc-muted leading-relaxed">
            This observation, recently highlighted in the context of BRAF inhibitors and targeted protein degradation, captures a fundamental truth that extends far beyond the pharmaceutical lab. In the world of industrial manufacturing, we are facing a similar "paradoxical activation." As global regulations like REACH and TSCA tighten, traditional methods of "inhibiting" risk—through manual audits and reactive reporting—are no longer sufficient. They often lead to a "paradoxical" increase in operational complexity and supply chain fragility.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-4">
            <ShieldCheck className="w-8 h-8 text-accent-emerald" />
            The Regulatory Maze: Why Monitoring Isn't Enough
          </h2>
          <p className="text-lg text-zinc-muted leading-relaxed">
            Just as Dabrafenib marked a major step in targeted therapy but carried the caveat of paradoxical MAPK activation, modern chemical monitoring tools often provide a false sense of security. Identifying that a substance is "Banned" or "Restricted" is only the first step. The real challenge lies in the <strong>Pathway Fidelity</strong> of your supply chain. 
          </p>
          <div className="glass-panel p-8 rounded-3xl border border-zinc-border bg-industrial-900/50">
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4">Case Study: The PFAS "Forever Chemical" Pivot</h4>
            <p className="text-sm text-zinc-muted leading-relaxed mb-6">
              When the EPA announced new health advisories for PFOA and PFOS, many manufacturers found themselves in a state of paralysis. Their monitoring systems flagged the risk, but their operational systems had no "Elimination Strategy."
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-industrial-950 p-4 rounded-xl border border-zinc-border">
                <div className="text-[10px] font-bold text-red-500 uppercase mb-1">Traditional Approach</div>
                <p className="text-xs text-zinc-muted">Manual tracking, reactive substitution, high risk of non-compliance "leakage."</p>
              </div>
              <div className="bg-industrial-950 p-4 rounded-xl border border-accent-emerald/20">
                <div className="text-[10px] font-bold text-accent-emerald uppercase mb-1">ChemXgen Approach</div>
                <p className="text-xs text-zinc-muted">Real-time Radar Monitoring paired with AI-driven substitution matching.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-4">
            <Zap className="w-8 h-8 text-amber-500" />
            From Restriction to Innovation: The Substitution Strategy
          </h2>
          <p className="text-lg text-zinc-muted leading-relaxed">
            At ChemXgen, we view modality selection as a strategic lever. Our <strong>AI Substitution Engine</strong> doesn't just look for a "similar" molecule; it looks for a functional twin that avoids the regulatory "off-target effects" of the original substance.
          </p>
          <p className="text-lg text-zinc-muted leading-relaxed">
            This mirrors the shift from traditional inhibitors to PROTAC degraders. Instead of just blocking the regulatory risk, we help you remove it entirely from your molecular architecture. By analyzing functional properties, match percentages, and sustainability benefits, our AI identifies alternatives that maintain performance while drastically improving safety profiles.
          </p>
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-border group">
            <img 
              src="https://picsum.photos/seed/chemistry/1200/800" 
              alt="Molecular Matching Visualization" 
              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <div className="text-[10px] font-black text-accent-emerald uppercase tracking-widest mb-2">Figure 1</div>
              <h4 className="text-xl font-black text-white uppercase tracking-tight">AI-Driven Molecular Matching Interface</h4>
            </div>
          </div>
        </section>

        <section className="space-y-8 pt-12 border-t border-zinc-border">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Modality as a Strategic Lever</h2>
          <p className="text-lg text-zinc-muted leading-relaxed">
            The evolution from simple inventory lists to complex molecular intelligence platforms like ChemXgen reflects a profound shift in how we approach industrial sustainability. No longer is the question simply "Is this chemical legal?"—today, the real question is "What’s the optimal way to modulate this supply chain, for the right market, with the greatest precision?"
          </p>
          <p className="text-lg text-zinc-muted leading-relaxed">
            Those who master this shift, combining deep scientific understanding with modular, forward-looking substitution strategies, will define the next generation of industrial leaders.
          </p>
        </section>
      </div>
    )
  },
  {
    slug: "ai-driven-retrosynthesis-future",
    title: "AI-Driven Retrosynthesis: The Future of Lab Efficiency",
    excerpt: "Exploring how machine learning is accelerating the path from molecular design to practical synthesis.",
    date: "Nov 02, 2026",
    author: "Sarah Chen",
    readTime: "8 MIN READ",
    categories: ["AI in Manufacturing", "Lab Efficiency"],
    image: "https://picsum.photos/seed/lab/1200/800",
    content: (
      <div className="space-y-12">
        <section className="space-y-6">
          <p className="text-lg text-zinc-muted leading-relaxed">
            The traditional process of retrosynthesis—working backward from a target molecule to its starting materials—has long been a bottleneck in chemical R&D. It requires years of expertise and often involves significant trial and error.
          </p>
          <p className="text-lg text-zinc-muted leading-relaxed">
            Today, AI-driven platforms are changing the game. By training on millions of known chemical reactions, these systems can predict viable synthetic routes in seconds, allowing chemists to focus on execution rather than planning.
          </p>
        </section>
        <section className="space-y-8">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Accelerating Innovation</h2>
          <p className="text-lg text-zinc-muted leading-relaxed">
            At ChemXgen, our integration with advanced retrosynthesis engines allows users to not only find substitutes but also understand how to synthesize them efficiently. This end-to-end visibility is crucial for maintaining competitive advantage in a rapidly evolving market.
          </p>
        </section>
      </div>
    )
  }
];

export const Blog: React.FC = () => {
  const { slug } = useParams();
  const currentPost = BLOG_POSTS.find(p => p.slug === slug);

  if (slug && currentPost) {
    return (
      <div className="min-h-screen bg-industrial-950 text-slate-200 font-sans">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-muted hover:text-accent-emerald transition-colors mb-12 font-bold uppercase tracking-widest text-xs">
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          {/* Header */}
          <header className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-accent-emerald/10 p-2 rounded-lg border border-accent-emerald/20">
                <BookOpen className="w-5 h-5 text-accent-emerald" />
              </div>
              <span className="text-[10px] font-black text-accent-emerald uppercase tracking-[0.3em]">ChemXgen Insights</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase mb-8">
              {currentPost.title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-12">
              {currentPost.categories.map(cat => (
                <span key={cat} className="text-[10px] font-bold text-zinc-muted border border-zinc-border px-3 py-1 rounded-full uppercase tracking-widest">
                  {cat}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 text-zinc-muted text-xs font-bold uppercase tracking-widest border-y border-zinc-border py-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{currentPost.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{currentPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-accent-emerald">{currentPost.readTime}</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <article className="prose prose-invert max-w-none">
            {currentPost.content}
          </article>

          {/* Footer / References */}
          <footer className="mt-24 pt-12 border-t border-zinc-border">
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-8">References & Further Reading</h4>
            <ul className="space-y-4 text-xs text-zinc-muted font-medium">
              <li className="flex gap-4">
                <span className="text-accent-emerald">[1]</span>
                <span>European Chemicals Agency (ECHA). "Strategic Substitution of Hazardous Chemicals." (2025).</span>
              </li>
              <li className="flex gap-4">
                <span className="text-accent-emerald">[2]</span>
                <span>Environmental Protection Agency (EPA). "PFAS Strategic Roadmap: EPA's Commitments to Action 2021-2024."</span>
              </li>
              <li className="flex gap-4">
                <span className="text-accent-emerald">[3]</span>
                <span>ChemXgen Systems. "AI-Driven Retrosynthesis and Molecular Matching for Industrial Compliance." (2026).</span>
              </li>
            </ul>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-industrial-950 text-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-accent-emerald/10 p-2 rounded-lg border border-accent-emerald/20">
                <BookOpen className="w-5 h-5 text-accent-emerald" />
              </div>
              <span className="text-[10px] font-black text-accent-emerald uppercase tracking-[0.3em]">Knowledge Base</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase">
              ChemXgen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-emerald to-emerald-400">Insights</span>
            </h1>
          </div>
          <p className="max-w-md text-zinc-muted font-medium text-lg">
            Deep dives into molecular intelligence, regulatory shifts, and the future of sustainable industrial chemistry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {BLOG_POSTS.map((post, idx) => (
            <motion.div 
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${post.slug}`} className="block space-y-6">
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-zinc-border">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 flex gap-2">
                    {post.categories.map(cat => (
                      <span key={cat} className="text-[8px] font-black bg-accent-emerald text-industrial-950 px-2 py-1 rounded-md uppercase tracking-widest">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-muted uppercase tracking-widest">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-zinc-border rounded-full"></span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tight group-hover:text-accent-emerald transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-zinc-muted font-medium leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-black text-accent-emerald uppercase tracking-widest pt-2">
                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

