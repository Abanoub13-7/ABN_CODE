(function () {
  "use strict";

  const form = document.getElementById("contactForm");
  if (!form) {
    return;
  }

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const status = document.getElementById("contactFormStatus");
  const submitButton = form.querySelector('button[type="submit"]');
  let isSubmitting = false;

  function showStatus(messageKey, type) {
    status.setAttribute("data-i18n", messageKey);
    status.textContent = window.portfolioLanguage.translate(messageKey);
    status.className = "mt-3 mb-0 text-" + type;
    status.hidden = false;
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name) {
      showStatus("form.errorName", "danger");
      nameInput.focus();
      return;
    }
    if (!email || !emailInput.checkValidity()) {
      showStatus("form.errorEmail", "danger");
      emailInput.focus();
      return;
    }
    if (!message) {
      showStatus("form.errorMessage", "danger");
      messageInput.focus();
      return;
    }

    isSubmitting = true;
    submitButton.disabled = true;
    showStatus("form.sending", "muted");

    try {
      const formData = new FormData(form);
      formData.set("name", name);
      formData.set("email", email);
      formData.set("message", message);
      formData.set("_replyto", email);
      formData.set(
        "_subject",
        window.portfolioLanguage.translate("form.emailSubject").replace("{name}", name)
      );

      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData
      });
      const result = await response.json();
      const resultMessage = result && typeof result.message === "string"
        ? result.message
        : "";
      const activationRequired = /activat|verif|confirm/i.test(resultMessage);

      if (activationRequired) {
        showStatus("form.activation", "warning");
        return;
      }

      if (!response.ok || !result || (result.success !== true && result.success !== "true")) {
        showStatus("form.failure", "danger");
        return;
      }

      showStatus("form.success", "success");
      form.reset();
    } catch {
      showStatus("form.networkFailure", "danger");
    } finally {
      isSubmitting = false;
      submitButton.disabled = false;
    }
  });
})();
