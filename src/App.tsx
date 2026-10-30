import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  RefreshCw, 
  Zap, 
  ShieldCheck, 
  Search, 
  Copy, 
  Download, 
  HelpCircle,
  Building,
  Smartphone,
  Server,
  Activity,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TransactionHop {
  id: string;
  name: string;
  sub: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  details: string;
}

export default function App() {
  const [utrInput, setUtrInput] = useState('429188019284');
  const [activeScenario, setActiveScenario] = useState<'timeout' | 'glitch' | 'resolved'>('timeout');
  const [reversalStatus, setReversalStatus] = useState<'pending' | 'processing' | 'refunded'>('pending');
  const [copiedUtr, setCopiedUtr] = useState(false);

  const hops: TransactionHop[] = [
    {
      id: 'hop-1',
      name: 'Customer Bank Account',
      sub: 'HDFC Bank (•••• 8910)',
      status: 'success',
      timestamp: '10:14:02 IST',
      details: '₹1,850.00 debited from user savings balance via UPI MPIN verification.'
    },
    {
      id: 'hop-2',
      name: 'NPCI Central UPI Switch',
      sub: 'National Clearing Switch',
      status: 'success',
      timestamp: '10:14:03 IST',
      details: 'Routing packet validated. UTR 429188019284 assigned and cleared.'
    },
    {
      id: 'hop-3',
      name: 'Acquiring Bank Gateway',
      sub: 'Merchant Gateway Ingest',
      status: 'failed',
      timestamp: '10:14:15 IST',
      details: 'HTTP 504 Gateway Timeout: Bank switch failed to acknowledge settlement within 12s SLA.'
    },
    {
      id: 'hop-4',
      name: 'Merchant App / Order Engine',
      sub: 'Swiggy / IRCTC Order Desk',
      status: 'failed',
      timestamp: '10:14:16 IST',
      details: 'Cart expired without callback confirmation. Order status marked FAILED.'
    }
  ];

  const handleTriggerInstantReversal = () => {
    setReversalStatus('processing');
    setTimeout(() => {
      setReversalStatus('refunded');
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(utrInput);
    setCopiedUtr(true);
    setTimeout(() => setCopiedUtr(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Zap className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100 tracking-tight">Instant Refund &amp; UTR Tracker</span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                  NPCI Hop Visualizer
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Solving the #1 Fintech Support Driver: "Money Debited But Order Failed"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
        {/* Metric Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">TRADITIONAL SLA</span>
            <div className="text-xl sm:text-2xl font-bold text-rose-400 font-mono">5–7 Days</div>
            <span className="text-[11px] text-slate-500">Manual EOD settlement batches</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">INSTANT REVERSAL</span>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">&lt; 3 Seconds</div>
            <span className="text-[11px] text-slate-500">Autonomous IMPS fast-path</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">CSAT RECOVERY</span>
            <div className="text-xl sm:text-2xl font-bold text-indigo-400 font-mono">99.2%</div>
            <span className="text-[11px] text-slate-500">Zero escalations to bank support</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">NPCI PACKET TELEMETRY</span>
            <div className="text-xl sm:text-2xl font-bold text-amber-400 font-mono">14ms</div>
            <span className="text-[11px] text-slate-500">Gateway timeout detection</span>
          </div>
        </div>

        {/* Interactive Prototype Component */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Header Controls */}
          <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
              <span className="font-bold text-slate-100">Live Simulation Sandbox</span>
              <span className="text-slate-400 hidden sm:inline">— Inspect payment hop failure in real-time</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Simulation Scenario:</span>
              <button
                onClick={() => {
                  setActiveScenario('timeout');
                  setReversalStatus('pending');
                  setUtrInput('429188019284');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  activeScenario === 'timeout'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                HTTP 504 Gateway Timeout
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Incident Alert Bar */}
            <div className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-rose-200">
                      Payment Debited but Merchant Order Not Created
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 uppercase border border-rose-500/30">
                      Auto-Reversal Ready
                    </span>
                  </div>
                  <p className="text-xs text-rose-300/80 mt-1">
                    Amount <strong className="text-white font-mono">₹1,850.00</strong> was deducted from HDFC Account, but the merchant order timed out after 12s.
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-300 font-mono">
                    <span>NPCI UTR: <strong className="text-white">{utrInput}</strong></span>
                    <button
                      onClick={handleCopy}
                      className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white cursor-pointer transition-colors"
                      title="Copy UTR"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {copiedUtr && <span className="text-[10px] text-emerald-400 font-sans font-bold">Copied to clipboard!</span>}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0">
                {reversalStatus === 'pending' && (
                  <button
                    onClick={handleTriggerInstantReversal}
                    className="w-full md:w-auto px-5 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/25 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>Claim Instant Refund via IMPS</span>
                  </button>
                )}

                {reversalStatus === 'processing' && (
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-indigo-300 bg-indigo-950/50 px-4 py-3 rounded-xl border border-indigo-500/30">
                    <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                    <span>Reconciling with NPCI Settlement Pool...</span>
                  </div>
                )}

                {reversalStatus === 'refunded' && (
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-300 bg-emerald-950/40 px-4 py-3 rounded-xl border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>₹1,850.00 Refunded in 2.4s</span>
                  </div>
                )}
                <span className="text-[10px] text-slate-400 block text-center md:text-right mt-1.5">
                  Pre-funded Razorpay instant disbursement pool
                </span>
              </div>
            </div>

            {/* 4-Hop Network Packet Visualization */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-indigo-400" />
                  Live Network Packet Hop Diagnostic
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">Telemetry Latency: 14ms</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {hops.map((hop, index) => (
                  <div 
                    key={hop.id}
                    className={`p-4 rounded-xl border relative transition-all ${
                      hop.status === 'success' 
                        ? 'bg-slate-950/60 border-slate-800' 
                        : 'bg-rose-950/20 border-rose-500/30 ring-1 ring-rose-500/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-slate-400">HOP 0{index + 1}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        hop.status === 'success' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {hop.status === 'success' ? 'Success' : 'Broken / Timeout'}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-white">{hop.name}</h5>
                    <p className="text-[11px] text-slate-400 mb-2.5">{hop.sub}</p>

                    <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-sans">
                      {hop.details}
                    </p>

                    <div className="mt-3 text-[10px] font-mono text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-2">
                      <span>Timestamp:</span>
                      <span className="text-slate-300">{hop.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traditional vs Instant Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  Traditional Banking Flow (T+5 to T+7 Days)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Customer waits until end-of-day batch files (EOD clearing) are reconciled by both issuing and acquiring banks. Frustrated customers submit 3–4 support tickets and post complaints on social media.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1 font-mono">
                  <span>Turnaround: 120–168 Hours</span>
                </div>
              </div>

              <div className="p-5 bg-indigo-950/20 rounded-xl border border-indigo-500/30 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-indigo-400" />
                  Instant Reconciliation Engine (&lt; 60 Seconds)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Once the 504 timeout is caught by webhook telemetry, the gateway triggers an immediate IMPS/UPI reverse disbursement from a dedicated merchant liquidity float. Zero tickets raised.
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1 font-mono font-semibold">
                  <span>Turnaround: Real-Time Instant Reversal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Architecture Deep Dive */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">How Razorpay &amp; Merchants Solve This In Production</h3>
              <p className="text-xs text-slate-400">The engineering mechanics behind instant refund liquidity pools</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-indigo-400 font-bold">01. Webhook Dropout Interceptor</span>
              <h4 className="text-sm font-semibold text-white">Detecting Ghost Debits</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                When NPCI emits an ACK packet but the merchant’s API returns 504 Gateway Timeout or 502 Bad Gateway, our system intercepts the orphaned UTR before the user even leaves the checkout screen.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-indigo-400 font-bold">02. Merchant Liquidity Float</span>
              <h4 className="text-sm font-semibold text-white">Pre-Funded Reverse IMPS</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instead of waiting 7 days for the clearing bank's CSV reconciliation files, the gateway disburses the refund immediately from an escrow nodal pool, settling up on the back-end automatically.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-indigo-400 font-bold">03. Customer Transparency UI</span>
              <h4 className="text-sm font-semibold text-white">Live Packet Hop Diagnostic</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                By presenting users with the exact bank hop failure and valid 12-digit UTR proof, support tickets drop by 84% while customer trust in the merchant brand stays intact.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <p>Built as an engineering prototype solving real-world fintech bottlenecks inspired by Razorpay's Fix-My-Itch initiative.</p>
      </footer>
    </div>
  );
}
