import type { LangCode, LangOption } from '../types';

export const LANGS: LangOption[] = [
  { code: "en", name: "English",    flag: "🇺🇸" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
  { code: "pl", name: "Polski",     flag: "🇵🇱" },
  { code: "ru", name: "Русский",    flag: "🇷🇺" },
  { code: "es", name: "Español",    flag: "🇪🇸" },
  { code: "fr", name: "Français",   flag: "🇫🇷" },
  { code: "pt", name: "Português",  flag: "🇧🇷" },
  { code: "ht", name: "Kreyòl",     flag: "🇭🇹" },
  { code: "ar", name: "العربية",    flag: "🇸🇦" },
  { code: "so", name: "Soomaali",   flag: "🇸🇴" },
  { code: "ne", name: "नेपाली",      flag: "🇳🇵" },
  { code: "my", name: "မြန်မာ",     flag: "🇲🇲" },
];

export const T: Record<string, Record<string, string>> = {
  /* ── App chrome ── */
  appName:        { en:"ImmIGuide",es:"ImmIGuide",ru:"ИммиГид",fr:"ImmIGuide",pt:"ImmIGuide",ht:"ImmIGuide",ar:"ImmIGuide",so:"ImmIGuide",ne:"ImmIGuide",my:"ImmIGuide",uk:"ІмміГід",pl:"ImmIGuide" },
  welcome:        { en:"Welcome",es:"Bienvenido",ru:"Добро пожаловать",fr:"Bienvenue",pt:"Bem-vindo",ht:"Byenveni",ar:"مرحباً",so:"Soo dhawoow",ne:"स्वागत",my:"ကြိုဆိုပါ",uk:"Ласкаво просимо",pl:"Witamy" },
  getStarted:     { en:"Get Started",es:"Comenzar",ru:"Начать",fr:"Commencer",pt:"Começar",ht:"Kòmanse",ar:"ابدأ",so:"Bilow",ne:"सुरु",my:"စတင်",uk:"Почати",pl:"Rozpocznij" },
  next:           { en:"Next",es:"Siguiente",ru:"Далее",fr:"Suivant",pt:"Próximo",ht:"Pwochen",ar:"التالي",so:"Xiga",ne:"अर्को",my:"ရှေ့",uk:"Далі",pl:"Dalej" },
  back:           { en:"Back",es:"Atrás",ru:"Назад",fr:"Retour",pt:"Voltar",ht:"Retounen",ar:"رجوع",so:"Dib",ne:"पछाडि",my:"နောက်",uk:"Назад",pl:"Wstecz" },
  login:          { en:"Login",es:"Iniciar sesión",ru:"Войти",fr:"Connexion",pt:"Entrar",ht:"Konekte",ar:"دخول",so:"Gal",ne:"लगइन",my:"ဝင်ရောက်",uk:"Увійти",pl:"Zaloguj" },
  email:          { en:"Email",es:"Correo",ru:"Почта",fr:"Email",pt:"Email",ht:"Imèl",ar:"بريد",so:"Iimeel",ne:"इमेल",my:"အီးမေးလ်",uk:"Пошта",pl:"Email" },
  password:       { en:"Password",es:"Contraseña",ru:"Пароль",fr:"Mot de passe",pt:"Senha",ht:"Modpas",ar:"كلمة سر",so:"Furaha",ne:"पासवर्ड",my:"စကားဝှက်",uk:"Пароль",pl:"Hasło" },
  or:             { en:"OR",es:"O",ru:"ИЛИ",fr:"OU",pt:"OU",ht:"OSWA",ar:"أو",so:"AMA",ne:"वा",my:"သို့မဟုတ်",uk:"АБО",pl:"LUB" },
  continueGoogle: { en:"Continue with Google",es:"Continuar con Google",ru:"Войти через Google",fr:"Continuer avec Google",pt:"Continuar com Google",ht:"Kontinye ak Google",ar:"المتابعة مع Google",so:"Ku sii wad Google",ne:"Google मार्फत",my:"Google ဖြင့်",uk:"Увійти через Google",pl:"Kontynuuj z Google" },
  continueApple:  { en:"Continue with Apple",es:"Continuar con Apple",ru:"Войти через Apple",fr:"Continuer avec Apple",pt:"Continuar com Apple",ht:"Kontinye ak Apple",ar:"المتابعة مع Apple",so:"Ku sii wad Apple",ne:"Apple मार्फत",my:"Apple ဖြင့်",uk:"Увійти через Apple",pl:"Kontynuuj z Apple" },

  /* ── Dashboard / nav ── */
  dashboard:    { en:"Dashboard",es:"Panel",ru:"Панель",fr:"Tableau",pt:"Painel",ht:"Tablo",ar:"لوحة",so:"Bogga",ne:"ड्यासबोर्ड",my:"ဒက်ရှ်ဘုတ်",uk:"Панель",pl:"Panel" },
  myForms:      { en:"My Forms",es:"Mis formularios",ru:"Мои формы",fr:"Mes formulaires",pt:"Meus formulários",ht:"Fòm mwen",ar:"نماذجي",so:"Foomamkayga",ne:"मेरा फार्म",my:"ကျွန်ုပ်ဖောင်များ",uk:"Мої форми",pl:"Moje formularze" },
  startNew:     { en:"New Form",es:"Nuevo",ru:"Новая",fr:"Nouveau",pt:"Novo",ht:"Nouvo",ar:"جديد",so:"Cusub",ne:"नयाँ",my:"အသစ်",uk:"Нова",pl:"Nowy" },
  formWizard:   { en:"Wizard",es:"Asistente",ru:"Мастер",fr:"Assistant",pt:"Assistente",ht:"Asistan",ar:"مساعد",so:"Caawiye",ne:"विजार्ड",my:"လမ်းညွှန်",uk:"Майстер",pl:"Kreator" },
  selectForm:   { en:"Select Form",es:"Seleccione",ru:"Выберите",fr:"Sélectionner",pt:"Selecionar",ht:"Chwazi",ar:"اختر",so:"Dooro",ne:"छान्नुहोस्",my:"ရွေးပါ",uk:"Оберіть",pl:"Wybierz" },
  civicsTest:   { en:"Civics Test",es:"Examen cívico",ru:"Тест",fr:"Test civique",pt:"Teste cívico",ht:"Tès sivik",ar:"اختبار",so:"Imtixaan",ne:"नागरिक परीक्षा",my:"စာမေးပွဲ",uk:"Тест",pl:"Test" },
  tracking:     { en:"Tracking",es:"Seguimiento",ru:"Отслеживание",fr:"Suivi",pt:"Rastreamento",ht:"Swivi",ar:"تتبع",so:"Raadraac",ne:"ट्र्याकिङ",my:"ခြေရာခံ",uk:"Відстеження",pl:"Śledzenie" },
  knowledgeBase:{ en:"Info",es:"Info",ru:"Инфо",fr:"Info",pt:"Info",ht:"Enfò",ar:"معلومات",so:"Macluumaad",ne:"जानकारी",my:"အချက်အလက်",uk:"Інфо",pl:"Info" },
  profile:      { en:"Profile",es:"Perfil",ru:"Профиль",fr:"Profil",pt:"Perfil",ht:"Pwofil",ar:"ملف",so:"Bogga",ne:"प्रोफाइल",my:"ပရိုဖိုင်",uk:"Профіль",pl:"Profil" },
  logout:       { en:"Logout",es:"Salir",ru:"Выйти",fr:"Déconnexion",pt:"Sair",ht:"Dekonekte",ar:"خروج",so:"Ka bax",ne:"लगआउट",my:"ထွက်",uk:"Вийти",pl:"Wyloguj" },

  /* ── Form tiers / meta ── */
  simple:   { en:"Simple",es:"Sencillo",ru:"Простой",fr:"Simple",pt:"Simples",ht:"Senp",ar:"بسيط",so:"Fudud",ne:"सरल",my:"ရိုးရှင်း",uk:"Простий",pl:"Prosty" },
  medium:   { en:"Medium",es:"Medio",ru:"Средний",fr:"Moyen",pt:"Médio",ht:"Mwayen",ar:"متوسط",so:"Dhexe",ne:"मध्यम",my:"အလယ်",uk:"Середній",pl:"Średni" },
  complex:  { en:"Complex",es:"Complejo",ru:"Сложный",fr:"Complexe",pt:"Complexo",ht:"Konplèks",ar:"معقد",so:"Adag",ne:"जटिल",my:"ရှုပ်ထွေး",uk:"Складний",pl:"Złożony" },
  sections: { en:"sections",es:"secciones",ru:"разд.",fr:"sections",pt:"seções",ht:"seksyon",ar:"أقسام",so:"qaybaha",ne:"खण्ड",my:"အပိုင်း",uk:"розд.",pl:"sekcje" },
  fields:   { en:"fields",es:"campos",ru:"полей",fr:"champs",pt:"campos",ht:"chan",ar:"حقول",so:"goobaha",ne:"फिल्ड",my:"ကွက်",uk:"полів",pl:"pola" },
  months:   { en:"months",es:"meses",ru:"мес.",fr:"mois",pt:"meses",ht:"mwa",ar:"أشهر",so:"bilood",ne:"महिना",my:"လ",uk:"міс.",pl:"mies." },
  step:     { en:"STEP",es:"PASO",ru:"ШАГ",fr:"ÉTAPE",pt:"PASSO",ht:"ETAP",ar:"خطوة",so:"TALLAABO",ne:"चरण",my:"အဆင့်",uk:"КРОК",pl:"KROK" },

  /* ── Form actions ── */
  startForm:    { en:"Start",es:"Iniciar",ru:"Начать",fr:"Démarrer",pt:"Iniciar",ht:"Kòmanse",ar:"ابدأ",so:"Bilow",ne:"सुरु",my:"စတင်",uk:"Почати",pl:"Rozpocznij" },
  continueForm: { en:"Continue",es:"Continuar",ru:"Продолжить",fr:"Continuer",pt:"Continuar",ht:"Kontinye",ar:"متابعة",so:"Sii wad",ne:"जारी",my:"ဆက်လုပ်",uk:"Продовжити",pl:"Kontynuuj" },
  review:       { en:"Review",es:"Revisar",ru:"Просмотр",fr:"Vérifier",pt:"Revisar",ht:"Revize",ar:"مراجعة",so:"Dib u eeg",ne:"समीक्षा",my:"ပြန်ကြည့်",uk:"Перегляд",pl:"Przegląd" },
  pdfPreview:   { en:"Preview",es:"Vista previa",ru:"Просмотр",fr:"Aperçu",pt:"Visualizar",ht:"Apèsi",ar:"معاينة",so:"Muuqaal",ne:"पूर्वावलोकन",my:"အကြိုကြည့်",uk:"Перегляд",pl:"Podgląd" },
  print:        { en:"Print",es:"Imprimir",ru:"Печать",fr:"Imprimer",pt:"Imprimir",ht:"Enprime",ar:"طباعة",so:"Daabac",ne:"प्रिन्ट",my:"ပရင့်",uk:"Друк",pl:"Drukuj" },
  complete:     { en:"Complete!",es:"¡Completo!",ru:"Готово!",fr:"Terminé!",pt:"Completo!",ht:"Fini!",ar:"!تم",so:"Dhammaystiran!",ne:"पूरा!",my:"ပြီးပါပြီ!",uk:"Готово!",pl:"Gotowe!" },

  /* ── Payment ── */
  payment:    { en:"Payment",es:"Pago",ru:"Оплата",fr:"Paiement",pt:"Pagamento",ht:"Peman",ar:"دفع",so:"Lacag",ne:"भुक्तानी",my:"ငွေပေးချေ",uk:"Оплата",pl:"Płatność" },
  promoCode:  { en:"Promo Code",es:"Código",ru:"Промокод",fr:"Code promo",pt:"Código",ht:"Kòd pwomo",ar:"رمز",so:"Koodhka",ne:"प्रोमो",my:"ကုဒ်",uk:"Промокод",pl:"Kod promocyjny" },
  apply:      { en:"Apply",es:"Aplicar",ru:"Применить",fr:"Appliquer",pt:"Aplicar",ht:"Aplike",ar:"تطبيق",so:"Codso",ne:"लागू",my:"သုံး",uk:"Застосувати",pl:"Zastosuj" },
  payNow:     { en:"Pay Now",es:"Pagar",ru:"Оплатить",fr:"Payer",pt:"Pagar",ht:"Peye",ar:"ادفع",so:"Bixi",ne:"तिर्नु",my:"ပေးချေ",uk:"Оплатити",pl:"Zapłać" },
  serviceFee: { en:"Service Fee",es:"Tarifa",ru:"Сбор",fr:"Frais",pt:"Taxa",ht:"Frè",ar:"رسوم",so:"Kharash",ne:"शुल्क",my:"ကြေး",uk:"Збір",pl:"Opłata" },
  uscisFee:   { en:"USCIS Fee",es:"USCIS",ru:"USCIS",fr:"USCIS",pt:"USCIS",ht:"USCIS",ar:"USCIS",so:"USCIS",ne:"USCIS",my:"USCIS",uk:"USCIS",pl:"USCIS" },
  total:      { en:"Total",es:"Total",ru:"Итого",fr:"Total",pt:"Total",ht:"Total",ar:"المجموع",so:"Wadarta",ne:"जम्मा",my:"စုစုပေါင်း",uk:"Разом",pl:"Razem" },

  /* ── Payment options page ── */
  paymentOptions:   { en:"Payment Options",es:"Opciones de pago",ru:"Способы оплаты",fr:"Options de paiement",pt:"Opções de pagamento",ht:"Opsyon peman",ar:"خيارات الدفع",so:"Doorashada lacagta",ne:"भुक्तानी विकल्प",my:"ငွေပေးချေနည်းများ",uk:"Способи оплати",pl:"Opcje płatności" },
  selectPayMethod:  { en:"Select Payment Method",es:"Seleccione método de pago",ru:"Выберите способ оплаты",fr:"Sélectionnez le mode de paiement",pt:"Selecione o método de pagamento",ht:"Chwazi metòd peman",ar:"اختر طريقة الدفع",so:"Dooro habka lacagta",ne:"भुक्तानी विधि छान्नुहोस्",my:"ငွေပေးချေနည်း ရွေးပါ",uk:"Оберіть спосіб оплати",pl:"Wybierz metodę płatności" },
  creditDebitCard:  { en:"Credit / Debit Card",es:"Tarjeta crédito / débito",ru:"Кредитная / дебетовая карта",fr:"Carte crédit / débit",pt:"Cartão crédito / débito",ht:"Kat kredi / debi",ar:"بطاقة ائتمان / خصم",so:"Kaarka lacagta",ne:"क्रेडिट / डेबिट कार्ड",my:"ခရက်ဒစ် / ဒက်ဘစ် ကတ်",uk:"Кредитна / дебетова картка",pl:"Karta kredytowa / debetowa" },
  cardNumber:       { en:"Card Number",es:"Número de tarjeta",ru:"Номер карты",fr:"Numéro de carte",pt:"Número do cartão",ht:"Nimewo kat",ar:"رقم البطاقة",so:"Lambarka kaarka",ne:"कार्ड नम्बर",my:"ကတ်နံပါတ်",uk:"Номер картки",pl:"Numer karty" },
  expDate:          { en:"Expiration Date",es:"Fecha vencimiento",ru:"Срок действия",fr:"Date d'expiration",pt:"Data de validade",ht:"Dat ekspirasyon",ar:"تاريخ الانتهاء",so:"Taariikhda dhicitaanka",ne:"म्याद मिति",my:"သက်တမ်းကုန်ရက်",uk:"Термін дії",pl:"Data ważności" },
  cvv:              { en:"CVV",es:"CVV",ru:"CVV",fr:"CVV",pt:"CVV",ht:"CVV",ar:"CVV",so:"CVV",ne:"CVV",my:"CVV",uk:"CVV",pl:"CVV" },
  cardHolder:       { en:"Cardholder Name",es:"Nombre del titular",ru:"Имя владельца",fr:"Nom du titulaire",pt:"Nome do titular",ht:"Non titilè",ar:"اسم حامل البطاقة",so:"Magaca milkiilaha",ne:"कार्डधारकको नाम",my:"ကတ်ပိုင်ရှင်အမည်",uk:"Ім'я власника",pl:"Imię posiadacza" },
  paypal:           { en:"PayPal",es:"PayPal",ru:"PayPal",fr:"PayPal",pt:"PayPal",ht:"PayPal",ar:"PayPal",so:"PayPal",ne:"PayPal",my:"PayPal",uk:"PayPal",pl:"PayPal" },
  payWithPaypal:    { en:"Pay with PayPal",es:"Pagar con PayPal",ru:"Оплатить через PayPal",fr:"Payer avec PayPal",pt:"Pagar com PayPal",ht:"Peye ak PayPal",ar:"ادفع عبر PayPal",so:"Ku bixi PayPal",ne:"PayPal बाट तिर्नुहोस्",my:"PayPal ဖြင့်ပေးချေ",uk:"Оплатити через PayPal",pl:"Zapłać przez PayPal" },
  zelle:            { en:"Zelle",es:"Zelle",ru:"Zelle",fr:"Zelle",pt:"Zelle",ht:"Zelle",ar:"Zelle",so:"Zelle",ne:"Zelle",my:"Zelle",uk:"Zelle",pl:"Zelle" },
  zelleInstr:       { en:"Send payment via Zelle to:",es:"Envíe el pago por Zelle a:",ru:"Отправьте оплату через Zelle:",fr:"Envoyez le paiement via Zelle à:",pt:"Envie o pagamento via Zelle para:",ht:"Voye peman via Zelle bay:",ar:"أرسل الدفعة عبر Zelle إلى:",so:"U dir lacagta Zelle:",ne:"Zelle मार्फत भुक्तानी पठाउनुहोस्:",my:"Zelle မှတဆင့် ငွေလွှဲပါ:",uk:"Надішліть оплату через Zelle:",pl:"Wyślij płatność przez Zelle:" },
  bankTransfer:     { en:"Bank Transfer / Wire",es:"Transferencia bancaria",ru:"Банковский перевод",fr:"Virement bancaire",pt:"Transferência bancária",ht:"Transfè labank",ar:"تحويل بنكي",so:"Wareejinta bangiga",ne:"बैंक ट्रान्सफर",my:"ဘဏ်လွှဲ",uk:"Банківський переказ",pl:"Przelew bankowy" },
  bankInstr:        { en:"Transfer to the following account:",es:"Transfiera a la siguiente cuenta:",ru:"Переведите на следующий счёт:",fr:"Transférez au compte suivant:",pt:"Transfira para a seguinte conta:",ht:"Transfère nan kont sa a:",ar:"حوّل إلى الحساب التالي:",so:"U wareej xisaabta:",ne:"निम्न खातामा ट्रान्सफर:",my:"အောက်ပါအကောင့်သို့ လွှဲပါ:",uk:"Переказ на наступний рахунок:",pl:"Przelew na następujące konto:" },
  bankName:         { en:"Bank",es:"Banco",ru:"Банк",fr:"Banque",pt:"Banco",ht:"Bank",ar:"البنك",so:"Bangiga",ne:"बैंक",my:"ဘဏ်",uk:"Банк",pl:"Bank" },
  accountName:      { en:"Account Name",es:"Nombre de cuenta",ru:"Наименование",fr:"Nom du compte",pt:"Nome da conta",ht:"Non kont",ar:"اسم الحساب",so:"Magaca xisaabta",ne:"खाता नाम",my:"အကောင့်အမည်",uk:"Назва рахунку",pl:"Nazwa konta" },
  routingNum:       { en:"Routing #",es:"Routing #",ru:"Routing #",fr:"Routing #",pt:"Routing #",ht:"Routing #",ar:"Routing #",so:"Routing #",ne:"Routing #",my:"Routing #",uk:"Routing #",pl:"Routing #" },
  accountNum:       { en:"Account #",es:"Cuenta #",ru:"Счёт #",fr:"Compte #",pt:"Conta #",ht:"Kont #",ar:"رقم الحساب",so:"Xisaabta #",ne:"खाता #",my:"အကောင့် #",uk:"Рахунок #",pl:"Konto #" },
  applePay:         { en:"Apple Pay",es:"Apple Pay",ru:"Apple Pay",fr:"Apple Pay",pt:"Apple Pay",ht:"Apple Pay",ar:"Apple Pay",so:"Apple Pay",ne:"Apple Pay",my:"Apple Pay",uk:"Apple Pay",pl:"Apple Pay" },
  googlePay:        { en:"Google Pay",es:"Google Pay",ru:"Google Pay",fr:"Google Pay",pt:"Google Pay",ht:"Google Pay",ar:"Google Pay",so:"Google Pay",ne:"Google Pay",my:"Google Pay",uk:"Google Pay",pl:"Google Pay" },
  submitPayment:    { en:"Submit Payment",es:"Enviar pago",ru:"Отправить оплату",fr:"Soumettre le paiement",pt:"Enviar pagamento",ht:"Soumèt peman",ar:"إرسال الدفعة",so:"Dir lacagta",ne:"भुक्तानी पेश गर्नुहोस्",my:"ငွေပေးချေမှု တင်သွင်းပါ",uk:"Надіслати оплату",pl:"Wyślij płatność" },
  amountDue:        { en:"Amount Due",es:"Monto a pagar",ru:"К оплате",fr:"Montant dû",pt:"Valor devido",ht:"Montan pou peye",ar:"المبلغ المستحق",so:"Qaddarka lacagta",ne:"तिर्नुपर्ने रकम",my:"ပေးချေရမည့်ပမာဏ",uk:"До сплати",pl:"Do zapłaty" },
  processing:       { en:"Processing payment…",es:"Procesando pago…",ru:"Обработка оплаты…",fr:"Traitement du paiement…",pt:"Processando pagamento…",ht:"Peman ap trete…",ar:"جاري معالجة الدفعة…",so:"Lacagta waa la habeynayaa…",ne:"भुक्तानी प्रशोधन हुँदैछ…",my:"ငွေပေးချေမှု စီစစ်နေသည်…",uk:"Обробка оплати…",pl:"Przetwarzanie płatności…" },
  paymentSuccess:   { en:"Payment Successful!",es:"¡Pago exitoso!",ru:"Оплата прошла успешно!",fr:"Paiement réussi!",pt:"Pagamento realizado!",ht:"Peman reyisi!",ar:"تم الدفع بنجاح!",so:"Lacagta waa lagu guulaystay!",ne:"भुक्तानी सफल!",my:"ငွေပေးချေမှု အောင်မြင်ပါသည်!",uk:"Оплата успішна!",pl:"Płatność udana!" },
  securePayment:    { en:"🔒 Secure & Encrypted",es:"🔒 Seguro y encriptado",ru:"🔒 Безопасно и зашифровано",fr:"🔒 Sécurisé et chiffré",pt:"🔒 Seguro e criptografado",ht:"🔒 Sekirize e ankripte",ar:"🔒 آمن ومشفر",so:"🔒 Ammaan & sir ah",ne:"🔒 सुरक्षित र इन्क्रिप्टेड",my:"🔒 လုံခြုံပြီး ကုဒ်ဝှက်ထား",uk:"🔒 Безпечно та зашифровано",pl:"🔒 Bezpieczne i szyfrowane" },

  /* ── Documents ── */
  docUpload:  { en:"Documents",es:"Documentos",ru:"Документы",fr:"Documents",pt:"Documentos",ht:"Dokiman",ar:"مستندات",so:"Dukumeenti",ne:"कागजात",my:"စာရွက်",uk:"Документи",pl:"Dokumenty" },
  passport:   { en:"Passport",es:"Pasaporte",ru:"Паспорт",fr:"Passeport",pt:"Passaporte",ht:"Paspò",ar:"جواز سفر",so:"Baasaaboor",ne:"राहदानी",my:"ပတ်စ်ပို့",uk:"Паспорт",pl:"Paszport" },
  birthCert:  { en:"Birth Certificate",es:"Acta nacimiento",ru:"Свидетельство",fr:"Acte de naissance",pt:"Certidão",ht:"Batistè",ar:"شهادة ميلاد",so:"Shahaado",ne:"जन्मदर्ता",my:"မွေးစာရင်း",uk:"Свідоцтво",pl:"Akt urodzenia" },
  photo:      { en:"Photo",es:"Foto",ru:"Фото",fr:"Photo",pt:"Foto",ht:"Foto",ar:"صورة",so:"Sawir",ne:"फोटो",my:"ဓာတ်ပုံ",uk:"Фото",pl:"Zdjęcie" },
  supporting: { en:"Supporting Docs",es:"Documentos apoyo",ru:"Документы",fr:"Pièces jointes",pt:"Documentos",ht:"Dokiman sipò",ar:"مستندات داعمة",so:"Dukumeenti",ne:"कागजात",my:"စာရွက်",uk:"Документи",pl:"Dokumenty" },

  /* ── Form fields ── */
  firstName:    { en:"First Name",es:"Nombre",ru:"Имя",fr:"Prénom",pt:"Nome",ht:"Non",ar:"الاسم",so:"Magaca",ne:"नाम",my:"အမည်",uk:"Ім'я",pl:"Imię" },
  lastName:     { en:"Last Name",es:"Apellido",ru:"Фамилия",fr:"Nom",pt:"Sobrenome",ht:"Siyati",ar:"اللقب",so:"Magaca",ne:"थर",my:"မျိုးနွယ်",uk:"Прізвище",pl:"Nazwisko" },
  dob:          { en:"Date of Birth",es:"Fecha",ru:"Дата",fr:"Date de naissance",pt:"Data",ht:"Dat nesans",ar:"تاريخ الميلاد",so:"Taariikhda",ne:"जन्ममिति",my:"မွေးနေ့",uk:"Дата народження",pl:"Data urodzenia" },
  country:      { en:"Country of Birth",es:"País",ru:"Страна",fr:"Pays",pt:"País",ht:"Peyi",ar:"البلد",so:"Dalka",ne:"देश",my:"နိုင်ငံ",uk:"Країна",pl:"Kraj" },
  aNumber:      { en:"A-Number (optional)",es:"Número A",ru:"A-номер",fr:"Numéro A",pt:"Número A",ht:"Nimewo A",ar:"رقم A",so:"Lambarka A",ne:"A-नम्बर",my:"A-နံပါတ်",uk:"A-номер (необов.)",pl:"Numer A (opcjon.)" },
  ssn:          { en:"SSN (optional)",es:"SSN",ru:"SSN",fr:"SSN",pt:"SSN",ht:"SSN",ar:"SSN",so:"SSN",ne:"SSN",my:"SSN",uk:"SSN (необов.)",pl:"SSN (opcjon.)" },
  address:      { en:"Address (optional)",es:"Dirección",ru:"Адрес",fr:"Adresse",pt:"Endereço",ht:"Adrès",ar:"العنوان",so:"Cinwaanka",ne:"ठेगाना",my:"လိပ်စာ",uk:"Адреса (необов.)",pl:"Adres (opcjon.)" },
  phone:        { en:"Phone",es:"Teléfono",ru:"Телефон",fr:"Téléphone",pt:"Telefone",ht:"Telefòn",ar:"هاتف",so:"Taleefan",ne:"फोन",my:"ဖုန်း",uk:"Телефон",pl:"Telefon" },
  gender:       { en:"Gender",es:"Género",ru:"Пол",fr:"Genre",pt:"Gênero",ht:"Sèks",ar:"الجنس",so:"Jinsiga",ne:"लिङ्ग",my:"ကျား/မ",uk:"Стать",pl:"Płeć" },
  male:         { en:"Male",es:"Masculino",ru:"Муж.",fr:"Homme",pt:"Masculino",ht:"Gason",ar:"ذكر",so:"Lab",ne:"पुरुष",my:"ကျား",uk:"Чоловіча",pl:"Mężczyzna" },
  female:       { en:"Female",es:"Femenino",ru:"Жен.",fr:"Femme",pt:"Feminino",ht:"Fi",ar:"أنثى",so:"Dhedig",ne:"महिला",my:"မ",uk:"Жіноча",pl:"Kobieta" },
  maritalStatus:{ en:"Marital Status",es:"Estado civil",ru:"Сем. положение",fr:"État civil",pt:"Estado civil",ht:"Eta sivil",ar:"الحالة",so:"Xaalada",ne:"वैवाहिक",my:"အိမ်ထောင်",uk:"Сімейний стан",pl:"Stan cywilny" },
  single:       { en:"Single",es:"Soltero/a",ru:"Холост",fr:"Célibataire",pt:"Solteiro/a",ht:"Selibatè",ar:"أعزب",so:"Guursan",ne:"अविवाहित",my:"လူပျို",uk:"Неодружений",pl:"Wolny/a" },
  married:      { en:"Married",es:"Casado/a",ru:"Женат",fr:"Marié(e)",pt:"Casado/a",ht:"Marye",ar:"متزوج",so:"Guursaday",ne:"विवाहित",my:"အိမ်ထောင်ရှိ",uk:"Одружений",pl:"Żonaty/Zamężna" },
  divorced:     { en:"Divorced",es:"Divorciado",ru:"Разведён",fr:"Divorcé(e)",pt:"Divorciado",ht:"Divòse",ar:"مطلق",so:"Furay",ne:"विवाहविच्छेद",my:"ကွာရှင်း",uk:"Розлучений",pl:"Rozwiedziony/a" },
  widowed:      { en:"Widowed",es:"Viudo/a",ru:"Вдовец",fr:"Veuf/ve",pt:"Viúvo/a",ht:"Vèf",ar:"أرمل",so:"Carmal",ne:"विधुर",my:"မုဆိုး",uk:"Вдівець",pl:"Wdowiec/Wdowa" },
  entryDate:    { en:"Last Entry Date",es:"Fecha entrada",ru:"Дата въезда",fr:"Date d'entrée",pt:"Data entrada",ht:"Dat antre",ar:"تاريخ الدخول",so:"Taariikhda",ne:"प्रवेश मिति",my:"ဝင်ရောက်ရက်",uk:"Дата в'їзду",pl:"Data wjazdu" },
  i94:          { en:"I-94 (optional)",es:"I-94",ru:"I-94",fr:"I-94",pt:"I-94",ht:"I-94",ar:"I-94",so:"I-94",ne:"I-94",my:"I-94",uk:"I-94 (необов.)",pl:"I-94 (opcjon.)" },
  tpsCountry:   { en:"TPS Country",es:"País TPS",ru:"Страна TPS",fr:"Pays TPS",pt:"País TPS",ht:"Peyi TPS",ar:"بلد TPS",so:"Dalka TPS",ne:"TPS देश",my:"TPS နိုင်ငံ",uk:"Країна TPS",pl:"Kraj TPS" },
  eligCategory: { en:"Eligibility",es:"Categoría",ru:"Категория",fr:"Éligibilité",pt:"Elegibilidade",ht:"Elijibilite",ar:"الأهلية",so:"Xaqa",ne:"योग्यता",my:"အရည်အချင်း",uk:"Категорія",pl:"Kategoria" },
  petitionerName:{ en:"Petitioner",es:"Peticionario",ru:"Заявитель",fr:"Pétitionnaire",pt:"Peticionário",ht:"Petisyonè",ar:"مقدم الطلب",so:"Codsade",ne:"निवेदक",my:"တောင်းဆိုသူ",uk:"Заявник",pl:"Wnioskodawca" },
  relationship: { en:"Relationship",es:"Relación",ru:"Родство",fr:"Relation",pt:"Relação",ht:"Relasyon",ar:"العلاقة",so:"Xiriirka",ne:"सम्बन्ध",my:"ဆက်ဆံရေး",uk:"Родинні зв'язки",pl:"Pokrewieństwo" },
  yearsResident:{ en:"Years Residence",es:"Años",ru:"Лет",fr:"Années",pt:"Anos",ht:"Ane",ar:"سنوات",so:"Sanado",ne:"वर्ष",my:"နှစ်",uk:"Років проживання",pl:"Lata zamieszkania" },
  travelPurpose:{ en:"Travel Purpose",es:"Propósito",ru:"Цель",fr:"But du voyage",pt:"Propósito",ht:"Rezon vwayaj",ar:"الغرض",so:"Ujeedada",ne:"उद्देश्य",my:"ရည်ရွယ်ချက်",uk:"Мета подорожі",pl:"Cel podróży" },
  persecutionCountry:{ en:"Persecution Country",es:"País",ru:"Страна",fr:"Pays de persécution",pt:"País",ht:"Peyi",ar:"بلد الاضطهاد",so:"Dalka",ne:"देश",my:"နိုင်ငံ",uk:"Країна переслідування",pl:"Kraj prześladowania" },
  persecutionBasis:  { en:"Persecution Basis",es:"Base",ru:"Основание",fr:"Base",pt:"Base",ht:"Baz",ar:"أساس",so:"Aasaaska",ne:"आधार",my:"အခြေခံ",uk:"Підстава",pl:"Podstawa" },
  onboard1Desc:{ en:"Step-by-step guidance in your language",es:"Guía paso a paso",ru:"Пошаговое руководство",fr:"Guide étape par étape",pt:"Guia passo a passo",ht:"Gid etap pa etap",ar:"دليل خطوة بخطوة",so:"Hagitaan tallaabo",ne:"चरणबद्ध मार्गदर्शन",my:"တစ်ဆင့်ချင်းလမ်းညွှန်",uk:"Покрокове керівництво вашою мовою",pl:"Przewodnik krok po kroku w Twoim języku" },

  /* ── Validation ── */
  required:     { en:"Required",es:"Obligatorio",ru:"Обязательно",fr:"Requis",pt:"Obrigatório",ht:"Obligatwa",ar:"مطلوب",so:"Loo baahan",ne:"आवश्यक",my:"လိုအပ်",uk:"Обов'язково",pl:"Wymagane" },
  invalidEmail: { en:"Invalid email",es:"Inválido",ru:"Неверный",fr:"Invalide",pt:"Inválido",ht:"Envali",ar:"غير صالح",so:"Khaldan",ne:"अमान्य",my:"မမှန်",uk:"Невірний email",pl:"Nieprawidłowy email" },
  invalidPhone: { en:"Invalid phone",es:"Inválido",ru:"Неверный",fr:"Invalide",pt:"Inválido",ht:"Envali",ar:"غير صالح",so:"Khaldan",ne:"अमान्य",my:"မမှန်",uk:"Невірний телефон",pl:"Nieprawidłowy telefon" },

  /* ── Goal labels ── */
  goalTPS:     { en:"TPS",es:"TPS",ru:"TPS",fr:"TPS",pt:"TPS",ht:"TPS",ar:"TPS",so:"TPS",ne:"TPS",my:"TPS",uk:"TPS",pl:"TPS" },
  goalDACA:    { en:"DACA",es:"DACA",ru:"DACA",fr:"DACA",pt:"DACA",ht:"DACA",ar:"DACA",so:"DACA",ne:"DACA",my:"DACA",uk:"DACA",pl:"DACA" },
  goalEAD:     { en:"EAD",es:"EAD",ru:"EAD",fr:"EAD",pt:"EAD",ht:"EAD",ar:"EAD",so:"EAD",ne:"EAD",my:"EAD",uk:"EAD",pl:"EAD" },
  goalFamily:  { en:"Family Petition",es:"Petición familiar",ru:"Семейная",fr:"Pétition familiale",pt:"Petição familiar",ht:"Petisyon fanmi",ar:"طلب عائلي",so:"Codsiga qoyska",ne:"पारिवारिक",my:"မိသားစု",uk:"Сімейна петиція",pl:"Petycja rodzinna" },
  goalCitizen: { en:"Citizenship",es:"Ciudadanía",ru:"Гражданство",fr:"Citoyenneté",pt:"Cidadania",ht:"Sitwayen",ar:"جنسية",so:"Muwaadinnimo",ne:"नागरिकता",my:"နိုင်ငံသား",uk:"Громадянство",pl:"Obywatelstwo" },
  goalGreen:   { en:"Green Card",es:"Tarjeta verde",ru:"Грин-карта",fr:"Carte verte",pt:"Green Card",ht:"Kat vèt",ar:"البطاقة الخضراء",so:"Kaarka",ne:"ग्रिन कार्ड",my:"ဂရင်းကတ်",uk:"Грін-карта",pl:"Zielona karta" },
  goalTravel:  { en:"Travel Doc",es:"Viaje",ru:"Документ",fr:"Doc voyage",pt:"Doc viagem",ht:"Dok vwayaj",ar:"وثيقة سفر",so:"Dukumentiga",ne:"यात्रा",my:"ခရီးစာရွက်",uk:"Документ",pl:"Dokument podróżny" },
  goalAsylum:  { en:"Asylum",es:"Asilo",ru:"Убежище",fr:"Asile",pt:"Asilo",ht:"Azil",ar:"لجوء",so:"Magangalo",ne:"शरण",my:"ခိုလှုံခွင့်",uk:"Притулок",pl:"Azyl" },
};

/** Bilingual label -- adds English parens for non-en */
export function bt(lang: LangCode, key: string): string {
  const v = T[key];
  if (!v) return key;
  if (lang === "en") return v.en;
  return (v[lang] || v.en) + " (" + v.en + ")";
}

/** Plain translate */
export function t(lang: LangCode, key: string): string {
  const v = T[key];
  if (!v) return key;
  return v[lang] || v.en;
}
