import Link from "next/link";
import { Sparkles, Radio, Trophy, ShieldCheck, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/[0.04] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
             <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-gold-soft">
                  <span className="text-brand-black font-black text-lg">S</span>
                </div>
                <h1 className="text-xl font-bold text-white tracking-tighter">Eduvestia</h1>
             </Link>
             <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                L&apos;application d&apos;intelligence financière premium pour bâtir, optimiser et transmettre son patrimoine.
             </p>
             <div className="space-y-3">
                <div className="flex items-center gap-3 text-zinc-400 hover:text-gold-500 transition-colors cursor-pointer group">
                   <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-gold-500/30">
                      <Mail size={14} />
                   </div>
                   <span className="text-xs font-bold">contact@eduvestia.io</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400 hover:text-gold-500 transition-colors cursor-pointer group">
                   <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-gold-500/30">
                      <Phone size={14} />
                   </div>
                   <span className="text-xs font-bold">07 70 05 84 16</span>
                </div>
             </div>
          </div>

          <div>
             <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6 italic">Écosystème</h4>
             <ul className="space-y-4 text-sm font-medium text-zinc-500">
                <li><Link href="/learn" className="hover:text-gold-400 transition-colors">Bibliothèque Experts</Link></li>
                <li><Link href="/simulators" className="hover:text-gold-400 transition-colors">Simulateurs DCA & Tax</Link></li>
                <li><Link href="/kahoot" className="hover:text-gold-400 transition-colors">Mode Lounge (Live)</Link></li>
                <li><Link href="/strategies" className="hover:text-gold-400 transition-colors">Plans d&apos;Action</Link></li>
             </ul>
          </div>

          <div>
             <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6 italic">Premium</h4>
             <ul className="space-y-4 text-sm font-medium text-zinc-500">
                <li><Link href="/premium" className="hover:text-gold-400 transition-colors">Devenir Membre</Link></li>
                <li><Link href="/dashboard" className="hover:text-gold-400 transition-colors">Accès Ambassadeur</Link></li>
                <li><Link href="/premium" className="hover:text-gold-400 transition-colors">Coach IA Elite</Link></li>
             </ul>
          </div>

          <div>
             <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6 italic">Légal</h4>
             <ul className="space-y-4 text-sm font-medium text-zinc-500">
                <li><span className="hover:text-white transition-colors cursor-pointer">CGU / CGV</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Confidentialité</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Mentions Légales</span></li>
             </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} Eduvestia — Intelligence Financière Premium
           </p>
           <div className="flex items-center gap-4 text-zinc-600">
              <div className="flex items-center gap-1.5">
                 <ShieldCheck size={14} className="text-fin-green" />
                 <span className="text-[9px] font-black uppercase tracking-widest">Sécurisé SSL</span>
              </div>
              <div className="flex items-center gap-1.5">
                 <Sparkles size={14} className="text-gold-500" />
                 <span className="text-[9px] font-black uppercase tracking-widest">Build v4.1.0</span>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
}
