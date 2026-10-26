import React, { useEffect, useState, useRef } from 'react';
import { db, auth } from '../lib/firebase';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { motion } from 'motion/react';
import { 
  collection, 
  serverTimestamp, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  setDoc, 
  getDoc 
} from 'firebase/firestore';
import { 
  Loader2, 
  Plus, 
  Trash2, 
  Copy, 
  LogOut, 
  CheckCheck,
  Check, 
  Eye, 
  EyeOff, 
  Link2, 
  Layers, 
  Chrome, 
  ShieldAlert,
  Sparkles,
  Zap,
  Globe,
  UserPlus,
  ExternalLink,
  ShieldCheck,
  Share2,
  Lock,
  Mail,
  KeyRound,
  Users,
  TrendingUp,
  Sliders,
  Clock,
  Megaphone,
  Timer,
  QrCode,
  CheckCircle2,
  AlertCircle,
  CircleDollarSign,
  RefreshCw,
  Edit3,
  Search,
  Video,
  Play,
  Image as ImageIcon,
  FileText,
  Type,
  RotateCcw,
  Save,
  HelpCircle
} from 'lucide-react';
import { handleFirestoreError, OperationType } from '../lib/firestoreError';
import {
  subscribeProfileAccess,
  updateProfileAccess,
  getCachedProfileAccess
} from '../lib/profileAccessService';
import { 
  fetchCreatorInvites, 
  createCreatorInvite, 
  deleteCreatorInvite, 
  CreatorInvite,
  fetchRawFirestoreProfiles,
  deleteProfileById,
  FirestoreProfileData
} from '../lib/profileService';
import {
  getHeroCounterConfig,
  saveHeroRulesConfig,
  overrideHeroCount,
  manualStepHeroCount,
  saveGroupRulesConfig,
  overrideGroupCount,
  manualStepGroupCount,
  subscribeHeroCounter,
  HeroCounterConfig,
  DEFAULT_HERO_COUNTER
} from '../lib/heroCounterService';
import {
  AnnouncementBarConfig,
  DEFAULT_ANNOUNCEMENT,
  saveAnnouncementConfig,
  subscribeAnnouncement
} from '../lib/announcementService';
import {
  CtaConfig,
  DEFAULT_CTA_CONFIG,
  saveCtaConfig,
  subscribeCtaConfig,
  getCachedCtaEnabled
} from '../lib/ctaService';
import {
  VideoEmbedConfig,
  DEFAULT_VIDEO_CONFIG,
  saveVideoConfig,
  subscribeVideoConfig,
  getCachedVideoConfig,
  extractYoutubeId
} from '../lib/videoEmbedService';
import {
  WebsiteContentConfig,
  DEFAULT_WEBSITE_CONTENT,
  PRESET_IMAGES,
  getCachedWebsiteContent,
  subscribeWebsiteContent,
  saveWebsiteContent,
  extractYoutubeId as extractYoutubeCleanId
} from '../lib/websiteContentService';
import { AdminImagePicker } from '../components/AdminImagePicker';

const ADMIN_EMAIL = 'dikyindra444@gmail.com';
const ALLOWED_ADMIN_EMAILS = [
  'dikyindra444@gmail.com',
  'ykidardni1234@gmail.com',
  'ykidardni12345@gmail.com',
];
const ADMIN_PASSWORD_HASH = 'Stemapallm1!';
const SESSION_KEY = 'admin_session';
const SESSION_EMAIL_KEY = 'admin_session_email';

interface AccessToken {
  id: string;
  type: 'single' | 'multi';
  uses: number;
  createdAt: Date;
  createdBy: string;
}

import { ProfileAvatar } from '../components/NetworkDirectory';

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [currentAdminEmail, setCurrentAdminEmail] = useState(ADMIN_EMAIL);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
  // Email & Password Auth state
  const [emailInput, setEmailInput] = useState(ADMIN_EMAIL);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [tokens, setTokens] = useState<AccessToken[]>([]);
  const [creatorInvites, setCreatorInvites] = useState<CreatorInvite[]>([]);
  const [partnerProfiles, setPartnerProfiles] = useState<FirestoreProfileData[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [deletingProfileId, setDeletingProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  // 3 Admin choices: 'creator' (Pembuat Profil & Mitra) | 'content' (Atur Konten Website) | 'rules' (Angka Live & Countdown)
  const [activeTab, setActiveTab] = useState<'creator' | 'content' | 'rules'>('creator');
  const [rulesFilter, setRulesFilter] = useState<'all' | 'hero' | 'countdown' | 'cta' | 'video'>('all');
  
  // ── Website Content State (Embed Video, Gambar, Teks) ──
  const [contentConfig, setContentConfig] = useState<WebsiteContentConfig>(getCachedWebsiteContent);
  const [contentForm, setContentForm] = useState<WebsiteContentConfig>(getCachedWebsiteContent);
  const [contentSubTab, setContentSubTab] = useState<'all' | 'video' | 'images' | 'texts'>('all');
  const [savingContent, setSavingContent] = useState(false);
  const [contentSuccessMsg, setContentSuccessMsg] = useState('');
  const [activeTextLang, setActiveTextLang] = useState<string>('id-ID');

  const SUPPORTED_ADMIN_LANGUAGES = [
    { code: 'id-ID', label: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'en-US', label: 'English', flag: '🇬🇧' },
    { code: 'es-ES', label: 'Español', flag: '🇪🇸' },
    { code: 'fr-FR', label: 'Français', flag: '🇫🇷' },
    { code: 'de-DE', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja-JP', label: '日本語', flag: '🇯🇵' },
    { code: 'zh-CN', label: '中文', flag: '🇨🇳' },
    { code: 'ru-RU', label: 'Русский', flag: '🇷🇺' },
    { code: 'ar-SA', label: 'العربية', flag: '🇸🇦' },
    { code: 'tr-TR', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'ko-KR', label: '한국어', flag: '🇰🇷' },
    { code: 'pt-PT', label: 'Português', flag: '🇵🇹' },
  ];

  const getFormText = (field: keyof WebsiteContentConfig): string => {
    if (activeTextLang === 'id-ID') {
      return (contentForm[field] as string) || '';
    }
    return contentForm.texts?.[activeTextLang]?.[field as string] || '';
  };

  const handleFormTextChange = (field: string, value: string) => {
    setContentForm((prev) => {
      if (activeTextLang === 'id-ID') {
        return {
          ...prev,
          [field]: value,
        };
      }
      const currentTexts = prev.texts || {};
      const langTexts = currentTexts[activeTextLang] || {};
      return {
        ...prev,
        texts: {
          ...currentTexts,
          [activeTextLang]: {
            ...langTexts,
            [field]: value,
          },
        },
      };
    });
  };

  // Announcement Bar state
  const [announcementConfig, setAnnouncementConfig] = useState<AnnouncementBarConfig>(DEFAULT_ANNOUNCEMENT);
  const [announcementEnabled, setAnnouncementEnabled] = useState(true);
  const [announcementMessage, setAnnouncementMessage] = useState('Pendaftaran kolaborasi ditutup dalam:');
  const [announcementMessageEn, setAnnouncementMessageEn] = useState('Collaboration registration closes in:');
  const [announcementTargetDate, setAnnouncementTargetDate] = useState('');
  const [announcementAutoRoll, setAnnouncementAutoRoll] = useState<number>(3);
  const [savingAnnouncement, setSavingAnnouncement] = useState(false);
  const [announcementSuccessMsg, setAnnouncementSuccessMsg] = useState('');

  // Hero Counter state (Members)
  const [counterConfig, setCounterConfig] = useState<HeroCounterConfig>(DEFAULT_HERO_COUNTER);
  const [inputCurrentCount, setInputCurrentCount] = useState<string>('1000000');
  const [inputMinIncrement, setInputMinIncrement] = useState<string>('1');
  const [inputMaxIncrement, setInputMaxIncrement] = useState<string>('3');
  const [inputIntervalValue, setInputIntervalValue] = useState<string>('1');
  const [inputIntervalUnit, setInputIntervalUnit] = useState<'seconds' | 'minutes'>('minutes');
  const [savingCounter, setSavingCounter] = useState(false);
  const [counterSuccessMsg, setCounterSuccessMsg] = useState('');
  const [testingTick, setTestingTick] = useState(false);

  // Hero Group Counter state (Groups Created)
  const [inputGroupCount, setInputGroupCount] = useState<string>('342180');
  const [inputGroupMinIncrement, setInputGroupMinIncrement] = useState<string>('1');
  const [inputGroupMaxIncrement, setInputGroupMaxIncrement] = useState<string>('2');
  const [inputGroupIntervalValue, setInputGroupIntervalValue] = useState<string>('2');
  const [inputGroupIntervalUnit, setInputGroupIntervalUnit] = useState<'seconds' | 'minutes'>('minutes');
  const [savingGroupCounter, setSavingGroupCounter] = useState(false);
  const [groupCounterSuccessMsg, setGroupCounterSuccessMsg] = useState('');
  const [testingGroupTick, setTestingGroupTick] = useState(false);

  // Creator invite form state
  const [creatorCode, setCreatorCode] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [creatorLimitType, setCreatorLimitType] = useState<'single' | 'custom' | 'unlimited'>('single');
  const [creatorMaxUses, setCreatorMaxUses] = useState<number>(5);
  const [creatorError, setCreatorError] = useState('');
  const [creatorCopiedId, setCreatorCopiedId] = useState<string | null>(null);

  // Profile Access / Search Lock toggle state
  const [profileAccessEnabled, setProfileAccessEnabled] = useState<boolean>(getCachedProfileAccess);
  const [savingProfileAccess, setSavingProfileAccess] = useState<boolean>(false);
  const [profileAccessToast, setProfileAccessToast] = useState<string>('');

  // CTA Visibility toggle state (Default: false / disembunyikan)
  const [ctaEnabled, setCtaEnabled] = useState<boolean>(getCachedCtaEnabled);
  const [savingCta, setSavingCta] = useState<boolean>(false);
  const [ctaSuccessMsg, setCtaSuccessMsg] = useState<string>('');

  // Video Embed Visibility & YouTube URL/ID state
  const [videoConfig, setVideoConfig] = useState<VideoEmbedConfig>(getCachedVideoConfig);
  const [inputYoutubeUrl, setInputYoutubeUrl] = useState<string>(getCachedVideoConfig().youtubeVideoId || '8mAITcNt710');
  const [savingVideo, setSavingVideo] = useState<boolean>(false);
  const [videoSuccessMsg, setVideoSuccessMsg] = useState<string>('');

  // Bulk & Custom general tokens state
  const [bulkCount, setBulkCount] = useState(5);
  const [linkType, setLinkType] = useState<'single' | 'multi'>('single');
  const [customSlug, setCustomSlug] = useState('');
  const [customError, setCustomError] = useState('');
  
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  // Check auth state & session on mount
  useEffect(() => {
    // 1. Check if Firebase Auth has an active user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        const userEmail = user.email.toLowerCase();
        if (ALLOWED_ADMIN_EMAILS.includes(userEmail)) {
          sessionStorage.setItem(SESSION_KEY, 'true');
          sessionStorage.setItem(SESSION_EMAIL_KEY, user.email);
          setCurrentAdminEmail(user.email);
          setAuthed(true);
          fetchAllData();
          return;
        }
      }

      // 2. Check session storage fallback
      if (sessionStorage.getItem(SESSION_KEY) === 'true') {
        setAuthed(true);
        const storedEmail = sessionStorage.getItem(SESSION_EMAIL_KEY);
        if (storedEmail) setCurrentAdminEmail(storedEmail);
        fetchAllData();
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([fetchTokens(), loadCreatorInvites(), loadPartnerProfiles()]);
  };

  const loadCreatorInvites = async () => {
    const invites = await fetchCreatorInvites();
    setCreatorInvites(invites);
  };

  const loadPartnerProfiles = async () => {
    setLoadingProfiles(true);
    const profs = await fetchRawFirestoreProfiles();
    setPartnerProfiles(profs);
    setLoadingProfiles(false);
  };

  const handleDeletePartnerProfile = async (id: string, name: string) => {
    if (!window.confirm(`Hapus profil "${name}" dari database? Tindakan ini akan menghapusnya dari direktori publik.`)) {
      return;
    }
    setDeletingProfileId(id);
    const res = await deleteProfileById(id);
    if (res.success) {
      setPartnerProfiles((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert(res.error || 'Gagal menghapus profil.');
    }
    setDeletingProfileId(null);
  };

  // Subscribe to real-time hero counter configuration from Firestore
  useEffect(() => {
    if (!authed) return;
    const unsubscribe = subscribeHeroCounter((config) => {
      setCounterConfig(config);
    });
    return () => unsubscribe();
  }, [authed]);

  // Subscribe to real-time profile access status
  useEffect(() => {
    if (!authed) return;
    const unsubscribe = subscribeProfileAccess((enabled) => {
      setProfileAccessEnabled(enabled);
    });
    return () => unsubscribe();
  }, [authed]);

  // Subscribe to real-time CTA visibility configuration from Firestore
  useEffect(() => {
    if (!authed) return;
    const unsubscribe = subscribeCtaConfig((config) => {
      setCtaEnabled(config.enabled);
    });
    return () => unsubscribe();
  }, [authed]);

  // Subscribe to real-time Video Embed configuration from Firestore
  useEffect(() => {
    if (!authed) return;
    const unsubscribe = subscribeVideoConfig((config) => {
      setVideoConfig(config);
      if (config.youtubeVideoId) {
        setInputYoutubeUrl(config.youtubeVideoId);
      }
    });
    return () => unsubscribe();
  }, [authed]);

  // Subscribe to real-time Website Content (video, images, text) from Firestore
  useEffect(() => {
    if (!authed) return;
    const unsubscribe = subscribeWebsiteContent((config) => {
      setContentConfig(config);
      setContentForm((prev) => ({
        ...config,
        ...prev, // preserve active user edits while keeping background synced
      }));
    });
    return () => unsubscribe();
  }, [authed]);

  const handleToggleProfileAccess = async (nextState: boolean) => {
    setSavingProfileAccess(true);
    try {
      await updateProfileAccess(nextState);
      setProfileAccessEnabled(nextState);
      setProfileAccessToast(
        nextState
          ? 'Halaman profil & search diaktifkan! Pencarian dapat diakses.'
          : 'Halaman profil dinonaktifkan! Pencarian tidak dapat diakses.'
      );
      setTimeout(() => setProfileAccessToast(''), 3500);
    } catch (err) {
      console.error('Gagal mengubah status akses profil:', err);
      alert('Gagal memperbarui status akses profil ke database.');
    } finally {
      setSavingProfileAccess(false);
    }
  };

  const handleToggleCta = async (nextState: boolean) => {
    setSavingCta(true);
    setCtaSuccessMsg('');
    try {
      const success = await saveCtaConfig(nextState, currentAdminEmail || 'admin');
      if (success) {
        setCtaEnabled(nextState);
        setCtaSuccessMsg(
          nextState
            ? 'Section CTA berhasil DIAKTIFKAN! Tampil di halaman utama tepat di atas globe.'
            : 'Section CTA berhasil DISEMBUNYIKAN dari halaman utama.'
        );
        setTimeout(() => setCtaSuccessMsg(''), 4500);
      } else {
        alert('Gagal memperbarui status visibilitas CTA ke database.');
      }
    } catch (err) {
      console.error('Gagal mengubah visibilitas CTA:', err);
      alert('Gagal memperbarui status visibilitas CTA ke database.');
    } finally {
      setSavingCta(false);
    }
  };

  const handleToggleVideo = async (nextState: boolean) => {
    setSavingVideo(true);
    setVideoSuccessMsg('');
    try {
      const success = await saveVideoConfig({ enabled: nextState }, currentAdminEmail || 'admin');
      if (success) {
        setVideoConfig((prev) => ({ ...prev, enabled: nextState }));
        setVideoSuccessMsg(
          nextState
            ? 'Embed Video YouTube berhasil DIAKTIFKAN! Tampil di halaman depan di atas kolom pencarian.'
            : 'Embed Video YouTube berhasil DISEMBUNYIKAN dari halaman depan.'
        );
        setTimeout(() => setVideoSuccessMsg(''), 4500);
      } else {
        alert('Gagal memperbarui status visibilitas video ke database.');
      }
    } catch (err) {
      console.error('Gagal mengubah visibilitas video:', err);
      alert('Gagal memperbarui status visibilitas video ke database.');
    } finally {
      setSavingVideo(false);
    }
  };

  const handleSaveVideoId = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingVideo(true);
    setVideoSuccessMsg('');
    try {
      const cleanId = extractYoutubeId(inputYoutubeUrl);
      const success = await saveVideoConfig({ youtubeVideoId: cleanId }, currentAdminEmail || 'admin');
      if (success) {
        setInputYoutubeUrl(cleanId);
        setVideoConfig((prev) => ({ ...prev, youtubeVideoId: cleanId }));
        setVideoSuccessMsg(`ID Video YouTube berhasil disimpan (${cleanId})!`);
        setTimeout(() => setVideoSuccessMsg(''), 4500);
      } else {
        alert('Gagal menyimpan ID video ke database.');
      }
    } catch (err) {
      console.error('Gagal menyimpan ID video:', err);
      alert('Gagal memperbarui ID video ke database.');
    } finally {
      setSavingVideo(false);
    }
  };

  // Ref to prevent background counter ticks from overwriting active form inputs
  const hasInitializedRulesRef = useRef(false);
  const prevTabRef = useRef<'creator' | 'content' | 'rules'>('creator');

  // Sync inputs ONLY on initial fetch or when specifically switching tabs to 'rules'
  useEffect(() => {
    if (!counterConfig) return;

    const isSwitchingToRules = prevTabRef.current !== 'rules' && activeTab === 'rules';
    const isFirstInit = !hasInitializedRulesRef.current && activeTab === 'rules';

    if (isFirstInit || isSwitchingToRules) {
      setInputMinIncrement(String(counterConfig.minIncrement || 1));
      setInputMaxIncrement(String(counterConfig.maxIncrement || 3));
      
      const mUnit = counterConfig.intervalUnit || (counterConfig.intervalMinutes && counterConfig.intervalMinutes < 1 ? 'seconds' : 'minutes');
      const mVal = counterConfig.intervalValue !== undefined
        ? counterConfig.intervalValue
        : (mUnit === 'seconds' ? Math.round(counterConfig.intervalMinutes * 60) : counterConfig.intervalMinutes || 1);
      setInputIntervalUnit(mUnit);
      setInputIntervalValue(String(mVal));
      setInputCurrentCount(String(counterConfig.currentCount || 1000000));

      setInputGroupMinIncrement(String(counterConfig.groupMinIncrement || 1));
      setInputGroupMaxIncrement(String(counterConfig.groupMaxIncrement || 2));
      
      const gUnit = counterConfig.groupIntervalUnit || (counterConfig.groupIntervalMinutes && counterConfig.groupIntervalMinutes < 1 ? 'seconds' : 'minutes');
      const gVal = counterConfig.groupIntervalValue !== undefined
        ? counterConfig.groupIntervalValue
        : (gUnit === 'seconds' ? Math.round(counterConfig.groupIntervalMinutes * 60) : counterConfig.groupIntervalMinutes || 2);
      setInputGroupIntervalUnit(gUnit);
      setInputGroupIntervalValue(String(gVal));
      setInputGroupCount(String(counterConfig.groupCount || 342180));

      hasInitializedRulesRef.current = true;
    }

    // Sync contentForm when switching to content tab if fresh
    if (activeTab === 'content' && prevTabRef.current !== 'content') {
      setContentForm((prev) => ({
        ...prev,
        ...contentConfig,
      }));
    }

    prevTabRef.current = activeTab;
  }, [activeTab, counterConfig, contentConfig]);

  // ── Website Content Handlers (Embed Video, Gambar, Teks) ──
  const handleContentFieldChange = <K extends keyof WebsiteContentConfig>(
    field: K,
    value: WebsiteContentConfig[K]
  ) => {
    setContentForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveAllContent = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSavingContent(true);
    setContentSuccessMsg('');
    try {
      const cleanVideoId = extractYoutubeCleanId(contentForm.youtubeVideoId);
      const payload: Partial<WebsiteContentConfig> = {
        ...contentForm,
        youtubeVideoId: cleanVideoId,
      };
      const success = await saveWebsiteContent(payload, currentAdminEmail || 'admin');
      if (success) {
        setContentSuccessMsg('Pengaturan konten website (embed video, gambar, dan teks) berhasil disimpan dan disinkronkan real-time!');
        setTimeout(() => setContentSuccessMsg(''), 5000);
      } else {
        alert('Gagal menyimpan pengaturan konten website ke database.');
      }
    } catch (err) {
      console.error('Error saving website content:', err);
      alert('Gagal menyimpan konten ke database.');
    } finally {
      setSavingContent(false);
    }
  };

  const handleResetToDefaultContent = async () => {
    if (!window.confirm('Kembalikan semua teks, gambar, dan pengaturan video ke default bawaan sistem?')) return;
    setSavingContent(true);
    setContentSuccessMsg('');
    try {
      const success = await saveWebsiteContent(DEFAULT_WEBSITE_CONTENT, currentAdminEmail || 'admin');
      if (success) {
        setContentForm(DEFAULT_WEBSITE_CONTENT);
        setContentSuccessMsg('Konten website berhasil dikembalikan ke pengaturan default!');
        setTimeout(() => setContentSuccessMsg(''), 4500);
      }
    } catch (err) {
      console.error('Error resetting content:', err);
    } finally {
      setSavingContent(false);
    }
  };

  // Save rules and base count permanently to Firestore
  const handleSaveCounterRules = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCounter(true);
    setCounterSuccessMsg('');

    const minIncrement = Math.max(1, parseInt(inputMinIncrement, 10) || 1);
    const maxIncrement = Math.max(minIncrement, parseInt(inputMaxIncrement, 10) || minIncrement);
    const intervalValue = Math.max(1, parseFloat(inputIntervalValue) || 1);
    const intervalUnit = inputIntervalUnit;

    const rawCount = parseInt(inputCurrentCount.replace(/[^0-9]/g, ''), 10);
    const currentCount = !isNaN(rawCount) && rawCount >= 0 ? rawCount : undefined;

    const success = await saveHeroRulesConfig({
      minIncrement,
      maxIncrement,
      intervalValue,
      intervalUnit,
      currentCount,
    });

    setSavingCounter(false);
    if (success) {
      setCounterSuccessMsg('Pengaturan angka anggota berhasil disimpan permanen!');
      setTimeout(() => setCounterSuccessMsg(''), 4000);
    } else {
      alert('Gagal menyimpan pengaturan ke database.');
    }
  };

  // Save group rules and base group count permanently to Firestore
  const handleSaveGroupCounterRules = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingGroupCounter(true);
    setGroupCounterSuccessMsg('');

    const groupMinIncrement = Math.max(1, parseInt(inputGroupMinIncrement, 10) || 1);
    const groupMaxIncrement = Math.max(groupMinIncrement, parseInt(inputGroupMaxIncrement, 10) || groupMinIncrement);
    const groupIntervalValue = Math.max(1, parseFloat(inputGroupIntervalValue) || 1);
    const groupIntervalUnit = inputGroupIntervalUnit;

    const rawGroupCount = parseInt(inputGroupCount.replace(/[^0-9]/g, ''), 10);
    const groupCount = !isNaN(rawGroupCount) && rawGroupCount >= 0 ? rawGroupCount : undefined;

    const success = await saveGroupRulesConfig({
      groupMinIncrement,
      groupMaxIncrement,
      groupIntervalValue,
      groupIntervalUnit,
      groupCount,
    });

    setSavingGroupCounter(false);
    if (success) {
      setGroupCounterSuccessMsg('Pengaturan angka grup berhasil disimpan permanen!');
      setTimeout(() => setGroupCounterSuccessMsg(''), 4000);
    } else {
      alert('Gagal menyimpan pengaturan grup ke database.');
    }
  };

  // Helper to format ISO to datetime-local input string
  const formatDatetimeLocal = (isoString: string) => {
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return '';
      const pad = (n: number) => String(n).padStart(2, '0');
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    } catch {
      return '';
    }
  };

  // Subscribe to announcement bar configuration from Firestore
  useEffect(() => {
    if (!authed) return;
    const unsubscribe = subscribeAnnouncement((cfg) => {
      setAnnouncementConfig(cfg);
      setAnnouncementEnabled(cfg.enabled);
      setAnnouncementMessage(cfg.message || '');
      setAnnouncementMessageEn(cfg.messageEn || '');
      setAnnouncementTargetDate(formatDatetimeLocal(cfg.targetDate));
      setAnnouncementAutoRoll(cfg.autoRollDays ?? 3);
    });
    return () => unsubscribe();
  }, [authed]);

  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAnnouncement(true);
    setAnnouncementSuccessMsg('');

    let finalIso = announcementConfig.targetDate;
    if (announcementTargetDate) {
      try {
        finalIso = new Date(announcementTargetDate).toISOString();
      } catch {
        finalIso = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
      }
    }

    const ok = await saveAnnouncementConfig({
      enabled: announcementEnabled,
      badgeText: '',
      message: announcementMessage.trim(),
      messageEn: announcementMessageEn.trim(),
      targetDate: finalIso,
      buttonText: '',
      buttonTextEn: '',
      buttonLink: '',
      theme: 'accent',
      autoRollDays: announcementAutoRoll,
    });

    setSavingAnnouncement(false);
    if (ok) {
      setAnnouncementSuccessMsg('Pengaturan Announcement Bar & Countdown berhasil disimpan ke database!');
      setTimeout(() => setAnnouncementSuccessMsg(''), 4500);
    } else {
      alert('Gagal menyimpan pengumuman ke database.');
    }
  };

  // Secure Email + Password Login
  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    if (!cleanEmail) {
      setLoginError('Mohon masukkan email administrator.');
      setLoginLoading(false);
      return;
    }

    if (!cleanPass) {
      setLoginError('Mohon masukkan kata sandi administrator.');
      setLoginLoading(false);
      return;
    }

    const isAllowedEmail = ALLOWED_ADMIN_EMAILS.includes(cleanEmail);
    if (!isAllowedEmail) {
      setLoginError('Akses ditolak. Email tidak terdaftar sebagai administrator.');
      setLoginLoading(false);
      return;
    }

    try {
      // 1. Try Firebase Auth sign in
      try {
        await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
      } catch (authErr: any) {
        // If user not registered yet in Firebase Auth, auto-provision if credentials match authorized secret
        if (
          (authErr.code === 'auth/user-not-found' || 
           authErr.code === 'auth/invalid-credential' || 
           authErr.code === 'auth/invalid-login-credentials') &&
          cleanPass === ADMIN_PASSWORD_HASH
        ) {
          try {
            await createUserWithEmailAndPassword(auth, cleanEmail, cleanPass);
          } catch (createErr: any) {
            console.warn('Auto create Firebase Auth user:', createErr?.message);
          }
        } else if (cleanPass !== ADMIN_PASSWORD_HASH) {
          throw new Error('Kata sandi yang Anda masukkan salah. Silakan coba lagi.');
        }
      }

      // Check if password matches
      if (cleanPass === ADMIN_PASSWORD_HASH || auth.currentUser) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        sessionStorage.setItem(SESSION_EMAIL_KEY, cleanEmail);
        setCurrentAdminEmail(cleanEmail);
        setAuthed(true);
        setLoginError('');
        fetchAllData();
      } else {
        setLoginError('Kata sandi salah. Silakan periksa kembali.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setLoginError(err.message || 'Gagal masuk. Periksa email dan kata sandi Anda.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoginError('');
    setLoginLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const email = result.user?.email?.toLowerCase() || '';
      
      if (ALLOWED_ADMIN_EMAILS.includes(email)) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        sessionStorage.setItem(SESSION_EMAIL_KEY, result.user?.email || email);
        setCurrentAdminEmail(result.user?.email || email);
        setAuthed(true);
        fetchAllData();
      } else {
        await signOut(auth);
        setLoginError(`Akses ditolak. Email Google ${email} tidak terdaftar sebagai administrator.`);
      }
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      setLoginError('Sign-in Google gagal. Harap izinkan popup browser dan coba lagi.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_EMAIL_KEY);
    try {
      await signOut(auth);
    } catch (_e) {
      // ignore
    }
    setAuthed(false);
    setTokens([]);
    setCreatorInvites([]);
  };

  const fetchTokens = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'tokens'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => {
        const item = d.data();
        return {
          id: d.id,
          type: item.type || 'single',
          uses: item.uses || 0,
          createdAt: item.createdAt?.toDate() || new Date(),
          createdBy: item.createdBy || 'admin',
        };
      });
      data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setTokens(data);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'tokens');
    } finally {
      setLoading(false);
    }
  };

  const generateBulkTokens = async () => {
    setGenerating(true);
    const newIds: string[] = [];
    try {
      const allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < bulkCount; i++) {
        let randomId = '';
        for (let j = 0; j < 8; j++) {
          randomId += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
        }

        await setDoc(doc(db, 'tokens', randomId), {
          createdAt: serverTimestamp(),
          createdBy: auth.currentUser?.email || 'admin',
          type: linkType,
          uses: 0,
        });
        newIds.push(randomId);
      }
      await fetchTokens();
    } catch (error) {
      alert('Gagal membuat link bulk. Silakan periksa koneksi atau Firestore rules.');
      handleFirestoreError(error, OperationType.CREATE, 'tokens');
      setGenerating(false);
      return;
    }
    setGenerating(false);

    // Auto-copy newly generated links
    try {
      const links = newIds.map(id => `${window.location.origin}/${id}`).join('\n');
      await navigator.clipboard.writeText(links);
      setAllCopied(true);
      setTimeout(() => setAllCopied(false), 4000);
    } catch (clipErr) {
      console.warn('Clipboard copy skipped', clipErr);
    }
  };

  const handleCustomSlugChange = (val: string) => {
    // Sanitize to only alphanumeric, hyphens, and underscores
    const sanitized = val.toLowerCase().replace(/[^a-z0-9_-]/g, '');
    setCustomSlug(sanitized);
    setCustomError('');
  };

  const createCustomLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = customSlug.trim();
    if (!slug) return;

    setGenerating(true);
    setCustomError('');

    try {
      const docRef = doc(db, 'tokens', slug);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCustomError('Nama link kustom ini sudah digunakan. Harap gunakan nama lain.');
        setGenerating(false);
        return;
      }

      await setDoc(docRef, {
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser?.email || 'admin',
        type: linkType,
        uses: 0,
      });

      setCustomSlug('');
      await fetchTokens();

      // Copy custom link to clipboard
      const url = `${window.location.origin}/${slug}`;
      await navigator.clipboard.writeText(url);
      setCopiedId(slug);
      setTimeout(() => setCopiedId(null), 3000);
    } catch (error) {
      setCustomError('Gagal membuat link kustom.');
      handleFirestoreError(error, OperationType.CREATE, `tokens/${slug}`);
    } finally {
      setGenerating(false);
    }
  };

  const deleteToken = async (id: string) => {
    if (!confirm(`Hapus link "/${id}"?`)) return;
    try {
      await deleteDoc(doc(db, 'tokens', id));
      setTokens(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      alert('Gagal menghapus link.');
      handleFirestoreError(error, OperationType.DELETE, `tokens/${id}`);
    }
  };

  const copyLink = async (id: string) => {
    const url = `${window.location.origin}/${id}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyAllLinks = async () => {
    if (tokens.length === 0) return;
    const links = tokens.map(t => `${window.location.origin}/${t.id}`).join('\n');
    await navigator.clipboard.writeText(links);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 4000);
  };

  // ── Creator Invite Handlers ───────────────────────────────
  const handleGenerateRandomCreatorCode = () => {
    const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
    let code = 'partner-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCreatorCode(code);
    setCreatorError('');
  };

  const handleCreateCreatorInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = creatorCode.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
    if (!code) {
      setCreatorError('Mohon masukkan kode atau klik Acak Kode.');
      return;
    }

    setGenerating(true);
    setCreatorError('');

    const maxUses = creatorLimitType === 'unlimited' ? 0 : (creatorLimitType === 'single' ? 1 : Math.max(1, creatorMaxUses));

    const success = await createCreatorInvite(
      code, 
      creatorName.trim() || `Undangan ${code}`,
      auth.currentUser?.email || 'admin',
      maxUses
    );

    if (success) {
      await loadCreatorInvites();
      const url = `${window.location.origin}/buat-profil?invite=${code}`;
      try {
        await navigator.clipboard.writeText(url);
        setCreatorCopiedId(code);
        setTimeout(() => setCreatorCopiedId(null), 3500);
      } catch (_e) {
        // ignore
      }
      setCreatorCode('');
      setCreatorName('');
    } else {
      setCreatorError('Gagal membuat link undangan pembuat profil. Silakan coba lagi.');
    }
    setGenerating(false);
  };

  const handleDeleteCreatorInvite = async (id: string) => {
    if (!confirm(`Hapus link undangan pembuat profil "${id}"? Pengguna baru tidak akan bisa masuk menggunakan link ini.`)) return;
    const success = await deleteCreatorInvite(id);
    if (success) {
      setCreatorInvites(prev => prev.filter(i => i.id !== id));
    } else {
      alert('Gagal menghapus link undangan.');
    }
  };

  const copyCreatorLink = async (code: string) => {
    const url = `${window.location.origin}/buat-profil?invite=${code}`;
    await navigator.clipboard.writeText(url);
    setCreatorCopiedId(code);
    setTimeout(() => setCreatorCopiedId(null), 2500);
  };

  // ── Login screen ──────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 relative overflow-hidden">
        {/* Dynamic Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 filter blur-[120px] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />

        <div className="max-w-md w-full bg-neutral-950 border border-neutral-800/80 p-8 rounded-3xl shadow-2xl relative z-10">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3 shadow-inner">
              <KeyRound className="w-6 h-6 text-[hsl(var(--brand-accent))]" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">PartnerFind Admin Portal</h1>
            <p className="text-xs text-neutral-400 mt-1 max-w-[280px]">
              Akses khusus akun terverifikasi Administrator untuk mengelola link akses & partner.
            </p>
          </div>

          {/* Login Error */}
          {loginError && (
            <div className="mb-4 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 flex items-start gap-2.5 animate-fadeIn">
              <ShieldAlert className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <span className="text-xs text-destructive leading-relaxed font-medium">{loginError}</span>
            </div>
          )}

          {/* Email & Password Authentication Form */}
          <form onSubmit={handleEmailPasswordLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 font-mono">
                Email Administrator
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={e => { setEmailInput(e.target.value); setLoginError(''); }}
                  placeholder="ykidardni1234@gmail.com"
                  className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[hsl(var(--brand-accent))] font-medium transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 font-mono">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={e => { setPasswordInput(e.target.value); setLoginError(''); }}
                  placeholder="Masukkan kata sandi admin"
                  className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-11 text-sm text-white focus:outline-none focus:border-[hsl(var(--brand-accent))] font-medium transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="h-11 w-full bg-white hover:bg-neutral-200 text-black font-bold rounded-xl text-sm transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 mt-1 shadow-md"
            >
              {loginLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-black" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-black" />
              )}
              <span>{loginLoading ? 'Memverifikasi...' : 'Masuk sebagai Admin'}</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-900"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-neutral-950 px-3 text-neutral-600 font-mono uppercase text-[10px]">atau</span>
            </div>
          </div>

          {/* Google Sign In Option */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loginLoading}
            className="w-full h-11 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <Chrome className="w-4 h-4 text-white" />
            <span>Sign In 1-Klik dengan Google</span>
          </button>

          <p className="text-[11px] text-center text-neutral-600 mt-5 font-mono">
            Keamanan terenkripsi via Firebase Auth
          </p>
        </div>
      </div>
    );
  }

  // ── Admin dashboard ───────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-900">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Access Link Manager</h1>
            <p className="text-xs text-neutral-400 mt-1">
              Buat dan hapus link kustom atau bulk untuk membuka akses PartnerFind.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>{currentAdminEmail}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-400 border border-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Keluar
            </button>
          </div>
        </div>

        {/* Creator & Link Controls */}
        <div className="bg-neutral-950 border border-neutral-900 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex border-b border-neutral-900 mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('creator')}
              className={`pb-3 text-sm font-bold border-b-2 px-4 whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'creator' ? 'border-[hsl(var(--brand-accent))] text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <UserPlus className="w-4 h-4 text-[hsl(var(--brand-accent))]" />
              <span>1. Pembuat Profil & Mitra</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-400 border border-neutral-800 font-mono">
                {creatorInvites.length} Link • {partnerProfiles.length} Mitra
              </span>
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`pb-3 text-sm font-bold border-b-2 px-4 whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'content' ? 'border-indigo-400 text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>2. Atur Konten Website</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-mono font-bold">
                Teks • Gambar • Video
              </span>
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`pb-3 text-sm font-bold border-b-2 px-4 whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'rules' ? 'border-amber-400 text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>3. Angka Live & Countdown</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-400 border border-neutral-800 font-mono">
                Counter & Waktu
              </span>
            </button>
          </div>

          <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
            {activeTab === 'creator'
              ? 'Kelola link undangan pembuat profil (/buat-profil?invite=...) serta moderasi profil partner yang tersimpan di database Firestore.'
              : activeTab === 'content'
              ? 'Atur seluruh isi konten website secara fleksibel: Link embed video YouTube unggulan, link gambar & visual langkah kolaborasi, serta teks judul hero, fitur, CTA, dan footer.'
              : 'Pusat kendali aturan live counter: Angka Hero Live (Total Anggota & Total Grup) dan Countdown Target Announcement Bar. Seluruh perubahan tersinkronisasi secara real-time ke seluruh pengunjung.'}
          </p>

          {/* TAB 1: PEMBUAT PROFIL */}
          {activeTab === 'creator' && (
            <div className="space-y-6">
              {/* MASTER KONTROL: STATUS HALAMAN PROFIL & PENCARIAN (SEARCH) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 transition-colors ${
                      profileAccessEnabled
                        ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-sm'
                        : 'bg-neutral-800/80 border border-neutral-700 text-neutral-400'
                    }`}>
                      {profileAccessEnabled ? <Search className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-white">
                          Status Halaman Profil & Pencarian (Search)
                        </h3>
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                          profileAccessEnabled
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                        }`}>
                          {profileAccessEnabled ? '🟢 Aktif (Terbuka)' : '🔒 Nonaktif (Terkunci)'}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        {profileAccessEnabled
                          ? 'Pengunjung dapat mencari serta membuka halaman profil/mitra.'
                          : 'Akses halaman profil dinonaktifkan.'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={savingProfileAccess}
                    onClick={() => handleToggleProfileAccess(!profileAccessEnabled)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm shrink-0 w-full sm:w-auto ${
                      profileAccessEnabled
                        ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                        : 'bg-emerald-400 hover:bg-emerald-300 text-neutral-950'
                    }`}
                  >
                    {savingProfileAccess ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : profileAccessEnabled ? (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Kunci / Nonaktifkan Profil</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        <span>Buka / Aktifkan Halaman Profil</span>
                      </>
                    )}
                  </button>
                </div>

                {profileAccessToast && (
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                    <CheckCheck className="w-4 h-4 shrink-0" />
                    <span>{profileAccessToast}</span>
                  </div>
                )}
              </div>

              {/* MASTER KONTROL: STATUS VISIBILITAS CTA (BAGIKAN) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 transition-colors ${
                      ctaEnabled
                        ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300 shadow-sm'
                        : 'bg-neutral-800/80 border border-neutral-700 text-neutral-400'
                    }`}>
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-white">
                          Status Visibilitas CTA (Call to Action / Bagikan)
                        </h3>
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                          ctaEnabled
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                        }`}>
                          {ctaEnabled ? '🟢 Aktif (Tampil)' : '🔒 Nonaktif (Disembunyikan)'}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        {ctaEnabled
                          ? 'Section CTA dengan tombol Bagikan dan efek cahaya bahasa aktif di atas globe.'
                          : 'Section CTA disembunyikan dari halaman depan website.'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={savingCta}
                    onClick={() => handleToggleCta(!ctaEnabled)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm shrink-0 w-full sm:w-auto ${
                      ctaEnabled
                        ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                        : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30'
                    }`}
                  >
                    {savingCta ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : ctaEnabled ? (
                      <>
                        <EyeOff className="w-4 h-4 text-rose-400" />
                        <span>Sembunyikan CTA</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 text-emerald-300" />
                        <span>Aktifkan CTA</span>
                      </>
                    )}
                  </button>
                </div>

                {ctaSuccessMsg && (
                  <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/50 text-purple-300 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                    <CheckCheck className="w-4 h-4 shrink-0 text-purple-400" />
                    <span>{ctaSuccessMsg}</span>
                  </div>
                )}
              </div>

              {/* MASTER KONTROL: STATUS VISIBILITAS EMBED VIDEO YOUTUBE */}
              <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 transition-colors ${
                      videoConfig.enabled
                        ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 shadow-sm'
                        : 'bg-neutral-800/80 border border-neutral-700 text-neutral-400'
                    }`}>
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-white">
                          Status Visibilitas Embed Video YouTube
                        </h3>
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                          videoConfig.enabled
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                        }`}>
                          {videoConfig.enabled ? '🟢 Aktif (Tampil)' : '🔒 Nonaktif (Disembunyikan)'}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        {videoConfig.enabled
                          ? 'Video YouTube unggulan ditampilkan di halaman depan tepat di atas kolom pencarian.'
                          : 'Video YouTube disembunyikan. Judul halaman langsung menyatu ke kolom pencarian & countdown.'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={savingVideo}
                    onClick={() => handleToggleVideo(!videoConfig.enabled)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm shrink-0 w-full sm:w-auto ${
                      videoConfig.enabled
                        ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                        : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                    }`}
                  >
                    {savingVideo ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : videoConfig.enabled ? (
                      <>
                        <EyeOff className="w-4 h-4 text-rose-400" />
                        <span>Sembunyikan Video</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current text-emerald-300" />
                        <span>Aktifkan Video</span>
                      </>
                    )}
                  </button>
                </div>

                {videoSuccessMsg && (
                  <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/50 text-rose-300 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                    <CheckCheck className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{videoSuccessMsg}</span>
                  </div>
                )}
              </div>

              {/* FORM BUAT LINK UNDANGAN PEMBUAT PROFIL */}
              <form onSubmit={handleCreateCreatorInvite} className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Batas Pemakaian */}
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 font-mono">
                      Batas Pemakaian Link
                    </label>
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-1.5 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
                        <button
                          type="button"
                          onClick={() => setCreatorLimitType('single')}
                          className={`h-9 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                            creatorLimitType === 'single' ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700/60' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          1x Pakai
                        </button>
                        <button
                          type="button"
                          onClick={() => setCreatorLimitType('custom')}
                          className={`h-9 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                            creatorLimitType === 'custom' ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700/60' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          Kustom Kuota
                        </button>
                        <button
                          type="button"
                          onClick={() => setCreatorLimitType('unlimited')}
                          className={`h-9 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                            creatorLimitType === 'unlimited' ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700/60' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          Unlimited
                        </button>
                      </div>
                      {creatorLimitType === 'custom' && (
                        <div className="flex items-center gap-2.5 bg-neutral-900/70 border border-neutral-800 p-2 rounded-xl">
                          <span className="text-xs text-neutral-300 whitespace-nowrap">Kuota maks:</span>
                          <input
                            type="number"
                            min="1"
                            max="1000"
                            value={creatorMaxUses}
                            onChange={e => setCreatorMaxUses(Math.max(1, Number(e.target.value)))}
                            className="w-20 h-7.5 bg-neutral-900 border border-neutral-700 rounded-lg px-2 text-xs text-white font-mono"
                          />
                          <span className="text-[11px] text-neutral-500">orang mendaftar</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Kode / Slug Undangan */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider font-mono">
                        Kode / Slug Undangan
                      </label>
                      <button
                        type="button"
                        onClick={handleGenerateRandomCreatorCode}
                        className="text-[11px] text-[hsl(var(--brand-accent))] hover:underline cursor-pointer font-medium flex items-center gap-1"
                      >
                        <span>🎲 Acak Kode</span>
                      </button>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 text-xs font-mono select-none">
                        /buat-profil?invite=
                      </span>
                      <input
                        type="text"
                        value={creatorCode}
                        onChange={e => {
                          setCreatorCode(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''));
                          setCreatorError('');
                        }}
                        placeholder="partner-andi"
                        className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl pl-38 pr-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[hsl(var(--brand-accent))] font-mono"
                      />
                    </div>
                    {creatorError && (
                      <p className="text-xs text-red-400 mt-1 font-medium">{creatorError}</p>
                    )}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={generating || !creatorCode.trim()}
                    className="h-11 px-6 bg-[hsl(var(--brand-accent))] hover:brightness-110 text-neutral-950 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer w-full sm:w-auto shadow-sm"
                  >
                    {generating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <UserPlus className="w-4 h-4" />
                    )}
                    <span>Buat & Salin Link Pembuat Profil</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: ATUR KONTEN ISI WEBSITE (VIDEO, GAMBAR, TEKS) */}
          {activeTab === 'content' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Top Sub-Navigation Filter for Content */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-neutral-900">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <span className="text-xs font-mono text-neutral-500 uppercase font-bold mr-1">Kategori:</span>
                  <button
                    type="button"
                    onClick={() => setContentSubTab('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      contentSubTab === 'all'
                        ? 'bg-neutral-800 text-white border border-neutral-700'
                        : 'text-neutral-400 hover:text-white bg-neutral-900/50'
                    }`}
                  >
                    Semua Konten
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentSubTab('video')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                      contentSubTab === 'video'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'text-neutral-400 hover:text-white bg-neutral-900/50'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5 text-rose-400" />
                    <span>Embed Video</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentSubTab('images')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                      contentSubTab === 'images'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'text-neutral-400 hover:text-white bg-neutral-900/50'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Gambar Website</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentSubTab('texts')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                      contentSubTab === 'texts'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                        : 'text-neutral-400 hover:text-white bg-neutral-900/50'
                    }`}
                  >
                    <Type className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Teks Website</span>
                  </button>
                </div>

                {/* Quick Save & Reset Actions */}
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={handleResetToDefaultContent}
                    disabled={savingContent}
                    className="h-9 px-3.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Default</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveAllContent}
                    disabled={savingContent}
                    className="h-9 px-4 rounded-xl text-xs font-bold text-black bg-white hover:bg-neutral-200 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
                  >
                    {savingContent ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5" />
                    )}
                    <span>{savingContent ? 'Menyimpan...' : 'Simpan Konten'}</span>
                  </button>
                </div>
              </div>

              {/* Toast Message */}
              {contentSuccessMsg && (
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2.5 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{contentSuccessMsg}</span>
                </div>
              )}

              {/* ── BAGIAN 1: PENGATURAN LINK EMBED VIDEO YOUTUBE ── */}
              {(contentSubTab === 'all' || contentSubTab === 'video') && (
                <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800/80">
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold shrink-0 transition-all ${
                        contentForm.videoEnabled
                          ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 shadow-sm'
                          : 'bg-neutral-800/80 border border-neutral-700 text-neutral-400'
                      }`}>
                        <Video className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h3 className="text-base font-bold text-white">
                            1. Embed Video YouTube Unggulan
                          </h3>
                          <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                            contentForm.videoEnabled
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}>
                            {contentForm.videoEnabled ? '🟢 Ditampilkan di Landing Page' : '🔒 Disembunyikan'}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                          Embed video YouTube ditampilkan di hero utama website tepat di atas kolom pencarian dan countdown.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleContentFieldChange('videoEnabled', !contentForm.videoEnabled)}
                      className={`h-10 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm shrink-0 ${
                        contentForm.videoEnabled
                          ? 'bg-rose-600/90 hover:bg-rose-600 text-white'
                          : 'bg-rose-600 hover:bg-rose-500 text-white'
                      }`}
                    >
                      {contentForm.videoEnabled ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          <span>Sembunyikan Video</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>Aktifkan Video</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    {/* Form Input Video Link / ID & Title */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 font-mono">
                          Link Video YouTube / ID Video
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={contentForm.youtubeVideoId}
                            onChange={(e) => handleContentFieldChange('youtubeVideoId', e.target.value)}
                            placeholder="8mAITcNt710 atau https://www.youtube.com/watch?v=8mAITcNt710"
                            className="w-full h-11 bg-neutral-950 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-rose-500"
                          />
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-1.5 leading-relaxed">
                          Mendukung link lengkap (<code>youtube.com/watch?v=...</code>), short link (<code>youtu.be/...</code>), maupun ID 11 karakter (contoh: <code>8mAITcNt710</code>).
                        </p>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 font-mono">
                          Judul / Caption Video (Opsional)
                        </label>
                        <input
                          type="text"
                          value={contentForm.videoTitle}
                          onChange={(e) => handleContentFieldChange('videoTitle', e.target.value)}
                          placeholder="PartnerFind Platform Overview"
                          className="w-full h-11 bg-neutral-950 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-neutral-400 font-mono text-[11px]">
                          ID Bersih:{' '}
                          <strong className="text-rose-400">
                            {extractYoutubeCleanId(contentForm.youtubeVideoId)}
                          </strong>
                        </span>
                        <a
                          href={`https://www.youtube.com/watch?v=${extractYoutubeCleanId(contentForm.youtubeVideoId)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-rose-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                        >
                          <span>Buka di YouTube</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Live Preview Embed Video */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider font-mono flex items-center justify-between">
                        <span>Live Preview Embed Video</span>
                        <span className="text-neutral-500 font-normal">16:9 Aspect Ratio</span>
                      </div>
                      <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-neutral-800 shadow-md aspect-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${extractYoutubeCleanId(contentForm.youtubeVideoId)}?rel=0&modestbranding=1`}
                          title="Preview Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full border-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── BAGIAN 2: PENGATURAN GAMBAR WEBSITE ── */}
              {(contentSubTab === 'all' || contentSubTab === 'images') && (
                <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
                  <div className="flex items-start sm:items-center gap-3.5 pb-4 border-b border-neutral-800/80">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold shrink-0">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        2. Pengaturan Gambar Section 2 (Cara Kerja Kolaborasi)
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Sesuaikan 3 gambar yang tampil pada kartu langkah fitur di Section 2 website. Setiap gambar dapat diatur dengan mengunggah file (Upload File) atau memasukkan link URL (Link Image).
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Gambar Langkah 1 */}
                    <AdminImagePicker
                      stepNumber={1}
                      badgeColor="emerald"
                      label="Langkah 1: Mulai Bersama"
                      hint="Ditampilkan di kartu pertama bagian cara kerja kolaborasi."
                      value={contentForm.feature1Image}
                      defaultValue={DEFAULT_WEBSITE_CONTENT.feature1Image}
                      onChange={(newUrl) => handleContentFieldChange('feature1Image', newUrl)}
                      presets={PRESET_IMAGES}
                    />

                    {/* Gambar Langkah 2 */}
                    <AdminImagePicker
                      stepNumber={2}
                      badgeColor="emerald"
                      label="Langkah 2: Temukan Peluang"
                      hint="Ditampilkan di kartu kedua bagian cara kerja kolaborasi."
                      value={contentForm.feature2Image}
                      defaultValue={DEFAULT_WEBSITE_CONTENT.feature2Image}
                      onChange={(newUrl) => handleContentFieldChange('feature2Image', newUrl)}
                      presets={PRESET_IMAGES}
                    />

                    {/* Gambar Langkah 3 */}
                    <AdminImagePicker
                      stepNumber={3}
                      badgeColor="emerald"
                      label="Langkah 3: Belajar & Berkembang"
                      hint="Ditampilkan di kartu ketiga bagian cara kerja kolaborasi."
                      value={contentForm.feature3Image}
                      defaultValue={DEFAULT_WEBSITE_CONTENT.feature3Image}
                      onChange={(newUrl) => handleContentFieldChange('feature3Image', newUrl)}
                      presets={PRESET_IMAGES}
                    />
                  </div>
                </div>
              )}

              {/* ── BAGIAN 3: PENGATURAN TEKS WEBSITE ── */}
              {(contentSubTab === 'all' || contentSubTab === 'texts') && (
                <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
                  <div className="flex items-start sm:items-center gap-3.5 pb-4 border-b border-neutral-800/80">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 flex items-center justify-center font-bold shrink-0">
                      <Type className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        3. Pengaturan Teks Website (Headline, Fitur, CTA, Footer)
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Ubah teks judul utama, kolom pencarian, judul countdown, langkah fitur, dan teks ajakan kolaborasi. Kosongkan untuk menggunakan teks bawaan multibahasa otomatis.
                      </p>
                    </div>
                  </div>

                  {/* ── LANGUAGE SELECTOR FOR MULTILINGUAL TEXTS ── */}
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                        <Globe className="w-4 h-4 text-indigo-400" />
                        <span>Pilih Bahasa Target Teks Website:</span>
                      </label>
                      <span className="text-[11px] font-mono text-indigo-400 font-semibold bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-800/60">
                        Bahasa Aktif: {SUPPORTED_ADMIN_LANGUAGES.find(l => l.code === activeTextLang)?.flag} {SUPPORTED_ADMIN_LANGUAGES.find(l => l.code === activeTextLang)?.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {SUPPORTED_ADMIN_LANGUAGES.map((lang) => {
                        const isSelected = activeTextLang === lang.code;
                        return (
                          <button
                            key={lang.code}
                            type="button"
                            onClick={() => setActiveTextLang(lang.code)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                              isSelected
                                ? "bg-indigo-600 text-white shadow-md border border-indigo-500"
                                : "bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800/80"
                            }`}
                          >
                            <span>{lang.flag}</span>
                            <span>{lang.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[11px] text-neutral-400 italic pt-1">
                      * Anda dapat mengatur teks khusus (headline, fitur, CTA, footer) untuk masing-masing bahasa di atas agar pengunjung dari setiap negara melihat terjemahan yang sesuai.
                    </p>
                  </div>

                  {/* 3A: HERO SECTION TEXTS */}
                  <div className="space-y-4 p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                    <div className="flex items-center gap-2 pb-2 border-b border-neutral-900">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h4 className="text-sm font-bold text-white">Teks Hero Utama ({SUPPORTED_ADMIN_LANGUAGES.find(l => l.code === activeTextLang)?.label})</h4>
                    </div>

                    {/* Headline */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                        <label className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider font-mono">
                          Judul Utama Hero (Headline)
                        </label>
                        <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono">
                          <span>Token Otomatis:</span>
                          <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-amber-400 font-bold">{'{count}'}</span>
                          <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-amber-400 font-bold">{'{groups}'}</span>
                        </div>
                      </div>
                      <textarea
                        rows={2}
                        value={getFormText('heroHeadline')}
                        onChange={(e) => handleFormTextChange('heroHeadline', e.target.value)}
                        placeholder="Contoh: {count} Orang & {groups} Peluang — Temukan Partner & Mulai Kerja Sama Global"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-400 font-medium resize-none"
                      />
                      <p className="text-[11px] text-neutral-500 mt-1">
                        Token <code>{'{count}'}</code> akan diganti dengan live total anggota, dan <code>{'{groups}'}</code> akan diganti dengan live total peluang.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      {/* Search Placeholder */}
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 font-mono">
                          Teks Kolom Pencarian (Search Placeholder)
                        </label>
                        <input
                          type="text"
                          value={getFormText('searchPlaceholder')}
                          onChange={(e) => handleFormTextChange('searchPlaceholder', e.target.value)}
                          placeholder="Temukan kolaborasi..."
                          className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-400"
                        />
                      </div>

                      {/* Countdown Title */}
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 font-mono">
                          Judul Countdown Timer
                        </label>
                        <input
                          type="text"
                          value={getFormText('countdownTitle')}
                          onChange={(e) => handleFormTextChange('countdownTitle', e.target.value)}
                          placeholder="pendaftaran di tutup dalam"
                          className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3B: FITUR / LANGKAH KERJA SECTION TEXTS */}
                  <div className="space-y-4 p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                    <div className="flex items-center gap-2 pb-2 border-b border-neutral-900">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-sm font-bold text-white">Teks Bagian Fitur & Langkah Kerja ({SUPPORTED_ADMIN_LANGUAGES.find(l => l.code === activeTextLang)?.label})</h4>
                    </div>

                    {/* Features Label */}
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 font-mono">
                        Judul Heading Section Fitur
                      </label>
                      <input
                        type="text"
                        value={getFormText('featuresLabel')}
                        onChange={(e) => handleFormTextChange('featuresLabel', e.target.value)}
                        placeholder="When It Starts & Why Join (atau: Cara Kerja PartnerFind)"
                        className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400 font-medium"
                      />
                    </div>

                    {/* 3 Steps Title & Description */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      {/* Step 1 */}
                      <div className="space-y-2 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                        <span className="text-[10px] font-bold font-mono text-emerald-400 uppercase">Langkah 1</span>
                        <div>
                          <input
                            type="text"
                            value={getFormText('feature1Title')}
                            onChange={(e) => handleFormTextChange('feature1Title', e.target.value)}
                            placeholder="1. Mulai Bersama"
                            className="w-full h-9 bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 text-xs text-white font-bold mb-1.5 focus:outline-none focus:border-emerald-400"
                          />
                          <textarea
                            rows={3}
                            value={getFormText('feature1Desc')}
                            onChange={(e) => handleFormTextChange('feature1Desc', e.target.value)}
                            placeholder="Platform dibuka serentak setelah undangan global selesai..."
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-300 focus:outline-none focus:border-emerald-400 resize-none"
                          />
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="space-y-2 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                        <span className="text-[10px] font-bold font-mono text-emerald-400 uppercase">Langkah 2</span>
                        <div>
                          <input
                            type="text"
                            value={getFormText('feature2Title')}
                            onChange={(e) => handleFormTextChange('feature2Title', e.target.value)}
                            placeholder="2. Temukan Peluang"
                            className="w-full h-9 bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 text-xs text-white font-bold mb-1.5 focus:outline-none focus:border-emerald-400"
                          />
                          <textarea
                            rows={3}
                            value={getFormText('feature2Desc')}
                            onChange={(e) => handleFormTextChange('feature2Desc', e.target.value)}
                            placeholder="Pilih peluang di web, pelajari syaratnya, gabung grup kreator..."
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-300 focus:outline-none focus:border-emerald-400 resize-none"
                          />
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="space-y-2 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                        <span className="text-[10px] font-bold font-mono text-emerald-400 uppercase">Langkah 3</span>
                        <div>
                          <input
                            type="text"
                            value={getFormText('feature3Title')}
                            onChange={(e) => handleFormTextChange('feature3Title', e.target.value)}
                            placeholder="3. Belajar dan Berkembang"
                            className="w-full h-9 bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 text-xs text-white font-bold mb-1.5 focus:outline-none focus:border-emerald-400"
                          />
                          <textarea
                            rows={3}
                            value={getFormText('feature3Desc')}
                            onChange={(e) => handleFormTextChange('feature3Desc', e.target.value)}
                            placeholder="Disediakan kelas khusus untuk anggota yang membutuhkan panduan..."
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-300 focus:outline-none focus:border-emerald-400 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3C: CTA & FOOTER TEXTS */}
                  <div className="space-y-4 p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                    <div className="flex items-center gap-2 pb-2 border-b border-neutral-900">
                      <Share2 className="w-4 h-4 text-purple-400" />
                      <h4 className="text-sm font-bold text-white">Teks Section CTA & Footer ({SUPPORTED_ADMIN_LANGUAGES.find(l => l.code === activeTextLang)?.label})</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* CTA Subheadline */}
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 font-mono">
                          Teks Ajakan Kolaborasi (CTA Subheadline)
                        </label>
                        <input
                          type="text"
                          value={getFormText('ctaSubheadline')}
                          onChange={(e) => handleFormTextChange('ctaSubheadline', e.target.value)}
                          placeholder="Mulai Kolaborasi Global Sekarang Juga"
                          className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-400"
                        />
                      </div>

                      {/* CTA Button Text */}
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 font-mono">
                          Teks Tombol Aksi CTA
                        </label>
                        <input
                          type="text"
                          value={getFormText('ctaButtonText')}
                          onChange={(e) => handleFormTextChange('ctaButtonText', e.target.value)}
                          placeholder="Bagikan Peluang Kolaborasi"
                          className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-400"
                        />
                      </div>
                    </div>

                    {/* Footer Copyright */}
                    <div className="pt-2">
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 font-mono">
                        Teks Hak Cipta Footer
                      </label>
                      <input
                        type="text"
                        value={getFormText('footerCopyright')}
                        onChange={(e) => handleFormTextChange('footerCopyright', e.target.value)}
                        placeholder="© 2026 PartnerFind. All rights reserved."
                        className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Sticky Action Bar */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-neutral-400">
                    Perubahan konten tersinkronisasi otomatis secara real-time ke seluruh pengunjung.
                  </span>
                  {contentSuccessMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold"
                    >
                      <CheckCheck className="w-4 h-4 shrink-0" />
                      <span>{contentSuccessMsg}</span>
                    </motion.div>
                  )}
                </div>
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleResetToDefaultContent}
                    disabled={savingContent}
                    className="flex-1 sm:flex-none h-11 px-4 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset Default</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveAllContent}
                    disabled={savingContent}
                    className="flex-1 sm:flex-none h-11 px-6 rounded-xl text-xs sm:text-sm font-bold text-black bg-white hover:bg-neutral-200 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-50"
                  >
                    {savingContent ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span>Menyimpan ke Cloud...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 text-black" />
                        <span>Simpan Pengaturan Konten</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PENGATURAN ATURAN (HERO COUNTER & COUNTDOWN) */}
          {activeTab === 'rules' && (
            <div className="space-y-8">
              {/* Quick Sub-Navigation Filter for Rules */}
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-900 overflow-x-auto">
                <span className="text-xs font-mono text-neutral-500 uppercase font-bold mr-1">Tampilkan:</span>
                <button
                  type="button"
                  onClick={() => setRulesFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    rulesFilter === 'all'
                      ? 'bg-neutral-800 text-white border border-neutral-700'
                      : 'text-neutral-400 hover:text-white bg-neutral-900/50'
                  }`}
                >
                  Semua Aturan
                </button>
                <button
                  type="button"
                  onClick={() => setRulesFilter('hero')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    rulesFilter === 'hero'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-neutral-400 hover:text-white bg-neutral-900/50'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  1. Angka Hero
                </button>
                <button
                  type="button"
                  onClick={() => setRulesFilter('countdown')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    rulesFilter === 'countdown'
                      ? 'bg-[hsl(var(--brand-accent))/20] text-[hsl(var(--brand-accent))] border border-[hsl(var(--brand-accent))/40]'
                      : 'text-neutral-400 hover:text-white bg-neutral-900/50'
                  }`}
                >
                  <Timer className="w-3.5 h-3.5 text-[hsl(var(--brand-accent))]" />
                  2. Countdown Bar
                </button>
                <button
                  type="button"
                  onClick={() => setRulesFilter('cta')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    rulesFilter === 'cta'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'text-neutral-400 hover:text-white bg-neutral-900/50'
                  }`}
                >
                  <Share2 className="w-3.5 h-3.5 text-purple-400" />
                  3. Visibilitas CTA
                </button>
                <button
                  type="button"
                  onClick={() => setRulesFilter('video')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    rulesFilter === 'video'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'text-neutral-400 hover:text-white bg-neutral-900/50'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-rose-400" />
                  4. Embed Video
                </button>
              </div>

              {/* ── ATURAN 1: ANGKA HERO (LIVE COUNTER) ── */}
              {(rulesFilter === 'all' || rulesFilter === 'hero') && (
            <div className="space-y-8">
              {/* Status Header Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Member Counter Card */}
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-medium mb-2">
                    <span className="flex items-center gap-1.5 font-bold text-neutral-300">
                      <Users className="w-3.5 h-3.5 text-emerald-400" />
                      Total Anggota Live
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  </div>
                  <div className="text-3xl font-black text-white font-mono tracking-tight">
                    {counterConfig.currentCount.toLocaleString('id-ID')}
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-2 font-mono">
                    +{counterConfig.minIncrement} s/d +{counterConfig.maxIncrement} per{' '}
                    {counterConfig.intervalUnit === 'seconds'
                      ? `${counterConfig.intervalValue || Math.round((counterConfig.intervalMinutes || 1) * 60)} detik`
                      : `${counterConfig.intervalValue || counterConfig.intervalMinutes || 1} menit`}
                  </p>
                </div>

                {/* Group Counter Card */}
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-medium mb-2">
                    <span className="flex items-center gap-1.5 font-bold text-neutral-300">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      Total Grup Dibuat Live
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-amber-400 font-semibold bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Live
                    </span>
                  </div>
                  <div className="text-3xl font-black text-white font-mono tracking-tight">
                    {(counterConfig.groupCount ?? 342180).toLocaleString('id-ID')}
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-2 font-mono">
                    +{(counterConfig.groupMinIncrement ?? 1)} s/d +{(counterConfig.groupMaxIncrement ?? 2)} per{' '}
                    {counterConfig.groupIntervalUnit === 'seconds'
                      ? `${counterConfig.groupIntervalValue || Math.round((counterConfig.groupIntervalMinutes || 2) * 60)} detik`
                      : `${counterConfig.groupIntervalValue || counterConfig.groupIntervalMinutes || 2} menit`}
                  </p>
                </div>

                {/* System Info Card */}
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
                  <div className="text-xs text-neutral-400 font-medium mb-2 flex items-center gap-1.5 font-bold text-neutral-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                    Sinkronisasi Firestore
                  </div>
                  <div className="text-sm font-bold text-neutral-200">
                    Otomatis & Real-Time
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-2">
                    Kedua angka bertambah mandiri dan sinkron bagi seluruh pengunjung tanpa membebani browser.
                  </p>
                </div>
              </div>

              {/* ── BAGIAN 1: PENGATURAN COUNTER TOTAL ANGGOTA ── */}
              <div className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800/60">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        1. Pengaturan Angka Anggota (Hero Headline)
                      </h3>
                      <p className="text-[11px] text-neutral-400">
                        Atur angka awal dan interval kenaikan otomatis untuk judul utama landing page.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSaveCounterRules} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Current Base Count */}
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 font-mono">
                        Angka Anggota Saat Ini
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={inputCurrentCount}
                        onChange={(e) => setInputCurrentCount(e.target.value)}
                        className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-sm text-emerald-400 font-bold focus:outline-none focus:border-emerald-400 font-mono"
                        placeholder="1000000"
                        required
                      />
                      <span className="text-[10px] text-neutral-500 mt-1 block">
                        Angka yang tampil di hero headline
                      </span>
                    </div>

                    {/* Min Increment */}
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 font-mono">
                        Tambah Minimal (Min)
                      </label>
                      <input
                        type="number"
                        step="1"
                        min="1"
                        value={inputMinIncrement}
                        onChange={(e) => setInputMinIncrement(e.target.value)}
                        className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono"
                        placeholder="1"
                        required
                      />
                      <span className="text-[10px] text-neutral-500 mt-1 block">
                        Contoh: +1 anggota
                      </span>
                    </div>

                    {/* Max Increment */}
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 font-mono">
                        Tambah Maksimal (Max)
                      </label>
                      <input
                        type="number"
                        step="1"
                        min="1"
                        value={inputMaxIncrement}
                        onChange={(e) => setInputMaxIncrement(e.target.value)}
                        className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono"
                        placeholder="3"
                        required
                      />
                      <span className="text-[10px] text-neutral-500 mt-1 block">
                        Contoh: +3 anggota
                      </span>
                    </div>

                    {/* Interval with Unit Selector (Detik / Menit) */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider font-mono">
                          Perubahan Setiap
                        </label>
                        <div className="flex items-center bg-neutral-950 p-0.5 rounded-lg border border-neutral-800">
                          <button
                            type="button"
                            onClick={() => {
                              if (inputIntervalUnit !== 'seconds') {
                                setInputIntervalUnit('seconds');
                                setInputIntervalValue('10');
                              }
                            }}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                              inputIntervalUnit === 'seconds'
                                ? 'bg-emerald-500 text-black shadow-sm'
                                : 'text-neutral-400 hover:text-white'
                            }`}
                          >
                            Detik
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (inputIntervalUnit !== 'minutes') {
                                setInputIntervalUnit('minutes');
                                setInputIntervalValue('1');
                              }
                            }}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                              inputIntervalUnit === 'minutes'
                                ? 'bg-emerald-500 text-black shadow-sm'
                                : 'text-neutral-400 hover:text-white'
                            }`}
                          >
                            Menit
                          </button>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          step="any"
                          min="1"
                          value={inputIntervalValue}
                          onChange={(e) => setInputIntervalValue(e.target.value)}
                          className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl pl-4 pr-16 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono"
                          placeholder={inputIntervalUnit === 'seconds' ? '10' : '1'}
                          required
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 font-bold font-mono">
                          {inputIntervalUnit === 'seconds' ? 'Detik' : 'Menit'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-3 border-t border-neutral-800/60 flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={savingCounter}
                      className="h-11 px-6 bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer shadow-sm"
                    >
                      {savingCounter ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
                      <span>Simpan Pengaturan Anggota</span>
                    </button>

                    {counterSuccessMsg && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-xs font-semibold text-emerald-400"
                      >
                        <CheckCheck className="w-4 h-4" />
                        <span>{counterSuccessMsg}</span>
                      </motion.div>
                    )}
                  </div>
                </form>
              </div>

              {/* ── BAGIAN 2: PENGATURAN COUNTER TOTAL GRUP TELAH DIBUAT ── */}
              <div className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800/80 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800/60">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        2. Pengaturan Angka Peluang Grup Dibuat (Hero Badge)
                      </h3>
                      <p className="text-[11px] text-neutral-400">
                        Atur angka awal grup dan interval penambahan otomatis pada badge hero statistik.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSaveGroupCounterRules} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Current Base Group Count */}
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 font-mono">
                        Angka Grup Saat Ini
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={inputGroupCount}
                        onChange={(e) => setInputGroupCount(e.target.value)}
                        className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-sm text-amber-400 font-bold focus:outline-none focus:border-amber-400 font-mono"
                        placeholder="342180"
                        required
                      />
                      <span className="text-[10px] text-neutral-500 mt-1 block">
                        Angka yang tampil di badge hero
                      </span>
                    </div>

                    {/* Min Increment Groups */}
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 font-mono">
                        Tambah Minimal (Min)
                      </label>
                      <input
                        type="number"
                        step="1"
                        min="1"
                        value={inputGroupMinIncrement}
                        onChange={(e) => setInputGroupMinIncrement(e.target.value)}
                        className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                        placeholder="1"
                        required
                      />
                      <span className="text-[10px] text-neutral-500 mt-1 block">
                        Contoh: +1 grup
                      </span>
                    </div>

                    {/* Max Increment Groups */}
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 font-mono">
                        Tambah Maksimal (Max)
                      </label>
                      <input
                        type="number"
                        step="1"
                        min="1"
                        value={inputGroupMaxIncrement}
                        onChange={(e) => setInputGroupMaxIncrement(e.target.value)}
                        className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                        placeholder="2"
                        required
                      />
                      <span className="text-[10px] text-neutral-500 mt-1 block">
                        Contoh: +2 grup
                      </span>
                    </div>

                    {/* Interval with Unit Selector (Detik / Menit) for Groups */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider font-mono">
                          Perubahan Setiap
                        </label>
                        <div className="flex items-center bg-neutral-950 p-0.5 rounded-lg border border-neutral-800">
                          <button
                            type="button"
                            onClick={() => {
                              if (inputGroupIntervalUnit !== 'seconds') {
                                setInputGroupIntervalUnit('seconds');
                                setInputGroupIntervalValue('15');
                              }
                            }}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                              inputGroupIntervalUnit === 'seconds'
                                ? 'bg-amber-500 text-black shadow-sm'
                                : 'text-neutral-400 hover:text-white'
                            }`}
                          >
                            Detik
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (inputGroupIntervalUnit !== 'minutes') {
                                setInputGroupIntervalUnit('minutes');
                                setInputGroupIntervalValue('2');
                              }
                            }}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                              inputGroupIntervalUnit === 'minutes'
                                ? 'bg-amber-500 text-black shadow-sm'
                                : 'text-neutral-400 hover:text-white'
                            }`}
                          >
                            Menit
                          </button>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          step="any"
                          min="1"
                          value={inputGroupIntervalValue}
                          onChange={(e) => setInputGroupIntervalValue(e.target.value)}
                          className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl pl-4 pr-16 text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                          placeholder={inputGroupIntervalUnit === 'seconds' ? '15' : '2'}
                          required
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 font-bold font-mono">
                          {inputGroupIntervalUnit === 'seconds' ? 'Detik' : 'Menit'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-3 border-t border-neutral-800/60 flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={savingGroupCounter}
                      className="h-11 px-6 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer shadow-sm"
                    >
                      {savingGroupCounter ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
                      <span>Simpan Pengaturan Grup</span>
                    </button>

                    {groupCounterSuccessMsg && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-xs font-semibold text-amber-400"
                      >
                        <CheckCheck className="w-4 h-4" />
                        <span>{groupCounterSuccessMsg}</span>
                      </motion.div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ── ATURAN 2: COUNTDOWN ANNOUNCEMENT BAR ── */}
          {(rulesFilter === 'all' || rulesFilter === 'countdown') && (
            <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-6">
              {/* Header with Quick Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[hsl(var(--brand-accent)/0.12)] border border-[hsl(var(--brand-accent)/0.25)] flex items-center justify-center text-[hsl(var(--brand-accent))]">
                    <Timer className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      2. Pengaturan Countdown & Announcement Bar
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Pesan banner berjalan dan waktu hitung mundur penutupan pendaftaran di bagian atas landing page.
                    </p>
                  </div>
                </div>

                <label className="flex items-center gap-2.5 bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800 cursor-pointer select-none shrink-0">
                  <input
                    type="checkbox"
                    checked={announcementEnabled}
                    onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-700 text-[hsl(var(--brand-accent))] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className={`text-xs font-bold font-mono ${announcementEnabled ? 'text-emerald-400' : 'text-neutral-500'}`}>
                    {announcementEnabled ? 'BAR AKTIF' : 'DISEMBUNYIKAN'}
                  </span>
                </label>
              </div>

              {announcementSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                  <CheckCheck className="w-4 h-4 shrink-0" />
                  <span>{announcementSuccessMsg}</span>
                </div>
              )}

              {/* Form Settings */}
              <form onSubmit={handleSaveAnnouncement} className="space-y-5">
                {/* Messages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider font-mono mb-1.5">
                      Pesan Pengumuman (Bahasa Indonesia)
                    </label>
                    <input
                      type="text"
                      value={announcementMessage}
                      onChange={(e) => setAnnouncementMessage(e.target.value)}
                      placeholder="Pendaftaran Partner Kolaborasi Ditutup Dalam:"
                      className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[hsl(var(--brand-accent))]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider font-mono mb-1.5">
                      Pesan Pengumuman (English - Opsional)
                    </label>
                    <input
                      type="text"
                      value={announcementMessageEn}
                      onChange={(e) => setAnnouncementMessageEn(e.target.value)}
                      placeholder="Exclusive Collaboration Registration Closes In:"
                      className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[hsl(var(--brand-accent))]"
                    />
                  </div>
                </div>

                {/* Target Countdown Date & Presets */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
                  <div className="lg:col-span-2 space-y-2">
                    <label className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Target Tanggal & Jam Countdown</span>
                    </label>

                    <input
                      type="datetime-local"
                      value={announcementTargetDate}
                      onChange={(e) => setAnnouncementTargetDate(e.target.value)}
                      className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider font-mono mb-2">
                      Auto-roll jika waktu habis
                    </label>
                    <select
                      value={announcementAutoRoll}
                      onChange={(e) => setAnnouncementAutoRoll(Number(e.target.value))}
                      className="w-full h-11 bg-neutral-900 border border-neutral-800 text-xs sm:text-sm rounded-xl px-3.5 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value={0}>Tidak (Biarkan 00:00:00)</option>
                      <option value={1}>Auto-roll +1 Hari</option>
                      <option value={3}>Auto-roll +3 Hari (Rekomendasi)</option>
                      <option value={7}>Auto-roll +7 Hari</option>
                    </select>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-3 border-t border-neutral-800/60 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingAnnouncement}
                    className="h-11 px-6 bg-[hsl(var(--brand-accent))] hover:bg-[hsl(var(--brand-accent)/0.9)] text-neutral-950 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer shadow-sm w-full sm:w-auto"
                  >
                    {savingAnnouncement ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Menyimpan ke Cloud...</span>
                      </>
                    ) : (
                      <>
                        <Timer className="w-4 h-4" />
                        <span>Simpan Pengaturan Countdown</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ── ATURAN 3: VISIBILITAS CTA (CALL TO ACTION / BAGIKAN) ── */}
          {(rulesFilter === 'all' || rulesFilter === 'cta') && (
            <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold shrink-0 transition-all ${
                    ctaEnabled
                      ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300 shadow-sm'
                      : 'bg-neutral-800/80 border border-neutral-700 text-neutral-400'
                  }`}>
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        3. Visibilitas Section CTA (Call to Action / Bagikan)
                      </h3>
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                        ctaEnabled
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {ctaEnabled ? '🟢 Aktif (Tampil di Website)' : '🔒 Nonaktif (Disembunyikan)'}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                      Bagian Call to Action di atas globe yang berisi teks ajakan kolaborasi, tombol <b>Bagikan</b>, dan efek cahaya ambient aksen bahasa.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={savingCta}
                  onClick={() => handleToggleCta(!ctaEnabled)}
                  className={`h-11 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm shrink-0 w-full sm:w-auto ${
                    ctaEnabled
                      ? 'bg-rose-600/90 hover:bg-rose-600 text-white'
                      : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30'
                  }`}
                >
                  {savingCta ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : ctaEnabled ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span>Sembunyikan CTA</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>Aktifkan CTA</span>
                    </>
                  )}
                </button>
              </div>

              {ctaSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-800/50 text-purple-300 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                  <CheckCheck className="w-4 h-4 shrink-0 text-purple-400" />
                  <span>{ctaSuccessMsg}</span>
                </div>
              )}

              {/* Status & Preview Bar */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${ctaEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-600'}`} />
                  <span>
                    Status saat ini di halaman utama:{' '}
                    <strong className={ctaEnabled ? 'text-emerald-400' : 'text-neutral-300'}>
                      {ctaEnabled ? 'Aktif ditampilkan di atas Rotating Globe' : 'Disembunyikan (Section 2 langsung tersambung ke Rotating Globe)'}
                    </strong>
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">
                  Tersinkronisasi Real-Time ke Semua Pengunjung
                </span>
              </div>
            </div>
          )}

          {/* ── ATURAN 5: VISIBILITAS & ID EMBED VIDEO YOUTUBE ── */}
          {(rulesFilter === 'all' || rulesFilter === 'video') && (
            <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold shrink-0 transition-all ${
                    videoConfig.enabled
                      ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 shadow-sm'
                      : 'bg-neutral-800/80 border border-neutral-700 text-neutral-400'
                  }`}>
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        4. Visibilitas & URL Embed Video YouTube
                      </h3>
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                        videoConfig.enabled
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {videoConfig.enabled ? '🟢 Aktif (Tampil di Website)' : '🔒 Nonaktif (Disembunyikan)'}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                      Menampilkan atau menyembunyikan embed video YouTube unggulan di halaman utama tepat di atas kolom pencarian dan countdown.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={savingVideo}
                  onClick={() => handleToggleVideo(!videoConfig.enabled)}
                  className={`h-11 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm shrink-0 w-full sm:w-auto ${
                    videoConfig.enabled
                      ? 'bg-rose-600/90 hover:bg-rose-600 text-white'
                      : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30'
                  }`}
                >
                  {savingVideo ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : videoConfig.enabled ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span>Sembunyikan Video</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current text-white" />
                      <span>Aktifkan Video</span>
                    </>
                  )}
                </button>
              </div>

              {videoSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/50 text-rose-300 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                  <CheckCheck className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{videoSuccessMsg}</span>
                </div>
              )}

              {/* Form Ganti Link / ID Video YouTube */}
              <form onSubmit={handleSaveVideoId} className="pt-2 border-t border-neutral-800/80 space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 text-xs font-mono select-none">
                      YouTube:
                    </span>
                    <input
                      type="text"
                      value={inputYoutubeUrl}
                      onChange={(e) => setInputYoutubeUrl(e.target.value)}
                      placeholder="8mAITcNt710 atau https://youtu.be/8mAITcNt710"
                      className="w-full h-11 bg-neutral-950 border border-neutral-800 rounded-xl pl-22 pr-4 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={savingVideo || !inputYoutubeUrl.trim()}
                    className="h-11 px-6 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shrink-0 border border-neutral-700"
                  >
                    {savingVideo ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCheck className="w-4 h-4 text-rose-400" />
                    )}
                    <span>Simpan ID Video</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-neutral-400">
                  <p>
                    ID aktif:{' '}
                    <code className="text-rose-400 font-bold bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800 font-mono">
                      {videoConfig.youtubeVideoId || '8mAITcNt710'}
                    </code>{' '}
                    • Mendukung link lengkap YouTube maupun 11 digit ID.
                  </p>
                  <a
                    href={`https://www.youtube.com/watch?v=${videoConfig.youtubeVideoId || '8mAITcNt710'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-400 hover:underline flex items-center gap-1 font-mono shrink-0"
                  >
                    <span>Uji Putar di YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </form>

              {/* Status & Preview Bar */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${videoConfig.enabled ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-600'}`} />
                  <span>
                    Status saat ini di halaman utama:{' '}
                    <strong className={videoConfig.enabled ? 'text-emerald-400' : 'text-neutral-300'}>
                      {videoConfig.enabled ? 'Aktif ditampilkan di atas kolom pencarian' : 'Disembunyikan (Judul langsung menyatu ke Hero Search)'}
                    </strong>
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">
                  Tersinkronisasi Real-Time ke Semua Pengunjung
                </span>
              </div>
            </div>
          )}
        </div>
      )}


          {allCopied && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 text-xs text-green-400 font-medium"
            >
              <CheckCheck className="w-4 h-4" />
              Semua link bulk berhasil disalin ke clipboard!
            </motion.div>
          )}
        </div>

        {/* ── TAB 1 CONTENT TABLES: PEMBUAT PROFIL & DAFTAR MITRA (When on creator tab) ── */}
        {activeTab === 'creator' && (
          <div className="space-y-8">
            {/* 1. Creator Invites Table */}
            <div className="bg-neutral-950 border border-neutral-900 rounded-3xl overflow-hidden shadow-sm">
              <div className="px-6 py-4.5 border-b border-neutral-900 bg-neutral-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-[hsl(var(--brand-accent))]" />
                    <span>Daftar Link Undangan Pembuat Profil ({creatorInvites.length})</span>
                  </h2>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Link pendaftaran profil mitra yang sudah digenerate. Salin link ini dan kirimkan ke calon partner Anda.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={loadCreatorInvites}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-300 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Segarkan Link</span>
                </button>
              </div>

              {creatorInvites.length === 0 ? (
                <div className="p-16 text-center text-neutral-500 text-xs">
                  Belum ada link undangan pembuat profil aktif. Buat link di formulir atas untuk dibagikan ke partner Anda.
                </div>
              ) : (
                <ul className="divide-y divide-neutral-900">
                  {creatorInvites.map((invite) => {
                    const maxUses = Number(invite.maxUses) || 0;
                    const uses = Number(invite.uses) || 0;
                    const isLimitReached = maxUses > 0 && uses >= maxUses;

                    return (
                      <li
                        key={invite.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:px-6 hover:bg-neutral-900/40 transition-colors gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="font-mono text-sm text-[hsl(var(--brand-accent))] font-bold break-all">
                              /buat-profil?invite={invite.code}
                            </span>
                            {invite.name && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 bg-neutral-900 text-neutral-300 border border-neutral-800 rounded-full">
                                {invite.name}
                              </span>
                            )}
                            {maxUses > 0 ? (
                              isLimitReached ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full">
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                                  Kuota Habis ({uses}/{maxUses} Terpakai)
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                  Kuota: {uses}/{maxUses} Terpakai (Sisa {maxUses - uses})
                                </span>
                              )
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                                <span>♾️</span>
                                Unlimited ({uses} terpakai)
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-neutral-500 font-mono flex flex-wrap gap-x-4 gap-y-1">
                            <span>Dibuat: {invite.createdAt.toLocaleString('id-ID')}</span>
                            <span>Oleh: {invite.createdBy}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => copyCreatorLink(invite.code)}
                            className="flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg text-xs font-semibold text-neutral-200 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
                          >
                            {creatorCopiedId === invite.code ? (
                              <CheckCheck className="w-3.5 h-3.5 text-green-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>{creatorCopiedId === invite.code ? 'Tersalin!' : 'Salin Link'}</span>
                          </button>

                          <a
                            href={`/buat-profil?invite=${invite.code}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg text-xs font-semibold text-neutral-300 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Buka</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDeleteCreatorInvite(invite.id)}
                            className="flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg text-xs font-semibold text-destructive bg-destructive/5 border border-destructive/10 hover:bg-destructive/10 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* 2. Partner Profiles Moderation List */}
            <div className="bg-neutral-950 border border-neutral-900 rounded-3xl overflow-hidden shadow-sm">
              <div className="px-6 py-4.5 border-b border-neutral-900 bg-neutral-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Daftar Profil Partner Terdaftar di Firestore ({partnerProfiles.length})</span>
                  </h2>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Profil partner yang dibuat melalui link undangan. Anda dapat memoderasi atau menghapus profil duplikat jika ditemukan.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={loadPartnerProfiles}
                  disabled={loadingProfiles}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-300 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Loader2 className={`w-3.5 h-3.5 ${loadingProfiles ? 'animate-spin' : ''}`} />
                  <span>Segarkan Profil</span>
                </button>
              </div>

              {loadingProfiles ? (
                <div className="p-16 flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
                </div>
              ) : partnerProfiles.length === 0 ? (
                <div className="p-16 text-center text-neutral-500 text-xs">
                  Belum ada profil partner yang tersimpan di database Firestore.
                </div>
              ) : (
                <ul className="divide-y divide-neutral-900">
                  {partnerProfiles.map((p) => (
                    <li
                      key={p.id}
                      className="flex flex-col sm:flex-row sm:items-start justify-between p-5 sm:px-6 hover:bg-neutral-900/40 transition-colors gap-4"
                    >
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex items-center gap-2 flex-wrap">
                          <ProfileAvatar avatar={p.avatar} name={p.name} className="w-7 h-7 rounded-full" />
                          <span className="text-sm font-bold text-white">{p.name}</span>
                          <span className="font-mono text-[10px] text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                            ID: {p.id}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {p.bio}
                        </p>
                        {p.link && (
                          <div className="text-[11px] text-emerald-400 font-mono break-all">
                            Link / Kontak: {p.link}
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => handleDeletePartnerProfile(p.id, p.name)}
                          disabled={deletingProfileId === p.id}
                          className="flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg text-xs font-semibold text-destructive bg-destructive/10 border border-destructive/20 hover:bg-destructive/20 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {deletingProfileId === p.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                          <span>{deletingProfileId === p.id ? 'Menghapus...' : 'Hapus Profil'}</span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
