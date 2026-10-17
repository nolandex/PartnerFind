import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, X, ShieldCheck, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TopNavbar } from "../components/top-navbar";
import { getGlobalStats } from "../data/countriesNetwork";
import { useLanguage } from "../context/LanguageContext";
import featImg1 from "../assets/images/collab_creators_search_1788611140629.jpg";
import featImg2 from "../assets/images/collab_direct_connect_1788611155564.jpg";
import featImg3 from "../assets/images/collab_revenue_growth_1788611167540.jpg";

// Replace this with your actual YouTube video ID
const YOUTUBE_VIDEO_ID = "8mAITcNt710";

export default function GlobalNetwork() {
  const { locale, t } = useLanguage();
  const stats = useMemo(() => getGlobalStats(), []);
  const [activeModal, setActiveModal] = useState<'about' | 'privacy' | 'terms' | null>(null);

  const heroHeadline = useMemo(() => {
    switch (locale) {
      case "id-ID":
        return "Mari Menjadi Mitra Pengundang & Bangun Jaringan Global Bersama Kami";
      case "es-ES":
        return "Únete Como Socio Invitador y Construye una Red Global con Nosotros";
      case "fr-FR":
        return "Devenez Partenaire Inviteur et Développez un Réseau Mondial avec Nous";
      case "de-DE":
        return "Werden Sie Einladungs-Partner und Bauen Sie ein Globales Netzwerk auf";
      case "ja-JP":
        return "招待パートナーに参加して、私たちと共にグローバルネットワークを構築しましょう";
      case "zh-CN":
        return "成为邀请合作伙伴，与我们一起构建全球协作网络";
      case "ko-KR":
        return "초대 파트너로 참여하여 글로벌 협업 네트워크를 함께 구축하세요";
      case "ru-RU":
        return "Станьте партнером-пригласителем и развивайте глобальную сеть вместе с нами";
      case "ar-SA":
        return "انضم إلينا كشريك دعوة وقم ببناء شبكة عالمية معنا";
      case "tr-TR":
        return "Davet Ortağı Olun ve Bizimle Birlikte Küresel Bir Ağ Kurun";
      case "pt-PT":
        return "Junte-se Como Parceiro Convidador e Construa uma Rede Global Connosco";
      case "en-US":
      default:
        return "Join Us as an Inviter Partner & Build a Worldwide Network Together";
    }
  }, [locale]);

  const texts = useMemo(() => {
    switch (locale) {
      case "id-ID":
        return {
          back: "Kembali",
          home: "Beranda",
          pageTitle: "Mitra Global",
          statCountries: "Negara Terjangkau",
          statTarget: "Partner Target",
          statPartners: "Partner Bergabung",
          stepsHeading: "Cara Bergabung Menjadi Mitra",
          close: "Tutup",
          step1Title: "Daftarkan Titik Lokasi Anda",
          step1Desc: "Lengkapi profil kemitraan dan tentukan kota serta negara Anda untuk mendapatkan identitas resmi dan tautan titik pengundang.",
          step2Title: "Sebarkan Tautan Pengundang",
          step2Desc: "Bagikan tautan unik dan kode referensi Anda kepada kreator, agensi, dan pelaku bisnis di wilayah Anda untuk terhubung ke ekosistem.",
          step3Title: "Raih Bagi Hasil & Kembangkan Jaringan",
          step3Desc: "Dapatkan bagi hasil langsung secara otomatis dan pantau pertumbuhan jumlah titik kolaborasi aktif Anda secara transparan.",
        };
      case "es-ES":
        return {
          back: "Volver",
          home: "Inicio",
          pageTitle: "Red Global",
          statCountries: "Países Cubiertos",
          statTarget: "Socios Objetivo",
          statPartners: "Socios Unidos",
          stepsHeading: "Cómo Unirse Como Socio",
          close: "Cerrar",
          step1Title: "Registra Tu Punto de Ubicación",
          step1Desc: "Completa tu perfil de socio, selecciona tu ciudad y país para establecer un punto de red oficial y un enlace de invitación único.",
          step2Title: "Comparte Tu Enlace de Invitación",
          step2Desc: "Comparte tu enlace de invitación exclusivo con creadores, agencias y empresas locales para conectarlos al ecosistema.",
          step3Title: "Obtén Ingresos y Haz Crecer Tu Red",
          step3Desc: "Recibe reparto de ingresos automatizado y monitorea el crecimiento transparente de tus puntos de colaboración en tiempo real.",
        };
      case "fr-FR":
        return {
          back: "Retour",
          home: "Accueil",
          pageTitle: "Réseau Mondial",
          statCountries: "Pays Couverts",
          statTarget: "Partenaires Cibles",
          statPartners: "Partenaires Inscrits",
          stepsHeading: "Comment Devenir Partenaire",
          close: "Fermer",
          step1Title: "Enregistrez Votre Point de Localisation",
          step1Desc: "Complétez votre profil de partenaire, sélectionnez votre ville et votre pays pour obtenir un point officiel et un lien d'invitation unique.",
          step2Title: "Partagez Votre Lien d'Invitation",
          step2Desc: "Partagez votre lien d'invitation avec les créateurs, agences et entreprises de votre région pour les intégrer à l'écosystème.",
          step3Title: "Gagnez des Revenus et Développez Votre Réseau",
          step3Desc: "Recevez un partage automatique des revenus et suivez la croissance transparente de vos collaborations actives en temps réel.",
        };
      case "de-DE":
        return {
          back: "Zurück",
          home: "Startseite",
          pageTitle: "Globales Netzwerk",
          statCountries: "Abgedeckte Länder",
          statTarget: "Zielpartner",
          statPartners: "Beigetretene Partner",
          stepsHeading: "So Werden Sie Partner",
          close: "Schließen",
          step1Title: "Registrieren Sie Ihren Standort",
          step1Desc: "Vervollständigen Sie Ihr Profil, wählen Sie Stadt und Land, um einen offiziellen Netzwerkpunkt und Einladungslink zu erhalten.",
          step2Title: "Teilen Sie Ihren Einladungslink",
          step2Desc: "Teilen Sie Ihren exklusiven Einladungslink mit Creatorn, Agenturen und Unternehmen in Ihrer Region.",
          step3Title: "Erlöse Erzielen & Netzwerk Ausbauen",
          step3Desc: "Erhalten Sie automatische Erlösbeteiligungen und verfolgen Sie das transparente Wachstum Ihrer Kooperationen in Echtzeit.",
        };
      case "ja-JP":
        return {
          back: "戻る",
          home: "ホーム",
          pageTitle: "グローバルパートナー",
          statCountries: "対象国・地域",
          statTarget: "目標パートナー数",
          statPartners: "参加パートナー数",
          stepsHeading: "パートナーへの参加手順",
          close: "閉じる",
          step1Title: "拠点・ロケーションを登録",
          step1Desc: "パートナープロフィールを入力し、都市と国を選択して公式ネットワーク拠点と専用の招待リンクを発行します。",
          step2Title: "招待リンクを共有・拡散",
          step2Desc: "専用の招待リンクを地域のクリエイター、代理店、ビジネスオーナーに共有し、グローバルコミュニティに接続します。",
          step3Title: "収益を獲得＆ネットワークを拡大",
          step3Desc: "自動収益シェアを受け取り、アクティブなコラボレーション拠点の成長をリアルタイムかつ透明に確認できます。",
        };
      case "zh-CN":
        return {
          back: "返回",
          home: "首页",
          pageTitle: "全球合作伙伴",
          statCountries: "覆盖国家与地区",
          statTarget: "目标合作伙伴",
          statPartners: "已加入合作伙伴",
          stepsHeading: "如何成为合作伙伴",
          close: "关闭",
          step1Title: "注册您的位置节点",
          step1Desc: "完善您的合作资料，选择所在的城市与国家，即可获得官方网络认证标识与专属邀请链接。",
          step2Title: "分享专属邀请链接",
          step2Desc: "将您的专属邀请链接分享给本地区的创作者、机构及企业伙伴，助其快速接入全球协作生态。",
          step3Title: "获取收益分成并拓展网络",
          step3Desc: "享受自动化收益分成，实时透明追踪名下所有活跃合作节点与业务的持续增长。",
        };
      case "ko-KR":
        return {
          back: "뒤로",
          home: "홈",
          pageTitle: "글로벌 파트너",
          statCountries: "서비스 지원 국가",
          statTarget: "목표 파트너",
          statPartners: "참여 파트너",
          stepsHeading: "파트너 참여 방법",
          close: "닫기",
          step1Title: "위치 거점 등록하기",
          step1Desc: "파트너 프로필을 입력하고 거주 도시와 국가를 지정하여 공식 네트워크 인증 및 고유 초대 링크를 발급받으세요.",
          step2Title: "초대 링크 공유 및 확산",
          step2Desc: "고유 초대 링크를 지역 크리에이터, 에이전시, 비즈니스에 공유하여 글로벌 협업 생태계로 연결하세요.",
          step3Title: "수익 창출 및 네트워크 확장",
          step3Desc: "자동화된 수익 분배를 받고 실시간으로 투명하게 활성 협업 거점의 성장을 추적하세요.",
        };
      case "ru-RU":
        return {
          back: "Назад",
          home: "Главная",
          pageTitle: "Глобальная сеть",
          statCountries: "Охваченные страны",
          statTarget: "Целевые партнеры",
          statPartners: "Присоединившиеся партнеры",
          stepsHeading: "Как стать партнером",
          close: "Закрыть",
          step1Title: "Зарегистрируйте локацию",
          step1Desc: "Заполните профиль партнера, укажите ваш город и страну, чтобы получить официальный узел сети и уникальную ссылку-приглашение.",
          step2Title: "Делитесь ссылкой-приглашением",
          step2Desc: "Отправляйте вашу ссылку креаторам, агентствам и бизнесу в вашем регионе для подключения к экосистеме.",
          step3Title: "Получайте доход и развивайте сеть",
          step3Desc: "Получайте автоматические выплаты и отслеживайте рост ваших активных точек сотрудничества в реальном времени.",
        };
      case "ar-SA":
        return {
          back: "رجوع",
          home: "الرئيسية",
          pageTitle: "الشركاء العالميون",
          statCountries: "البلدان المغطاة",
          statTarget: "الشركاء المستهدفون",
          statPartners: "الشركاء المنضمون",
          stepsHeading: "كيفية الانضمام كشريك",
          close: "إغلاق",
          step1Title: "سجل نقطة موقعك",
          step1Desc: "أكمل ملفك التعريفي كشريك، وحدد مدينتك وبلدك للحصول على نقطة شبكة رسمية ورابط دعوة فريد.",
          step2Title: "شارك رابط الدعوة الخاص بك",
          step2Desc: "شارك رابط الدعوة المخصص لك مع المبدعين والوكالات والشركات المحلية في منطقتك لربطهم بالمنظومة.",
          step3Title: "احصل على الأرباح ووسع شبكتك",
          step3Desc: "احصل على حصة أرباح تلقائية وراقب النمو الشفاف لنقاط التعاون النشطة لديك في الوقت الفعلي.",
        };
      case "tr-TR":
        return {
          back: "Geri",
          home: "Ana Sayfa",
          pageTitle: "Küresel Ağ",
          statCountries: "Kapsanan Ülkeler",
          statTarget: "Hedef Ortaklar",
          statPartners: "Katılan Ortaklar",
          stepsHeading: "Nasıl Ortak Olunur",
          close: "Kapat",
          step1Title: "Konum Noktanızı Kaydedin",
          step1Desc: "Ortak profilinizi tamamlayın, şehrinizi ve ülkenizi seçerek resmi bir ağ noktası ve benzersiz davet bağlantısı alın.",
          step2Title: "Davet Bağlantınızı Paylaşın",
          step2Desc: "Bölgenizdeki üreticiler, ajanslar ve işletmelerle özel davet bağlantınızı paylaşarak onları ekosisteme bağlayın.",
          step3Title: "Gelir Elde Edin ve Ağı Büyütün",
          step3Desc: "Doğrudan otomatik gelir paylaşımı alın ve aktif iş birliği noktalarınızın şeffaf büyümesini gerçek zamanlı izleyin.",
        };
      case "pt-PT":
        return {
          back: "Voltar",
          home: "Início",
          pageTitle: "Rede Global",
          statCountries: "Países Cobertos",
          statTarget: "Parceiros-Alvo",
          statPartners: "Parceiros Inscritos",
          stepsHeading: "Como Aderir Como Parceiro",
          close: "Fechar",
          step1Title: "Registe o Seu Ponto de Localização",
          step1Desc: "Complete o seu perfil de parceiro, selecione a sua cidade e país para estabelecer um ponto oficial e link exclusivo de convite.",
          step2Title: "Partilhe o Seu Link de Convite",
          step2Desc: "Partilhe o seu link de convite exclusivo com criadores, agências e empresas locais da sua região.",
          step3Title: "Obtenha Receitas e Expanda a Rede",
          step3Desc: "Receba partilha de receita direta e automatizada e acompanhe o crescimento dos seus pontos de colaboração em tempo real.",
        };
      case "en-US":
      default:
        return {
          back: "Back",
          home: "Home",
          pageTitle: "Global Network",
          statCountries: "Countries Covered",
          statTarget: "Target Partners",
          statPartners: "Joined Partners",
          stepsHeading: "How to Join as a Partner",
          close: "Close",
          step1Title: "Register Your Location Point",
          step1Desc: "Complete your partner profile, select your city and country to establish an official network point and unique invite link.",
          step2Title: "Share Your Invite Link",
          step2Desc: "Share your dedicated invite link with creators, agencies, and local businesses in your region to connect them to the ecosystem.",
          step3Title: "Earn Revenue & Grow Network",
          step3Desc: "Receive direct automated revenue sharing and monitor the transparent growth of your active collaboration points in real time.",
        };
    }
  }, [locale]);

  const legalData = useMemo(() => {
    if (locale === "id-ID") {
      return {
        about: {
          intro: "PartnerFind adalah platform infrastruktur kolaborasi digital yang menghubungkan pemilik bisnis, agensi, dan kreator konten melalui jaringan titik pengundang terdesentralisasi.",
          flowTitle: "Alur Ekosistem:",
          steps: [
            { bold: "Titik Lokasi:", text: "Representasi simpul jaringan kerja sama di setiap kota dan negara." },
            { bold: "Bagi Hasil Otomatis:", text: "Sistem komisi dan transparansi revenue yang adil bagi seluruh mitra." },
            { bold: "Akses Global:", text: "Membuka peluang kemitraan lintas negara tanpa batasan wilayah." }
          ]
        },
        privacy: {
          intro: "Privasi dan keamanan data Anda adalah prioritas mutlak kami:",
          points: [
            "Data profil publik hanya menampilkan informasi kontak yang Anda setujui.",
            "Keamanan enkripsi tingkat tinggi untuk seluruh data transaksi dan analitik.",
            "Kami tidak pernah menjual data pribadi kepada pihak ketiga manapun."
          ]
        },
        terms: {
          intro: "Ketentuan Penggunaan Platform Kemitraan PartnerFind:",
          points: [
            "Setiap mitra bertanggung jawab menjaga keakuratan informasi profil.",
            "Dilarang melakukan spam atau penyalahgunaan tautan pengundang.",
            "Sistem berhak menonaktifkan akun yang melanggar ketentuan komunitas."
          ]
        }
      };
    } else {
      return {
        about: {
          intro: "PartnerFind is a decentralized digital collaboration infrastructure platform connecting businesses, agencies, and creators through a global network of invite nodes.",
          flowTitle: "Ecosystem Flow:",
          steps: [
            { bold: "Location Points:", text: "Regional collaboration nodes across cities and countries." },
            { bold: "Automated Revenue Share:", text: "Fair, transparent revenue allocation for all active partners." },
            { bold: "Global Access:", text: "Unlocking international cross-border collaboration opportunities." }
          ]
        },
        privacy: {
          intro: "Your privacy and data security are our top priority:",
          points: [
            "Public profile data only displays information you explicitly choose to share.",
            "Industry-standard encryption for all transactions and activity data.",
            "We never sell personal data to third parties."
          ]
        },
        terms: {
          intro: "PartnerFind Partner Platform Terms of Use:",
          points: [
            "Partners must maintain accurate profile and location information.",
            "Spamming or abusing invite links is strictly prohibited.",
            "Accounts violating community safety guidelines will be revoked."
          ]
        }
      };
    }
  }, [locale]);

  const PARTNER_STEPS = useMemo(() => [
    {
      title: texts.step1Title,
      desc: texts.step1Desc,
      image: featImg1,
    },
    {
      title: texts.step2Title,
      desc: texts.step2Desc,
      image: featImg2,
    },
    {
      title: texts.step3Title,
      desc: texts.step3Desc,
      image: featImg3,
    },
  ], [texts]);

  const formatNumber = (num: number) => {
    try {
      return new Intl.NumberFormat(locale === "id-ID" ? "id-ID" : "en-US").format(num);
    } catch {
      return num.toLocaleString();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-brand selection:text-white overflow-x-hidden w-full">
      {/* Top Navigation */}
      <TopNavbar showBack backTo="/" backLabel={texts.back} />

      {/* ── HERO SECTION (Proporsional, Elegan, dan Nyaman) ── */}
      <section className="relative pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 md:pb-24 overflow-hidden transition-all duration-200">
        {/* Ambient background glow (Centered behind content) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(700px,90vw)] aspect-square rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--brand-accent)/0.18) 0%, transparent 70%)", filter: "blur(65px)" }}
        />
        <div
          className="absolute bottom-0 right-[-10%] w-[min(480px,70vw)] aspect-square rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--brand-accent)/0.07) 0%, transparent 70%)", filter: "blur(80px)" }}
        />

        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="max-w-4xl mx-auto text-[clamp(2.2rem,6vw,4.5rem)] font-black tracking-tight leading-[1.14] mb-8 sm:mb-10 whitespace-pre-line text-foreground">
              {heroHeadline}
            </h1>

            {/* Minimalist Global Summary Stats (1 Single Balanced & Ultra-Clean Row) */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center justify-items-center gap-3 sm:gap-8 md:gap-12 w-full max-w-3xl mx-auto px-1 sm:px-4">
              {/* 1. Partner Bergabung */}
              <div className="text-center w-full max-w-[280px]">
                <span className="text-[11px] sm:text-xs md:text-sm text-muted-foreground block font-semibold uppercase tracking-wider mb-1.5 sm:mb-2">
                  {texts.statPartners}
                </span>
                <span className="font-extrabold text-foreground font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight block">
                  {formatNumber(stats.totalInviters)}
                </span>
              </div>

              {/* Center Divider */}
              <div className="w-px h-10 sm:h-14 md:h-18 bg-border shrink-0" />

              {/* 2. Partner Target */}
              <div className="text-center w-full max-w-[280px]">
                <span className="text-[11px] sm:text-xs md:text-sm text-muted-foreground block font-semibold uppercase tracking-wider mb-1.5 sm:mb-2">
                  {texts.statTarget}
                </span>
                <span className="font-extrabold text-foreground font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight block">
                  {formatNumber(stats.totalTargetInviters)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: CARA BERGABUNG MENJADI MITRA (Identik 1:1 dengan Section 2 Halaman Utama) ── */}
      <section id="features" className="py-14 sm:py-16 relative overflow-hidden border-t border-foreground/[0.06]">
        <div
          className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[min(400px,60vw)] aspect-square rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--brand-accent)/0.08) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="relative z-10 pl-2 sm:pl-4 pr-5 sm:pr-8 max-w-6xl mx-auto">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-bold tracking-tight text-foreground">
              {texts.stepsHeading}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-x-8 gap-y-8">
            {PARTNER_STEPS.map((item, i) => (
              <div key={i} className="relative flex items-stretch">
                {/* Numbered step badge + connector container */}
                <div className="relative flex flex-col items-center mr-4 shrink-0">
                  <div
                    className="relative z-10 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 shrink-0 rounded-full border border-white/20 transition-colors duration-300 font-mono"
                    style={{
                      background: "hsl(var(--brand-accent))",
                      boxShadow: "0 4px 12px hsl(var(--brand-accent)/0.35)",
                    }}
                  >
                    <span className="text-white font-black text-xs leading-none">{i + 1}</span>
                  </div>

                  {/* Continuous vertical line on mobile spanning through card height and bridging the grid gap */}
                  {i !== PARTNER_STEPS.length - 1 && (
                    <div
                      className="w-[1.5px] bg-foreground/20 flex-1 md:hidden"
                      style={{ marginBottom: "-32px" }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Desktop horizontal connector line bridging to the next column */}
                {i !== PARTNER_STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-3 sm:top-3.5 left-6 sm:left-7 right-[-32px] h-[1.5px] bg-foreground/20 -z-0 pointer-events-none"
                    aria-hidden="true"
                  />
                )}

                {/* Point Content: Image above Title & Description */}
                <div className="pb-4 pt-0 flex-1 min-w-0">
                  {/* Image above Title (Standard 16:9 Aspect Ratio) */}
                  <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-neutral-900 border border-white/10 mb-4 relative group/img">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <h3 className="text-lg sm:text-[18px] font-bold mb-1.5 leading-snug text-foreground">
                    {item.title}
                  </h3>

                  <p className="text-[14.5px] sm:text-[15px] text-muted-foreground leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER: Identik dengan Footer Halaman Utama (About, Privacy, Terms) ── */}
      <footer className="border-t border-foreground/[0.08] py-8 bg-background relative z-20 text-[13px] text-foreground/70">
        <div className="container mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Copyright */}
          <div className="text-center sm:text-left">
            <span className="text-[11.5px] text-foreground/60 font-mono">{t("footer_copyright")}</span>
          </div>

          {/* Right: Quick transparency links inline */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              to="/"
              className="text-foreground/75 hover:text-foreground transition-colors cursor-pointer text-xs font-medium"
            >
              {texts.home}
            </Link>
            <button
              onClick={() => setActiveModal('privacy')}
              className="text-foreground/75 hover:text-foreground transition-colors cursor-pointer text-xs font-medium"
            >
              {t("footer_privacy")}
            </button>
            <button
              onClick={() => setActiveModal('terms')}
              className="text-foreground/75 hover:text-foreground transition-colors cursor-pointer text-xs font-medium"
            >
              {t("footer_terms")}
            </button>
          </div>
        </div>
      </footer>

      {/* ── MODALS SYSTEM FOR TRANSPARENCY ── */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-card border border-border rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh] text-left shadow-2xl text-card-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/40">
                <div className="flex items-center gap-2">
                  {activeModal === 'about' && <Users className="w-5 h-5" style={{ color: "hsl(var(--brand-accent))" }} />}
                  {activeModal === 'privacy' && <ShieldCheck className="w-5 h-5" style={{ color: "hsl(var(--brand-accent))" }} />}
                  {activeModal === 'terms' && <FileText className="w-5 h-5" style={{ color: "hsl(var(--brand-accent))" }} />}
                  <h3 className="font-bold text-lg text-foreground">
                    {activeModal === 'about' && t("footer_company_about")}
                    {activeModal === 'privacy' && t("footer_privacy")}
                    {activeModal === 'terms' && t("footer_terms")}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4 text-sm text-foreground/80 leading-relaxed">
                {activeModal === 'about' && (
                  <>
                    <p>{legalData.about.intro}</p>
                    <p><strong className="text-foreground">{legalData.about.flowTitle}</strong></p>
                    <ul className="list-disc pl-5 space-y-1.5 text-foreground/80">
                      {legalData.about.steps.map((step, idx) => (
                        <li key={idx}>
                          <strong className="text-foreground">{step.bold} </strong>
                          {step.text}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {activeModal === 'privacy' && (
                  <>
                    <p>{legalData.privacy.intro}</p>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                      {legalData.privacy.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </>
                )}

                {activeModal === 'terms' && (
                  <>
                    <p>{legalData.terms.intro}</p>
                    <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                      {legalData.terms.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-border bg-muted/40 flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground transition-colors cursor-pointer border border-border"
                >
                  {texts.close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
