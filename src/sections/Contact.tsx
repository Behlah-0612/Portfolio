import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { SketchyBorder, Doodle, FlowArrow, CurvedLine } from '../components/Sketchy';
import { cn, triggerMailto } from '../lib/utils';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import DOMPurify from 'dompurify';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const sanitizeInput = (input: string) => {
    return DOMPurify.sanitize(input.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all fields.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      // Input Sanitation to avoid cyberattacks (XSS)
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        message: sanitizeInput(formData.message),
        createdAt: serverTimestamp(),
        status: 'new'
      };

      // Ensure all files are perfectly protected via Firestore Rules (already deployed)
      await addDoc(collection(db, 'messages'), sanitizedData);
      
      // Trigger Mailto to send actual email
      triggerMailto(
        'bkatleriwala@gmail.com',
        `Portfolio Message from ${sanitizedData.name}`,
        `Name: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\n\nMessage:\n${sanitizedData.message}`
      );
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Failed to send message. Please try again later.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-6 max-w-4xl mx-auto relative">
      <Doodle type="scribble" className="absolute top-0 right-0 text-ink-blue/30 w-32 h-32 hidden md:block" />
      
      <div className="text-center mb-16 relative">
        <Doodle type="star" className="absolute -top-6 left-1/2 -translate-x-1/2 text-ink-red/40 w-12 h-12" />
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Final <span className="text-ink-blue font-bold underline decoration-wavy decoration-tape">Draft</span></h2>
        <p className="text-sm md:text-base text-pencil/80 dark:text-dark-pencil/60 font-sketch">Let's sketch out a project together.</p>
      </div>

      <div className="relative">
        {/* Wavy Flow Line (Desktop Only) */}
        <CurvedLine d="M0,0 Q50,100 100,0" className="hidden md:block w-full h-20 -top-10 left-0 text-pencil/5" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <SketchyBorder className="bg-paper/95 paper-shadow border-2 border-tape/50 dark:bg-dark-paper-elevated">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <CheckCircle2 className="w-16 h-16 text-ink-blue dark:text-dark-ink-blue" />
                <h3 className="text-2xl font-hand font-bold dark:text-dark-pencil">Message Sent!</h3>
                <p className="text-pencil font-sans dark:text-dark-pencil">
                  I'll get back to you soon at{' '}
                  <a href="mailto:bkatleriwala@gmail.com" className="text-ink-blue underline underline-offset-4 dark:text-dark-ink-blue">
                    bkatleriwala@gmail.com
                  </a>
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-ink-blue font-hand underline underline-offset-4"
                >
                  Send another?
                </button>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-hand text-xl dark:text-dark-pencil">Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 bg-paper border-2 border-tape/60 wobbly-border focus:outline-none focus:border-ink-blue focus:text-ink-blue focus:bg-tape/20 transition-colors font-sans text-base md:text-lg min-h-[48px] dark:text-dark-pencil dark:focus:text-dark-ink-blue dark:bg-dark-paper-elevated dark:border-dark-pencil/20 dark:focus:border-dark-ink-blue"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-hand text-xl dark:text-dark-pencil">Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 bg-paper border-2 border-tape/60 wobbly-border focus:outline-none focus:border-ink-blue focus:text-ink-blue focus:bg-tape/20 transition-colors font-sans text-base md:text-lg min-h-[48px] dark:text-dark-pencil dark:focus:text-dark-ink-blue dark:bg-dark-paper-elevated dark:border-dark-pencil/20 dark:focus:border-dark-ink-blue"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-hand text-xl dark:text-dark-pencil">Message</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-paper border-2 border-tape/60 wobbly-border focus:outline-none focus:border-ink-blue focus:text-ink-blue focus:bg-tape/20 transition-colors font-sans text-base md:text-lg resize-none min-h-[120px] dark:text-dark-pencil dark:focus:text-dark-ink-blue dark:bg-dark-paper-elevated dark:border-dark-pencil/20 dark:focus:border-dark-ink-blue"
                    placeholder="What's on your mind?"
                  />
                </div>

                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-ink-red text-sm font-sans"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errorMessage}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02, rotate: -1 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'submitting'}
                  className="w-full py-4 bg-ink-red text-white rounded-lg font-hand text-xl paper-shadow flex items-center justify-center gap-2 min-h-[48px] dark:bg-dark-ink-red dark:text-dark-paper border-2 border-ink-red/60 dark:border-dark-ink-red/60 disabled:opacity-50 hover:bg-ink-red/90 dark:hover:bg-dark-ink-red/90"
                >
                  {status === 'submitting' ? (
                    <>Sending... <Loader2 className="w-5 h-5 animate-spin" /></>
                  ) : (
                    <>Send Draft <Send className="w-5 h-5" /></>
                  )}
                </motion.button>
              </form>
            )}
          </SketchyBorder>
        </motion.div>
      </div>

      <div className="mt-16 flex flex-col items-center gap-8">
        <div className="flex gap-8">
          {[
            { icon: Github, href: "https://github.com/Behlah-0612", label: "GitHub", color: "hover:text-ink-blue dark:hover:text-dark-ink-blue" },
            { icon: Linkedin, href: "https://linkedin.com/in/behlah-katleriwala", label: "LinkedIn", color: "hover:text-ink-red dark:hover:text-dark-ink-red" },
            { icon: Mail, href: "mailto:bkatleriwala@gmail.com", label: "Email", color: "hover:text-ink-blue dark:hover:text-dark-ink-blue" }
          ].map((social, i) => {
            const isMailto = social.href.startsWith('mailto:');
            return (
              <motion.a
                key={i}
                href={social.href}
                {...(isMailto
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' })}
                whileHover={{ y: -5, rotate: i % 2 === 0 ? 5 : -5 }}
                className={cn("flex flex-col items-center gap-2 text-pencil/80 font-hand font-medium dark:text-dark-pencil/60 transition-colors hover:scale-110", social.color)}
              >
                <social.icon className="w-6 h-6" />
                <span className="text-[10px] font-mono uppercase tracking-widest">{social.label}</span>
              </motion.a>
            );
          })}
        </div>
        <p className="text-[10px] font-mono text-pencil/40 dark:text-dark-pencil/40 uppercase tracking-[0.2em]">
          All systems operational // Draft v1.0
        </p>
      </div>
    </section>
  );
}
