const BTC_ADDRESS = "bc1qpj9q0qkaa00pme96x3ctck3paze2lj277jfqc4";

document.querySelectorAll("[data-page]").forEach(el => {
  el.addEventListener("click", () => {
    const page = el.dataset.page;
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.querySelector(`.nav-btn[data-page="${page}"]`)?.classList.add("active");
    document.getElementById(page)?.classList.add("active");
  });
});

const payOverlay = document.getElementById("pay-overlay");
const addrEl = document.getElementById("pay-address");

if (addrEl) addrEl.textContent = BTC_ADDRESS;

function copyAddress() {
  const addr = (addrEl && addrEl.textContent) ? addrEl.textContent.trim() : BTC_ADDRESS;
  const btn = document.getElementById("copy-addr");

  function ok() {
    if (!btn) return;
    const old = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => { btn.textContent = old; }, 1500);
  }

  function fail() {
    if (addrEl) {
      const range = document.createRange();
      range.selectNodeContents(addrEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
    alert("Select the address and copy it manually (Ctrl+C / Cmd+C).");
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(addr).then(ok).catch(fail);
  } else {
    const ta = document.createElement("textarea");
    ta.value = addr;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      const worked = document.execCommand("copy");
      document.body.removeChild(ta);
      if (worked) ok();
      else fail();
    } catch (e) {
      document.body.removeChild(ta);
      fail();
    }
  }
}

document.getElementById("copy-addr")?.addEventListener("click", copyAddress);

document.getElementById("pay-confirm")?.addEventListener("click", () => {
  if (payOverlay) payOverlay.hidden = false;
});

document.getElementById("close-pay")?.addEventListener("click", () => {
  if (payOverlay) payOverlay.hidden = true;
});