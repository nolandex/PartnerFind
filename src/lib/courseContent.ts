export interface LocalizedCourseContent {
  title: string;
  description: string;
  moduleTitles: Record<string, string>;
}

export const COURSE_CONTENT: Record<string, Record<string, LocalizedCourseContent>> = {
  id: {
    "saham-dasar": {
      title: "Saham & Pasar Modal Dasar",
      description: "Mulai investasi saham dengan benar. Pelajari cara memilih saham berfundamental kuat, memahami rasio keuangan, membaca grafik harga, dan menyusun portofolio investasi yang kokoh.",
      moduleTitles: {
        m1: "Apa itu Saham?",
        m2: "Analisis Fundamental",
        m3: "Analisis Teknikal",
        m4: "Strategi Portofolio",
      },
    },
    "kripto-dasar": {
      title: "Kripto & Web3 Dasar",
      description: "Pahami dunia blockchain, cryptocurrency, smart contract, pengoperasian dompet digital, dan potensi masa depan keuangan terdesentralisasi (DeFi) secara menyeluruh.",
      moduleTitles: {
        m1: "Pengenalan Blockchain",
        m2: "Cara Kerja Bitcoin & Ethereum",
        m3: "Dompet Kripto & Keamanan",
        m4: "Masa Depan Web3",
      },
    },
    "digital-marketing": {
      title: "Digital Marketing Modern",
      description: "Kuasai pemasaran digital menggunakan media sosial, optimasi mesin pencari (SEO), periklanan berbayar, dan strategi copywriting untuk mendongkrak penjualan bisnis Anda.",
      moduleTitles: {
        m1: "Dasar Pemasaran Digital",
        m2: "Search Engine Optimization (SEO)",
        m3: "Iklan Berbayar (FB, Google Ads)",
        m4: "Copywriting & Content Strategy",
      },
    },
    "ui-ux-design": {
      title: "Dasar UI/UX Design",
      description: "Pelajari prinsip dasar desain antarmuka dan pengalaman pengguna yang menarik dan fungsional.",
      moduleTitles: {
        m1: "Prinsip Dasar UI",
        m2: "Riset UX & Wireframing",
      },
    },
    "graphic-design": {
      title: "Desain Grafis Modern",
      description: "Kuasai seni visual, komposisi, tipografi, dan warna untuk menciptakan desain yang memukau.",
      moduleTitles: {
        m1: "Teori Warna & Tipografi",
        m2: "Komposisi Visual",
      },
    },
    "mental-health": {
      title: "Kesehatan Mental & Mengelola Stres",
      description: "Pelajari cara mengelola stres, meditasi, dan menjaga keseimbangan kehidupan kerja untuk kebahagiaan.",
      moduleTitles: {
        m1: "Manajemen Stres",
        m2: "Dasar Meditasi",
      },
    },
    "health-fitness": {
      title: "Kesehatan & Kebugaran Dasar",
      description: "Pelajari prinsip dasar kebugaran, program latihan yang efektif, dan cara menjaga kesehatan tubuh jangka panjang.",
      moduleTitles: {
        m1: "Prinsip Dasar Kebugaran",
        m2: "Menyusun Program Latihan",
      },
    },
    "nutrition-diet": {
      title: "Nutrisi & Pola Makan Sehat",
      description: "Pahami cara kerja makronutrisi dan mikronutrisi, serta bagaimana mengatur pola makan untuk energi maksimal dan berat badan ideal.",
      moduleTitles: {
        m1: "Dasar Nutrisi & Kalori",
        m2: "Diet Sehat yang Berkelanjutan",
      },
    },
    "web-dev": {
      title: "Web Development Modern",
      description: "Kuasai dasar pembuatan website dengan HTML, CSS, Javascript, dan mulai perjalanan karir sebagai web developer profesional.",
      moduleTitles: {
        m1: "Dasar HTML & CSS",
        m2: "Pengenalan Javascript",
      },
    },
    "data-science": {
      title: "Pengantar Data Science",
      description: "Pelajari cara menganalisis data, memahami statistik dasar, dan menggunakan Python untuk memecahkan masalah berbasis data.",
      moduleTitles: {
        m1: "Dasar Analisis Data",
        m2: "Python untuk Data Science",
      },
    },
    "ai-tools": {
      title: "AI Tools untuk Produktivitas",
      description: "Manfaatkan kekuatan AI seperti ChatGPT dan Midjourney untuk mempercepat alur kerja harian.",
      moduleTitles: {
        m1: "Prompt Engineering Dasar",
        m2: "AI untuk Konten",
      },
    },
    "laporan-keuangan": {
      title: "Analisis Laporan Keuangan",
      description: "Cara membaca neraca, laporan laba rugi, dan laporan arus kas perusahaan untuk menilai kesehatan finansial bisnis atau instrumen investasi sebelum mengambil keputusan.",
      moduleTitles: {
        m1: "Tiga Laporan Keuangan Utama",
        m2: "Analisis Rasio Keuangan",
        m3: "Mendeteksi Rekayasa Keuangan",
      },
    },
    "startup-bisnis": {
      title: "Strategi Startup & Bisnis",
      description: "Bangun bisnismu dari ide hingga eksekusi. Pelajari riset pasar, model bisnis, skema pendanaan awal, serta strategi scaling up bisnis.",
      moduleTitles: {
        m1: "Validasi Ide Bisnis",
        m2: "Lean Business Model",
        m3: "Mendapatkan Pendanaan Pertama",
        m4: "Strategi Scaling Up",
      },
    },
    "ecommerce-dasar": {
      title: "Kuasai E-Commerce & Dropshipping",
      description: "Bangun toko online-mu sendiri, temukan produk pemenang (winning products), pelajari manajemen supply chain, dan operasikan bisnis e-commerce yang menguntungkan tanpa harus stok barang.",
      moduleTitles: {
        m1: "Model Bisnis E-Commerce",
        m2: "Riset Produk Terlaris",
        m3: "Membangun Toko Online Shopify",
      },
    },
    "personal-finance": {
      title: "Manajemen Uang Pribadi",
      description: "Kuasai pengelolaan arus kas pribadi, metode menabung efektif, alokasi anggaran bulanan dengan sistematis, serta langkah penting persiapan dana darurat.",
      moduleTitles: {
        m1: "Prinsip Pengelolaan Cashflow",
        m2: "Metode Budgeting 50/30/20",
        m3: "Dana Darurat & Proteksi",
        m4: "Menghindari Utang Konsumtif",
      },
    },
    "passive-income": {
      title: "Strategi Pasif Income & Dividen",
      description: "Cara membangun portofolio investasi yang menghasilkan arus kas pasif secara konsisten dari dividen saham, reksa dana indeks, atau aset digital lainnya secara aman.",
      moduleTitles: {
        m1: "Mengenal Konsep Pasif Income",
        m2: "Investasi Saham Dividen",
        m3: "Pasif Income dari Aset Digital",
        m4: "Pajak & Pengelolaan Portofolio",
      },
    },
    "growth-mindset": {
      title: "Growth Mindset & Kebiasaan Sukses",
      description: "Kembangkan mental pembelajar, singkirkan pembatas mental, dan bentuk kebiasaan harian (atomic habits) untuk mencapai puncak potensi diri Anda.",
      moduleTitles: {
        m1: "Prinsip Growth vs Fixed Mindset",
        m2: "Mengatasi Rasa Takut Gagal",
        m3: "Membangun Kebiasaan Mikro",
        m4: "Disiplin & Konsistensi Diri",
      },
    },
    "time-management": {
      title: "Manajemen Waktu & Produktivitas",
      description: "Kuasai teknik Pomodoro, kuadran prioritas Eisenhower, serta cara mengalahkan prokrastinasi untuk bekerja lebih pintar dan efisien setiap hari.",
      moduleTitles: {
        m1: "Prinsip Manajemen Waktu",
        m2: "Kuadran Prioritas Eisenhower",
        m3: "Mengalahkan Prokrastinasi",
      },
    },
  },
  en: {
    "saham-dasar": {
      title: "Stock Market & Shares Basics",
      description: "Start investing in stocks correctly. Learn how to choose stocks with strong fundamentals, understand financial ratios, read price charts, and build a sturdy investment portfolio.",
      moduleTitles: {
        m1: "What are Stocks?",
        m2: "Fundamental Analysis",
        m3: "Technical Analysis",
        m4: "Portfolio Strategies",
      },
    },
    "kripto-dasar": {
      title: "Crypto & Web3 Basics",
      description: "Understand the world of blockchain, cryptocurrency, smart contracts, digital wallet operations, and the future potential of decentralized finance (DeFi) in detail.",
      moduleTitles: {
        m1: "Introduction to Blockchain",
        m2: "How Bitcoin & Ethereum Work",
        m3: "Crypto Wallets & Security",
        m4: "The Future of Web3",
      },
    },
    "digital-marketing": {
      title: "Modern Digital Marketing",
      description: "Master digital marketing using social media, search engine optimization (SEO), paid advertising, and high-converting copywriting to boost your business sales.",
      moduleTitles: {
        m1: "Digital Marketing Foundations",
        m2: "Search Engine Optimization (SEO)",
        m3: "Paid Ads (FB, Google Ads)",
        m4: "Copywriting & Content Strategy",
      },
    },
    "ui-ux-design": {
      title: "UI/UX Design Basics",
      description: "Learn the core principles of user interface and user experience design for modern applications.",
      moduleTitles: {
        m1: "UI Fundamentals",
        m2: "UX Research & Wireframing",
      },
    },
    "graphic-design": {
      title: "Modern Graphic Design",
      description: "Master visual art, composition, typography, and color theory to create stunning designs.",
      moduleTitles: {
        m1: "Color Theory & Typography",
        m2: "Visual Composition",
      },
    },
    "mental-health": {
      title: "Mental Health & Stress Management",
      description: "Learn how to manage stress, practice meditation, and maintain a healthy work-life balance for lasting happiness.",
      moduleTitles: {
        m1: "Stress Management",
        m2: "Meditation Basics",
      },
    },
    "health-fitness": {
      title: "Fitness & Health Basics",
      description: "Learn the core principles of physical fitness, effective workout routines, and maintaining long-term physical health.",
      moduleTitles: {
        m1: "Fitness Fundamentals",
        m2: "Building a Workout Routine",
      },
    },
    "nutrition-diet": {
      title: "Nutrition & Healthy Diet",
      description: "Understand macronutrients, micronutrients, and how to structure your daily diet for maximum energy and weight management.",
      moduleTitles: {
        m1: "Nutrition Fundamentals",
        m2: "Diet Planning Strategies",
      },
    },
    "web-dev": {
      title: "Modern Web Development",
      description: "Master the basics of website creation with HTML, CSS, Javascript, and start your career as a professional web developer.",
      moduleTitles: {
        m1: "HTML & CSS Basics",
        m2: "Introduction to Javascript",
      },
    },
    "data-science": {
      title: "Introduction to Data Science",
      description: "Learn how to analyze data, understand basic statistics, and use Python to solve data-driven problems.",
      moduleTitles: {
        m1: "Data Analysis Basics",
        m2: "Python for Data Science",
      },
    },
    "ai-tools": {
      title: "AI Tools for Productivity",
      description: "Leverage the power of AI like ChatGPT and Midjourney to accelerate your daily workflow.",
      moduleTitles: {
        m1: "Basic Prompt Engineering",
        m2: "AI for Content Creation",
      },
    },
    "laporan-keuangan": {
      title: "Financial Statement Analysis",
      description: "How to read balance sheets, income statements, and cash flows to evaluate the financial health of businesses or investments before making an active decision.",
      moduleTitles: {
        m1: "Three Key Financial Statements",
        m2: "Financial Ratio Analysis",
        m3: "Detecting Financial Red Flags",
      },
    },
    "startup-bisnis": {
      title: "Startup & Business Strategy",
      description: "Build your business from idea to execution. Learn market research, business models, initial funding schemes, and modern business scaling strategies.",
      moduleTitles: {
        m1: "Validating Business Ideas",
        m2: "Lean Business Model Canvas",
        m3: "Securing Initial Funding",
        m4: "Scaling Up Strategies",
      },
    },
    "ecommerce-dasar": {
      title: "E-Commerce & Dropshipping Mastery",
      description: "Build your own online store, find winning products, master supply chain management, and operate a profitable e-commerce business without holding inventory.",
      moduleTitles: {
        m1: "E-Commerce Business Models",
        m2: "Winning Product Research",
        m3: "Building a Shopify Store",
      },
    },
    "personal-finance": {
      title: "Personal Finance & Budgeting",
      description: "Master personal cashflow management, effective saving methods, systematic monthly budget allocation, and essential steps to establish your emergency fund.",
      moduleTitles: {
        m1: "Cashflow Management Principles",
        m2: "The 50/30/20 Budgeting Rule",
        m3: "Emergency Funds & Protection",
        m4: "Avoiding Bad Consumer Debt",
      },
    },
    "passive-income": {
      title: "Passive Income & Dividend Strategies",
      description: "How to build an investment portfolio that generates consistent passive cashflow from stock dividends, index funds, or digital assets safely.",
      moduleTitles: {
        m1: "The Concept of Passive Income",
        m2: "Investing in Dividend Stocks",
        m3: "Passive Cashflow from Digital Assets",
        m4: "Taxes & Portfolio Preservation",
      },
    },
    "growth-mindset": {
      title: "Growth Mindset & Success Habits",
      description: "Develop a learner's mindset, overcome limiting beliefs, and build daily micro-habits (atomic habits) to achieve your full potential and success.",
      moduleTitles: {
        m1: "Growth vs Fixed Mindset",
        m2: "Overcoming Fear of Failure",
        m3: "Building Atomic Habits",
        m4: "Self-Discipline & Consistency",
      },
    },
    "time-management": {
      title: "Time Management & Productivity",
      description: "Master the Pomodoro technique, the Eisenhower priority matrix, and beat procrastination to work smarter and more efficiently every single day.",
      moduleTitles: {
        m1: "Time Management Core Principles",
        m2: "The Eisenhower Priority Matrix",
        m3: "Overcoming Procrastination",
      },
    },
  },
  es: {
    "saham-dasar": {
      title: "Bolsa de Valores y Acciones",
      description: "Comience a invertir en acciones correctamente. Aprenda a elegir acciones con fundamentos s\u00f3lidos, comprender ratios financieros, leer gr\u00e1ficos de precios y estructurar una cartera de inversi\u00f3n s\u00f3lida.",
      moduleTitles: {
        m1: "\u00bfQu\u00e9 son las acciones?",
        m2: "An\u00e1lisis Fundamental",
        m3: "An\u00e1lisis T\u00e9cnico",
        m4: "Estrategias de Portafolio",
      },
    },
    "kripto-dasar": {
      title: "Cripto y Web3 para Principiantes",
      description: "Entienda en detalle el mundo de la tecnolog\u00eda blockchain, criptomonedas, contratos inteligentes, gesti\u00f3n de monederos virtuales y el potencial de las finanzas descentralizadas (DeFi).",
      moduleTitles: {
        m1: "Introducci\u00f3n a Blockchain",
        m2: "C\u00f3mo funcionan Bitcoin y Ethereum",
        m3: "Monederos y Seguridad",
        m4: "El futuro de Web3",
      },
    },
    "digital-marketing": {
      title: "Marketing Digital Moderno",
      description: "Domine el marketing digital utilizando redes sociales, optimizaci\u00f3n SEO, publicidad paga en Facebook y Google, y copywriting persuasivo para impulsar las ventas.",
      moduleTitles: {
        m1: "Fundamentos de Marketing Digital",
        m2: "Optimizaci\u00f3n SEO",
        m3: "Publicidad Paga (FB, Google Ads)",
        m4: "Copywriting y Estrategia de Contenidos",
      },
    },
    "ui-ux-design": {
      title: "Fundamentos de Dise\u00f1o UI/UX",
      description: "Aprenda los principios b\u00e1sicos del dise\u00f1o de interfaces y experiencias de usuario.",
      moduleTitles: {
        m1: "Fundamentos de UI",
        m2: "Investigaci\u00f3n UX y Wireframing",
      },
    },
    "graphic-design": {
      title: "Dise\u00f1o Gr\u00e1fico Moderno",
      description: "Domine el arte visual, composici\u00f3n, tipograf\u00eda y color para crear dise\u00f1os incre\u00edbles.",
      moduleTitles: {
        m1: "Teor\u00eda del Color y Tipograf\u00eda",
        m2: "Composici\u00f3n Visual",
      },
    },
    "mental-health": {
      title: "Salud Mental y Manejo del Estr\u00e9s",
      description: "Aprenda a manejar el estr\u00e9s, practicar la meditaci\u00f3n y mantener un equilibrio saludable.",
      moduleTitles: {
        m1: "Manejo del Estr\u00e9s",
        m2: "Conceptos B\u00e1sicos de Meditaci\u00f3n",
      },
    },
    "health-fitness": {
      title: "Conceptos B\u00e1sicos de Salud y Fitness",
      description: "Aprenda los principios b\u00e1sicos de fitness y rutinas de ejercicio efectivas.",
      moduleTitles: {
        m1: "Fundamentos de Fitness",
        m2: "Rutinas de Ejercicio",
      },
    },
    "nutrition-diet": {
      title: "Nutrici\u00f3n y Dieta Saludable",
      description: "Entienda los nutrientes y c\u00f3mo estructurar su dieta para obtener la m\u00e1xima energ\u00eda.",
      moduleTitles: {
        m1: "Fundamentos de Nutrici\u00f3n",
        m2: "Estrategias de Dieta",
      },
    },
    "web-dev": {
      title: "Desarrollo Web Moderno",
      description: "Domine los conceptos b\u00e1sicos de la creaci\u00f3n de sitios web con HTML, CSS, Javascript y comience su carrera profesional.",
      moduleTitles: {
        m1: "Conceptos B\u00e1sicos de HTML y CSS",
        m2: "Introducci\u00f3n a Javascript",
      },
    },
    "data-science": {
      title: "Introducci\u00f3n a la Ciencia de Datos",
      description: "Aprenda a analizar datos, comprender estad\u00edsticas b\u00e1sicas y usar Python para resolver problemas.",
      moduleTitles: {
        m1: "Conceptos B\u00e1sicos de An\u00e1lisis de Datos",
        m2: "Python para Ciencia de Datos",
      },
    },
    "ai-tools": {
      title: "Herramientas de IA para la Productividad",
      description: "Aproveche el poder de la IA como ChatGPT y Midjourney para acelerar su flujo de trabajo diario.",
      moduleTitles: {
        m1: "Ingenier\u00eda de Prompts B\u00e1sica",
        m2: "IA para la Creaci\u00f3n de Contenido",
      },
    },
    "laporan-keuangan": {
      title: "An\u00e1lisis de Estados Financieros",
      description: "C\u00f3mo leer balances generales, estados de resultados y flujos de efectivo para evaluar la salud financiera de empresas o proyectos antes de invertir.",
      moduleTitles: {
        m1: "Los Tres Estados Financieros Clave",
        m2: "An\u00e1lisis de Ratios Financieros",
        m3: "Detecci\u00f3n de Manipulaci\u00f3n Financiera",
      },
    },
    "startup-bisnis": {
      title: "Estrategia de Startup y Negocios",
      description: "Construya su propio negocio desde la idea inicial hasta la ejecuci\u00f3n del mercado. Aprenda investigaci\u00f3n de mercado, modelos de negocio, esquemas de financiamiento y estrategias de escala.",
      moduleTitles: {
        m1: "Validaci\u00f3n de Ideas de Negocio",
        m2: "Lean Business Model",
        m3: "C\u00f3mo Obtener Financiamiento",
        m4: "Estrategias de Escalabilidad",
      },
    },
    "ecommerce-dasar": {
      title: "E-Commerce y Dropshipping",
      description: "Cree su propia tienda en l\u00ednea, encuentre productos ganadores, domine la gesti\u00f3n de suministros y opere un negocio electr\u00f3nico altamente rentable sin inventario f\u00edsico.",
      moduleTitles: {
        m1: "Modelos de Negocio E-Commerce",
        m2: "Investigaci\u00f3n de Productos Ganadores",
        m3: "Creaci\u00f3n de Tiendas Shopify",
      },
    },
    "personal-finance": {
      title: "Finanzas Personales y Presupuesto",
      description: "Domine la gesti\u00f3n del flujo de caja personal, m\u00e9todos de ahorro eficaces, asignaci\u00f3n mensual met\u00f3dica de presupuestos y la preparaci\u00f3n de fondos de emergencia.",
      moduleTitles: {
        m1: "Principios de Gesti\u00f3n de Flujo de Caja",
        m2: "Regla de Presupuesto 50/30/20",
        m3: "Fondos de Emergencia",
        m4: "Evitar Deudas de Consumo Malas",
      },
    },
    "passive-income": {
      title: "Estrategias de Ingresos Pasivos",
      description: "Aprenda a construir una cartera de inversiones diversificada que genere un flujo de caja pasivo constante de manera segura mediante acciones de dividendos y fondos indexados.",
      moduleTitles: {
        m1: "El concepto de Ingreso Pasivo",
        m2: "Inversi\u00f3n en Acciones con Dividendos",
        m3: "Flujo de caja de activos digitales",
        m4: "Impuestos y Conservaci\u00f3n",
      },
    },
    "growth-mindset": {
      title: "Mentalidad de Crecimiento y \u00c9xito",
      description: "Desarrolle una mentalidad de aprendizaje continuo, supere creencias mentales limitantes y cree h\u00e1bitos diarios eficientes para alcanzar su m\u00e1ximo potencial.",
      moduleTitles: {
        m1: "Mentalidad de Crecimiento vs Fija",
        m2: "Superar el Miedo al Fracaso",
        m3: "Construcci\u00f3n de H\u00e1bitos At\u00f3micos",
        m4: "Autodisciplina y Consistencia",
      },
    },
    "time-management": {
      title: "Gesti\u00f3n del Tiempo y Productividad",
      description: "Domine la t\u00e9cnica Pomodoro, la matriz de prioridades de Eisenhower y elimine la procrastinaci\u00f3n para trabajar de manera m\u00e1s inteligente y eficaz.",
      moduleTitles: {
        m1: "Principios de Gesti\u00f3n del Tiempo",
        m2: "Matriz de Prioridades de Eisenhower",
        m3: "Superar la Procrastinaci\u00f3n",
      },
    },
  },
  fr: {
    "saham-dasar": {
      title: "Bourse et Actions de Base",
      description: "Commencez \u00e0 investir en bourse correctement. Apprenez \u00e0 choisir des actions aux fondamentaux solides, analyser les ratios, lire les graphiques et structurer un portefeuille r\u00e9sistant.",
      moduleTitles: {
        m1: "Qu'est-ce que les Actions?",
        m2: "Analyse Fondamentale",
        m3: "Analyse Technique",
        m4: "Strat\u00e9gies de Portefeuille",
      },
    },
    "kripto-dasar": {
      title: "Crypto & Web3 de Base",
      description: "Comprenez en d\u00e9tail l'univers de la technologie blockchain, des crypto-monnaies, des smart contracts, la gestion des portefeuilles et le potentiel de la finance d\u00e9centralis\u00e9e (DeFi).",
      moduleTitles: {
        m1: "Introduction \u00e0 la Blockchain",
        m2: "Fonctionnement de Bitcoin & Ethereum",
        m3: "Portefeuilles Crypto & S\u00e9curit\u00e9",
        m4: "L'Avenir du Web3",
      },
    },
    "digital-marketing": {
      title: "Marketing Digital Moderne",
      description: "Ma\u00eetrisez le marketing digital : r\u00e9seaux sociaux, SEO, publicit\u00e9 payante (Facebook & Google Ads) et r\u00e9daction de contenu pour booster vos ventes.",
      moduleTitles: {
        m1: "Fondations du Marketing Digital",
        m2: "Optimisation pour les Moteurs de Recherche (SEO)",
        m3: "Publicit\u00e9s Payantes (FB, Google Ads)",
        m4: "Copywriting & Strat\u00e9gie de Contenu",
      },
    },
    "ui-ux-design": {
      title: "Bases du Design UI/UX",
      description: "Apprenez les principes de base du design d'interface et d'exp\u00e9rience utilisateur.",
      moduleTitles: {
        m1: "Fondamentaux de l'UI",
        m2: "Recherche UX & Wireframing",
      },
    },
    "graphic-design": {
      title: "Design Graphique Moderne",
      description: "Ma\u00eetrisez l'art visuel, la composition, la typographie et la couleur pour cr\u00e9er de superbes designs.",
      moduleTitles: {
        m1: "Th\u00e9orie des Couleurs & Typographie",
        m2: "Composition Visuelle",
      },
    },
    "mental-health": {
      title: "Sant\u00e9 Mentale et Gestion du Stress",
      description: "Apprenez \u00e0 g\u00e9rer le stress, \u00e0 pratiquer la m\u00e9ditation et \u00e0 maintenir un \u00e9quilibre.",
      moduleTitles: {
        m1: "Gestion du Stress",
        m2: "Bases de la M\u00e9ditation",
      },
    },
    "health-fitness": {
      title: "Bases de la Sant\u00e9 et du Fitness",
      description: "Apprenez les principes de base du fitness et des routines d'entra\u00eenement efficaces.",
      moduleTitles: {
        m1: "Fondamentaux du Fitness",
        m2: "Routines d'Entra\u00eenement",
      },
    },
    "nutrition-diet": {
      title: "Nutrition et Alimentation Saine",
      description: "Comprenez les nutriments et comment structurer votre alimentation pour un maximum d'\u00e9nergie.",
      moduleTitles: {
        m1: "Fondamentaux de la Nutrition",
        m2: "Strat\u00e9gies Alimentaires",
      },
    },
    "web-dev": {
      title: "D\u00e9veloppement Web Moderne",
      description: "Ma\u00eetrisez les bases de la cr\u00e9ation de sites web avec HTML, CSS, Javascript et commencez votre carri\u00e8re professionnelle.",
      moduleTitles: {
        m1: "Bases du HTML & CSS",
        m2: "Introduction au Javascript",
      },
    },
    "data-science": {
      title: "Introduction \u00e0 la Data Science",
      description: "Apprenez \u00e0 analyser des donn\u00e9es, \u00e0 comprendre les statistiques de base et \u00e0 utiliser Python.",
      moduleTitles: {
        m1: "Bases de l'Analyse de Donn\u00e9es",
        m2: "Python pour la Data Science",
      },
    },
    "ai-tools": {
      title: "Outils d'IA pour la Productivit\u00e9",
      description: "Utilisez la puissance de l'IA comme ChatGPT et Midjourney pour acc\u00e9l\u00e9rer votre travail quotidien.",
      moduleTitles: {
        m1: "Ing\u00e9nierie de Prompts de Base",
        m2: "L'IA pour la Cr\u00e9ation de Contenu",
      },
    },
    "laporan-keuangan": {
      title: "Analyse des \u00c9tats Financiers",
      description: "Comment lire le bilan, le compte de r\u00e9sultat et le tableau des flux de tr\u00e9sorerie pour \u00e9valuer la sant\u00e9 financi\u00e8re d'une entreprise avant d'investir.",
      moduleTitles: {
        m1: "Les Trois \u00c9tats Financiers Cl\u00e9s",
        m2: "Analyse des Ratios Financiers",
        m3: "D\u00e9tecter les Anomalies Financi\u00e8res",
      },
    },
    "startup-bisnis": {
      title: "Strat\u00e9gie de Startup & Entreprise",
      description: "Lancez votre entreprise de l'id\u00e9e initiale \u00e0 l'ex\u00e9cution sur le march\u00e9. Apprenez l'\u00e9tude de march\u00e9, les mod\u00e8les d'affaires, le financement et le scaling.",
      moduleTitles: {
        m1: "Validation d'Id\u00e9es de Business",
        m2: "Lean Business Model Canvas",
        m3: "Obtenir son Premier Financement",
        m4: "Strat\u00e9gies de Croissance",
      },
    },
    "ecommerce-dasar": {
      title: "Ma\u00eetrise de l'E-Commerce & Dropshipping",
      description: "Cr\u00e9ez votre propre boutique en ligne, trouvez des produits \u00e0 fort potentiel, g\u00e9rez vos fournisseurs et pilotez une activit\u00e9 de e-commerce rentable sans aucun stock physique.",
      moduleTitles: {
        m1: "Mod\u00e8les d'Affaires E-Commerce",
        m2: "Recherche de Produits Gagnants",
        m3: "Cr\u00e9er sa Boutique en ligne",
      },
    },
    "personal-finance": {
      title: "Finances Personnelles & Budget",
      description: "Ma\u00eetrisez la gestion de votre tr\u00e9sorerie personnelle, les m\u00e9thodes d'\u00e9pargne les plus efficaces, l'allocation budg\u00e9taire syst\u00e9matique et la cr\u00e9ation d'un fonds de secours.",
      moduleTitles: {
        m1: "Principes de Gestion de Tr\u00e9sorerie",
        m2: "La R\u00e8gle de Budget 50/30/20",
        m3: "Fonds d'Urgence & Protection",
        m4: "\u00c9viter les Mauvaises Dettes",
      },
    },
    "passive-income": {
      title: "Strat\u00e9gies de Revenus Passifs",
      description: "Comment b\u00e2tir pas \u00e0 pas un portefeuille d'investissement g\u00e9n\u00e9rant des flux de revenus passifs r\u00e9guliers gr\u00e2ce aux dividendes et aux fonds indiciels.",
      moduleTitles: {
        m1: "Le Concept de Revenu Passif",
        m2: "Investir dans des Actions \u00e0 Dividendes",
        m3: "Revenus des Actifs Num\u00e9riques",
        m4: "Imp\u00f4ts & Gestion de Portefeuille",
      },
    },
    "growth-mindset": {
      title: "Growth Mindset & Habitudes de Succ\u00e8s",
      description: "D\u00e9veloppez un \u00e9tat d'esprit de croissance, lib\u00e9rez-vous de vos barri\u00e8res mentales limitantes et adoptez des micro-habitudes quotidiennes pour lib\u00e9rer votre plein potentiel.",
      moduleTitles: {
        m1: "Esprit de Croissance vs Fixe",
        m2: "Surmonter la Peur de l'\u00c9chec",
        m3: "Instaurer des Habitudes Atomiques",
        m4: "Auto-discipline & R\u00e9gularit\u00e9",
      },
    },
    "time-management": {
      title: "Gestion du Temps & Productivit\u00e9",
      description: "Ma\u00eetrisez la technique Pomodoro, la matrice de priorit\u00e9 d'Eisenhower et surmontez la procrastination pour travailler plus intelligemment au quotidien.",
      moduleTitles: {
        m1: "Principes de la Gestion du Temps",
        m2: "Matrice de Priorit\u00e9 d'Eisenhower",
        m3: "Vaincre la Procrastination",
      },
    },
  },
  de: {
    "saham-dasar": {
      title: "Aktien & B\u00f6rsen-Grundlagen",
      description: "Beginnen Sie richtig mit dem Investieren. Lernen Sie, wie Sie solide Aktien ausw\u00e4hlen, Finanzkennzahlen verstehen, Kurscharts lesen und ein robustes Anlageportfolio aufbauen.",
      moduleTitles: {
        m1: "Was sind Aktien?",
        m2: "Fundamentalanalyse",
        m3: "Technische Analyse",
        m4: "Portfoliostrategien",
      },
    },
    "kripto-dasar": {
      title: "Krypto- & Web3-Grundlagen",
      description: "Verstehen Sie detailliert die Blockchain-Technologie, Kryptow\u00e4hrungen, Smart Contracts, den Umgang mit Krypto-Wallets sowie das enorme Potenzial von DeFi.",
      moduleTitles: {
        m1: "Einf\u00fchrung in Blockchain",
        m2: "Wie Bitcoin & Ethereum funktionieren",
        m3: "Crypto Wallets & Sicherheit",
        m4: "Die Zukunft von Web3",
      },
    },
    "digital-marketing": {
      title: "Modernes Digital Marketing",
      description: "Meistern Sie digitales Marketing \u00fcber soziale Medien, Suchmaschinenoptimierung (SEO), Online-Werbung (Facebook & Google Ads) und conversionstarke Werbetexte.",
      moduleTitles: {
        m1: "Grundlagen des digitalen Marketings",
        m2: "Suchmaschinenoptimierung (SEO)",
        m3: "Bezahlte Anzeigen (FB, Google Ads)",
        m4: "Copywriting & Content-Strategie",
      },
    },
    "ui-ux-design": {
      title: "UI/UX Design Grundlagen",
      description: "Lernen Sie die Grundprinzipien von User Interface und User Experience Design.",
      moduleTitles: {
        m1: "UI-Grundlagen",
        m2: "UX-Forschung & Wireframing",
      },
    },
    "graphic-design": {
      title: "Modernes Grafikdesign",
      description: "Meistern Sie visuelle Kunst, Komposition, Typografie und Farbe f\u00fcr beeindruckende Designs.",
      moduleTitles: {
        m1: "Farbenlehre & Typografie",
        m2: "Visuelle Komposition",
      },
    },
    "mental-health": {
      title: "Psychische Gesundheit & Stressbew\u00e4ltigung",
      description: "Lernen Sie, wie Sie Stress bew\u00e4ltigen, meditieren und ein gesundes Gleichgewicht wahren.",
      moduleTitles: {
        m1: "Stressbew\u00e4ltigung",
        m2: "Grundlagen der Meditation",
      },
    },
    "health-fitness": {
      title: "Grundlagen f\u00fcr Gesundheit & Fitness",
      description: "Lernen Sie die Grundprinzipien der Fitness und effektive Trainingsroutinen.",
      moduleTitles: {
        m1: "Fitness-Grundlagen",
        m2: "Trainingsroutinen",
      },
    },
    "nutrition-diet": {
      title: "Ern\u00e4hrung & Gesunde Di\u00e4t",
      description: "Verstehen Sie N\u00e4hrstoffe und wie Sie Ihre Ern\u00e4hrung f\u00fcr maximale Energie strukturieren.",
      moduleTitles: {
        m1: "Grundlagen der Ern\u00e4hrung",
        m2: "Di\u00e4tstrategien",
      },
    },
    "web-dev": {
      title: "Moderne Webentwicklung",
      description: "Meistern Sie die Grundlagen der Website-Erstellung mit HTML, CSS, Javascript und starten Sie Ihre berufliche Karriere.",
      moduleTitles: {
        m1: "HTML & CSS Grundlagen",
        m2: "Einf\u00fchrung in Javascript",
      },
    },
    "data-science": {
      title: "Einf\u00fchrung in Data Science",
      description: "Lernen Sie, wie man Daten analysiert, verstehen Sie grundlegende Statistiken und nutzen Sie Python.",
      moduleTitles: {
        m1: "Datenanalyse-Grundlagen",
        m2: "Python f\u00fcr Data Science",
      },
    },
    "ai-tools": {
      title: "KI-Tools f\u00fcr Produktivit\u00e4t",
      description: "Nutzen Sie die Leistung von KI wie ChatGPT und Midjourney, um Ihren t\u00e4glichen Arbeitsablauf zu beschleunigen.",
      moduleTitles: {
        m1: "Grundlagen des Prompt Engineering",
        m2: "KI f\u00fcr die Erstellung von Inhalten",
      },
    },
    "laporan-keuangan": {
      title: "Bilanzanalyse & Finanzen",
      description: "Lernen Sie, wie Sie Bilanzen, Gewinn- und Verlustrechnungen sowie Cashflow-Rechnungen interpretieren, um die finanzielle Gesundheit von Firmen zu beurteilen.",
      moduleTitles: {
        m1: "Die drei Hauptfinanzberichte",
        m2: "Kennzahlenanalyse",
        m3: "Finanzielle Warnsignale erkennen",
      },
    },
    "startup-bisnis": {
      title: "Startup- & Business-Strategie",
      description: "Bauen Sie Ihr Unternehmen von der ersten Idee bis zur Markteinf\u00fchrung auf. Lernen Sie Marktforschung, schlanke Gesch\u00e4ftsmodelle, Gr\u00fcndungsfinanzierung und Skalierungsmethoden.",
      moduleTitles: {
        m1: "Gesch\u00e4ftsideen validieren",
        m2: "Lean Business Model Canvas",
        m3: "Sicherung der Erstfinanzierung",
        m4: "Skalierungsstrategien",
      },
    },
    "ecommerce-dasar": {
      title: "E-Commerce & Dropshipping Meisterklasse",
      description: "Bauen Sie Ihren eigenen profitablen Online-Shop auf, recherchieren Sie Bestseller-Produkte und steuern Sie eine Logistikkette komplett ohne physisches Eigenlager.",
      moduleTitles: {
        m1: "E-Commerce-Gesch\u00e4ftsmodelle",
        m2: "Erfolgreiche Produktrecherche",
        m3: "Aufbau eines Shopify-Shops",
      },
    },
    "personal-finance": {
      title: "Pers\u00f6nliche Finanzen & Budgetierung",
      description: "Meistern Sie Ihr pers\u00f6nliches Budget, optimieren Sie Ihre Sparraten, lernen Sie systematische Budgetregeln und bauen Sie z\u00fcgig einen soliden Notgroschen auf.",
      moduleTitles: {
        m1: "Prinzipien des Cashflow-Managements",
        m2: "Die 50/30/20 Budgetierungsregel",
        m3: "Notgroschen & Absicherung",
        m4: "Vermeidung konsumorientierter Schulden",
      },
    },
    "passive-income": {
      title: "Passive Einkommens- & Dividendenstrategie",
      description: "Erfahren Sie, wie Sie ein rentables Anlageportfolio aufbauen, das durch Dividendenaktien und breit gestreute Indexfonds verl\u00e4ssliche Cashflows generiert.",
      moduleTitles: {
        m1: "Das Konzept des passiven Einkommens",
        m2: "Investieren in Dividendenaktien",
        m3: "Passiver Cashflow aus digitalen Assets",
        m4: "Steuern & Portfolioerhalt",
      },
    },
    "growth-mindset": {
      title: "Growth Mindset & Erfolgsgewohnheiten",
      description: "Entwickeln Sie eine dynamische Wachstumsmentalit\u00e4t, \u00fcberwinden Sie innere Zweifel und Blockaden und etablieren Sie t\u00e4gliche Routinen f\u00fcr langfristigen Erfolg.",
      moduleTitles: {
        m1: "Wachstums- vs. starre Mentalit\u00e4t",
        m2: "Angst vor dem Scheitern \u00fcberwinden",
        m3: "Aufbau atomarer Gewohnheiten",
        m4: "Selbstdisziplin & Konsistenz",
      },
    },
    "time-management": {
      title: "Zeitmanagement & Produktivit\u00e4t",
      description: "Meistern Sie die Pomodoro-Technik, das Eisenhower-Prinzip und bek\u00e4mpfen Sie Aufschieberitis, um t\u00e4glich produktiver, fokussierter und entspannter zu arbeiten.",
      moduleTitles: {
        m1: "Kernprinzipien des Zeitmanagements",
        m2: "Die Eisenhower-Priorit\u00e4tenmatrix",
        m3: "Aufschieberitis erfolgreich bek\u00e4mpfen",
      },
    },
  },
  ja: {
    "saham-dasar": {
      title: "\u682a\u5f0f\u6295\u8cc7\u30fb\u5e02\u5834\u5165\u9580",
      description: "\u6b63\u3057\u3044\u682a\u5f0f\u6295\u8cc7\u3092\u59cb\u3081\u308b\u305f\u3081\u306e\u5165\u9580\u8b1b\u7fa9\u3002\u8ca1\u52d9\u6307\u6a19\u306e\u8a55\u4fa1\u3001\u30d5\u30a1\u30f3\u30c0\u30e1\u30f3\u30bf\u30eb\u30ba\u5206\u6790\u3001\u30c1\u30e3\u30fc\u30c8\u306e\u57fa\u672c\u3001\u30dd\u30fc\u30c8\u30d5\u30a9\u30ea\u30aa\u904b\u7528\u6226\u7565\u3092\u7db2\u7f85\u7684\u306b\u89e3\u8aac\u3057\u307e\u3059\u3002",
      moduleTitles: {
        m1: "\u682a\u5f0f\u3068\u306f\u4f55\u304b\uff1f",
        m2: "\u30d5\u30a1\u30f3\u30c0\u30e1\u30f3\u30bf\u30eb\u5206\u6790",
        m3: "\u30c6\u30af\u30cb\u30ab\u30eb\u5206\u6790",
        m4: "\u30dd\u30fc\u30c8\u30d5\u30a9\u30ea\u30aa\u6226\u7565",
      },
    },
    "kripto-dasar": {
      title: "\u6697\u53f7\u8cc7\u7523\uff06Web3\u5165\u9580",
      description: "\u30d6\u30ed\u30c3\u30af\u30c1\u30a7\u30fc\u30f3\u306e\u57fa\u672c\u539f\u7406\u3001\u6697\u53f7\u901a\u8ca8\u3001\u30b9\u30de\u30fc\u30c8\u30b3\u30f3\u30c8\u30e9\u30af\u30c8\u306e\u4ed5\u7d44\u307f\u3001\u30c7\u30b8\u30bf\u30eb\u30a6\u30a9\u30ec\u30c3\u30c8\u306e\u64cd\u4f5c\u3001\u5206\u6563\u578b\u91d1\u878d\uff08DeFi\uff09\u306e\u53ef\u80fd\u6027\u306b\u3064\u3044\u3066\u5b66\u7fd2\u3057\u307e\u3059\u3002",
      moduleTitles: {
        m1: "\u30d6\u30ed\u30c3\u30af\u30c1\u30a7\u30fc\u30f3\u5165\u9580",
        m2: "\u30d3\u30c3\u30c8\u30b3\u30a4\u30f3\u3068\u30a4\u30fc\u30b5\u30ea\u30a2\u30e0\u306e\u4ed5\u7d44\u307f",
        m3: "\u4eee\u60f3\u901a\u8ca8\u30a6\u30a9\u30ec\u30c3\u30c8\u3068\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3",
        m4: "Web3\u306e\u672a\u6765",
      },
    },
    "digital-marketing": {
      title: "\u30e2\u30c0\u30f3\u30c7\u30b8\u30bf\u30eb\u30de\u30fc\u30b1\u30c6\u30a3\u30f3\u30b0",
      description: "SNS\u30de\u30fc\u30b1\u30c6\u30a3\u30f3\u30b0\u3001SEO\u6700\u9069\u5316\u3001\u6709\u6599\u30cd\u30c3\u30c8\u5e83\u544a\uff08Facebook & Google\uff09\u3001\u58f2\u4e0a\u3092\u6700\u5927\u5316\u3059\u308b\u30b3\u30d4\u30fc\u30e9\u30a4\u30c6\u30a3\u30f3\u30b0\u6280\u8853\u3092\u5305\u62ec\u7684\u306b\u5b66\u3073\u307e\u3059\u3002",
      moduleTitles: {
        m1: "\u30c7\u30b8\u30bf\u30eb\u30de\u30fc\u30b1\u30c6\u30a3\u30f3\u30b0\u57fa\u790e",
        m2: "SEO\uff08\u691c\u7d22\u30a8\u30f3\u30b8\u30f3\u6700\u9069\u5316\uff09",
        m3: "\u30cd\u30c3\u30c8\u6709\u6599\u5e83\u544a\uff08FB\u30fbGoogle Ads\uff09",
        m4: "\u30b3\u30d4\u30fc\u30e9\u30a4\u30c6\u30a3\u30f3\u30b0\u3068\u30b3\u30f3\u30c6\u30f3\u30c4\u8a2d\u8a08",
      },
    },
    "ui-ux-design": {
      title: "UI/UX\u30c7\u30b6\u30a4\u30f3\u306e\u57fa\u790e",
      description: "\u30e6\u30fc\u30b6\u30fc\u30a4\u30f3\u30bf\u30fc\u30d5\u30a7\u30fc\u30b9\u3068\u30e6\u30fc\u30b6\u30fc\u30a8\u30af\u30b9\u30da\u30ea\u30a8\u30f3\u30b9\u30c7\u30b6\u30a4\u30f3\u306e\u57fa\u672c\u539f\u5247\u3092\u5b66\u3073\u307e\u3059\u3002",
      moduleTitles: {
        m1: "UI\u306e\u57fa\u790e",
        m2: "UX\u30ea\u30b5\u30fc\u30c1\u3068\u30ef\u30a4\u30e4\u30fc\u30d5\u30ec\u30fc\u30e0",
      },
    },
    "graphic-design": {
      title: "\u30e2\u30c0\u30f3\u306a\u30b0\u30e9\u30d5\u30a3\u30c3\u30af\u30c7\u30b6\u30a4\u30f3",
      description: "\u8996\u899a\u82b8\u8853\u3001\u69cb\u56f3\u3001\u30bf\u30a4\u30dd\u30b0\u30e9\u30d5\u30a3\u3001\u8272\u5f69\u7406\u8ad6\u3092\u7fd2\u5f97\u3057\u3001\u9b45\u529b\u7684\u306a\u30c7\u30b6\u30a4\u30f3\u3092\u4f5c\u6210\u3057\u307e\u3059\u3002",
      moduleTitles: {
        m1: "\u8272\u5f69\u7406\u8ad6\u3068\u30bf\u30a4\u30dd\u30b0\u30e9\u30d5\u30a3",
        m2: "\u8996\u899a\u7684\u69cb\u56f3",
      },
    },
    "mental-health": {
      title: "\u30e1\u30f3\u30bf\u30eb\u30d8\u30eb\u30b9\u3068\u30b9\u30c8\u30ec\u30b9\u7ba1\u7406",
      description: "\u30b9\u30c8\u30ec\u30b9\u3092\u7ba1\u7406\u3057\u3001\u7791\u60f3\u3092\u5b9f\u8df5\u3057\u3001\u5065\u5eb7\u7684\u306a\u30ef\u30fc\u30af\u30e9\u30a4\u30d5\u30d0\u30e9\u30f3\u30b9\u3092\u7dad\u6301\u3059\u308b\u65b9\u6cd5\u3092\u5b66\u3073\u307e\u3059\u3002",
      moduleTitles: {
        m1: "\u30b9\u30c8\u30ec\u30b9\u7ba1\u7406",
        m2: "\u7791\u60f3\u306e\u57fa\u790e",
      },
    },
    "health-fitness": {
      title: "\u5065\u5eb7\u3068\u30d5\u30a3\u30c3\u30c8\u30cd\u30b9\u306e\u57fa\u790e",
      description: "\u30d5\u30a3\u30c3\u30c8\u30cd\u30b9\u306e\u57fa\u672c\u539f\u5247\u3068\u52b9\u679c\u7684\u306a\u30c8\u30ec\u30fc\u30cb\u30f3\u30b0\u30eb\u30fc\u30c1\u30f3\u3092\u5b66\u3073\u307e\u3059\u3002",
      moduleTitles: {
        m1: "\u30d5\u30a3\u30c3\u30c8\u30cd\u30b9\u306e\u57fa\u790e",
        m2: "\u30c8\u30ec\u30fc\u30cb\u30f3\u30b0\u30eb\u30fc\u30c1\u30f3",
      },
    },
    "nutrition-diet": {
      title: "\u6804\u990a\u3068\u5065\u5eb7\u7684\u306a\u98df\u4e8b",
      description: "\u6804\u990a\u7d20\u3092\u7406\u89e3\u3057\u3001\u6700\u5927\u9650\u306e\u30a8\u30cd\u30eb\u30ae\u30fc\u3092\u5f97\u308b\u305f\u3081\u306b\u98df\u4e8b\u3092\u7d44\u307f\u7acb\u3066\u308b\u65b9\u6cd5\u3092\u5b66\u3073\u307e\u3059\u3002",
      moduleTitles: {
        m1: "\u6804\u990a\u306e\u57fa\u790e",
        m2: "\u98df\u4e8b\u6226\u7565",
      },
    },
    "web-dev": {
      title: "\u30e2\u30c0\u30f3\u306aWeb\u958b\u767a",
      description: "HTML\u3001CSS\u3001Javascript\u3092\u4f7f\u7528\u3057\u305fWeb\u30b5\u30a4\u30c8\u4f5c\u6210\u306e\u57fa\u672c\u3092\u7fd2\u5f97\u3057\u3001\u30d7\u30ed\u306eWeb\u958b\u767a\u8005\u3068\u3057\u3066\u306e\u30ad\u30e3\u30ea\u30a2\u3092\u30b9\u30bf\u30fc\u30c8\u3055\u305b\u307e\u3057\u3087\u3046\u3002",
      moduleTitles: {
        m1: "HTML\u3068CSS\u306e\u57fa\u790e",
        m2: "Javascript\u306e\u7d39\u4ecb",
      },
    },
    "data-science": {
      title: "\u30c7\u30fc\u30bf\u30b5\u30a4\u30a8\u30f3\u30b9\u5165\u9580",
      description: "\u30c7\u30fc\u30bf\u3092\u5206\u6790\u3059\u308b\u65b9\u6cd5\u3001\u57fa\u672c\u7684\u306a\u7d71\u8a08\u3092\u7406\u89e3\u3057\u3001Python\u3092\u4f7f\u7528\u3057\u3066\u554f\u984c\u3092\u89e3\u6c7a\u3059\u308b\u65b9\u6cd5\u3092\u5b66\u3073\u307e\u3059\u3002",
      moduleTitles: {
        m1: "\u30c7\u30fc\u30bf\u5206\u6790\u306e\u57fa\u790e",
        m2: "\u30c7\u30fc\u30bf\u30b5\u30a4\u30a8\u30f3\u30b9\u306e\u305f\u3081\u306ePython",
      },
    },
    "ai-tools": {
      title: "\u751f\u7523\u6027\u306e\u305f\u3081\u306eAI\u30c4\u30fc\u30eb",
      description: "ChatGPT\u3084Midjourney\u306a\u3069\u306eAI\u306e\u529b\u3092\u6d3b\u7528\u3057\u3066\u3001\u6bce\u65e5\u306e\u30ef\u30fc\u30af\u30d5\u30ed\u30fc\u3092\u52a0\u901f\u3055\u305b\u307e\u3059\u3002",
      moduleTitles: {
        m1: "\u57fa\u672c\u7684\u306a\u30d7\u30ed\u30f3\u30d7\u30c8\u30a8\u30f3\u30b8\u30cb\u30a2\u30ea\u30f3\u30b0",
        m2: "\u30b3\u30f3\u30c6\u30f3\u30c4\u4f5c\u6210\u306e\u305f\u3081\u306eAI",
      },
    },
    "laporan-keuangan": {
      title: "\u8ca1\u52d9\u8af8\u8868\u30fb\u6c7a\u7b97\u66f8\u306e\u8aad\u307f\u65b9",
      description: "\u8cb8\u501f\u5bfe\u7167\u8868\uff08B/S\uff09\u3001\u640d\u76ca\u8a08\u7b97\u66f8\uff08P/L\uff09\u3001\u30ad\u30e3\u30c3\u30b7\u30e5\u30d5\u30ed\u30fc\u8a08\u7b97\u66f8\u3092\u5206\u6790\u3057\u3001\u4f01\u696d\u3084\u6295\u8cc7\u5148\u306e\u771f\u306e\u8ca1\u653f\u72b6\u614b\u3068\u5b89\u5168\u6027\u3092\u8a55\u4fa1\u3057\u307e\u3059\u3002",
      moduleTitles: {
        m1: "3\u5927\u8ca1\u52d9\u8af8\u8868\u306e\u57fa\u790e",
        m2: "\u4e3b\u8981\u306a\u8ca1\u52d9\u6bd4\u7387\u5206\u6790",
        m3: "\u4e0d\u9069\u5207\u306a\u4f1a\u8a08\u30fb\u8b66\u544a\u30b5\u30a4\u30f3\u306e\u691c\u77e5",
      },
    },
    "startup-bisnis": {
      title: "\u30b9\u30bf\u30fc\u30c8\u30a2\u30c3\u30d7\u30fb\u30d3\u30b8\u30cd\u30b9\u6226\u7565",
      description: "\u8d77\u696d\u306e\u30a2\u30a4\u30c7\u30a2\u51fa\u3057\u304b\u3089\u4e8b\u696d\u7acb\u3061\u4e0a\u3052\u3001\u8cc7\u91d1\u8abf\u9054\u30b9\u30ad\u30fc\u30e0\u3001\u53ce\u76ca\u6027\u9ad8\u3044\u30d3\u30b8\u30cd\u30b9\u30e2\u30c7\u30eb\u306e\u69cb\u7bc9\u3001\u30b9\u30b1\u30fc\u30ea\u30f3\u30b0\u624b\u6cd5\u307e\u3067\u4f53\u7cfb\u7684\u306b\u5b66\u7fd2\u3057\u307e\u3059\u3002",
      moduleTitles: {
        m1: "\u30d3\u30b8\u30cd\u30b9\u30a2\u30a4\u30c7\u30a2\u306e\u691c\u8a3c",
        m2: "\u30ea\u30fc\u30f3\u30d3\u30b8\u30cd\u30b9\u30e2\u30c7\u30eb\u30ad\u30e3\u30f3\u30d0\u30b9",
        m3: "\u6700\u521d\u306e\u8cc7\u91d1\u8abf\u9054\u306e\u6210\u529f\u6cd5\u5247",
        m4: "\u30b0\u30ed\u30fc\u30b9\u30fb\u30b9\u30b1\u30fc\u30ea\u30f3\u30b0\u6226\u7565",
      },
    },
    "ecommerce-dasar": {
      title: "EC\u30b5\u30a4\u30c8\uff06\u30c9\u30ed\u30c3\u30d7\u30b7\u30c3\u30d4\u30f3\u30b0",
      description: "\u81ea\u793e\u30aa\u30f3\u30e9\u30a4\u30f3\u30b7\u30e7\u30c3\u30d7\u306e\u7acb\u3061\u4e0a\u3052\u3001\u58f2\u308c\u7b4b\u5546\u54c1\u306e\u30ea\u30b5\u30fc\u30c1\u3001\u30b5\u30d7\u30e9\u30a4\u30c1\u30a7\u30fc\u30f3\u7ba1\u7406\u3001\u5728\u5eab\u3092\u6301\u305f\u305a\u306b\u9ad8\u53ce\u76ca\u3092\u3042\u3052\u308bEC\u30e2\u30c7\u30eb\u306e\u69cb\u7bc9\u65b9\u6cd5\u3002",
      moduleTitles: {
        m1: "EC\u30d3\u30b8\u30cd\u30b9\u30e2\u30c7\u30eb\u5165\u9580",
        m2: "\u58f2\u308c\u7b4b\u5546\u54c1\u306e\u30ea\u30b5\u30fc\u30c1\u6cd5",
        m3: "Shopify\u30b9\u30c8\u30a2\u306e\u69cb\u7bc9\u3068\u904b\u7528",
      },
    },
    "personal-finance": {
      title: "\u30d1\u30fc\u30bd\u30ca\u30eb\u30d5\u30a1\u30a4\u30ca\u30f3\u30b9\u30fb\u5bb6\u8a08\u7ba1\u7406",
      description: "\u500b\u4eba\u306e\u8cc7\u91d1\u6d41\u52d5\u6027\u306e\u7ba1\u7406\u3001\u52b9\u7387\u7684\u306a\u8caf\u84c4\u8a08\u753b\u300150/30/20\u30eb\u30fc\u30eb\u306e\u5b9f\u7528\u3001\u7dca\u6025\u8cc7\u91d1\uff08\u751f\u6d3b\u9632\u885b\u8cc7\u91d1\uff09\u3092\u78ba\u5b9f\u306b\u69cb\u7bc9\u3059\u308b\u8ca1\u52d9\u30d7\u30e9\u30f3\u3002",
      moduleTitles: {
        m1: "\u30ad\u30e3\u30c3\u30b7\u30e5\u30d5\u30ed\u30fc\u7ba1\u7406\u306e\u539f\u5247",
        m2: "50/30/20\u4e88\u7b97\u30eb\u30fc\u30eb\u306e\u5b9f\u8df5",
        m3: "\u7dca\u6025\u8cc7\u91d1\u3068\u8cc7\u7523\u9632\u885b",
        m4: "\u6d88\u8cbb\u8005\u30ed\u30fc\u30f3\u30fb\u60aa\u8cea\u306a\u8ca0\u50b5\u306e\u56de\u907f",
      },
    },
    "passive-income": {
      title: "\u4e0d\u52b4\u6240\u5f97\u30fb\u914d\u5f53\u91d1\u6295\u8cc7\u6226\u7565",
      description: "\u9ad8\u914d\u5f53\u682a\u6295\u8cc7\u3001\u5b89\u5168\u6027\u306e\u9ad8\u3044\u30a4\u30f3\u30c7\u30c3\u30af\u30b9\u6295\u8cc7\u3001\u30c7\u30b8\u30bf\u30eb\u8cc7\u7523\u30dd\u30fc\u30c8\u30d5\u30a9\u30ea\u30aa\u3092\u69cb\u7bc9\u3057\u3001\u5b89\u5b9a\u7684\u304b\u3064\u7d99\u7d9a\u7684\u306a\u30ad\u30e3\u30c3\u30b7\u30e5\u30d5\u30ed\u30fc\u3092\u751f\u307f\u51fa\u3059\u65b9\u6cd5\u3002",
      moduleTitles: {
        m1: "\u4e0d\u52b4\u6240\u5f97\u30fb\u30d1\u30c3\u30b7\u30d6\u30a4\u30f3\u30ab\u30e0\u306e\u771f\u5b9f",
        m2: "\u9ad8\u914d\u5f53\u682a\u30fb\u914d\u5f53\u91d1\u6295\u8cc7\u306e\u5b9f\u8df5",
        m3: "\u30c7\u30b8\u30bf\u30eb\u30a2\u30bb\u30c3\u30c8\u3092\u6d3b\u7528\u3057\u305f\u8cc7\u7523\u69cb\u7bc9",
        m4: "\u7a0e\u91d1\u5bfe\u7b56\u3068\u30dd\u30fc\u30c8\u30d5\u30a9\u30ea\u30aa\u7dad\u6301",
      },
    },
    "growth-mindset": {
      title: "\u30b0\u30ed\u30fc\u30b9\u30de\u30a4\u30f3\u30c9\u30bb\u30c3\u30c8\u3068\u7fd2\u6163",
      description: "\u6210\u9577\u601d\u8003\u3092\u8eab\u306b\u3064\u3051\u3001\u9650\u754c\u3092\u5b9a\u3081\u308b\u5fc3\u7406\u7684\u30d6\u30ed\u30c3\u30af\uff08\u30e1\u30f3\u30bf\u30eb\u30d6\u30ed\u30c3\u30af\uff09\u3092\u89e3\u9664\u3057\u3001\u76ee\u6a19\u3092\u78ba\u5b9f\u306b\u9054\u6210\u3059\u308b\u305f\u3081\u306e\u7fd2\u6163\u8a2d\u8a08\uff08Atomic Habits\uff09\u3092\u5c0e\u5165\u3057\u307e\u3059\u3002",
      moduleTitles: {
        m1: "\u6210\u9577\u30de\u30a4\u30f3\u30c9\u3068\u505c\u6ede\u30de\u30a4\u30f3\u30c9\u306e\u6bd4\u8f03",
        m2: "\u5931\u6557\u306e\u6050\u6016\u3092\u514b\u670d\u3059\u308b\u30e1\u30f3\u30bf\u30eb\u8853",
        m3: "\u30a2\u30c8\u30df\u30c3\u30af\u30fb\u30cf\u30d3\u30c3\u30c8\u306e\u8a2d\u8a08",
        m4: "\u5f37\u56fa\u306a\u81ea\u5df1\u898f\u5f8b\u3068\u6301\u7d9a\u529b\u306e\u990a\u6210",
      },
    },
    "time-management": {
      title: "\u6642\u9593\u7ba1\u7406\u30fb\u751f\u7523\u6027\u5411\u4e0a",
      description: "\u30dd\u30e2\u30c9\u30fc\u30ed\u624b\u6cd5\u3001\u30a2\u30a4\u30bc\u30f3\u30cf\u30ef\u30fc\u512a\u5148\u9806\u4f4d\u4ed8\u3051\u30de\u30c8\u30ea\u30af\u30b9\u3001\u305d\u3057\u3066\u52b9\u7387\u7684\u306a\u5148\u5ef6\u3070\u3057\u7656\u514b\u670d\u30a2\u30d7\u30ed\u30fc\u30c1\u3092\u5b66\u3073\u3001\u6bce\u65e5\u306e\u4ed5\u4e8b\u306e\u52b9\u7387\u3092\u5287\u7684\u306b\u5411\u4e0a\u3055\u305b\u307e\u3059\u3002",
      moduleTitles: {
        m1: "\u6642\u9593\u7ba1\u7406\u306e\u672c\u8cea\u3068\u57fa\u790e",
        m2: "\u30a2\u30a4\u30bc\u30f3\u30cf\u30ef\u30fc\u512a\u5148\u9806\u4f4d\u30de\u30c8\u30ea\u30af\u30b9",
        m3: "\u5148\u5ef6\u3070\u3057\u30b0\u30bb\u3092\u79d1\u5b66\u7684\u306b\u514b\u670d\u3059\u308b",
      },
    },
  },
  zh: {
    "saham-dasar": {
      title: "\u80a1\u7968\u4e0e\u8bc1\u5238\u5e02\u573a\u57fa\u7840",
      description: "\u96f6\u57fa\u7840\u5f00\u59cb\u5b66\u4e60\u80a1\u7968\u6295\u8d44\u3002\u8bb2\u6388\u5982\u4f55\u5206\u6790\u4f01\u4e1a\u57fa\u672c\u9762\u3001\u7406\u89e3\u6838\u5fc3\u8d22\u52a1\u6307\u6807\u3001\u89e3\u8bfb\u4ef7\u683cK\u7ebf\u56fe\u4ee5\u53ca\u6784\u5efa\u6297\u98ce\u9669\u7684\u6295\u8d44\u7ec4\u5408\u3002",
      moduleTitles: {
        m1: "\u4ec0\u4e48\u662f\u80a1\u7968\uff1f",
        m2: "\u57fa\u672c\u9762\u5206\u6790",
        m3: "\u6280\u672f\u5206\u6790",
        m4: "\u6295\u8d44\u7ec4\u5408\u7b56\u7565",
      },
    },
    "kripto-dasar": {
      title: "\u52a0\u5bc6\u8d27\u5e01\u4e0eWeb3\u5165\u95e8",
      description: "\u5168\u9762\u4e86\u89e3\u533a\u5757\u94fe\u5e95\u5c42\u903b\u8f91\u3001\u52a0\u5bc6\u8d44\u4ea7\u3001\u667a\u80fd\u5408\u7ea6\u3001\u52a0\u5bc6\u94b1\u5305\u7684\u5b89\u5168\u914d\u7f6e\uff0c\u4ee5\u53ca\u53bb\u4e2d\u5fc3\u5316\u91d1\u878d\uff08DeFi\uff09\u7684\u672a\u6765\u98ce\u53e3\u3002",
      moduleTitles: {
        m1: "\u533a\u5757\u94fe\u6280\u672f\u4ecb\u7ecd",
        m2: "\u6bd4\u7279\u5e01\u4e0e\u4ee5\u592a\u574a\u7684\u5de5\u4f5c\u539f\u7406",
        m3: "\u52a0\u5bc6\u94b1\u5305\u4e0e\u5b89\u5168",
        m4: "Web3\u7684\u672a\u6765\u5c55\u671b",
      },
    },
    "digital-marketing": {
      title: "\u73b0\u4ee3\u6570\u5b57\u8425\u9500\u5b9e\u8df5",
      description: "\u6df1\u5ea6\u638c\u63e1\u641c\u7d22\u5f15\u64ce\u4f18\u5316\uff08SEO\uff09\u3001\u793e\u4ea4\u5a92\u4f53\u6d41\u91cf\u903b\u8f91\u3001\u7cbe\u51c6\u4ed8\u8d39\u5e7f\u544a\u6295\u653e\uff08FB/Google Ads\uff09\u548c\u9ad8\u6548\u7684\u9500\u552e\u6587\u6848\u64b0\u5199\u5957\u8def\u3002",
      moduleTitles: {
        m1: "\u6570\u5b57\u8425\u9500\u57fa\u7840\u6846\u67b6",
        m2: "\u641c\u7d22\u5f15\u64ce\u4f18\u5316 (SEO)",
        m3: "\u4ed8\u8d39\u5e7f\u544a\u6295\u653e (Facebook & Google Ads)",
        m4: "\u6587\u6848\u7b56\u5212\u4e0e\u5185\u5bb9\u7b56\u7565",
      },
    },
    "ui-ux-design": {
      title: "UI/UX \u8bbe\u8ba1\u57fa\u7840",
      description: "\u5b66\u4e60\u7528\u6237\u754c\u9762\u548c\u7528\u6237\u4f53\u9a8c\u8bbe\u8ba1\u7684\u6838\u5fc3\u539f\u5219\u3002",
      moduleTitles: {
        m1: "UI \u57fa\u7840",
        m2: "UX \u7814\u7a76\u4e0e\u7ebf\u6846\u56fe",
      },
    },
    "graphic-design": {
      title: "\u73b0\u4ee3\u5e73\u9762\u8bbe\u8ba1",
      description: "\u638c\u63e1\u89c6\u89c9\u827a\u672f\u3001\u6392\u7248\u548c\u8272\u5f69\u7406\u8bba\uff0c\u521b\u9020\u4ee4\u4eba\u60ca\u53f9\u7684\u8bbe\u8ba1\u3002",
      moduleTitles: {
        m1: "\u8272\u5f69\u7406\u8bba\u4e0e\u6392\u7248",
        m2: "\u89c6\u89c9\u6784\u56fe",
      },
    },
    "mental-health": {
      title: "\u5fc3\u7406\u5065\u5eb7\u4e0e\u538b\u529b\u7ba1\u7406",
      description: "\u5b66\u4e60\u5982\u4f55\u7ba1\u7406\u538b\u529b\uff0c\u7ec3\u4e60\u51a5\u60f3\uff0c\u5e76\u4fdd\u6301\u5065\u5eb7\u7684\u5de5\u4f5c\u4e0e\u751f\u6d3b\u5e73\u8861\u3002",
      moduleTitles: {
        m1: "\u538b\u529b\u7ba1\u7406",
        m2: "\u51a5\u60f3\u57fa\u7840",
      },
    },
    "health-fitness": {
      title: "\u5065\u5eb7\u4e0e\u5065\u8eab\u57fa\u7840",
      description: "\u5b66\u4e60\u5065\u8eab\u7684\u6838\u5fc3\u539f\u5219\u548c\u6709\u6548\u7684\u953b\u70bc\u8ba1\u5212\u3002",
      moduleTitles: {
        m1: "\u5065\u8eab\u57fa\u7840",
        m2: "\u953b\u70bc\u8ba1\u5212",
      },
    },
    "nutrition-diet": {
      title: "\u8425\u517b\u4e0e\u5065\u5eb7\u996e\u98df",
      description: "\u4e86\u89e3\u8425\u517b\u7d20\uff0c\u4ee5\u53ca\u5982\u4f55\u5b89\u6392\u996e\u98df\u4ee5\u83b7\u5f97\u6700\u5927\u7684\u80fd\u91cf\u3002",
      moduleTitles: {
        m1: "\u8425\u517b\u57fa\u7840",
        m2: "\u996e\u98df\u7b56\u7565",
      },
    },
    "web-dev": {
      title: "\u73b0\u4ee3 Web \u5f00\u53d1",
      description: "\u638c\u63e1\u4f7f\u7528 HTML\u3001CSS\u3001Javascript \u521b\u5efa\u7f51\u7ad9\u7684\u57fa\u7840\u77e5\u8bc6\uff0c\u5f00\u542f\u60a8\u7684\u804c\u4e1a\u751f\u6daf\u3002",
      moduleTitles: {
        m1: "HTML \u548c CSS \u57fa\u7840",
        m2: "Javascript \u7b80\u4ecb",
      },
    },
    "data-science": {
      title: "\u6570\u636e\u79d1\u5b66\u5bfc\u8bba",
      description: "\u5b66\u4e60\u5982\u4f55\u5206\u6790\u6570\u636e\u3001\u7406\u89e3\u57fa\u7840\u7edf\u8ba1\u5b66\u5e76\u4f7f\u7528 Python \u89e3\u51b3\u6570\u636e\u9a71\u52a8\u7684\u95ee\u9898\u3002",
      moduleTitles: {
        m1: "\u6570\u636e\u5206\u6790\u57fa\u7840",
        m2: "\u7528\u4e8e\u6570\u636e\u79d1\u5b66\u7684 Python",
      },
    },
    "ai-tools": {
      title: "\u63d0\u9ad8\u751f\u4ea7\u529b\u7684 AI \u5de5\u5177",
      description: "\u5229\u7528 ChatGPT \u548c Midjourney \u7b49 AI \u7684\u529b\u91cf\u6765\u52a0\u901f\u60a8\u7684\u65e5\u5e38\u5de5\u4f5c\u6d41\u7a0b\u3002",
      moduleTitles: {
        m1: "\u57fa\u7840\u63d0\u793a\u5de5\u7a0b",
        m2: "\u7528\u4e8e\u5185\u5bb9\u521b\u4f5c\u7684 AI",
      },
    },
    "laporan-keuangan": {
      title: "\u8d22\u52a1\u62a5\u8868\u5206\u6790",
      description: "\u89e3\u8bfb\u8d44\u4ea7\u8d1f\u503a\u8868\u3001\u5229\u6da6\u8868\u548c\u73b0\u91d1\u6d41\u91cf\u8868\uff0c\u5e2e\u52a9\u60a8\u5728\u5f00\u5c55\u5546\u4e1a\u5408\u4f5c\u6216\u8fdb\u884c\u8bc1\u5238\u6295\u8d44\u524d\u7cbe\u786e\u8bc4\u4f30\u4f01\u4e1a\u7684\u7ecf\u8425\u5065\u5eb7\u5ea6\u3002",
      moduleTitles: {
        m1: "\u4e09\u5927\u6838\u5fc3\u8d22\u52a1\u62a5\u8868",
        m2: "\u8d22\u52a1\u6bd4\u7387\u5206\u6790\u6cd5",
        m3: "\u8bc6\u522b\u8d22\u52a1\u9020\u5047\u4e0e\u7ea2\u7ebf",
      },
    },
    "startup-bisnis": {
      title: "\u521d\u521b\u4f01\u4e1a\u4e0e\u5546\u4e1a\u6218\u7565",
      description: "\u5c06\u7edd\u5999\u7684\u521b\u610f\u8f6c\u5316\u4e3a\u6210\u529f\u7684\u5546\u4e1a\u5b9e\u4f53\u3002\u8bfe\u7a0b\u6db5\u76d6\u5e02\u573a\u75db\u70b9\u8c03\u7814\u3001MVP\u4ea7\u54c1\u9a8c\u8bc1\u3001\u80a1\u6743\u53ca\u521d\u521b\u878d\u8d44\u8def\u5f84\u548c\u89c4\u6a21\u5316\u6269\u5f20\u903b\u8f91\u3002",
      moduleTitles: {
        m1: "\u9a8c\u8bc1\u5546\u4e1a\u521b\u610f",
        m2: "\u7cbe\u76ca\u5546\u4e1a\u753b\u5e03\u6a21\u578b",
        m3: "\u6210\u529f\u83b7\u5f97\u9996\u7b14\u878d\u8d44",
        m4: "\u4e1a\u52a1\u89c4\u6a21\u5316\u589e\u957f\u7b56\u7565",
      },
    },
    "ecommerce-dasar": {
      title: "\u7535\u5b50\u5546\u52a1\u4e0e\u65e0\u8d27\u6e90\u7535\u5546",
      description: "\u624b\u628a\u624b\u5e26\u4f60\u642d\u5efa\u81ea\u5df1\u7684\u5728\u7ebf\u7f51\u5e97\uff0c\u638c\u63e1\u7206\u6b3e\u9009\u54c1\u548c\u4f9b\u5e94\u94fe\u7ba1\u7406\u6280\u5de7\uff0c\u5f00\u542f\u4f4e\u98ce\u9669\u3001\u9ad8\u6bdb\u5229\u7684\u65e0\u8d27\u6e90\u8de8\u5883\u7535\u5546\u4e1a\u52a1\u3002",
      moduleTitles: {
        m1: "\u7535\u5546\u4e3b\u6d41\u5546\u4e1a\u6a21\u5f0f",
        m2: "\u7206\u6b3e\u4ea7\u54c1\u9009\u54c1\u4e0e\u8c03\u7814",
        m3: "Shopify\u72ec\u7acb\u7ad9\u642d\u5efa\u4e0e\u4f18\u5316",
      },
    },
    "personal-finance": {
      title: "\u4e2a\u4eba\u7406\u8d22\u4e0e\u7406\u8d22\u9884\u7b97",
      description: "\u638c\u63a7\u4e2a\u4eba\u6216\u5bb6\u5ead\u7684\u73b0\u91d1\u6d41\u91cf\u3002\u5b66\u4e60\u9ad8\u6548\u5f3a\u5236\u50a8\u84c4\u65b9\u6cd5\u300150/30/20\u5206\u914d\u6cd5\u5219\uff0c\u5e76\u9010\u6b65\u5efa\u7acb\u62b5\u5fa1\u5916\u90e8\u98ce\u9669\u7684\u5e94\u6025\u50a8\u5907\u91d1\u3002",
      moduleTitles: {
        m1: "\u73b0\u91d1\u6d41\u7ba1\u7406\u7684\u6838\u5fc3\u539f\u5219",
        m2: "50/30/20 \u9884\u7b97\u5206\u914d\u9ec4\u91d1\u6cd5\u5219",
        m3: "\u5e94\u6025\u57fa\u91d1\u4e0e\u4fdd\u9669\u4fdd\u969c",
        m4: "\u5982\u4f55\u89c4\u907f\u6709\u5bb3\u7684\u6d88\u8d39\u6027\u8d1f\u503a",
      },
    },
    "passive-income": {
      title: "\u88ab\u52a8\u6536\u5165\u4e0e\u80a1\u606f\u5206\u914d\u7b56\u7565",
      description: "\u638c\u63e1\u6784\u5efa\u4f4e\u6ce2\u52a8\u9ad8\u80a1\u606f\u6295\u8d44\u7ec4\u5408\u7684\u6838\u5fc3\u6280\u672f\uff0c\u5229\u7528\u6307\u6570\u57fa\u91d1\u3001\u4f18\u8d28\u6d3e\u606f\u80a1\u4ee5\u53ca\u6570\u5b57\u8d44\u4ea7\u4ea7\u751f\u6e90\u6e90\u4e0d\u65ad\u7684\u88ab\u52a8\u73b0\u91d1\u6d41\u6536\u5165\u3002",
      moduleTitles: {
        m1: "\u63ed\u79d8\u88ab\u52a8\u6536\u5165\u7684\u5e95\u5c42\u903b\u8f91",
        m2: "\u9ad8\u80a1\u606f\u80a1\u7968\u6295\u8d44\u5b9e\u6218",
        m3: "\u5229\u7528\u6570\u5b57\u8d44\u4ea7\u8d5a\u53d6\u88ab\u52a8\u6536\u5165",
        m4: "\u7a0e\u52a1\u7b79\u5212\u4e0e\u6295\u8d44\u7ec4\u5408\u7ef4\u62a4",
      },
    },
    "growth-mindset": {
      title: "\u6210\u957f\u578b\u601d\u7ef4\u4e0e\u6210\u529f\u4e60\u60ef",
      description: "\u7a81\u7834\u56fa\u5b9a\u601d\u7ef4\u58c1\u5792\uff0c\u91cd\u5851\u201c\u7ec8\u8eab\u6210\u957f\u201d\u5185\u6838\uff0c\u7528\u5fae\u4e60\u60ef\uff08\u539f\u5b50\u4e60\u60ef\uff09\u7684\u529b\u91cf\u7ba1\u7406\u65e5\u5e38\u751f\u6d3b\uff0c\u5168\u9762\u8fc8\u5411\u8d22\u5bcc\u4e0e\u5fc3\u667a\u53cc\u91cd\u8dc3\u8fc1\u3002",
      moduleTitles: {
        m1: "\u6210\u957f\u578b\u601d\u7ef4 vs \u56fa\u5b9a\u578b\u601d\u7ef4",
        m2: "\u5982\u4f55\u76f4\u9762\u5e76\u514b\u670d\u5bf9\u5931\u8d25\u7684\u6050\u60e7",
        m3: "\u539f\u5b50\u5fae\u4e60\u60ef\u7684\u843d\u5730\u6784\u5efa\u6b65\u9aa4",
        m4: "\u81ea\u5f8b\u4e0e\u6301\u7eed\u6267\u884c\u529b\u7684\u5e95\u5c42\u903b\u8f91",
      },
    },
    "time-management": {
      title: "\u65f6\u95f4\u7ba1\u7406\u4e0e\u9ad8\u6548\u751f\u4ea7\u529b",
      description: "\u638c\u63e1\u756a\u8304\u65f6\u95f4\u5de5\u4f5c\u6cd5\u3001\u827e\u68ee\u8c6a\u5a01\u5c14\u56db\u8c61\u9650\u4f18\u5148\u6cd5\u5219\uff0c\u5e76\u8fd0\u7528\u5fc3\u7406\u6697\u793a\u4e0e\u5de5\u5177\u79d1\u5b66\u6212\u6389\u62d6\u5ef6\u75c7\uff0c\u5927\u5e45\u63d0\u5347\u5de5\u4f5c\u6548\u80fd\u3002",
      moduleTitles: {
        m1: "\u9ad8\u6548\u65f6\u95f4\u7ba1\u7406\u7684\u5e95\u5c42\u903b\u8f91",
        m2: "\u827e\u68ee\u8c6a\u5a01\u5c14\u6838\u5fc3\u4f18\u5148\u77e9\u9635",
        m3: "\u79d1\u5b66\u6212\u6389\u62d6\u5ef6\u75c7\u7684\u5b9e\u64cd\u8bfe",
      },
    },
  },
  ru: {
    "saham-dasar": {
      title: "\u041e\u0441\u043d\u043e\u0432\u044b \u0444\u043e\u043d\u0434\u043e\u0432\u043e\u0433\u043e \u0440\u044b\u043d\u043a\u0430",
      description: "\u041d\u0430\u0447\u043d\u0438\u0442\u0435 \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e \u0438 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e \u0438\u043d\u0432\u0435\u0441\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0432 \u0430\u043a\u0446\u0438\u0438. \u0423\u0437\u043d\u0430\u0439\u0442\u0435, \u043a\u0430\u043a \u0432\u044b\u0431\u0438\u0440\u0430\u0442\u044c \u043d\u0430\u0434\u0435\u0436\u043d\u044b\u0435 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438 \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u0444\u0443\u043d\u0434\u0430\u043c\u0435\u043d\u0442\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u0430\u043d\u0430\u043b\u0438\u0437\u0430, \u0447\u0438\u0442\u0430\u0442\u044c \u0433\u0440\u0430\u0444\u0438\u043a\u0438 \u0438 \u0441\u0442\u0440\u043e\u0438\u0442\u044c \u043f\u043e\u0440\u0442\u0444\u0435\u043b\u044c.",
      moduleTitles: {
        m1: "\u0427\u0442\u043e \u0442\u0430\u043a\u043e\u0435 \u0430\u043a\u0446\u0438\u0438?",
        m2: "\u0424\u0443\u043d\u0434\u0430\u043c\u0435\u043d\u0442\u0430\u043b\u044c\u043d\u044b\u0439 \u0430\u043d\u0430\u043b\u0438\u0437",
        m3: "\u0422\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0430\u043d\u0430\u043b\u0438\u0437",
        m4: "\u041f\u043e\u0440\u0442\u0444\u0435\u043b\u044c\u043d\u044b\u0435 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438",
      },
    },
    "kripto-dasar": {
      title: "\u041e\u0441\u043d\u043e\u0432\u044b \u041a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u044b \u0438 Web3",
      description: "\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u043e \u0440\u0430\u0437\u0431\u0435\u0440\u0438\u0442\u0435\u0441\u044c \u0432 \u043a\u043e\u043d\u0446\u0435\u043f\u0446\u0438\u044f\u0445 \u0431\u043b\u043e\u043a\u0447\u0435\u0439\u043d\u0430, \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442, \u0441\u043c\u0430\u0440\u0442-\u043a\u043e\u043d\u0442\u0440\u0430\u043a\u0442\u043e\u0432, \u0434\u0435\u0446\u0435\u043d\u0442\u0440\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043d\u043d\u044b\u0445 \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432 (DeFi) \u0438 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u0438 \u043b\u0438\u0447\u043d\u044b\u0445 \u043a\u043e\u0448\u0435\u043b\u044c\u043a\u043e\u0432.",
      moduleTitles: {
        m1: "\u0412\u0432\u0435\u0434\u0435\u043d\u0438\u0435 \u0432 \u0431\u043b\u043e\u043a\u0447\u0435\u0439\u043d",
        m2: "\u041a\u0430\u043a \u0443\u0441\u0442\u0440\u043e\u0435\u043d\u044b Bitcoin \u0438 Ethereum",
        m3: "\u041a\u0440\u0438\u043f\u0442\u043e\u043a\u043e\u0448\u0435\u043b\u044c\u043a\u0438 \u0438 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u044c",
        m4: "\u0411\u0443\u0434\u0443\u0449\u0435\u0435 Web3",
      },
    },
    "digital-marketing": {
      title: "\u0421\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u044b\u0439 \u0418\u043d\u0442\u0435\u0440\u043d\u0435\u0442-\u041c\u0430\u0440\u043a\u0435\u0442\u0438\u043d\u0433",
      description: "\u041e\u0441\u0432\u043e\u0439\u0442\u0435 \u0437\u0430\u043f\u0443\u0441\u043a \u043a\u043e\u043d\u0442\u0435\u043a\u0441\u0442\u043d\u043e\u0439 \u0438 \u0442\u0430\u0440\u0433\u0435\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u043e\u0439 \u0440\u0435\u043a\u043b\u0430\u043c\u044b (Google/FB), \u043f\u043e\u0438\u0441\u043a\u043e\u0432\u0443\u044e \u043e\u043f\u0442\u0438\u043c\u0438\u0437\u0430\u0446\u0438\u044e (SEO), \u043f\u043e\u0437\u0438\u0446\u0438\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u0431\u0440\u0435\u043d\u0434\u0430 \u0438 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u0432\u0438\u0440\u0443\u0441\u043d\u043e\u0433\u043e \u043a\u043e\u043d\u0442\u0435\u043d\u0442\u0430.",
      moduleTitles: {
        m1: "\u041e\u0441\u043d\u043e\u0432\u044b \u0438\u043d\u0442\u0435\u0440\u043d\u0435\u0442-\u043c\u0430\u0440\u043a\u0435\u0442\u0438\u043d\u0433\u0430",
        m2: "\u041f\u043e\u0438\u0441\u043a\u043e\u0432\u0430\u044f \u043e\u043f\u0442\u0438\u043c\u0438\u0437\u0430\u0446\u0438\u044f (SEO)",
        m3: "\u041f\u043b\u0430\u0442\u043d\u044b\u0439 \u0442\u0440\u0430\u0444\u0438\u043a (FB, Google Ads)",
        m4: "\u041a\u043e\u043f\u0438\u0440\u0430\u0439\u0442\u0438\u043d\u0433 \u0438 \u043a\u043e\u043d\u0442\u0435\u043d\u0442-\u043c\u0430\u0440\u043a\u0435\u0442\u0438\u043d\u0433",
      },
    },
    "ui-ux-design": {
      title: "\u041e\u0441\u043d\u043e\u0432\u044b UI/UX \u0414\u0438\u0437\u0430\u0439\u043d\u0430",
      description: "\u0418\u0437\u0443\u0447\u0438\u0442\u0435 \u043e\u0441\u043d\u043e\u0432\u043d\u044b\u0435 \u043f\u0440\u0438\u043d\u0446\u0438\u043f\u044b \u043f\u0440\u043e\u0435\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u0445 \u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u043e\u0432 \u0438 \u043e\u043f\u044b\u0442\u0430.",
      moduleTitles: {
        m1: "\u041e\u0441\u043d\u043e\u0432\u044b UI",
        m2: "UX-\u0438\u0441\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u043d\u0438\u044f \u0438 \u0432\u0430\u0439\u0440\u0444\u0440\u0435\u0439\u043c\u0438\u043d\u0433",
      },
    },
    "graphic-design": {
      title: "\u0421\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u044b\u0439 \u0413\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0414\u0438\u0437\u0430\u0439\u043d",
      description: "\u041e\u0441\u0432\u043e\u0439\u0442\u0435 \u0432\u0438\u0437\u0443\u0430\u043b\u044c\u043d\u043e\u0435 \u0438\u0441\u043a\u0443\u0441\u0441\u0442\u0432\u043e, \u043a\u043e\u043c\u043f\u043e\u0437\u0438\u0446\u0438\u044e, \u0442\u0438\u043f\u043e\u0433\u0440\u0430\u0444\u0438\u043a\u0443 \u0438 \u0442\u0435\u043e\u0440\u0438\u044e \u0446\u0432\u0435\u0442\u0430.",
      moduleTitles: {
        m1: "\u0422\u0435\u043e\u0440\u0438\u044f \u0446\u0432\u0435\u0442\u0430 \u0438 \u0442\u0438\u043f\u043e\u0433\u0440\u0430\u0444\u0438\u043a\u0430",
        m2: "\u0412\u0438\u0437\u0443\u0430\u043b\u044c\u043d\u0430\u044f \u043a\u043e\u043c\u043f\u043e\u0437\u0438\u0446\u0438\u044f",
      },
    },
    "mental-health": {
      title: "\u041f\u0441\u0438\u0445\u0438\u0447\u0435\u0441\u043a\u043e\u0435 \u0437\u0434\u043e\u0440\u043e\u0432\u044c\u0435 \u0438 \u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0441\u0442\u0440\u0435\u0441\u0441\u043e\u043c",
      description: "\u0423\u0437\u043d\u0430\u0439\u0442\u0435, \u043a\u0430\u043a \u0441\u043f\u0440\u0430\u0432\u043b\u044f\u0442\u044c\u0441\u044f \u0441\u043e \u0441\u0442\u0440\u0435\u0441\u0441\u043e\u043c, \u043f\u0440\u0430\u043a\u0442\u0438\u043a\u043e\u0432\u0430\u0442\u044c \u043c\u0435\u0434\u0438\u0442\u0430\u0446\u0438\u044e \u0438 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0442\u044c \u0431\u0430\u043b\u0430\u043d\u0441.",
      moduleTitles: {
        m1: "\u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0441\u0442\u0440\u0435\u0441\u0441\u043e\u043c",
        m2: "\u041e\u0441\u043d\u043e\u0432\u044b \u043c\u0435\u0434\u0438\u0442\u0430\u0446\u0438\u0438",
      },
    },
    "health-fitness": {
      title: "\u041e\u0441\u043d\u043e\u0432\u044b \u0437\u0434\u043e\u0440\u043e\u0432\u044c\u044f \u0438 \u0444\u0438\u0442\u043d\u0435\u0441\u0430",
      description: "\u0418\u0437\u0443\u0447\u0438\u0442\u0435 \u043e\u0441\u043d\u043e\u0432\u043d\u044b\u0435 \u043f\u0440\u0438\u043d\u0446\u0438\u043f\u044b \u0444\u0438\u0442\u043d\u0435\u0441\u0430 \u0438 \u044d\u0444\u0444\u0435\u043a\u0442\u0438\u0432\u043d\u044b\u0435 \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u044b \u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043e\u043a.",
      moduleTitles: {
        m1: "\u041e\u0441\u043d\u043e\u0432\u044b \u0444\u0438\u0442\u043d\u0435\u0441\u0430",
        m2: "\u041f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u044b \u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043e\u043a",
      },
    },
    "nutrition-diet": {
      title: "\u041f\u0438\u0442\u0430\u043d\u0438\u0435 \u0438 \u0437\u0434\u043e\u0440\u043e\u0432\u0430\u044f \u0434\u0438\u0435\u0442\u0430",
      description: "\u041f\u043e\u0439\u043c\u0438\u0442\u0435 \u043f\u0438\u0442\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u0432\u0435\u0449\u0435\u0441\u0442\u0432\u0430 \u0438 \u0442\u043e, \u043a\u0430\u043a \u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0441\u0432\u043e\u0439 \u0440\u0430\u0446\u0438\u043e\u043d \u0434\u043b\u044f \u043c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u043e\u0439 \u044d\u043d\u0435\u0440\u0433\u0438\u0438.",
      moduleTitles: {
        m1: "\u041e\u0441\u043d\u043e\u0432\u044b \u043f\u0438\u0442\u0430\u043d\u0438\u044f",
        m2: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438 \u043f\u0438\u0442\u0430\u043d\u0438\u044f",
      },
    },
    "web-dev": {
      title: "\u0421\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u0430\u044f \u0412\u0435\u0431-\u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0430",
      description: "\u041e\u0441\u0432\u043e\u0439\u0442\u0435 \u043e\u0441\u043d\u043e\u0432\u044b \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u043e\u0432 \u0441 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u0435\u043c HTML, CSS, Javascript \u0438 \u043d\u0430\u0447\u043d\u0438\u0442\u0435 \u043a\u0430\u0440\u044c\u0435\u0440\u0443 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a\u0430.",
      moduleTitles: {
        m1: "\u041e\u0441\u043d\u043e\u0432\u044b HTML \u0438 CSS",
        m2: "\u0412\u0432\u0435\u0434\u0435\u043d\u0438\u0435 \u0432 Javascript",
      },
    },
    "data-science": {
      title: "\u0412\u0432\u0435\u0434\u0435\u043d\u0438\u0435 \u0432 Data Science",
      description: "\u0418\u0437\u0443\u0447\u0438\u0442\u0435 \u043c\u0435\u0442\u043e\u0434\u044b \u0430\u043d\u0430\u043b\u0438\u0437\u0430 \u0434\u0430\u043d\u043d\u044b\u0445, \u043e\u0441\u043d\u043e\u0432\u044b \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0438 \u0438 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u0435 Python \u0434\u043b\u044f \u0440\u0435\u0448\u0435\u043d\u0438\u044f \u0437\u0430\u0434\u0430\u0447.",
      moduleTitles: {
        m1: "\u041e\u0441\u043d\u043e\u0432\u044b \u0430\u043d\u0430\u043b\u0438\u0437\u0430 \u0434\u0430\u043d\u043d\u044b\u0445",
        m2: "Python \u0434\u043b\u044f Data Science",
      },
    },
    "ai-tools": {
      title: "\u0418\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b \u0418\u0418 \u0434\u043b\u044f \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u0438",
      description: "\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u0438 \u0418\u0418, \u0442\u0430\u043a\u0438\u0445 \u043a\u0430\u043a ChatGPT \u0438 Midjourney, \u0434\u043b\u044f \u0443\u0441\u043a\u043e\u0440\u0435\u043d\u0438\u044f \u0440\u0430\u0431\u043e\u0447\u0435\u0433\u043e \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0430.",
      moduleTitles: {
        m1: "\u041e\u0441\u043d\u043e\u0432\u044b \u043f\u0440\u043e\u043c\u043f\u0442-\u0438\u043d\u0436\u0438\u043d\u0438\u0440\u0438\u043d\u0433\u0430",
        m2: "\u0418\u0418 \u0434\u043b\u044f \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f \u043a\u043e\u043d\u0442\u0435\u043d\u0442\u0430",
      },
    },
    "laporan-keuangan": {
      title: "\u0410\u043d\u0430\u043b\u0438\u0437 \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u0445 \u043e\u0442\u0447\u0435\u0442\u043e\u0432",
      description: "\u041a\u0430\u043a \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e \u0447\u0438\u0442\u0430\u0442\u044c \u0431\u0430\u043b\u0430\u043d\u0441\u044b, \u043e\u0442\u0447\u0435\u0442\u044b \u043e \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u0445 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u0430\u0445 \u0438 \u0434\u0432\u0438\u0436\u0435\u043d\u0438\u0438 \u0434\u0435\u043d\u0435\u0436\u043d\u044b\u0445 \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u0434\u043b\u044f \u043e\u0446\u0435\u043d\u043a\u0438 \u0441\u0442\u0430\u0431\u0438\u043b\u044c\u043d\u043e\u0441\u0442\u0438 \u0431\u0438\u0437\u043d\u0435\u0441\u0430 \u043f\u0435\u0440\u0435\u0434 \u0438\u043d\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u044f\u043c\u0438.",
      moduleTitles: {
        m1: "\u0422\u0440\u0438 \u0433\u043b\u0430\u0432\u043d\u044b\u0445 \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u0445 \u043e\u0442\u0447\u0435\u0442\u0430",
        m2: "\u0410\u043d\u0430\u043b\u0438\u0437 \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u0445 \u043a\u043e\u044d\u0444\u0444\u0438\u0446\u0438\u0435\u043d\u0442\u043e\u0432",
        m3: "\u0412\u044b\u044f\u0432\u043b\u0435\u043d\u0438\u0435 \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u0445 \u0443\u043b\u043e\u0432\u043e\u043a",
      },
    },
    "startup-bisnis": {
      title: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044f \u0421\u0442\u0430\u0440\u0442\u0430\u043f\u0430 \u0438 \u0411\u0438\u0437\u043d\u0435\u0441\u0430",
      description: "\u041f\u0440\u043e\u0439\u0434\u0438\u0442\u0435 \u043f\u0443\u0442\u044c \u043e\u0442 \u0438\u0434\u0435\u0438 \u0434\u043e \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f \u0440\u0430\u0431\u043e\u0442\u0430\u044e\u0449\u0435\u0433\u043e \u0431\u0438\u0437\u043d\u0435\u0441\u0430. \u041f\u043e\u0439\u043c\u0438\u0442\u0435 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u044b \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438 \u0440\u044b\u043d\u043a\u0430, \u044d\u043a\u043e\u043d\u043e\u043c\u0438\u043a\u0443 \u0441\u0442\u0430\u0440\u0442\u0430\u043f\u0430, \u0440\u0430\u0443\u043d\u0434\u044b \u0444\u0438\u043d\u0430\u043d\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f \u0438 \u043c\u0435\u0442\u043e\u0434\u044b \u0431\u044b\u0441\u0442\u0440\u043e\u0433\u043e \u0440\u043e\u0441\u0442\u0430.",
      moduleTitles: {
        m1: "\u0412\u0430\u043b\u0438\u0434\u0430\u0446\u0438\u044f \u0431\u0438\u0437\u043d\u0435\u0441-\u0438\u0434\u0435\u0438",
        m2: "\u0411\u0438\u0437\u043d\u0435\u0441-\u043c\u043e\u0434\u0435\u043b\u044c Lean Canvas",
        m3: "\u041f\u0440\u0438\u0432\u043b\u0435\u0447\u0435\u043d\u0438\u0435 \u043f\u0435\u0440\u0432\u044b\u0445 \u0438\u043d\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0439",
        m4: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438 \u043c\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f",
      },
    },
    "ecommerce-dasar": {
      title: "E-Commerce \u0438 \u0414\u0440\u043e\u043f\u0448\u0438\u043f\u043f\u0438\u043d\u0433",
      description: "\u0421\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u043f\u0440\u0438\u0431\u044b\u043b\u044c\u043d\u044b\u0439 \u043e\u043d\u043b\u0430\u0439\u043d-\u043c\u0430\u0433\u0430\u0437\u0438\u043d \u0441 \u043d\u0443\u043b\u044f, \u043d\u0430\u0443\u0447\u0438\u0442\u0435\u0441\u044c \u043d\u0430\u0445\u043e\u0434\u0438\u0442\u044c \u0432\u0438\u0440\u0443\u0441\u043d\u044b\u0435 \u0442\u043e\u0432\u0430\u0440\u044b \u0438 \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043b\u043e\u0433\u0438\u0441\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0446\u0435\u043f\u043e\u0447\u043a\u0438 \u0431\u0435\u0437 \u0437\u0430\u043a\u0443\u043f\u043a\u0438 \u0441\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0433\u043e \u0441\u043a\u043b\u0430\u0434\u0430.",
      moduleTitles: {
        m1: "\u0411\u0438\u0437\u043d\u0435\u0441-\u043c\u043e\u0434\u0435\u043b\u0438 \u0432 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043a\u043e\u043c\u043c\u0435\u0440\u0446\u0438\u0438",
        m2: "\u041f\u043e\u0438\u0441\u043a \u0438 \u0430\u043d\u0430\u043b\u0438\u0437 \u043f\u0440\u0438\u0431\u044b\u043b\u044c\u043d\u044b\u0445 \u0442\u043e\u0432\u0430\u0440\u043e\u0432",
        m3: "\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u043e\u043d\u043b\u0430\u0439\u043d-\u043c\u0430\u0433\u0430\u0437\u0438\u043d\u0430 \u043d\u0430 Shopify",
      },
    },
    "personal-finance": {
      title: "\u041b\u0438\u0447\u043d\u044b\u0435 \u0424\u0438\u043d\u0430\u043d\u0441\u044b \u0438 \u0411\u044e\u0434\u0436\u0435\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435",
      description: "\u041d\u0430\u0443\u0447\u0438\u0442\u0435\u0441\u044c \u0440\u0430\u0437\u0443\u043c\u043d\u043e \u043f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0441\u0432\u043e\u0438 \u0434\u043e\u0445\u043e\u0434\u044b, \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u0430\u0432\u0438\u043b\u043e \u0440\u0430\u0441\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u0438\u044f 50/30/20, \u0438\u0437\u0431\u0435\u0433\u0430\u0442\u044c \u043f\u043b\u043e\u0445\u0438\u0445 \u0434\u043e\u043b\u0433\u043e\u0432 \u0438 \u0431\u044b\u0441\u0442\u0440\u043e \u0444\u043e\u0440\u043c\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0440\u0435\u0437\u0435\u0440\u0432\u043d\u044b\u0439 \u0444\u043e\u043d\u0434.",
      moduleTitles: {
        m1: "\u041f\u0440\u0438\u043d\u0446\u0438\u043f\u044b \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u044f \u0434\u0435\u043d\u0435\u0436\u043d\u044b\u0445 \u043f\u043e\u0442\u043e\u043a\u043e\u0432",
        m2: "\u041f\u0440\u0430\u0432\u0438\u043b\u043e \u0441\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u0431\u044e\u0434\u0436\u0435\u0442\u0430 50/30/20",
        m3: "\u0420\u0435\u0437\u0435\u0440\u0432\u043d\u044b\u0439 \u0444\u043e\u043d\u0434 \u0438 \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u0430\u044f \u0437\u0430\u0449\u0438\u0442\u0430",
        m4: "\u0418\u0437\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043e\u0442 \u043f\u043e\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u0445 \u0434\u043e\u043b\u0433\u043e\u0432",
      },
    },
    "passive-income": {
      title: "\u041f\u0430\u0441\u0441\u0438\u0432\u043d\u044b\u0439 \u0414\u043e\u0445\u043e\u0434 \u0438 \u0414\u0438\u0432\u0438\u0434\u0435\u043d\u0434\u044b",
      description: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044f \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f \u043f\u0430\u0441\u0441\u0438\u0432\u043d\u043e\u0433\u043e \u0434\u0435\u043d\u0435\u0436\u043d\u043e\u0433\u043e \u043f\u043e\u0442\u043e\u043a\u0430 \u0438\u0437 \u0434\u0438\u0432\u0438\u0434\u0435\u043d\u0434\u043d\u044b\u0445 \u0430\u043a\u0446\u0438\u0439, \u043d\u0430\u0434\u0435\u0436\u043d\u044b\u0445 \u0438\u043d\u0434\u0435\u043a\u0441\u043d\u044b\u0445 \u0444\u043e\u043d\u0434\u043e\u0432 \u0438 \u0441\u0442\u0435\u0439\u043a\u0438\u043d\u0433\u0430 \u0446\u0438\u0444\u0440\u043e\u0432\u044b\u0445 \u0430\u043a\u0442\u0438\u0432\u043e\u0432.",
      moduleTitles: {
        m1: "\u041a\u043e\u043d\u0446\u0435\u043f\u0446\u0438\u044f \u043f\u0430\u0441\u0441\u0438\u0432\u043d\u043e\u0433\u043e \u0434\u043e\u0445\u043e\u0434\u0430",
        m2: "\u0418\u043d\u0432\u0435\u0441\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u0432 \u0434\u0438\u0432\u0438\u0434\u0435\u043d\u0434\u043d\u044b\u0435 \u0430\u043a\u0446\u0438\u0438",
        m3: "\u041f\u0430\u0441\u0441\u0438\u0432\u043d\u044b\u0439 \u0434\u043e\u0445\u043e\u0434 \u043e\u0442 \u0446\u0438\u0444\u0440\u043e\u0432\u044b\u0445 \u0430\u043a\u0442\u0438\u0432\u043e\u0432",
        m4: "\u041d\u0430\u043b\u043e\u0433\u0438 \u0438 \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043f\u043e\u0440\u0442\u0444\u0435\u043b\u0435\u043c",
      },
    },
    "growth-mindset": {
      title: "Growth Mindset \u0438 \u041f\u043e\u043b\u0435\u0437\u043d\u044b\u0435 \u041f\u0440\u0438\u0432\u044b\u0447\u043a\u0438",
      description: "\u0421\u0444\u043e\u0440\u043c\u0438\u0440\u0443\u0439\u0442\u0435 \u043f\u0441\u0438\u0445\u043e\u043b\u043e\u0433\u0438\u044e \u0440\u043e\u0441\u0442\u0430, \u0440\u0430\u0437\u0440\u0443\u0448\u044c\u0442\u0435 \u0432\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u0438\u0435 \u043e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u0438\u044f \u0438 \u0431\u0430\u0440\u044c\u0435\u0440\u044b, \u0432\u043d\u0435\u0434\u0440\u0438\u0442\u0435 \u043f\u043e\u043b\u0435\u0437\u043d\u044b\u0435 \u043c\u0438\u043a\u0440\u043e\u043f\u0440\u0438\u0432\u044b\u0447\u043a\u0438 (Atomic Habits) \u0434\u043b\u044f \u0434\u043e\u0441\u0442\u0438\u0436\u0435\u043d\u0438\u044f \u0431\u043e\u043b\u044c\u0448\u0438\u0445 \u0446\u0435\u043b\u0435\u0439.",
      moduleTitles: {
        m1: "\u0413\u0438\u0431\u043a\u043e\u0435 \u0441\u043e\u0437\u043d\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0442\u0438\u0432 \u0437\u0430\u0436\u0430\u0442\u043e\u0433\u043e",
        m2: "\u041f\u0440\u0435\u043e\u0434\u043e\u043b\u0435\u043d\u0438\u0435 \u0441\u0442\u0440\u0430\u0445\u0430 \u043d\u0435\u0443\u0434\u0430\u0447",
        m3: "\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u043c\u0438\u043a\u0440\u043e\u043f\u0440\u0438\u0432\u044b\u0447\u0435\u043a",
        m4: "\u0421\u0430\u043c\u043e\u0434\u0438\u0441\u0446\u0438\u043f\u043b\u0438\u043d\u0430 \u0438 \u0441\u0438\u0441\u0442\u0435\u043c\u043d\u043e\u0441\u0442\u044c",
      },
    },
    "time-management": {
      title: "\u0422\u0430\u0439\u043c-\u043c\u0435\u043d\u0435\u0434\u0436\u043c\u0435\u043d\u0442 \u0438 \u041f\u0440\u043e\u0434\u0443\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c",
      description: "\u041e\u0441\u0432\u043e\u0439\u0442\u0435 \u043c\u0430\u0442\u0440\u0438\u0446\u0443 \u043f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442\u043e\u0432 \u042d\u0439\u0437\u0435\u043d\u0445\u0430\u0443\u044d\u0440\u0430, Pomodoro-\u0442\u0430\u0439\u043c\u0435\u0440 \u0438 \u043f\u0441\u0438\u0445\u043e\u043b\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u043f\u0440\u0438\u0435\u043c\u044b \u0431\u043e\u0440\u044c\u0431\u044b \u0441 \u043f\u0440\u043e\u043a\u0440\u0430\u0441\u0442\u0438\u043d\u0430\u0446\u0438\u0435\u0439 \u0434\u043b\u044f \u044d\u0444\u0444\u0435\u043a\u0442\u0438\u0432\u043d\u043e\u0439 \u0440\u0430\u0431\u043e\u0442\u044b \u0431\u0435\u0437 \u0432\u044b\u0433\u043e\u0440\u0430\u043d\u0438\u044f.",
      moduleTitles: {
        m1: "\u041f\u0440\u0438\u043d\u0446\u0438\u043f\u044b \u044d\u0444\u0444\u0435\u043a\u0442\u0438\u0432\u043d\u043e\u0433\u043e \u0442\u0430\u0439\u043c-\u043c\u0435\u043d\u0435\u0434\u0436\u043c\u0435\u043d\u0442\u0430",
        m2: "\u041c\u0430\u0442\u0440\u0438\u0446\u0430 \u043f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442\u043e\u0432 \u042d\u0439\u0437\u0435\u043d\u0445\u0430\u0443\u044d\u0440\u0430",
        m3: "\u041f\u043e\u0431\u0435\u0434\u0430 \u043d\u0430\u0434 \u043f\u0440\u043e\u043a\u0440\u0430\u0441\u0442\u0438\u043d\u0430\u0446\u0438\u0435\u0439",
      },
    },
  },
  ar: {
    "saham-dasar": {
      title: "\u0623\u0633\u0627\u0633\u064a\u0627\u062a \u0633\u0648\u0642 \u0627\u0644\u0623\u0633\u0647\u0645",
      description: "\u0627\u0628\u062f\u0623 \u0627\u0644\u0627\u0633\u062a\u062b\u0645\u0627\u0631 \u0641\u064a \u0627\u0644\u0623\u0633\u0647\u0645 \u0628\u0637\u0631\u064a\u0642\u0629 \u0635\u062d\u064a\u062d\u0629 \u0648\u0622\u0645\u0646\u0629. \u062a\u0639\u0644\u0645 \u0643\u064a\u0641\u064a\u0629 \u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u0623\u0633\u0647\u0645 \u0628\u0646\u0627\u0621\u064b \u0639\u0644\u0649 \u0627\u0644\u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0623\u0633\u0627\u0633\u064a \u0648\u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064a\u0627\u0646\u064a\u0629 \u0648\u0635\u064a\u0627\u063a\u0629 \u0645\u062d\u0641\u0638\u0629 \u0627\u0633\u062a\u062b\u0645\u0627\u0631\u064a\u0629 \u0645\u062a\u0648\u0627\u0632\u0646\u0629.",
      moduleTitles: {
        m1: "\u0645\u0627 \u0647\u064a \u0627\u0644\u0623\u0633\u0647\u0645\u061f",
        m2: "\u0627\u0644\u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0623\u0633\u0627\u0633\u064a",
        m3: "\u0627\u0644\u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0641\u0646\u064a",
        m4: "\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0627\u062a \u0627\u0644\u0645\u062d\u0641\u0638\u0629",
      },
    },
    "kripto-dasar": {
      title: "\u0623\u0633\u0627\u0633\u064a\u0627\u062a \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u0648Web3",
      description: "\u0627\u0641\u0647\u0645 \u0628\u0627\u0644\u062a\u0641\u0635\u064a\u0644 \u062a\u0643\u0646\u0648\u0644\u0648\u062c\u064a\u0627 \u0627\u0644\u0628\u0644\u0648\u0643\u0634\u064a\u0646 \u0648\u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0645\u0634\u0641\u0631\u0629 \u0648\u0627\u0644\u0639\u0642\u0648\u062f \u0627\u0644\u0630\u0643\u064a\u0629 \u0648\u0625\u062f\u0627\u0631\u0629 \u0645\u062d\u0627\u0641\u0638 \u0627\u0644\u062a\u0634\u0641\u064a\u0631 \u0648\u0627\u0644\u0641\u0631\u0635 \u0627\u0644\u0643\u0627\u0645\u0646\u0629 \u0641\u064a \u0627\u0644\u062a\u0645\u0648\u064a\u0644 \u0627\u0644\u0644\u0627\u0645\u0631\u0643\u0632\u064a (DeFi).",
      moduleTitles: {
        m1: "\u0645\u0642\u062f\u0645\u0629 \u0641\u064a \u0627\u0644\u0628\u0644\u0648\u0643\u0634\u064a\u0646",
        m2: "\u0643\u064a\u0641 \u064a\u0639\u0645\u0644 \u0627\u0644\u0628\u064a\u062a\u0643\u0648\u064a\u0646 \u0648\u0627\u0644\u0625\u064a\u062b\u064a\u0631\u064a\u0648\u0645",
        m3: "\u0645\u062d\u0627\u0641\u0638 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u0648\u0627\u0644\u0623\u0645\u0627\u0646",
        m4: "\u0645\u0633\u062a\u0642\u0628\u0644 Web3",
      },
    },
    "digital-marketing": {
      title: "\u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0627\u0644\u0631\u0642\u0645\u064a \u0627\u0644\u062d\u062f\u064a\u062b",
      description: "\u0627\u062d\u062a\u0631\u0641 \u0642\u0646\u0648\u0627\u062a \u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0627\u0644\u0631\u0642\u0645\u064a \u0627\u0644\u062d\u062f\u064a\u062b\u0629: \u062a\u062d\u0633\u064a\u0646 \u0645\u062d\u0631\u0643\u0627\u062a \u0627\u0644\u0628\u062d\u062b (SEO)\u060c \u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u062d\u0645\u0644\u0627\u062a \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u064a\u0629 \u0627\u0644\u0645\u062f\u0641\u0648\u0639\u0629 (\u0641\u064a\u0633\u0628\u0648\u0643 \u0648\u062c\u0648\u062c\u0644)\u060c \u0648\u0643\u062a\u0627\u0628\u0629 \u0627\u0644\u0646\u0635\u0648\u0635 \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u064a\u0629 \u0627\u0644\u062c\u0627\u0630\u0628\u0629 \u0644\u0644\u0645\u0628\u064a\u0639\u0627\u062a.",
      moduleTitles: {
        m1: "\u0623\u0633\u0633 \u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0627\u0644\u0631\u0642\u0645\u064a",
        m2: "\u062a\u062d\u0633\u064a\u0646 \u0645\u062d\u0631\u0643\u0627\u062a \u0627\u0644\u0628\u062d\u062b (SEO)",
        m3: "\u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u062f\u0641\u0648\u0639\u0629 (\u0641\u064a\u0633\u0628\u0648\u0643\u060c \u062c\u0648\u062c\u0644)",
        m4: "\u0643\u062a\u0627\u0628\u0629 \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062a \u0648\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629 \u0627\u0644\u0645\u062d\u062a\u0648\u0649",
      },
    },
    "ui-ux-design": {
      title: "\u0623\u0633\u0627\u0633\u064a\u0627\u062a \u062a\u0635\u0645\u064a\u0645 \u0648\u0627\u062c\u0647\u0629 \u0648\u062a\u062c\u0631\u0628\u0629 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645",
      description: "\u062a\u0639\u0644\u0645 \u0627\u0644\u0645\u0628\u0627\u062f\u0626 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629 \u0644\u062a\u0635\u0645\u064a\u0645 \u0648\u0627\u062c\u0647\u0629 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645 \u0648\u062a\u062c\u0631\u0628\u0629 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645 \u0644\u0644\u062a\u0637\u0628\u064a\u0642\u0627\u062a \u0627\u0644\u062d\u062f\u064a\u062b\u0629.",
      moduleTitles: {
        m1: "\u0623\u0633\u0627\u0633\u064a\u0627\u062a \u0648\u0627\u062c\u0647\u0629 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645",
        m2: "\u0628\u062d\u062b \u062a\u062c\u0631\u0628\u0629 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645 \u0648\u0627\u0644\u0625\u0637\u0627\u0631\u0627\u062a \u0627\u0644\u0634\u0628\u0643\u064a\u0629",
      },
    },
    "graphic-design": {
      title: "\u0627\u0644\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u062c\u0631\u0627\u0641\u064a\u0643\u064a \u0627\u0644\u062d\u062f\u064a\u062b",
      description: "\u0623\u062a\u0642\u0646 \u0627\u0644\u0641\u0646 \u0627\u0644\u0645\u0631\u0626\u064a \u0648\u0627\u0644\u062a\u0643\u0648\u064a\u0646 \u0648\u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0648\u0646\u0638\u0631\u064a\u0629 \u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u0644\u0625\u0646\u0634\u0627\u0621 \u062a\u0635\u0645\u064a\u0645\u0627\u062a \u0645\u0630\u0647\u0644\u0629.",
      moduleTitles: {
        m1: "\u0646\u0638\u0631\u064a\u0629 \u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u0648\u0627\u0644\u0637\u0628\u0627\u0639\u0629",
        m2: "\u0627\u0644\u062a\u0643\u0648\u064a\u0646 \u0627\u0644\u0645\u0631\u0626\u064a",
      },
    },
    "mental-health": {
      title: "\u0627\u0644\u0635\u062d\u0629 \u0627\u0644\u0646\u0641\u0633\u064a\u0629 \u0648\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0636\u063a\u0648\u0637",
      description: "\u062a\u0639\u0644\u0645 \u0643\u064a\u0641\u064a\u0629 \u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0636\u063a\u0637 \u0627\u0644\u0646\u0641\u0633\u064a\u060c \u0648\u0645\u0645\u0627\u0631\u0633\u0629 \u0627\u0644\u062a\u0623\u0645\u0644\u060c \u0648\u0627\u0644\u062d\u0641\u0627\u0638 \u0639\u0644\u0649 \u062a\u0648\u0627\u0632\u0646 \u0635\u062d\u064a.",
      moduleTitles: {
        m1: "\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0636\u063a\u0648\u0637",
        m2: "\u0623\u0633\u0627\u0633\u064a\u0627\u062a \u0627\u0644\u062a\u0623\u0645\u0644",
      },
    },
    "health-fitness": {
      title: "\u0623\u0633\u0627\u0633\u064a\u0627\u062a \u0627\u0644\u0635\u062d\u0629 \u0648\u0627\u0644\u0644\u064a\u0627\u0642\u0629 \u0627\u0644\u0628\u062f\u0646\u064a\u0647",
      description: "\u062a\u0639\u0644\u0645 \u0627\u0644\u0645\u0628\u0627\u062f\u0626 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629 \u0644\u0644\u064a\u0627\u0642\u0629 \u0627\u0644\u0628\u062f\u0646\u064a\u0629 \u0648\u0628\u0631\u0627\u0645\u062c \u0627\u0644\u062a\u0645\u0631\u064a\u0646 \u0627\u0644\u0641\u0639\u0627\u0644\u0629.",
      moduleTitles: {
        m1: "\u0623\u0633\u0627\u0633\u064a\u0627\u062a \u0627\u0644\u0644\u064a\u0627\u0642\u0629",
        m2: "\u0628\u0631\u0627\u0645\u062c \u0627\u0644\u062a\u0645\u0631\u064a\u0646",
      },
    },
    "nutrition-diet": {
      title: "\u0627\u0644\u062a\u063a\u0630\u064a\u0629 \u0648\u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u063a\u0630\u0627\u0626\u064a \u0627\u0644\u0635\u062d\u064a",
      description: "\u0627\u0641\u0647\u0645 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u063a\u0630\u0627\u0626\u064a\u0629 \u0648\u0643\u064a\u0641\u064a\u0629 \u062a\u0646\u0638\u064a\u0645 \u0646\u0638\u0627\u0645\u0643 \u0627\u0644\u063a\u0630\u0627\u0626\u064a \u0644\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0623\u0642\u0635\u0649 \u0637\u0627\u0642\u0629.",
      moduleTitles: {
        m1: "\u0623\u0633\u0627\u0633\u064a\u0627\u062a \u0627\u0644\u062a\u063a\u0630\u064a\u0629",
        m2: "\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0627\u062a \u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u063a\u0630\u0627\u0626\u064a",
      },
    },
    "web-dev": {
      title: "\u062a\u0637\u0648\u064a\u0631 \u0627\u0644\u0648\u064a\u0628 \u0627\u0644\u062d\u062f\u064a\u062b",
      description: "\u0623\u062a\u0642\u0646 \u0623\u0633\u0627\u0633\u064a\u0627\u062a \u0625\u0646\u0634\u0627\u0621 \u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0648\u064a\u0628 \u0628\u0627\u0633\u062a\u062e\u062f\u0627\u0645 HTML \u0648 CSS \u0648 Javascript \u0648\u0627\u0628\u062f\u0623 \u062d\u064a\u0627\u062a\u0643 \u0627\u0644\u0645\u0647\u0646\u064a\u0629 \u0643\u0645\u0637\u0648\u0631 \u0648\u064a\u0628.",
      moduleTitles: {
        m1: "\u0623\u0633\u0627\u0633\u064a\u0627\u062a HTML \u0648 CSS",
        m2: "\u0645\u0642\u062f\u0645\u0629 \u0641\u064a Javascript",
      },
    },
    "data-science": {
      title: "\u0645\u0642\u062f\u0645\u0629 \u0641\u064a \u0639\u0644\u0645 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a",
      description: "\u062a\u0639\u0644\u0645 \u0643\u064a\u0641\u064a\u0629 \u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0648\u0641\u0647\u0645 \u0627\u0644\u0625\u062d\u0635\u0627\u0626\u064a\u0627\u062a \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629 \u0648\u0627\u0633\u062a\u062e\u062f\u0627\u0645 Python \u0644\u062d\u0644 \u0627\u0644\u0645\u0634\u0643\u0644\u0627\u062a.",
      moduleTitles: {
        m1: "\u0623\u0633\u0627\u0633\u064a\u0627\u062a \u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a",
        m2: "Python \u0644\u0639\u0644\u0645 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a",
      },
    },
    "ai-tools": {
      title: "\u0623\u062f\u0648\u0627\u062a \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0644\u0644\u0625\u0646\u062a\u0627\u062c\u064a\u0629",
      description: "\u0627\u0633\u062a\u0641\u062f \u0645\u0646 \u0642\u0648\u0629 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0645\u062b\u0644 ChatGPT \u0648 Midjourney \u0644\u062a\u0633\u0631\u064a\u0639 \u0633\u064a\u0631 \u0639\u0645\u0644\u0643 \u0627\u0644\u064a\u0648\u0645\u064a.",
      moduleTitles: {
        m1: "\u0647\u0646\u062f\u0633\u0629 \u0627\u0644\u0623\u0648\u0627\u0645\u0631 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629",
        m2: "\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0644\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u062d\u062a\u0648\u0649",
      },
    },
    "laporan-keuangan": {
      title: "\u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u0627\u0644\u0645\u0627\u0644\u064a\u0629",
      description: "\u0643\u064a\u0641\u064a\u0629 \u0642\u0631\u0627\u0621\u0629 \u0648\u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0645\u064a\u0632\u0627\u0646\u064a\u0629 \u0627\u0644\u0639\u0645\u0648\u0645\u064a\u0629 \u0648\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062f\u062e\u0644 \u0648\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062a\u062f\u0641\u0642\u0627\u062a \u0627\u0644\u0646\u0642\u062f\u064a\u0629 \u0644\u062a\u0642\u064a\u064a\u0645 \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0645\u0627\u0644\u064a \u0627\u0644\u062d\u0642\u064a\u0642\u064a \u0644\u0644\u0634\u0631\u0643\u0627\u062a \u0642\u0628\u0644 \u0627\u062a\u062e\u0627\u0630 \u0623\u064a \u0642\u0631\u0627\u0631 \u0627\u0633\u062a\u062b\u0645\u0627\u0631\u064a.",
      moduleTitles: {
        m1: "\u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u0627\u0644\u0645\u0627\u0644\u064a\u0629 \u0627\u0644\u062b\u0644\u0627\u062b \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629",
        m2: "\u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0646\u0633\u0628 \u0627\u0644\u0645\u0627\u0644\u064a\u0629",
        m3: "\u0643\u0634\u0641 \u0627\u0644\u062a\u0644\u0627\u0639\u0628 \u0627\u0644\u0645\u0627\u0644\u064a",
      },
    },
    "startup-bisnis": {
      title: "\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629 \u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0627\u0644\u0646\u0627\u0634\u0626\u0629 \u0648\u0627\u0644\u0623\u0639\u0645\u0627\u0644",
      description: "\u0627\u0628\u0646\u0650 \u0645\u0634\u0631\u0648\u0639\u0643 \u0627\u0644\u0631\u064a\u0627\u062f\u064a \u0645\u0646 \u0645\u062c\u0631\u062f \u0641\u0643\u0631\u0629 \u0625\u0644\u0649 \u0627\u0644\u062a\u0637\u0628\u064a\u0642 \u0627\u0644\u0641\u0639\u0644\u064a \u0641\u064a \u0627\u0644\u0633\u0648\u0642. \u062a\u063a\u0637\u064a \u0627\u0644\u062f\u0648\u0631\u0629 \u062f\u0631\u0627\u0633\u0629 \u062c\u062f\u0648\u0649 \u0627\u0644\u0623\u0641\u0643\u0627\u0631\u060c \u0646\u0645\u0648\u0630\u062c \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0631\u0646\u060c \u062e\u0637\u0637 \u0627\u0644\u062a\u0645\u0648\u064a\u0644 \u0648\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0627\u062a \u0627\u0644\u0646\u0645\u0648.",
      moduleTitles: {
        m1: "\u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0641\u0643\u0631\u0629 \u0627\u0644\u0639\u0645\u0644",
        m2: "\u0645\u062e\u0637\u0637 \u0646\u0645\u0648\u0630\u062c \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0631\u0646",
        m3: "\u062a\u0623\u0645\u064a\u0646 \u0627\u0644\u062a\u0645\u0648\u064a\u0644 \u0627\u0644\u0623\u0648\u0644\u064a",
        m4: "\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0627\u062a \u0627\u0644\u062a\u0648\u0633\u0639 \u0648\u0627\u0644\u0646\u0645\u0648",
      },
    },
    "ecommerce-dasar": {
      title: "\u0627\u062d\u062a\u0631\u0627\u0641 \u0627\u0644\u062a\u062c\u0627\u0631\u0629 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0629 \u0648\u0627\u0644\u062f\u0631\u0648\u0628 \u0634\u064a\u0628\u0646\u062c",
      description: "\u0642\u0645 \u0628\u0625\u0646\u0634\u0627\u0621 \u0645\u062a\u062c\u0631\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0627\u0644\u062e\u0627\u0635\u060c \u0648\u062a\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u0637\u0631\u0642 \u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0623\u0643\u062b\u0631 \u0645\u0628\u064a\u0639\u0627\u064b \u0648\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0631\u062f\u064a\u0646 \u0648\u0627\u0644\u0634\u062d\u0646 \u062f\u0648\u0646 \u0627\u0644\u062d\u0627\u062c\u0629 \u0644\u0644\u0627\u062d\u062a\u0641\u0627\u0638 \u0628\u0645\u062e\u0632\u0648\u0646 \u0641\u0639\u0644\u064a.",
      moduleTitles: {
        m1: "\u0646\u0645\u0627\u0630\u062c \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062a\u062c\u0627\u0631\u0629 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0629",
        m2: "\u0627\u0644\u0628\u062d\u062b \u0639\u0646 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0645\u0631\u0628\u062d\u0629",
        m3: "\u0628\u0646\u0627\u0621 \u0645\u062a\u062c\u0631 Shopify",
      },
    },
    "personal-finance": {
      title: "\u0627\u0644\u0645\u0627\u0644\u064a\u0629 \u0627\u0644\u0634\u062e\u0635\u064a\u0629 \u0648\u0627\u0644\u062a\u062e\u0637\u064a\u0637 \u0627\u0644\u0645\u0627\u0644\u064a",
      description: "\u0633\u064a\u0637\u0631 \u0639\u0644\u0649 \u062a\u062f\u0641\u0642\u0627\u062a\u0643 \u0627\u0644\u0645\u0627\u0644\u064a\u0629 \u0627\u0644\u0634\u062e\u0635\u064a\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644. \u062a\u0639\u0644\u0645 \u0623\u0633\u0627\u0644\u064a\u0628 \u0627\u0644\u0627\u062f\u062e\u0627\u0631 \u0648\u0627\u0644\u0625\u0646\u0641\u0627\u0642 \u0627\u0644\u0630\u0643\u064a \u0628\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0642\u0627\u0639\u062f\u0629 50/30/20 \u0648\u0628\u0646\u0627\u0621 \u0635\u0646\u062f\u0648\u0642 \u0644\u0644\u0637\u0648\u0627\u0631\u0626 \u0644\u062d\u0645\u0627\u064a\u0629 \u0646\u0641\u0633\u0643.",
      moduleTitles: {
        m1: "\u0645\u0628\u0627\u062f\u0626 \u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u062a\u062f\u0641\u0642 \u0627\u0644\u0646\u0642\u062f\u064a",
        m2: "\u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0645\u064a\u0632\u0627\u0646\u064a\u0629 50/30/20",
        m3: "\u0635\u0646\u062f\u0648\u0642 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0648\u0627\u0644\u062d\u0645\u0627\u064a\u0629",
        m4: "\u062a\u062c\u0646\u0628 \u0627\u0644\u062f\u064a\u0648\u0646 \u0627\u0644\u0627\u0633\u062a\u0647\u0644\u0627\u0643\u064a\u0629 \u0627\u0644\u0633\u064a\u0626\u0629",
      },
    },
    "passive-income": {
      title: "\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0627\u062a \u0627\u0644\u062f\u062e\u0644 \u0627\u0644\u0633\u0644\u0628\u064a \u0648\u0627\u0644\u0623\u0631\u0628\u0627\u062d",
      description: "\u062a\u0639\u0631\u0641 \u0639\u0644\u0649 \u0643\u064a\u0641\u064a\u0629 \u0635\u064a\u0627\u063a\u0629 \u0645\u062d\u0641\u0638\u0629 \u0627\u0633\u062a\u062b\u0645\u0627\u0631\u064a\u0629 \u062a\u062f\u0631\u0651 \u0639\u0644\u064a\u0643 \u062a\u062f\u0641\u0642\u0627\u062a \u0646\u0642\u062f\u064a\u0629 \u0645\u0633\u062a\u0645\u0631\u0629 \u0648\u0623\u0631\u0628\u0627\u062d\u0627\u064b \u0633\u0644\u0628\u064a\u0629 \u0645\u062a\u0646\u0627\u0645\u064a\u0629 \u0645\u0646 \u0623\u0633\u0647\u0645 \u0627\u0644\u0639\u0648\u0627\u0626\u062f \u0648\u0635\u0646\u0627\u062f\u064a\u0642 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062a \u0628\u0634\u0643\u0644 \u0645\u062f\u0631\u0648\u0633.",
      moduleTitles: {
        m1: "\u0645\u0641\u0647\u0648\u0645 \u0627\u0644\u062f\u062e\u0644 \u0627\u0644\u0633\u0644\u0628\u064a",
        m2: "\u0627\u0644\u0627\u0633\u062a\u062b\u0645\u0627\u0631 \u0641\u064a \u0623\u0633\u0647\u0645 \u062a\u0648\u0632\u064a\u0639\u0627\u062a \u0627\u0644\u0623\u0631\u0628\u0627\u062d",
        m3: "\u0627\u0644\u062a\u062f\u0641\u0642 \u0627\u0644\u0646\u0642\u062f\u064a \u0645\u0646 \u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0631\u0642\u0645\u064a\u0629",
        m4: "\u0627\u0644\u0636\u0631\u0627\u0626\u0628 \u0648\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0645\u062d\u0641\u0638\u0629",
      },
    },
    "growth-mindset": {
      title: "\u0639\u0642\u0644\u064a\u0629 \u0627\u0644\u0646\u0645\u0648 \u0648\u0639\u0627\u062f\u0627\u062a \u0627\u0644\u0646\u062c\u0627\u062d",
      description: "\u062a\u0628\u0646\u0651 \u0639\u0642\u0644\u064a\u0629 \u0627\u0644\u062a\u0637\u0648\u064a\u0631 \u0627\u0644\u0645\u0633\u062a\u0645\u0631\u060c \u0648\u062d\u0637\u0645 \u0627\u0644\u062d\u0648\u0627\u062c\u0632 \u0627\u0644\u0646\u0641\u0633\u064a\u0629 \u0648\u0627\u0644\u0645\u0639\u062a\u0642\u062f\u0627\u062a \u0627\u0644\u0645\u0642\u064a\u062f\u0629 \u0644\u0643\u060c \u0648\u0627\u0628\u0646\u0650 \u0627\u0644\u0639\u0627\u062f\u0627\u062a \u0627\u0644\u064a\u0648\u0645\u064a\u0629 \u0627\u0644\u0625\u064a\u062c\u0627\u0628\u064a\u0629 \u0627\u0644\u0645\u062a\u0631\u0627\u0643\u0645\u0629 (Atomic Habits) \u0644\u0646\u062c\u0627\u062d\u0643 \u0627\u0644\u0645\u0627\u0644\u064a \u0648\u0627\u0644\u0645\u0647\u0646\u064a.",
      moduleTitles: {
        m1: "\u0639\u0642\u0644\u064a\u0629 \u0627\u0644\u0646\u0645\u0648 \u0645\u0642\u0627\u0628\u0644 \u0627\u0644\u0639\u0642\u0644\u064a\u0629 \u0627\u0644\u062b\u0627\u0628\u062a\u0629",
        m2: "\u0627\u0644\u062a\u063a\u0644\u0628 \u0639\u0644\u0649 \u0627\u0644\u062e\u0648\u0641 \u0645\u0646 \u0627\u0644\u0641\u0634\u0644",
        m3: "\u0628\u0646\u0627\u0621 \u0627\u0644\u0639\u0627\u062f\u0627\u062a \u0627\u0644\u0630\u0631\u064a\u0629 \u0627\u0644\u0635\u063a\u064a\u0631\u0629",
        m4: "\u0627\u0644\u0627\u0646\u0636\u0628\u0627\u0637 \u0627\u0644\u0630\u0627\u062a\u064a \u0648\u0627\u0644\u0627\u0633\u062a\u0645\u0631\u0627\u0631\u064a\u0629",
      },
    },
    "time-management": {
      title: "\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0648\u0642\u062a \u0648\u0627\u0644\u0625\u0646\u062a\u0627\u062c\u064a\u0629",
      description: "\u0627\u062d\u062a\u0631\u0641 \u0645\u0647\u0627\u0631\u0627\u062a \u062a\u0646\u0638\u064a\u0645 \u0627\u0644\u0648\u0642\u062a \u0628\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0645\u0635\u0641\u0648\u0641\u0629 \u0625\u064a\u0632\u0646\u0647\u0627\u0648\u0631 \u0644\u062a\u062d\u062f\u064a\u062f \u0627\u0644\u0623\u0648\u0644\u0648\u064a\u0627\u062a \u0648\u062a\u0642\u0646\u064a\u0629 \u0628\u0648\u0645\u0648\u062f\u0648\u0631\u0648 \u0644\u062a\u0641\u0627\u062f\u064a \u0627\u0644\u062a\u0634\u062a\u062a \u0648\u0627\u0644\u062a\u062e\u0644\u0635 \u0627\u0644\u0646\u0647\u0627\u0626\u064a \u0645\u0646 \u0639\u0627\u062f\u0629 \u062a\u0623\u062c\u064a\u0644 \u0627\u0644\u0645\u0647\u0627\u0645.",
      moduleTitles: {
        m1: "\u0627\u0644\u0645\u0628\u0627\u062f\u0626 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629 \u0644\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0648\u0642\u062a",
        m2: "\u0645\u0635\u0641\u0648\u0641\u0629 \u0623\u0648\u0644\u0648\u064a\u0627\u062a \u0625\u064a\u0632\u0646\u0647\u0627\u0648\u0631",
        m3: "\u0627\u0644\u062a\u063a\u0644\u0628 \u0639\u0644\u0649 \u0627\u0644\u062a\u0633\u0648\u064a\u0641 \u0648\u0627\u0644\u0645\u0645\u0627\u0637\u0644\u0629",
      },
    },
  },
  ko: {
    "saham-dasar": {
      title: "\uc8fc\uc2dd \ud22c\uc790 \ubc0f \uc2dc\uc7a5 \uae30\ucd08",
      description: "\uc131\uacf5\uc801\uc778 \uc8fc\uc2dd \ud22c\uc790\ub97c \uc704\ud55c \uccab\uac78\uc74c. \uc6b0\ub7c9\uc8fc\uc758 \uc7ac\ubb34 \ud380\ub354\uba58\ud138\uc744 \ubd84\uc11d\ud558\uace0 \uc815\ubc00\ud55c \ucc28\ud2b8 \uc77d\uae30 \ubc95\uc744 \ub9c8\uc2a4\ud130\ud558\uc5ec \uc7a5\uae30\uc801\uc774\uace0 \uc548\uc815\uc801\uc778 \uc790\uc0b0 \ud3ec\ud2b8\ud3f4\ub9ac\uc624\ub97c \uc644\uc131\ud569\ub2c8\ub2e4.",
      moduleTitles: {
        m1: "\uc8fc\uc2dd\uc774\ub780 \ubb34\uc5c7\uc778\uac00?",
        m2: "\uae30\ubcf8\uc801 \ubd84\uc11d",
        m3: "\uae30\uc220\uc801 \ubd84\uc11d",
        m4: "\ud3ec\ud2b8\ud3f4\ub9ac\uc624 \uc804\ub7b5",
      },
    },
    "kripto-dasar": {
      title: "\uc554\ud638\ud654\ud3d0 \ubc0f Web3 \uae30\ucd08",
      description: "\ube14\ub85d\uccb4\uc778 \uc2dc\uc2a4\ud15c \uc544\ud0a4\ud14d\ucc98, \ube44\ud2b8\ucf54\uc778 \ubc0f \uc774\ub354\ub9ac\uc6c0 \uba54\ucee4\ub2c8\uc998, \uc554\ud638\ud654\ud3d0 \uc9c0\uac11 \uc124\uc815 \ubc0f \ubcf4\uc548, \uadf8\ub9ac\uace0 \ud0c8\uc911\uc559\ud654 \uae08\uc735(DeFi) \ud2b8\ub80c\ub4dc\ub97c \uc644\ubcbd \uc815\ubcf5\ud569\ub2c8\ub2e4.",
      moduleTitles: {
        m1: "\ube14\ub85d\uccb4\uc778 \uae30\uc220 \uc18c\uac1c",
        m2: "\ube44\ud2b8\ucf54\uc778\uacfc \uc774\ub354\ub9ac\uc6c0\uc758 \uc791\ub3d9 \uc6d0\ub9ac",
        m3: "\ud06c\ub9bd\ud1a0 \uc9c0\uac11 \uc124\uc815 \ubc0f \ubcf4\uc548",
        m4: "Web3\uc758 \ubbf8\ub798\uc640 \uae30\ud68c",
      },
    },
    "digital-marketing": {
      title: "\ud604\ub300 \ub514\uc9c0\ud138 \ub9c8\ucf00\ud305 \uc2e4\ubb34",
      description: "\uc18c\uc15c \ubbf8\ub514\uc5b4 \ubd84\uc11d, \uc815\ubc00 \uac80\uc0c9\uc5d4\uc9c4 \ucd5c\uc801\ud654(SEO) \ub9c8\uc2a4\ud130, \uc720\ub8cc \uad11\uace0 \uc9d1\ud589(Facebook/Google Ads), \uadf8\ub9ac\uace0 \uace0\uac1d\uc744 \uc0ac\ub85c\uc7a1\ub294 \uc804\ud658 \uce74\ud53c\ub77c\uc774\ud305 \uae30\ubc95\uc744 \ud559\uc2b5\ud569\ub2c8\ub2e4.",
      moduleTitles: {
        m1: "\ub514\uc9c0\ud138 \ub9c8\ucf00\ud305\uc758 \ud504\ub808\uc784\uc6cc\ud06c",
        m2: "\uac80\uc0c9\uc5d4\uc9c4 \ucd5c\uc801\ud654 (SEO) \uc2e4\uc804",
        m3: "\uc720\ub8cc \uad11\uace0 \uc9d1\ud589 (FB & Google Ads)",
        m4: "\uce74\ud53c\ub77c\uc774\ud305 \ubc0f \ube0c\ub79c\ub4dc \ucf58\ud150\uce20 \uc804\ub7b5",
      },
    },
    "ui-ux-design": {
      title: "UI/UX \ub514\uc790\uc778 \uae30\ucd08",
      description: "\uc0ac\uc6a9\uc790 \uc778\ud130\ud398\uc774\uc2a4 \ubc0f \uc0ac\uc6a9\uc790 \uacbd\ud5d8 \ub514\uc790\uc778\uc758 \ud575\uc2ec \uc6d0\uce59\uc744 \ubc30\uc6c1\ub2c8\ub2e4.",
      moduleTitles: {
        m1: "UI \uae30\ucd08",
        m2: "UX \ub9ac\uc11c\uce58 \ubc0f \uc640\uc774\uc5b4\ud504\ub808\uc774\ubc0d",
      },
    },
    "graphic-design": {
      title: "\ubaa8\ub358 \uadf8\ub798\ud53d \ub514\uc790\uc778",
      description: "\uc2dc\uac01 \uc608\uc220, \uad6c\ub3c4, \ud0c0\uc774\ud3ec\uadf8\ub798\ud53c \ubc0f \uc0c9\ucc44 \uc774\ub860\uc744 \ub9c8\uc2a4\ud130\ud558\uc5ec \ub180\ub77c\uc6b4 \ub514\uc790\uc778\uc744 \ub9cc\ub4ed\ub2c8\ub2e4.",
      moduleTitles: {
        m1: "\uc0c9\ucc44 \uc774\ub860 \ubc0f \ud0c0\uc774\ud3ec\uadf8\ub798\ud53c",
        m2: "\uc2dc\uac01\uc801 \uad6c\ub3c4",
      },
    },
    "mental-health": {
      title: "\uc815\uc2e0 \uac74\uac15 \ubc0f \uc2a4\ud2b8\ub808\uc2a4 \uad00\ub9ac",
      description: "\uc2a4\ud2b8\ub808\uc2a4\ub97c \uad00\ub9ac\ud558\uace0, \uba85\uc0c1\uc744 \uc2e4\ucc9c\ud558\uba70, \uac74\uac15\ud55c \uc6cc\ub77c\ubc38\uc744 \uc720\uc9c0\ud558\ub294 \ubc29\ubc95\uc744 \ubc30\uc6c1\ub2c8\ub2e4.",
      moduleTitles: {
        m1: "\uc2a4\ud2b8\ub808\uc2a4 \uad00\ub9ac",
        m2: "\uba85\uc0c1 \uae30\ucd08",
      },
    },
    "health-fitness": {
      title: "\uac74\uac15 \ubc0f \ud53c\ud2b8\ub2c8\uc2a4 \uae30\ucd08",
      description: "\ud53c\ud2b8\ub2c8\uc2a4\uc758 \ud575\uc2ec \uc6d0\uce59\uacfc \ud6a8\uacfc\uc801\uc778 \uc6b4\ub3d9 \ub8e8\ud2f4\uc744 \ubc30\uc6c1\ub2c8\ub2e4.",
      moduleTitles: {
        m1: "\ud53c\ud2b8\ub2c8\uc2a4 \uae30\ucd08",
        m2: "\uc6b4\ub3d9 \ub8e8\ud2f4",
      },
    },
    "nutrition-diet": {
      title: "\uc601\uc591 \ubc0f \uac74\uac15\ud55c \uc2dd\ub2e8",
      description: "\uc601\uc591\uc18c\ub97c \uc774\ud574\ud558\uace0 \ucd5c\ub300\ud55c\uc758 \uc5d0\ub108\uc9c0\ub97c \uc5bb\uae30 \uc704\ud574 \uc2dd\ub2e8\uc744 \uad6c\uc131\ud558\ub294 \ubc29\ubc95\uc744 \ubc30\uc6c1\ub2c8\ub2e4.",
      moduleTitles: {
        m1: "\uc601\uc591 \uae30\ucd08",
        m2: "\uc2dd\ub2e8 \uc804\ub7b5",
      },
    },
    "web-dev": {
      title: "\ubaa8\ub358 \uc6f9 \uac1c\ubc1c",
      description: "HTML, CSS, Javascript\ub97c \uc774\uc6a9\ud55c \uc6f9\uc0ac\uc774\ud2b8 \uc81c\uc791\uc758 \uae30\ucd08\ub97c \ub9c8\uc2a4\ud130\ud558\uace0 \uc804\ubb38 \uc6f9 \uac1c\ubc1c\uc790\ub85c\uc11c\uc758 \ucee4\ub9ac\uc5b4\ub97c \uc2dc\uc791\ud558\uc138\uc694.",
      moduleTitles: {
        m1: "HTML \ubc0f CSS \uae30\ucd08",
        m2: "Javascript \uc18c\uac1c",
      },
    },
    "data-science": {
      title: "\ub370\uc774\ud130 \uc0ac\uc774\uc5b8\uc2a4 \uc785\ubb38",
      description: "\ub370\uc774\ud130 \ubd84\uc11d \ubc29\ubc95, \uae30\ubcf8 \ud1b5\uacc4 \uc774\ud574 \ubc0f Python\uc744 \uc0ac\uc6a9\ud558\uc5ec \ub370\uc774\ud130 \uae30\ubc18 \ubb38\uc81c\ub97c \ud574\uacb0\ud558\ub294 \ubc29\ubc95\uc744 \ubc30\uc6c1\ub2c8\ub2e4.",
      moduleTitles: {
        m1: "\ub370\uc774\ud130 \ubd84\uc11d \uae30\ucd08",
        m2: "\ub370\uc774\ud130 \uc0ac\uc774\uc5b8\uc2a4\ub97c \uc704\ud55c Python",
      },
    },
    "ai-tools": {
      title: "\uc0dd\uc0b0\uc131\uc744 \uc704\ud55c AI \ub3c4\uad6c",
      description: "ChatGPT \ubc0f Midjourney\uc640 \uac19\uc740 AI\uc758 \ud798\uc744 \ud65c\uc6a9\ud558\uc5ec \uc77c\uc0c1\uc801\uc778 \uc6cc\ud06c\ud50c\ub85c\uc6b0\ub97c \uac00\uc18d\ud654\ud558\uc138\uc694.",
      moduleTitles: {
        m1: "\uae30\ucd08 \ud504\ub86c\ud504\ud2b8 \uc5d4\uc9c0\ub2c8\uc5b4\ub9c1",
        m2: "\ucf58\ud150\uce20 \uc81c\uc791\uc744 \uc704\ud55c AI",
      },
    },
    "laporan-keuangan": {
      title: "\uc7ac\ubb34\uc81c\ud45c \ubc0f \uacb0\uc0b0\uc11c \ubd84\uc11d",
      description: "\uae30\uc5c5 \ubc0f \uc2a4\ud0c0\ud2b8\uc5c5\uc758 \uc7ac\ubb34 \uac74\uc804\uc131\uc744 \uc790\uc0b0\uacfc \uc190\uc775 \uad00\uc810\uc5d0\uc11c \uc644\ubcbd\ud788 \ud574\uc11d\ud558\uae30 \uc704\ud55c 3\ub300 \uc7ac\ubb34\uc81c\ud45c(B/S, P/L, Cashflow) \ud575\uc2ec \uc9c0\ud45c \ubd84\uc11d \uc2e4\uc804 \ucf54\uc2a4.",
      moduleTitles: {
        m1: "3\ub300 \ud575\uc2ec \uc7ac\ubb34\uc81c\ud45c \uc77d\uae30",
        m2: "\uc8fc\uc694 \uc7ac\ubb34 \ube44\uc728 \ubd84\uc11d\ubc95",
        m3: "\ubd84\uc2dd\ud68c\uacc4 \ubc0f \uc7ac\ubb34 \ub9ac\uc2a4\ud06c \uac10\uc9c0",
      },
    },
    "startup-bisnis": {
      title: "\uc2a4\ud0c0\ud2b8\uc5c5 \ucc3d\uc5c5 \ubc0f \ube44\uc988\ub2c8\uc2a4 \uc804\ub7b5",
      description: "\ube44\uc988\ub2c8\uc2a4 \uc544\uc774\ub514\uc5b4\ub97c \uae30\ud68d\ud558\uace0 \uc774\ub97c \uc815\ubc00\ud558\uac8c \uc2a4\ucf00\uc77c\uc5c5\ud558\ub294 \ucc3d\uc5c5\uc758 \uc804 \uacfc\uc815\uc744 \ud559\uc2b5\ud569\ub2c8\ub2e4. \ub9b0 \uce94\ubc84\uc2a4 \ubaa8\ud615 \uad6c\ucd95\ubd80\ud130 \uccab \uc790\uae08 \uc870\ub2ec \ubc0f \ub9c8\ucf13 \ud655\uc7a5 \uc804\ub7b5\uae4c\uc9c0 \uc804\uc218\ud569\ub2c8\ub2e4.",
      moduleTitles: {
        m1: "\ube44\uc988\ub2c8\uc2a4 \uc544\uc774\ub514\uc5b4 \uac80\uc99d",
        m2: "\ub9b0 \ube44\uc988\ub2c8\uc2a4 \ubaa8\ub378 \uce94\ubc84\uc2a4",
        m3: "\ucd08\uae30 \ud22c\uc790 \uc720\uce58 \uc804\ub7b5",
        m4: "\uaddc\ubaa8 \ud655\uc7a5 \ubc0f \uc131\uc7a5 \uc804\ub7b5",
      },
    },
    "ecommerce-dasar": {
      title: "\uc774\ucee4\uba38\uc2a4 \ubc0f \ub4dc\ub86d\uc26c\ud551 \uc2e4\ubb34",
      description: "\uc790\uc2e0\ub9cc\uc758 \ub3c5\uc790\uc801\uc778 \uc1fc\ud551\ubab0 \uad6c\ucd95\ubd80\ud130 \uae00\ub85c\ubc8c 1\ub4f1 \uc720\ub9dd \uc544\uc774\ud15c \ubc1c\uad74 \ubc0f \uc7ac\uace0 \ubcf4\uc720 \uc5c6\uc774 \ub9e4\ucd9c\uc744 \uc720\uae30\uc801\uc73c\ub85c \uc62c\ub9ac\ub294 \uc2a4\ub9c8\ud2b8 \ub4dc\ub86d\uc26c\ud551 \ud480\ud329 \ube44\uc988\ub2c8\uc2a4 \uacfc\uc815.",
      moduleTitles: {
        m1: "\uc774\ucee4\uba38\uc2a4 \ube44\uc988\ub2c8\uc2a4 \ubaa8\ub378 \uc720\ud615",
        m2: "\uc2dc\uc7a5\uc131 \uc788\ub294 \ud575\uc2ec \uc18c\uc2f1 \uc0c1\ud488 \ubc1c\uad74",
        m3: "Shopify\ub97c \ud65c\uc6a9\ud55c \uc1fc\ud551\ubab0 \uad6c\ucd95",
      },
    },
    "personal-finance": {
      title: "\uac1c\uc778 \uc7ac\ubb34 \uad00\ub9ac \ubc0f \uc790\uc0b0 \uae30\ucd08",
      description: "\uac1c\uc778 \uac00\uacc4 \ud604\uae08 \ud750\ub984\uc758 \uac00\uc2dc\uc131 \ud655\ubcf4, \ud569\ub9ac\uc801\uc778 \uc790\uae08 \ubc30\ubd84(50/30/20 \uaddc\uce59), \ube44\uc18c\ube44\uc131 \uac15\uc81c \uc800\ucd95\uc548 \uc124\uacc4, \uc790\uc0b0\uc744 \uc548\uc804\ud558\uac8c \ubcf4\ud638\ud574 \uc904 \ube44\uc0c1 \uc608\ube44\uae08 \uc124\uacc4\uc548\uc744 \uc644\uc131\ud569\ub2c8\ub2e4.",
      moduleTitles: {
        m1: "\ud604\uae08 \ud750\ub984 \uad00\ub9ac\uc758 \ud575\uc2ec \uc6d0\uce59",
        m2: "50/30/20 \uc790\uae08 \ubd84\ubc30 \uaddc\uce59",
        m3: "\ube44\uc0c1\uae08 \ub9c8\ub828 \ubc0f \ub9ac\uc2a4\ud06c \ubc29\uc5b4",
        m4: "\ub098\uc05c \uc18c\ube44\uc131 \ubd80\ucc44 \ud53c\ud558\uae30",
      },
    },
    "passive-income": {
      title: "\ud328\uc2dc\ube0c \uc778\ucef4 \ubc0f \ubc30\ub2f9\uc8fc \ud22c\uc790 \uc804\ub7b5",
      description: "\uc548\uc804 \uc9c0\ud5a5\uc801 \uace0\ubc30\ub2f9\uc8fc \ud3ec\ud2b8\ud3f4\ub9ac\uc624\ub97c \uc124\uacc4\ud558\uace0 \uc778\ub371\uc2a4 \ud380\ub4dc \ubc0f \ub514\uc9c0\ud138 \ud06c\ub9bd\ud1a0 \uc790\uc0b0\uacfc\uc758 \uc2dc\ub108\uc9c0 \ubc30\uce58\ub97c \uc218\ud589\ud558\uc5ec \uc601\uad6c\uc801\uc778 \ubc30\ub2f9 \ud604\uae08 \ud750\ub984\uc744 \ucc3d\ucd9c\ud569\ub2c8\ub2e4.",
      moduleTitles: {
        m1: "\ud328\uc2dc\ube0c \uc778\ucef4\uc758 \ucc38\ub41c \uc815\uc758\uc640 \uad6c\uc870",
        m2: "\uc6b0\ub7c9 \uace0\ubc30\ub2f9\uc8fc \ud3ec\ud2b8\ud3f4\ub9ac\uc624 \uc2e4\uc804",
        m3: "\ub514\uc9c0\ud138 \uc790\uc0b0\uc744 \ud1b5\ud55c \ud604\uae08 \ud750\ub984 \ub2e4\ubcc0\ud654",
        m4: "\uc808\uc138 \ud61c\ud0dd \ubc0f \uc790\uc0b0 \ud3ec\ud2b8\ud3f4\ub9ac\uc624 \ubc29\uc5b4",
      },
    },
    "growth-mindset": {
      title: "\uc131\uc7a5 \ub9c8\uc778\ub4dc\uc14b \ubc0f \uc131\uacf5 \uc2b5\uad00",
      description: "\uc0b6\uc758 \uc804 \uc601\uc5ed\uc5d0\uc11c \ub3c4\uc57d\uc744 \uc774\ub904\ub0b4\uae30 \uc704\ud574 \uace0\uc815\ub41c \ub9c8\uc778\ub4dc\ub97c \ud30c\uad34\ud558\uace0 \uc544\ud1a0\ubbf9 \ud574\ube57(Atomic Habits) \ud589\ub3d9 \uccb4\uacc4\ub97c \uc774\uc2dd\ud558\uc5ec \ub9e4\uc77c\uc758 \uc0b6\uc744 180\ub3c4 \uc5c5\uadf8\ub808\uc774\ub4dc\ud569\ub2c8\ub2e4.",
      moduleTitles: {
        m1: "\uc131\uc7a5\ud615 \ub9c8\uc778\ub4dc\uc14b vs \uace0\uc815\ud615 \ub9c8\uc778\ub4dc\uc14b",
        m2: "\uc2e4\ud328\uc5d0 \ub300\ud55c \uadfc\uc6d0\uc801 \ub450\ub824\uc6c0 \uadf9\ubcf5",
        m3: "\uc6d0\uc790 \ub2e8\uc704\uc758 \ubbf8\uc138 \uc2b5\uad00 \uc124\uacc4 \uacf5\uc2dd",
        m4: "\uc790\uae30 \uaddc\uc728\uacfc \uc9c0\uc18d\uc801\uc778 \ud589\ub3d9\ub825 \uad6c\ucd95",
      },
    },
    "time-management": {
      title: "\uc2dc\uac04 \uad00\ub9ac \ubc0f \uc0dd\uc0b0\uc131 \uadf9\ub300\ud654",
      description: "\ubf40\ubaa8\ub3c4\ub85c \ud3ec\ucee4\uc2f1 \uae30\uc220, \uc544\uc774\uc820\ud558\uc6cc \uc0ac\ubd84\uba74 \uc6b0\uc120\uc21c\uc704 \uae30\ubc18 \uc870\uc9c1\ud654, \uadf8\ub9ac\uace0 \ubbf8\ub8e8\uae30 \uc2b5\uad00\uc758 \uc815\ubc00\ud55c \ud589\ub3d9\uc2ec\ub9ac\uc801 \ud574\ub3c5\ubc95\uc744 \ub9c8\uc2a4\ud130\ud558\uc5ec \ud558\ub8e8\uc758 \uc131\ucde8\ub97c \ucd5c\ub300\ud654\ud569\ub2c8\ub2e4.",
      moduleTitles: {
        m1: "\uc2dc\uac04 \uad00\ub9ac\uc758 \ub9c8\uc778\ub4dc\uc640 \uae30\ucd08 \uc6d0\uce59",
        m2: "\uc544\uc774\uc820\ud558\uc6cc \uc0ac\ubd84\uba74 \uc6b0\uc120\uc21c\uc704 \uae30\ubc95",
        m3: "\uacfc\ud559\uc801\uc778 \ubbf8\ub8e8\uae30 \uc2b5\uad00 \uadf9\ubcf5 \uac00\uc774\ub4dc",
      },
    },
  },
  pt: {
    "saham-dasar": {
      title: "Bolsa de Valores & A\u00e7\u00f5es B\u00e1sicas",
      description: "Comece a investir em a\u00e7\u00f5es corretamente. Aprenda a escolher a\u00e7\u00f5es com fundamentos s\u00f3lidos, compreender r\u00e1cios financeiros, ler gr\u00e1ficos de pre\u00e7os e construir uma carteira de investimentos robusta.",
      moduleTitles: {
        m1: "O que s\u00e3o A\u00e7\u00f5es?",
        m2: "An\u00e1lise Fundamentalista",
        m3: "An\u00e1lise T\u00e9cnica",
        m4: "Estrat\u00e9gias de Carteira",
      },
    },
    "kripto-dasar": {
      title: "Cripto & Fundamentos de Web3",
      description: "Compreenda detalhadamente o mundo do blockchain, criptomoedas, contratos inteligentes, opera\u00e7\u00f5es de carteiras digitais e o potencial futuro das finan\u00e7as descentralizadas (DeFi).",
      moduleTitles: {
        m1: "Introdu\u00e7\u00e3o ao Blockchain",
        m2: "Como Funcionam o Bitcoin & Ethereum",
        m3: "Carteiras Cripto & Seguran\u00e7a",
        m4: "O Futuro da Web3",
      },
    },
    "digital-marketing": {
      title: "Marketing Digital Moderno",
      description: "Domine o marketing digital utilizando redes sociais, otimiza\u00e7\u00e3o de motores de pesquisa (SEO), publicidade paga e copywriting de alta convers\u00e3o para impulsionar as vendas do seu neg\u00f3cio.",
      moduleTitles: {
        m1: "Fundamentos do Marketing Digital",
        m2: "Otimiza\u00e7\u00e3o de Motores de Pesquisa (SEO)",
        m3: "An\u00fancios Pagos (FB, Google Ads)",
        m4: "Copywriting & Estrat\u00e9gia de Conte\u00fado",
      },
    },
    "ui-ux-design": {
      title: "Fundamentos de Design UI/UX",
      description: "Aprenda os princ\u00edpios fundamentais de design de interfaces e experi\u00eancia do utilizador.",
      moduleTitles: {
        m1: "Fundamentos de UI",
        m2: "Pesquisa UX e Wireframing",
      },
    },
    "graphic-design": {
      title: "Design Gr\u00e1fico Moderno",
      description: "Domine a arte visual, composi\u00e7\u00e3o, tipografia e teoria da cor para criar designs incr\u00edveis.",
      moduleTitles: {
        m1: "Teoria da Cor e Tipografia",
        m2: "Composi\u00e7\u00e3o Visual",
      },
    },
    "mental-health": {
      title: "Sa\u00fade Mental e Gest\u00e3o de Estresse",
      description: "Aprenda a gerir o stress, praticar medita\u00e7\u00e3o e manter um equil\u00edbrio saud\u00e1vel.",
      moduleTitles: {
        m1: "Gest\u00e3o de Estresse",
        m2: "No\u00e7\u00f5es B\u00e1sicas de Medita\u00e7\u00e3o",
      },
    },
    "health-fitness": {
      title: "No\u00e7\u00f5es B\u00e1sicas de Sa\u00fade e Fitness",
      description: "Aprenda os princ\u00edpios b\u00e1sicos de fitness e rotinas de exerc\u00edcios eficazes.",
      moduleTitles: {
        m1: "Fundamentos de Fitness",
        m2: "Rotinas de Exerc\u00edcio",
      },
    },
    "nutrition-diet": {
      title: "Nutri\u00e7\u00e3o e Dieta Saud\u00e1vel",
      description: "Entenda os nutrientes e como estruturar sua dieta para obter a m\u00e1xima energia.",
      moduleTitles: {
        m1: "Fundamentos de Nutri\u00e7\u00e3o",
        m2: "Estrat\u00e9gias de Dieta",
      },
    },
    "web-dev": {
      title: "Desenvolvimento Web Moderno",
      description: "Domine os fundamentos da cria\u00e7\u00e3o de websites com HTML, CSS, Javascript e inicie a sua carreira profissional.",
      moduleTitles: {
        m1: "Bases de HTML e CSS",
        m2: "Introdu\u00e7\u00e3o ao Javascript",
      },
    },
    "data-science": {
      title: "Introdu\u00e7\u00e3o \u00e0 Ci\u00eancia de Dados",
      description: "Aprenda a analisar dados, compreender estat\u00edsticas b\u00e1sicas e usar Python para resolver problemas.",
      moduleTitles: {
        m1: "Fundamentos de An\u00e1lise de Dados",
        m2: "Python para Ci\u00eancia de Dados",
      },
    },
    "ai-tools": {
      title: "Ferramentas de IA para Produtividade",
      description: "Aproveite o poder da IA como o ChatGPT e Midjourney para acelerar o seu fluxo de trabalho di\u00e1rio.",
      moduleTitles: {
        m1: "Engenharia de Prompts B\u00e1sica",
        m2: "IA para Cria\u00e7\u00e3o de Conte\u00fado",
      },
    },
    "laporan-keuangan": {
      title: "An\u00e1lise de Demonstra\u00e7\u00f5es Financeiras",
      description: "Como ler balan\u00e7os, demonstra\u00e7\u00f5es de resultados e fluxos de caixa para avaliar a sa\u00fade financeira de empresas ou investimentos antes de tomar decis\u00f5es ativos.",
      moduleTitles: {
        m1: "Tr\u00eas Demonstra\u00e7\u00f5es Financeiras Principais",
        m2: "An\u00e1lise de R\u00e1cios Financeiros",
        m3: "Dete\u00e7\u00e3o de Alertas Financeiros",
      },
    },
    "startup-bisnis": {
      title: "Estrat\u00e9gia de Startup & Neg\u00f3cios",
      description: "Crie o seu neg\u00f3cio desde a ideia at\u00e9 \u00e0 execu\u00e7\u00e3o. Aprenda pesquisa de mercado, modelos de neg\u00f3cio, esquemas de financiamento inicial e estrat\u00e9gias modernas de escalabilidade.",
      moduleTitles: {
        m1: "Valida\u00e7\u00e3o de Ideias de Neg\u00f3cio",
        m2: "Canvas de Modelo de Neg\u00f3cio Lean",
        m3: "Obten\u00e7\u00e3o de Financiamento Inicial",
        m4: "Estrat\u00e9gias de Escalabilidade",
      },
    },
    "ecommerce-dasar": {
      title: "Dom\u00ednio de E-Commerce & Dropshipping",
      description: "Crie a sua pr\u00f3pria loja online, encontre produtos vencedores, domine a gest\u00e3o da cadeia de abastecimento e opere um neg\u00f3cio de com\u00e9rcio eletr\u00f3nico rent\u00e1vel sem necessidade de stock.",
      moduleTitles: {
        m1: "Modelos de Neg\u00f3cio de E-Commerce",
        m2: "Pesquisa de Produtos Mais Vendidos",
        m3: "Constru\u00e7\u00e3o de Loja Online Shopify",
      },
    },
    "personal-finance": {
      title: "Gest\u00e3o de Finan\u00e7as Pessoais",
      description: "Domine a gest\u00e3o do seu fluxo de caixa pessoal, m\u00e9todos eficazes de poupan\u00e7a, aloca\u00e7\u00e3o sistem\u00e1tica do or\u00e7amento mensal e passos cruciais para a prepara\u00e7\u00e3o de um fundo de emerg\u00eancia.",
      moduleTitles: {
        m1: "Princ\u00edpios de Gest\u00e3o de Fluxo de Caixa",
        m2: "M\u00e9todo de Or\u00e7amento 50/30/20",
        m3: "Fundo de Emerg\u00eancia & Prote\u00e7\u00e3o",
        m4: "Evitar D\u00edvidas de Consumo",
      },
    },
    "passive-income": {
      title: "Estrat\u00e9gias de Rendimento Passivo & Dividendos",
      description: "Como construir uma carteira de investimentos que gere fluxos de caixa passivos consistentes a partir de dividendos de a\u00e7\u00f5es, fundos de \u00edndice ou outros ativos digitais de forma segura.",
      moduleTitles: {
        m1: "Conceito de Rendimento Passivo",
        m2: "Investimento em A\u00e7\u00f5es de Dividendos",
        m3: "Rendimento Passivo com Ativos Digitais",
        m4: "Impostos & Gest\u00e3o de Carteira",
      },
    },
    "growth-mindset": {
      title: "Mentalidade de Crescimento & H\u00e1bitos de Sucesso",
      description: "Desenvolva uma mentalidade de aprendizagem cont\u00ednua, elimine cren\u00e7as limitadoras e crie micro-h\u00e1bitos di\u00e1rios (h\u00e1bitos at\u00f3micos) para alcan\u00e7ar o seu potencial m\u00e1ximo.",
      moduleTitles: {
        m1: "Princ\u00edpio da Mentalidade de Crescimento vs Fixa",
        m2: "Superar o Medo do Fracasso",
        m3: "Construir Micro-H\u00e1bitos",
        m4: "Autodisciplina & Consist\u00eancia",
      },
    },
    "time-management": {
      title: "Gest\u00e3o de Tempo & Produtividade",
      description: "Domine a t\u00e9cnica Pomodoro, a matriz de prioridades de Eisenhower e aprenda a combater a procrastina\u00e7\u00e3o para trabalhar de forma mais inteligente e eficiente todos os dias.",
      moduleTitles: {
        m1: "Princ\u00edpios da Gest\u00e3o de Tempo",
        m2: "Matriz de Prioridades de Eisenhower",
        m3: "Superar a Procrastina\u00e7\u00e3o",
      },
    },
  },
};

export function getLocalizedCourseContent(
  langCode: string,
  courseId: string
): LocalizedCourseContent | null {
  const byLang = COURSE_CONTENT[langCode];
  const byEn = COURSE_CONTENT["en"];
  const byId = COURSE_CONTENT["id"];
  
  if (byLang && byLang[courseId]) {
    return byLang[courseId];
  }
  if (byEn && byEn[courseId]) {
    return byEn[courseId];
  }
  return byId[courseId] || null;
}
