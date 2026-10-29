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
  doc, 
  setDoc, 
  getDoc 
} from 'firebase/firestore';
import { 
  Loader2, 
  LogOut, 
  CheckCheck,
  Eye, 
  EyeOff, 
  Chrome, 
  ShieldAlert,
  ExternalLink,
  ShieldCheck,
  Share2,
  Lock,
  Mail,
  KeyRound,
  Users,
  TrendingUp,
  Sliders,
  Timer,
  CheckCircle2,
  Video,
  Play,
  Image as ImageIcon,
  FileText,
  Type,
  RotateCcw,
  Save,
  Globe,
  Sparkles,
  Layers,
  Calendar,
  Clock,
  HelpCircle,
  ToggleLeft,
  ToggleRight,
  ArrowUpRight
} from 'lucide-react';
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
import { translations } from '../lib/translations';
import {
  AnnouncementBarConfig,
  DEFAULT_ANNOUNCEMENT,
  saveAnnouncementConfig,
  subscribeAnnouncement
} from '../lib/announcementService';
import {
  saveCtaConfig,
  subscribeCtaConfig,
  getCachedCtaEnabled
} from '../lib/ctaService';
import {
  VideoEmbedConfig,
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
import { DEFAULT_TALLY_URLS } from '../lib/tallyConfig';

const ADMIN_EMAIL = 'dikyindra444@gmail.com';
const ALLOWED_ADMIN_EMAILS = [
  'dikyindra444@gmail.com',
  'ykidardni1234@gmail.com',
  'ykidardni12345@gmail.com',
];
const ADMIN_PASSWORD_HASH = 'Stemapallm1!';
const SESSION_KEY = 'admin_session';
const SESSION_EMAIL_KEY = 'admin_session_email';

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [currentAdminEmail, setCurrentAdminEmail] = useState(ADMIN_EMAIL);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
  // Email & Password Auth state
  const [emailInput, setEmailInput] = useState(ADMIN_EMAIL);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // 2 Admin choices: 'content' (Atur Konten Website) | 'rules' (Angka Live & Countdown)
  const [activeTab, setActiveTab] = useState<'content' | 'rules'>('content');
  const [rulesFilter, setRulesFilter] = useState<'all' | 'hero' | 'group' | 'countdown' | 'cta'>('all');
  
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

  const getFormTallyUrl = (): string => {
    return contentForm.tallyEmbedUrls?.[activeTextLang] || DEFAULT_TALLY_URLS[activeTextLang] || '';
  };

  const handleFormTallyUrlChange = (value: string) => {
    setContentForm((prev) => ({
      ...prev,
      tallyEmbedUrls: {
        ...(prev.tallyEmbedUrls || {}),
        [activeTextLang]: value,
      },
    }));
  };

  const handleAutoTranslateCurrentLang = () => {
    if (activeTextLang === 'id-ID') {
      alert('Bahasa Indonesia adalah bahasa utama (default).');
      return;
    }
    const langDict = (translations as any)[activeTextLang];
    if (!langDict) {
      alert('Terjemahan bawaan untuk bahasa ini tidak ditemukan.');
      return;
    }

    const translatedFields = {
      heroHeadline: langDict.hero_headline || '',
      heroSubheadline: langDict.hero_subheadline || '',
      searchPlaceholder: langDict.search_placeholder || '',
      countdownTitle: langDict.countdown_title || 'Pra Registrasi ditutup dalam',
      featuresLabel: langDict.features_label || '',
      feature1Title: langDict.feature_1_title || '',
      feature1Desc: langDict.feature_1_desc || '',
      feature2Title: langDict.feature_2_title || '',
      feature2Desc: langDict.feature_2_desc || '',
      feature3Title: langDict.feature_3_title || '',
      feature3Desc: langDict.feature_3_desc || '',
      ctaSubheadline: langDict.cta_subheadline || '',
      ctaButtonText: langDict.nav_cta || langDict.cta_button || '',
      footerCopyright: langDict.footer_copyright || '',
    };

    setContentForm((prev) => {
      const currentTexts = prev.texts || {};
      return {
        ...prev,
        texts: {
          ...currentTexts,
          [activeTextLang]: {
            ...translatedFields,
          },
        },
      };
    });

    setContentSuccessMsg(`Berhasil memuat terjemahan otomatis ke ${SUPPORTED_ADMIN_LANGUAGES.find(l => l.code === activeTextLang)?.label}! Jangan lupa klik Simpan Konten.`);
    setTimeout(() => setContentSuccessMsg(''), 6000);
  };
  
  // Announcement Bar state
  const [announcementConfig, setAnnouncementConfig] = useState<AnnouncementBarConfig>(DEFAULT_ANNOUNCEMENT);
  const [announcementEnabled, setAnnouncementEnabled] = useState(true);
  const [announcementMessage, setAnnouncementMessage] = useState('Pra Registrasi ditutup dalam');
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
  const [savingManualMember, setSavingManualMember] = useState(false);
  const [manualMemberSuccessMsg, setManualMemberSuccessMsg] = useState('');

  // Hero Group Counter state (Groups Created)
  const [inputGroupCount, setInputGroupCount] = useState<string>('342180');
  const [inputGroupMinIncrement, setInputGroupMinIncrement] = useState<string>('1');
  const [inputGroupMaxIncrement, setInputGroupMaxIncrement] = useState<string>('2');
  const [inputGroupIntervalValue, setInputGroupIntervalValue] = useState<string>('2');
  const [inputGroupIntervalUnit, setInputGroupIntervalUnit] = useState<'seconds' | 'minutes'>('minutes');
  const [savingGroupCounter, setSavingGroupCounter] = useState(false);
  const [groupCounterSuccessMsg, setGroupCounterSuccessMsg] = useState('');
  const [testingGroupTick, setTestingGroupTick] = useState(false);
  const [savingManualGroup, setSavingManualGroup] = useState(false);
  const [manualGroupSuccessMsg, setManualGroupSuccessMsg] = useState('');

  // CTA Visibility toggle state (Default: false / disembunyikan)
  const [ctaEnabled, setCtaEnabled] = useState<boolean>(getCachedCtaEnabled);
  const [savingCta, setSavingCta] = useState<boolean>(false);
  const [ctaSuccessMsg, setCtaSuccessMsg] = useState<string>('');

  // Video Embed Visibility & YouTube URL/ID state
  const [videoConfig, setVideoConfig] = useState<VideoEmbedConfig>(getCachedVideoConfig);
  const [inputYoutubeUrl, setInputYoutubeUrl] = useState<string>(getCachedVideoConfig().youtubeVideoId || '8mAITcNt710');
  const [savingVideo, setSavingVideo] = useState<boolean>(false);
  const [videoSuccessMsg, setVideoSuccessMsg] = useState<string>('');

  // Check auth state & session on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        const userEmail = user.email.toLowerCase();
        if (ALLOWED_ADMIN_EMAILS.includes(userEmail)) {
          sessionStorage.setItem(SESSION_KEY, 'true');
          sessionStorage.setItem(SESSION_EMAIL_KEY, user.email);
          setCurrentAdminEmail(user.email);
          setAuthed(true);
          return;
        }
      }

      if (sessionStorage.getItem(SESSION_KEY) === 'true') {
        setAuthed(true);
        const storedEmail = sessionStorage.getItem(SESSION_EMAIL_KEY);
        if (storedEmail) setCurrentAdminEmail(storedEmail);
      }
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to real-time hero counter configuration from Firestore
  useEffect(() => {
    if (!authed) return;
    const unsubscribe = subscribeHeroCounter((config) => {
      setCounterConfig(config);
      setInputCurrentCount(String(config.currentCount ?? 1000000));
      setInputMinIncrement(String(config.minIncrement ?? 1));
      setInputMaxIncrement(String(config.maxIncrement ?? 3));
      setInputIntervalValue(String(config.intervalValue ?? 1));
      if (config.intervalUnit) setInputIntervalUnit(config.intervalUnit);

      setInputGroupCount(String(config.groupCount ?? 342180));
      setInputGroupMinIncrement(String(config.groupMinIncrement ?? 1));
      setInputGroupMaxIncrement(String(config.groupMaxIncrement ?? 2));
      setInputGroupIntervalValue(String(config.groupIntervalValue ?? 2));
      if (config.groupIntervalUnit) setInputGroupIntervalUnit(config.groupIntervalUnit);
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
        ...prev,
      }));
    });
    return () => unsubscribe();
  }, [authed]);

  const handleToggleCta = async (nextState: boolean) => {
    setSavingCta(true);
    setCtaSuccessMsg('');
    try {
      const success = await saveCtaConfig(nextState, currentAdminEmail || 'admin');
      if (success) {
        setCtaEnabled(nextState);
        setCtaSuccessMsg(
          nextState
            ? 'Section CTA berhasil DIAKTIFKAN!'
            : 'Section CTA berhasil DISEMBUNYIKAN.'
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
            ? 'Embed Video YouTube berhasil DIAKTIFKAN!'
            : 'Embed Video YouTube berhasil DISEMBUNYIKAN.'
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

  const hasInitializedRulesRef = useRef(false);
  const prevTabRef = useRef<'content' | 'rules'>('content');

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

    if (activeTab === 'content' && prevTabRef.current !== 'content') {
      setContentForm((prev) => ({
        ...prev,
        ...contentConfig,
      }));
    }

    prevTabRef.current = activeTab;
  }, [activeTab, counterConfig, contentConfig]);

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
        setContentSuccessMsg('Pengaturan konten website berhasil disimpan dan disinkronkan!');
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

  const handleSaveCounterRules = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCounter(true);
    setCounterSuccessMsg('');

    const minIncrement = Math.max(1, parseInt(inputMinIncrement, 10) || 1);
    const maxIncrement = Math.max(minIncrement, parseInt(inputMaxIncrement, 10) || minIncrement);
    const intervalValue = Math.max(1, parseFloat(inputIntervalValue) || 1);
    const intervalUnit = inputIntervalUnit;

    const success = await saveHeroRulesConfig({
      minIncrement,
      maxIncrement,
      intervalValue,
      intervalUnit,
    });

    setSavingCounter(false);
    if (success) {
      setCounterSuccessMsg('Aturan interval & kenaikan anggota berhasil disimpan!');
      setTimeout(() => setCounterSuccessMsg(''), 4500);
    } else {
      alert('Gagal menyimpan aturan ke database.');
    }
  };

  const handleOverrideMemberCount = async () => {
    const rawCount = parseInt(inputCurrentCount.replace(/[^0-9]/g, ''), 10);
    if (isNaN(rawCount) || rawCount < 0) {
      alert('Masukkan angka anggota yang valid (minimal 0).');
      return;
    }
    if (!window.confirm(`Yakin ingin mengubah angka anggota live menjadi ${rawCount.toLocaleString('id-ID')}?`)) {
      return;
    }

    setSavingManualMember(true);
    setManualMemberSuccessMsg('');
    const success = await overrideHeroCount(rawCount);
    setSavingManualMember(false);
    if (success) {
      setManualMemberSuccessMsg(`Angka anggota berhasil diperbarui menjadi ${rawCount.toLocaleString('id-ID')}!`);
      setTimeout(() => setManualMemberSuccessMsg(''), 4500);
    } else {
      alert('Gagal memperbarui angka anggota di database.');
    }
  };

  const handleTestStepMember = async () => {
    setTestingTick(true);
    const newCount = await manualStepHeroCount();
    setTestingTick(false);
    if (newCount !== null) {
      setCounterSuccessMsg(`+Step acak berhasil! Angka live anggota menjadi ${newCount.toLocaleString('id-ID')}`);
      setTimeout(() => setCounterSuccessMsg(''), 4000);
    }
  };

  const handleSaveGroupCounterRules = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingGroupCounter(true);
    setGroupCounterSuccessMsg('');

    const groupMinIncrement = Math.max(1, parseInt(inputGroupMinIncrement, 10) || 1);
    const groupMaxIncrement = Math.max(groupMinIncrement, parseInt(inputGroupMaxIncrement, 10) || groupMinIncrement);
    const groupIntervalValue = Math.max(1, parseFloat(inputGroupIntervalValue) || 1);
    const groupIntervalUnit = inputGroupIntervalUnit;

    const success = await saveGroupRulesConfig({
      groupMinIncrement,
      groupMaxIncrement,
      groupIntervalValue,
      groupIntervalUnit,
    });

    setSavingGroupCounter(false);
    if (success) {
      setGroupCounterSuccessMsg('Aturan interval & kenaikan grup berhasil disimpan!');
      setTimeout(() => setGroupCounterSuccessMsg(''), 4500);
    } else {
      alert('Gagal menyimpan aturan grup ke database.');
    }
  };

  const handleOverrideGroupCount = async () => {
    const rawGroupCount = parseInt(inputGroupCount.replace(/[^0-9]/g, ''), 10);
    if (isNaN(rawGroupCount) || rawGroupCount < 0) {
      alert('Masukkan angka grup yang valid (minimal 0).');
      return;
    }
    if (!window.confirm(`Yakin ingin mengubah angka grup live menjadi ${rawGroupCount.toLocaleString('id-ID')}?`)) {
      return;
    }

    setSavingManualGroup(true);
    setGroupCounterSuccessMsg('');
    const success = await overrideGroupCount(rawGroupCount);
    setSavingManualGroup(false);
    if (success) {
      setGroupCounterSuccessMsg(`Angka grup berhasil diperbarui menjadi ${rawGroupCount.toLocaleString('id-ID')}!`);
      setTimeout(() => setGroupCounterSuccessMsg(''), 4500);
    } else {
      alert('Gagal memperbarui angka grup di database.');
    }
  };

  const handleTestStepGroup = async () => {
    setTestingGroupTick(true);
    const newCount = await manualStepGroupCount();
    setTestingGroupTick(false);
    if (newCount !== null) {
      setGroupCounterSuccessMsg(`+Step acak grup berhasil! Angka live grup menjadi ${newCount.toLocaleString('id-ID')}`);
      setTimeout(() => setGroupCounterSuccessMsg(''), 4000);
    }
  };

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
      setAnnouncementSuccessMsg('Pengaturan Announcement Bar & Countdown berhasil disimpan!');
      setTimeout(() => setAnnouncementSuccessMsg(''), 4500);
    } else {
      alert('Gagal menyimpan pengumuman ke database.');
    }
  };

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    if (!cleanEmail || !cleanPass) {
      setLoginError('Mohon masukkan email dan kata sandi administrator.');
      setLoginLoading(false);
      return;
    }

    if (!ALLOWED_ADMIN_EMAILS.includes(cleanEmail)) {
      setLoginError('Akses ditolak. Email tidak terdaftar sebagai administrator.');
      setLoginLoading(false);
      return;
    }

    try {
      try {
        await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
      } catch (authErr: any) {
        if (
          (authErr.code === 'auth/user-not-found' || 
           authErr.code === 'auth/invalid-credential' || 
           authErr.code === 'auth/invalid-login-credentials') &&
          cleanPass === ADMIN_PASSWORD_HASH
        ) {
          try {
            await createUserWithEmailAndPassword(auth, cleanEmail, cleanPass);
          } catch (_createErr) {
            // ignore
          }
        } else if (cleanPass !== ADMIN_PASSWORD_HASH) {
          throw new Error('Kata sandi yang Anda masukkan salah. Silakan coba lagi.');
        }
      }

      if (cleanPass === ADMIN_PASSWORD_HASH || auth.currentUser) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        sessionStorage.setItem(SESSION_EMAIL_KEY, cleanEmail);
        setCurrentAdminEmail(cleanEmail);
        setAuthed(true);
        setLoginError('');
      } else {
        setLoginError('Kata sandi salah. Silakan periksa kembali.');
      }
    } catch (err: any) {
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
      } else {
        await signOut(auth);
        setLoginError(`Akses ditolak. Email Google ${email} tidak terdaftar sebagai administrator.`);
      }
    } catch (_error) {
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
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 filter blur-[120px] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />

        <div className="max-w-md w-full bg-neutral-950 border border-neutral-800/80 p-8 rounded-3xl shadow-2xl relative z-10">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3 shadow-inner">
              <KeyRound className="w-6 h-6 text-[hsl(var(--brand-accent))]" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">PartnerFind Admin Portal</h1>
            <p className="text-xs text-neutral-400 mt-1 max-w-[280px]">
              Akses khusus akun terverifikasi Administrator.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <span className="text-xs text-destructive leading-relaxed font-medium">{loginError}</span>
            </div>
          )}

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
              {loginLoading ? <Loader2 className="w-4 h-4 animate-spin text-black" /> : <ShieldCheck className="w-4 h-4 text-black" />}
              <span>{loginLoading ? 'Memverifikasi...' : 'Masuk sebagai Admin'}</span>
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-900"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-neutral-950 px-3 text-neutral-600 font-mono uppercase text-[10px]">atau</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loginLoading}
            className="w-full h-11 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <Chrome className="w-4 h-4 text-white" />
            <span>Sign In 1-Klik dengan Google</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-900">
          <div>
            <h1 className="text-2xl font-black tracking-tight">PartnerFind Admin Portal</h1>
            <p className="text-xs text-neutral-400 mt-1">
              Pusat kendali pengaturan konten website, live counter, dan countdown.
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

        <div className="bg-neutral-950 border border-neutral-900 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex border-b border-neutral-900 mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('content')}
              className={`pb-3 text-sm font-bold border-b-2 px-4 whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'content' ? 'border-indigo-400 text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>1. Atur Konten Website</span>
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`pb-3 text-sm font-bold border-b-2 px-4 whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'rules' ? 'border-amber-400 text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>2. Angka Live & Countdown</span>
            </button>
          </div>

          <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
            {activeTab === 'content'
              ? 'Atur seluruh isi konten website secara fleksibel: Link embed video YouTube unggulan, gambar, serta teks judul hero, fitur, CTA, dan footer.'
              : 'Pusat kendali aturan live counter dan Countdown Target Announcement Bar.'}
          </p>

          {activeTab === 'content' && (
            <div className="space-y-8">
              {/* Sub-tabs Filter for Content */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-900">
                <button
                  type="button"
                  onClick={() => setContentSubTab('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    contentSubTab === 'all'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  Semua Konten
                </button>
                <button
                  type="button"
                  onClick={() => setContentSubTab('video')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    contentSubTab === 'video'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Video YouTube</span>
                </button>
                <button
                  type="button"
                  onClick={() => setContentSubTab('images')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    contentSubTab === 'images'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Gambar Website</span>
                </button>
                <button
                  type="button"
                  onClick={() => setContentSubTab('texts')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    contentSubTab === 'texts'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>Teks & Terjemahan</span>
                </button>
              </div>

              {contentSuccessMsg && (
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{contentSuccessMsg}</span>
                </div>
              )}

              {/* ── BAGIAN 1: VIDEO YOUTUBE ── */}
              {(contentSubTab === 'all' || contentSubTab === 'video') && (
                <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <Video className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">Embed Video YouTube (Beranda)</h3>
                        <p className="text-[11px] text-neutral-400">Atur visibilitas dan video tutorial/demo di bawah Hero</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleContentFieldChange('videoEnabled', !contentForm.videoEnabled)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                          contentForm.videoEnabled
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                        }`}
                      >
                        {contentForm.videoEnabled ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{contentForm.videoEnabled ? 'Video Aktif' : 'Video Disembunyikan'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 font-mono">
                          Link / ID Video YouTube
                        </label>
                        <input
                          type="text"
                          value={contentForm.youtubeVideoId || ''}
                          onChange={(e) => handleContentFieldChange('youtubeVideoId', e.target.value)}
                          placeholder="e.g. 8mAITcNt710 atau https://www.youtube.com/watch?v=..."
                          className="w-full h-11 bg-neutral-950 border border-neutral-800 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-indigo-400 font-mono"
                        />
                        <p className="text-[10px] text-neutral-500 mt-1 font-mono">
                          Sistem otomatis mengekstrak ID video bersih jika Anda menempelkan URL lengkap.
                        </p>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 font-mono">
                          Judul / Keterangan Video
                        </label>
                        <input
                          type="text"
                          value={contentForm.videoTitle || ''}
                          onChange={(e) => handleContentFieldChange('videoTitle', e.target.value)}
                          placeholder="e.g. PartnerFind Platform Overview"
                          className="w-full h-11 bg-neutral-950 border border-neutral-800 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-indigo-400 font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider font-mono">
                        Preview Video Player
                      </label>
                      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-neutral-800 flex items-center justify-center relative">
                        {contentForm.youtubeVideoId ? (
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${extractYoutubeCleanId(contentForm.youtubeVideoId)}`}
                            title="Preview Video"
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-neutral-600 gap-2">
                            <Play className="w-8 h-8 opacity-40" />
                            <span className="text-xs">Belum ada video dipilih</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── BAGIAN 2: GAMBAR WEBSITE ── */}
              {(contentSubTab === 'all' || contentSubTab === 'images') && (
                <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 space-y-6">
                  <div className="flex items-center gap-3 border-b border-neutral-800/80 pb-4">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Gambar Website (Fitur 3 Langkah & Banner)</h3>
                      <p className="text-[11px] text-neutral-400">Pilih dari galeri preset, upload file gambar, atau masukkan link URL eksternal</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AdminImagePicker
                      label="Langkah 1: Temukan Partner"
                      stepNumber={1}
                      value={contentForm.feature1Image || DEFAULT_WEBSITE_CONTENT.feature1Image}
                      defaultValue={DEFAULT_WEBSITE_CONTENT.feature1Image}
                      onChange={(newUrl) => handleContentFieldChange('feature1Image', newUrl)}
                      presets={PRESET_IMAGES}
                      badgeColor="emerald"
                      hint="Gambar ilustrasi untuk pencarian partner / kreator"
                    />

                    <AdminImagePicker
                      label="Langkah 2: Hubungkan Langsung"
                      stepNumber={2}
                      value={contentForm.feature2Image || DEFAULT_WEBSITE_CONTENT.feature2Image}
                      defaultValue={DEFAULT_WEBSITE_CONTENT.feature2Image}
                      onChange={(newUrl) => handleContentFieldChange('feature2Image', newUrl)}
                      presets={PRESET_IMAGES}
                      badgeColor="purple"
                      hint="Gambar ilustrasi koneksi obrolan langsung & kolaborasi"
                    />

                    <AdminImagePicker
                      label="Langkah 3: Kolaborasi & Cuan"
                      stepNumber={3}
                      value={contentForm.feature3Image || DEFAULT_WEBSITE_CONTENT.feature3Image}
                      defaultValue={DEFAULT_WEBSITE_CONTENT.feature3Image}
                      onChange={(newUrl) => handleContentFieldChange('feature3Image', newUrl)}
                      presets={PRESET_IMAGES}
                      badgeColor="indigo"
                      hint="Gambar ilustrasi pertumbuhan revenue & profit"
                    />

                    <AdminImagePicker
                      label="Visual Banner CTA (Opsional)"
                      value={contentForm.ctaBannerImage || ''}
                      defaultValue=""
                      onChange={(newUrl) => handleContentFieldChange('ctaBannerImage', newUrl)}
                      presets={PRESET_IMAGES}
                      badgeColor="amber"
                      hint="Background atau visual samping pada section Call to Action"
                    />
                  </div>
                </div>
              )}

              {/* ── BAGIAN 3: TEKS & TERJEMAHAN ── */}
              {(contentSubTab === 'all' || contentSubTab === 'texts') && (
                <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Type className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">Teks Halaman Website & Terjemahan</h3>
                        <p className="text-[11px] text-neutral-400">Sesuaikan teks judul, subjudul, langkah fitur, dan tombol aksi</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={activeTextLang}
                        onChange={(e) => setActiveTextLang(e.target.value)}
                        className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-medium focus:outline-none focus:border-indigo-400"
                      >
                        {SUPPORTED_ADMIN_LANGUAGES.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.flag} {lang.label}
                          </option>
                        ))}
                      </select>
                      {activeTextLang !== 'id-ID' && (
                        <button
                          type="button"
                          onClick={handleAutoTranslateCurrentLang}
                          className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Auto-Translate</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Hero Texts */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider font-mono flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                      <span>Bagian Hero (Halaman Utama)</span>
                    </h4>

                    <div className="space-y-2 p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-white uppercase tracking-wider font-mono">
                          Judul Utama Hero ({SUPPORTED_ADMIN_LANGUAGES.find(l => l.code === activeTextLang)?.label})
                        </label>
                        <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-mono">
                          Mendukung {'{count}'} & {'{groups}'}
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={getFormText('heroHeadline')}
                        onChange={(e) => handleFormTextChange('heroHeadline', e.target.value)}
                        placeholder="Contoh: Gabung dengan {count}+ Orang & {groups}+ Grup yang Sedang Berkolaborasi..."
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-400"
                      />
                      <p className="text-[10px] text-neutral-500 font-mono">
                        Tips: Gunakan tag {'{count}'} untuk menyisipkan jumlah anggota live, dan {'{groups}'} untuk jumlah grup live secara otomatis.
                      </p>
                    </div>

                    <div className="space-y-2 p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                      <label className="block text-xs font-bold text-white uppercase tracking-wider font-mono">
                        Subjudul Hero
                      </label>
                      <textarea
                        rows={2}
                        value={getFormText('heroSubheadline')}
                        onChange={(e) => handleFormTextChange('heroSubheadline', e.target.value)}
                        placeholder="Ketik deskripsi subjudul di bawah judul utama..."
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2 p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                        <label className="block text-xs font-bold text-white uppercase tracking-wider font-mono">
                          Placeholder Input Pencarian
                        </label>
                        <input
                          type="text"
                          value={getFormText('searchPlaceholder')}
                          onChange={(e) => handleFormTextChange('searchPlaceholder', e.target.value)}
                          placeholder="e.g. Temukan kolaborasi..."
                          className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-400"
                        />
                      </div>

                      <div className="space-y-2 p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                        <label className="block text-xs font-bold text-white uppercase tracking-wider font-mono">
                          Judul Countdown Hero
                        </label>
                        <input
                          type="text"
                          value={getFormText('countdownTitle')}
                          onChange={(e) => handleFormTextChange('countdownTitle', e.target.value)}
                          placeholder="e.g. Pra Registrasi ditutup dalam"
                          className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3 Langkah Fitur Texts */}
                  <div className="space-y-4 pt-4 border-t border-neutral-800/80">
                    <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider font-mono flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                      <span>Bagian 3 Langkah Fitur Kolaborasi</span>
                    </h4>

                    <div className="space-y-2 p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                      <label className="block text-xs font-bold text-white uppercase tracking-wider font-mono">
                        Label Kategori Fitur (Badge Header)
                      </label>
                      <input
                        type="text"
                        value={getFormText('featuresLabel')}
                        onChange={(e) => handleFormTextChange('featuresLabel', e.target.value)}
                        placeholder="e.g. 3 Langkah Mudah Kolaborasi"
                        className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Fitur 1 */}
                      <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-400">
                          Langkah 1
                        </span>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                            Judul Langkah 1
                          </label>
                          <input
                            type="text"
                            value={getFormText('feature1Title')}
                            onChange={(e) => handleFormTextChange('feature1Title', e.target.value)}
                            placeholder="e.g. Temukan Mitra Impian"
                            className="w-full h-10 bg-neutral-900 border border-neutral-800 rounded-xl px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                            Deskripsi Langkah 1
                          </label>
                          <textarea
                            rows={3}
                            value={getFormText('feature1Desc')}
                            onChange={(e) => handleFormTextChange('feature1Desc', e.target.value)}
                            placeholder="Ketik ringkasan langkah 1..."
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                          />
                        </div>
                      </div>

                      {/* Fitur 2 */}
                      <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-purple-500/10 text-purple-400">
                          Langkah 2
                        </span>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                            Judul Langkah 2
                          </label>
                          <input
                            type="text"
                            value={getFormText('feature2Title')}
                            onChange={(e) => handleFormTextChange('feature2Title', e.target.value)}
                            placeholder="e.g. Hubungkan & Sepakati"
                            className="w-full h-10 bg-neutral-900 border border-neutral-800 rounded-xl px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                            Deskripsi Langkah 2
                          </label>
                          <textarea
                            rows={3}
                            value={getFormText('feature2Desc')}
                            onChange={(e) => handleFormTextChange('feature2Desc', e.target.value)}
                            placeholder="Ketik ringkasan langkah 2..."
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                          />
                        </div>
                      </div>

                      {/* Fitur 3 */}
                      <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-500/10 text-indigo-400">
                          Langkah 3
                        </span>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                            Judul Langkah 3
                          </label>
                          <input
                            type="text"
                            value={getFormText('feature3Title')}
                            onChange={(e) => handleFormTextChange('feature3Title', e.target.value)}
                            placeholder="e.g. Bangun & Raih Sukses"
                            className="w-full h-10 bg-neutral-900 border border-neutral-800 rounded-xl px-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                            Deskripsi Langkah 3
                          </label>
                          <textarea
                            rows={3}
                            value={getFormText('feature3Desc')}
                            onChange={(e) => handleFormTextChange('feature3Desc', e.target.value)}
                            placeholder="Ketik ringkasan langkah 3..."
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA & Footer Texts */}
                  <div className="space-y-4 pt-4 border-t border-neutral-800/80">
                    <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider font-mono flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      <span>Bagian CTA & Footer</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2 p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                        <label className="block text-xs font-bold text-white uppercase tracking-wider font-mono">
                          Teks CTA Subheadline
                        </label>
                        <input
                          type="text"
                          value={getFormText('ctaSubheadline')}
                          onChange={(e) => handleFormTextChange('ctaSubheadline', e.target.value)}
                          placeholder="e.g. Mulai kolaborasi bisnis impian Anda hari ini..."
                          className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-400"
                        />
                      </div>

                      <div className="space-y-2 p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                        <label className="block text-xs font-bold text-white uppercase tracking-wider font-mono">
                          Teks Tombol CTA
                        </label>
                        <input
                          type="text"
                          value={getFormText('ctaButtonText')}
                          onChange={(e) => handleFormTextChange('ctaButtonText', e.target.value)}
                          placeholder="e.g. Daftar Sekarang"
                          className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                      <label className="block text-xs font-bold text-white uppercase tracking-wider font-mono">
                        Teks Hak Cipta Footer
                      </label>
                      <input
                        type="text"
                        value={getFormText('footerCopyright')}
                        onChange={(e) => handleFormTextChange('footerCopyright', e.target.value)}
                        placeholder="e.g. © 2026 PartnerFind Inc. Seluruh hak cipta dilindungi."
                        className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-400"
                      />
                    </div>

                    {/* Tally Embed Form Registration URL per Language */}
                    <div className="space-y-2 p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-white uppercase tracking-wider font-mono">
                          Link Embed Tally Form Pendaftaran ({SUPPORTED_ADMIN_LANGUAGES.find(l => l.code === activeTextLang)?.label})
                        </label>
                        {getFormTallyUrl() && (
                          <a
                            href={getFormTallyUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                          >
                            <span>Buka Form</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <input
                        type="text"
                        value={getFormTallyUrl()}
                        onChange={(e) => handleFormTallyUrlChange(e.target.value)}
                        placeholder={DEFAULT_TALLY_URLS[activeTextLang] || 'https://tally.so/embed/...'}
                        className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-400 font-mono"
                      />
                      <p className="text-[10px] text-neutral-500 font-mono">
                        Form Tally ini otomatis dimuat saat pengunjung dengan bahasa{' '}
                        {SUPPORTED_ADMIN_LANGUAGES.find(l => l.code === activeTextLang)?.label} menekan tombol Daftar di Hero & CTA.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Action Bar for Content */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-900">
                <button
                  type="button"
                  onClick={handleResetToDefaultContent}
                  disabled={savingContent}
                  className="w-full sm:w-auto px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded-2xl text-xs font-bold transition-colors cursor-pointer border border-neutral-800 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4 text-neutral-400" />
                  <span>Kembalikan ke Default</span>
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleSaveAllContent()}
                    disabled={savingContent}
                    className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-neutral-200 text-neutral-950 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2.5 shadow-lg active:scale-[0.98]"
                  >
                    {savingContent ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>{savingContent ? 'Menyimpan...' : 'Simpan Semua Konten'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TAB 2: ANGKA LIVE & COUNTDOWN TIMER                           */}
          {/* ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'rules' && (
            <div className="space-y-8">
              {/* Filter Pills for Rules & Numbers */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-900">
                <button
                  type="button"
                  onClick={() => setRulesFilter('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    rulesFilter === 'all'
                      ? 'bg-amber-500 text-black shadow-sm'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  Semua Pengaturan
                </button>
                <button
                  type="button"
                  onClick={() => setRulesFilter('hero')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    rulesFilter === 'hero'
                      ? 'bg-amber-500 text-black shadow-sm'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Angka Live Anggota</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRulesFilter('group')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    rulesFilter === 'group'
                      ? 'bg-amber-500 text-black shadow-sm'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Angka Live Grup</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRulesFilter('countdown')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    rulesFilter === 'countdown'
                      ? 'bg-amber-500 text-black shadow-sm'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Timer className="w-3.5 h-3.5" />
                  <span>Countdown Timer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRulesFilter('cta')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    rulesFilter === 'cta'
                      ? 'bg-amber-500 text-black shadow-sm'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Visibilitas CTA & Video</span>
                </button>
              </div>

              {/* ── 1. ANGKA LIVE ANGGOTA (HERO COUNTER) ── */}
              {(rulesFilter === 'all' || rulesFilter === 'hero') && (
                <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">Angka Live Anggota (Hero Counter)</h3>
                        <p className="text-[11px] text-neutral-400">Pusat kendali jumlah anggota yang ditampilkan di hero banner</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Live di Web: {Number(counterConfig.currentCount || 1000000).toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  {/* Manual Override Anggota */}
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-white uppercase tracking-wider font-mono">
                        1. Override Angka Live Anggota Saat Ini
                      </label>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        Perbarui langsung ke database
                      </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="relative w-full sm:w-2/3">
                        <Users className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={inputCurrentCount}
                          onChange={(e) => setInputCurrentCount(e.target.value)}
                          placeholder="Contoh: 1000000"
                          className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 text-sm text-white font-mono font-bold focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-1/3">
                        <button
                          type="button"
                          onClick={handleOverrideMemberCount}
                          disabled={savingManualMember}
                          className="flex-1 h-11 bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                        >
                          {savingManualMember ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                          <span>Terapkan Angka</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleTestStepMember}
                          disabled={testingTick}
                          title="Simulasi kenaikan acak anggota"
                          className="px-3.5 h-11 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          {testingTick ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '+Step'}
                        </button>
                      </div>
                    </div>
                    {manualMemberSuccessMsg && (
                      <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{manualMemberSuccessMsg}</span>
                      </p>
                    )}
                  </div>

                  {/* Aturan Interval Kenaikan Anggota */}
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-4">
                    <label className="block text-xs font-bold text-white uppercase tracking-wider font-mono">
                      2. Aturan Kenaikan Otomatis (Interval Penambahan)
                    </label>

                    <form onSubmit={handleSaveCounterRules} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                            Min Tambah Tiap Interval
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={inputMinIncrement}
                            onChange={(e) => setInputMinIncrement(e.target.value)}
                            className="w-full h-10 bg-neutral-900 border border-neutral-800 rounded-xl px-3 text-xs text-white font-mono font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                            Max Tambah Tiap Interval
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={inputMaxIncrement}
                            onChange={(e) => setInputMaxIncrement(e.target.value)}
                            className="w-full h-10 bg-neutral-900 border border-neutral-800 rounded-xl px-3 text-xs text-white font-mono font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                            Interval Waktu
                          </label>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min="1"
                              value={inputIntervalValue}
                              onChange={(e) => setInputIntervalValue(e.target.value)}
                              className="w-1/2 h-10 bg-neutral-900 border border-neutral-800 rounded-xl px-3 text-xs text-white font-mono font-medium"
                            />
                            <select
                              value={inputIntervalUnit}
                              onChange={(e) => setInputIntervalUnit(e.target.value as 'seconds' | 'minutes')}
                              className="w-1/2 h-10 bg-neutral-900 border border-neutral-800 rounded-xl px-2 text-xs text-white font-mono"
                            >
                              <option value="seconds">Detik</option>
                              <option value="minutes">Menit</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="submit"
                          disabled={savingCounter}
                          className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-2"
                        >
                          {savingCounter ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
                          <span>Simpan Aturan Anggota</span>
                        </button>
                        {counterSuccessMsg && <p className="text-xs text-emerald-400 font-medium">{counterSuccessMsg}</p>}
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ── 2. ANGKA LIVE GRUP (GROUP COUNTER) ── */}
              {(rulesFilter === 'all' || rulesFilter === 'group') && (
                <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                        <Layers className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">Angka Live Grup (Group Counter)</h3>
                        <p className="text-[11px] text-neutral-400">Pusat kendali jumlah grup terbentuk yang ditampilkan di hero banner</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-purple-400">
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                      <span>Live di Web: {Number(counterConfig.groupCount || 342180).toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  {/* Manual Override Grup */}
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-white uppercase tracking-wider font-mono">
                        1. Override Angka Live Grup Saat Ini
                      </label>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        Perbarui langsung ke database
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="relative w-full sm:w-2/3">
                        <Layers className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={inputGroupCount}
                          onChange={(e) => setInputGroupCount(e.target.value)}
                          placeholder="Contoh: 342180"
                          className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 text-sm text-white font-mono font-bold focus:outline-none focus:border-purple-400"
                        />
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-1/3">
                        <button
                          type="button"
                          onClick={handleOverrideGroupCount}
                          disabled={savingManualGroup}
                          className="flex-1 h-11 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                        >
                          {savingManualGroup ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                          <span>Terapkan Angka</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleTestStepGroup}
                          disabled={testingGroupTick}
                          title="Simulasi kenaikan acak grup"
                          className="px-3.5 h-11 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          {testingGroupTick ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '+Step'}
                        </button>
                      </div>
                    </div>
                    {groupCounterSuccessMsg && (
                      <p className="text-xs text-purple-400 font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{groupCounterSuccessMsg}</span>
                      </p>
                    )}
                  </div>

                  {/* Aturan Interval Kenaikan Grup */}
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-4">
                    <label className="block text-xs font-bold text-white uppercase tracking-wider font-mono">
                      2. Aturan Kenaikan Otomatis Grup
                    </label>

                    <form onSubmit={handleSaveGroupCounterRules} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                            Min Tambah Grup
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={inputGroupMinIncrement}
                            onChange={(e) => setInputGroupMinIncrement(e.target.value)}
                            className="w-full h-10 bg-neutral-900 border border-neutral-800 rounded-xl px-3 text-xs text-white font-mono font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                            Max Tambah Grup
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={inputGroupMaxIncrement}
                            onChange={(e) => setInputGroupMaxIncrement(e.target.value)}
                            className="w-full h-10 bg-neutral-900 border border-neutral-800 rounded-xl px-3 text-xs text-white font-mono font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                            Interval Waktu Grup
                          </label>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min="1"
                              value={inputGroupIntervalValue}
                              onChange={(e) => setInputGroupIntervalValue(e.target.value)}
                              className="w-1/2 h-10 bg-neutral-900 border border-neutral-800 rounded-xl px-3 text-xs text-white font-mono font-medium"
                            />
                            <select
                              value={inputGroupIntervalUnit}
                              onChange={(e) => setInputGroupIntervalUnit(e.target.value as 'seconds' | 'minutes')}
                              className="w-1/2 h-10 bg-neutral-900 border border-neutral-800 rounded-xl px-2 text-xs text-white font-mono"
                            >
                              <option value="seconds">Detik</option>
                              <option value="minutes">Menit</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="submit"
                          disabled={savingGroupCounter}
                          className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-2"
                        >
                          {savingGroupCounter ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <TrendingUp className="w-3.5 h-3.5 text-purple-400" />}
                          <span>Simpan Aturan Grup</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ── 3. COUNTDOWN TIMER & ANNOUNCEMENT BAR ── */}
              {(rulesFilter === 'all' || rulesFilter === 'countdown') && (
                <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <Timer className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">Pengaturan Countdown Timer & Announcement Bar</h3>
                        <p className="text-[11px] text-neutral-400">Atur target waktu penutupan pra registrasi dan teks pengumuman</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAnnouncementEnabled(!announcementEnabled)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                          announcementEnabled
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                        }`}
                      >
                        {announcementEnabled ? <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{announcementEnabled ? 'Countdown Aktif' : 'Countdown Disembunyikan'}</span>
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSaveAnnouncement} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 font-mono">
                          Pesan / Judul Countdown (Bahasa Indonesia)
                        </label>
                        <input
                          type="text"
                          value={announcementMessage}
                          onChange={(e) => setAnnouncementMessage(e.target.value)}
                          placeholder="e.g. Pra Registrasi ditutup dalam"
                          className="w-full h-11 bg-neutral-950 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 font-mono">
                          Pesan Countdown (English)
                        </label>
                        <input
                          type="text"
                          value={announcementMessageEn}
                          onChange={(e) => setAnnouncementMessageEn(e.target.value)}
                          placeholder="e.g. Collaboration registration closes in:"
                          className="w-full h-11 bg-neutral-950 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 font-mono">
                          Target Tanggal & Jam Berakhir
                        </label>
                        <div className="relative">
                          <input
                            type="datetime-local"
                            value={announcementTargetDate}
                            onChange={(e) => setAnnouncementTargetDate(e.target.value)}
                            className="w-full h-11 bg-neutral-950 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                          />
                        </div>
                        <p className="text-[10px] text-neutral-500 mt-1 font-mono">
                          Format waktu lokal Anda. Hitungan mundur berjalan otomatis di browser pengguna.
                        </p>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 font-mono">
                          Siklus Auto-Roll (Hari)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={announcementAutoRoll}
                          onChange={(e) => setAnnouncementAutoRoll(parseInt(e.target.value, 10) || 0)}
                          placeholder="0 (Tetap berakhir) atau 3 (Roll 3 hari)"
                          className="w-full h-11 bg-neutral-950 border border-neutral-800 rounded-xl px-4 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                        />
                        <p className="text-[10px] text-neutral-500 mt-1 font-mono">
                          Isi 0 jika tanggal tetap; isi &gt; 0 agar waktu otomatis diperpanjang jika telah habis.
                        </p>
                      </div>
                    </div>

                    {/* Preview Box Countdown */}
                    <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                          <Timer className="w-4 h-4 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">
                            {announcementMessage || 'Pra Registrasi ditutup dalam'}
                          </p>
                          <p className="text-[11px] text-neutral-500 font-mono">
                            Target: {announcementTargetDate ? new Date(announcementTargetDate).toLocaleString('id-ID') : 'Belum diatur'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-center font-mono">
                        <div className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg">
                          <span className="text-xs font-bold text-amber-400">Target</span>
                          <span className="block text-[10px] text-neutral-500">SET</span>
                        </div>
                        <span className="text-neutral-500 font-bold">:</span>
                        <div className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg">
                          <span className="text-xs font-bold text-white">{announcementEnabled ? 'AKTIF' : 'OFF'}</span>
                          <span className="block text-[10px] text-neutral-500">STATUS</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="submit"
                        disabled={savingAnnouncement}
                        className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 shadow-md active:scale-[0.98]"
                      >
                        {savingAnnouncement ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        <span>Simpan Pengaturan Countdown</span>
                      </button>
                      {announcementSuccessMsg && (
                        <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{announcementSuccessMsg}</span>
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/* ── 4. VISIBILITAS CTA & VIDEO ── */}
              {(rulesFilter === 'all' || rulesFilter === 'cta') && (
                <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 space-y-6">
                  <div className="flex items-center gap-3 border-b border-neutral-800/80 pb-4">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Sliders className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Visibilitas Komponen Tambahan (CTA & Video)</h3>
                      <p className="text-[11px] text-neutral-400">Sembunyikan atau tampilkan section CTA dan embed video secara cepat</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* CTA Toggle */}
                    <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-mono uppercase">Section Call to Action (CTA)</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          ctaEnabled ? 'bg-emerald-500/15 text-emerald-400' : 'bg-neutral-800 text-neutral-400'
                        }`}>
                          {ctaEnabled ? 'Tampil' : 'Sembunyi'}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">
                        Mengontrol tampilan banner ajakan bertindak (CTA) di bagian bawah halaman.
                      </p>
                      <button
                        type="button"
                        onClick={() => handleToggleCta(!ctaEnabled)}
                        disabled={savingCta}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                          ctaEnabled
                            ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-800'
                            : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40'
                        }`}
                      >
                        {savingCta ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                        <span>{ctaEnabled ? 'Sembunyikan Section CTA' : 'Tampilkan Section CTA'}</span>
                      </button>
                      {ctaSuccessMsg && <p className="text-[11px] text-emerald-400 font-medium">{ctaSuccessMsg}</p>}
                    </div>

                    {/* Video Toggle */}
                    <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-mono uppercase">Embed Video YouTube</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          videoConfig.enabled ? 'bg-emerald-500/15 text-emerald-400' : 'bg-neutral-800 text-neutral-400'
                        }`}>
                          {videoConfig.enabled ? 'Tampil' : 'Sembunyi'}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">
                        Mengontrol tampilan player embed YouTube di bawah hero banner.
                      </p>
                      <button
                        type="button"
                        onClick={() => handleToggleVideo(!videoConfig.enabled)}
                        disabled={savingVideo}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                          videoConfig.enabled
                            ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-800'
                            : 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border-indigo-500/40'
                        }`}
                      >
                        {savingVideo ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                        <span>{videoConfig.enabled ? 'Sembunyikan Video' : 'Tampilkan Video'}</span>
                      </button>
                      {videoSuccessMsg && <p className="text-[11px] text-emerald-400 font-medium">{videoSuccessMsg}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
