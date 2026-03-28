import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  1. LANGUAGES                                                            ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

const LANGS = [
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
  { code: "ro", name: "Română",     flag: "🇷🇴" },
  { code: "bg", name: "Български",  flag: "🇧🇬" },
  { code: "tr", name: "Türkçe",     flag: "🇹🇷" },
  { code: "it", name: "Italiano",   flag: "🇮🇹" },
  { code: "de", name: "Deutsch",    flag: "🇩🇪" },
  { code: "fa", name: "فارسی",      flag: "🇮🇷" },
  { code: "he", name: "עברית",      flag: "🇮🇱" },
  { code: "zh", name: "中文",        flag: "🇨🇳" },
];

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  2. TRANSLATIONS                                                         ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

const T = {
  /* ── App chrome ── */
  appName:        { en:"ImmIGuide",es:"ImmIGuide",ru:"ИммиГид",fr:"ImmIGuide",pt:"ImmIGuide",ht:"ImmIGuide",ar:"ImmIGuide",so:"ImmIGuide",ne:"ImmIGuide",my:"ImmIGuide" },
  welcome:        { en:"Welcome",es:"Bienvenido",ru:"Добро пожаловать",fr:"Bienvenue",pt:"Bem-vindo",ht:"Byenveni",ar:"مرحباً",so:"Soo dhawoow",ne:"स्वागत",my:"ကြိုဆိုပါ" },
  getStarted:     { en:"Get Started",es:"Comenzar",ru:"Начать",fr:"Commencer",pt:"Começar",ht:"Kòmanse",ar:"ابدأ",so:"Bilow",ne:"सुरु",my:"စတင်" },
  next:           { en:"Next",es:"Siguiente",ru:"Далее",fr:"Suivant",pt:"Próximo",ht:"Pwochen",ar:"التالي",so:"Xiga",ne:"अर्को",my:"ရှေ့" },
  back:           { en:"Back",es:"Atrás",ru:"Назад",fr:"Retour",pt:"Voltar",ht:"Retounen",ar:"رجوع",so:"Dib",ne:"पछाडि",my:"နောက်" },
  login:          { en:"Login",es:"Iniciar sesión",ru:"Войти",fr:"Connexion",pt:"Entrar",ht:"Konekte",ar:"دخول",so:"Gal",ne:"लगइन",my:"ဝင်ရောက်" },
  email:          { en:"Email",es:"Correo",ru:"Почта",fr:"Email",pt:"Email",ht:"Imèl",ar:"بريد",so:"Iimeel",ne:"इमेल",my:"အီးမေးလ်" },
  password:       { en:"Password",es:"Contraseña",ru:"Пароль",fr:"Mot de passe",pt:"Senha",ht:"Modpas",ar:"كلمة سر",so:"Furaha",ne:"पासवर्ड",my:"စကားဝှက်" },
  or:             { en:"OR",es:"O",ru:"ИЛИ",fr:"OU",pt:"OU",ht:"OSWA",ar:"أو",so:"AMA",ne:"वा",my:"သို့မဟုတ်" },
  continueGoogle: { en:"Continue with Google",es:"Continuar con Google",ru:"Войти через Google",fr:"Continuer avec Google",pt:"Continuar com Google",ht:"Kontinye ak Google",ar:"المتابعة مع Google",so:"Ku sii wad Google",ne:"Google मार्फत",my:"Google ဖြင့်" },
  continueApple:  { en:"Continue with Apple",es:"Continuar con Apple",ru:"Войти через Apple",fr:"Continuer avec Apple",pt:"Continuar com Apple",ht:"Kontinye ak Apple",ar:"المتابعة مع Apple",so:"Ku sii wad Apple",ne:"Apple मार्फत",my:"Apple ဖြင့်" },

  /* ── Dashboard / nav ── */
  dashboard:    { en:"Dashboard",es:"Panel",ru:"Панель",fr:"Tableau",pt:"Painel",ht:"Tablo",ar:"لوحة",so:"Bogga",ne:"ड्यासबोर्ड",my:"ဒက်ရှ်ဘုတ်" },
  myForms:      { en:"My Forms",es:"Mis formularios",ru:"Мои формы",fr:"Mes formulaires",pt:"Meus formulários",ht:"Fòm mwen",ar:"نماذجي",so:"Foomamkayga",ne:"मेरा फार्म",my:"ကျွန်ုပ်ဖောင်များ" },
  startNew:     { en:"New Form",es:"Nuevo",ru:"Новая",fr:"Nouveau",pt:"Novo",ht:"Nouvo",ar:"جديد",so:"Cusub",ne:"नयाँ",my:"အသစ်" },
  formWizard:   { en:"Wizard",es:"Asistente",ru:"Мастер",fr:"Assistant",pt:"Assistente",ht:"Asistan",ar:"مساعد",so:"Caawiye",ne:"विजार्ड",my:"လမ်းညွှန်" },
  selectForm:   { en:"Select Form",es:"Seleccione",ru:"Выберите",fr:"Sélectionner",pt:"Selecionar",ht:"Chwazi",ar:"اختر",so:"Dooro",ne:"छान्नुहोस्",my:"ရွေးပါ" },
  civicsTest:   { en:"Civics Test",es:"Examen cívico",ru:"Тест",fr:"Test civique",pt:"Teste cívico",ht:"Tès sivik",ar:"اختبار",so:"Imtixaan",ne:"नागरिक परीक्षा",my:"စာမေးပွဲ" },
  tracking:     { en:"Tracking",es:"Seguimiento",ru:"Отслеживание",fr:"Suivi",pt:"Rastreamento",ht:"Swivi",ar:"تتبع",so:"Raadraac",ne:"ट्र्याकिङ",my:"ခြေရာခံ" },
  knowledgeBase:{ en:"Info",es:"Info",ru:"Инфо",fr:"Info",pt:"Info",ht:"Enfò",ar:"معلومات",so:"Macluumaad",ne:"जानकारी",my:"အချက်အလက်" },
  profile:      { en:"Profile",es:"Perfil",ru:"Профиль",fr:"Profil",pt:"Perfil",ht:"Pwofil",ar:"ملف",so:"Bogga",ne:"प्रोफाइल",my:"ပရိုဖိုင်" },
  logout:       { en:"Logout",es:"Salir",ru:"Выйти",fr:"Déconnexion",pt:"Sair",ht:"Dekonekte",ar:"خروج",so:"Ka bax",ne:"लगआउट",my:"ထွက်" },

  /* ── Form tiers / meta ── */
  simple:   { en:"Simple",es:"Sencillo",ru:"Простой",fr:"Simple",pt:"Simples",ht:"Senp",ar:"بسيط",so:"Fudud",ne:"सरल",my:"ရိုးရှင်း" },
  medium:   { en:"Medium",es:"Medio",ru:"Средний",fr:"Moyen",pt:"Médio",ht:"Mwayen",ar:"متوسط",so:"Dhexe",ne:"मध्यम",my:"အလယ်" },
  complex:  { en:"Complex",es:"Complejo",ru:"Сложный",fr:"Complexe",pt:"Complexo",ht:"Konplèks",ar:"معقد",so:"Adag",ne:"जटिल",my:"ရှုပ်ထွေး" },
  sections: { en:"sections",es:"secciones",ru:"разд.",fr:"sections",pt:"seções",ht:"seksyon",ar:"أقسام",so:"qaybaha",ne:"खण्ड",my:"အပိုင်း" },
  fields:   { en:"fields",es:"campos",ru:"полей",fr:"champs",pt:"campos",ht:"chan",ar:"حقول",so:"goobaha",ne:"फिल्ड",my:"ကွက်" },
  months:   { en:"months",es:"meses",ru:"мес.",fr:"mois",pt:"meses",ht:"mwa",ar:"أشهر",so:"bilood",ne:"महिना",my:"လ" },
  step:     { en:"STEP",es:"PASO",ru:"ШАГ",fr:"ÉTAPE",pt:"PASSO",ht:"ETAP",ar:"خطوة",so:"TALLAABO",ne:"चरण",my:"အဆင့်" },

  /* ── Form actions ── */
  startForm:    { en:"Start",es:"Iniciar",ru:"Начать",fr:"Démarrer",pt:"Iniciar",ht:"Kòmanse",ar:"ابدأ",so:"Bilow",ne:"सुरु",my:"စတင်" },
  continueForm: { en:"Continue",es:"Continuar",ru:"Продолжить",fr:"Continuer",pt:"Continuar",ht:"Kontinye",ar:"متابعة",so:"Sii wad",ne:"जारी",my:"ဆက်လုပ်" },
  review:       { en:"Review",es:"Revisar",ru:"Просмотр",fr:"Vérifier",pt:"Revisar",ht:"Revize",ar:"مراجعة",so:"Dib u eeg",ne:"समीक्षा",my:"ပြန်ကြည့်" },
  pdfPreview:   { en:"Preview",es:"Vista previa",ru:"Просмотр",fr:"Aperçu",pt:"Visualizar",ht:"Apèsi",ar:"معاينة",so:"Muuqaal",ne:"पूर्वावलोकन",my:"အကြိုကြည့်" },
  print:        { en:"Print",es:"Imprimir",ru:"Печать",fr:"Imprimer",pt:"Imprimir",ht:"Enprime",ar:"طباعة",so:"Daabac",ne:"प्रिन्ट",my:"ပရင့်" },
  complete:     { en:"Complete!",es:"¡Completo!",ru:"Готово!",fr:"Terminé!",pt:"Completo!",ht:"Fini!",ar:"!تم",so:"Dhammaystiran!",ne:"पूरा!",my:"ပြီးပါပြီ!" },

  /* ── Payment ── */
  payment:    { en:"Payment",es:"Pago",ru:"Оплата",fr:"Paiement",pt:"Pagamento",ht:"Peman",ar:"دفع",so:"Lacag",ne:"भुक्तानी",my:"ငွေပေးချေ" },
  promoCode:  { en:"Promo Code",es:"Código",ru:"Промокод",fr:"Code promo",pt:"Código",ht:"Kòd pwomo",ar:"رمز",so:"Koodhka",ne:"प्रोमो",my:"ကုဒ်" },
  apply:      { en:"Apply",es:"Aplicar",ru:"Применить",fr:"Appliquer",pt:"Aplicar",ht:"Aplike",ar:"تطبيق",so:"Codso",ne:"लागू",my:"သုံး" },
  payNow:     { en:"Pay Now",es:"Pagar",ru:"Оплатить",fr:"Payer",pt:"Pagar",ht:"Peye",ar:"ادفع",so:"Bixi",ne:"तिर्नु",my:"ပေးချေ" },
  serviceFee: { en:"Service Fee",es:"Tarifa",ru:"Сбор",fr:"Frais",pt:"Taxa",ht:"Frè",ar:"رسوم",so:"Kharash",ne:"शुल्क",my:"ကြေး" },
  uscisFee:   { en:"USCIS Fee",es:"USCIS",ru:"USCIS",fr:"USCIS",pt:"USCIS",ht:"USCIS",ar:"USCIS",so:"USCIS",ne:"USCIS",my:"USCIS" },
  total:      { en:"Total",es:"Total",ru:"Итого",fr:"Total",pt:"Total",ht:"Total",ar:"المجموع",so:"Wadarta",ne:"जम्मा",my:"စုစုပေါင်း" },

  /* ── Payment options page ── */
  paymentOptions:   { en:"Payment Options",es:"Opciones de pago",ru:"Способы оплаты",fr:"Options de paiement",pt:"Opções de pagamento",ht:"Opsyon peman",ar:"خيارات الدفع",so:"Doorashada lacagta",ne:"भुक्तानी विकल्प",my:"ငွေပေးချေနည်းများ" },
  selectPayMethod:  { en:"Select Payment Method",es:"Seleccione método de pago",ru:"Выберите способ оплаты",fr:"Sélectionnez le mode de paiement",pt:"Selecione o método de pagamento",ht:"Chwazi metòd peman",ar:"اختر طريقة الدفع",so:"Dooro habka lacagta",ne:"भुक्तानी विधि छान्नुहोस्",my:"ငွေပေးချေနည်း ရွေးပါ" },
  creditDebitCard:  { en:"Credit / Debit Card",es:"Tarjeta crédito / débito",ru:"Кредитная / дебетовая карта",fr:"Carte crédit / débit",pt:"Cartão crédito / débito",ht:"Kat kredi / debi",ar:"بطاقة ائتمان / خصم",so:"Kaarka lacagta",ne:"क्रेडिट / डेबिट कार्ड",my:"ခရက်ဒစ် / ဒက်ဘစ် ကတ်" },
  cardNumber:       { en:"Card Number",es:"Número de tarjeta",ru:"Номер карты",fr:"Numéro de carte",pt:"Número do cartão",ht:"Nimewo kat",ar:"رقم البطاقة",so:"Lambarka kaarka",ne:"कार्ड नम्बर",my:"ကတ်နံပါတ်" },
  expDate:          { en:"Expiration Date",es:"Fecha vencimiento",ru:"Срок действия",fr:"Date d'expiration",pt:"Data de validade",ht:"Dat ekspirasyon",ar:"تاريخ الانتهاء",so:"Taariikhda dhicitaanka",ne:"म्याद मिति",my:"သက်တမ်းကုန်ရက်" },
  cvv:              { en:"CVV",es:"CVV",ru:"CVV",fr:"CVV",pt:"CVV",ht:"CVV",ar:"CVV",so:"CVV",ne:"CVV",my:"CVV" },
  cardHolder:       { en:"Cardholder Name",es:"Nombre del titular",ru:"Имя владельца",fr:"Nom du titulaire",pt:"Nome do titular",ht:"Non titilè",ar:"اسم حامل البطاقة",so:"Magaca milkiilaha",ne:"कार्डधारकको नाम",my:"ကတ်ပိုင်ရှင်အမည်" },
  paypal:           { en:"PayPal",es:"PayPal",ru:"PayPal",fr:"PayPal",pt:"PayPal",ht:"PayPal",ar:"PayPal",so:"PayPal",ne:"PayPal",my:"PayPal" },
  payWithPaypal:    { en:"Pay with PayPal",es:"Pagar con PayPal",ru:"Оплатить через PayPal",fr:"Payer avec PayPal",pt:"Pagar com PayPal",ht:"Peye ak PayPal",ar:"ادفع عبر PayPal",so:"Ku bixi PayPal",ne:"PayPal बाट तिर्नुहोस्",my:"PayPal ဖြင့်ပေးချေ" },
  zelle:            { en:"Zelle",es:"Zelle",ru:"Zelle",fr:"Zelle",pt:"Zelle",ht:"Zelle",ar:"Zelle",so:"Zelle",ne:"Zelle",my:"Zelle" },
  zelleInstr:       { en:"Send payment via Zelle to:",es:"Envíe el pago por Zelle a:",ru:"Отправьте оплату через Zelle:",fr:"Envoyez le paiement via Zelle à:",pt:"Envie o pagamento via Zelle para:",ht:"Voye peman via Zelle bay:",ar:"أرسل الدفعة عبر Zelle إلى:",so:"U dir lacagta Zelle:",ne:"Zelle मार्फत भुक्तानी पठाउनुहोस्:",my:"Zelle မှတဆင့် ငွေလွှဲပါ:" },
  bankTransfer:     { en:"Bank Transfer / Wire",es:"Transferencia bancaria",ru:"Банковский перевод",fr:"Virement bancaire",pt:"Transferência bancária",ht:"Transfè labank",ar:"تحويل بنكي",so:"Wareejinta bangiga",ne:"बैंक ट्रान्सफर",my:"ဘဏ်လွှဲ" },
  bankInstr:        { en:"Transfer to the following account:",es:"Transfiera a la siguiente cuenta:",ru:"Переведите на следующий счёт:",fr:"Transférez au compte suivant:",pt:"Transfira para a seguinte conta:",ht:"Transfère nan kont sa a:",ar:"حوّل إلى الحساب التالي:",so:"U wareej xisaabta:",ne:"निम्न खातामा ट्रान्सफर:",my:"အောက်ပါအကောင့်သို့ လွှဲပါ:" },
  bankName:         { en:"Bank",es:"Banco",ru:"Банк",fr:"Banque",pt:"Banco",ht:"Bank",ar:"البنك",so:"Bangiga",ne:"बैंक",my:"ဘဏ်" },
  accountName:      { en:"Account Name",es:"Nombre de cuenta",ru:"Наименование",fr:"Nom du compte",pt:"Nome da conta",ht:"Non kont",ar:"اسم الحساب",so:"Magaca xisaabta",ne:"खाता नाम",my:"အကောင့်အမည်" },
  routingNum:       { en:"Routing #",es:"Routing #",ru:"Routing #",fr:"Routing #",pt:"Routing #",ht:"Routing #",ar:"Routing #",so:"Routing #",ne:"Routing #",my:"Routing #" },
  accountNum:       { en:"Account #",es:"Cuenta #",ru:"Счёт #",fr:"Compte #",pt:"Conta #",ht:"Kont #",ar:"رقم الحساب",so:"Xisaabta #",ne:"खाता #",my:"အကောင့် #" },
  applePay:         { en:"Apple Pay",es:"Apple Pay",ru:"Apple Pay",fr:"Apple Pay",pt:"Apple Pay",ht:"Apple Pay",ar:"Apple Pay",so:"Apple Pay",ne:"Apple Pay",my:"Apple Pay" },
  googlePay:        { en:"Google Pay",es:"Google Pay",ru:"Google Pay",fr:"Google Pay",pt:"Google Pay",ht:"Google Pay",ar:"Google Pay",so:"Google Pay",ne:"Google Pay",my:"Google Pay" },
  submitPayment:    { en:"Submit Payment",es:"Enviar pago",ru:"Отправить оплату",fr:"Soumettre le paiement",pt:"Enviar pagamento",ht:"Soumèt peman",ar:"إرسال الدفعة",so:"Dir lacagta",ne:"भुक्तानी पेश गर्नुहोस्",my:"ငွေပေးချေမှု တင်သွင်းပါ" },
  amountDue:        { en:"Amount Due",es:"Monto a pagar",ru:"К оплате",fr:"Montant dû",pt:"Valor devido",ht:"Montan pou peye",ar:"المبلغ المستحق",so:"Qaddarka lacagta",ne:"तिर्नुपर्ने रकम",my:"ပေးချေရမည့်ပမာဏ" },
  processing:       { en:"Processing payment…",es:"Procesando pago…",ru:"Обработка оплаты…",fr:"Traitement du paiement…",pt:"Processando pagamento…",ht:"Peman ap trete…",ar:"جاري معالجة الدفعة…",so:"Lacagta waa la habeynayaa…",ne:"भुक्तानी प्रशोधन हुँदैछ…",my:"ငွေပေးချေမှု စီစစ်နေသည်…" },
  paymentSuccess:   { en:"Payment Successful!",es:"¡Pago exitoso!",ru:"Оплата прошла успешно!",fr:"Paiement réussi!",pt:"Pagamento realizado!",ht:"Peman reyisi!",ar:"تم الدفع بنجاح!",so:"Lacagta waa lagu guulaystay!",ne:"भुक्तानी सफल!",my:"ငွေပေးချေမှု အောင်မြင်ပါသည်!" },
  securePayment:    { en:"🔒 Secure & Encrypted",es:"🔒 Seguro y encriptado",ru:"🔒 Безопасно и зашифровано",fr:"🔒 Sécurisé et chiffré",pt:"🔒 Seguro e criptografado",ht:"🔒 Sekirize e ankripte",ar:"🔒 آمن ومشفر",so:"🔒 Ammaan & sir ah",ne:"🔒 सुरक्षित र इन्क्रिप्टेड",my:"🔒 လုံခြုံပြီး ကုဒ်ဝှက်ထား" },

  /* ── Documents ── */
  docUpload:  { en:"Documents",es:"Documentos",ru:"Документы",fr:"Documents",pt:"Documentos",ht:"Dokiman",ar:"مستندات",so:"Dukumeenti",ne:"कागजात",my:"စာရွက်" },
  passport:   { en:"Passport",es:"Pasaporte",ru:"Паспорт",fr:"Passeport",pt:"Passaporte",ht:"Paspò",ar:"جواز سفر",so:"Baasaaboor",ne:"राहदानी",my:"ပတ်စ်ပို့" },
  birthCert:  { en:"Birth Certificate",es:"Acta nacimiento",ru:"Свидетельство",fr:"Acte de naissance",pt:"Certidão",ht:"Batistè",ar:"شهادة ميلاد",so:"Shahaado",ne:"जन्मदर्ता",my:"မွေးစာရင်း" },
  photo:      { en:"Photo",es:"Foto",ru:"Фото",fr:"Photo",pt:"Foto",ht:"Foto",ar:"صورة",so:"Sawir",ne:"फोटो",my:"ဓာတ်ပုံ" },
  supporting: { en:"Supporting Docs",es:"Documentos apoyo",ru:"Документы",fr:"Pièces jointes",pt:"Documentos",ht:"Dokiman sipò",ar:"مستندات داعمة",so:"Dukumeenti",ne:"कागजात",my:"စာရွက်" },

  /* ── Form fields ── */
  firstName:    { en:"First Name",es:"Nombre",ru:"Имя",fr:"Prénom",pt:"Nome",ht:"Non",ar:"الاسم",so:"Magaca",ne:"नाम",my:"အမည်" },
  lastName:     { en:"Last Name",es:"Apellido",ru:"Фамилия",fr:"Nom",pt:"Sobrenome",ht:"Siyati",ar:"اللقب",so:"Magaca",ne:"थर",my:"မျိုးနွယ်" },
  dob:          { en:"Date of Birth",es:"Fecha",ru:"Дата",fr:"Date de naissance",pt:"Data",ht:"Dat nesans",ar:"تاريخ الميلاد",so:"Taariikhda",ne:"जन्ममिति",my:"မွေးနေ့" },
  country:      { en:"Country of Birth",es:"País",ru:"Страна",fr:"Pays",pt:"País",ht:"Peyi",ar:"البلد",so:"Dalka",ne:"देश",my:"နိုင်ငံ" },
  aNumber:      { en:"A-Number (optional)",es:"Número A",ru:"A-номер",fr:"Numéro A",pt:"Número A",ht:"Nimewo A",ar:"رقم A",so:"Lambarka A",ne:"A-नम्बर",my:"A-နံပါတ်" },
  ssn:          { en:"SSN (optional)",es:"SSN",ru:"SSN",fr:"SSN",pt:"SSN",ht:"SSN",ar:"SSN",so:"SSN",ne:"SSN",my:"SSN" },
  address:      { en:"Address (optional)",es:"Dirección",ru:"Адрес",fr:"Adresse",pt:"Endereço",ht:"Adrès",ar:"العنوان",so:"Cinwaanka",ne:"ठेगाना",my:"လိပ်စာ" },
  phone:        { en:"Phone",es:"Teléfono",ru:"Телефон",fr:"Téléphone",pt:"Telefone",ht:"Telefòn",ar:"هاتف",so:"Taleefan",ne:"फोन",my:"ဖုန်း" },
  gender:       { en:"Gender",es:"Género",ru:"Пол",fr:"Genre",pt:"Gênero",ht:"Sèks",ar:"الجنس",so:"Jinsiga",ne:"लिङ्ग",my:"ကျား/မ" },
  male:         { en:"Male",es:"Masculino",ru:"Муж.",fr:"Homme",pt:"Masculino",ht:"Gason",ar:"ذكر",so:"Lab",ne:"पुरुष",my:"ကျား" },
  female:       { en:"Female",es:"Femenino",ru:"Жен.",fr:"Femme",pt:"Feminino",ht:"Fi",ar:"أنثى",so:"Dhedig",ne:"महिला",my:"မ" },
  maritalStatus:{ en:"Marital Status",es:"Estado civil",ru:"Сем. положение",fr:"État civil",pt:"Estado civil",ht:"Eta sivil",ar:"الحالة",so:"Xaalada",ne:"वैवाहिक",my:"အိမ်ထောင်" },
  single:       { en:"Single",es:"Soltero/a",ru:"Холост",fr:"Célibataire",pt:"Solteiro/a",ht:"Selibatè",ar:"أعزب",so:"Guursan",ne:"अविवाहित",my:"လူပျို" },
  married:      { en:"Married",es:"Casado/a",ru:"Женат",fr:"Marié(e)",pt:"Casado/a",ht:"Marye",ar:"متزوج",so:"Guursaday",ne:"विवाहित",my:"အိမ်ထောင်ရှိ" },
  divorced:     { en:"Divorced",es:"Divorciado",ru:"Разведён",fr:"Divorcé(e)",pt:"Divorciado",ht:"Divòse",ar:"مطلق",so:"Furay",ne:"विवाहविच्छेद",my:"ကွာရှင်း" },
  widowed:      { en:"Widowed",es:"Viudo/a",ru:"Вдовец",fr:"Veuf/ve",pt:"Viúvo/a",ht:"Vèf",ar:"أرمل",so:"Carmal",ne:"विधुर",my:"မုဆိုး" },
  entryDate:    { en:"Last Entry Date",es:"Fecha entrada",ru:"Дата въезда",fr:"Date d'entrée",pt:"Data entrada",ht:"Dat antre",ar:"تاريخ الدخول",so:"Taariikhda",ne:"प्रवेश मिति",my:"ဝင်ရောက်ရက်" },
  i94:          { en:"I-94 (optional)",es:"I-94",ru:"I-94",fr:"I-94",pt:"I-94",ht:"I-94",ar:"I-94",so:"I-94",ne:"I-94",my:"I-94" },
  tpsCountry:   { en:"TPS Country",es:"País TPS",ru:"Страна TPS",fr:"Pays TPS",pt:"País TPS",ht:"Peyi TPS",ar:"بلد TPS",so:"Dalka TPS",ne:"TPS देश",my:"TPS နိုင်ငံ" },
  eligCategory: { en:"Eligibility",es:"Categoría",ru:"Категория",fr:"Éligibilité",pt:"Elegibilidade",ht:"Elijibilite",ar:"الأهلية",so:"Xaqa",ne:"योग्यता",my:"အရည်အချင်း" },
  petitionerName:{ en:"Petitioner",es:"Peticionario",ru:"Заявитель",fr:"Pétitionnaire",pt:"Peticionário",ht:"Petisyonè",ar:"مقدم الطلب",so:"Codsade",ne:"निवेदक",my:"တောင်းဆိုသူ" },
  relationship: { en:"Relationship",es:"Relación",ru:"Родство",fr:"Relation",pt:"Relação",ht:"Relasyon",ar:"العلاقة",so:"Xiriirka",ne:"सम्बन्ध",my:"ဆက်ဆံရေး" },
  yearsResident:{ en:"Years Residence",es:"Años",ru:"Лет",fr:"Années",pt:"Anos",ht:"Ane",ar:"سنوات",so:"Sanado",ne:"वर्ष",my:"နှစ်" },
  travelPurpose:{ en:"Travel Purpose",es:"Propósito",ru:"Цель",fr:"But du voyage",pt:"Propósito",ht:"Rezon vwayaj",ar:"الغرض",so:"Ujeedada",ne:"उद्देश्य",my:"ရည်ရွယ်ချက်" },
  persecutionCountry:{ en:"Persecution Country",es:"País",ru:"Страна",fr:"Pays de persécution",pt:"País",ht:"Peyi",ar:"بلد الاضطهاد",so:"Dalka",ne:"देश",my:"နိုင်ငံ" },
  persecutionBasis:  { en:"Persecution Basis",es:"Base",ru:"Основание",fr:"Base",pt:"Base",ht:"Baz",ar:"أساس",so:"Aasaaska",ne:"आधार",my:"အခြေခံ" },
  onboard1Desc:{ en:"Step-by-step guidance in your language",es:"Guía paso a paso",ru:"Пошаговое руководство",fr:"Guide étape par étape",pt:"Guia passo a passo",ht:"Gid etap pa etap",ar:"دليل خطوة بخطوة",so:"Hagitaan tallaabo",ne:"चरणबद्ध मार्गदर्शन",my:"တစ်ဆင့်ချင်းလမ်းညွှန်" },

  /* ── Validation ── */
  required:     { en:"Required",es:"Obligatorio",ru:"Обязательно",fr:"Requis",pt:"Obrigatório",ht:"Obligatwa",ar:"مطلوب",so:"Loo baahan",ne:"आवश्यक",my:"လိုအပ်" },
  invalidEmail: { en:"Invalid email",es:"Inválido",ru:"Неверный",fr:"Invalide",pt:"Inválido",ht:"Envali",ar:"غير صالح",so:"Khaldan",ne:"अमान्य",my:"မမှန်" },
  invalidPhone: { en:"Invalid phone",es:"Inválido",ru:"Неверный",fr:"Invalide",pt:"Inválido",ht:"Envali",ar:"غير صالح",so:"Khaldan",ne:"अमान्य",my:"မမှန်" },

  /* ── Goal labels ── */
  goalTPS:     { en:"TPS",es:"TPS",ru:"TPS",fr:"TPS",pt:"TPS",ht:"TPS",ar:"TPS",so:"TPS",ne:"TPS",my:"TPS" },
  goalDACA:    { en:"DACA",es:"DACA",ru:"DACA",fr:"DACA",pt:"DACA",ht:"DACA",ar:"DACA",so:"DACA",ne:"DACA",my:"DACA" },
  goalEAD:     { en:"EAD",es:"EAD",ru:"EAD",fr:"EAD",pt:"EAD",ht:"EAD",ar:"EAD",so:"EAD",ne:"EAD",my:"EAD" },
  goalFamily:  { en:"Family Petition",es:"Petición familiar",ru:"Семейная",fr:"Pétition familiale",pt:"Petição familiar",ht:"Petisyon fanmi",ar:"طلب عائلي",so:"Codsiga qoyska",ne:"पारिवारिक",my:"မိသားစု" },
  goalCitizen: { en:"Citizenship",es:"Ciudadanía",ru:"Гражданство",fr:"Citoyenneté",pt:"Cidadania",ht:"Sitwayen",ar:"جنسية",so:"Muwaadinnimo",ne:"नागरिकता",my:"နိုင်ငံသား" },
  goalGreen:   { en:"Green Card",es:"Tarjeta verde",ru:"Грин-карта",fr:"Carte verte",pt:"Green Card",ht:"Kat vèt",ar:"البطاقة الخضراء",so:"Kaarka",ne:"ग्रिन कार्ड",my:"ဂရင်းကတ်" },
  goalTravel:  { en:"Travel Doc",es:"Viaje",ru:"Документ",fr:"Doc voyage",pt:"Doc viagem",ht:"Dok vwayaj",ar:"وثيقة سفر",so:"Dukumentiga",ne:"यात्रा",my:"ခရီးစာရွက်" },
  goalAsylum:  { en:"Asylum",es:"Asilo",ru:"Убежище",fr:"Asile",pt:"Asilo",ht:"Azil",ar:"لجوء",so:"Magangalo",ne:"शरण",my:"ခိုလှုံခွင့်" },
};

/** Bilingual label — adds English parens for non-en */
function bt(lang, key) {
  const v = T[key];
  if (!v) return key;
  if (lang === "en") return v.en;
  return (v[lang] || v.en) + " (" + v.en + ")";
}

/** Plain translate */
function t(lang, key) {
  const v = T[key];
  if (!v) return key;
  return v[lang] || v.en;
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  3. DATA — Countries, Forms, Civics                                      ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

const COUNTRIES = ["Afghanistan","Argentina","Australia","Bangladesh","Brazil","Cambodia","Cameroon","Canada","Chile","China","Colombia","Cuba","Dominican Republic","Ecuador","Egypt","El Salvador","Ethiopia","France","Germany","Ghana","Greece","Guatemala","Haiti","Honduras","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kenya","Laos","Lebanon","Liberia","Libya","Mexico","Myanmar","Nepal","Netherlands","Nicaragua","Nigeria","North Korea","Pakistan","Peru","Philippines","Poland","Romania","Russia","Saudi Arabia","Sierra Leone","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Sweden","Switzerland","Syria","Taiwan","Thailand","Turkey","Uganda","Ukraine","United Kingdom","United States","Uruguay","Venezuela","Vietnam","Yemen","Zimbabwe"];

const TPS_COUNTRIES = ["Afghanistan","Cameroon","El Salvador","Ethiopia","Haiti","Honduras","Myanmar","Nepal","Nicaragua","Somalia","South Sudan","Sudan","Syria","Ukraine","Venezuela","Yemen"];

const OPTIONAL_FIELDS = ["ssn", "aNumber", "i94", "address"];

const FORMS = [
  { id:"i821", name:"I-821",  desc:"goalTPS",     tier:"simple",  fee:199.99, uscis:510,  sections:4, fieldCount:13, time:"6-12",  fields:[{s:0,k:"firstName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"country",t:"country"},{s:1,k:"aNumber",t:"text"},{s:1,k:"ssn",t:"text"},{s:1,k:"address",t:"text"},{s:1,k:"phone",t:"tel"},{s:2,k:"entryDate",t:"date"},{s:2,k:"i94",t:"text"},{s:2,k:"tpsCountry",t:"tps"},{s:3,k:"gender",t:"select",opts:["male","female"]},{s:3,k:"maritalStatus",t:"select",opts:["single","married","divorced","widowed"]}] },
  { id:"daca", name:"DACA",   desc:"goalDACA",    tier:"simple",  fee:199.99, uscis:410,  sections:3, fieldCount:9,  time:"4-8",   fields:[{s:0,k:"firstName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:1,k:"aNumber",t:"text"},{s:1,k:"ssn",t:"text"},{s:1,k:"address",t:"text"},{s:2,k:"phone",t:"tel"},{s:2,k:"email",t:"email"},{s:2,k:"entryDate",t:"date"}] },
  { id:"i765", name:"I-765",  desc:"goalEAD",     tier:"simple",  fee:199.99, uscis:560,  sections:2, fieldCount:6,  time:"3-6",   fields:[{s:0,k:"firstName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:1,k:"eligCategory",t:"text"},{s:1,k:"ssn",t:"text"},{s:1,k:"phone",t:"tel"}] },
  { id:"i130", name:"I-130",  desc:"goalFamily",  tier:"medium",  fee:249.99, uscis:535,  sections:3, fieldCount:7,  time:"12-24", fields:[{s:0,k:"firstName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:1,k:"petitionerName",t:"text"},{s:1,k:"relationship",t:"text"},{s:2,k:"address",t:"text"},{s:2,k:"phone",t:"tel"}] },
  { id:"n400", name:"N-400",  desc:"goalCitizen", tier:"medium",  fee:249.99, uscis:760,  sections:3, fieldCount:9,  time:"8-14",  fields:[{s:0,k:"firstName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:1,k:"aNumber",t:"text"},{s:1,k:"ssn",t:"text"},{s:1,k:"yearsResident",t:"text"},{s:2,k:"address",t:"text"},{s:2,k:"phone",t:"tel"},{s:2,k:"email",t:"email"}] },
  { id:"i485", name:"I-485",  desc:"goalGreen",   tier:"complex", fee:299.99, uscis:1440, sections:3, fieldCount:8,  time:"12-36", fields:[{s:0,k:"firstName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:1,k:"aNumber",t:"text"},{s:1,k:"eligCategory",t:"text"},{s:1,k:"entryDate",t:"date"},{s:2,k:"address",t:"text"},{s:2,k:"phone",t:"tel"}] },
  { id:"i131", name:"I-131",  desc:"goalTravel",  tier:"medium",  fee:249.99, uscis:640,  sections:2, fieldCount:7,  time:"3-6",   fields:[{s:0,k:"firstName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"aNumber",t:"text"},{s:1,k:"travelPurpose",t:"text"},{s:1,k:"address",t:"text"},{s:1,k:"phone",t:"tel"}] },
  { id:"i589", name:"I-589",  desc:"goalAsylum",  tier:"complex", fee:299.99, uscis:0,    sections:2, fieldCount:7,  time:"6-24",  fields:[{s:0,k:"firstName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"country",t:"country"},{s:1,k:"persecutionCountry",t:"country"},{s:1,k:"persecutionBasis",t:"text"},{s:1,k:"address",t:"text"}] },
];

const CIVICS = [
  { q:"What is the supreme law of the land?",           o:["The Constitution","The Bill of Rights","Declaration of Independence","Federal Law"], a:0 },
  { q:"What do we call the first ten amendments?",       o:["The Bill of Rights","The Constitution","The Preamble","The Articles"], a:0 },
  { q:"How many amendments does the Constitution have?", o:["27","10","21","33"], a:0 },
  { q:"Name one branch of government.",                  o:["Legislative","Military","Electoral","Financial"], a:0 },
  { q:"Who makes federal laws?",                         o:["Congress","The President","Supreme Court","The States"], a:0 },
  { q:"How many U.S. Senators are there?",               o:["100","50","435","200"], a:0 },
  { q:"Who is Commander in Chief of the military?",      o:["The President","Secretary of Defense","Five-Star General","Vice President"], a:0 },
  { q:"What is the highest court in the US?",            o:["Supreme Court","Circuit Court","District Court","Court of Appeals"], a:0 },
  { q:"How many justices on the Supreme Court?",         o:["9","7","11","12"], a:0 },
  { q:"What stops one branch from being too powerful?",  o:["Checks and balances","The military","The media","Public opinion"], a:0 },
  { q:"How many voting members in the House?",           o:["435","100","535","350"], a:0 },
  { q:"Who signs bills to become laws?",                 o:["The President","Vice President","Speaker of the House","Chief Justice"], a:0 },
];

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  4. NOTIFICATIONS / HIGHLIGHTS / ONBOARDING                              ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

const NOTIF_COLORS = { urgent:"#ef4444", action:"#fbbf24", warning:"#f97316", success:"#34d399", info:"#60a5fa" };

const NOTIF = {
  en:[{icon:"⏳",type:"urgent",text:"13 Days Left To Submit Your Application!"},{icon:"📋",type:"action",text:"Complete Your I-821 Form — 3 Fields Remaining"},{icon:"📄",type:"warning",text:"Upload Your Passport Photo Before Deadline"},{icon:"✅",type:"success",text:"Payment Received — Your Forms Are Being Processed"},{icon:"📊",type:"info",text:"USCIS Processing Time: ~6 Months For Your Case"}],
  ru:[{icon:"⏳",type:"urgent",text:"Осталось 13 Дней Чтобы Подать Заявку!"},{icon:"📋",type:"action",text:"Заполните Форму I-821 — Осталось 3 Поля"},{icon:"📄",type:"warning",text:"Загрузите Фото Паспорта До Дедлайна"},{icon:"✅",type:"success",text:"Оплата Получена — Ваши Формы Обрабатываются"},{icon:"📊",type:"info",text:"Время Обработки USCIS: ~6 Месяцев"}],
  es:[{icon:"⏳",type:"urgent",text:"¡Quedan 13 Días Para Enviar Su Solicitud!"},{icon:"📋",type:"action",text:"Complete Su Formulario I-821 — Faltan 3 Campos"},{icon:"📄",type:"warning",text:"Suba Su Foto De Pasaporte Antes Del Plazo"},{icon:"✅",type:"success",text:"Pago Recibido — Sus Formularios Se Están Procesando"},{icon:"📊",type:"info",text:"Tiempo De Procesamiento USCIS: ~6 Meses"}],
  fr:[{icon:"⏳",type:"urgent",text:"13 Jours Restants Pour Soumettre Votre Demande!"},{icon:"📋",type:"action",text:"Complétez Votre Formulaire I-821 — 3 Champs Restants"},{icon:"📄",type:"warning",text:"Téléchargez Votre Photo Avant La Date Limite"},{icon:"✅",type:"success",text:"Paiement Reçu — Vos Formulaires Sont En Traitement"},{icon:"📊",type:"info",text:"Délai De Traitement USCIS: ~6 Mois"}],
  pt:[{icon:"⏳",type:"urgent",text:"13 Dias Restantes Para Enviar Sua Solicitação!"},{icon:"📋",type:"action",text:"Complete Seu Formulário I-821 — 3 Campos Restantes"},{icon:"📄",type:"warning",text:"Envie Sua Foto Do Passaporte Antes Do Prazo"},{icon:"✅",type:"success",text:"Pagamento Recebido — Formulários Em Processamento"},{icon:"📊",type:"info",text:"Tempo De Processamento USCIS: ~6 Meses"}],
  ht:[{icon:"⏳",type:"urgent",text:"13 Jou Rete Pou Soumèt Aplikasyon Ou!"},{icon:"📋",type:"action",text:"Fini Fòm I-821 Ou — 3 Chan Ki Rete"},{icon:"📄",type:"warning",text:"Telechaje Foto Paspò Ou Anvan Dènye Dat"},{icon:"✅",type:"success",text:"Peman Resevwa — Fòm Ou Ap Trete"},{icon:"📊",type:"info",text:"Tan Tretman USCIS: ~6 Mwa"}],
  ar:[{icon:"⏳",type:"urgent",text:"باقي 13 يوماً لتقديم طلبك!"},{icon:"📋",type:"action",text:"أكمل نموذج I-821 — بقي 3 حقول"},{icon:"📄",type:"warning",text:"ارفع صورة جواز السفر قبل الموعد"},{icon:"✅",type:"success",text:"تم استلام الدفعة — جاري معالجة نماذجك"},{icon:"📊",type:"info",text:"وقت معالجة USCIS: ~6 أشهر"}],
  so:[{icon:"⏳",type:"urgent",text:"13 Maalmood Ayaa Ku Hadhay!"},{icon:"📋",type:"action",text:"Dhamaystir Foomka I-821 — 3 Goob Hadhay"},{icon:"📄",type:"warning",text:"Soo Geli Sawirka Baasaaboorka"},{icon:"✅",type:"success",text:"Lacag La Helay — Foomamka La Habeynayaa"},{icon:"📊",type:"info",text:"Wakhtiga USCIS: ~6 Bilood"}],
  ne:[{icon:"⏳",type:"urgent",text:"आवेदन पेश गर्न 13 दिन बाँकी!"},{icon:"📋",type:"action",text:"I-821 फार्म पूरा गर्नुहोस् — 3 फिल्ड बाँकी"},{icon:"📄",type:"warning",text:"म्याद अघि पासपोर्ट फोटो अपलोड गर्नुहोस्"},{icon:"✅",type:"success",text:"भुक्तानी प्राप्त — फार्म प्रशोधन हुँदैछ"},{icon:"📊",type:"info",text:"USCIS प्रशोधन समय: ~6 महिना"}],
  my:[{icon:"⏳",type:"urgent",text:"လျှောက်လွှာတင်ရန် 13 ရက်ကျန်!"},{icon:"📋",type:"action",text:"I-821 ဖောင်ဖြည့်ပါ — 3 ကွက်လပ်ကျန်"},{icon:"📄",type:"warning",text:"ပတ်စ်ပို့ဓာတ်ပုံ တင်ပါ"},{icon:"✅",type:"success",text:"ငွေလက်ခံရပြီ — ဖောင်များ စီစစ်နေသည်"},{icon:"📊",type:"info",text:"USCIS စီစစ်ချိန်: ~6 လ"}],
};

const HIGHLIGHTS = {
  en:"Save Up To $4,750 On Legal Fees|Your Information Is 100% Secure & Protected|Available In 10 Languages For Your Convenience|We Complete All 15 Immigration Forms For You|We Navigate One Of Life's Most Stressful Processes — And Save You Real Money",
  es:"Ahorre Hasta $4,750 En Honorarios Legales|Su Información Está 100% Segura Y Protegida|Disponible En 10 Idiomas Para Su Conveniencia|Completamos Los 15 Formularios De Inmigración Por Usted|Navegamos Uno De Los Procesos Más Estresantes — Y Le Ahorramos Dinero Real",
  ru:"Экономия До $4,750 На Юридических Расходах|Ваша Информация 100% Защищена|Доступно На 10 Языках Для Вашего Удобства|Мы Заполняем Все 15 Иммиграционных Форм За Вас|Мы Проведём Вас Через Один Из Самых Сложных Процессов — И Сэкономим Реальные Деньги",
  fr:"Économisez Jusqu'à $4,750 En Frais Juridiques|Vos Informations Sont 100% Sécurisées|Disponible En 10 Langues Pour Votre Confort|Nous Remplissons Les 15 Formulaires Pour Vous|Nous Gérons L'Un Des Processus Les Plus Stressants — Et Vous Économisez",
  pt:"Economize Até $4,750 Em Taxas Legais|Suas Informações São 100% Seguras|Disponível Em 10 Idiomas Para Sua Conveniência|Completamos Todos Os 15 Formulários Para Você|Navegamos Um Dos Processos Mais Estressantes — E Economizamos Seu Dinheiro",
  ht:"Ekonomize Jiska $4,750 Sou Frè Legal|Enfòmasyon Ou 100% Sekirize|Disponib Nan 10 Lang Pou Konfò Ou|Nou Ranpli Tout 15 Fòm Imigrasyon Pou Ou|Nou Gide Ou Nan Youn Nan Pwosesis Ki Pi Difisil — Epi Ekonomize Lajan",
  ar:"وفر حتى $4,750 رسوم قانونية|معلوماتك آمنة 100%|متوفر بـ 10 لغات لراحتك|نملأ جميع 15 نموذج هجرة لك|نرشدك خلال أصعب العمليات — ونوفر لك أموالاً حقيقية",
  so:"Kaydi Ilaa $4,750 Kharashka Sharciga|Macluumaadkaagu Waa 100% Ammaan|10 Luqadood Oo Kuu Diyaar Ah|Waxaan Buuxinaa Dhammaan 15 Foom|Waxaan Ku Hagaynaa Habka Ugu Adag — Waxaana Kaydineynaa Lacag",
  ne:"$4,750 सम्म कानूनी शुल्क बचत|तपाईंको जानकारी 100% सुरक्षित|10 भाषामा उपलब्ध|हामी 15 फार्म भर्छौं|जीवनको कठिन प्रक्रियामा मार्गदर्शन — र वास्तविक बचत",
  my:"ဥပဒေကြေး $4,750 အထိ သက်သာ|သင့်အချက်အလက် 100% လုံခြုံ|ဘာသာ 10 ခုဖြင့်ရရှိနိုင်|ဖောင် 15 ခုလုံး ဖြည့်ပေးသည်|အခက်ခဲဆုံးလုပ်ငန်းစဉ်ကို ကူညီပြီး ငွေသက်သာစေသည်",
};

const ONBOARD_TITLE = {
  en:"Your Immigration Journey Made Simple",es:"Su Viaje De Inmigración Simplificado",ru:"ИммиГид — ваш надёжный помощник в иммиграции",fr:"Votre Parcours D'Immigration Simplifié",pt:"Sua Jornada De Imigração Simplificada",ht:"Vwayaj Imigrasyon Ou Vin Senp",ar:"رحلة الهجرة أصبحت بسيطة",so:"Safarka Socdaalka Oo La Fududeeyay",ne:"तपाईंको आप्रवासन यात्रा सरल",my:"သင့်လူဝင်မှုခရတ် လွယ်ကူလွယ်",
};

const ONBOARD_STEPS = [
  {i:"📋",en:"Choose Your Form — Our app guides you through all 15 immigration forms, completed by our specialists on your behalf",es:"Elija Su Formulario — Nuestra app lo guía a través de los 15 formularios de inmigración, completados por nuestros especialistas",ru:"Выберите Форму — Наше приложение проведёт вас через все 15 иммиграционных форм, заполненных нашими специалистами",fr:"Choisissez Votre Formulaire — Notre app vous guide à travers les 15 formulaires, remplis par nos spécialistes",pt:"Escolha Seu Formulário — Nosso app guia você pelos 15 formulários, preenchidos por nossos especialistas",ht:"Chwazi Fòm Ou — App nou a gide ou atravè 15 fòm imigrasyon, ranpli pa espesyalis nou yo",ar:"اختر النموذج — تطبيقنا يرشدك خلال 15 نموذج هجرة يملأها متخصصونا",so:"Dooro Foomkaaga — App-keenu wuxuu ku hagayaa 15 foom oo ay buuxiyaan khubarada",ne:"फार्म छान्नुहोस् — हाम्रो एपले 15 फार्ममा मार्गदर्शन गर्छ, हाम्रा विशेषज्ञहरूले भर्छन्",my:"ဖောင်ရွေးပါ — ကျွန်ုပ်တို့ အက်ပ်က ဖောင် 15 ခုလုံးကို ကျွမ်းကျင်သူများက ဖြည့်ပေးသည်"},
  {i:"✍️",en:"Fill Out Your Application — Answer in YOUR language",es:"Complete Su Solicitud — En SU idioma",ru:"Заполните Заявку — На ВАШЕМ языке",fr:"Remplissez Votre Demande — Dans VOTRE langue",pt:"Preencha — No SEU idioma",ht:"Ranpli Aplikasyon — Nan LANG ou",ar:"املأ طلبك — بلغتك",so:"Buuxi Codsigaaga — Luqadaada",ne:"आवेदन भर्नुहोस् — आफ्नै भाषामा",my:"လျှောက်လွှာ ဖြည့်ပါ — သင့်ဘာသာဖြင့်"},
  {i:"📷",en:"Upload Documents — Photos from your phone",es:"Suba Documentos — Fotos desde su teléfono",ru:"Загрузите Документы — Фото с телефона",fr:"Téléchargez Documents — Depuis votre téléphone",pt:"Envie Documentos — Fotos do celular",ht:"Telechaje Dokiman — Foto nan telefòn",ar:"ارفع المستندات — صور من هاتفك",so:"Soo Geli — Sawirro taleefankaaga",ne:"कागजात अपलोड — फोनबाट फोटो",my:"စာရွက်တင်ပါ — ဖုန်းမှ ဓာတ်ပုံ"},
  {i:"💳",en:"Review & Pay — Check forms and pay securely",es:"Revise Y Pague — Verifique y pague seguro",ru:"Проверьте И Оплатите — Безопасно",fr:"Vérifiez Et Payez — En toute sécurité",pt:"Revise E Pague — Com segurança",ht:"Revize Epi Peye — An sekirite",ar:"راجع وادفع — بأمان",so:"Dib U Eeg Oo Bixi — Si ammaan ah",ne:"जाँच र तिर्नुहोस् — सुरक्षारूपमा",my:"စစ်ဆေးပြီး ငွေပေးပါ — လုံခြုံစွာ"},
  {i:"📦",en:"We Handle The Rest — Printed forms, cover letter, checklist",es:"Nosotros Nos Encargamos — Formularios, carta, lista",ru:"Мы Сделаем Остальное — Формы, письмо, чеклист",fr:"Nous Gérons Le Reste — Formulaires, lettre, checklist",pt:"Nós Cuidamos — Formulários, carta, checklist",ht:"Nou Jere Rès La — Fòm, lèt, lis",ar:"نحن نتولى الباقي — نماذج، خطاب، قائمة",so:"Annagaa Xalina — Foomam, warqad, liis",ne:"हामी सम्हाल्छौं — फार्म, पत्र, चेकलिस्ट",my:"ကျန်တို့ဆောင်ရွက်ပေးမည်"},
  {i:"📊",en:"Track Your Status — Real-time updates",es:"Rastree Su Estado — Tiempo real",ru:"Отслеживайте Статус — В реальном времени",fr:"Suivez Votre Statut — Temps réel",pt:"Acompanhe — Tempo real",ht:"Swiv Estati Ou — Tan reyel",ar:"تتبع حالتك — تحديثات فورية",so:"Raadraac Xaaladaada — Waqti-dhabta",ne:"स्थिति ट्र्याक — रियल-टाइम",my:"အခြေအနေ ခြေရာခံပါ"},
];

const DISC = {
  en:"Self-Service Form-Filing Tool Only. We Are Not A Law Firm And Do Not Provide Any Legal Advice. For Legal Advice, Consult An Immigration Attorney If Needed.",
  es:"Herramienta De Autoservicio. No Somos Un Bufete De Abogados. (Self-Service Tool Only. Not A Law Firm.)",
  ru:"Инструмент Самостоятельного Заполнения Форм. Мы Не Юридическая Фирма. (Self-Service Tool Only. Not A Law Firm.)",
  fr:"Outil En Libre-Service. Nous Ne Sommes Pas Un Cabinet D'Avocats. (Self-Service Tool Only.)",
  pt:"Ferramenta De Autoatendimento. Não Somos Escritório De Advocacia. (Self-Service Tool Only.)",
  ht:"Zouti Otomatik Sèlman. Nou Pa Kabinè Avoka. (Self-Service Tool Only.)",
  ar:"أداة ملء النماذج ذاتية فقط. لسنا مكتب محاماة. (Self-Service Tool Only.)",
  so:"Qalab Is-Buuxinta Kaliya. Ma Nihin Xafiis Qareen. (Self-Service Tool Only.)",
  ne:"स्वयं-सेवा उपकरण मात्र। हामी कानून फर्म होइनौं। (Self-Service Tool Only.)",
  my:"ကိုယ်တိုင်ပြုလုပ်ရန် ကိရိယာသာ ဖြစ်သည်။ (Self-Service Tool Only.)",
};

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  5. STYLE CONSTANTS                                                      ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

const S = {
  page: { minHeight:"100vh", color:"#fff", fontFamily:"system-ui,sans-serif", maxWidth:480, margin:"0 auto", padding:"0 16px 80px", position:"relative", zIndex:2 },
  btn:  { background:"linear-gradient(135deg,#6366f1,#818cf8)", color:"#fff", border:"none", borderRadius:12, padding:"12px 24px", fontSize:16, fontWeight:600, cursor:"pointer", width:"100%", marginTop:8, boxShadow:"0 4px 20px rgba(99,102,241,.3)" },
  btnO: { background:"rgba(99,102,241,.12)", color:"#fff", border:"1.5px solid rgba(99,102,241,.5)", borderRadius:12, padding:"10px 20px", fontSize:14, fontWeight:600, cursor:"pointer" },
  crd:  { background:"rgba(255,255,255,.07)", borderRadius:16, padding:16, marginBottom:12, border:"1px solid rgba(147,197,253,.15)", cursor:"pointer" },
  inp:  { width:"100%", padding:"12px 16px", borderRadius:10, border:"1px solid rgba(147,197,253,.15)", background:"rgba(15,22,50,.6)", color:"#fff", fontSize:15, boxSizing:"border-box", marginTop:4 },
  t2:"rgba(255,255,255,.7)", pri:"#6366f1", acc:"#06b6d4", ok:"#34d399", err:"#f87171", wrn:"#fbbf24", bdr:"rgba(147,197,253,.15)",
};

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  6. CONTEXT                                                               ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

const AppCtx = createContext(null);

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  7. SHARED UI COMPONENTS                                                  ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

/* ── Stars background ── */
const starData = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  l: Math.random() * 100,
  tp: Math.random() * 100,
  sz: 1 + Math.random() * 2.5,
  d: 1.5 + Math.random() * 3,
  dl: Math.random() * 3,
  op: .3 + Math.random() * .7,
}));

function Stars() {
  return <>{starData.map(s => (
    <div key={s.id} className="is" style={{ left:s.l+"%", top:s.tp+"%", width:s.sz, height:s.sz, animationDuration:s.d+"s", animationDelay:s.dl+"s", opacity:s.op }} />
  ))}</>;
}

/* ── Input (local state, commits onBlur) ── */
function SafeInput({ type, val, onCommit, ph }) {
  const [loc, setLoc] = useState(val);
  useEffect(() => { setLoc(val); }, [val]);
  const tp = type === "tel" ? "tel" : type === "date" ? "date" : type === "email" ? "email" : "text";
  return (
    <input type={tp} value={loc} onChange={e => setLoc(e.target.value)} onBlur={() => onCommit(loc)} placeholder={ph} style={S.inp} autoComplete="off" />
  );
}

/* ── Button ── */
function Btn({ disabled, onClick, outline, color, style, children }) {
  return (
    <button disabled={disabled} onClick={onClick} style={{
      ...(outline ? S.btnO : S.btn),
      opacity: disabled ? .5 : 1,
      ...(color ? { background: color } : {}),
      ...(style || {}),
    }}>{children}</button>
  );
}

/* ── Progress Bar ── */
function PB({ pct }) {
  return (
    <div style={{ height:6, borderRadius:3, background:S.bdr, overflow:"hidden", marginBottom:12 }}>
      <div style={{ width:pct+"%", height:"100%", background:S.pri, borderRadius:3, transition:"width .3s" }} />
    </div>
  );
}

/* ── SVG icons ── */
const GoogleSvg = () => <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#34A853" d="M10.53 28.59A14.5 14.5 0 019.5 24c0-1.59.28-3.14.77-4.59l-7.98-6.19A23.99 23.99 0 000 24c0 3.77.87 7.34 2.44 10.52l8.09-5.93z"/><path fill="#FBBC05" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-8.09 5.93C6.51 42.62 14.62 48 24 48z"/></svg>;
const AppleSvg = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>;

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  8. LANGUAGE DROPDOWN                                                     ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function LangDropdown({ compact }) {
  const { lang, setLang } = useContext(AppCtx);
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const isRTL = lang === "ar" || lang === "fa" || lang === "he";
  const cur = LANGS.find(x => x.code === lang);

  const enter = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true); };
  const leave = () => { closeTimer.current = setTimeout(() => setOpen(false), 200); };

  const btnStyle = compact
    ? { background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.2)", borderRadius:10, padding:"4px 10px", fontSize:18, cursor:"pointer", color:"#fff" }
    : { background:"rgba(255,255,255,.08)", border:"1px solid rgba(147,197,253,.2)", borderRadius:10, padding:"5px 12px", fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", gap:6, color:"#fff", fontWeight:600 };

  return (
    <div style={{ position:"relative" }} onMouseEnter={enter} onMouseLeave={leave}>
      <button style={btnStyle}>
        {compact ? <>{cur?.flag} ▾</> : <>{cur?.flag} {cur?.name} ▾</>}
      </button>
      {open && (
        <div style={{ position:"absolute", right:isRTL?"auto":0, left:isRTL?0:"auto", top:32, background:"rgba(12,20,69,.95)", border:"1px solid rgba(147,197,253,.2)", borderRadius:12, padding:8, zIndex:999, minWidth:200, boxShadow:"0 8px 32px rgba(0,0,0,.4)" }}>
          {LANGS.map(x => (
            <div key={x.code} onMouseEnter={() => setLang(x.code)} style={{
              padding:"9px 14px", borderRadius:8, cursor:"pointer", display:"flex", gap:10, alignItems:"center",
              background: lang === x.code ? "rgba(99,102,241,.2)" : "transparent",
              fontWeight: lang === x.code ? 700 : 400, color:"#fff",
            }}>
              <span style={{ fontSize:18 }}>{x.flag}</span>
              <span>{x.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  9. NAV BAR & FOOTER                                                     ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function Nav({ title, backTo }) {
  const { lang, go } = useContext(AppCtx);
  const isRTL = lang === "ar" || lang === "fa" || lang === "he";
  return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{ marginBottom:16, position:"sticky", top:0, zIndex:100 }}>
      <div style={{ position:"relative", overflow:"hidden", background:"linear-gradient(135deg,#0c1445,#1a237e,#0d47a1,#0c1445)", marginLeft:-16, marginRight:-16, padding:"14px 16px 12px", boxShadow:"0 4px 20px rgba(12,20,69,.5)" }}>
        <Stars />
        <div style={{ position:"relative", zIndex:2, display:"flex", alignItems:"center", justifyContent:"space-between", maxWidth:480, margin:"0 auto" }}>
          {backTo
            ? <button onClick={() => go(backTo)} style={{ background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.2)", borderRadius:10, padding:"5px 12px", fontSize:13, color:"#fff", cursor:"pointer", fontWeight:600 }}>{"← " + t(lang, "back")}</button>
            : <div style={{ width:40 }} />
          }
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span className="il" style={{ fontSize:32 }}>🗽</span>
            <span className="it">{title || t(lang, "appName")}</span>
          </div>
          <LangDropdown compact />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const { lang } = useContext(AppCtx);
  return (
    <div style={{ borderTop:"1px solid rgba(255,255,255,.25)", marginTop:24, paddingTop:12, paddingBottom:20, textAlign:"center" }}>
      <p style={{ fontSize:11, color:"#fff", lineHeight:1.6, margin:0, padding:"0 8px", fontWeight:500 }}>{DISC[lang] || DISC.en}</p>
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  10. BILLBOARD & MARQUEE                                                  ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function Billboard() {
  const { lang } = useContext(AppCtx);
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);
  const notifs = NOTIF[lang] || NOTIF.en;
  const notifsRef = useRef(notifs);

  useEffect(() => { notifsRef.current = notifs; }, [notifs]);
  useEffect(() => { setIdx(0); }, [lang]);
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIdx(p => (p + 1) % notifsRef.current.length), 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [notifs.length]);

  const jumpTo = (i) => {
    setIdx(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIdx(p => (p + 1) % notifsRef.current.length), 4000);
  };

  const n = notifs[idx % notifs.length];
  if (!n) return null;
  const clr = NOTIF_COLORS[n.type] || "#fff";

  return (
    <div style={{ background:"rgba(0,0,0,.3)", border:"2px solid "+clr+"66", borderRadius:14, padding:"18px 16px", marginBottom:16, textAlign:"center", transition:"border-color .5s", minHeight:90, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      <div style={{ fontSize:36, marginBottom:6 }}>{n.icon}</div>
      <div style={{ fontSize:18, fontWeight:800, color:clr, lineHeight:1.4, letterSpacing:.5 }}>{n.text}</div>
      <div style={{ display:"flex", gap:6, marginTop:10, justifyContent:"center" }}>
        {notifs.map((_, i) => (
          <div key={i} onClick={() => jumpTo(i)} style={{ width:i===idx?20:8, height:8, borderRadius:4, background:i===idx?clr:"rgba(255,255,255,.25)", cursor:"pointer", transition:"all .3s" }} />
        ))}
      </div>
    </div>
  );
}

function Marquee() {
  const { lang } = useContext(AppCtx);
  const items = (HIGHLIGHTS[lang] || HIGHLIGHTS.en).split("|");

  const buildBlock = (prefix) => {
    const out = [];
    items.forEach((x, i) => {
      if (i > 0) out.push(<span key={prefix+"s"+i}>{"\u00A0\u00A0\u00A0⭐\u00A0\u00A0\u00A0"}</span>);
      const txt = x.trim().split(/(\d[\d,.$]*)/g).map((seg, j) =>
        /\d/.test(seg) ? <span key={j} style={{ fontSize:19, fontWeight:900 }}>{seg}</span> : seg
      );
      out.push(<span key={prefix+"t"+i}>{txt}</span>);
    });
    out.push(<span key={prefix+"end"}>{"\u00A0\u00A0\u00A0⭐\u00A0\u00A0\u00A0"}</span>);
    return out;
  };

  const ts = { fontSize:16, fontWeight:800, whiteSpace:"nowrap", letterSpacing:1, display:"inline-block", color:"#FFD700", textShadow:"0 0 8px rgba(255,215,0,.5), 0 0 20px rgba(255,215,0,.25)" };

  return (
    <div key={lang} style={{ background:"rgba(34,197,94,.12)", border:"1px solid rgba(34,197,94,.3)", borderRadius:12, padding:"14px 0", marginTop:8, marginLeft:-4, marginRight:-4, overflow:"hidden" }}>
      <div className="mq-wrap">
        <div className="mq-track">
          <span style={ts}>{buildBlock("a")}</span>
          <span style={ts}>{buildBlock("b")}</span>
        </div>
      </div>
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  11. PAGE: ONBOARD                                                        ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PageOnboard() {
  const { lang, go } = useContext(AppCtx);
  const isRTL = lang === "ar" || lang === "fa" || lang === "he";
  const isEn = lang === "en";
  const title = ONBOARD_TITLE[lang] || ONBOARD_TITLE.en;

  return (
    <div style={{ ...S.page, paddingTop:0, textAlign:"center", display:"flex", flexDirection:"column" }} dir={isRTL?"rtl":"ltr"}>
      {/* Header */}
      <div style={{ position:"relative", overflow:"hidden", marginLeft:-16, marginRight:-16, background:"linear-gradient(135deg,#0c1445,#1a237e,#0d47a1,#0c1445)", padding:"12px 20px 24px" }}>
        <Stars />
        <div style={{ position:"relative", zIndex:2 }}>
          <span className="il" style={{ fontSize:72, marginTop:-8 }}>🗽</span>
          <h1 className="it" style={{ fontSize:30, marginTop:10 }}>{t(lang, "appName")}</h1>
          <p style={{ color:"#fff", fontSize:18, marginTop:6, fontWeight:900, marginBottom:4 }}>{title}</p>
          {!isEn && <div style={{ fontSize:13, color:"rgba(255,255,255,.65)", fontWeight:600, fontStyle:"italic" }}>{ONBOARD_TITLE.en}</div>}
        </div>
      </div>

      {/* Steps */}
      <div style={{ padding:"20px 4px 0", textAlign:"left", display:"flex", flexDirection:"column", flex:1 }}>
        {ONBOARD_STEPS.map((st, idx) => (
          <div key={idx} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:16 }}>
            <div style={{ width:40, height:40, borderRadius:12, background:"rgba(99,102,241,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0, marginTop:14 }}>{st.i}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, color:"rgba(255,255,255,.55)", fontWeight:700, marginBottom:2, letterSpacing:.5 }}>{(T.step[lang] || "STEP") + " " + (idx + 1)}</div>
              <div style={{ fontSize:15, color:"#fff", lineHeight:1.5, fontWeight:700 }}>{st[lang] || st.en}</div>
              {!isEn && <div style={{ fontSize:10.5, color:"#fff", lineHeight:1.4, marginTop:2, fontWeight:400, fontStyle:"italic" }}>({st.en})</div>}
            </div>
          </div>
        ))}
        <Marquee key={lang} />
        <div style={{ flex:1 }} />
        <Btn onClick={() => go("auth")} style={{ marginTop:16 }}>{t(lang, "getStarted") + " →"}</Btn>
      </div>
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  12. PAGE: AUTH                                                           ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PageAuth() {
  const { lang, go, setUser, setLoggedIn } = useContext(AppCtx);
  const [aEmail, setAEmail] = useState("");
  const [aPass, setAPass] = useState("");
  const isRTL = lang === "ar" || lang === "fa" || lang === "he";

  const login = (name, email) => { setUser({ name, email }); setLoggedIn(true); go("dashboard"); };

  return (
    <div style={{ ...S.page, paddingTop:0, display:"flex", flexDirection:"column", minHeight:"calc(100vh - 80px)" }} dir={isRTL?"rtl":"ltr"}>
      <Nav title={t(lang, "login")} backTo="onboard" />
      <div style={{ marginBottom:12 }}>
        <label style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{bt(lang, "email")}</label>
        <input type="email" value={aEmail} onChange={e => setAEmail(e.target.value)} style={S.inp} />
      </div>
      <div style={{ marginBottom:12 }}>
        <label style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{bt(lang, "password")}</label>
        <input type="password" value={aPass} onChange={e => setAPass(e.target.value)} style={S.inp} />
      </div>
      <div style={{ flex:1, minHeight:48 }} />
      <Btn onClick={() => { if (aEmail && aPass) login("User", aEmail); }}>{t(lang, "login")}</Btn>
      <div style={{ display:"flex", alignItems:"center", gap:12, margin:"20px 0" }}>
        <div style={{ flex:1, height:1, background:"rgba(255,255,255,.2)" }} />
        <span style={{ fontSize:13, color:"rgba(255,255,255,.5)", fontWeight:600 }}>{t(lang, "or")}</span>
        <div style={{ flex:1, height:1, background:"rgba(255,255,255,.2)" }} />
      </div>
      <button onClick={() => login("Google User", "user@gmail.com")} style={{ ...S.btn, background:"#fff", color:"#333", display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}><GoogleSvg /> {t(lang, "continueGoogle")}</button>
      <button onClick={() => login("Apple User", "user@icloud.com")} style={{ ...S.btn, background:"#000", display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginTop:20 }}><AppleSvg /> {t(lang, "continueApple")}</button>
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  13. PAGE: DASHBOARD                                                      ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PageDashboard() {
  const { lang, go, user } = useContext(AppCtx);
  const acts = [
    { i:"📋", l:"startNew",     p:"formSelect" },
    { i:"🧙", l:"formWizard",   p:"wizard" },
    { i:"🎓", l:"civicsTest",   p:"civics" },
    { i:"📊", l:"tracking",     p:"tracking" },
    { i:"📚", l:"knowledgeBase",p:"knowledge" },
    { i:"👤", l:"profile",      p:"profile" },
  ];

  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title={t(lang, "dashboard")} backTo="onboard" />
      <h2 style={{ fontSize:20, marginBottom:4 }}>{t(lang, "welcome")}, {user.name}!</h2>
      <p style={{ color:S.t2, marginBottom:16 }}>{bt(lang, "myForms")}</p>
      <Billboard />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
        {acts.map(a => (
          <div key={a.l} onClick={() => go(a.p)} style={{ ...S.crd, textAlign:"center", padding:14 }}>
            <div style={{ fontSize:28 }}>{a.i}</div>
            <div style={{ fontSize:11, fontWeight:600, marginTop:4 }}>{t(lang, a.l)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  14. PAGE: WIZARD                                                         ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PageWizard() {
  const { lang, go, setSelForm } = useContext(AppCtx);
  const goals = [
    { k:"goalTPS",f:"i821" },{ k:"goalDACA",f:"daca" },{ k:"goalEAD",f:"i765" },{ k:"goalFamily",f:"i130" },
    { k:"goalCitizen",f:"n400" },{ k:"goalGreen",f:"i485" },{ k:"goalTravel",f:"i131" },{ k:"goalAsylum",f:"i589" },
  ];
  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title={t(lang, "formWizard")} backTo="dashboard" />
      {goals.map(g => (
        <div key={g.k} onClick={() => { setSelForm(FORMS.find(f => f.id === g.f)); go("formDetail"); }} style={{ ...S.crd, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontWeight:600 }}>{bt(lang, g.k)}</span>
          <span style={{ color:S.pri }}>→</span>
        </div>
      ))}
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  15. PAGE: FORM SELECT                                                    ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PageFormSelect() {
  const { lang, go, setSelForm } = useContext(AppCtx);
  const tiers = [
    { k:"simple",  forms:FORMS.filter(f => f.tier === "simple"),  c:S.ok },
    { k:"medium",  forms:FORMS.filter(f => f.tier === "medium"),  c:S.wrn },
    { k:"complex", forms:FORMS.filter(f => f.tier === "complex"), c:S.err },
  ];
  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title={t(lang, "selectForm")} backTo="dashboard" />
      {tiers.map(tier => (
        <div key={tier.k}>
          <div style={{ display:"inline-block", padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:600, background:tier.c+"22", color:tier.c, marginBottom:8, marginTop:12 }}>{t(lang, tier.k)}</div>
          {tier.forms.map(f => (
            <div key={f.id} onClick={() => { setSelForm(f); go("formDetail"); }} style={{ ...S.crd, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontWeight:700 }}>{f.name}</div>
                <div style={{ fontSize:13, color:S.t2 }}>{bt(lang, f.desc)}</div>
              </div>
              <div style={{ fontWeight:700, color:S.pri }}>{"$"+f.fee}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  16. PAGE: FORM DETAIL                                                    ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PageFormDetail() {
  const { lang, go, selForm, setFSec, setPkg } = useContext(AppCtx);
  if (!selForm) return <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}><Nav title="" backTo="dashboard" /></div>;
  const f = selForm;
  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title={f.name} backTo="formSelect" />
      <div style={{ ...S.crd, textAlign:"center", padding:24 }}>
        <h2>{f.name}</h2>
        <p style={{ color:S.t2 }}>{bt(lang, f.desc)}</p>
        <div style={{ display:"flex", justifyContent:"center", gap:24, margin:"16px 0" }}>
          <div><div style={{ fontWeight:700, fontSize:24 }}>{"$"+f.fee}</div><div style={{ fontSize:12, color:S.t2 }}>{t(lang, "serviceFee")}</div></div>
          <div><div style={{ fontWeight:700, fontSize:24 }}>{"$"+f.uscis}</div><div style={{ fontSize:12, color:S.t2 }}>{t(lang, "uscisFee")}</div></div>
        </div>
        <div style={{ fontSize:13, color:S.t2, marginBottom:8 }}>{f.sections+" "+t(lang,"sections")+" · "+f.fieldCount+" "+t(lang,"fields")+" · "+f.time+" "+t(lang,"months")}</div>
        <Btn onClick={() => { setFSec(0); setPkg(null); go("formFill"); }}>{t(lang, "startForm")}</Btn>
      </div>
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  17. PAGE: FORM FILL                                                      ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PageFormFill() {
  const { lang, go, selForm, fd, setFd, fSec, setFSec, errs, setErrs } = useContext(AppCtx);
  if (!selForm) return <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}><Nav title="" backTo="dashboard" /></div>;

  const f = selForm;
  const sectionFields = f.fields.filter(x => x.s === fSec);
  const totalSections = f.sections;
  const pct = ((fSec + 1) / totalSections) * 100;

  const validate = () => {
    const e = {};
    sectionFields.forEach(fl => {
      if (OPTIONAL_FIELDS.includes(fl.k)) return;
      const v = fd[f.id + "_" + fl.k];
      if (!v || !v.trim()) e[fl.k] = "required";
      else if (fl.t === "email" && !v.includes("@")) e[fl.k] = "invalidEmail";
      else if (fl.t === "tel" && v.replace(/\D/g, "").length < 7) e[fl.k] = "invalidPhone";
    });
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const renderField = (fl) => {
    const fk = f.id + "_" + fl.k;
    const isOptional = OPTIONAL_FIELDS.includes(fl.k);
    const isDropdown = fl.t === "select" || fl.t === "country" || fl.t === "tps";
    const options = fl.t === "country" ? COUNTRIES : fl.t === "tps" ? TPS_COUNTRIES : fl.opts;
    const isPlain = fl.t === "country" || fl.t === "tps";

    return (
      <div key={fl.k} style={{ marginBottom:12 }}>
        <label style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{bt(lang, fl.k)}{isOptional ? " (optional)" : ""}</label>
        {isDropdown ? (
          <select value={fd[fk] || ""} onChange={e => setFd(p => ({ ...p, [fk]:e.target.value }))} style={S.inp}>
            <option value="">—</option>
            {options?.map(o => <option key={o} value={o}>{isPlain ? o : bt(lang, o)}</option>)}
          </select>
        ) : (
          <SafeInput type={fl.t} val={fd[fk] || ""} onCommit={v => setFd(p => ({ ...p, [fk]:v }))} ph={t(lang, fl.k)} />
        )}
        {errs[fl.k] && <div style={{ color:S.err, fontSize:12, marginTop:4 }}>{t(lang, errs[fl.k])}</div>}
      </div>
    );
  };

  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title={f.name + " " + (fSec+1) + "/" + totalSections} backTo="formDetail" />
      <PB pct={pct} />
      {sectionFields.map(renderField)}
      <div style={{ display:"flex", gap:12 }}>
        {fSec > 0 && <Btn outline onClick={() => setFSec(fSec - 1)} style={{ flex:1 }}>{t(lang, "back")}</Btn>}
        <Btn onClick={() => { if (!validate()) return; fSec < totalSections - 1 ? setFSec(fSec + 1) : go("docUpload"); }} style={{ flex:1 }}>
          {fSec < totalSections - 1 ? t(lang, "next") : t(lang, "continueForm")}
        </Btn>
      </div>
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  18. PAGE: DOCUMENT UPLOAD                                                ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PageDocUpload() {
  const { lang, go, ups, setUps } = useContext(AppCtx);
  const docs = [
    { k:"passport", i:"🛂", l:"passport" },
    { k:"birth",    i:"📜", l:"birthCert" },
    { k:"photo",    i:"📷", l:"photo" },
    { k:"support",  i:"📎", l:"supporting" },
  ];
  const camRefs  = { passport:useRef(), birth:useRef(), photo:useRef(), support:useRef() };
  const fileRefs = { passport:useRef(), birth:useRef(), photo:useRef(), support:useRef() };

  const handleFile = (k, e) => {
    if (e.target.files?.[0]) {
      if (ups[k]) URL.revokeObjectURL(ups[k]);
      setUps(p => ({ ...p, [k]: URL.createObjectURL(e.target.files[0]) }));
    }
  };
  const remove = (k) => {
    if (ups[k]) URL.revokeObjectURL(ups[k]);
    setUps(p => ({ ...p, [k]: null }));
  };

  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title={t(lang, "docUpload")} backTo="formFill" />
      {docs.map(d => (
        <div key={d.k} style={{ ...S.crd, padding:16 }}>
          <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12 }}>
            <span style={{ fontSize:28 }}>{d.i}</span>
            <span style={{ fontWeight:600, flex:1 }}>{bt(lang, d.l)}</span>
            {ups[d.k] && <span style={{ color:S.ok, fontSize:20 }}>✓</span>}
          </div>
          {ups[d.k] ? (
            <div style={{ textAlign:"center" }}>
              <img src={ups[d.k]} style={{ maxWidth:"100%", maxHeight:120, borderRadius:8, marginBottom:8 }} alt="" />
              <button onClick={() => remove(d.k)} style={{ ...S.btnO, padding:"6px 12px", fontSize:12, color:S.err }}>Remove</button>
            </div>
          ) : (
            <div style={{ display:"flex", gap:8 }}>
              <input ref={camRefs[d.k]} type="file" accept="image/*" capture="environment" style={{ display:"none" }} onChange={e => handleFile(d.k, e)} />
              <input ref={fileRefs[d.k]} type="file" accept="image/*,.pdf" style={{ display:"none" }} onChange={e => handleFile(d.k, e)} />
              <button onClick={() => camRefs[d.k].current?.click()} style={{ ...S.btn, flex:1, padding:"10px 8px", fontSize:13 }}>📷 Camera</button>
              <button onClick={() => fileRefs[d.k].current?.click()} style={{ ...S.btn, flex:1, padding:"10px 8px", fontSize:13, background:S.acc }}>📁 Upload</button>
            </div>
          )}
        </div>
      ))}
      <Btn onClick={() => go("packageSelect")}>{t(lang, "continueForm")}</Btn>
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  19. PAGE: PACKAGE SELECT                                                 ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PagePackageSelect() {
  const { lang, go, selForm, pkg, setPkg } = useContext(AppCtx);
  if (!selForm) return <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}><Nav title="" backTo="dashboard" /></div>;

  const options = [
    { k:"pdf",       i:"📄", label:"Digital PDF Download",          pr:0,  desc:"Download and print yourself" },
    { k:"printShip", i:"🖨️", label:"Print & Ship to You",           pr:15, desc:"We print and mail to your address" },
    { k:"fullSvc",   i:"📦", label:"Full Service (We Mail to USCIS)",pr:25, desc:"We prepare and mail everything" },
    { k:"express",   i:"⚡", label:"Express Delivery",              pr:50, desc:"Fastest option — express shipped" },
  ];

  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title="Delivery Option" backTo="docUpload" />
      <div style={{ ...S.crd, padding:12, marginBottom:16, textAlign:"center", background:"rgba(99,102,241,.12)" }}>
        <div style={{ fontSize:14, fontWeight:700 }}>{selForm.name}</div>
        <div style={{ fontSize:13, color:S.t2 }}>Service Fee: ${selForm.fee}</div>
      </div>
      {options.map(d => (
        <div key={d.k} onClick={() => setPkg(d.k)} style={{ ...S.crd, border: pkg===d.k ? "2px solid "+S.pri : "1px solid "+S.bdr, padding:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ display:"flex", gap:12, alignItems:"center", flex:1 }}>
              <span style={{ fontSize:24 }}>{d.i}</span>
              <div>
                <div style={{ fontWeight:700, fontSize:14 }}>{d.label}</div>
                <div style={{ fontSize:12, color:S.t2 }}>{d.desc}</div>
              </div>
            </div>
            <div style={{ fontWeight:700, fontSize:16, color:d.pr?S.pri:S.ok, flexShrink:0 }}>{d.pr ? "$"+d.pr : "FREE"}</div>
          </div>
        </div>
      ))}
      <Btn disabled={!pkg} onClick={() => go("preview")}>{t(lang, "continueForm")}</Btn>
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  20. PAGE: PREVIEW                                                        ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PagePreview() {
  const { lang, go, selForm, fd } = useContext(AppCtx);
  if (!selForm) return <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}><Nav title="" backTo="dashboard" /></div>;
  const f = selForm;

  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title={t(lang, "pdfPreview")} backTo="packageSelect" />
      <div style={{ ...S.crd, padding:24 }}>
        <h3 style={{ marginBottom:16 }}>{f.name + " — " + t(lang, "review")}</h3>
        {f.fields.map(fl => {
          const v = fd[f.id + "_" + fl.k];
          if (!v) return null;
          return (
            <div key={fl.k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid "+S.bdr }}>
              <span style={{ color:S.t2, fontSize:14 }}>{bt(lang, fl.k)}</span>
              <span style={{ fontWeight:600, fontSize:14 }}>{v}</span>
            </div>
          );
        })}
      </div>
      <div style={{ display:"flex", gap:12 }}>
        <Btn outline onClick={() => window.print()} style={{ flex:1 }}>{t(lang, "print")}</Btn>
        <Btn onClick={() => go("pay")} style={{ flex:1 }}>{t(lang, "continueForm")}</Btn>
      </div>
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  21. PAGE: PAY (price summary + promo)                                    ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PagePay() {
  const { lang, go, selForm, pkg, setPayTotal } = useContext(AppCtx);
  const [promo, setPromo] = useState("");
  const [promoOn, setPromoOn] = useState(false);

  if (!selForm) return <div style={S.page}><Nav title="" backTo="dashboard" /></div>;
  const f = selForm;
  const delPr = pkg==="printShip" ? 15 : pkg==="fullSvc" ? 25 : pkg==="express" ? 50 : 0;
  const delLabel = pkg==="printShip" ? "Print & Ship" : pkg==="fullSvc" ? "Full Service" : pkg==="express" ? "Express" : "Digital PDF";
  const sub = f.fee + delPr;
  const disc = promoOn ? sub * .1 : 0;
  const tot = sub - disc;

  useEffect(() => { setPayTotal(tot); }, [tot, setPayTotal]);

  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title={t(lang, "payment")} backTo="preview" />
      <div style={{ ...S.crd, padding:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}><span>{f.name + " — " + t(lang, "serviceFee")}</span><span style={{ fontWeight:700 }}>{"$" + f.fee}</span></div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}><span>{delLabel}</span><span style={{ fontWeight:700, color:delPr?S.pri:S.ok }}>{delPr ? "$"+delPr : "FREE"}</span></div>
        {disc > 0 && <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8, color:S.ok }}><span>WELCOME10</span><span style={{ fontWeight:700 }}>-${disc.toFixed(2)}</span></div>}
        <div style={{ display:"flex", justifyContent:"space-between", paddingTop:8, borderTop:"2px solid "+S.bdr, fontWeight:700, fontSize:18 }}><span>{t(lang, "total")}</span><span>${tot.toFixed(2)}</span></div>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        <input value={promo} onChange={e => setPromo(e.target.value)} placeholder={t(lang, "promoCode")} style={{ ...S.inp, flex:1 }} />
        <button onClick={() => { if (promo.toUpperCase() === "WELCOME10") setPromoOn(true); }} style={{ ...S.btn, width:"auto", padding:"10px 16px" }}>{t(lang, "apply")}</button>
      </div>
      <Btn onClick={() => go("paymentOptions")}>{t(lang, "payNow") + " — $" + tot.toFixed(2)}</Btn>
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  22. PAGE: PAYMENT OPTIONS                                                ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PagePaymentOptions() {
  const { lang, go, selForm, payTotal } = useContext(AppCtx);
  const [method, setMethod] = useState(null);
  const [cardNum, setCardNum] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const isRTL = lang === "ar" || lang === "fa" || lang === "he";

  if (!selForm) return <div style={S.page} dir={isRTL?"rtl":"ltr"}><Nav title="" backTo="dashboard" /></div>;
  const tot = (payTotal || 0).toFixed(2);

  const handleSubmit = () => { setSubmitting(true); setTimeout(() => { setSubmitting(false); setSuccess(true); }, 2000); };

  /* ── Success screen ── */
  if (success) {
    return (
      <div style={{ ...S.page, textAlign:"center", paddingTop:20 }} dir={isRTL?"rtl":"ltr"}>
        <Nav title={t(lang, "paymentOptions")} backTo="pay" />
        <div style={{ fontSize:72, marginBottom:12 }}>✅</div>
        <h2 style={{ fontSize:22, marginBottom:8, color:S.ok }}>{t(lang, "paymentSuccess")}</h2>
        <div style={{ ...S.crd, padding:20, textAlign:"center", cursor:"default" }}>
          <div style={{ fontSize:14, color:S.t2, marginBottom:4 }}>{t(lang, "total")}</div>
          <div style={{ fontSize:32, fontWeight:900, color:"#fff" }}>${tot}</div>
        </div>
        <Btn onClick={() => go("whatsNext")} style={{ marginTop:16 }}>{t(lang, "next") + " →"}</Btn>
      </div>
    );
  }

  /* ── Processing screen ── */
  if (submitting) {
    return (
      <div style={{ ...S.page, textAlign:"center", paddingTop:60 }} dir={isRTL?"rtl":"ltr"}>
        <Nav title={t(lang, "paymentOptions")} backTo="pay" />
        <div style={{ fontSize:60, marginBottom:16, animation:"gf 1.5s ease-in-out infinite" }}>💳</div>
        <h2 style={{ fontSize:20, marginBottom:8 }}>{t(lang, "processing")}</h2>
        <div style={{ width:200, margin:"20px auto" }}><div style={{ height:4, borderRadius:2, background:S.bdr, overflow:"hidden" }}><div style={{ width:"60%", height:"100%", background:S.pri, borderRadius:2, animation:"sh 1.5s ease-in-out infinite" }} /></div></div>
        <p style={{ color:S.t2, fontSize:14 }}>{t(lang, "securePayment")}</p>
      </div>
    );
  }

  /* ── Method list ── */
  const methods = [
    { id:"card",      icon:"💳", label:t(lang, "creditDebitCard") },
    { id:"paypal",    icon:"🅿️", label:t(lang, "paypal") },
    { id:"zelle",     icon:"⚡", label:t(lang, "zelle") },
    { id:"bank",      icon:"🏦", label:t(lang, "bankTransfer") },
    { id:"applepay",  icon:"🍎", label:t(lang, "applePay") },
    { id:"googlepay", icon:"🔵", label:t(lang, "googlePay") },
    { id:"admin",     icon:"🔧", label:"Admin Test Bypass" },
  ];

  const canSubmit = () => {
    if (!method) return false;
    if (method === "card") return cardNum.length >= 13 && cardExp.length >= 4 && cardCvv.length >= 3 && cardName.length >= 2;
    return true;
  };

  const fmtCard = (v) => { const d = v.replace(/\D/g, "").slice(0, 16); return d.replace(/(.{4})/g, "$1 ").trim(); };
  const fmtExp  = (v) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d; };

  return (
    <div style={S.page} dir={isRTL?"rtl":"ltr"}>
      <Nav title={t(lang, "paymentOptions")} backTo="pay" />

      {/* Amount banner */}
      <div style={{ background:"linear-gradient(135deg,rgba(99,102,241,.2),rgba(6,182,212,.15))", border:"2px solid rgba(99,102,241,.4)", borderRadius:16, padding:20, marginBottom:16, textAlign:"center" }}>
        <div style={{ fontSize:13, color:S.t2, fontWeight:600, marginBottom:4 }}>{t(lang, "amountDue")}</div>
        <div style={{ fontSize:36, fontWeight:900, color:"#fff" }}>${tot}</div>
        <div style={{ fontSize:12, color:S.t2, marginTop:4 }}>{selForm.name} — {t(lang, "securePayment")}</div>
      </div>

      <div style={{ fontSize:15, fontWeight:700, marginBottom:12, color:"#fff" }}>{t(lang, "selectPayMethod")}</div>

      {/* Method cards */}
      {methods.map(m => (
        <div key={m.id} onClick={() => setMethod(m.id)} style={{
          ...S.crd, border: method===m.id ? "2px solid "+S.pri : "1px solid "+S.bdr,
          background: method===m.id ? "rgba(99,102,241,.15)" : "rgba(255,255,255,.07)",
          padding:"14px 16px", display:"flex", alignItems:"center", gap:12, transition:"all .2s",
        }}>
          <div style={{ width:24, height:24, borderRadius:12, border: method===m.id ? "6px solid "+S.pri : "2px solid rgba(255,255,255,.3)", background: method===m.id ? S.pri : "transparent", flexShrink:0, transition:"all .2s" }} />
          <span style={{ fontSize:24 }}>{m.icon}</span>
          <span style={{ fontSize:15, fontWeight:600, flex:1 }}>{m.label}</span>
          {method === m.id && <span style={{ color:S.pri, fontSize:18 }}>✓</span>}
        </div>
      ))}

      {/* ── Card form ── */}
      {method === "card" && (
        <div style={{ ...S.crd, padding:20, marginTop:4, cursor:"default", background:"rgba(99,102,241,.08)", border:"1px solid rgba(99,102,241,.3)" }}>
          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{t(lang, "cardNumber")}</label>
            <input value={cardNum} onChange={e => setCardNum(fmtCard(e.target.value))} placeholder="1234 5678 9012 3456" style={S.inp} maxLength={19} inputMode="numeric" />
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <div style={{ flex:1 }}>
              <label style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{t(lang, "expDate")}</label>
              <input value={cardExp} onChange={e => setCardExp(fmtExp(e.target.value))} placeholder="MM/YY" style={S.inp} maxLength={5} inputMode="numeric" />
            </div>
            <div style={{ flex:1 }}>
              <label style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{t(lang, "cvv")}</label>
              <input value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" style={S.inp} maxLength={4} inputMode="numeric" type="password" />
            </div>
          </div>
          <div style={{ marginTop:12 }}>
            <label style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{t(lang, "cardHolder")}</label>
            <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="John Doe" style={S.inp} />
          </div>
        </div>
      )}

      {/* ── PayPal ── */}
      {method === "paypal" && (
        <div style={{ ...S.crd, padding:20, marginTop:4, cursor:"default", background:"rgba(0,112,243,.1)", border:"1px solid rgba(0,112,243,.3)", textAlign:"center" }}>
          <div style={{ fontSize:44, marginBottom:8 }}>🅿️</div>
          <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:8 }}>{t(lang, "payWithPaypal")}</div>
          <div style={{ fontSize:13, color:S.t2 }}>You will be redirected to PayPal to complete your payment of <strong style={{ color:"#fff" }}>${tot}</strong></div>
        </div>
      )}

      {/* ── Zelle ── */}
      {method === "zelle" && (
        <div style={{ ...S.crd, padding:20, marginTop:4, cursor:"default", background:"rgba(101,50,205,.1)", border:"1px solid rgba(101,50,205,.3)" }}>
          <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:12 }}>{t(lang, "zelleInstr")}</div>
          <div style={{ background:"rgba(0,0,0,.3)", borderRadius:10, padding:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}><span style={{ color:S.t2, fontSize:13 }}>Email</span><span style={{ fontWeight:700, fontSize:14 }}>payments@immiguide.com</span></div>
            <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ color:S.t2, fontSize:13 }}>{t(lang, "total")}</span><span style={{ fontWeight:700, fontSize:14, color:S.ok }}>${tot}</span></div>
          </div>
          <div style={{ fontSize:12, color:S.t2, marginTop:10, lineHeight:1.5 }}>After sending via Zelle, click "{t(lang, "submitPayment")}" to confirm.</div>
        </div>
      )}

      {/* ── Bank Transfer ── */}
      {method === "bank" && (
        <div style={{ ...S.crd, padding:20, marginTop:4, cursor:"default", background:"rgba(34,197,94,.08)", border:"1px solid rgba(34,197,94,.3)" }}>
          <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:12 }}>{t(lang, "bankInstr")}</div>
          <div style={{ background:"rgba(0,0,0,.3)", borderRadius:10, padding:14 }}>
            {[[t(lang,"bankName"),"Chase Bank"],[t(lang,"accountName"),"ImmIGuide LLC"],[t(lang,"routingNum"),"021000021"],[t(lang,"accountNum"),"483726159"],[t(lang,"total"),"$"+tot]].map(([lbl,val],i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom:i<4?8:0 }}>
                <span style={{ color:S.t2, fontSize:13 }}>{lbl}</span>
                <span style={{ fontWeight:700, fontSize:14, color:i===4?S.ok:"#fff" }}>{val}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize:12, color:S.t2, marginTop:10, lineHeight:1.5 }}>After transferring, click "{t(lang, "submitPayment")}" to confirm.</div>
        </div>
      )}

      {/* ── Apple Pay ── */}
      {method === "applepay" && (
        <div style={{ ...S.crd, padding:20, marginTop:4, cursor:"default", background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.2)", textAlign:"center" }}>
          <div style={{ fontSize:44, marginBottom:8 }}>🍎</div>
          <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:8 }}>{t(lang, "applePay")}</div>
          <div style={{ fontSize:13, color:S.t2 }}>Tap "{t(lang, "submitPayment")}" to pay <strong style={{ color:"#fff" }}>${tot}</strong> with Apple Pay</div>
        </div>
      )}

      {/* ── Google Pay ── */}
      {method === "googlepay" && (
        <div style={{ ...S.crd, padding:20, marginTop:4, cursor:"default", background:"rgba(66,133,244,.1)", border:"1px solid rgba(66,133,244,.3)", textAlign:"center" }}>
          <div style={{ fontSize:44, marginBottom:8 }}>🔵</div>
          <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:8 }}>{t(lang, "googlePay")}</div>
          <div style={{ fontSize:13, color:S.t2 }}>Tap "{t(lang, "submitPayment")}" to pay <strong style={{ color:"#fff" }}>${tot}</strong> with Google Pay</div>
        </div>
      )}

      {/* ── Admin bypass ── */}
      {method === "admin" && (
        <div style={{ ...S.crd, padding:20, marginTop:4, cursor:"default", background:"rgba(251,191,36,.08)", border:"1px solid rgba(251,191,36,.3)", textAlign:"center" }}>
          <div style={{ fontSize:44, marginBottom:8 }}>🔧</div>
          <div style={{ fontSize:15, fontWeight:700, color:S.wrn, marginBottom:8 }}>Admin Test Mode</div>
          <div style={{ fontSize:13, color:S.t2 }}>Bypasses payment — skips directly to confirmation. <strong style={{ color:S.wrn }}>Remove before production.</strong></div>
        </div>
      )}

      <Btn disabled={!canSubmit()} onClick={handleSubmit} style={{ marginTop:12 }}>{t(lang, "submitPayment") + " — $" + tot}</Btn>
      <div style={{ textAlign:"center", marginTop:12, fontSize:12, color:S.t2, fontWeight:600 }}>{t(lang, "securePayment")}</div>
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  23. SHARED: USCIS WARNING                                                ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function UscisWarning({ fee, large }) {
  return (
    <div style={{ background:"rgba(239,68,68,.15)", border:(large?"3px":"2px")+" solid #ef4444", borderRadius:large?16:14, padding:large?20:16, marginBottom:12, textAlign:"center" }}>
      <span style={{ fontSize:large?36:28 }}>🚨</span>
      <div style={{ fontSize:large?24:18, fontWeight:large?900:800, color:"#ef4444", margin:"6px 0" }}>IMPORTANT</div>
      <p style={{ fontSize:large?16:15, color:"#fff", fontWeight:700, lineHeight:1.6, margin:"0 0 8px" }}>You {large?"MUST":"must"} pay the USCIS filing fee of ${fee} {large?"BEFORE we can submit":"separately"}.</p>
      <p style={{ fontSize:large?14:13, color:"#fca5a5", margin:0, lineHeight:1.7 }}>Without payment, USCIS will reject your application.</p>
      {large && (
        <>
          <div style={{ background:"rgba(255,255,255,.1)", borderRadius:10, padding:12, textAlign:"center", margin:"12px 0" }}>
            <p style={{ fontSize:13, color:"#fff", margin:"0 0 4px", fontWeight:600 }}>Pay at:</p>
            <a href="https://www.uscis.gov/pay" target="_blank" rel="noopener" style={{ color:S.acc, fontWeight:800, fontSize:18, textDecoration:"underline" }}>🔗 uscis.gov/pay</a>
          </div>
          <div style={{ background:"rgba(239,68,68,.15)", borderRadius:10, padding:10 }}>
            <p style={{ fontSize:12, color:"#fca5a5", margin:0, fontWeight:600 }}>Save your receipt as proof of payment.</p>
          </div>
        </>
      )}
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  24. PAGE: WHAT'S NEXT (USCIS confirmation gate)                          ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PageWhatsNext() {
  const { lang, go, selForm, pkg, user, uscisConf, setUscisConf } = useContext(AppCtx);
  const [confInput, setConfInput] = useState(uscisConf || "");

  if (!selForm) return <div style={S.page}><Nav title="" backTo="dashboard" /></div>;
  const f = selForm;
  const isPdf = pkg === "pdf";
  const isStd = pkg === "printShip" || pkg === "fullSvc";
  const isExp = pkg === "express";
  const noPackage = !isPdf && !isStd && !isExp;
  const confirmed = confInput.trim().length >= 4;

  const renderPlanInfo = () => {
    if (isPdf) return (
      <div style={{ ...S.crd, padding:20, textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>📧</div>
        <h2 style={{ fontSize:18, marginBottom:12 }}>Your Forms Are Ready!</h2>
        <p style={{ color:S.t2, fontSize:14, lineHeight:1.6 }}>We will email forms to {user.email} within 24 hours.</p>
      </div>
    );
    if (isStd) return (
      <div style={{ ...S.crd, padding:20, textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>📦</div>
        <h2 style={{ fontSize:18, marginBottom:12 }}>{pkg === "fullSvc" ? "Full Service!" : "We Print and Ship!"}</h2>
        <p style={{ color:S.t2, fontSize:14, lineHeight:1.6 }}>{pkg === "fullSvc" ? "We mail everything to USCIS within 5-7 days." : "We print and ship within 5-7 days."}</p>
      </div>
    );
    if (isExp) return (
      <div style={{ ...S.crd, padding:20, textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🚀</div>
        <h2 style={{ fontSize:18, marginBottom:12 }}>Express Service!</h2>
        <p style={{ color:S.t2, fontSize:14, lineHeight:1.6 }}>We submit to USCIS within 2-3 business days.</p>
      </div>
    );
    return (
      <div style={{ ...S.crd, padding:20, textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>📧</div>
        <h2 style={{ fontSize:18, marginBottom:12 }}>Your Forms Are Ready!</h2>
        <p style={{ color:S.t2, fontSize:14, lineHeight:1.6 }}>We will email forms to {user.email} within 24 hours.</p>
      </div>
    );
  };

  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title="What Happens Next" backTo="paymentOptions" />
      {renderPlanInfo()}
      <UscisWarning fee={f.uscis} formId={f.id} large />

      {/* USCIS confirmation gate */}
      <div style={{ background:"rgba(239,68,68,.1)", border:"2px solid #ef4444", borderRadius:16, padding:20, marginBottom:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <span style={{ fontSize:28 }}>🛑</span>
          <div style={{ fontSize:16, fontWeight:800, color:"#ef4444", lineHeight:1.3 }}>USCIS Fee Payment Required</div>
        </div>
        <p style={{ fontSize:14, color:"#fff", lineHeight:1.6, margin:"0 0 12px", fontWeight:600 }}>
          You must pay the USCIS filing fee of <strong style={{ color:"#ef4444" }}>${f.uscis}</strong> before we can proceed. After paying at{" "}
          <a href="https://www.uscis.gov/pay" target="_blank" rel="noopener" style={{ color:S.acc, fontWeight:800, textDecoration:"underline" }}>uscis.gov/pay</a>, enter your confirmation number below.
        </p>
        <label style={{ fontSize:13, fontWeight:700, color:"#fff", display:"block", marginBottom:4 }}>USCIS Payment Confirmation #</label>
        <input value={confInput} onChange={e => setConfInput(e.target.value)} placeholder="Enter confirmation number…" style={{ ...S.inp, border: confirmed ? "2px solid "+S.ok : "1px solid rgba(239,68,68,.4)", background:"rgba(15,22,50,.8)" }} />
        {!confirmed && confInput.length > 0 && confInput.trim().length < 4 && (
          <div style={{ fontSize:12, color:S.wrn, marginTop:4 }}>Confirmation number must be at least 4 characters</div>
        )}
        {confirmed && (
          <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:8 }}>
            <span style={{ color:S.ok, fontSize:18 }}>✓</span>
            <span style={{ fontSize:13, color:S.ok, fontWeight:700 }}>Confirmation number entered</span>
          </div>
        )}
      </div>

      <Btn disabled={!confirmed} onClick={() => { setUscisConf(confInput.trim()); go("submitConfirm"); }}>
        {confirmed ? t(lang, "next") + " →" : "Enter USCIS Confirmation # to Continue"}
      </Btn>
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  25. PAGE: SUBMIT CONFIRM                                                 ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PageSubmitConfirm() {
  const { lang, go, selForm, pkg, uscisConf } = useContext(AppCtx);
  if (!selForm) return <div style={S.page}><Nav title="" backTo="dashboard" /></div>;
  const f = selForm;
  const planLabel = pkg==="express" ? "Express Delivery" : pkg==="fullSvc" ? "Full Service (We Mail to USCIS)" : pkg==="printShip" ? "Print & Ship to You" : "Digital PDF Download";

  return (
    <div style={{ ...S.page, textAlign:"center", paddingTop:10 }} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title="Submitting to USCIS" backTo="whatsNext" />
      <div style={{ fontSize:64, marginBottom:8 }}>📬</div>
      <h2 style={{ fontSize:20, marginBottom:12, lineHeight:1.4 }}>We Will Now Submit Your<br /><strong style={{ color:S.pri }}>{f.name}</strong> Application to USCIS</h2>

      <div style={{ ...S.crd, padding:20, textAlign:"left", cursor:"default" }}>
        {[["Form", f.name], ["Delivery Plan", planLabel], ["USCIS Fee ($"+f.uscis+")", "✓ Paid"], ["Confirmation #", uscisConf]].map(([lbl, val], i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom: i<3?10:0 }}>
            <span style={{ color:S.t2, fontSize:14 }}>{lbl}</span>
            <span style={{ fontWeight:700, fontSize:14, color: i===1?S.pri : i===2?S.ok : "#fff", letterSpacing: i===3?1:0 }}>{val}</span>
          </div>
        ))}
      </div>

      <div style={{ ...S.crd, padding:16, cursor:"default", background:"rgba(34,197,94,.1)", border:"1px solid rgba(34,197,94,.3)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, justifyContent:"center" }}>
          <span style={{ fontSize:24 }}>✅</span>
          <span style={{ fontSize:15, fontWeight:700, color:S.ok }}>Everything is verified and ready!</span>
        </div>
        <p style={{ fontSize:13, color:S.t2, margin:"8px 0 0", lineHeight:1.5 }}>Your application will be submitted to USCIS according to your selected plan.</p>
      </div>

      <Btn onClick={() => go("done")} style={{ marginTop:16 }}>{t(lang, "next") + " →"}</Btn>
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  26. PAGE: DONE                                                           ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PageDone() {
  const { lang, go, caseRef } = useContext(AppCtx);
  return (
    <div style={{ ...S.page, textAlign:"center", paddingTop:40 }} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title={t(lang, "complete")} backTo="dashboard" />
      <div style={{ fontSize:80, marginBottom:8 }}>🎉🎊✨</div>
      <h1 style={{ fontSize:26, marginBottom:8 }}>{t(lang, "complete")}</h1>
      <p style={{ color:S.t2, marginBottom:20 }}>{lang === "ru" ? "Спасибо что выбрали ИммиГид!" : "Thank you for choosing ImmIGuide!"}</p>
      {lang === "ru" && (
        <div style={{ background:"rgba(251,191,36,.12)", border:"1px solid rgba(251,191,36,.4)", borderRadius:14, padding:16, marginBottom:16, textAlign:"center" }}>
          <div style={{ fontSize:17, color:"#fbbf24", fontWeight:800, lineHeight:1.5 }}>ИммиГид — ваш надёжный помощник в иммиграции</div>
          <div style={{ fontSize:15, color:"#fff", fontWeight:700, marginTop:8 }}>С нами идёшь — дешевле платёж!</div>
        </div>
      )}
      <div style={{ ...S.crd, padding:20, textAlign:"center" }}>
        <div style={{ fontSize:13, color:S.t2, marginBottom:4 }}>Case Reference</div>
        <div style={{ fontSize:24, fontWeight:800, color:S.pri, letterSpacing:2 }}>{caseRef}</div>
      </div>
      <div style={{ display:"flex", gap:12, marginTop:16 }}>
        <Btn outline onClick={() => go("tracking")} style={{ flex:1 }}>{t(lang, "tracking")}</Btn>
        <Btn onClick={() => go("dashboard")} style={{ flex:1 }}>{t(lang, "dashboard")}</Btn>
      </div>
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  27. PAGE: TRACKING                                                       ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PageTracking() {
  const { lang, caseRef } = useContext(AppCtx);
  const steps = [
    { l:"Forms Prepared",       s:"done" },
    { l:"Payment Received",     s:"done" },
    { l:"Submitted to USCIS",   s:"pending" },
    { l:"USCIS Processing",     s:"waiting" },
    { l:"Decision",             s:"waiting" },
  ];
  const colors = { done:S.ok, pending:S.wrn, waiting:"rgba(147,197,253,.15)" };
  const icons  = { done:"✓", pending:"⏳", waiting:"—" };
  const descs  = { done:"Completed", pending:"Submitting in 5-7 days", waiting:"Awaiting" };

  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title={t(lang, "tracking")} backTo="dashboard" />
      <div style={{ ...S.crd, padding:16, textAlign:"center", marginBottom:16 }}>
        <div style={{ fontSize:13, color:S.t2 }}>Case</div>
        <div style={{ fontSize:18, fontWeight:800, color:S.pri, letterSpacing:1, marginTop:4 }}>{caseRef}</div>
      </div>
      {steps.map((x, i) => (
        <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ width:42, height:42, borderRadius:21, background:colors[x.s], display:"flex", alignItems:"center", justifyContent:"center", fontSize:x.s==="done"?18:14, fontWeight:700, color:x.s==="waiting"?"#555":"#fff", border:x.s==="pending"?"2px solid "+S.wrn:"none" }}>{icons[x.s]}</div>
            {i < 4 && <div style={{ width:2, height:32, background:i<1?S.ok:S.bdr, margin:"2px 0" }} />}
          </div>
          <div style={{ paddingBottom:12 }}>
            <div style={{ fontWeight:700, fontSize:14, color:x.s==="waiting"?S.t2:"#fff" }}>{x.l}</div>
            <div style={{ fontSize:12, color:x.s==="pending"?S.wrn:S.t2, marginTop:2 }}>{descs[x.s]}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  28. PAGE: CIVICS TEST                                                    ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PageCivics() {
  const { lang } = useContext(AppCtx);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const reset = () => { setQIdx(0); setScore(0); setChosen(null); setDone(false); };

  /* Results */
  if (done) {
    const pct = Math.round((score / CIVICS.length) * 100);
    const pass = pct >= 70;
    const clr = pass ? "#22c55e" : "#ef4444";
    return (
      <div style={{ ...S.page, textAlign:"center", paddingTop:20 }} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
        <Nav title="Civics Test" backTo="dashboard" />
        <div style={{ fontSize:64, marginBottom:8 }}>{pass ? "🎉🏆✅" : "📚💪"}</div>
        <div style={{ width:140, height:140, borderRadius:70, border:"8px solid "+clr, display:"flex", alignItems:"center", justifyContent:"center", margin:"12px auto", background:clr+"18" }}>
          <span style={{ fontSize:44, fontWeight:900, color:clr }}>{score}/{CIVICS.length}</span>
        </div>
        <h2 style={{ fontSize:24, color:clr, marginTop:12 }}>{pass ? "You Passed!" : "Keep Studying"}</h2>
        <p style={{ color:"#fff", fontSize:18, fontWeight:700, margin:"8px 0" }}>Score: {pct}%</p>
        <Btn onClick={reset} style={{ marginTop:16 }}>{pass ? "Play Again" : "Try Again"}</Btn>
      </div>
    );
  }

  /* Question */
  const q = CIVICS[qIdx];
  const handleAnswer = (i) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === q.a) setScore(p => p + 1);
    timerRef.current = setTimeout(() => {
      if (qIdx < CIVICS.length - 1) { setQIdx(p => p + 1); setChosen(null); }
      else setDone(true);
    }, 1500);
  };

  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title="Civics Test" backTo="dashboard" />
      <PB pct={((qIdx + 1) / CIVICS.length) * 100} />
      <div style={{ fontSize:13, color:S.t2, marginBottom:8 }}>Question {qIdx + 1} of {CIVICS.length}</div>
      <h3 style={{ fontSize:17, marginBottom:20, lineHeight:1.4, color:"#fff" }}>{q.q}</h3>
      {q.o.map((opt, i) => {
        let bg = "rgba(255,255,255,.07)", bd = S.bdr;
        if (chosen !== null) {
          if (i === q.a) { bg = "rgba(34,197,94,0.4)"; bd = "#22c55e"; }
          else if (i === chosen) { bg = "rgba(239,68,68,0.4)"; bd = "#ef4444"; }
        }
        return (
          <div key={i} onClick={() => handleAnswer(i)} style={{ background:bg, borderRadius:16, padding:14, marginBottom:8, border:"2px solid "+bd, cursor:chosen===null?"pointer":"default", display:"flex", gap:12, alignItems:"center", transition:"all .2s" }}>
            <div style={{ width:32, height:32, borderRadius:16, background:"rgba(255,255,255,.18)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:14, flexShrink:0, color:"#fff" }}>{String.fromCharCode(65 + i)}</div>
            <span style={{ fontSize:15, color:"#fff" }}>{opt}</span>
          </div>
        );
      })}
      {chosen !== null && (
        <div style={{ padding:14, borderRadius:12, marginTop:8, background: chosen===q.a ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)", border: chosen===q.a ? "2px solid #22c55e" : "2px solid #ef4444", textAlign:"center", fontWeight:700, fontSize:15, color:"#fff" }}>
          {chosen === q.a ? "Correct!" : "Wrong — Answer: " + q.o[q.a]}
        </div>
      )}
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  29. PAGE: KNOWLEDGE BASE                                                 ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PageKnowledge() {
  const { lang } = useContext(AppCtx);
  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title={t(lang, "knowledgeBase")} backTo="dashboard" />
      <div style={S.crd}>
        <h3>🇺🇸 {t(lang, "appName")}</h3>
        <p style={{ color:S.t2, fontSize:14, lineHeight:1.6, marginTop:8 }}>{bt(lang, "onboard1Desc")}</p>
      </div>
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  30. PAGE: PROFILE                                                        ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

function PageProfile() {
  const { lang, user, doLogout } = useContext(AppCtx);
  const [sms, setSms] = useState(true);
  const [eml, setEml] = useState(true);
  const [push, setPush] = useState(false);

  const togStyle = { width:44, height:24, borderRadius:12, cursor:"pointer", border:"none", transition:"background .3s", display:"flex", alignItems:"center", padding:2 };
  const dotStyle = { width:20, height:20, borderRadius:10, background:"#fff", transition:"transform .3s" };

  const Toggle = ({ on, set }) => (
    <button onClick={() => set(!on)} style={{ ...togStyle, background: on ? S.ok : "rgba(255,255,255,.2)" }}>
      <div style={{ ...dotStyle, transform: on ? "translateX(20px)" : "translateX(0)" }} />
    </button>
  );

  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title={t(lang, "profile")} backTo="dashboard" />
      <div style={{ ...S.crd, textAlign:"center", padding:24 }}>
        <div style={{ width:80, height:80, borderRadius:40, background:S.pri, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", fontSize:32, color:"#fff" }}>{(user.name || "U")[0]}</div>
        <h3>{user.name}</h3>
        <p style={{ color:S.t2 }}>{user.email}</p>
      </div>
      <div style={{ ...S.crd, padding:20, cursor:"default" }}>
        <div style={{ fontSize:15, fontWeight:700, marginBottom:14 }}>📬 Notifications</div>
        {[
          { icon:"📱", label:"SMS",   desc:"Text message updates", on:sms,  set:setSms },
          { icon:"📧", label:"Email", desc:"Email notifications",  on:eml,  set:setEml },
          { icon:"🔔", label:"Push",  desc:"Push notifications",   on:push, set:setPush },
        ].map((n, i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: i<2?14:0 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:600 }}>{n.icon} {n.label}</div>
              <div style={{ fontSize:11, color:S.t2 }}>{n.desc}</div>
            </div>
            <Toggle on={n.on} set={n.set} />
          </div>
        ))}
      </div>
      <Btn onClick={doLogout} color={S.err} style={{ marginTop:12 }}>{t(lang, "logout")}</Btn>
    </div>
  );
}

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  31. ROUTER                                                               ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

const PAGES = {
  onboard:        PageOnboard,
  auth:           PageAuth,
  dashboard:      PageDashboard,
  wizard:         PageWizard,
  formSelect:     PageFormSelect,
  formDetail:     PageFormDetail,
  formFill:       PageFormFill,
  docUpload:      PageDocUpload,
  packageSelect:  PagePackageSelect,
  preview:        PagePreview,
  pay:            PagePay,
  paymentOptions: PagePaymentOptions,
  whatsNext:      PageWhatsNext,
  submitConfirm:  PageSubmitConfirm,
  done:           PageDone,
  tracking:       PageTracking,
  civics:         PageCivics,
  knowledge:      PageKnowledge,
  profile:        PageProfile,
};

/* ╔═══════════════════════════════════════════════════════════════════════════╗
   ║  32. APP ROOT                                                             ║
   ╚═══════════════════════════════════════════════════════════════════════════╝ */

export default function App() {
  /* ── State ── */
  const [lang, setLang]           = useState("en");
  const [page, setPage]           = useState("onboard");
  const [loggedIn, setLoggedIn]   = useState(false);
  const [user, setUser]           = useState({ name: "", email: "" });
  const [selForm, setSelForm]     = useState(null);
  const [fd, setFd]               = useState({});
  const [fSec, setFSec]           = useState(0);
  const [pkg, setPkg]             = useState(null);
  const [errs, setErrs]           = useState({});
  const [ups, setUps]             = useState({ passport:null, birth:null, photo:null, support:null });
  const [clock, setClock]         = useState("");
  const [payTotal, setPayTotal]   = useState(0);
  const [uscisConf, setUscisConf] = useState("");

  const upsRef  = useRef(ups);
  const caseRef = useRef("IMG-" + Math.random().toString(36).substr(2, 6).toUpperCase() + "-2026").current;

  useEffect(() => { upsRef.current = ups; }, [ups]);

  /* ── Navigation (with auth guard) ── */
  const go = useCallback((p) => {
    const publicPages = ["onboard", "auth"];
    if (!publicPages.includes(p) && !loggedIn) { setPage("auth"); return; }
    setPage(p); setErrs({});
  }, [loggedIn]);

  const resetForm = useCallback(() => { setSelForm(null); setPkg(null); setFSec(0); }, []);

  const doLogout = useCallback(() => {
    setLoggedIn(false);
    resetForm();
    setFd({});
    setUps({ passport:null, birth:null, photo:null, support:null });
    go("auth");
  }, [go, resetForm]);

  /* ── Clock ── */
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" }));
    tick();
    const iv = setInterval(tick, 30000);
    return () => clearInterval(iv);
  }, []);

  /* ── Global CSS (animations) ── */
  useEffect(() => {
    if (document.getElementById("immiguide-css")) return;
    const el = document.createElement("style");
    el.id = "immiguide-css";
    el.textContent = `
      @keyframes tw{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
      @keyframes sh{0%{background-position:200% center}100%{background-position:-200% center}}
      @keyframes gf{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
      .is{position:absolute;border-radius:50%;background:#fff;animation:tw ease-in-out infinite}
      .it{font-weight:800;font-size:18px;color:#fff;background:linear-gradient(90deg,#fff,#93c5fd,#fff,#93c5fd,#fff);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:sh 4s linear infinite}
      .il{animation:gf 3s ease-in-out infinite;display:inline-block;filter:drop-shadow(0 0 8px rgba(147,197,253,.6))}
      .mq-wrap{overflow:hidden;position:relative}
      .mq-track{display:flex;width:max-content;animation:mqe 80s linear infinite}
      @keyframes mqe{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      select option{background:#0f1629;color:#fff}
      input::placeholder{color:rgba(255,255,255,.4)!important}
    `;
    document.head.appendChild(el);
    return () => { const x = document.getElementById("immiguide-css"); if (x) x.remove(); };
  }, []);

  /* ── Cleanup blob URLs ── */
  useEffect(() => () => {
    Object.values(upsRef.current).forEach(u => { if (u) URL.revokeObjectURL(u); });
  }, []);

  /* ── Context value ── */
  const ctx = {
    lang, setLang, page, go,
    loggedIn, setLoggedIn,
    user, setUser,
    selForm, setSelForm,
    fd, setFd,
    fSec, setFSec,
    pkg, setPkg,
    errs, setErrs,
    ups, setUps,
    caseRef,
    resetForm, doLogout,
    payTotal, setPayTotal,
    uscisConf, setUscisConf,
  };

  const PageComp = PAGES[page] || PageDashboard;

  /* ── Render ── */
  return (
    <AppCtx.Provider value={ctx}>
      <div style={{ display:"flex", justifyContent:"center", alignItems:"flex-start", minHeight:"100vh", background:"#080e27", padding:"16px 0" }}>
        <div style={{ width:390, minHeight:760, maxHeight:844, overflowY:"auto", overflowX:"hidden", borderRadius:40, border:"6px solid rgba(147,197,253,.15)", boxShadow:"0 0 60px rgba(99,102,241,.2),0 20px 60px rgba(0,0,0,.4)", position:"relative", background:"linear-gradient(135deg,#0c1445,#1a237e 30%,#0d47a1 60%,#1a237e 80%,#0c1445)" }}>

          {/* Statue of Liberty watermark */}
          <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none", zIndex:1, overflow:"hidden" }}>
            <span style={{ fontSize:"min(90vw, 600px)", opacity:.11, filter:"grayscale(100%)", userSelect:"none", lineHeight:1 }}>🗽</span>
          </div>

          <Stars />

          <div style={{ position:"relative", zIndex:2 }}>
            {/* Notch */}
            <div style={{ width:120, height:28, background:"rgba(12,20,69,.9)", borderRadius:"0 0 16px 16px", margin:"0 auto", position:"sticky", top:0, zIndex:300 }} />

            {/* Status bar */}
            <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 16px 4px", fontSize:12, fontWeight:600, color:"#fff" }}>
              <span>{clock}</span>
              <div style={{ display:"flex", gap:6 }}>
                <span style={{ fontSize:11 }}>📶</span>
                <span style={{ fontSize:11 }}>🔋</span>
              </div>
            </div>

            {/* Lang dropdown on onboard only */}
            {page === "onboard" && (
              <div style={{ display:"flex", justifyContent:"flex-end", padding:"4px 16px 0" }}>
                <LangDropdown />
              </div>
            )}

            <PageComp />
            <Footer />
          </div>
        </div>
      </div>
    </AppCtx.Provider>
  );
}