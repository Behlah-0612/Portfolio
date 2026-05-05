import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StickyNote, Doodle, Hint } from './Sketchy';
import { X, FileText, Loader2, Download } from 'lucide-react';

const FUN_FACTS = [
  "I don’t build things just to build them - I build until they feel right",
  "I overthink… but it usually works in my favor",
  "I hate boring anything - especially websites",
  "I’ll redo something 10 times if it doesn’t feel “clean”",
  "I enjoy making things unnecessarily cooler (on purpose)",
  "I like when things feel intentional",
  "I notice small details most people ignore",
  "I don’t like average - I’ll always push it a bit further",
  "I enjoy figuring things out from scratch",
  "I like when people interact with what I build, not just look at it",
  "I don’t like static websites - they feel dead",
  "I think animations should mean something",
  "I enjoy optimizing things even if they already work",
  "I like building systems more than features",
  "I think good UI should guide you without instructions",
  "I prefer solving real problems over “demo projects”",
  "I’ll tweak spacing, fonts, and layouts way more than necessary",
  "I enjoy connecting multiple tools into one system",
  "I like when code translates directly into experience",
  "I think small interactions make the biggest difference",
  "I want people to play with what I build",
  "I think curiosity should be rewarded",
  "I like hiding little details for people to discover",
  "I think every click should feel satisfying",
  "I like making users go “wait… that was cool”",
  "I think design should feel alive, not static",
  "I enjoy controlled chaos in layouts",
  "I like breaking grids - but still making them make sense",
  "I believe randomness should still be intentional",
  "I enjoy designing things that people remember",
  "I love traveling - new places reset my thinking",
  "I enjoy cooking (lowkey experimenting most of the time)",
  "I’ve danced at multiple events - yes, actually performed",
  "I like meeting new people and understanding how they think",
  "I’m naturally social, even though I spend a lot of time building things",
  "I enjoy conversations that go deeper than surface level",
  "I try to bring positive energy wherever I go",
  "I adapt quickly in new environments",
  "I like figuring things out on my own first",
  "I enjoy learning by doing, not just watching",
  "I’ll randomly get ideas and immediately want to build them",
  "I sometimes redesign things that were already fine",
  "I like when things feel smooth - in UI and in life",
  "I don’t like clutter, but I like controlled mess",
  "I notice bad UX instantly",
  "I enjoy fixing things that annoy me",
  "I like when effort shows, even in small details",
  "I prefer experiences over explanations",
  "I believe first impressions matter a lot",
  "I’m building things now that I wish existed before"
];

const JOKE = "Why do programmers prefer dark mode? Because light attracts bugs!";

export function ResumeSticky({ onModalStateChange }: { onModalStateChange?: (isOpen: boolean) => void }) {
  const [clicks, setClicks] = useState(0);
  const [showJoke, setShowJoke] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showCorporatePdf, setShowCorporatePdf] = useState(false);
  const [currentFact, setCurrentFact] = useState("");

  const handleSetShowResume = (show: boolean) => {
    setShowResume(show);
    if (!show) setShowCorporatePdf(false);
    onModalStateChange?.(show);
  };

  useEffect(() => {
    if (clicks === 2) {
      setShowJoke(true);
      setTimeout(() => setShowJoke(false), 3000);
    }
    if (clicks === 5) {
      startLoading();
    }
  }, [clicks]);

  useEffect(() => {
    let factInterval: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    if (isLoading) {
      factInterval = setInterval(() => {
        setCurrentFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);
      }, 6000);
      setCurrentFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);

      timeoutId = setTimeout(() => {
        setIsLoading(false);
        handleSetShowResume(true);
      }, 12000);
    }

    return () => {
      if (factInterval) clearInterval(factInterval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoading]);

  const startLoading = () => {
    setIsLoading(true);
    onModalStateChange?.(true);
    setClicks(0);
  };

  return (
    <>
      {/* The Sticky Note */}
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        animate={{ 
          rotate: [2, -2, 2],
          y: [0, 5, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-[780px] md:top-64 right-2 md:right-10 z-50 cursor-pointer group"
        onClick={() => setClicks(prev => prev + 1)}
      >
        <Hint text="click 5 times" className="-top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative">
          {/* Thumbtack */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-ink-red rounded-full z-10 paper-shadow">
            <div className="absolute inset-0 bg-tape/40 rounded-full scale-50 translate-x-0.5 -translate-y-0.5 dark:bg-dark-paper-elevated/40" />
          </div>

          <StickyNote color="bg-paper dark:bg-dark-paper-elevated" className="w-28 h-28 md:w-40 md:h-40 flex flex-col items-center justify-center p-4 text-center border-2 border-pencil/10 dark:border-dark-pencil/30">
            <Doodle type="scribble" className="absolute top-2 left-2 w-8 h-8 text-pencil/10 dark:text-dark-pencil/20" />
            <h3 className="text-xl md:text-2xl font-hand text-pencil mb-1 dark:text-dark-pencil">Resume</h3>
            <p className="text-[10px] md:text-xs font-sketch text-pencil dark:text-dark-pencil/80 leading-tight">
              (click 5 times to see my resume)
            </p>
            <Doodle type="star" className="absolute bottom-2 right-2 w-4 h-4 text-ink-blue/20 dark:text-dark-ink-blue/40" />
          </StickyNote>
        </div>

        {/* Joke Bubble */}
        <AnimatePresence>
          {showJoke && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-full right-0 mt-4 w-48 p-3 bg-paper dark:bg-dark-paper-elevated wobbly-border paper-shadow z-50"
            >
              <p className="text-xs font-hand text-ink-blue italic">{JOKE}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-paper/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center overflow-hidden dark:bg-dark-paper/95"
          >
            {/* Background Chaos */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                    y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, ease: "linear" }}
                  className="absolute"
                  style={{ 
                    top: `${Math.random() * 100}%`, 
                    left: `${Math.random() * 100}%` 
                  }}
                >
                  <Doodle type={i % 2 === 0 ? "star" : "scribble"} className="w-12 h-12 text-pencil dark:text-dark-ink-blue" />
                </motion.div>
              ))}
            </div>

            <div className="max-w-xl relative z-10">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity }
                }}
                className="mb-8 mx-auto text-ink-blue dark:text-dark-ink-blue"
              >
                <Loader2 className="w-16 h-16" />
              </motion.div>
              
              <h2 className="text-2xl md:text-4xl font-hand mb-8 text-pencil leading-tight">
                Read these facts about <span className="text-ink-red underline decoration-wavy">Behlah</span>, while we load his resume up for you
              </h2>
              
              <motion.div
                key={currentFact}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.6 }}
                className="p-8 bg-tape/80 dark:bg-dark-paper-elevated wobbly-border paper-shadow border-2 border-ink-blue/20 relative group cursor-pointer perspective-1000"
                onClick={() => setCurrentFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)])}
              >
                <p className="text-xl md:text-2xl font-sketch text-ink-blue dark:text-dark-ink-blue leading-relaxed">
                  "{currentFact}"
                </p>
                
                <Hint text="click to flip" className="-bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100" />
                
                {/* Wild Interactions */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);
                    }}
                    className="px-4 py-1 bg-ink-blue text-paper rounded-full text-xs font-hand hover:scale-110 transition-transform"
                  >
                    Skip Fact
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Just a fun visual effect
                      const btn = e.currentTarget;
                      btn.innerText = "❤️ Liked!";
                      setTimeout(() => btn.innerText = "Like Fact", 1000);
                    }}
                    className="px-4 py-1 bg-ink-red text-paper rounded-full text-xs font-hand hover:scale-110 transition-transform"
                  >
                    Like Fact
                  </button>
                </div>
              </motion.div>

              <div className="mt-8 flex justify-center gap-4">
                <Doodle type="circle" className="w-8 h-8 text-ink-red dark:text-dark-ink-red animate-bounce" />
                <Doodle type="star" className="w-8 h-8 text-ink-blue dark:text-dark-ink-blue animate-pulse" />
                <Doodle type="bulb" className="w-8 h-8 text-paper animate-bounce delay-100" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Modal */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-pencil/20 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => handleSetShowResume(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-paper dark:bg-dark-paper-elevated w-full max-w-4xl h-[90vh] paper-shadow wobbly-border relative flex flex-col"
            >
              <button 
                onClick={() => handleSetShowResume(false)}
                className="absolute top-4 right-4 p-2 hover:bg-pencil/5 rounded-full transition-colors z-20"
              >
                <X className="w-6 h-6 text-pencil" />
              </button>

              <div className={`flex-1 flex flex-col min-h-0 ${showCorporatePdf ? 'p-0 overflow-hidden' : 'overflow-y-auto p-8 md:p-12'}`}>
                {showCorporatePdf ? (
                  <div className="flex flex-col flex-1 min-h-0">
                    <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-pencil/10 dark:border-dark-pencil/20 bg-paper/80 dark:bg-dark-paper-elevated">
                      <button
                        type="button"
                        onClick={() => setShowCorporatePdf(false)}
                        className="text-sm font-hand text-ink-blue dark:text-dark-ink-blue hover:underline"
                      >
                        ← Back to playful resume
                      </button>
                      <a
                        href="/resume.pdf"
                        download
                        className="text-sm font-sans text-pencil/80 hover:text-ink-blue dark:text-dark-pencil-muted dark:hover:text-dark-ink-blue inline-flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </a>
                    </div>
                    <iframe
                      title="Resume PDF preview"
                      src="/resume.pdf"
                      className="flex-1 w-full min-h-[65vh] border-0 bg-pencil/5 dark:bg-white/5"
                    />
                  </div>
                ) : (
                  <>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b-2 border-pencil/5 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-ink-blue/10 rounded-xl dark:bg-dark-ink-blue/20">
                      <FileText className="w-10 h-10 text-ink-blue dark:text-dark-ink-blue" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold font-hand dark:text-dark-pencil">Behlah Katleriwala</h1>
                      <p className="text-pencil font-sketch dark:text-dark-pencil">Lower Mainland, B.C | +1(778) 586 7776</p>
                    </div>
                  </div>
                  <div className="flex flex-col text-sm font-mono text-pencil/80 md:text-right dark:text-dark-pencil-muted">
                    <a 
                      href="mailto:bkatleriwala@gmail.com"
                      className="text-right hover:text-ink-blue dark:hover:text-dark-ink-blue"
                    >
                      bkatleriwala@gmail.com
                    </a>
                    <a href="https://linkedin.com/in/behlah-katleriwala" target="_blank" className="hover:text-ink-blue dark:hover:text-dark-ink-blue">linkedin.com/behlah-katleriwala</a>
                    <a href="https://github.com/Behlah-0612" target="_blank" className="hover:text-ink-blue dark:hover:text-dark-ink-blue">github.com/Behlah-0612</a>
                  </div>
                </div>

                <div className="space-y-10 font-sans">
                  {/* Summary */}
                  <section>
                    <h2 className="text-xl font-bold text-ink-blue uppercase tracking-widest mb-4 flex items-center gap-2 dark:text-dark-ink-blue">
                      <div className="w-2 h-2 bg-ink-blue rounded-full dark:bg-dark-ink-blue" />
                      Summary
                    </h2>
                    <p className="text-pencil leading-relaxed text-base md:text-lg dark:text-dark-pencil">
                      Systems-Driven Developer & Interaction Architect with a focus on building robust digital systems and creative storytelling. Expert in React, TypeScript, and high-performance animation systems.
                    </p>
                  </section>

                  {/* Education */}
                  <section>
                    <h2 className="text-xl font-bold text-ink-blue uppercase tracking-widest mb-4 flex items-center gap-2 dark:text-dark-ink-blue">
                      <div className="w-2 h-2 bg-ink-blue rounded-full dark:bg-dark-ink-blue" />
                      Education
                    </h2>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg dark:text-dark-pencil">Thompson Rivers University</h3>
                        <p className="text-pencil/80 italic dark:text-dark-pencil-muted">Bachelor of Computing Science</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold dark:text-dark-pencil">Sept 2021 - Dec 2025</p>
                        <p className="text-sm text-pencil/60 dark:text-dark-pencil-muted/60">Kamloops, B.C</p>
                      </div>
                    </div>
                  </section>

                  {/* Skills */}
                  <section>
                    <h2 className="text-xl font-bold text-ink-blue uppercase tracking-widest mb-4 flex items-center gap-2 dark:text-dark-ink-blue">
                      <div className="w-2 h-2 bg-ink-blue rounded-full dark:bg-dark-ink-blue" />
                      Technical Skills
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-pencil/5 p-4 wobbly-border dark:bg-white/5">
                      <div>
                        <p className="dark:text-dark-pencil"><span className="font-bold">Languages:</span> Python, Java, Javascript, C++, SQL, HTML, CSS</p>
                        <p className="dark:text-dark-pencil"><span className="font-bold">Frameworks:</span> Node.js, React, Flask</p>
                      </div>
                      <div>
                        <p className="dark:text-dark-pencil"><span className="font-bold">Libraries:</span> Flask, NumPy, Pandas, SciPy, Open3D, Plotly, Scikit-learn</p>
                        <p className="dark:text-dark-pencil"><span className="font-bold">Tools:</span> LLMs, Jira, Git, CloudCompare, Firebase, Figma</p>
                      </div>
                    </div>
                  </section>

                  {/* Projects */}
                  <section>
                    <h2 className="text-xl font-bold text-ink-blue uppercase tracking-widest mb-4 flex items-center gap-2 dark:text-dark-ink-blue">
                      <div className="w-2 h-2 bg-ink-blue rounded-full dark:bg-dark-ink-blue" />
                      Key Projects
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-1">
                          <h3 className="font-bold text-base md:text-lg dark:text-dark-pencil">Automated LiDAR Point Cloud Analysis Pipeline</h3>
                          <span className="text-xs font-mono text-pencil/40 dark:text-dark-pencil-muted/40">Python, NumPy, Pandas, Open3D</span>
                        </div>
                        <ul className="list-disc list-inside text-base text-pencil/80 space-y-1 dark:text-dark-pencil-muted">
                          <li>Built an automated Python pipeline to compute CSS/OSS metrics from LiDAR point cloud data.</li>
                          <li>Implemented point cloud normalization, surface smoothing, feature detection, and radial distance computation.</li>
                          <li>Applied modular design, parameter tuning, and data validation for 3D spatial reasoning.</li>
                        </ul>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <h3 className="font-bold text-base md:text-lg dark:text-dark-pencil">IoT-Based Health Monitoring and Risk Classification System</h3>
                          <span className="text-xs font-mono text-pencil/40 dark:text-dark-pencil-muted/40">Python, IoT, ML</span>
                        </div>
                        <ul className="list-disc list-inside text-base text-pencil/80 space-y-1 dark:text-dark-pencil-muted">
                          <li>Built an end-to-end IoT health monitoring pipeline integrating embedded sensors and cloud storage.</li>
                          <li>Implemented ML classification workflows to assess health risk levels, with real-time visualization.</li>
                        </ul>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <h3 className="font-bold text-base md:text-lg dark:text-dark-pencil">Procedural Board Generation System</h3>
                          <span className="text-xs font-mono text-pencil/40 dark:text-dark-pencil-muted/40">JavaScript, Algorithms</span>
                        </div>
                        <ul className="list-disc list-inside text-base text-pencil/80 space-y-1 dark:text-dark-pencil-muted">
                          <li>Designed procedural generation algorithms to construct valid closed-loop grid paths.</li>
                          <li>Developed deterministic tile-assignment and seeded randomness logic for rule-based placement.</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Experience */}
                  <section>
                    <h2 className="text-xl font-bold text-ink-blue uppercase tracking-widest mb-4 flex items-center gap-2 dark:text-dark-ink-blue">
                      <div className="w-2 h-2 bg-ink-blue rounded-full dark:bg-dark-ink-blue" />
                      Experience
                    </h2>
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-base md:text-lg dark:text-dark-pencil">Board Member - TRUSU Cybersecurity Club</h3>
                          <p className="text-sm text-pencil/60 dark:text-dark-pencil-muted/60">Thompson Rivers University</p>
                        </div>
                        <p className="text-sm font-bold dark:text-dark-pencil">Oct 2024 - Dec 2025</p>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-base md:text-lg dark:text-dark-pencil">Guest Services Agent</h3>
                          <p className="text-sm text-pencil/60 dark:text-dark-pencil-muted/60">Prestige Hotels & Resorts</p>
                        </div>
                        <p className="text-sm font-bold dark:text-dark-pencil">Oct 2022 - Present</p>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-base md:text-lg dark:text-dark-pencil">Tutor</h3>
                          <p className="text-sm text-pencil/60 dark:text-dark-pencil-muted/60">GoStudent</p>
                        </div>
                        <p className="text-sm font-bold dark:text-dark-pencil">Oct 2021 - Apr 2022</p>
                      </div>
                    </div>
                  </section>

                  {/* Awards */}
                  <section>
                    <h2 className="text-xl font-bold text-ink-blue uppercase tracking-widest mb-4 flex items-center gap-2 dark:text-dark-ink-blue">
                      <div className="w-2 h-2 bg-ink-blue rounded-full dark:bg-dark-ink-blue" />
                      Publications & Awards
                    </h2>
                    <ul className="space-y-3 text-base text-pencil/80 dark:text-dark-pencil-muted">
                      <li className="flex gap-2">
                        <span className="text-ink-red dark:text-dark-ink-red">★</span>
                        <span>"Smart Armrest Prototype for Non-Obtrusive IoT Health Monitoring" - ISG 2026 Journal</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-ink-red dark:text-dark-ink-red">★</span>
                        <span>Dean's List - Recognized for academic excellence for 5 semesters</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-ink-red dark:text-dark-ink-red">★</span>
                        <span>Awarded 3rd Place School-Wide in Grade 12 - achieving a final score of 93.6%</span>
                      </li>
                    </ul>
                  </section>
                </div>
                  </>
                )}
              </div>

              {!showCorporatePdf && (
              <div className="p-6 bg-paper/30 border-t border-pencil/5 flex justify-center dark:bg-pencil/5">
                <button
                  type="button"
                  onClick={() => setShowCorporatePdf(true)}
                  className="px-8 py-3 bg-pencil text-paper rounded-full font-sans font-bold tracking-wide hover:scale-105 hover:bg-ink-blue transition-all duration-300 shadow-lg inline-flex items-center gap-2 dark:bg-dark-pencil dark:text-dark-paper dark:hover:bg-dark-ink-blue"
                >
                  <FileText className="w-5 h-5" />
                  Corporate version?
                </button>
              </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
