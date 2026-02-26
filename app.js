const content = document.getElementById("content");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");

const state = {
  language: "English",
  lastQuestion: "My chickens are not eating."
};

function setActiveNav(route) {
  document.querySelectorAll(".nav-link").forEach(a => {
    a.classList.toggle("active", a.dataset.route === route);
  });
}

function routeFromHash() {
  const hash = window.location.hash || "#/dashboard";
  const match = hash.match(/^#\/([a-z]+)/i);
  return match ? match[1].toLowerCase() : "dashboard";
}

function renderDashboard() {
  pageTitle.textContent = "Dashboard";
  pageSubtitle.textContent = "Hello. What do you want to do today?";

  content.innerHTML = `
    <div class="row">
      <span class="badge">Language: ${state.language}</span>
      <span class="badge">Prototype Mode</span>
      <a class="btn secondary" href="#/language">Language Settings</a>
    </div>

    <div class="grid-3">
      <div class="card">
        <h3>Ask AI Assistant</h3>
        <p>Describe a crop or livestock issue in simple words and get guidance and prevention tips.</p>
        <div class="row">
          <a class="btn" href="#/ask">Open Ask AI</a>
        </div>
      </div>

      <div class="card">
        <h3>Knowledge Base</h3>
        <p>Beginner-friendly guides for poultry, soil preparation, planting, and farm hygiene.</p>
        <div class="row">
          <a class="btn" href="#/knowledge">Open Knowledge</a>
        </div>
      </div>

      <div class="card">
        <h3>Disease Alerts</h3>
        <p>Simple alerts that help farmers act early and reduce losses in the community.</p>
        <div class="row">
          <a class="btn" href="#/alerts">View Alerts</a>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>What this prototype shows</h3>
      <p>
        MavunoMind AI is designed to help small-scale African farmers access clear, timely farming support.
        This prototype demonstrates the user experience and the core flow of the product.
      </p>
    </div>
  `;
}

function renderAsk() {
  pageTitle.textContent = "Ask AI";
  pageSubtitle.textContent = "Type your issue and see the guidance (demo response).";

  content.innerHTML = `
    <div class="card">
      <h3>Ask MavunoMind AI</h3>
      <p>Write what is happening with your crop or livestock. This is a prototype, so responses are simulated.</p>

      <div class="form">
        <textarea id="q" placeholder="Example: My chickens are not eating.">${state.lastQuestion}</textarea>

        <div class="row">
          <button class="btn" id="askBtn">Get Guidance</button>
          <a class="btn secondary" href="#/dashboard">Back</a>
        </div>
      </div>
    </div>

    <div class="panel" id="answerPanel" style="display:none"></div>
  `;

  document.getElementById("askBtn").addEventListener("click", () => {
    const q = document.getElementById("q").value.trim() || "My chickens are not eating.";
    state.lastQuestion = q;

    const panel = document.getElementById("answerPanel");
    panel.style.display = "block";
    panel.innerHTML = buildResponse(q);
  });
}

function buildResponse(question) {
  const q = question.toLowerCase();

  let causes = ["Stress", "Dirty water", "Poor nutrition"];
  let tips = [
    "Replace water and clean feeders",
    "Separate weak animals early",
    "Monitor temperature and ventilation"
  ];
  let note = "If symptoms spread quickly or many animals are affected, consult a local vet or extension officer.";

  if (q.includes("chicken") || q.includes("hen") || q.includes("poultry")) {
    causes = ["Heat stress", "Respiratory infection", "Parasites or worms", "Feed quality issues"];
    tips = [
      "Check clean water and shade",
      "Isolate sick birds and clean the coop",
      "Improve ventilation and reduce overcrowding",
      "Consider a deworming plan if needed"
    ];
    note = "If multiple birds show breathing issues, act early to reduce spread.";
  } else if (q.includes("maize") || q.includes("corn") || q.includes("yellow leaves")) {
    causes = ["Nutrient deficiency", "Overwatering", "Soil pH imbalance"];
    tips = [
      "Check drainage and spacing",
      "Add compost or balanced fertilizer",
      "Adjust watering schedule and observe changes"
    ];
    note = "Make one change at a time and monitor the crop for a few days.";
  }

  return `
    <div class="card" style="margin:0;">
      <h3>Guidance</h3>
      <p><strong>Question:</strong> ${escapeHtml(question)}</p>

      <div class="kv" style="margin-top:12px;">
        <div>
          <strong>Possible causes</strong>
          <ul class="list">
            ${causes.map(c => `<li>${c}</li>`).join("")}
          </ul>
        </div>

        <div>
          <strong>Prevention and next steps</strong>
          <ul class="list">
            ${tips.map(t => `<li>${t}</li>`).join("")}
          </ul>
        </div>

        <div class="panel alert">
          <strong>Important</strong>
          <div style="margin-top:8px; color:#7C2D12;">${escapeHtml(note)}</div>
        </div>

        <div class="row">
          <a class="btn" href="#/alerts">Check Alerts</a>
          <a class="btn secondary" href="#/knowledge">Open Knowledge Base</a>
        </div>
      </div>
    </div>
  `;
}

function renderAlerts() {
  pageTitle.textContent = "Disease Alerts";
  pageSubtitle.textContent = "Early awareness helps reduce losses.";

  content.innerHTML = `
    <div class="card alert">
      <h3>Poultry flu risk detected in your region</h3>
      <p>
        Recommended action: strengthen hygiene, limit movement between farms, and isolate sick birds early.
      </p>
      <div class="row">
        <a class="btn" href="#/ask">Ask about symptoms</a>
        <a class="btn secondary" href="#/dashboard">Back</a>
      </div>
    </div>

    <div class="card">
      <h3>How alerts can scale</h3>
      <p>
        In future versions, alerts can combine community reports and verified sources, then show them by location.
      </p>
    </div>
  `;
}

function renderKnowledge() {
  pageTitle.textContent = "Knowledge Base";
  pageSubtitle.textContent = "Quick guides for small farms.";

  content.innerHTML = `
    <div class="grid-3">
      <div class="card">
        <h3>Poultry health basics</h3>
        <p>Clean water, ventilation, dry bedding, and early isolation reduce disease spread.</p>
        <div class="row">
          <a class="btn secondary" href="#/ask">Ask AI</a>
        </div>
      </div>

      <div class="card">
        <h3>Soil preparation</h3>
        <p>Use compost, improve drainage, and plant with spacing to reduce pests and rot.</p>
      </div>

      <div class="card">
        <h3>Weather planning</h3>
        <p>Protect livestock during extreme heat and plan planting times to reduce loss risk.</p>
      </div>
    </div>

    <div class="card">
      <h3>Future improvements</h3>
      <p>More local language content, short video guides, and community question sharing.</p>
    </div>
  `;
}

function renderLanguage() {
  pageTitle.textContent = "Language";
  pageSubtitle.textContent = "Start with English, then expand.";

  content.innerHTML = `
    <div class="card">
      <h3>Language settings</h3>
      <p>English is active in this prototype. Other languages are planned for expansion.</p>

      <div class="row">
        <button class="btn" data-lang="English">English (active)</button>
        <button class="btn secondary" data-lang="isiZulu">isiZulu (planned)</button>
        <button class="btn secondary" data-lang="Swahili">Swahili (planned)</button>
      </div>

      <div class="panel" style="margin-top:14px;">
        <strong>Current:</strong> <span style="color: var(--muted); font-weight:700;">${state.language}</span>
        <div style="margin-top:8px; color: var(--muted);">
          The platform is structured so language support can grow without rebuilding the whole system.
        </div>
      </div>

      <div class="row">
        <a class="btn secondary" href="#/dashboard">Back</a>
      </div>
    </div>
  `;

  content.querySelectorAll("button[data-lang]").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      state.language = lang;
      renderLanguage();
    });
  });
}

function renderNotFound() {
  pageTitle.textContent = "Not Found";
  pageSubtitle.textContent = "Use the menu to navigate.";

  content.innerHTML = `
    <div class="card">
      <h3>Page not found</h3>
      <p>This route does not exist. Use the menu on the left.</p>
      <div class="row">
        <a class="btn" href="#/dashboard">Go to Dashboard</a>
      </div>
    </div>
  `;
}

function escapeHtml(str){
  return str
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function render() {
  const route = routeFromHash();
  setActiveNav(route);

  switch(route){
    case "dashboard": renderDashboard(); break;
    case "ask": renderAsk(); break;
    case "alerts": renderAlerts(); break;
    case "knowledge": renderKnowledge(); break;
    case "language": renderLanguage(); break;
    default: renderNotFound(); break;
  }
}

window.addEventListener("hashchange", render);
window.addEventListener("load", () => {
  if(!window.location.hash) window.location.hash = "#/dashboard";
  render();
});
