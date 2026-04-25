const SITE_NAME = "北京天潞科技有限公司";

function buildMenu(current) {
  const links = [
    ["index.html", "首页", "index"],
    ["solutions.html", "解决方案", "solutions"],
    ["industries.html", "行业方案", "industries"],
    ["cases.html", "成功案例", "cases"],
    ["services.html", "服务体系", "services"],
    ["about.html", "关于我们", "about"],
    ["resources.html", "资源中心", "resources"],
    ["contact.html", "联系我们", "contact"]
  ];

  return links
    .map(([href, label, key]) => {
      const cls = current === key ? "class=\"active\"" : "";
      return `<a ${cls} href="${href}">${label}</a>`;
    })
    .join("");
}

function injectLayout() {
  const page = document.body.dataset.page || "";
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  const floating = document.getElementById("floating-cta");

  if (header) {
    header.innerHTML = `
      <div class="container nav">
        <a class="brand" href="index.html">
          <img src="assets/images/company-logo.png" alt="${SITE_NAME} Logo">
          <span class="brand-name">${SITE_NAME}</span>
        </a>
        <nav class="menu">${buildMenu(page)}</nav>
      </div>
    `;
  }

  if (footer) {
    footer.innerHTML = `
      <div class="container footer-grid">
        <div>
          <strong>${SITE_NAME}</strong>
          <p>企业数字化解决方案服务商</p>
        </div>
        <div>
          <p>咨询热线：400-800-1234</p>
          <p>商务邮箱：bd@tianluweb.com</p>
        </div>
      </div>
    `;
  }

  if (floating) {
    floating.innerHTML = `
      <a data-track="floating_phone" href="tel:4008001234">电话咨询</a>
      <a data-track="floating_wechat" href="contact.html">微信咨询</a>
      <a data-track="floating_booking" href="contact.html">预约顾问</a>
    `;
  }
}

document.addEventListener("DOMContentLoaded", injectLayout);
