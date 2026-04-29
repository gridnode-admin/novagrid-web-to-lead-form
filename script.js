const formStartTime = Date.now();

function beforeSubmit() {
  const company = document.getElementById("company");
  const lastName = document.getElementById("last_name");
  const honeypot = document.getElementById("website");

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

  return true;
}