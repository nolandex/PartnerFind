import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Users,
  Search,
  Filter,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  MessageCircle,
  Copy,
  Check,
  CheckCheck,
  XCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  TrendingUp,
  Briefcase,
  Target,
  Share2,
  Trash2,
  Building,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  MatchResult,
  PartnershipSubmission,
  subscribeMatchResults,
  subscribeSubmissions,
  approveMatchResult,
  rejectMatchResult,
  runAllMatching,
  deleteSubmission,
  createDirectWhatsappUrl,
  createGroupWelcomeMessage,
} from '../lib/matchingService';

interface AdminMatchingTabProps {
  currentAdminEmail: string;
}

export const AdminMatchingTab: React.FC<AdminMatchingTabProps> = ({ currentAdminEmail }) => {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [submissions, setSubmissions] = useState<PartnershipSubmission[]>([]);
  const [subTab, setSubTab] = useState<'pending' | 'approved' | 'submissions'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'pencari_peluang' | 'pemberi_peluang'>('all');

  const [runningMatch, setRunningMatch] = useState(false);
  const [matchSuccessMsg, setMatchSuccessMsg] = useState('');

  // Approval modal state
  const [approvingMatch, setApprovingMatch] = useState<MatchResult | null>(null);
  const [waGroupLink, setWaGroupLink] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [processingApproval, setProcessingApproval] = useState(false);

  // WhatsApp helper modal state
  const [waModalMatch, setWaModalMatch] = useState<MatchResult | null>(null);
  const [copiedWelcomeMsg, setCopiedWelcomeMsg] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  // Expanded reasons toggle map
  const [expandedReasons, setExpandedReasons] = useState<Record<string, boolean>>({});

  // Subscriptions
  useEffect(() => {
    const unsubMatches = subscribeMatchResults((data) => {
      setMatches(data);
    });

    const unsubSubs = subscribeSubmissions((data) => {
      setSubmissions(data);
    });

    return () => {
      unsubMatches();
      unsubSubs();
    };
  }, []);

  // Filtered lists
  const pendingMatches = useMemo(
    () => matches.filter((m) => m.status === 'pending'),
    [matches]
  );

  const approvedMatches = useMemo(
    () => matches.filter((m) => m.status === 'approved'),
    [matches]
  );

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      if (roleFilter !== 'all' && s.type !== roleFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.industry.toLowerCase().includes(q) ||
          s.skills.toLowerCase().includes(q) ||
          s.needs.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q) ||
          s.whatsapp.includes(q)
        );
      }
      return true;
    });
  }, [submissions, roleFilter, searchQuery]);

  const handleRunAllMatching = async () => {
    setRunningMatch(true);
    setMatchSuccessMsg('');
    try {
      const res = await runAllMatching();
      if (res.success) {
        setMatchSuccessMsg(
          `Selesai memproses ${res.totalProcessed} pasangan. Ditemukan ${res.newMatches} kecocokan baru!`
        );
        setTimeout(() => setMatchSuccessMsg(''), 5000);
      } else {
        alert('Gagal menjalankan pencocokan otomatis.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan.');
    } finally {
      setRunningMatch(false);
    }
  };

  const handleOpenApproveModal = (match: MatchResult) => {
    setApprovingMatch(match);
    setWaGroupLink(match.whatsappGroupLink || '');
    setAdminNotes(match.adminNotes || '');
  };

  const handleConfirmApproval = async () => {
    if (!approvingMatch) return;
    setProcessingApproval(true);
    try {
      const ok = await approveMatchResult(approvingMatch.id, currentAdminEmail, {
        whatsappGroupLink: waGroupLink.trim() || undefined,
        adminNotes: adminNotes.trim() || undefined,
      });

      if (ok) {
        setApprovingMatch(null);
        setMatchSuccessMsg(`Kemitraan berhasil DISETUJUI dan dipindahkan ke tab Disetujui.`);
        setTimeout(() => setMatchSuccessMsg(''), 4500);
      } else {
        alert('Gagal menyetujui hasil pencocokan.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menyetujui.');
    } finally {
      setProcessingApproval(false);
    }
  };

  const handleRejectMatch = async (matchId: string) => {
    if (!confirm('Apakah Anda yakin ingin menolak/mengabaikan hasil pencocokan ini?')) return;
    try {
      await rejectMatchResult(matchId, currentAdminEmail);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSub = async (id: string, name: string) => {
    if (!confirm(`Hapus formulir milik "${name}" dari database?`)) return;
    try {
      await deleteSubmission(id);
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = async (text: string, idKey?: string) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        if (idKey) {
          setCopiedPhone(idKey);
          setTimeout(() => setCopiedPhone(null), 2500);
        } else {
          setCopiedWelcomeMsg(true);
          setTimeout(() => setCopiedWelcomeMsg(false), 2500);
        }
      } catch {}
    }
  };

  const toggleReasonExpand = (id: string) => {
    setExpandedReasons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ── TOP STATS BAR ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>TOTAL FORMULIR</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white">{submissions.length}</div>
          <div className="text-[10px] text-neutral-500 font-mono">
            {submissions.filter((s) => s.type === 'pencari_peluang').length} Pencari •{' '}
            {submissions.filter((s) => s.type === 'pemberi_peluang').length} Pemberi
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>BELUM DIPROSES</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{pendingMatches.length}</div>
          <div className="text-[10px] text-neutral-500 font-mono">Menunggu Review Admin</div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>TELAH DISETUJUI</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{approvedMatches.length}</div>
          <div className="text-[10px] text-neutral-500 font-mono">Siap / Sedang Terhubung WA</div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>TOTAL KECOCOKAN</span>
            <Sparkles className="w-4 h-4 text-[hsl(var(--brand-accent))]" />
          </div>
          <div className="text-2xl font-black text-white">{matches.length}</div>
          <div className="text-[10px] text-neutral-500 font-mono">Algoritma Multi-Faktor</div>
        </div>
      </div>

      {/* Global Success Notification */}
      {matchSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{matchSuccessMsg}</span>
        </div>
      )}

      {/* ── SUB-TABS NAVIGATION & ACTIONS BAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-neutral-900">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setSubTab('pending')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              subTab === 'pending'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-neutral-400 hover:text-white bg-neutral-900/60 border border-neutral-800'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Belum Diproses</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300">
              {pendingMatches.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('approved')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              subTab === 'approved'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-neutral-400 hover:text-white bg-neutral-900/60 border border-neutral-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Disetujui</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300">
              {approvedMatches.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('submissions')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              subTab === 'submissions'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-neutral-400 hover:text-white bg-neutral-900/60 border border-neutral-800'
            }`}
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Data Formulir Masuk</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neutral-800 text-neutral-400">
              {submissions.length}
            </span>
          </button>
        </div>

        {/* Action Button: Trigger Full Auto Matching */}
        <button
          type="button"
          onClick={handleRunAllMatching}
          disabled={runningMatch || submissions.length === 0}
          className="h-10 px-4 rounded-xl text-xs font-bold text-neutral-950 bg-[hsl(var(--brand-accent))] hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm self-start sm:self-auto disabled:opacity-50"
        >
          {runningMatch ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-neutral-950" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-neutral-950" />
          )}
          <span>Jalankan Pencocokan Ulang</span>
        </button>
      </div>

      {/* ── TAB 1: HASIL PENCOCOKAN BELUM DIPROSES (PENDING) ── */}
      {subTab === 'pending' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-400">
            <p>
              Tinjau daftar pasangan kemitraan yang terdeteksi cocok oleh algoritma. Klik <strong>"Setujui"</strong> untuk menyetujui kemitraan dan menghubungkan kedua pihak via WhatsApp.
            </p>
            <span className="font-mono text-neutral-500 text-[11px] shrink-0">
              {pendingMatches.length} pasangan menunggu review
            </span>
          </div>

          {pendingMatches.length === 0 ? (
            <div className="p-12 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-neutral-800/80 border border-neutral-700 flex items-center justify-center mx-auto text-neutral-400">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white">Semua Pencocokan Sudah Diproses!</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Tidak ada hasil pencocokan yang pending saat ini. Formulir baru yang masuk dari pengunjung akan otomatis dianalisis dan muncul di sini.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {pendingMatches.map((match) => (
                <div
                  key={match.id}
                  className="p-5 sm:p-6 rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all shadow-sm space-y-5"
                >
                  {/* Card Header: Score, Industry, Date */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800/80">
                    <div className="flex items-center gap-3">
                      <div className="px-3.5 py-1.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-black text-emerald-400 font-mono">
                          {match.matchScore}% Sangat Cocok
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-neutral-300 bg-neutral-900 px-3 py-1 rounded-xl border border-neutral-800">
                        {match.industry}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(match.createdAt).toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  {/* Two Parties Side by Side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Column 1: Pencari Peluang */}
                    <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                          <span className="text-[10px] font-mono uppercase font-bold text-sky-400">
                            Pencari Peluang
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-500">
                          {match.seekerData?.workPreference || 'Remote'}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center justify-between">
                          <span>{match.seekerName}</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(match.seekerWhatsapp, `seek_${match.id}`)}
                            className="text-[11px] font-mono text-neutral-400 hover:text-emerald-400 flex items-center gap-1 cursor-pointer transition-colors"
                            title="Salin nomor WhatsApp"
                          >
                            <Phone className="w-3 h-3 text-emerald-400" />
                            <span>{match.seekerWhatsapp}</span>
                            {copiedPhone === `seek_${match.id}` && <Check className="w-3 h-3 text-emerald-400" />}
                          </button>
                        </h4>
                        <p className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          <span>{match.seekerData?.location || 'Indonesia'}</span>
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-1 text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-mono text-neutral-500 block">Keahlian / Aset:</span>
                          <p className="text-neutral-200 text-xs font-medium leading-relaxed">
                            {match.seekerData?.skills || '-'}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono text-neutral-500 block">Kebutuhan Dicari:</span>
                          <p className="text-neutral-300 text-xs leading-relaxed">
                            {match.seekerData?.needs || '-'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: Pemberi Peluang */}
                    <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          <span className="text-[10px] font-mono uppercase font-bold text-emerald-400">
                            Pemberi Peluang
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-500">
                          {match.providerData?.capitalRange || 'Modal Fleksibel'}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center justify-between">
                          <span>{match.providerName}</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(match.providerWhatsapp, `prov_${match.id}`)}
                            className="text-[11px] font-mono text-neutral-400 hover:text-emerald-400 flex items-center gap-1 cursor-pointer transition-colors"
                            title="Salin nomor WhatsApp"
                          >
                            <Phone className="w-3 h-3 text-emerald-400" />
                            <span>{match.providerWhatsapp}</span>
                            {copiedPhone === `prov_${match.id}` && <Check className="w-3 h-3 text-emerald-400" />}
                          </button>
                        </h4>
                        <p className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          <span>{match.providerData?.location || 'Indonesia'}</span>
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-1 text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-mono text-neutral-500 block">Peluang / Aset Dimiliki:</span>
                          <p className="text-neutral-200 text-xs font-medium leading-relaxed">
                            {match.providerData?.skills || '-'}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono text-neutral-500 block">Kriteria Mitra Dicari:</span>
                          <p className="text-neutral-300 text-xs leading-relaxed">
                            {match.providerData?.needs || '-'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Matching Reasons Dropdown / Box */}
                  <div className="p-3.5 rounded-2xl bg-neutral-900/30 border border-neutral-800/80">
                    <button
                      type="button"
                      onClick={() => toggleReasonExpand(match.id)}
                      className="w-full flex items-center justify-between text-xs font-semibold text-neutral-300 cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                        <Info className="w-3.5 h-3.5" />
                        <span>Alasan Kecocokan Algoritma ({match.matchReasons.length} Poin)</span>
                      </span>
                      {expandedReasons[match.id] ? (
                        <ChevronUp className="w-4 h-4 text-neutral-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                      )}
                    </button>

                    {(expandedReasons[match.id] ?? true) && (
                      <ul className="mt-2.5 space-y-1.5 text-xs text-neutral-300 pl-1">
                        {match.matchReasons.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-emerald-400 shrink-0 font-bold">•</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Action Buttons: Setujui vs Tolak */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <a
                        href={createDirectWhatsappUrl(
                          match.seekerWhatsapp,
                          match.seekerName,
                          match.providerName,
                          'Pemberi Peluang'
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 hover:text-white flex items-center gap-1.5 cursor-pointer font-mono transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Chat WA Pencari</span>
                      </a>
                      <a
                        href={createDirectWhatsappUrl(
                          match.providerWhatsapp,
                          match.providerName,
                          match.seekerName,
                          'Pencari Peluang'
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 hover:text-white flex items-center gap-1.5 cursor-pointer font-mono transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Chat WA Pemberi</span>
                      </a>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleRejectMatch(match.id)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Tolak</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenApproveModal(match)}
                        className="px-6 py-2 rounded-xl text-xs sm:text-sm font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-all cursor-pointer flex items-center gap-2 shadow-sm active:scale-98"
                      >
                        <CheckCircle2 className="w-4 h-4 text-neutral-950" />
                        <span>Setujui Hasil Pencocokan</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB 2: HASIL PENCOCOKAN YANG TELAH DISETUJUI ── */}
      {subTab === 'approved' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-400">
            <p>
              Daftar kemitraan yang telah disetujui oleh admin. Data tetap tersimpan aman di database dan siap dihubungkan melalui grup WhatsApp.
            </p>
            <span className="font-mono text-emerald-400 font-bold text-[11px] shrink-0">
              {approvedMatches.length} kemitraan disetujui
            </span>
          </div>

          {approvedMatches.length === 0 ? (
            <div className="p-12 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-neutral-800/80 border border-neutral-700 flex items-center justify-center mx-auto text-neutral-400">
                <Clock className="w-7 h-7 text-neutral-500" />
              </div>
              <h3 className="text-base font-bold text-white">Belum Ada Kemitraan yang Disetujui</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Buka tab "Belum Diproses" untuk meninjau dan menyetujui pasangan mitra yang dicocokkan otomatis oleh sistem.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {approvedMatches.map((match) => (
                <div
                  key={match.id}
                  className="p-5 sm:p-6 rounded-3xl bg-neutral-950 border border-emerald-500/30 hover:border-emerald-500/50 transition-all shadow-sm space-y-5"
                >
                  {/* Status Approved Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800/80">
                    <div className="flex items-center gap-3">
                      <div className="px-3.5 py-1.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs sm:text-sm font-black text-emerald-400 uppercase font-mono">
                          Disetujui
                        </span>
                      </div>
                      <span className="text-xs font-bold text-white bg-neutral-900 px-3 py-1 rounded-xl border border-neutral-800">
                        {match.industry} • Skor: {match.matchScore}%
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-neutral-400 space-y-0.5 sm:text-right">
                      <div>
                        Disetujui oleh: <strong className="text-emerald-400">{match.approvedBy || 'Admin'}</strong>
                      </div>
                      <div className="text-neutral-500">
                        {match.approvedAt ? new Date(match.approvedAt).toLocaleString('id-ID') : '-'}
                      </div>
                    </div>
                  </div>

                  {/* Summary of Both Parties */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-sky-400 font-bold">Pencari Peluang</span>
                      <h4 className="text-sm font-bold text-white">{match.seekerName}</h4>
                      <p className="text-xs text-neutral-300">
                        <strong>Keahlian:</strong> {match.seekerData?.skills || '-'}
                      </p>
                      <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{match.seekerWhatsapp}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Pemberi Peluang</span>
                      <h4 className="text-sm font-bold text-white">{match.providerName}</h4>
                      <p className="text-xs text-neutral-300">
                        <strong>Kebutuhan:</strong> {match.providerData?.needs || '-'}
                      </p>
                      <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{match.providerWhatsapp}</span>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Connection Actions */}
                  <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>Hubungkan Kedua Pihak via WhatsApp</span>
                      </div>
                      <p className="text-[11px] text-neutral-400">
                        Kirim pesan perkenalan atau buat grup WhatsApp kolaborasi untuk mereka.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setWaModalMatch(match)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Buka Menu WhatsApp Grup</span>
                      </button>

                      {match.whatsappGroupLink && (
                        <a
                          href={match.whatsappGroupLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors flex items-center gap-1.5 font-mono"
                        >
                          <span>Buka Link Grup</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB 3: DATA SEMUA FORMULIR MASUK (SUBMISSIONS) ── */}
      {subTab === 'submissions' && (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan nama, industri, keahlian, kota, atau nomor WA..."
                className="w-full h-10 bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[hsl(var(--brand-accent))]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-500">Filter:</span>
              <button
                type="button"
                onClick={() => setRoleFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  roleFilter === 'all'
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 bg-neutral-950 hover:text-white'
                }`}
              >
                Semua ({submissions.length})
              </button>
              <button
                type="button"
                onClick={() => setRoleFilter('pencari_peluang')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  roleFilter === 'pencari_peluang'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'text-neutral-400 bg-neutral-950 hover:text-white'
                }`}
              >
                Pencari ({submissions.filter((s) => s.type === 'pencari_peluang').length})
              </button>
              <button
                type="button"
                onClick={() => setRoleFilter('pemberi_peluang')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  roleFilter === 'pemberi_peluang'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-neutral-400 bg-neutral-950 hover:text-white'
                }`}
              >
                Pemberi ({submissions.filter((s) => s.type === 'pemberi_peluang').length})
              </button>
            </div>
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="p-12 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 text-center space-y-2">
              <p className="text-xs text-neutral-400">Tidak ada formulir yang sesuai dengan filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-md ${
                        sub.type === 'pencari_peluang'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {sub.type === 'pencari_peluang' ? 'Pencari Peluang' : 'Pemberi Peluang'}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDeleteSub(sub.id, sub.name)}
                      className="text-neutral-600 hover:text-rose-400 p-1 rounded-lg transition-colors cursor-pointer"
                      title="Hapus formulir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center justify-between">
                      <span>{sub.name}</span>
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{sub.whatsapp}</span>
                      </span>
                    </h4>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-400 mt-1 font-mono">
                      <span>{sub.industry}</span>
                      <span>•</span>
                      <span>{sub.location}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs border-t border-neutral-900 pt-2 text-neutral-300">
                    <p>
                      <strong className="text-neutral-400 font-mono text-[10px] block mb-0.5">Deskripsi:</strong> 
                      <span className="leading-relaxed">{sub.description || sub.skills}</span>
                    </p>
                  </div>

                  <div className="text-[10px] text-neutral-600 font-mono pt-1">
                    Diterima: {new Date(sub.createdAt).toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── APPROVAL CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {approvingMatch && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setApprovingMatch(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl z-10 space-y-5"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Konfirmasi Persetujuan Kemitraan</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Setujui Pasangan: {approvingMatch.seekerName} & {approvingMatch.providerName}
                </h3>
                <p className="text-xs text-neutral-400">
                  Setelah disetujui, hasil pencocokan ini akan dipindahkan ke tab <strong>"Disetujui"</strong> dan statusnya diperbarui menjadi <strong>"Disetujui"</strong> di database.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase font-mono mb-1.5">
                    Link Undangan Grup WhatsApp (Opsional)
                  </label>
                  <input
                    type="url"
                    value={waGroupLink}
                    onChange={(e) => setWaGroupLink(e.target.value)}
                    placeholder="https://chat.whatsapp.com/..."
                    className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Anda juga dapat memasukkan link grup ini nanti dari tab "Disetujui".
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase font-mono mb-1.5">
                    Catatan Internal Admin (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Contoh: Sudah verifikasi nomor WA, kedua pihak siap zoom meeting besok..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setApprovingMatch(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={processingApproval}
                  onClick={handleConfirmApproval}
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-all cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {processingApproval ? (
                    <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-neutral-950" />
                  )}
                  <span>Setujui Kemitraan</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── WHATSAPP INTRO & CONNECT MODAL ── */}
      <AnimatePresence>
        {waModalMatch && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWaModalMatch(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl z-10 space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      Hubungkan via WhatsApp Kolaborasi
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      {waModalMatch.seekerName} & {waModalMatch.providerName}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setWaModalMatch(null)}
                  className="text-neutral-500 hover:text-white p-1 rounded-lg"
                >
                  ✕
                </button>
              </div>

              {/* 1. Direct 1-on-1 WhatsApp Links */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase font-mono text-neutral-400 block">
                  1. Hubungi Langsung Masing-masing Mitra (Personal Chat):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={createDirectWhatsappUrl(
                      waModalMatch.seekerWhatsapp,
                      waModalMatch.seekerName,
                      waModalMatch.providerName,
                      'Pemberi Peluang'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 text-xs text-white flex items-center justify-between transition-all"
                  >
                    <div>
                      <div className="font-bold flex items-center gap-1.5 text-emerald-400">
                        <Phone className="w-3.5 h-3.5" />
                        <span>Chat {waModalMatch.seekerName}</span>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">{waModalMatch.seekerWhatsapp}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-neutral-500" />
                  </a>

                  <a
                    href={createDirectWhatsappUrl(
                      waModalMatch.providerWhatsapp,
                      waModalMatch.providerName,
                      waModalMatch.seekerName,
                      'Pencari Peluang'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 text-xs text-white flex items-center justify-between transition-all"
                  >
                    <div>
                      <div className="font-bold flex items-center gap-1.5 text-emerald-400">
                        <Phone className="w-3.5 h-3.5" />
                        <span>Chat {waModalMatch.providerName}</span>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">{waModalMatch.providerWhatsapp}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-neutral-500" />
                  </a>
                </div>
              </div>

              {/* 2. Group Welcome Text Template */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase font-mono text-neutral-400">
                    2. Template Sambutan Grup WhatsApp Kolaborasi:
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(createGroupWelcomeMessage(waModalMatch))}
                    className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer font-mono"
                  >
                    {copiedWelcomeMsg ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedWelcomeMsg ? 'Tersalin!' : 'Salin Pesan'}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 font-mono whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto">
                  {createGroupWelcomeMessage(waModalMatch)}
                </div>
                <p className="text-[11px] text-neutral-500">
                  Buat grup WhatsApp baru dengan memasukkan nomor kedua mitra, lalu tempel (*paste*) pesan sambutan di atas untuk memperkenalkan mereka secara profesional.
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setWaModalMatch(null)}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-neutral-950 bg-white hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
