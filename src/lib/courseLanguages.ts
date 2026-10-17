import { Locale } from "./translations";

export interface CourseLanguage {
  code: string;
  locale: Locale;
  currency: string;
  originalPrice: string;
  content: {
    ui: {
      index: {
        backToHome: string;
        welcomePremium: string;
        welcomeFree: string;
        lockedTag: string;
        accessTitle: string;
        accessSubtitle: string;
        promoPrice: string;
        emailPlaceholder: string;
        passwordPlaceholder: string;
        payButton: string;
        emptyCategory: string;
      };
      courseDetail: {
        notFound: string;
        back: string;
        modulesTab: string;
        descTab: string;
        descTitle: string;
      };
      common: {
        naiklvl: string;
      };
      bottomNav: {
        home: string;
        myCourses: string;
        account: string;
      };
      myCourses: {
        title: string;
        subtitle: string;
        empty: string;
        explore: string;
      };
      profile: {
        title: string;
        user: string;
        premium: string;
        free: string;
        logout: string;
      };
      categories: {
        finance: string;
        business: string;
        money: string;
        mindset: string;
        health: string;
        mental_health: string;
        nutrition: string;
        tech: string;
        data: string;
        design: string;
        allCategories: string;
      };
    };
  };
}

export const LOCALE_TO_CODE: Record<Locale, string> = {
  "id-ID": "id",
  "en-US": "en",
  "es-ES": "es",
  "fr-FR": "fr",
  "ja-JP": "ja",
  "de-DE": "de",
  "zh-CN": "zh",
  "ru-RU": "ru",
  "ar-SA": "ar",
  "tr-TR": "tr",
  "ko-KR": "ko",
  "pt-PT": "pt",
};

export const COURSE_LANGUAGES: CourseLanguage[] = [
  {
    code: "id",
    locale: "id-ID",
    currency: "Rp",
    originalPrice: "999.000",
    content: {
      ui: {
        index: {
          backToHome: "Kembali ke Beranda",
          welcomePremium: "Selamat datang! Nikmati akses penuh ke semua kelas.",
          welcomeFree: "Buka kunci semua kelas premium PartnerFind.",
          lockedTag: "Konten Terkunci",
          accessTitle: "Akses Penuh",
          accessSubtitle: "Buka semua kelas sekarang",
          promoPrice: "Rp 199.000",
          emailPlaceholder: "Masukkan email kamu",
          passwordPlaceholder: "Buat password",
          payButton: "Mulai Belajar Sekarang",
          emptyCategory: "Belum ada kelas di kategori ini",
        },
        courseDetail: {
          notFound: "Kelas tidak ditemukan",
          back: "Kembali",
          modulesTab: "Modul",
          descTab: "Deskripsi",
          descTitle: "Tentang Kelas",
        },
        common: {
          naiklvl: "PARTNERFIND",
        },
        bottomNav: {
          home: "Beranda",
          myCourses: "Kelas Saya",
          account: "Akun",
        },
        myCourses: {
          title: "Kelas Saya",
          subtitle: "Kelas yang sudah kamu simpan",
          empty: "Belum ada kelas yang disimpan.",
          explore: "Jelajahi Kelas →",
        },
        profile: {
          title: "Akun",
          user: "PartnerFind User",
          premium: "Premium",
          free: "Free",
          logout: "Keluar",
        },
        categories: {
          finance: "Keuangan & Investasi",
          business: "Bisnis & Kewirausahaan",
          money: "Uang & Kekayaan",
          mindset: "Pola Pikir & Kebiasaan",
          health: "Kesehatan & Kebugaran",
                              tech: "Teknologi & Koding",
                                                                      mental_health: "Mental Health", nutrition: "Nutrition", data: "Data", design: "Design", allCategories: "Semua Kategori",
        },
      },
    },
  },
  {
    code: "en",
    locale: "en-US",
    currency: "$",
    originalPrice: "999",
    content: {
      ui: {
        index: {
          backToHome: "Back to Home",
          welcomePremium: "Welcome! Enjoy full access to all classes.",
          welcomeFree: "Unlock all premium PartnerFind classes.",
          lockedTag: "Locked Content",
          accessTitle: "Full Access",
          accessSubtitle: "Unlock all classes now",
          promoPrice: "$13",
          emailPlaceholder: "Enter your email",
          passwordPlaceholder: "Create a password",
          payButton: "Start Learning Now",
          emptyCategory: "No classes in this category yet",
        },
        courseDetail: {
          notFound: "Course not found",
          back: "Back",
          modulesTab: "Modules",
          descTab: "Description",
          descTitle: "About Course",
        },
        common: {
          naiklvl: "PARTNERFIND",
        },
        bottomNav: {
          home: "Home",
          myCourses: "My Courses",
          account: "Account",
        },
        myCourses: {
          title: "My Courses",
          subtitle: "Classes you've saved",
          empty: "No saved classes yet.",
          explore: "Explore Classes →",
        },
        profile: {
          title: "Account",
          user: "PartnerFind User",
          premium: "Premium",
          free: "Free",
          logout: "Logout",
        },
        categories: {
          finance: "Finance & Investment",
          business: "Business & Entrepreneurship",
          money: "Money & Wealth",
          mindset: "Mindset & Habits",
          health: "Health & Fitness",
                              tech: "Technology & Coding",
                                                                      mental_health: "Mental Health", nutrition: "Nutrition", data: "Data", design: "Design", allCategories: "All Categories",
        },
      },
    },
  },
  {
    code: "es",
    locale: "es-ES",
    currency: "€",
    originalPrice: "999",
    content: {
      ui: {
        index: {
          backToHome: "Volver al Inicio",
          welcomePremium: "¡Bienvenido! Disfruta de acceso completo a todas las clases.",
          welcomeFree: "Desbloquea todas las clases premium de PartnerFind.",
          lockedTag: "Contenido Bloqueado",
          accessTitle: "Acceso Completo",
          accessSubtitle: "Desbloquea todas las clases ahora",
          promoPrice: "€12",
          emailPlaceholder: "Ingresa tu correo",
          passwordPlaceholder: "Crea una contraseña",
          payButton: "Comenzar a Aprender",
          emptyCategory: "Aún no hay clases en esta categoría",
        },
        courseDetail: {
          notFound: "Curso no encontrado",
          back: "Volver",
          modulesTab: "Módulos",
          descTab: "Descripción",
          descTitle: "Acerca del Curso",
        },
        common: {
          naiklvl: "PARTNERFIND",
        },
        bottomNav: {
          home: "Inicio",
          myCourses: "Mis Cursos",
          account: "Cuenta",
        },
        myCourses: {
          title: "Mis Cursos",
          subtitle: "Clases que has guardado",
          empty: "Aún no hay clases guardadas.",
          explore: "Explorar Clases →",
        },
        profile: {
          title: "Cuenta",
          user: "Usuario PartnerFind",
          premium: "Premium",
          free: "Gratis",
          logout: "Cerrar Sesión",
        },
        categories: {
          finance: "Finanzas e Inversión",
          business: "Negocios y Emprendimiento",
          money: "Dinero y Riqueza",
          mindset: "Mentalidad y Hábitos",
          health: "Salud y Fitness",
                              tech: "Tecnología y Programación",
                                                                      mental_health: "Mental Health", nutrition: "Nutrition", data: "Data", design: "Design", allCategories: "Todas las Categorías",
        },
      },
    },
  },
  {
    code: "fr",
    locale: "fr-FR",
    currency: "€",
    originalPrice: "999",
    content: {
      ui: {
        index: {
          backToHome: "Retour à l'accueil",
          welcomePremium: "Bienvenue ! Profitez d'un accès complet à tous les cours.",
          welcomeFree: "Débloquez tous les cours premium PartnerFind.",
          lockedTag: "Contenu Verrouillé",
          accessTitle: "Accès Complet",
          accessSubtitle: "Débloquez tous les cours maintenant",
          promoPrice: "€12",
          emailPlaceholder: "Entrez votre email",
          passwordPlaceholder: "Créez un mot de passe",
          payButton: "Commencer à Apprendre",
          emptyCategory: "Aucun cours dans cette catégorie",
        },
        courseDetail: {
          notFound: "Cours non trouvé",
          back: "Retour",
          modulesTab: "Modules",
          descTab: "Description",
          descTitle: "À propos du cours",
        },
        common: {
          naiklvl: "PARTNERFIND",
        },
        bottomNav: {
          home: "Accueil",
          myCourses: "Mes Cours",
          account: "Compte",
        },
        myCourses: {
          title: "Mes Cours",
          subtitle: "Cours que vous avez enregistrés",
          empty: "Aucun cours enregistré.",
          explore: "Explorer les Cours →",
        },
        profile: {
          title: "Compte",
          user: "Utilisateur PartnerFind",
          premium: "Premium",
          free: "Gratuit",
          logout: "Déconnexion",
        },
        categories: {
          finance: "Finance & Investissement",
          business: "Affaires & Entrepreneuriat",
          money: "Argent & Richesse",
          mindset: "Mentalité & Habitudes",
          health: "Santé et Forme",
          tech: "Technologie et Code",
                                                  mental_health: "Mental Health", nutrition: "Nutrition", data: "Data", design: "Design", allCategories: "Toutes les Catégories",
        },
      },
    },
  },
  {
    code: "de",
    locale: "de-DE",
    currency: "€",
    originalPrice: "999",
    content: {
      ui: {
        index: {
          backToHome: "Zurück zur Startseite",
          welcomePremium: "Willkommen! Genieße vollen Zugriff auf alle Kurse.",
          welcomeFree: "Schalte alle Premium-Kurse von PartnerFind frei.",
          lockedTag: "Gesperrter Inhalt",
          accessTitle: "Voller Zugriff",
          accessSubtitle: "Schalte alle Kurse jetzt frei",
          promoPrice: "€12",
          emailPlaceholder: "E-Mail eingeben",
          passwordPlaceholder: "Passwort erstellen",
          payButton: "Jetzt Lernen Beginnen",
          emptyCategory: "Noch keine Kurse in dieser Kategorie",
        },
        courseDetail: {
          notFound: "Kurs nicht gefunden",
          back: "Zurück",
          modulesTab: "Module",
          descTab: "Beschreibung",
          descTitle: "Über den Kurs",
        },
        common: {
          naiklvl: "PARTNERFIND",
        },
        bottomNav: {
          home: "Startseite",
          myCourses: "Meine Kurse",
          account: "Konto",
        },
        myCourses: {
          title: "Meine Kurse",
          subtitle: "Gespeicherte Kurse",
          empty: "Noch keine gespeicherten Kurse.",
          explore: "Kurse Entdecken →",
        },
        profile: {
          title: "Konto",
          user: "PartnerFind Benutzer",
          premium: "Premium",
          free: "Kostenlos",
          logout: "Abmelden",
        },
        categories: {
          finance: "Finanzen & Investition",
          business: "Business & Unternehmertum",
          money: "Geld & Wohlstand",
          mindset: "Mindset & Gewohnheiten",
          health: "Gesundheit & Fitness",
          tech: "Technologie & Programmierung",
                                                  mental_health: "Mental Health", nutrition: "Nutrition", data: "Data", design: "Design", allCategories: "Alle Kategorien",
        },
      },
    },
  },
  {
    code: "ja",
    locale: "ja-JP",
    currency: "¥",
    originalPrice: "99,999",
    content: {
      ui: {
        index: {
          backToHome: "ホームに戻る",
          welcomePremium: "ようこそ！すべてのクラスにフルアクセスできます。",
          welcomeFree: "PartnerFindのプレミアムクラスをすべてアンロック。",
          lockedTag: "ロック中のコンテンツ",
          accessTitle: "フルアクセス",
          accessSubtitle: "今すぐすべてのクラスをアンロック",
          promoPrice: "¥2,000",
          emailPlaceholder: "メールアドレスを入力",
          passwordPlaceholder: "パスワードを作成",
          payButton: "今すぐ学習を開始",
          emptyCategory: "このカテゴリにはまだクラスがありません",
        },
        courseDetail: {
          notFound: "コースが見つかりません",
          back: "戻る",
          modulesTab: "モジュール",
          descTab: "詳細",
          descTitle: "コースについて",
        },
        common: {
          naiklvl: "PARTNERFIND",
        },
        bottomNav: {
          home: "ホーム",
          myCourses: "マイコース",
          account: "アカウント",
        },
        myCourses: {
          title: "マイコース",
          subtitle: "保存したクラス",
          empty: "まだ保存したクラスはありません。",
          explore: "クラスを探す →",
        },
        profile: {
          title: "アカウント",
          user: "PartnerFindユーザー",
          premium: "プレミアム",
          free: "無料",
          logout: "ログアウト",
        },
        categories: {
          finance: "金融・投資",
          business: "ビジネス・起業",
          money: "お金・資産",
          mindset: "マインドセット・習慣",
          health: "健康・フィットネス",
          tech: "テクノロジー・コーディング",
                                                  mental_health: "Mental Health", nutrition: "Nutrition", data: "Data", design: "Design", allCategories: "すべてのカテゴリ",
        },
      },
    },
  },
  {
    code: "zh",
    locale: "zh-CN",
    currency: "¥",
    originalPrice: "999",
    content: {
      ui: {
        index: {
          backToHome: "返回首页",
          welcomePremium: "欢迎！享受所有课程的完整访问权限。",
          welcomeFree: "解锁所有PartnerFind高级课程。",
          lockedTag: "锁定内容",
          accessTitle: "完整访问",
          accessSubtitle: "立即解锁所有课程",
          promoPrice: "¥99",
          emailPlaceholder: "输入您的邮箱",
          passwordPlaceholder: "创建密码",
          payButton: "立即开始学习",
          emptyCategory: "该分类下暂无课程",
        },
        courseDetail: {
          notFound: "未找到课程",
          back: "返回",
          modulesTab: "模块",
          descTab: "描述",
          descTitle: "关于课程",
        },
        common: {
          naiklvl: "PARTNERFIND",
        },
        bottomNav: {
          home: "首页",
          myCourses: "我的课程",
          account: "账户",
        },
        myCourses: {
          title: "我的课程",
          subtitle: "你已保存的课程",
          empty: "还没有保存的课程。",
          explore: "浏览课程 →",
        },
        profile: {
          title: "账户",
          user: "PartnerFind用户",
          premium: "高级",
          free: "免费",
          logout: "退出登录",
        },
        categories: {
          finance: "金融与投资",
          business: "商业与创业",
          money: "资金与财富",
          mindset: "心态与习惯",
          health: "健康与健身",
          tech: "技术与编程",
                                                  mental_health: "Mental Health", nutrition: "Nutrition", data: "Data", design: "Design", allCategories: "所有分类",
        },
      },
    },
  },
  {
    code: "ru",
    locale: "ru-RU",
    currency: "₽",
    originalPrice: "99 999",
    content: {
      ui: {
        index: {
          backToHome: "Назад на главную",
          welcomePremium: "Добро пожаловать! Наслаждайтесь полным доступом ко всем классам.",
          welcomeFree: "Разблокируйте все премиум-классы PartnerFind.",
          lockedTag: "Заблокированный контент",
          accessTitle: "Полный доступ",
          accessSubtitle: "Разблокируйте все классы сейчас",
          promoPrice: "₽1 500",
          emailPlaceholder: "Введите email",
          passwordPlaceholder: "Придумайте пароль",
          payButton: "Начать обучение",
          emptyCategory: "В этой категории пока нет классов",
        },
        courseDetail: {
          notFound: "Курс не найден",
          back: "Назад",
          modulesTab: "Модули",
          descTab: "Описание",
          descTitle: "О курсе",
        },
        common: {
          naiklvl: "PARTNERFIND",
        },
        bottomNav: {
          home: "Главная",
          myCourses: "Мои курсы",
          account: "Аккаунт",
        },
        myCourses: {
          title: "Мои курсы",
          subtitle: "Сохранённые классы",
          empty: "Пока нет сохранённых классов.",
          explore: "Исследовать классы →",
        },
        profile: {
          title: "Аккаунт",
          user: "Пользователь PartnerFind",
          premium: "Премиум",
          free: "Бесплатно",
          logout: "Выйти",
        },
        categories: {
          finance: "Финансы и инвестиции",
          business: "Бизнес и предпринимательство",
          money: "Деньги и капитал",
          mindset: "Мышление и привычки",
          health: "Здоровье и фитнес",
                              tech: "Технологии и код",
                                                                      mental_health: "Mental Health", nutrition: "Nutrition", data: "Data", design: "Design", allCategories: "Все категории",
        },
      },
    },
  },
  {
    code: "ar",
    locale: "ar-SA",
    currency: "ر.س",
    originalPrice: "999",
    content: {
      ui: {
        index: {
          backToHome: "العودة إلى الرئيسية",
          welcomePremium: "مرحباً! استمتع بإمكانية الوصول الكامل إلى جميع الفصول.",
          welcomeFree: "افتح جميع فصول PartnerFind المتميزة.",
          lockedTag: "محتوى مقفل",
          accessTitle: "وصول كامل",
          accessSubtitle: "افتح جميع الفصول الآن",
          promoPrice: "ر.س 50",
          emailPlaceholder: "أدخل بريدك الإلكتروني",
          passwordPlaceholder: "أنشئ كلمة مرور",
          payButton: "ابدأ التعلم الآن",
          emptyCategory: "لا توجد فصول في هذا التصنيف بعد",
        },
        courseDetail: {
          notFound: "لم يتم العثور على الدورة",
          back: "رجوع",
          modulesTab: "الوحدات",
          descTab: "الوصف",
          descTitle: "حول الدورة",
        },
        common: {
          naiklvl: "PARTNERFIND",
        },
        bottomNav: {
          home: "الرئيسية",
          myCourses: "دوراتي",
          account: "الحساب",
        },
        myCourses: {
          title: "دوراتي",
          subtitle: "الفصول التي حفظتها",
          empty: "لم يتم حفظ أي فصول بعد.",
          explore: "استكشف الفصول →",
        },
        profile: {
          title: "الحساب",
          user: "مستخدم PartnerFind",
          premium: "مميز",
          free: "مجاني",
          logout: "تسجيل الخروج",
        },
        categories: {
          finance: "المالية والاستثمار",
          business: "الأعمال والريادة",
          money: "المال والثروة",
          mindset: "العقلية والعادات",
          health: "الصحة واللياقة",
                              tech: "التكنولوجيا والبرمجة",
                                                                      mental_health: "Mental Health", nutrition: "Nutrition", data: "Data", design: "Design", allCategories: "جميع الفئات",
        },
      },
    },
  },

  {
    code: "ko",
    locale: "ko-KR",
    currency: "₩",
    originalPrice: "99000",
    content: {
      ui: {
        index: {
          backToHome: "홈으로 돌아가기",
          welcomePremium: "환영합니다! 모든 클래스의 무제한 이용 권한을 즐겨보세요.",
          welcomeFree: "모든 프리미엄 PartnerFind 클래스 잠금 해제",
          lockedTag: "잠긴 콘텐츠",
          accessTitle: "무제한 액세스",
          accessSubtitle: "지금 모든 클래스 잠금 해제",
          promoPrice: "₩19000",
          emailPlaceholder: "이메일을 입력하세요",
          passwordPlaceholder: "비밀번호 만들기",
          payButton: "지금 학습 시작하기",
          emptyCategory: "이 카테고리에는 아직 클래스가 없습니다",
        },
        courseDetail: {
          notFound: "클래스를 찾을 수 없습니다",
          back: "뒤로 가기",
          modulesTab: "모듈",
          descTab: "설명",
          descTitle: "클래스 정보",
        },
        common: {
          naiklvl: "PARTNERFIND",
        },
        bottomNav: {
          home: "홈",
          myCourses: "내 클래스",
          account: "계정",
        },
        myCourses: {
          title: "내 클래스",
          subtitle: "저장한 클래스 목록",
          empty: "아직 저장한 클래스가 없습니다.",
          explore: "클래스 탐색하기 →",
        },
        profile: {
          title: "계정",
          user: "PartnerFind 사용자",
          premium: "프리미엄",
          free: "무료",
          logout: "로그아웃",
        },
        categories: {
          finance: "금융 및 투자",
          business: "비즈니스 및 창업",
          money: "돈 및 자산 관리",
          mindset: "마인드셋 및 습관",
          health: "건강 및 피트니스",
                              tech: "기술 및 코딩",
                                                                      mental_health: "Mental Health", nutrition: "Nutrition", data: "Data", design: "Design", allCategories: "모든 카테고리",
        },
      },
    },
  },
  {
    code: "pt",
    locale: "pt-PT",
    currency: "€",
    originalPrice: "99",
    content: {
      ui: {
        index: {
          backToHome: "Voltar ao Início",
          welcomePremium: "Bem-vindo! Desfrute de acesso total a todas as aulas.",
          welcomeFree: "Desbloqueie todas as aulas premium PartnerFind.",
          lockedTag: "Conteúdo Bloqueado",
          accessTitle: "Acesso Total",
          accessSubtitle: "Desbloqueie todas as aulas agora",
          promoPrice: "9,99 €",
          emailPlaceholder: "Introduza o seu email",
          passwordPlaceholder: "Crie uma palavra-passe",
          payButton: "Começar a Aprender Agora",
          emptyCategory: "Ainda não existem aulas nesta categoria",
        },
        courseDetail: {
          notFound: "Aula não encontrada",
          back: "Voltar",
          modulesTab: "Módulos",
          descTab: "Descrição",
          descTitle: "Sobre a Aula",
        },
        common: {
          naiklvl: "PARTNERFIND",
        },
        bottomNav: {
          home: "Início",
          myCourses: "Os Meus Cursos",
          account: "Conta",
        },
        myCourses: {
          title: "Os Meus Cursos",
          subtitle: "Lista das suas aulas guardadas",
          empty: "Ainda não guardou nenhuma aula.",
          explore: "Explorar aulas →",
        },
        profile: {
          title: "Conta",
          user: "Utilizador PartnerFind",
          premium: "Premium",
          free: "Gratuito",
          logout: "Sair",
        },
        categories: {
          finance: "Finanças & Investimento",
          business: "Negócios & Empreendedorismo",
          money: "Dinheiro & Riqueza",
          mindset: "Mentalidade & Hábitos",
          health: "Saúde & Fitness",
                              tech: "Tecnologia & Programação",
                                                                      mental_health: "Mental Health", nutrition: "Nutrition", data: "Data", design: "Design", allCategories: "Todas as Categorias",
        },
      },
    },
  }
];
