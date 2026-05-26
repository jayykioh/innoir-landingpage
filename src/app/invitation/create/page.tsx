'use client';

import { useState } from 'react';
import InteractiveTicket from '@/components/InteractiveTicket';
import { Copy, CheckCircle2, ExternalLink } from 'lucide-react';

export default function CreateInvitationPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'innoir2026') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect passcode');
    }
  };

  const generateLink = () => {
    if (!guestName.trim()) return '';
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `${origin}/invitation?to=${encodeURIComponent(guestName.trim())}`;
  };

  const copyLink = () => {
    const link = generateLink();
    if (link) {
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-sans p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6 border border-white/20 p-8 rounded-lg bg-neutral-950">
          <div className="text-center space-y-2">
            <h1 className="font-display text-2xl text-white tracking-widest">INNOIR</h1>
            <p className="font-sans text-xs text-white/50 tracking-widest uppercase">Invitation Creator</p>
          </div>
          
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-white text-black font-display tracking-widest py-3 hover:bg-neutral-200 transition-colors"
            >
              ACCESS
            </button>
          </div>
        </form>
      </div>
    );
  }

  const link = generateLink();

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row">
      {/* Sidebar Controls */}
      <div className="w-full md:w-[400px] border-r border-white/10 p-8 flex flex-col gap-8 h-auto md:h-screen sticky top-0 bg-neutral-950 z-20">
        <div className="space-y-2">
          <h1 className="font-display text-2xl tracking-widest">INNOIR</h1>
          <p className="font-sans text-xs text-white/50 tracking-widest uppercase">Create Invitation</p>
        </div>

        <div className="space-y-4 flex-1">
          <div className="space-y-2">
            <label className="text-xs text-white/50 uppercase tracking-widest">Guest Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe, Nguyen Van A..."
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <div className="pt-4 border-t border-white/10 space-y-4">
            <label className="text-xs text-white/50 uppercase tracking-widest">Generated Link</label>
            <div className="w-full bg-neutral-900 border border-white/20 p-3 text-xs text-white/70 break-all rounded-md">
              {link || 'Enter a name to generate link'}
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={copyLink}
                disabled={!link}
                className="flex-1 bg-white text-black font-display tracking-widest py-3 flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-neutral-200 transition-colors"
              >
                {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                {copied ? 'COPIED' : 'COPY LINK'}
              </button>
              
              {link && (
                <a 
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Area */}
      <div className="flex-1 bg-neutral-900/50 flex items-center justify-center p-8 overflow-y-auto relative min-h-[500px] h-auto md:h-screen">
        <div className="absolute top-8 left-8 text-xs text-white/30 font-display tracking-widest uppercase z-30">
          Live Preview
        </div>
        
        {/* Scale container to fit the bento grid nicely */}
        <div className="w-full max-w-2xl transform scale-75 md:scale-90 lg:scale-100 origin-center pointer-events-none my-12">
          <InteractiveTicket guestName={guestName || 'Special Guest'} previewMode={true} />
        </div>
      </div>
    </div>
  );
}
