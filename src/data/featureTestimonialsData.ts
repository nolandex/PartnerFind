import { Locale } from "../lib/translations";
import testiPerson1 from "../assets/images/testimonial_person_1.png";
import testiPerson2 from "../assets/images/testimonial_person_2.png";
import testiPerson3 from "../assets/images/testimonial_person_3.png";
import testiPerson4 from "../assets/images/testimonial_person_4.png";
import testiPerson5 from "../assets/images/testimonial_person_5.png";
import testiPerson6 from "../assets/images/testimonial_person_6.png";

export interface FeatureTestimonialItem {
  name: string;
  role: string;
  quote: string;
  image: string;
}

export const featureTestimonialsData: Record<Locale, FeatureTestimonialItem[]> = {
  "id-ID": [
    {
      name: "Arya S.",
      role: "Pendiri Startup",
      quote: "Proyek bersama partner pertama langsung closing deal dalam 3 hari!",
      image: testiPerson1,
    },
    {
      name: "Maya D.",
      role: "Direktur Kreatif",
      quote: "Sangat mudah menemukan mitra ahli yang tepat untuk scale-up bisnis.",
      image: testiPerson2,
    },
    {
      name: "Nadia K.",
      role: "Pemasar Digital",
      quote: "Eksekusi proyek bersama berjalan sangat rapi, transparan, dan terarah.",
      image: testiPerson3,
    },
    {
      name: "David L.",
      role: "Manajer Produk",
      quote: "Bisa validasi ide produk dan bangun MVP jauh lebih cepat bareng co-founder.",
      image: testiPerson4,
    },
    {
      name: "Clara W.",
      role: "Desainer Brand",
      quote: "Koneksi global berkualitas tinggi, membuka peluang klien dari luar negeri.",
      image: testiPerson5,
    },
    {
      name: "Budi H.",
      role: "Partner Operasional",
      quote: "Bagi hasil adil dan jelas, kami berhasil scaling revenue bersama-sama.",
      image: testiPerson6,
    },
  ],
  "en-US": [
    {
      name: "John M.",
      role: "Tech Founder",
      quote: "Closed our first joint venture deal within 3 days of connecting!",
      image: testiPerson1,
    },
    {
      name: "Sarah C.",
      role: "Creative Director",
      quote: "Finding the exact expert partner needed to scale was seamless.",
      image: testiPerson2,
    },
    {
      name: "David K.",
      role: "Growth Marketer",
      quote: "Joint project execution was remarkably smooth, fast, and transparent.",
      image: testiPerson3,
    },
    {
      name: "Robert T.",
      role: "Product Lead",
      quote: "Validated product ideas and launched our MVP twice as fast with a co-founder.",
      image: testiPerson4,
    },
    {
      name: "Clara W.",
      role: "Brand Strategist",
      quote: "High-caliber global network that unlocked international client projects.",
      image: testiPerson5,
    },
    {
      name: "Michael B.",
      role: "Operations Partner",
      quote: "Fair and transparent revenue sharing; we scaled earnings together smoothly.",
      image: testiPerson6,
    },
  ],
  "es-ES": [
    {
      name: "Carlos M.",
      role: "Fundador Tecnológico",
      quote: "¡Cerramos nuestro primer acuerdo conjunto en solo 3 días de conectar!",
      image: testiPerson1,
    },
    {
      name: "Sofía R.",
      role: "Directora Creativa",
      quote: "Encontrar al socio experto ideal para escalar fue completamente fluido.",
      image: testiPerson2,
    },
    {
      name: "Diego K.",
      role: "Especialista en Crecimiento",
      quote: "La ejecución del proyecto conjunto fue muy transparente, ágil y ordenada.",
      image: testiPerson3,
    },
    {
      name: "Javier L.",
      role: "Líder de Producto",
      quote: "Validamos ideas y lanzamos el MVP mucho más rápido con nuestro cofundador.",
      image: testiPerson4,
    },
    {
      name: "Elena G.",
      role: "Estratega de Marca",
      quote: "Red global de alto nivel que nos abrió oportunidades con clientes internacionales.",
      image: testiPerson5,
    },
    {
      name: "Marcos B.",
      role: "Socio de Operaciones",
      quote: "Reparto de ingresos justo y claro; escalamos nuestras ganancias juntos con éxito.",
      image: testiPerson6,
    },
  ],
  "fr-FR": [
    {
      name: "Julien M.",
      role: "Fondateur Tech",
      quote: "Premier partenariat concrétisé et rentable en seulement 3 jours !",
      image: testiPerson1,
    },
    {
      name: "Camille R.",
      role: "Directrice Créative",
      quote: "Trouver le bon associé expert pour développer l'activité a été très simple.",
      image: testiPerson2,
    },
    {
      name: "Thomas K.",
      role: "Responsable Croissance",
      quote: "Une exécution de projet fluide, transparente et parfaitement coordonnée.",
      image: testiPerson3,
    },
    {
      name: "Romain L.",
      role: "Chef de Produit",
      quote: "Nous avons validé l'idée et sorti le MVP deux fois plus vite grâce au cofondateur.",
      image: testiPerson4,
    },
    {
      name: "Claire W.",
      role: "Stratège de Marque",
      quote: "Un réseau international d'élite qui a ouvert d'importants contrats mondiaux.",
      image: testiPerson5,
    },
    {
      name: "Nicolas B.",
      role: "Partenaire Opérations",
      quote: "Partage équitable des revenus ; nous avons augmenté nos gains collectivement.",
      image: testiPerson6,
    },
  ],
  "ja-JP": [
    {
      name: "ケンジ S.",
      role: "テック創業者",
      quote: "マッチング後わずか3日で最初の共同事業ディールを成立できました！",
      image: testiPerson1,
    },
    {
      name: "ユイ M.",
      role: "クリエイティブ統括",
      quote: "事業拡大に必要な専門パートナーがすぐに見つかりました。",
      image: testiPerson2,
    },
    {
      name: "ナオキ K.",
      role: "グロース責任者",
      quote: "共同プロジェクトの進行が極めて円滑で透明性が高かったです。",
      image: testiPerson3,
    },
    {
      name: "ダイスケ L.",
      role: "プロダクトリーダー",
      quote: "共同創業者と組むことでMVP開発と検証速度が2倍に加速しました。",
      image: testiPerson4,
    },
    {
      name: "アオイ W.",
      role: "ブランド戦略家",
      quote: "海外クライアントとの直接的な協業機会が大きく広がりました。",
      image: testiPerson5,
    },
    {
      name: "タカシ B.",
      role: "オペレーション担当",
      quote: "明確で公正なレベニューシェアで、共に売上を拡大できています。",
      image: testiPerson6,
    },
  ],
  "de-DE": [
    {
      name: "Lukas M.",
      role: "Tech-Gründer",
      quote: "Erstes Kooperationsprojekt innerhalb von nur 3 Tagen erfolgreich abgeschlossen!",
      image: testiPerson1,
    },
    {
      name: "Lena S.",
      role: "Creative Director",
      quote: "Den perfekten Experten-Partner für unser Wachstum zu finden war kinderleicht.",
      image: testiPerson2,
    },
    {
      name: "Florian K.",
      role: "Growth Marketer",
      quote: "Die gemeinsame Projektabwicklung war transparent, schnell und zielorientiert.",
      image: testiPerson3,
    },
    {
      name: "Daniel L.",
      role: "Product Lead",
      quote: "Dank des passenden Co-Founders konnten wir unser MVP doppelt so schnell launchen.",
      image: testiPerson4,
    },
    {
      name: "Anna W.",
      role: "Markenstrategin",
      quote: "Ein hochkarätiges Netzwerk, das uns lukrative Auslandskunden vermittelt hat.",
      image: testiPerson5,
    },
    {
      name: "Michael B.",
      role: "Operations Partner",
      quote: "Faire Umsatzbeteiligung und verlässliche Partnerschaft für nachhaltiges Wachstum.",
      image: testiPerson6,
    },
  ],
  "zh-CN": [
    {
      name: "张明",
      role: "科技创业者",
      quote: "建立连接后仅3天就成功达成了第一笔合作项目！",
      image: testiPerson1,
    },
    {
      name: "陈晨",
      role: "创意总监",
      quote: "非常轻松就找到了最适合业务规模化的资深合作伙伴。",
      image: testiPerson2,
    },
    {
      name: "李浩",
      role: "增长负责人",
      quote: "联合项目执行高效顺畅，协作过程极其透明省心。",
      image: testiPerson3,
    },
    {
      name: "刘维",
      role: "产品负责人",
      quote: "与联合创始人一起快速验证了产品想法，MVP上线速度提升一倍。",
      image: testiPerson4,
    },
    {
      name: "王雪",
      role: "品牌策略师",
      quote: "高水准的全球合作网络，为我们开拓了多项海外客户项目。",
      image: testiPerson5,
    },
    {
      name: "赵鹏",
      role: "运营合伙人",
      quote: "收益分成透明公正，我们携手实现了业务营收的倍数增长。",
      image: testiPerson6,
    },
  ],
  "ru-RU": [
    {
      name: "Артём М.",
      role: "IT-Основатель",
      quote: "Закрыли первую совместную сделку всего за 3 дня после знакомства!",
      image: testiPerson1,
    },
    {
      name: "Мария Д.",
      role: "Креативный директор",
      quote: "Найти нужного эксперта для масштабирования бизнеса оказалось очень просто.",
      image: testiPerson2,
    },
    {
      name: "Дмитрий К.",
      role: "Growth-маркетолог",
      quote: "Совместная реализация проекта прошла слаженно, прозрачно и четко.",
      image: testiPerson3,
    },
    {
      name: "Алексей Л.",
      role: "Product Lead",
      quote: "Быстро проверили гипотезы и запустили MVP в два раза быстрее с кофаундером.",
      image: testiPerson4,
    },
    {
      name: "Ксения В.",
      role: "Бренд-стратег",
      quote: "Международная сеть высокого уровня, открывшая доступ к зарубежным клиентам.",
      image: testiPerson5,
    },
    {
      name: "Борис П.",
      role: "Операционный партнер",
      quote: "Честное распределение прибыли и уверенный совместный рост доходов.",
      image: testiPerson6,
    },
  ],
  "ar-SA": [
    {
      name: "أحمد س.",
      role: "مؤسس تقني",
      quote: "أبرمنا أول صفقة شراكة ناجحة خلال 3 أيام فقط من التواصل!",
      image: testiPerson1,
    },
    {
      name: "مريم د.",
      role: "مديرة إبداعية",
      quote: "العثور على الشريك الخبير المناسب لتوسيع العمل كان سهلاً وسريعاً.",
      image: testiPerson2,
    },
    {
      name: "خالد ك.",
      role: "مسؤول النمو",
      quote: "تنفيذ المشروع المشترك تم بسلاسة وشفافية واحترافية عالية.",
      image: testiPerson3,
    },
    {
      name: "طارق ل.",
      role: "مدير منتج",
      quote: "تحققنا من فكرة المنتج وأطلقنا الإصدار الأولي بسرعة مضاعفة.",
      image: testiPerson4,
    },
    {
      name: "سارة و.",
      role: "استشارية علامة تجارية",
      quote: "شبكة عالمية مميزة فتحت لنا مشاريع واعدة مع عملاء دوليين.",
      image: testiPerson5,
    },
    {
      name: "فيصل ب.",
      role: "شريك عمليات",
      quote: "نموذج تقاسم أرباح عادل وشفاف ساعدنا على مضاعفة الإيرادات معاً.",
      image: testiPerson6,
    },
  ],
  "ko-KR": [
    {
      name: "김진우",
      role: "테크 창업가",
      quote: "파트너와 매칭된 지 단 3일 만에 첫 협업 프로젝트를 성공적으로 계약했습니다!",
      image: testiPerson1,
    },
    {
      name: "박수민",
      role: "크리에이티브 디렉터",
      quote: "비즈니스 스케일업에 꼭 필요한 전문 파트너를 쉽게 찾을 수 있었습니다.",
      image: testiPerson2,
    },
    {
      name: "이도현",
      role: "그로스 마케터",
      quote: "공동 프로젝트 실행이 매우 투명하고 체계적으로 진행되었습니다.",
      image: testiPerson3,
    },
    {
      name: "정민준",
      role: "프로덕트 리드",
      quote: "공동 창업자와 함께 MVP를 2배 빠르게 제작하고 시장 검증을 마쳤습니다.",
      image: testiPerson4,
    },
    {
      name: "최유나",
      role: "브랜드 디자이너",
      quote: "글로벌 네트워크를 통해 양질의 해외 클라이언트 프로젝트를 확보했습니다.",
      image: testiPerson5,
    },
    {
      name: "한동훈",
      role: "운영 파트너",
      quote: "공정하고 투명한 수익 배분 덕분에 함께 매출을 크게 성장시킬 수 있었습니다.",
      image: testiPerson6,
    },
  ],
  "pt-PT": [
    {
      name: "Tiago M.",
      role: "Fundador Tech",
      quote: "Fechámos o nosso primeiro acordo conjunto em apenas 3 dias de ligação!",
      image: testiPerson1,
    },
    {
      name: "Mariana D.",
      role: "Diretora Criativa",
      quote: "Encontrar o parceiro especialista certo para escalar o negócio foi muito simples.",
      image: testiPerson2,
    },
    {
      name: "Diogo K.",
      role: "Marketeer de Crescimento",
      quote: "A execução do projeto conjunto decorreu de forma transparente, rápida e eficaz.",
      image: testiPerson3,
    },
    {
      name: "Ricardo L.",
      role: "Líder de Produto",
      quote: "Validámos ideias e lançámos o MVP muito mais depressa com um cofundador.",
      image: testiPerson4,
    },
    {
      name: "Clara W.",
      role: "Estrategista de Marca",
      quote: "Rede global de alto nível que desbloqueou projetos de clientes internacionais.",
      image: testiPerson5,
    },
    {
      name: "Bruno P.",
      role: "Parceiro de Operações",
      quote: "Partilha de receitas justa e clara; aumentámos os nossos lucros em conjunto.",
      image: testiPerson6,
    },
  ],
  "tr-TR": [
    {
      name: "Emre M.",
      role: "Girişimci",
      quote: "Bağlantı kurduktan sonra sadece 3 gün içinde ilk ortaklık anlaşmasını tamamladık!",
      image: testiPerson1,
    },
    {
      name: "Zeynep D.",
      role: "Kreatif Direktör",
      quote: "İşimizi büyütmek için gereken uzman ortağı bulmak son derece kolay oldu.",
      image: testiPerson2,
    },
    {
      name: "Can K.",
      role: "Büyüme Uzmanı",
      quote: "Ortak proje yürütme süreci şeffaf, hızlı ve son derece düzenli ilerledi.",
      image: testiPerson3,
    },
    {
      name: "Mert L.",
      role: "Ürün Lideri",
      quote: "Kurucu ortakla birlikte ürün fikrini hızla doğrulayıp MVP'yi 2 kat daha hızlı çıkardık.",
      image: testiPerson4,
    },
    {
      name: "Selin W.",
      role: "Marka Stratejisti",
      quote: "Bize uluslararası müşteri fırsatları sağlayan birinci sınıf küresel ağ.",
      image: testiPerson5,
    },
    {
      name: "Burak P.",
      role: "Operasyon Ortağı",
      quote: "Adil ve şeffaf gelir paylaşımı modeliyle kazancımızı birlikte katladık.",
      image: testiPerson6,
    },
  ],
};

export function getFeatureTestimonials(locale: string): FeatureTestimonialItem[] {
  if (featureTestimonialsData[locale as Locale]) {
    return featureTestimonialsData[locale as Locale];
  }
  const prefix = locale.split("-")[0];
  const matchedKey = Object.keys(featureTestimonialsData).find((k) => k.startsWith(prefix)) as Locale | undefined;
  if (matchedKey && featureTestimonialsData[matchedKey]) {
    return featureTestimonialsData[matchedKey];
  }
  return featureTestimonialsData["en-US"];
}
