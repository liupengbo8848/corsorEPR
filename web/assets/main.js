const defaultApi = "https://example.com/api/leads";

function trackEvent(name, payload = {}) {
  const event = {
    name,
    payload,
    path: window.location.pathname,
    timestamp: new Date().toISOString()
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

function bindTracking() {
  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => {
      trackEvent("cta_click", { cta: el.getAttribute("data-track") });
    });
  });
}

function bindLeadForms() {
  document.querySelectorAll("form[data-lead-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const lead = Object.fromEntries(new FormData(form).entries());
      const endpoint = form.dataset.endpoint || defaultApi;
      trackEvent("lead_submit", { formType: lead.intent || "consulting" });
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead)
        });
        if (!response.ok) throw new Error("submit_failed");
        alert("提交成功，我们会在1个工作日内联系您。");
        form.reset();
      } catch (_error) {
        alert("当前是演示站，请将接口地址替换为真实CRM接口。");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bindTracking();
  bindLeadForms();
});
