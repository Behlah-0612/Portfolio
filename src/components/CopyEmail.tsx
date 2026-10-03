import { useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { cn } from '@/src/lib/utils';

import { EMAIL } from '../data/links';

export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Clipboard can be blocked (older browsers, insecure context). Fall back to selection copy.
      const el = document.createElement('textarea');
      el.value = EMAIL;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      try { document.execCommand('copy'); } catch { /* nothing else to try */ }
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('inline-flex items-stretch rounded-lg border border-pencil/15 bg-surface overflow-hidden', className)}>
      <a
        href={`mailto:${EMAIL}`}
        className="inline-flex items-center gap-2 px-4 min-h-[44px] text-sm font-medium text-pencil hover:text-ink-blue transition-colors"
      >
        <Mail className="w-4 h-4" />
        {EMAIL}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Email address copied' : 'Copy email address'}
        className="inline-flex items-center gap-1.5 px-3 border-l border-pencil/15 text-xs font-semibold text-pencil/70 hover:bg-pencil/5 transition-colors min-w-[84px] justify-center"
      >
        {copied ? <><Check className="w-4 h-4 text-emerald-500" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
      </button>
      <span className="sr-only" role="status" aria-live="polite">{copied ? 'Email address copied to clipboard' : ''}</span>
    </div>
  );
}
