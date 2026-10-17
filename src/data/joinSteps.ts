import { Locale } from "../lib/translations";

export interface JoinStepItem {
  number: number;
  title: string;
  desc: string;
}

export interface JoinSectionData {
  heading: string;
  steps: JoinStepItem[];
}

export const JOIN_STEPS_DATA: Record<Locale, JoinSectionData> = {
  "id-ID": {
    heading: "Cara Bergabung",
    steps: [
      {
        number: 1,
        title: "Cari atau Buat Kerja Sama",
        desc: "Temukan partner kerja sama yang sesuai melalui pencarian pintar, atau buat postingan kebutuhan kolaborasi Anda sendiri.",
      },
      {
        number: 2,
        title: "Terhubung & Mulai Menghasilkan",
        desc: "Hubungi partner secara langsung melalui WhatsApp atau kontak yang tersedia, lalu mulai eksekusi kerja sama menghasilkan uang.",
      },
    ],
  },
  "en-US": {
    heading: "How to Join",
    steps: [
      {
        number: 1,
        title: "Search or Create Collaboration",
        desc: "Find matching partners via smart search, or create your own post detailing the collaboration and skills you need.",
      },
      {
        number: 2,
        title: "Connect & Start Earning",
        desc: "Reach out to your chosen partner directly via WhatsApp or listed contacts, then start working together to make money.",
      },
    ],
  },
  "es-ES": {
    heading: "Cómo Unirse",
    steps: [
      {
        number: 1,
        title: "Buscar o Crear Colaboración",
        desc: "Encuentra el socio ideal a través de la búsqueda inteligente o publica tu propia propuesta de colaboración.",
      },
      {
        number: 2,
        title: "Conectar y Empezar a Ganar",
        desc: "Contacta al socio directamente por WhatsApp o sus medios de contacto y comiencen a generar ingresos juntos.",
      },
    ],
  },
  "fr-FR": {
    heading: "Comment Rejoindre",
    steps: [
      {
        number: 1,
        title: "Rechercher ou Créer une Collaboration",
        desc: "Trouvez le partenaire idéal grâce à la recherche intelligente ou publiez votre propre annonce de collaboration.",
      },
      {
        number: 2,
        title: "Se Connecter & Commencer à Gagner",
        desc: "Contactez directement votre partenaire via WhatsApp ou ses coordonnées, et commencez à générer des revenus ensemble.",
      },
    ],
  },
  "de-DE": {
    heading: "So treten Sie bei",
    steps: [
      {
        number: 1,
        title: "Zusammenarbeit Suchen oder Erstellen",
        desc: "Finden Sie passende Partner über die intelligente Suche oder erstellen Sie Ihren eigenen Kooperationsbeitrag.",
      },
      {
        number: 2,
        title: "Direkt Verbinden & Geld Verdienen",
        desc: "Kontaktieren Sie Partner direkt über WhatsApp oder angegebene Kontakte und starten Sie die Zusammenarbeit.",
      },
    ],
  },
  "zh-CN": {
    heading: "如何加入",
    steps: [
      {
        number: 1,
        title: "搜索或发布合作需求",
        desc: "通过智能搜索寻找匹配的合作伙伴，或发布您自己的合作与技能需求。",
      },
      {
        number: 2,
        title: "直接联系并开始赚钱",
        desc: "通过 WhatsApp 或预留联系方式直接与伙伴沟通，立即启动合作共同创造收益。",
      },
    ],
  },
  "ja-JP": {
    heading: "参加方法",
    steps: [
      {
        number: 1,
        title: "コラボの検索または募集作成",
        desc: "スマート検索で最適なパートナーを見つけるか、あなたのコラボ募集投稿を作成します。",
      },
      {
        number: 2,
        title: "直接つながり、収益化を開始",
        desc: "WhatsAppなどの連絡先を通じて直接連絡を取り、一緒にプロジェクトを実行して収益を生み出します。",
      },
    ],
  },
  "ru-RU": {
    heading: "Как присоединиться",
    steps: [
      {
        number: 1,
        title: "Найти или создать сотрудничество",
        desc: "Найдите подходящих партнеров через умный поиск или опубликуйте собственное предложение о сотрудничестве.",
      },
      {
        number: 2,
        title: "Связаться напрямую и зарабатывать",
        desc: "Свяжитесь с партнером напрямую через WhatsApp или контакты и начните совместный прибыльный проект.",
      },
    ],
  },
  "ar-SA": {
    heading: "كيفية الانضمام",
    steps: [
      {
        number: 1,
        title: "ابحث أو أنشئ فرصة تعاون",
        desc: "اعثر على الشريك المناسب عبر البحث الذكي، أو انشر منشور التعاون والمهارات التي تبحث عنها.",
      },
      {
        number: 2,
        title: "تواصل مباشرة وابدأ في كسب المال",
        desc: "تواصل مع شريكك مباشرة عبر واتساب أو وسائل التواصل المتاحة، وابدأ العمل المشترك لتحقيق الأرباح.",
      },
    ],
  },
  "tr-TR": {
    heading: "Nasıl Katılınır",
    steps: [
      {
        number: 1,
        title: "İş Birliği Arayın veya İlan Oluşturun",
        desc: "Akıllı arama ile uygun ortaklar bulun veya aradığınız iş birliği ve uzmanlıkları belirten ilanınızı oluşturun.",
      },
      {
        number: 2,
        title: "Bağlantı Kurun & Kazanmaya Başlayın",
        desc: "WhatsApp veya mevcut iletişim kanalları üzerinden doğrudan iletişime geçin ve birlikte kazanmaya başlayın.",
      },
    ],
  },
  "ko-KR": {
    heading: "참여 방법",
    steps: [
      {
        number: 1,
        title: "협업 검색 또는 모집 등록",
        desc: "스마트 검색을 통해 적합한 파트너를 찾거나 원하는 협업 및 기술에 대한 모집 글을 작성하세요.",
      },
      {
        number: 2,
        title: "직접 연결 & 수익 창출 시작",
        desc: "WhatsApp이나 등록된 연락처로 파트너와 직접 소통하고 함께 프로젝트를 시작해 수익을 창출하세요.",
      },
    ],
  },
  "pt-PT": {
    heading: "Como Participar",
    steps: [
      {
        number: 1,
        title: "Pesquisar ou Criar Colaboração",
        desc: "Encontre o parceiro ideal através da pesquisa inteligente ou crie a sua própria publicação de colaboração.",
      },
      {
        number: 2,
        title: "Conectar e Começar a Ganhar",
        desc: "Contacte o parceiro diretamente pelo WhatsApp ou contactos disponíveis e comecem a faturar juntos.",
      },
    ],
  },
};

export const getJoinSteps = (locale: Locale): JoinSectionData => {
  return JOIN_STEPS_DATA[locale] || JOIN_STEPS_DATA["id-ID"];
};
