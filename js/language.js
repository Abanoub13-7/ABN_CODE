(function () {
  "use strict";

  const storageKey = "abnCodeLanguage";
  const translations = {
    en: {
      "meta.title": "Abanoub Eshak | Web Designer & Front-End Developer",
      "meta.description": "Abanoub Eshak is a web designer and front-end developer creating responsive, user-focused digital experiences.",
      "nav.toggle": "Toggle navigation",
      "nav.about": "About",
      "nav.projects": "Projects",
      "nav.resume": "Resume",
      "nav.contact": "Contact",
      "theme.aria": "Toggle color mode",
      "theme.label": "Color mode",
      "language.switchToArabic": "Switch language to Arabic",
      "language.switchToEnglish": "Switch language to English",
      "language.buttonArabic": "العربية",
      "language.buttonEnglish": "English",
      "hero.welcome": "Welcome to",
      "hero.portfolio": "my portfolio website!",
      "hero.greeting": "Hey folks, I'm",
      "hero.roleDesigner": "Web Designer",
      "hero.roleDeveloper": "frontend ",
      "hero.description": "Building a successful product is a challenge. I am highly energetic in user experience design, interfaces and web development.",
      "hero.downloadCv": "Download CV",
      "hero.quote": "Get a free quote",
      "image.portfolio": "Abanoub Eshak portfolio illustration",
      "projects.heading": "Things I have designed for digital media agencies",
      "carousel.previous": "Previous project",
      "carousel.next": "Next project",
      "project.crudLink": "Open CRUD Products project",
      "project.crudAlt": "CRUD Products project preview",
      "project.crudName": "CRUD Products",
      "project.crudDescription": "Project showcase for a product catalog and management interface.",
      "project.churchLink": "Open My Church Website project",
      "project.churchAlt": "My Church Website project preview",
      "project.churchName": "My Church Website",
      "project.churchDescription": "Church website with parish information, schedules, and event registration.",
      "project.artistLink": "Open Photo Artiste project",
      "project.artistAlt": "Photo Artiste project preview",
      "project.artistName": "Photo Artiste",
      "project.artistDescription": "Creative portfolio project for an artist showcase.",
      "project.prayarLink": "Open PrayAR project",
      "project.prayarAlt": "PrayAR project preview",
      "project.prayarName": "PrayAR",
      "project.prayarDescription": "Interactive project showcase linked to the live preview.",
      "resume.projects": " PROJECTS",
      "experience.churchTitle": " Church Management Website ",
      "experience.churchDescription": "Designed and developed a comprehensive website for a local church including news, parish information, population census, and service schedules. Added interactive modules for event photo galeries, confession appointment booking, and trip registrations.",
      "experience.instituteTitle": " October Higher Institute Website",
      "experience.instituteDescription": "Created a dynamic website for October Higher Institute for Engineering and Technology. Implemented sections for institute details, inquiries, contact forms, student registration,photo galeries, and a feedback system with ratings.",
      "experience.salonTitle": " Beauty Salon Website",
      "experience.salonDescription": " Developed a fully responsive website for a large beauty salon with an attractive user interface. Integrated service cards for all offerings, an interactive booking system, a shopping cart, and inquiry features to enhance the customer experience.",
      "education.heading": "Educations",
      "education.institute": "October Higher Institute for Engineering and Technology",
      "education.country": "Egypt",
      "education.degree": " Bachelor's Degree in Computer Information Systems (CIS)",
      "education.grade": "Very Good (86%)",
      "education.projectLabel": "Graduation Project:",
      "education.projectTitle": "\"The Role of Artificial Intelligence in Enhancing Employee Performance\"",
      "education.projectGrade": "(Excellent)",
      "education.course": "Web Development",
      "education.courseHours": "25 hours of training",
      "education.courseDescription": "Completed the Web Development training program and received a certificate of completion.",
      "education.certificate": "Certificate of Completion",
      "contact.mapTitle": "Google Maps location",
      "contact.heading": "To contact me!",
      "contact.facebook": "Visit Facebook profile",
      "contact.facebookTitle": "facebook",
      "contact.instagram": "Visit Instagram profile",
      "contact.instagramTitle": "Instagram",
      "contact.linkedin": "Visit LinkedIn profile",
      "contact.linkedinTitle": "linkedin",
      "contact.whatsapp": "Contact on WhatsApp",
      "contact.whatsappTitle": "WhatsAPP",
      "contact.github": "Visit GitHub profile",
      "contact.githubTitle": "github",
      "contact.formHeading": "Interested to work together? Let's talk",
      "form.name": "Your Name",
      "form.email": "Your email",
      "form.message": "Message",
      "form.send": "Send Message",
      "form.sendAria": "Send message",
      "form.emailSubject": "Portfolio contact from {name}",
      "form.errorName": "Please enter your name.",
      "form.errorEmail": "Please enter a valid email address.",
      "form.errorMessage": "Please enter a message.",
      "form.sending": "Sending your message...",
      "form.activation": "FormSubmit requires the recipient to activate this address. The message has not been confirmed as delivered; please complete the activation email first.",
      "form.failure": "We couldn't send your message. Please try again later or contact me using the details on this page.",
      "form.success": "FormSubmit accepted your message. Inbox delivery depends on completing recipient email activation with FormSubmit.",
      "form.networkFailure": "We couldn't send your message because of a network or service error. Please try again later or contact me using the details on this page.",
      "footer.copyright": "Copyright © 2025 Abanoub Eshak",
      "footer.designedBy": "Designed by"
    },
    ar: {
      "meta.title": "أبانوب إسحق | مصمم مواقع ومطور واجهات أمامية",
      "meta.description": "أبانوب إسحق مصمم مواقع ومطور واجهات أمامية، يصمم تجارب رقمية متجاوبة تضع احتياجات المستخدم في المقام الأول.",
      "nav.toggle": "فتح أو إغلاق القائمة",
      "nav.about": "نبذة عني",
      "nav.projects": "المشروعات",
      "nav.resume": "السيرة الذاتية",
      "nav.contact": "تواصل معي",
      "theme.aria": "تبديل المظهر",
      "theme.label": "المظهر",
      "language.switchToArabic": "تغيير لغة الصفحة إلى العربية",
      "language.switchToEnglish": "تغيير لغة الصفحة إلى الإنجليزية",
      "language.buttonArabic": "العربية",
      "language.buttonEnglish": "English",
      "hero.welcome": "أهلًا بك في",
      "hero.portfolio": "موقعي الشخصي لعرض الأعمال!",
      "hero.greeting": "مرحبًا، أنا",
      "hero.roleDesigner": "مصمم مواقع",
      "hero.roleDeveloper": "مطور واجهات أمامية",
      "hero.description": "إنشاء منتج ناجح تحدٍ حقيقي. أعمل بشغف على تصميم تجربة المستخدم والواجهات وتطوير الويب.",
      "hero.downloadCv": "تحميل السيرة الذاتية",
      "hero.quote": "اطلب عرض سعر مجانيًا",
      "image.portfolio": "رسم توضيحي لمعرض أعمال أبانوب إسحق",
      "projects.heading": "نماذج من أعمال صممتها لوكالات الإعلام الرقمي",
      "carousel.previous": "المشروع السابق",
      "carousel.next": "المشروع التالي",
      "project.crudLink": "افتح مشروع إدارة المنتجات (CRUD)",
      "project.crudAlt": "معاينة مشروع إدارة المنتجات (CRUD)",
      "project.crudName": "إدارة المنتجات (CRUD)",
      "project.crudDescription": "واجهة لعرض المنتجات وإدارة كتالوجها.",
      "project.churchLink": "افتح مشروع موقع كنيستي",
      "project.churchAlt": "معاينة مشروع موقع كنيستي",
      "project.churchName": "موقع كنيستي",
      "project.churchDescription": "موقع لكنيسة يضم معلومات الرعية والمواعيد والتسجيل في الفعاليات.",
      "project.artistLink": "افتح مشروع Photo Artiste",
      "project.artistAlt": "معاينة مشروع معرض الفنان Photo Artiste",
      "project.artistName": "معرض الفنان (Photo Artiste)",
      "project.artistDescription": "معرض أعمال إبداعي مخصص لعرض أعمال فنان.",
      "project.prayarLink": "افتح مشروع PrayAR",
      "project.prayarAlt": "معاينة مشروع PrayAR",
      "project.prayarName": "PrayAR",
      "project.prayarDescription": "عرض تفاعلي للمشروع مرتبط بالنسخة التجريبية المباشرة.",
      "resume.projects": "المشروعات",
      "experience.churchTitle": "موقع إدارة الكنيسة",
      "experience.churchDescription": "صممت وطورت موقعًا شاملًا لكنيسة محلية، يضم الأخبار ومعلومات الرعية والإحصاء السكاني ومواعيد الخدمات. كما أضفت وحدات تفاعلية لصور الفعاليات وحجز مواعيد الاعتراف والتسجيل في الرحلات.",
      "experience.instituteTitle": "موقع معهد أكتوبر العالي",
      "experience.instituteDescription": "أنشأت موقعًا تفاعليًا لمعهد أكتوبر العالي للهندسة والتكنولوجيا، يضم أقسامًا لمعلومات المعهد والاستفسارات ونماذج التواصل وتسجيل الطلاب ومعارض الصور ونظامًا للتقييم وإبداء الرأي.",
      "experience.salonTitle": "موقع صالون تجميل",
      "experience.salonDescription": "طورت موقعًا متجاوبًا بالكامل لصالون تجميل كبير بواجهة جذابة. أضفت بطاقات للخدمات ونظامًا تفاعليًا للحجز وسلة تسوق ووسائل للاستفسار لتحسين تجربة العملاء.",
      "education.heading": "التعليم",
      "education.institute": "معهد أكتوبر العالي للهندسة والتكنولوجيا",
      "education.country": "مصر",
      "education.degree": "بكالوريوس نظم المعلومات الحاسوبية (CIS)",
      "education.grade": "جيد جدًا (86٪)",
      "education.projectLabel": "مشروع التخرج:",
      "education.projectTitle": "«دور الذكاء الاصطناعي في تعزيز أداء الموظفين»",
      "education.projectGrade": "(ممتاز)",
      "education.course": "تطوير الويب",
      "education.courseHours": "25 ساعة تدريبية",
      "education.courseDescription": "أتممت برنامج التدريب على تطوير الويب وحصلت على شهادة إتمام.",
      "education.certificate": "شهادة إتمام التدريب",
      "contact.mapTitle": "الموقع على خرائط Google",
      "contact.heading": "للتواصل معي",
      "contact.facebook": "زيارة الملف الشخصي على Facebook",
      "contact.facebookTitle": "Facebook",
      "contact.instagram": "زيارة الملف الشخصي على Instagram",
      "contact.instagramTitle": "Instagram",
      "contact.linkedin": "زيارة الملف الشخصي على LinkedIn",
      "contact.linkedinTitle": "LinkedIn",
      "contact.whatsapp": "التواصل عبر WhatsApp",
      "contact.whatsappTitle": "WhatsApp",
      "contact.github": "زيارة الملف الشخصي على GitHub",
      "contact.githubTitle": "GitHub",
      "contact.formHeading": "هل ترغب في التعاون؟ لنتحدث",
      "form.name": "الاسم",
      "form.email": "البريد الإلكتروني",
      "form.message": "الرسالة",
      "form.send": "إرسال الرسالة",
      "form.sendAria": "إرسال الرسالة",
      "form.emailSubject": "رسالة تواصل بشأن معرض الأعمال من {name}",
      "form.errorName": "يرجى إدخال الاسم.",
      "form.errorEmail": "يرجى إدخال بريد إلكتروني صحيح.",
      "form.errorMessage": "يرجى كتابة الرسالة.",
      "form.sending": "جارٍ إرسال رسالتك...",
      "form.activation": "تتطلب FormSubmit تفعيل عنوان البريد المستلِم. لم يتأكد تسليم الرسالة؛ يرجى إكمال التفعيل عبر رسالة البريد أولًا.",
      "form.failure": "تعذر إرسال رسالتك. يرجى المحاولة لاحقًا أو التواصل معي باستخدام بيانات الاتصال في هذه الصفحة.",
      "form.success": "قبلت FormSubmit رسالتك. يعتمد وصولها إلى صندوق البريد على إكمال تفعيل عنوان المستلِم لدى FormSubmit.",
      "form.networkFailure": "تعذر إرسال رسالتك بسبب مشكلة في الشبكة أو الخدمة. يرجى المحاولة لاحقًا أو التواصل معي باستخدام بيانات الاتصال في هذه الصفحة.",
      "footer.copyright": "حقوق النشر © 2025 أبانوب إسحق",
      "footer.designedBy": "صُمّم بواسطة"
    }
  };

  let currentLanguage = "en";

  function translate(key) {
    const languageTranslations = translations[currentLanguage];
    if (!Object.prototype.hasOwnProperty.call(languageTranslations, key)) {
      console.error("Missing " + currentLanguage + " translation for: " + key);
      return key;
    }
    return languageTranslations[key];
  }

  function applyLanguage(language) {
    currentLanguage = language === "ar" ? "ar" : "en";
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const key = element.getAttribute("data-i18n");
      const value = translate(key);
      const attributes = element.getAttribute("data-i18n-attr");

      if (attributes) {
        attributes.split(",").forEach(function (attribute) {
          const attributeName = attribute.trim();
          const attributeKey = element.getAttribute("data-i18n-" + attributeName);
          element.setAttribute(attributeName, attributeKey ? translate(attributeKey) : value);
        });
      }
      if (!attributes || element.hasAttribute("data-i18n-text")) {
        element.textContent = value;
      }
    });

    const languageButton = document.getElementById("languageToggle");
    if (languageButton) {
      languageButton.setAttribute(
        "aria-label",
        translate(currentLanguage === "en" ? "language.switchToArabic" : "language.switchToEnglish")
      );
      languageButton.querySelector("span").textContent = translate(
        currentLanguage === "en" ? "language.buttonArabic" : "language.buttonEnglish"
      );
    }

    document.querySelectorAll(".social-links a[data-placement]").forEach(function (link) {
      link.setAttribute("data-placement", currentLanguage === "ar" ? "right" : "left");
    });

    document.dispatchEvent(new CustomEvent("portfolio:languagechange", {
      detail: { language: currentLanguage }
    }));
  }

  function readSavedLanguage() {
    try {
      const savedLanguage = window.localStorage.getItem(storageKey);
      return savedLanguage === "ar" || savedLanguage === "en" ? savedLanguage : "en";
    } catch (error) {
      console.warn("Unable to read the saved language preference.", error);
      return "en";
    }
  }

  function saveLanguage(language) {
    try {
      window.localStorage.setItem(storageKey, language);
    } catch (error) {
      console.warn("Unable to save the language preference.", error);
    }
  }

  window.portfolioLanguage = {
    translate: translate,
    getCurrentLanguage: function () {
      return currentLanguage;
    }
  };

  applyLanguage(readSavedLanguage());

  const languageButton = document.getElementById("languageToggle");
  if (languageButton) {
    languageButton.addEventListener("click", function () {
      const nextLanguage = currentLanguage === "en" ? "ar" : "en";
      applyLanguage(nextLanguage);
      saveLanguage(nextLanguage);
    });
  }
})();
