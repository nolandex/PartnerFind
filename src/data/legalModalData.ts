import { Locale } from "../lib/translations";

export interface ModalContent {
  about: {
    intro: string;
    flowTitle: string;
    steps: { bold: string; text: string }[];
  };
  contact: {
    intro: string;
    email: string;
    phone: string;
  };
  privacy: {
    intro: string;
    points: string[];
  };
  terms: {
    intro: string;
    points: string[];
  };
}

export const legalModalData: Record<Locale, ModalContent> = {
  "id-ID": {
    about: {
      intro: "PartnerFind adalah platform global yang mempertemukan orang dari seluruh dunia untuk langsung mencari, terhubung, dan melakukan kerja sama bisnis yang menghasilkan uang.",
      flowTitle: "Alur Utama Platform:",
      steps: [
        { bold: "Pembuat:", text: "Membuat posting tentang jenis kerja sama dan keahlian yang sedang dicari." },
        { bold: "Pencari:", text: "Menemukan jenis kerja sama yang diinginkan melalui pencarian global pintar." },
        { bold: "Platform:", text: "Mempertemukan orang dan partner yang cocok secara instan." },
        { bold: "Setelah Cocok:", text: "Langsung terhubung via WhatsApp, Telegram, Discord, atau lainnya tanpa perantara." },
        { bold: "Pendapatan:", text: "Menghasilkan uang bersama dengan model kerja sama yang transparan." },
      ],
    },
    contact: {
      intro: "Jika Anda memiliki pertanyaan seputar kerja sama, kemitraan, atau membutuhkan bantuan:",
      email: "collab@partnerfind.com",
      phone: "+62 812-8888-9999 (Dukungan WhatsApp)",
    },
    privacy: {
      intro: "Kami sangat menghargai privasi dan keamanan kolaborasi Anda pada platform PartnerFind:",
      points: [
        "Informasi kontak publik (seperti tautan WhatsApp, Telegram, atau Discord yang dicantumkan) hanya digunakan untuk mempermudah calon partner terhubung secara langsung.",
        "Kami tidak menjual data pribadi atau informasi proyek Anda kepada pihak ketiga manapun.",
        "Anda memiliki hak penuh untuk memperbarui, mengubah status kerja sama, atau meminta penghapusan posting dari platform kapan saja.",
      ],
    },
    terms: {
      intro: "Dengan mengakses dan menggunakan platform PartnerFind, Anda menyetujui ketentuan kerja sama berikut:",
      points: [
        "Pengguna bertanggung jawab penuh atas kebenaran posting kerja sama dan kesepakatan yang dijalankan antar partner.",
        "Komunikasi setelah pencocokan dilakukan secara langsung melalui platform perpesanan pilihan (WhatsApp, Telegram, Discord).",
        "Dilarang menyalahgunakan platform untuk tindakan spam, penipuan, atau kegiatan yang melanggar hukum.",
        "Ketentuan bagi hasil atau komisi platform diberlakukan secara transparan sesuai kesepakatan fitur yang digunakan.",
      ],
    },
  },
  "en-US": {
    about: {
      intro: "PartnerFind is a global platform bringing people together worldwide to directly discover, connect, and launch profitable business collaborations.",
      flowTitle: "Platform Core Workflow:",
      steps: [
        { bold: "Creators:", text: "Post collaboration proposals detailing the exact skills and joint ventures sought." },
        { bold: "Seekers:", text: "Discover ideal partnerships and joint projects through smart global search." },
        { bold: "Platform:", text: "Instantly matches compatible talent and business partners worldwide." },
        { bold: "Direct Contact:", text: "Connect directly via WhatsApp, Telegram, Discord, and more with zero middlemen." },
        { bold: "Revenue:", text: "Execute projects and earn together under transparent shared revenue terms." },
      ],
    },
    contact: {
      intro: "Have questions about collaborations, enterprise partnerships, or need assistance?",
      email: "collab@partnerfind.com",
      phone: "+1 (800) 555-0199 (Global Support)",
    },
    privacy: {
      intro: "We value your privacy and the security of your professional collaborations on PartnerFind:",
      points: [
        "Public contact links (such as WhatsApp, Telegram, or Discord) are used solely to help prospective partners reach out directly.",
        "We never sell your personal contact details, private communications, or project IP to third parties.",
        "You maintain full control to update your profile, pause matching status, or request data deletion anytime.",
      ],
    },
    terms: {
      intro: "By accessing and using PartnerFind, you agree to the following terms and guidelines:",
      points: [
        "Users are solely responsible for the authenticity of their collaboration postings and commercial agreements.",
        "All post-match communication and negotiations proceed directly between mutual parties.",
        "Strict prohibition applies against spam, misrepresentation, fraud, and unlawful activities.",
        "Platform monetization or revenue-share models are applied transparently per feature terms.",
      ],
    },
  },
  "es-ES": {
    about: {
      intro: "PartnerFind es una plataforma global que une a personas de todo el mundo para buscar, conectar y realizar colaboraciones comerciales rentables.",
      flowTitle: "Flujo Principal de la Plataforma:",
      steps: [
        { bold: "Creadores:", text: "Publican propuestas sobre el tipo de colaboración y habilidades buscadas." },
        { bold: "Buscadores:", text: "Encuentran proyectos y asociaciones ideales mediante búsqueda inteligente." },
        { bold: "Plataforma:", text: "Conecta perfiles compatibles y socios ideales al instante." },
        { bold: "Contacto Directo:", text: "Conexión directa por WhatsApp, Telegram, Discord u otros sin intermediarios." },
        { bold: "Ingresos:", text: "Generan ganancias conjuntas con modelos de monetización transparentes." },
      ],
    },
    contact: {
      intro: "Si tienes preguntas sobre colaboraciones, alianzas o necesitas asistencia:",
      email: "collab@partnerfind.com",
      phone: "+34 900 800 700 (Soporte en Español)",
    },
    privacy: {
      intro: "Valoramos tu privacidad y la seguridad de tus colaboraciones en PartnerFind:",
      points: [
        "La información de contacto público solo se utiliza para facilitar la conexión directa entre socios.",
        "No vendemos datos personales ni información de proyectos a terceros bajo ninguna circunstancia.",
        "Tienes el derecho de actualizar, modificar o solicitar la eliminación de tus publicaciones en cualquier momento.",
      ],
    },
    terms: {
      intro: "Al acceder y utilizar PartnerFind, aceptas los siguientes términos de colaboración:",
      points: [
        "Los usuarios son responsables de la veracidad de las publicaciones y acuerdos comerciales mutuos.",
        "La comunicación tras la coincidencia se realiza directamente mediante la aplicación de mensajería elegida.",
        "Queda prohibido el uso de la plataforma para spam, fraudes o actividades ilícitas.",
        "Los acuerdos de comisiones o reparto de ingresos se aplican de forma transparente según las funciones acordadas.",
      ],
    },
  },
  "fr-FR": {
    about: {
      intro: "PartnerFind est une plateforme mondiale qui réunit des personnes du monde entier pour rechercher, collaborer et générer des revenus ensemble.",
      flowTitle: "Fonctionnement Principal :",
      steps: [
        { bold: "Créateurs :", text: "Publient des propositions de collaboration précisant les compétences recherchées." },
        { bold: "Chercheurs :", text: "Trouvent des projets et partenaires idéaux grâce à la recherche intelligente." },
        { bold: "Plateforme :", text: "Met en relation instantanément les partenaires compatibles." },
        { bold: "Contact Direct :", text: "Échangez directement via WhatsApp, Telegram, Discord sans intermédiaire." },
        { bold: "Revenus :", text: "Générez des gains partagés selon des modalités transparentes." },
      ],
    },
    contact: {
      intro: "Pour toute question relative aux collaborations, partenariats ou assistance :",
      email: "collab@partnerfind.com",
      phone: "+33 1 89 00 00 00 (Support Global)",
    },
    privacy: {
      intro: "Nous accordons une grande importance à la confidentialité et à la sécurité de vos données :",
      points: [
        "Les coordonnées de contact public sont utilisées uniquement pour permettre la mise en relation directe.",
        "Nous ne vendons aucune donnée personnelle ou information de projet à des tiers.",
        "Vous disposez d'un droit permanent de modification ou de suppression de vos publications.",
      ],
    },
    terms: {
      intro: "En accédant à PartnerFind, vous acceptez les conditions d'utilisation suivantes :",
      points: [
        "Chaque utilisateur est responsable de la véracité de ses annonces et des accords conclus.",
        "Les échanges post-correspondance s'effectuent directement via les messageries choisies.",
        "Tout usage frauduleux, spam ou non conforme à la loi est strictement prohibé.",
      ],
    },
  },
  "ja-JP": {
    about: {
      intro: "PartnerFindは、世界中の人々が直接繋がり、収益を生み出すビジネスコラボレーションを実現するためのグローバルプラットフォームです。",
      flowTitle: "プラットフォームの基本フロー：",
      steps: [
        { bold: "募集者：", text: "求めるコラボレーション内容や必要なスキルを投稿します。" },
        { bold: "探索者：", text: "スマート検索を通じて希望に合った提携案件を見つけます。" },
        { bold: "マッチング：", text: "最適なパートナー同士を瞬時にマッチングします。" },
        { bold: "直接連絡：", text: "WhatsApp、Telegram、Discord等で仲介なしに直接やり取りを開始できます。" },
        { bold: "収益化：", text: "透明性のある条件の下で、共に成果と収益を生み出します。" },
      ],
    },
    contact: {
      intro: "提携やサポートに関するご質問がございましたら、お気軽にお問い合わせください：",
      email: "collab@partnerfind.com",
      phone: "+81 3-1234-5678（日本語サポート）",
    },
    privacy: {
      intro: "PartnerFindにおけるプライバシーとコラボレーションの安全性を最優先に保護します：",
      points: [
        "公開連絡先は、パートナー候補同士の直接連絡を円滑にする目的でのみ利用されます。",
        "個人情報やプロジェクト情報を第三者に販売することは一切ありません。",
        "ユーザーはいつでも掲載情報の更新や削除を自由に行う権利を有します。",
      ],
    },
    terms: {
      intro: "PartnerFindをご利用いただくにあたり、以下の利用規約に同意いただく必要があります：",
      points: [
        "掲載内容の正確性およびパートナー間の合意事項については各ユーザーが全責任を負います。",
        "マッチング後のコミュニケーションは選択した外部メッセージアプリで直接行われます。",
        "スパム、詐欺、法令違反行為は厳格に禁止されています。",
      ],
    },
  },
  "de-DE": {
    about: {
      intro: "PartnerFind ist eine globale Plattform, die Menschen weltweit vernetzt, um direkt profitable Partnerschaften und Kooperationen zu starten.",
      flowTitle: "Hauptablauf der Plattform:",
      steps: [
        { bold: "Ersteller:", text: "Veröffentlichen Angebote mit gesuchten Fachkenntnissen und Projektzielen." },
        { bold: "Suchende:", text: "Finden passende Kooperationsmöglichkeiten über die intelligente Suche." },
        { bold: "Plattform:", text: "Führt passende Partner und Fachkräfte sofort zusammen." },
        { bold: "Direktkontakt:", text: "Direkte Vernetzung über WhatsApp, Telegram, Discord ohne Zwischenhändler." },
        { bold: "Erträge:", text: "Gemeinsam Umsatz generieren mit transparenter Monetarisierung." },
      ],
    },
    contact: {
      intro: "Haben Sie Fragen zu Partnerschaften, Projekten oder benötigen Sie Hilfe?",
      email: "collab@partnerfind.com",
      phone: "+49 30 1234567 (Support)",
    },
    privacy: {
      intro: "Wir schätzen Ihre Privatsphäre und den Schutz Ihrer Daten auf PartnerFind sehr:",
      points: [
        "Öffentliche Kontaktdaten dienen ausschließlich der direkten Kontaktaufnahme zwischen Partnern.",
        "Wir verkaufen keine personenbezogenen Daten oder Projektdaten an Dritte.",
        "Sie haben jederzeit das Recht, Ihre Angaben zu aktualisieren oder Einträge zu löschen.",
      ],
    },
    terms: {
      intro: "Mit der Nutzung von PartnerFind stimmen Sie den folgenden Bedingungen zu:",
      points: [
        "Nutzer tragen die Verantwortung für die Richtigkeit ihrer Angebote und getroffenen Vereinbarungen.",
        "Die Kommunikation nach dem Match erfolgt direkt über die gewählten Messenger.",
        "Missbrauch für Spam, Betrug oder illegale Aktivitäten ist strengstens untersagt.",
      ],
    },
  },
  "zh-CN": {
    about: {
      intro: "PartnerFind 是一个全球商务合作平台，连接全球人才直接开展高价值商业合作并共同盈利。",
      flowTitle: "平台核心流程：",
      steps: [
        { bold: "发起人：", text: "发布所需的合作类型、业务目标及专业技能需求。" },
        { bold: "寻找者：", text: "通过智能全球检索发现理想的合作伙伴与商业机会。" },
        { bold: "平台匹配：", text: "精准算法快速匹配最合适的合作人选。" },
        { bold: "直接沟通：", text: "匹配成功后，通过微信、WhatsApp、Telegram、Discord等直接对接。" },
        { bold: "共同收益：", text: "在透明的合作机制下落地项目，共创商业价值与收益。" },
      ],
    },
    contact: {
      intro: "如果您对商务合作、企业入驻有任何疑问或需要帮助：",
      email: "collab@partnerfind.com",
      phone: "+86 400-800-9999 (客服支持)",
    },
    privacy: {
      intro: "我们高度重视您在 PartnerFind 平台上的隐私与商业数据安全：",
      points: [
        "公开联系方式仅用于促成合作双方之间的直接对接沟通。",
        "我们绝不会向任何第三方出售您的个人数据或项目机密信息。",
        "您随时拥有修改、暂停展示或删除发布内容的完整权利。",
      ],
    },
    terms: {
      intro: "访问并使用 PartnerFind 即表示您同意遵守以下服务条款：",
      points: [
        "用户对其发布的合作信息真实性及双方达成的合作协议负全部责任。",
        "匹配后的商务洽谈由双方在选定的即时通讯工具中直接进行。",
        "严禁利用平台从事垃圾信息发布、虚假宣传或违法违规行为。",
      ],
    },
  },
  "ru-RU": {
    about: {
      intro: "PartnerFind — это международная платформа, объединяющая людей со всего мира для прямого поиска партнеров и совместного прибыльного сотрудничества.",
      flowTitle: "Основной процесс платформы:",
      steps: [
        { bold: "Создатели:", text: "Публикуют предложения о сотрудничестве и требуемых компетенциях." },
        { bold: "Искатели:", text: "Находят подходящие партнерские проекты через умный поиск." },
        { bold: "Платформа:", text: "Мгновенно сопоставляет подходящих кандидатов и партнеров." },
        { bold: "Прямой контакт:", text: "Связывайтесь напрямую через Telegram, WhatsApp или Discord без посредников." },
        { bold: "Доход:", text: "Зарабатывайте вместе на прозрачных и взаимовыгодных условиях." },
      ],
    },
    contact: {
      intro: "По вопросам сотрудничества, партнерских программ или технической помощи:",
      email: "collab@partnerfind.com",
      phone: "+7 495 000-00-00 (Поддержка)",
    },
    privacy: {
      intro: "Мы гарантируем безопасность и конфиденциальность ваших данных на PartnerFind:",
      points: [
        "Публичные контакты используются исключительно для прямой связи потенциальных партнеров.",
        "Мы не передаем и не продаем личные данные и информацию о проектах третьим лицам.",
        "Вы можете изменить или удалить свои публикации в любое удобное время.",
      ],
    },
    terms: {
      intro: "Используя платформу PartnerFind, вы соглашаетесь со следующими условиями:",
      points: [
        "Пользователи несут полную ответственность за достоверность публикаций и договоренностей.",
        "Общение после подбора партнеров происходит напрямую в выбранных мессенджерах.",
        "Спам, мошенничество и любые незаконные действия строго запрещены.",
      ],
    },
  },
  "ar-SA": {
    about: {
      intro: "PartnerFind هي منصة عالمية تجمع الأشخاص من جميع أنحاء العالم للبحث والتعاون المباشر لتوليد الأرباح والمشاريع الناجحة.",
      flowTitle: "سير العمل الأساسي في المنصة:",
      steps: [
        { bold: "المنشئون:", text: "نشر عروض التعاون وتحديد المهارات المطلوبة." },
        { bold: "الباحثون:", text: "العثور على الشراكات المناسبة عبر البحث الذكي." },
        { bold: "المنصة:", text: "ربط الشركاء المتوافقين في غضون ثوانٍ." },
        { bold: "تواصل مباشر:", text: "التواصل الفوري عبر WhatsApp أو Telegram أو Discord بدون وسطاء." },
        { bold: "الأرباح:", text: "تحقيق إيرادات مشتركة بنماذج عمل شفافة وعادلة." },
      ],
    },
    contact: {
      intro: "إذا كانت لديك استفسارات حول الشراكات أو التعاون أو تحتاج إلى مساعدة:",
      email: "collab@partnerfind.com",
      phone: "+966 800 123 4567 (دعم العملاء)",
    },
    privacy: {
      intro: "نحن نقدر خصوصيتك وأمان تعاملاتك عبر منصة PartnerFind:",
      points: [
        "تُستخدم معلومات الاتصال العامة فقط لتسهيل التواصل المباشر بين الشركاء المحتملين.",
        "نحن لا نبيع بياناتك الشخصية أو معلومات مشاريعك لأي طرف ثالث.",
        "لديك الحق الكامل في تعديل أو حذف منشوراتك من المنصة في أي وقت.",
      ],
    },
    terms: {
      intro: "من خلال استخدام منصة PartnerFind، فإنك توافق على الشروط التالية:",
      points: [
        "يتحمل المستخدم المسؤولية الكاملة عن صحة المنشورات والاتفاقات المبرمة بين الشركاء.",
        "تتم المحادثات بعد المطابقة مباشرة عبر تطبيقات المراسلة المفضلة.",
        "يُحظر تمامًا استخدام المنصة للرسائل العشوائية أو الاحتيال أو الأنشطة غير القانونية.",
      ],
    },
  },
  "tr-TR": {
    about: {
      intro: "PartnerFind, dünyanın her yerinden insanları doğrudan aramak, bağlantı kurmak ve para kazandıran iş birlikleri gerçekleştirmek için bir araya getiren küresel bir platformdur.",
      flowTitle: "Platformun Ana İşleyişi:",
      steps: [
        { bold: "Oluşturucular:", text: "Aranan iş birliği türünü ve uzmanlıkları belirten ilanlar oluşturur." },
        { bold: "Arayanlar:", text: "Akıllı arama ile istedikleri ortaklık türünü hızlıca bulur." },
        { bold: "Platform:", text: "Uyumlu profilleri ve iş ortaklarını anında eşleştirir." },
        { bold: "Doğrudan İletişim:", text: "Eşleşmeden sonra WhatsApp, Telegram, Discord üzerinden aracısız doğrudan görüşün." },
        { bold: "Gelir:", text: "Şeffaf gelir paylaşımı modelleriyle birlikte kazanın." },
      ],
    },
    contact: {
      intro: "İş birliği, ortaklık veya destekle ilgili sorularınız için:",
      email: "collab@partnerfind.com",
      phone: "+90 850 000 00 00 (Destek)",
    },
    privacy: {
      intro: "PartnerFind platformundaki gizliliğinize ve güvenliğinize büyük önem veriyoruz:",
      points: [
        "Herkese açık iletişim bilgileri sadece potansiyel ortakların doğrudan bağlantı kurmasını kolaylaştırmak için kullanılır.",
        "Kişisel verilerinizi veya proje bilgilerinizi asla üçüncü taraflara satmayız.",
        "İlanlarınızı istediğiniz zaman güncelleme veya silme hakkına sahipsiniz.",
      ],
    },
    terms: {
      intro: "PartnerFind platformunu kullanarak aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız:",
      points: [
        "Kullanıcılar paylaştıkları ilanların ve yapılan anlaşmaların doğruluğundan tamamen kendileri sorumludur.",
        "Eşleşme sonrası iletişim doğrudan seçilen mesajlaşma uygulamaları üzerinden yürütülür.",
        "Platformun spam, dolandırıcılık veya yasa dışı faaliyetler için kullanılması kesinlikle yasaktır.",
      ],
    },
  },
  "ko-KR": {
    about: {
      intro: "PartnerFind은 전 세계 사람들이 직접 검색하고 연결하여 함께 수익을 창출하는 글로벌 비즈니스 협업 플랫폼입니다.",
      flowTitle: "플랫폼 핵심 프로세스:",
      steps: [
        { bold: "모집자:", text: "필요한 협업 분야와 기술 역량을 상세히 게시합니다." },
        { bold: "탐색자:", text: "스마트 글로벌 검색을 통해 원하는 제휴 프로젝트를 탐색합니다." },
        { bold: "플랫폼 매칭:", text: "가장 적합한 인재와 비즈니스 파트너를 실시간 매칭합니다." },
        { bold: "직접 연결:", text: "매칭 후 중개자 없이 WhatsApp, Telegram, Discord 등으로 즉시 소통합니다." },
        { bold: "수익 창출:", text: "투명한 수익 분배 모델을 바탕으로 함께 성공적인 비즈니스를 완성합니다." },
      ],
    },
    contact: {
      intro: "협업, 파트너십 또는 지원 관련 문의사항이 있으시면 언제든 연락주세요:",
      email: "collab@partnerfind.com",
      phone: "+82 2-1234-5678 (고객 지원)",
    },
    privacy: {
      intro: "PartnerFind은 회원의 개인정보와 협업 보안을 최우선으로 보호합니다:",
      points: [
        "공개된 연락처는 잠재적 파트너 간의 직접 소통을 돕는 목적으로만 사용됩니다.",
        "당사는 개인정보나 프로젝트 기밀을 제3자에게 절대 판매하지 않습니다.",
        "언제든 게시물을 수정, 비공개 또는 삭제할 수 있는 완전한 권리를 가집니다.",
      ],
    },
    terms: {
      intro: "PartnerFind 플랫폼을 이용함으로써 다음 이용 약관에 동의하게 됩니다:",
      points: [
        "회원은 게시한 협업 내용의 진실성과 파트너 간의 합의 사항에 대해 전적인 책임을 집니다.",
        "매칭 완료 후 소통은 선택한 메신저 앱을 통해 당사자 간 직접 진행됩니다.",
        "스팸, 사기, 불법 행위 목적으로의 플랫폼 오남용은 엄격히 금지됩니다.",
      ],
    },
  },
  "pt-PT": {
    about: {
      intro: "A PartnerFind é uma plataforma global que reúne pessoas de todo o mundo para procurar, conectar e realizar colaborações comerciais lucrativas.",
      flowTitle: "Fluxo Principal da Plataforma:",
      steps: [
        { bold: "Criadores:", text: "Publicam propostas detalhando o tipo de colaboração e competências pretendidas." },
        { bold: "Pesquisadores:", text: "Encontram parcerias ideais através da pesquisa inteligente." },
        { bold: "Plataforma:", text: "Emparelha perfis compatíveis e parceiros de negócio instantaneamente." },
        { bold: "Contacto Direto:", text: "Comunique diretamente via WhatsApp, Telegram ou Discord sem intermediários." },
        { bold: "Rendimento:", text: "Gere lucros conjuntos através de modelos de monetização transparentes." },
      ],
    },
    contact: {
      intro: "Se tiver dúvidas sobre colaborações, parcerias ou precisar de assistência:",
      email: "collab@partnerfind.com",
      phone: "+351 21 000 0000 (Suporte)",
    },
    privacy: {
      intro: "Valorizamos a sua privacidade e a segurança das suas colaborações na PartnerFind:",
      points: [
        "As informações de contacto público são utilizadas apenas para facilitar a ligação direta entre parceiros.",
        "Não vendemos dados pessoais ou detalhes de projetos a terceiros sob nenhuma circunstância.",
        "Tem o direito de atualizar, alterar o estado ou solicitar a eliminação das suas publicações a qualquer momento.",
      ],
    },
    terms: {
      intro: "Ao aceder e utilizar a plataforma PartnerFind, concorda com os seguintes termos:",
      points: [
        "Os utilizadores são responsáveis pela veracidade das publicações e acordos bilaterais.",
        "A comunicação pós-emparelhamento realiza-se diretamente através das aplicações de mensagens escolhidas.",
        "É estritamente proibido o uso da plataforma para spam, fraudes ou atividades ilegais.",
      ],
    },
  },
};

export function getLegalModalData(locale: Locale): ModalContent {
  return legalModalData[locale] || legalModalData["en-US"];
}
