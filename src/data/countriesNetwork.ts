export interface CountryNetworkData {
  code: string;
  name: string;
  nameEn: string;
  flag: string;
  continent: "Asia" | "Eropa" | "Amerika Utara" | "Amerika Latin" | "Afrika" | "Oseania" | "Timur Tengah";
  nodes: number; // Titik Lokasi
  activeInviters: number; // Pengundang Aktif / Partner
  targetPartners?: number; // Target Partner
  growth: number; // Pertumbuhan %
  status: "Super Hub" | "Ekspansi Cepat" | "Aktif & Stabil" | "Node Baru";
  topCity: string;
}

export const CONTINENTS = [
  "Semua",
  "Asia",
  "Eropa",
  "Amerika Utara",
  "Amerika Latin",
  "Afrika",
  "Oseania",
  "Timur Tengah",
] as const;

export const GLOBAL_COUNTRIES_NETWORK: CountryNetworkData[] = [
  // ── ASIA ──
  { code: "ID", name: "Indonesia", nameEn: "Indonesia", flag: "🇮🇩", continent: "Asia", nodes: 485200, activeInviters: 42100, growth: 34.5, status: "Super Hub", topCity: "Jakarta" },
  { code: "JP", name: "Jepang", nameEn: "Japan", flag: "🇯🇵", continent: "Asia", nodes: 218400, activeInviters: 19400, growth: 18.2, status: "Super Hub", topCity: "Tokyo" },
  { code: "SG", name: "Singapura", nameEn: "Singapore", flag: "🇸🇬", continent: "Asia", nodes: 98400, activeInviters: 8900, growth: 22.4, status: "Super Hub", topCity: "Singapore" },
  { code: "MY", name: "Malaysia", nameEn: "Malaysia", flag: "🇲🇾", continent: "Asia", nodes: 142000, activeInviters: 12500, growth: 26.8, status: "Ekspansi Cepat", topCity: "Kuala Lumpur" },
  { code: "KR", name: "Korea Selatan", nameEn: "South Korea", flag: "🇰🇷", continent: "Asia", nodes: 195000, activeInviters: 16800, growth: 21.0, status: "Super Hub", topCity: "Seoul" },
  { code: "CN", name: "Tiongkok", nameEn: "China", flag: "🇨🇳", continent: "Asia", nodes: 380000, activeInviters: 31200, growth: 15.6, status: "Super Hub", topCity: "Shanghai" },
  { code: "IN", name: "India", nameEn: "India", flag: "🇮🇳", continent: "Asia", nodes: 342000, activeInviters: 28900, growth: 38.1, status: "Super Hub", topCity: "Bengaluru" },
  { code: "TH", name: "Thailand", nameEn: "Thailand", flag: "🇹🇭", continent: "Asia", nodes: 112000, activeInviters: 9400, growth: 24.3, status: "Ekspansi Cepat", topCity: "Bangkok" },
  { code: "VN", name: "Vietnam", nameEn: "Vietnam", flag: "🇻🇳", continent: "Asia", nodes: 128500, activeInviters: 11200, growth: 31.2, status: "Ekspansi Cepat", topCity: "Ho Chi Minh" },
  { code: "PH", name: "Filipina", nameEn: "Philippines", flag: "🇵🇭", continent: "Asia", nodes: 136000, activeInviters: 11900, growth: 29.5, status: "Ekspansi Cepat", topCity: "Manila" },
  { code: "TW", name: "Taiwan", nameEn: "Taiwan", flag: "🇹🇼", continent: "Asia", nodes: 84000, activeInviters: 7200, growth: 17.8, status: "Aktif & Stabil", topCity: "Taipei" },
  { code: "HK", name: "Hong Kong", nameEn: "Hong Kong", flag: "🇭🇰", continent: "Asia", nodes: 76000, activeInviters: 6800, growth: 14.5, status: "Aktif & Stabil", topCity: "Hong Kong" },
  { code: "BD", name: "Bangladesh", nameEn: "Bangladesh", flag: "🇧🇩", continent: "Asia", nodes: 64000, activeInviters: 5100, growth: 33.0, status: "Ekspansi Cepat", topCity: "Dhaka" },
  { code: "PK", name: "Pakistan", nameEn: "Pakistan", flag: "🇵🇰", continent: "Asia", nodes: 72000, activeInviters: 5900, growth: 28.4, status: "Ekspansi Cepat", topCity: "Karachi" },
  { code: "LK", name: "Sri Lanka", nameEn: "Sri Lanka", flag: "🇱🇰", continent: "Asia", nodes: 28400, activeInviters: 2300, growth: 19.2, status: "Aktif & Stabil", topCity: "Colombo" },
  { code: "NP", name: "Nepal", nameEn: "Nepal", flag: "🇳🇵", continent: "Asia", nodes: 19200, activeInviters: 1500, growth: 25.1, status: "Node Baru", topCity: "Kathmandu" },
  { code: "KH", name: "Kamboja", nameEn: "Cambodia", flag: "🇰🇭", continent: "Asia", nodes: 24000, activeInviters: 1900, growth: 27.6, status: "Node Baru", topCity: "Phnom Penh" },
  { code: "MM", name: "Myanmar", nameEn: "Myanmar", flag: "🇲🇲", continent: "Asia", nodes: 18500, activeInviters: 1400, growth: 16.4, status: "Node Baru", topCity: "Yangon" },
  { code: "LA", name: "Laos", nameEn: "Laos", flag: "🇱🇦", continent: "Asia", nodes: 12400, activeInviters: 950, growth: 22.0, status: "Node Baru", topCity: "Vientiane" },
  { code: "BN", name: "Brunei Darussalam", nameEn: "Brunei", flag: "🇧🇳", continent: "Asia", nodes: 14800, activeInviters: 1200, growth: 12.8, status: "Aktif & Stabil", topCity: "Bandar Seri Begawan" },
  { code: "MN", name: "Mongolia", nameEn: "Mongolia", flag: "🇲🇳", continent: "Asia", nodes: 9800, activeInviters: 760, growth: 15.3, status: "Node Baru", topCity: "Ulaanbaatar" },
  { code: "KZ", name: "Kazakhstan", nameEn: "Kazakhstan", flag: "🇰🇿", continent: "Asia", nodes: 32000, activeInviters: 2600, growth: 23.4, status: "Aktif & Stabil", topCity: "Almaty" },
  { code: "UZ", name: "Uzbekistan", nameEn: "Uzbekistan", flag: "🇺🇿", continent: "Asia", nodes: 26500, activeInviters: 2100, growth: 30.5, status: "Ekspansi Cepat", topCity: "Tashkent" },
  { code: "KG", name: "Kirgizstan", nameEn: "Kyrgyzstan", flag: "🇰🇬", continent: "Asia", nodes: 11200, activeInviters: 890, growth: 18.7, status: "Node Baru", topCity: "Bishkek" },
  { code: "TJ", name: "Tajikistan", nameEn: "Tajikistan", flag: "🇹🇯", continent: "Asia", nodes: 8900, activeInviters: 680, growth: 16.2, status: "Node Baru", topCity: "Dushanbe" },
  { code: "TM", name: "Turkmenistan", nameEn: "Turkmenistan", flag: "🇹🇲", continent: "Asia", nodes: 7400, activeInviters: 520, growth: 11.0, status: "Node Baru", topCity: "Ashgabat" },
  { code: "AZ", name: "Azerbaijan", nameEn: "Azerbaijan", flag: "🇦🇿", continent: "Asia", nodes: 21000, activeInviters: 1750, growth: 20.4, status: "Aktif & Stabil", topCity: "Baku" },
  { code: "GE", name: "Georgia", nameEn: "Georgia", flag: "🇬🇪", continent: "Asia", nodes: 18400, activeInviters: 1520, growth: 22.8, status: "Aktif & Stabil", topCity: "Tbilisi" },
  { code: "AM", name: "Armenia", nameEn: "Armenia", flag: "🇦🇲", continent: "Asia", nodes: 14200, activeInviters: 1180, growth: 17.5, status: "Node Baru", topCity: "Yerevan" },
  { code: "MV", name: "Maladewa", nameEn: "Maldives", flag: "🇲🇻", continent: "Asia", nodes: 6800, activeInviters: 540, growth: 14.2, status: "Node Baru", topCity: "Malé" },
  { code: "BT", name: "Bhutan", nameEn: "Bhutan", flag: "🇧🇹", continent: "Asia", nodes: 4200, activeInviters: 320, growth: 10.5, status: "Node Baru", topCity: "Thimphu" },
  { code: "TL", name: "Timor Leste", nameEn: "East Timor", flag: "🇹🇱", continent: "Asia", nodes: 5800, activeInviters: 450, growth: 19.8, status: "Node Baru", topCity: "Dili" },
  { code: "MO", name: "Makau", nameEn: "Macau", flag: "🇲🇴", continent: "Asia", nodes: 12500, activeInviters: 1100, growth: 13.2, status: "Aktif & Stabil", topCity: "Macau" },

  // ── AMERIKA UTARA ──
  { code: "US", name: "Amerika Serikat", nameEn: "United States", flag: "🇺🇸", continent: "Amerika Utara", nodes: 412000, activeInviters: 36500, growth: 19.4, status: "Super Hub", topCity: "San Francisco" },
  { code: "CA", name: "Kanada", nameEn: "Canada", flag: "🇨🇦", continent: "Amerika Utara", nodes: 184000, activeInviters: 15200, growth: 17.6, status: "Super Hub", topCity: "Toronto" },
  { code: "MX", name: "Meksiko", nameEn: "Mexico", flag: "🇲🇽", continent: "Amerika Utara", nodes: 128000, activeInviters: 10800, growth: 28.2, status: "Ekspansi Cepat", topCity: "Mexico City" },
  { code: "CR", name: "Kosta Rika", nameEn: "Costa Rica", flag: "🇨🇷", continent: "Amerika Utara", nodes: 22400, activeInviters: 1850, growth: 21.3, status: "Aktif & Stabil", topCity: "San José" },
  { code: "PA", name: "Panama", nameEn: "Panama", flag: "🇵🇦", continent: "Amerika Utara", nodes: 19800, activeInviters: 1620, growth: 23.5, status: "Aktif & Stabil", topCity: "Panama City" },
  { code: "DO", name: "Republik Dominika", nameEn: "Dominican Republic", flag: "🇩🇴", continent: "Amerika Utara", nodes: 24500, activeInviters: 2010, growth: 25.4, status: "Ekspansi Cepat", topCity: "Santo Domingo" },
  { code: "PR", name: "Puerto Riko", nameEn: "Puerto Rico", flag: "🇵🇷", continent: "Amerika Utara", nodes: 16800, activeInviters: 1380, growth: 16.0, status: "Aktif & Stabil", topCity: "San Juan" },
  { code: "GT", name: "Guatemala", nameEn: "Guatemala", flag: "🇬🇹", continent: "Amerika Utara", nodes: 17600, activeInviters: 1420, growth: 24.1, status: "Node Baru", topCity: "Guatemala City" },
  { code: "JM", name: "Jamaika", nameEn: "Jamaica", flag: "🇯🇲", continent: "Amerika Utara", nodes: 11400, activeInviters: 920, growth: 18.0, status: "Node Baru", topCity: "Kingston" },
  { code: "TT", name: "Trinidad dan Tobago", nameEn: "Trinidad and Tobago", flag: "🇹🇹", continent: "Amerika Utara", nodes: 8900, activeInviters: 730, growth: 15.2, status: "Node Baru", topCity: "Port of Spain" },
  { code: "HN", name: "Honduras", nameEn: "Honduras", flag: "🇭🇳", continent: "Amerika Utara", nodes: 13200, activeInviters: 1050, growth: 22.4, status: "Node Baru", topCity: "Tegucigalpa" },
  { code: "SV", name: "El Salvador", nameEn: "El Salvador", flag: "🇸🇻", continent: "Amerika Utara", nodes: 15400, activeInviters: 1280, growth: 26.5, status: "Ekspansi Cepat", topCity: "San Salvador" },
  { code: "NI", name: "Nikaragua", nameEn: "Nicaragua", flag: "🇳🇮", continent: "Amerika Utara", nodes: 9800, activeInviters: 780, growth: 19.1, status: "Node Baru", topCity: "Managua" },
  { code: "BS", name: "Bahama", nameEn: "Bahamas", flag: "🇧🇸", continent: "Amerika Utara", nodes: 6200, activeInviters: 490, growth: 12.4, status: "Node Baru", topCity: "Nassau" },
  { code: "BB", name: "Barbados", nameEn: "Barbados", flag: "🇧🇧", continent: "Amerika Utara", nodes: 4800, activeInviters: 390, growth: 14.1, status: "Node Baru", topCity: "Bridgetown" },
  { code: "BZ", name: "Belize", nameEn: "Belize", flag: "🇧🇿", continent: "Amerika Utara", nodes: 3900, activeInviters: 310, growth: 16.3, status: "Node Baru", topCity: "Belmopan" },
  { code: "CU", name: "Kuba", nameEn: "Cuba", flag: "🇨🇺", continent: "Amerika Utara", nodes: 8200, activeInviters: 640, growth: 11.2, status: "Node Baru", topCity: "Havana" },
  { code: "HT", name: "Haiti", nameEn: "Haiti", flag: "🇭🇹", continent: "Amerika Utara", nodes: 5400, activeInviters: 410, growth: 13.8, status: "Node Baru", topCity: "Port-au-Prince" },
  { code: "BM", name: "Bermuda", nameEn: "Bermuda", flag: "🇧🇲", continent: "Amerika Utara", nodes: 3400, activeInviters: 280, growth: 10.2, status: "Node Baru", topCity: "Hamilton" },
  { code: "KY", name: "Kepulauan Cayman", nameEn: "Cayman Islands", flag: "🇰🇾", continent: "Amerika Utara", nodes: 4100, activeInviters: 340, growth: 12.8, status: "Node Baru", topCity: "George Town" },

  // ── AMERIKA LATIN ──
  { code: "BR", name: "Brasil", nameEn: "Brazil", flag: "🇧🇷", continent: "Amerika Latin", nodes: 268000, activeInviters: 22400, growth: 32.0, status: "Super Hub", topCity: "São Paulo" },
  { code: "AR", name: "Argentina", nameEn: "Argentina", flag: "🇦🇷", continent: "Amerika Latin", nodes: 132000, activeInviters: 11000, growth: 25.8, status: "Ekspansi Cepat", topCity: "Buenos Aires" },
  { code: "CO", name: "Kolombia", nameEn: "Colombia", flag: "🇨🇴", continent: "Amerika Latin", nodes: 118000, activeInviters: 9800, growth: 29.4, status: "Ekspansi Cepat", topCity: "Bogotá" },
  { code: "CL", name: "Chili", nameEn: "Chile", flag: "🇨🇱", continent: "Amerika Latin", nodes: 88000, activeInviters: 7400, growth: 20.1, status: "Aktif & Stabil", topCity: "Santiago" },
  { code: "PE", name: "Peru", nameEn: "Peru", flag: "🇵🇪", continent: "Amerika Latin", nodes: 74000, activeInviters: 6100, growth: 24.6, status: "Ekspansi Cepat", topCity: "Lima" },
  { code: "EC", name: "Ekuador", nameEn: "Ecuador", flag: "🇪🇨", continent: "Amerika Latin", nodes: 38000, activeInviters: 3100, growth: 22.0, status: "Aktif & Stabil", topCity: "Quito" },
  { code: "UY", name: "Uruguay", nameEn: "Uruguay", flag: "🇺🇾", continent: "Amerika Latin", nodes: 28000, activeInviters: 2400, growth: 18.5, status: "Aktif & Stabil", topCity: "Montevideo" },
  { code: "PY", name: "Paraguay", nameEn: "Paraguay", flag: "🇵🇾", continent: "Amerika Latin", nodes: 21500, activeInviters: 1750, growth: 21.0, status: "Aktif & Stabil", topCity: "Asunción" },
  { code: "BO", name: "Bolivia", nameEn: "Bolivia", flag: "🇧🇴", continent: "Amerika Latin", nodes: 23000, activeInviters: 1890, growth: 23.2, status: "Node Baru", topCity: "La Paz" },
  { code: "VE", name: "Venezuela", nameEn: "Venezuela", flag: "🇻🇪", continent: "Amerika Latin", nodes: 31000, activeInviters: 2500, growth: 19.5, status: "Aktif & Stabil", topCity: "Caracas" },
  { code: "GY", name: "Guyana", nameEn: "Guyana", flag: "🇬🇾", continent: "Amerika Latin", nodes: 4600, activeInviters: 370, growth: 28.0, status: "Node Baru", topCity: "Georgetown" },
  { code: "SR", name: "Suriname", nameEn: "Suriname", flag: "🇸🇷", continent: "Amerika Latin", nodes: 3800, activeInviters: 300, growth: 16.4, status: "Node Baru", topCity: "Paramaribo" },

  // ── EROPA ──
  { code: "GB", name: "Inggris Raya", nameEn: "United Kingdom", flag: "🇬🇧", continent: "Eropa", nodes: 254000, activeInviters: 21500, growth: 16.8, status: "Super Hub", topCity: "London" },
  { code: "DE", name: "Jerman", nameEn: "Germany", flag: "🇩🇪", continent: "Eropa", nodes: 242000, activeInviters: 20100, growth: 15.2, status: "Super Hub", topCity: "Berlin" },
  { code: "FR", name: "Prancis", nameEn: "France", flag: "🇫🇷", continent: "Eropa", nodes: 210000, activeInviters: 17800, growth: 16.0, status: "Super Hub", topCity: "Paris" },
  { code: "NL", name: "Belanda", nameEn: "Netherlands", flag: "🇳🇱", continent: "Eropa", nodes: 138000, activeInviters: 12100, growth: 18.9, status: "Super Hub", topCity: "Amsterdam" },
  { code: "ES", name: "Spanyol", nameEn: "Spain", flag: "🇪🇸", continent: "Eropa", nodes: 165000, activeInviters: 14200, growth: 22.5, status: "Super Hub", topCity: "Madrid" },
  { code: "IT", name: "Italia", nameEn: "Italy", flag: "🇮🇹", continent: "Eropa", nodes: 148000, activeInviters: 12400, growth: 17.3, status: "Ekspansi Cepat", topCity: "Milan" },
  { code: "CH", name: "Swiss", nameEn: "Switzerland", flag: "🇨🇭", continent: "Eropa", nodes: 92000, activeInviters: 8100, growth: 14.2, status: "Aktif & Stabil", topCity: "Zurich" },
  { code: "SE", name: "Swedia", nameEn: "Sweden", flag: "🇸🇪", continent: "Eropa", nodes: 86000, activeInviters: 7600, growth: 16.5, status: "Aktif & Stabil", topCity: "Stockholm" },
  { code: "PL", name: "Polandia", nameEn: "Poland", flag: "🇵🇱", continent: "Eropa", nodes: 114000, activeInviters: 9900, growth: 26.0, status: "Ekspansi Cepat", topCity: "Warsaw" },
  { code: "BE", name: "Belgia", nameEn: "Belgium", flag: "🇧🇪", continent: "Eropa", nodes: 78000, activeInviters: 6900, growth: 15.8, status: "Aktif & Stabil", topCity: "Brussels" },
  { code: "AT", name: "Austria", nameEn: "Austria", flag: "🇦🇹", continent: "Eropa", nodes: 64000, activeInviters: 5600, growth: 14.8, status: "Aktif & Stabil", topCity: "Vienna" },
  { code: "NO", name: "Norwegia", nameEn: "Norway", flag: "🇳🇴", continent: "Eropa", nodes: 62000, activeInviters: 5400, growth: 15.0, status: "Aktif & Stabil", topCity: "Oslo" },
  { code: "DK", name: "Denmark", nameEn: "Denmark", flag: "🇩🇰", continent: "Eropa", nodes: 59000, activeInviters: 5100, growth: 14.5, status: "Aktif & Stabil", topCity: "Copenhagen" },
  { code: "FI", name: "Finlandia", nameEn: "Finland", flag: "🇫🇮", continent: "Eropa", nodes: 54000, activeInviters: 4700, growth: 13.8, status: "Aktif & Stabil", topCity: "Helsinki" },
  { code: "IE", name: "Irlandia", nameEn: "Ireland", flag: "🇮🇪", continent: "Eropa", nodes: 68000, activeInviters: 5900, growth: 19.2, status: "Aktif & Stabil", topCity: "Dublin" },
  { code: "PT", name: "Portugal", nameEn: "Portugal", flag: "🇵🇹", continent: "Eropa", nodes: 76000, activeInviters: 6600, growth: 24.1, status: "Ekspansi Cepat", topCity: "Lisbon" },
  { code: "CZ", name: "Republik Ceko", nameEn: "Czech Republic", flag: "🇨🇿", continent: "Eropa", nodes: 62000, activeInviters: 5300, growth: 18.4, status: "Aktif & Stabil", topCity: "Prague" },
  { code: "RO", name: "Rumania", nameEn: "Romania", flag: "🇷🇴", continent: "Eropa", nodes: 68000, activeInviters: 5800, growth: 27.5, status: "Ekspansi Cepat", topCity: "Bucharest" },
  { code: "HU", name: "Hungaria", nameEn: "Hungary", flag: "🇭🇺", continent: "Eropa", nodes: 44000, activeInviters: 3800, growth: 17.2, status: "Aktif & Stabil", topCity: "Budapest" },
  { code: "GR", name: "Yunani", nameEn: "Greece", flag: "🇬🇷", continent: "Eropa", nodes: 49000, activeInviters: 4100, growth: 19.0, status: "Aktif & Stabil", topCity: "Athens" },
  { code: "UA", name: "Ukraina", nameEn: "Ukraine", flag: "🇺🇦", continent: "Eropa", nodes: 82000, activeInviters: 7100, growth: 23.4, status: "Aktif & Stabil", topCity: "Kyiv" },
  { code: "SK", name: "Slowakia", nameEn: "Slovakia", flag: "🇸🇰", continent: "Eropa", nodes: 31000, activeInviters: 2650, growth: 16.8, status: "Aktif & Stabil", topCity: "Bratislava" },
  { code: "BG", name: "Bulgaria", nameEn: "Bulgaria", flag: "🇧🇬", continent: "Eropa", nodes: 34000, activeInviters: 2900, growth: 21.0, status: "Aktif & Stabil", topCity: "Sofia" },
  { code: "HR", name: "Kroasia", nameEn: "Croatia", flag: "🇭🇷", continent: "Eropa", nodes: 27000, activeInviters: 2300, growth: 18.0, status: "Aktif & Stabil", topCity: "Zagreb" },
  { code: "RS", name: "Serbia", nameEn: "Serbia", flag: "🇷🇸", continent: "Eropa", nodes: 29000, activeInviters: 2450, growth: 22.8, status: "Aktif & Stabil", topCity: "Belgrade" },
  { code: "LT", name: "Lithuania", nameEn: "Lithuania", flag: "🇱🇹", continent: "Eropa", nodes: 24000, activeInviters: 2050, growth: 19.5, status: "Aktif & Stabil", topCity: "Vilnius" },
  { code: "SI", name: "Slovenia", nameEn: "Slovenia", flag: "🇸🇮", continent: "Eropa", nodes: 21000, activeInviters: 1800, growth: 15.4, status: "Aktif & Stabil", topCity: "Ljubljana" },
  { code: "LV", name: "Latvia", nameEn: "Latvia", flag: "🇱🇻", continent: "Eropa", nodes: 19500, activeInviters: 1650, growth: 17.2, status: "Node Baru", topCity: "Riga" },
  { code: "EE", name: "Estonia", nameEn: "Estonia", flag: "🇪🇪", continent: "Eropa", nodes: 26000, activeInviters: 2300, growth: 25.0, status: "Ekspansi Cepat", topCity: "Tallinn" },
  { code: "CY", name: "Siprus", nameEn: "Cyprus", flag: "🇨🇾", continent: "Eropa", nodes: 18000, activeInviters: 1550, growth: 18.3, status: "Node Baru", topCity: "Nicosia" },
  { code: "LU", name: "Luksemburg", nameEn: "Luxembourg", flag: "🇱🇺", continent: "Eropa", nodes: 16500, activeInviters: 1450, growth: 13.0, status: "Aktif & Stabil", topCity: "Luxembourg" },
  { code: "MT", name: "Malta", nameEn: "Malta", flag: "🇲🇹", continent: "Eropa", nodes: 12000, activeInviters: 1050, growth: 16.4, status: "Node Baru", topCity: "Valletta" },
  { code: "IS", name: "Islandia", nameEn: "Iceland", flag: "🇮🇸", continent: "Eropa", nodes: 11000, activeInviters: 950, growth: 12.0, status: "Node Baru", topCity: "Reykjavik" },
  { code: "AL", name: "Albania", nameEn: "Albania", flag: "🇦🇱", continent: "Eropa", nodes: 14500, activeInviters: 1200, growth: 24.0, status: "Node Baru", topCity: "Tirana" },
  { code: "BA", name: "Bosnia dan Herzegovina", nameEn: "Bosnia and Herzegovina", flag: "🇧🇦", continent: "Eropa", nodes: 13500, activeInviters: 1100, growth: 17.5, status: "Node Baru", topCity: "Sarajevo" },
  { code: "MK", name: "Makedonia Utara", nameEn: "North Macedonia", flag: "🇲🇰", continent: "Eropa", nodes: 11800, activeInviters: 980, growth: 19.0, status: "Node Baru", topCity: "Skopje" },
  { code: "MD", name: "Moldova", nameEn: "Moldova", flag: "🇲🇩", continent: "Eropa", nodes: 12400, activeInviters: 1020, growth: 20.5, status: "Node Baru", topCity: "Chisinau" },
  { code: "ME", name: "Montenegro", nameEn: "Montenegro", flag: "🇲🇪", continent: "Eropa", nodes: 7800, activeInviters: 650, growth: 16.8, status: "Node Baru", topCity: "Podgorica" },
  { code: "MC", name: "Monako", nameEn: "Monaco", flag: "🇲🇨", continent: "Eropa", nodes: 5200, activeInviters: 480, growth: 9.8, status: "Node Baru", topCity: "Monaco" },
  { code: "LI", name: "Liechtenstein", nameEn: "Liechtenstein", flag: "🇱🇮", continent: "Eropa", nodes: 3800, activeInviters: 340, growth: 11.2, status: "Node Baru", topCity: "Vaduz" },
  { code: "AD", name: "Andorra", nameEn: "Andorra", flag: "🇦🇩", continent: "Eropa", nodes: 4400, activeInviters: 390, growth: 12.4, status: "Node Baru", topCity: "Andorra la Vella" },
  { code: "SM", name: "San Marino", nameEn: "San Marino", flag: "🇸🇲", continent: "Eropa", nodes: 2800, activeInviters: 240, growth: 8.5, status: "Node Baru", topCity: "San Marino" },

  // ── TIMUR TENGAH ──
  { code: "AE", name: "Uni Emirat Arab", nameEn: "United Arab Emirates", flag: "🇦🇪", continent: "Timur Tengah", nodes: 164000, activeInviters: 14500, growth: 33.2, status: "Super Hub", topCity: "Dubai" },
  { code: "SA", name: "Arab Saudi", nameEn: "Saudi Arabia", flag: "🇸🇦", continent: "Timur Tengah", nodes: 182000, activeInviters: 15800, growth: 36.4, status: "Super Hub", topCity: "Riyadh" },
  { code: "TR", name: "Turki", nameEn: "Turkey", flag: "🇹🇷", continent: "Timur Tengah", nodes: 172000, activeInviters: 14900, growth: 28.5, status: "Super Hub", topCity: "Istanbul" },
  { code: "QA", name: "Qatar", nameEn: "Qatar", flag: "🇶🇦", continent: "Timur Tengah", nodes: 52000, activeInviters: 4600, growth: 26.0, status: "Aktif & Stabil", topCity: "Doha" },
  { code: "KW", name: "Kuwait", nameEn: "Kuwait", flag: "🇰🇼", continent: "Timur Tengah", nodes: 48000, activeInviters: 4200, growth: 22.1, status: "Aktif & Stabil", topCity: "Kuwait City" },
  { code: "OM", name: "Oman", nameEn: "Oman", flag: "🇴🇲", continent: "Timur Tengah", nodes: 34000, activeInviters: 2950, growth: 24.5, status: "Aktif & Stabil", topCity: "Muscat" },
  { code: "BH", name: "Bahrain", nameEn: "Bahrain", flag: "🇧🇭", continent: "Timur Tengah", nodes: 28000, activeInviters: 2450, growth: 21.0, status: "Aktif & Stabil", topCity: "Manama" },
  { code: "JO", name: "Yordania", nameEn: "Jordan", flag: "🇯🇴", continent: "Timur Tengah", nodes: 38000, activeInviters: 3200, growth: 25.8, status: "Ekspansi Cepat", topCity: "Amman" },
  { code: "LB", name: "Lebanon", nameEn: "Lebanon", flag: "🇱🇧", continent: "Timur Tengah", nodes: 29000, activeInviters: 2400, growth: 18.2, status: "Aktif & Stabil", topCity: "Beirut" },
  { code: "IL", name: "Israel", nameEn: "Israel", flag: "🇮🇱", continent: "Timur Tengah", nodes: 64000, activeInviters: 5600, growth: 19.4, status: "Aktif & Stabil", topCity: "Tel Aviv" },
  { code: "IQ", name: "Irak", nameEn: "Iraq", flag: "🇮🇶", continent: "Timur Tengah", nodes: 31000, activeInviters: 2500, growth: 27.0, status: "Node Baru", topCity: "Baghdad" },
  { code: "YE", name: "Yaman", nameEn: "Yemen", flag: "🇾🇪", continent: "Timur Tengah", nodes: 14000, activeInviters: 1100, growth: 15.0, status: "Node Baru", topCity: "Sana'a" },

  // ── AFRIKA ──
  { code: "NG", name: "Nigeria", nameEn: "Nigeria", flag: "🇳🇬", continent: "Afrika", nodes: 198000, activeInviters: 17200, growth: 42.0, status: "Super Hub", topCity: "Lagos" },
  { code: "ZA", name: "Afrika Selatan", nameEn: "South Africa", flag: "🇿🇦", continent: "Afrika", nodes: 142000, activeInviters: 12100, growth: 24.8, status: "Super Hub", topCity: "Johannesburg" },
  { code: "EG", name: "Mesir", nameEn: "Egypt", flag: "🇪🇬", continent: "Afrika", nodes: 156000, activeInviters: 13400, growth: 31.5, status: "Super Hub", topCity: "Cairo" },
  { code: "KE", name: "Kenya", nameEn: "Kenya", flag: "🇰🇪", continent: "Afrika", nodes: 112000, activeInviters: 9800, growth: 38.2, status: "Ekspansi Cepat", topCity: "Nairobi" },
  { code: "MA", name: "Maroko", nameEn: "Morocco", flag: "🇲🇦", continent: "Afrika", nodes: 86000, activeInviters: 7400, growth: 26.4, status: "Ekspansi Cepat", topCity: "Casablanca" },
  { code: "GH", name: "Ghana", nameEn: "Ghana", flag: "🇬🇭", continent: "Afrika", nodes: 78000, activeInviters: 6700, growth: 33.0, status: "Ekspansi Cepat", topCity: "Accra" },
  { code: "ET", name: "Etiopia", nameEn: "Ethiopia", flag: "🇪🇹", continent: "Afrika", nodes: 54000, activeInviters: 4300, growth: 36.5, status: "Ekspansi Cepat", topCity: "Addis Ababa" },
  { code: "TZ", name: "Tanzania", nameEn: "Tanzania", flag: "🇹🇿", continent: "Afrika", nodes: 46000, activeInviters: 3800, growth: 29.0, status: "Ekspansi Cepat", topCity: "Dar es Salaam" },
  { code: "UG", name: "Uganda", nameEn: "Uganda", flag: "🇺🇬", continent: "Afrika", nodes: 42000, activeInviters: 3500, growth: 32.1, status: "Ekspansi Cepat", topCity: "Kampala" },
  { code: "DZ", name: "Aljazair", nameEn: "Algeria", flag: "🇩🇿", continent: "Afrika", nodes: 58000, activeInviters: 4900, growth: 22.0, status: "Aktif & Stabil", topCity: "Algiers" },
  { code: "TN", name: "Tunisia", nameEn: "Tunisia", flag: "🇹🇳", continent: "Afrika", nodes: 39000, activeInviters: 3300, growth: 21.5, status: "Aktif & Stabil", topCity: "Tunis" },
  { code: "RW", name: "Rwanda", nameEn: "Rwanda", flag: "🇷🇼", continent: "Afrika", nodes: 31000, activeInviters: 2700, growth: 39.0, status: "Ekspansi Cepat", topCity: "Kigali" },
  { code: "SN", name: "Senegal", nameEn: "Senegal", flag: "🇸🇳", continent: "Afrika", nodes: 28000, activeInviters: 2350, growth: 27.8, status: "Aktif & Stabil", topCity: "Dakar" },
  { code: "CI", name: "Pantai Gading", nameEn: "Ivory Coast", flag: "🇨🇮", continent: "Afrika", nodes: 32000, activeInviters: 2650, growth: 28.4, status: "Aktif & Stabil", topCity: "Abidjan" },
  { code: "CM", name: "Kamerun", nameEn: "Cameroon", flag: "🇨🇲", continent: "Afrika", nodes: 26000, activeInviters: 2150, growth: 25.0, status: "Node Baru", topCity: "Douala" },
  { code: "AO", name: "Angola", nameEn: "Angola", flag: "🇦🇴", continent: "Afrika", nodes: 24000, activeInviters: 1980, growth: 23.5, status: "Node Baru", topCity: "Luanda" },
  { code: "MU", name: "Mauritius", nameEn: "Mauritius", flag: "🇲🇺", continent: "Afrika", nodes: 18500, activeInviters: 1600, growth: 19.0, status: "Aktif & Stabil", topCity: "Port Louis" },
  { code: "ZM", name: "Zambia", nameEn: "Zambia", flag: "🇿🇲", continent: "Afrika", nodes: 19500, activeInviters: 1600, growth: 28.2, status: "Node Baru", topCity: "Lusaka" },
  { code: "ZW", name: "Zimbabwe", nameEn: "Zimbabwe", flag: "🇿🇼", continent: "Afrika", nodes: 18000, activeInviters: 1480, growth: 21.0, status: "Node Baru", topCity: "Harare" },
  { code: "MZ", name: "Mozambik", nameEn: "Mozambique", flag: "🇲🇿", continent: "Afrika", nodes: 15500, activeInviters: 1250, growth: 26.5, status: "Node Baru", topCity: "Maputo" },
  { code: "BW", name: "Botswana", nameEn: "Botswana", flag: "🇧🇼", continent: "Afrika", nodes: 14200, activeInviters: 1200, growth: 20.0, status: "Node Baru", topCity: "Gaborone" },
  { code: "NA", name: "Namibia", nameEn: "Namibia", flag: "🇳🇦", continent: "Afrika", nodes: 12800, activeInviters: 1080, growth: 18.5, status: "Node Baru", topCity: "Windhoek" },
  { code: "MG", name: "Madagaskar", nameEn: "Madagascar", flag: "🇲🇬", continent: "Afrika", nodes: 14500, activeInviters: 1150, growth: 22.0, status: "Node Baru", topCity: "Antananarivo" },
  { code: "SD", name: "Sudan", nameEn: "Sudan", flag: "🇸🇩", continent: "Afrika", nodes: 16000, activeInviters: 1250, growth: 17.0, status: "Node Baru", topCity: "Khartoum" },
  { code: "LY", name: "Libya", nameEn: "Libya", flag: "🇱🇾", continent: "Afrika", nodes: 13500, activeInviters: 1100, growth: 16.5, status: "Node Baru", topCity: "Tripoli" },
  { code: "GA", name: "Gabon", nameEn: "Gabon", flag: "🇬🇦", continent: "Afrika", nodes: 9800, activeInviters: 820, growth: 18.0, status: "Node Baru", topCity: "Libreville" },
  { code: "CD", name: "Kongo (DRC)", nameEn: "DR Congo", flag: "🇨🇩", continent: "Afrika", nodes: 21000, activeInviters: 1650, growth: 30.0, status: "Node Baru", topCity: "Kinshasa" },
  { code: "CG", name: "Kongo (Republik)", nameEn: "Congo", flag: "🇨🇬", continent: "Afrika", nodes: 8900, activeInviters: 720, growth: 19.5, status: "Node Baru", topCity: "Brazzaville" },
  { code: "SO", name: "Somalia", nameEn: "Somalia", flag: "🇸🇴", continent: "Afrika", nodes: 11200, activeInviters: 880, growth: 25.0, status: "Node Baru", topCity: "Mogadishu" },
  { code: "ML", name: "Mali", nameEn: "Mali", flag: "🇲🇱", continent: "Afrika", nodes: 9500, activeInviters: 750, growth: 21.0, status: "Node Baru", topCity: "Bamako" },
  { code: "BF", name: "Burkina Faso", nameEn: "Burkina Faso", flag: "🇧🇫", continent: "Afrika", nodes: 8700, activeInviters: 690, growth: 22.4, status: "Node Baru", topCity: "Ouagadougou" },
  { code: "NE", name: "Niger", nameEn: "Niger", flag: "🇳🇪", continent: "Afrika", nodes: 7400, activeInviters: 580, growth: 20.0, status: "Node Baru", topCity: "Niamey" },
  { code: "MW", name: "Malawi", nameEn: "Malawi", flag: "🇲🇼", continent: "Afrika", nodes: 8200, activeInviters: 650, growth: 24.0, status: "Node Baru", topCity: "Lilongwe" },
  { code: "BJ", name: "Benin", nameEn: "Benin", flag: "🇧🇯", continent: "Afrika", nodes: 7900, activeInviters: 630, growth: 23.5, status: "Node Baru", topCity: "Cotonou" },
  { code: "TG", name: "Togo", nameEn: "Togo", flag: "🇹🇬", continent: "Afrika", nodes: 6800, activeInviters: 540, growth: 21.0, status: "Node Baru", topCity: "Lomé" },
  { code: "SL", name: "Sierra Leone", nameEn: "Sierra Leone", flag: "🇸🇱", continent: "Afrika", nodes: 5900, activeInviters: 460, growth: 25.0, status: "Node Baru", topCity: "Freetown" },
  { code: "LR", name: "Liberia", nameEn: "Liberia", flag: "🇱🇷", continent: "Afrika", nodes: 5200, activeInviters: 410, growth: 23.0, status: "Node Baru", topCity: "Monrovia" },
  { code: "MR", name: "Mauritania", nameEn: "Mauritania", flag: "🇲🇷", continent: "Afrika", nodes: 6100, activeInviters: 480, growth: 18.0, status: "Node Baru", topCity: "Nouakchott" },
  { code: "SC", name: "Seychelles", nameEn: "Seychelles", flag: "🇸🇨", continent: "Afrika", nodes: 3800, activeInviters: 320, growth: 14.0, status: "Node Baru", topCity: "Victoria" },
  { code: "CV", name: "Tanjung Verde", nameEn: "Cape Verde", flag: "🇨🇻", continent: "Afrika", nodes: 4200, activeInviters: 350, growth: 16.2, status: "Node Baru", topCity: "Praia" },

  // ── OSEANIA ──
  { code: "AU", name: "Australia", nameEn: "Australia", flag: "🇦🇺", continent: "Oseania", nodes: 186000, activeInviters: 15400, growth: 17.5, status: "Super Hub", topCity: "Sydney" },
  { code: "NZ", name: "Selandia Baru", nameEn: "New Zealand", flag: "🇳🇿", continent: "Oseania", nodes: 74000, activeInviters: 6400, growth: 16.2, status: "Aktif & Stabil", topCity: "Auckland" },
  { code: "FJ", name: "Fiji", nameEn: "Fiji", flag: "🇫🇯", continent: "Oseania", nodes: 11500, activeInviters: 940, growth: 19.0, status: "Node Baru", topCity: "Suva" },
  { code: "PG", name: "Papua Nugini", nameEn: "Papua New Guinea", flag: "🇵🇬", continent: "Oseania", nodes: 14200, activeInviters: 1120, growth: 24.5, status: "Node Baru", topCity: "Port Moresby" },
  { code: "NC", name: "Kaledonia Baru", nameEn: "New Caledonia", flag: "🇳🇨", continent: "Oseania", nodes: 4600, activeInviters: 380, growth: 13.5, status: "Node Baru", topCity: "Nouméa" },
  { code: "PF", name: "Polinesia Prancis", nameEn: "French Polynesia", flag: "🇵🇫", continent: "Oseania", nodes: 4200, activeInviters: 350, growth: 12.8, status: "Node Baru", topCity: "Papeete" },
  { code: "GU", name: "Guam", nameEn: "Guam", flag: "🇬🇺", continent: "Oseania", nodes: 3900, activeInviters: 320, growth: 11.5, status: "Node Baru", topCity: "Hagåtña" },
  { code: "WS", name: "Samoa", nameEn: "Samoa", flag: "🇼🇸", continent: "Oseania", nodes: 3200, activeInviters: 260, growth: 15.0, status: "Node Baru", topCity: "Apia" },
  { code: "VU", name: "Vanuatu", nameEn: "Vanuatu", flag: "🇻🇺", continent: "Oseania", nodes: 2900, activeInviters: 230, growth: 16.2, status: "Node Baru", topCity: "Port Vila" },
  { code: "SB", name: "Kepulauan Solomon", nameEn: "Solomon Islands", flag: "🇸🇧", continent: "Oseania", nodes: 3400, activeInviters: 270, growth: 17.8, status: "Node Baru", topCity: "Honiara" },
  { code: "TO", name: "Tonga", nameEn: "Tonga", flag: "🇹🇴", continent: "Oseania", nodes: 2400, activeInviters: 190, growth: 13.0, status: "Node Baru", topCity: "Nuku'alofa" },
  { code: "FM", name: "Mikronesia", nameEn: "Micronesia", flag: "🇫🇲", continent: "Oseania", nodes: 1800, activeInviters: 140, growth: 12.0, status: "Node Baru", topCity: "Palikir" },
  { code: "PW", name: "Palau", nameEn: "Palau", flag: "🇵🇼", continent: "Oseania", nodes: 1500, activeInviters: 120, growth: 11.0, status: "Node Baru", topCity: "Ngerulmud" },
  { code: "MH", name: "Kepulauan Marshall", nameEn: "Marshall Islands", flag: "🇲🇭", continent: "Oseania", nodes: 1400, activeInviters: 110, growth: 10.5, status: "Node Baru", topCity: "Majuro" },
  { code: "KI", name: "Kiribati", nameEn: "Kiribati", flag: "🇰🇮", continent: "Oseania", nodes: 1600, activeInviters: 130, growth: 14.0, status: "Node Baru", topCity: "Tarawa" },
  { code: "TV", name: "Tuvalu", nameEn: "Tuvalu", flag: "🇹🇻", continent: "Oseania", nodes: 950, activeInviters: 80, growth: 9.0, status: "Node Baru", topCity: "Funafuti" },
  { code: "NR", name: "Nauru", nameEn: "Nauru", flag: "🇳🇷", continent: "Oseania", nodes: 820, activeInviters: 70, growth: 8.5, status: "Node Baru", topCity: "Yaren" },
  { code: "CK", name: "Kepulauan Cook", nameEn: "Cook Islands", flag: "🇨🇰", continent: "Oseania", nodes: 760, activeInviters: 60, growth: 10.0, status: "Node Baru", topCity: "Avarua" },
  { code: "NU", name: "Niue", nameEn: "Niue", flag: "🇳🇺", continent: "Oseania", nodes: 420, activeInviters: 35, growth: 7.5, status: "Node Baru", topCity: "Alofi" },
  { code: "WF", name: "Wallis dan Futuna", nameEn: "Wallis and Futuna", flag: "🇼🇫", continent: "Oseania", nodes: 510, activeInviters: 40, growth: 8.0, status: "Node Baru", topCity: "Mata-Utu" },
  { code: "AS", name: "Samoa Amerika", nameEn: "American Samoa", flag: "🇦🇸", continent: "Oseania", nodes: 1100, activeInviters: 90, growth: 9.5, status: "Node Baru", topCity: "Pago Pago" },
  { code: "MP", name: "Kepulauan Mariana Utara", nameEn: "Northern Mariana Islands", flag: "🇲🇵", continent: "Oseania", nodes: 1250, activeInviters: 105, growth: 10.2, status: "Node Baru", topCity: "Saipan" },

  // ── TAMBAHAN EROPA & TERITORI ──
  { code: "FO", name: "Kepulauan Faroe", nameEn: "Faroe Islands", flag: "🇫🇴", continent: "Eropa", nodes: 2100, activeInviters: 180, growth: 11.4, status: "Node Baru", topCity: "Tórshavn" },
  { code: "GI", name: "Gibraltar", nameEn: "Gibraltar", flag: "🇬🇮", continent: "Eropa", nodes: 4300, activeInviters: 390, growth: 14.2, status: "Node Baru", topCity: "Gibraltar" },
  { code: "IM", name: "Isle of Man", nameEn: "Isle of Man", flag: "🇮🇲", continent: "Eropa", nodes: 3600, activeInviters: 310, growth: 10.8, status: "Node Baru", topCity: "Douglas" },
  { code: "JE", name: "Jersey", nameEn: "Jersey", flag: "🇯🇪", continent: "Eropa", nodes: 3800, activeInviters: 330, growth: 11.5, status: "Node Baru", topCity: "Saint Helier" },
  { code: "GG", name: "Guernsey", nameEn: "Guernsey", flag: "🇬🇬", continent: "Eropa", nodes: 3200, activeInviters: 280, growth: 9.8, status: "Node Baru", topCity: "Saint Peter Port" },
  { code: "GL", name: "Greenland", nameEn: "Greenland", flag: "🇬🇱", continent: "Eropa", nodes: 1600, activeInviters: 130, growth: 8.2, status: "Node Baru", topCity: "Nuuk" },
  { code: "XK", name: "Kosovo", nameEn: "Kosovo", flag: "🇽🇰", continent: "Eropa", nodes: 11500, activeInviters: 980, growth: 22.0, status: "Node Baru", topCity: "Pristina" },
  { code: "VA", name: "Vatikan", nameEn: "Vatican City", flag: "🇻🇦", continent: "Eropa", nodes: 450, activeInviters: 30, growth: 4.0, status: "Node Baru", topCity: "Vatican City" },

  // ── TAMBAHAN KARIBIA & AMERIKA ──
  { code: "AW", name: "Aruba", nameEn: "Aruba", flag: "🇦🇼", continent: "Amerika Utara", nodes: 3400, activeInviters: 290, growth: 13.0, status: "Node Baru", topCity: "Oranjestad" },
  { code: "CW", name: "Curaçao", nameEn: "Curaçao", flag: "🇨🇼", continent: "Amerika Utara", nodes: 3900, activeInviters: 320, growth: 14.5, status: "Node Baru", topCity: "Willemstad" },
  { code: "SX", name: "Sint Maarten", nameEn: "Sint Maarten", flag: "🇸🇽", continent: "Amerika Utara", nodes: 2200, activeInviters: 180, growth: 12.0, status: "Node Baru", topCity: "Philipsburg" },
  { code: "AG", name: "Antigua dan Barbuda", nameEn: "Antigua and Barbuda", flag: "🇦🇬", continent: "Amerika Utara", nodes: 2800, activeInviters: 230, growth: 13.5, status: "Node Baru", topCity: "St. John's" },
  { code: "DM", name: "Dominika", nameEn: "Dominica", flag: "🇩🇲", continent: "Amerika Utara", nodes: 1900, activeInviters: 150, growth: 11.0, status: "Node Baru", topCity: "Roseau" },
  { code: "GD", name: "Grenada", nameEn: "Grenada", flag: "🇬🇩", continent: "Amerika Utara", nodes: 2400, activeInviters: 190, growth: 12.5, status: "Node Baru", topCity: "St. George's" },
  { code: "KN", name: "Saint Kitts dan Nevis", nameEn: "Saint Kitts and Nevis", flag: "🇰🇳", continent: "Amerika Utara", nodes: 1750, activeInviters: 140, growth: 10.5, status: "Node Baru", topCity: "Basseterre" },
  { code: "LC", name: "Saint Lucia", nameEn: "Saint Lucia", flag: "🇱🇨", continent: "Amerika Utara", nodes: 3100, activeInviters: 250, growth: 13.2, status: "Node Baru", topCity: "Castries" },
  { code: "VC", name: "Saint Vincent dan Grenadines", nameEn: "Saint Vincent and the Grenadines", flag: "🇻🇨", continent: "Amerika Utara", nodes: 2300, activeInviters: 185, growth: 11.8, status: "Node Baru", topCity: "Kingstown" },
  { code: "VI", name: "Kepulauan Virgin AS", nameEn: "U.S. Virgin Islands", flag: "🇻🇮", continent: "Amerika Utara", nodes: 2600, activeInviters: 210, growth: 10.0, status: "Node Baru", topCity: "Charlotte Amalie" },
  { code: "VG", name: "Kepulauan Virgin Britania", nameEn: "British Virgin Islands", flag: "🇻🇬", continent: "Amerika Utara", nodes: 2900, activeInviters: 240, growth: 12.0, status: "Node Baru", topCity: "Road Town" },
  { code: "TC", name: "Kepulauan Turks dan Caicos", nameEn: "Turks and Caicos Islands", flag: "🇹🇨", continent: "Amerika Utara", nodes: 1950, activeInviters: 160, growth: 13.0, status: "Node Baru", topCity: "Cockburn Town" },
  { code: "AI", name: "Anguilla", nameEn: "Anguilla", flag: "🇦🇮", continent: "Amerika Utara", nodes: 1200, activeInviters: 95, growth: 10.0, status: "Node Baru", topCity: "The Valley" },
  { code: "MS", name: "Montserrat", nameEn: "Montserrat", flag: "🇲🇸", continent: "Amerika Utara", nodes: 680, activeInviters: 50, growth: 7.0, status: "Node Baru", topCity: "Brades" },
  { code: "GF", name: "Guyana Prancis", nameEn: "French Guiana", flag: "🇬🇫", continent: "Amerika Latin", nodes: 3200, activeInviters: 260, growth: 14.0, status: "Node Baru", topCity: "Cayenne" },
  { code: "FK", name: "Kepulauan Falkland", nameEn: "Falkland Islands", flag: "🇫🇰", continent: "Amerika Latin", nodes: 520, activeInviters: 45, growth: 6.0, status: "Node Baru", topCity: "Stanley" },

  // ── TAMBAHAN AFRIKA ──
  { code: "BI", name: "Burundi", nameEn: "Burundi", flag: "🇧🇮", continent: "Afrika", nodes: 6200, activeInviters: 480, growth: 22.0, status: "Node Baru", topCity: "Gitega" },
  { code: "CF", name: "Republik Afrika Tengah", nameEn: "Central African Republic", flag: "🇨🇫", continent: "Afrika", nodes: 4800, activeInviters: 370, growth: 18.0, status: "Node Baru", topCity: "Bangui" },
  { code: "TD", name: "Chad", nameEn: "Chad", flag: "🇹🇩", continent: "Afrika", nodes: 5600, activeInviters: 430, growth: 19.5, status: "Node Baru", topCity: "N'Djamena" },
  { code: "DJ", name: "Jibuti", nameEn: "Djibouti", flag: "🇩🇯", continent: "Afrika", nodes: 4500, activeInviters: 360, growth: 16.0, status: "Node Baru", topCity: "Djibouti" },
  { code: "GQ", name: "Guinea Khatulistiwa", nameEn: "Equatorial Guinea", flag: "🇬🇶", continent: "Afrika", nodes: 5100, activeInviters: 410, growth: 17.5, status: "Node Baru", topCity: "Malabo" },
  { code: "ER", name: "Eritrea", nameEn: "Eritrea", flag: "🇪🇷", continent: "Afrika", nodes: 3900, activeInviters: 290, growth: 12.0, status: "Node Baru", topCity: "Asmara" },
  { code: "SZ", name: "Eswatini", nameEn: "Eswatini", flag: "🇸🇿", continent: "Afrika", nodes: 4800, activeInviters: 390, growth: 18.0, status: "Node Baru", topCity: "Mbabane" },
  { code: "GM", name: "Gambia", nameEn: "Gambia", flag: "🇬🇲", continent: "Afrika", nodes: 5200, activeInviters: 420, growth: 21.0, status: "Node Baru", topCity: "Banjul" },
  { code: "GN", name: "Guinea", nameEn: "Guinea", flag: "🇬🇳", continent: "Afrika", nodes: 7100, activeInviters: 560, growth: 22.4, status: "Node Baru", topCity: "Conakry" },
  { code: "GW", name: "Guinea-Bissau", nameEn: "Guinea-Bissau", flag: "🇬🇼", continent: "Afrika", nodes: 3800, activeInviters: 290, growth: 17.0, status: "Node Baru", topCity: "Bissau" },
  { code: "LS", name: "Lesotho", nameEn: "Lesotho", flag: "🇱🇸", continent: "Afrika", nodes: 4200, activeInviters: 340, growth: 16.5, status: "Node Baru", topCity: "Maseru" },
  { code: "ST", name: "Sao Tome dan Principe", nameEn: "Sao Tome and Principe", flag: "🇸🇹", continent: "Afrika", nodes: 1800, activeInviters: 140, growth: 13.0, status: "Node Baru", topCity: "São Tomé" },
  { code: "SS", name: "Sudan Selatan", nameEn: "South Sudan", flag: "🇸🇸", continent: "Afrika", nodes: 4600, activeInviters: 350, growth: 18.0, status: "Node Baru", topCity: "Juba" },
  { code: "KM", name: "Komoro", nameEn: "Comoros", flag: "🇰🇲", continent: "Afrika", nodes: 2400, activeInviters: 190, growth: 15.0, status: "Node Baru", topCity: "Moroni" },
  { code: "RE", name: "Réunion", nameEn: "Réunion", flag: "🇷🇪", continent: "Afrika", nodes: 6800, activeInviters: 560, growth: 16.8, status: "Node Baru", topCity: "Saint-Denis" },
  { code: "YT", name: "Mayotte", nameEn: "Mayotte", flag: "🇾🇹", continent: "Afrika", nodes: 2100, activeInviters: 170, growth: 14.5, status: "Node Baru", topCity: "Mamoudzou" },

  // ── TAMBAHAN ASIA & TIMUR TENGAH ──
  { code: "PS", name: "Palestina", nameEn: "Palestine", flag: "🇵🇸", continent: "Timur Tengah", nodes: 14800, activeInviters: 1180, growth: 19.5, status: "Node Baru", topCity: "Ramallah" },
  { code: "SY", name: "Suriah", nameEn: "Syria", flag: "🇸🇾", continent: "Timur Tengah", nodes: 12200, activeInviters: 940, growth: 15.0, status: "Node Baru", topCity: "Damascus" },
  { code: "IR", name: "Iran", nameEn: "Iran", flag: "🇮🇷", continent: "Timur Tengah", nodes: 48000, activeInviters: 3900, growth: 22.0, status: "Aktif & Stabil", topCity: "Tehran" },
  { code: "AF", name: "Afganistan", nameEn: "Afghanistan", flag: "🇦🇫", continent: "Asia", nodes: 9800, activeInviters: 720, growth: 14.0, status: "Node Baru", topCity: "Kabul" },
  { code: "KP", name: "Korea Utara", nameEn: "North Korea", flag: "🇰🇵", continent: "Asia", nodes: 1200, activeInviters: 80, growth: 4.5, status: "Node Baru", topCity: "Pyongyang" },

];

export function getCountryPartnerTarget(country: CountryNetworkData): number {
  if (country.targetPartners && country.targetPartners > 0) {
    return country.targetPartners;
  }
  // Formula for realistic target based on market scale
  if (country.activeInviters >= 30000) return 50000;
  if (country.activeInviters >= 15000) return 25000;
  if (country.activeInviters >= 10000) return 15000;
  if (country.activeInviters >= 5000) return 10000;
  if (country.activeInviters >= 2000) return 5000;
  if (country.activeInviters >= 1000) return 2500;
  if (country.activeInviters >= 500) return 1000;
  return 500;
}

export function getGlobalStats() {
  const totalInviters = GLOBAL_COUNTRIES_NETWORK.reduce((acc, c) => acc + c.activeInviters, 0);
  const totalTargetInviters = GLOBAL_COUNTRIES_NETWORK.reduce((acc, c) => acc + getCountryPartnerTarget(c), 0);
  const totalCountries = GLOBAL_COUNTRIES_NETWORK.length;
  const superHubs = GLOBAL_COUNTRIES_NETWORK.filter((c) => c.status === "Super Hub").length;
  // Titik Lokasi Partner: Setiap 1 titik lokasi menaungi rata-rata beberapa partner (~4-5 partner per titik)
  const totalPartnerLocations = Math.round(totalInviters / 4.2);
  // Total grup undangan yang dibuat
  const totalInviteGroups = Math.round(totalInviters * 3.6);

  return {
    totalPartnerLocations,
    totalInviteGroups,
    totalInviters,
    totalTargetInviters,
    totalCountries,
    superHubs,
  };
}
