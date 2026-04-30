const translations = {
  de: {
    firstName: "Vorname",
    lastName: "Nachname *",
    email: "E-Mail *",
    company: "Firma",
    phone: "Telefon",
    mobile: "Mobil",
    street: "Strasse",
    zip: "PLZ",
    city: "Stadt",
    country: "Land",
    message: "Nachricht",
    submit: "SENDEN",
    hint: "Bitte beschreiben Sie Ihr Anliegen so genau wie möglich."
  },
  fr: {
    firstName: "Prénom",
    lastName: "Nom *",
    email: "E-mail *",
    company: "Entreprise",
    phone: "Téléphone",
    mobile: "Mobile",
    street: "Rue",
    zip: "Code postal",
    city: "Ville",
    country: "Pays",
    message: "Message",
    submit: "ENVOYER",
    hint: "Veuillez décrire votre demande aussi précisément que possible."
  },
  it: {
    firstName: "Nome",
    lastName: "Cognome *",
    email: "Email *",
    company: "Azienda",
    phone: "Telefono",
    mobile: "Cellulare",
    street: "Via",
    zip: "CAP",
    city: "Città",
    country: "Paese",
    message: "Messaggio",
    submit: "INVIA",
    hint: "Si prega di descrivere la richiesta nel modo più preciso possibile."
  }
};

let formStartTime;

function beforeSubmit() {
  const company = document.getElementById("company");
  const lastName = document.getElementById("last_name");
  const honeypot = document.getElementById("website");
  const messageField = document.getElementById("description");

  if (honeypot && honeypot.value.trim() !== "") {
    return false;
  }

  if (Date.now() - formStartTime < 3000) {
    alert("Bitte warten Sie einen Moment, bevor Sie das Formular absenden.");
    return false;
  }

  if (typeof grecaptcha !== "undefined") {
    const recaptchaResponse = grecaptcha.getResponse();

    if (!recaptchaResponse) {
      alert("Bitte bestätigen Sie, dass Sie kein Roboter sind.");
      return false;
    }
  }

  if (company && lastName && company.value.trim() === "") {
    company.value = lastName.value.trim();
  }

  if (messageField) {
  const structuredMessage = `
  Nachricht:
  ${messageField.value}

  ------------------------
  Kontaktinformationen:
  Name: ${lastName?.value || ""}
  Firma: ${company?.value || ""}
  Email: ${document.getElementById("email")?.value || ""}
  Telefon: ${document.getElementById("phone")?.value || ""}
  `;

    messageField.value = structuredMessage.trim();
  }

  return true;
}

function getLanguage() {
  const params = new URLSearchParams(window.location.search);

  return params.get("forceLang") 
      || params.get("lang") 
      || "de";
}

function mapLanguageToSalesforce(lang) {
  const langMap = {
    de: "D",
    fr: "F",
    it: "I",
    en: "E"
  };

  return langMap[lang] || "D"; // fallback German
}

function setSalesforceLanguage() {
  const lang = getLanguage();
  const sfLang = mapLanguageToSalesforce(lang);

  console.log("Detected lang:", lang);
  console.log("Mapped SF lang:", sfLang);

  const field = document.getElementById("language-field");

  console.log("Field:", field);

  if (field) {
    field.value = sfLang;
    console.log("Final field value:", field.value);
  } else {
    console.log("❌ language-field NOT FOUND");
  }
}

window.addEventListener("load", function () {
  formStartTime = Date.now();
  setSalesforceLanguage();
});