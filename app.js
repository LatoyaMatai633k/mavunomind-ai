const content = document.getElementById("content");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");

const state = {
  language: "English",
  lastQuestion: "My chickens are not eating.",
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
  pageSubtitle.textContent = "Hello Farmer 👋 How can Mavuno help today?";
  content.innerHTML = `
    <div class="row">
      <span class="badge">Language: ${state.language}</span>
      <span class="badge">Prototype Mode</span>
      <a class="btn secondary" href="#/language">Change Language</a>
    </div>

    <div class="grid-3">
      <div class="card">
        <h3>🤖 Ask Mavuno AI</h3>
        <p>Describe a crop or livestock issue in simple words and get guidance + prevention tips.</p>
        <div class="row" style="margin-top:12px">
          <a class="btn" href="#/ask">Open Ask AI</a>
        </div>
      </div>

      <div class="card">
        <h3>📚 Farming Tips</h3>
        <p>Beginner-friendly guides for poultry, soil, planting, and farm hygiene best practices.</p>
        <div class="row" style="margin-top:12px">
          <a class="btn" href="#/knowledge">Open Knowledge</a>
        </div>
      </div>

      <div class="card">
        <h3>🚨 Disease Alerts</h3>
        <p>Simple alerts to help farmers act early and reduce losses in the community.</p>
        <div class="row" style="margin-top:12px">
          <a class="btn" href="#/alerts">View Alerts</a>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>What MavunoMind AI is solving</h3>
      <p>Many small-scale farmers lack timely, clear farming support — leading to preventable losses. This dashboard shows how farmers can get guidance quickly, in a simple and scalable way.</p>
    </div>
  `;
}

function renderAsk() {
  pageTitle.textContent = "Ask AI";
  pageSubtitle.textContent = "Ask a question about crops or livestock — get practical guidance.";
  content.innerHTML = `
    <div class="card">
      <h3>Ask MavunoMind AI</h3>
      <p>Type your issue below. (Prototype uses a mock AI response.)</p>
      <hr class="hr"/>
      <div class="form">
        <textarea id="q" placeholder="Example: My chickens are not eating.">${state.lastQuestion}</textarea>
        <div class="row">
          <button class="btn" id="askBtn">Get Guidance</button>
          <a class="btn secondary" href="#/dashboard">Back to Dashboard</a>
        </div>
      </div>
    </div>

    <div class="panel" id="answerPanel" style="display:none"></div>
  `;

  document.getElementById("askBtn").addEventListener("click", () => {
    const q = document.getElementById("q").value.trim() || "My chickens are not eating.";
    state.lastQuestion = q;
    const response = mockAIResponse(q);
    const panel = document.getElementById("answerPanel");
    panel.style.display = "block";
    panel.innerHTML = response;
  });
}

function mockAIResponse(question) {
  // Simple keyword-based demo. Looks believable for Stage 2 prototype.
  const q = question.toLowerCase();
  let causes = ["Stress", "Dirty water", "Poor nutrition"];
  let tips = ["Replace water and clean feeders", "Separate weak chickens", "Monitor temperature and ventilation"];
  let note = "If symptoms get worse or many birds are affected, consult a local vet/extension officer.";

  if (q.includes("chicken") || q.includes("hen") || q.includes("poultry")) {
    causes = ["Heat stress", "Respiratory infection", "Parasites or worms", "Feed quality issues"];
    tips = ["Check water supply and shade", "Isolate sick birds", "Clean coop and bedding", "Consider deworming schedule"];
    note = "If multiple birds show breathing issues, act early and follow local guidance to prevent spread.";
  } else if (q.includes("maize") || q.includes("corn") || q.includes("yellow leaves")) {
    causes = ["Nitrogen deficiency", "Overwatering", "Soil pH imbalance"];
    tips = ["Test soil if possible", "Use compost or balanced fertilizer", "Improve drainage and spacing"];
    note = "Track changes over 3–5 days and adjust one thing at a time.";
  }

  return `
    <div class="card" style="margin:0;">
      <h3>🤖 MavunoMind AI Guidance</h3>
      <p class="muted">Question: <strong>${escapeHtml(question)}</strong></p>
      <hr class="hr"/>

      <div class="kv">
        <div>
          <strong>Possible causes</strong>
          <ul class="list">
            ${causes.map(c => `<li>${c}</li>`).join("")}
          </ul>
        </div>

        <div>
          <strong>Prevention & next steps</strong>
          <ul class="list">
            ${tips.map(t => `<li>${t}</li>`).join("")}
          </ul>
        </div>

        <div class="alert panel">
          <strong>Important</strong>
          <div class="muted" style="margin-top:6px">${note}</div>
        </div>

        <div class="row">
          <a class="btn" href="#/alerts">Check Alerts</a>
          <a class="btn secondary" href="#/knowledge">Learn More</a>
        </div>
      </div>
    </div>
  `;
}

function renderAlerts() {
  pageTitle.textContent = "Disease Alerts";
  pageSubtitle.textContent = "Early awareness helps reduce losses across the community.";
  content.innerHTML = `
    <div class="card alert">
      <h3>🚨 Poultry flu risk detected in your region</h3>
      <p>Action: strengthen coop hygiene, limit movement between farms, isolate sick birds early.</p>
      <div class="row" style="margin-top:12px">
        <a class="btn" href="#/ask">Ask AI about symptoms</a>
        <a class="btn secondary" href="#/dashboard">Back</a>
      </div>
    </div>

    <div class="card">
      <h3>How alerts work (prototype)</h3>
      <p>In future versions, alerts can be powered by community reports + verified sources, then displayed by location.</p>
    </div>
  `;
}

function renderKnowledge() {
  pageTitle.textContent = "Knowledge Base";
  pageSubtitle.textContent = "Beginner-friendly guides for small African farms.";
  content.innerHTML = `
    <div class="grid-3">
      <div class="card">
        <h3>🐔 Poultry Health Basics</h3>
        <p>Clean water, good ventilation, dry bedding, and early isolation reduce disease spread.</p>
        <div class="row" style="margin-top:12px">
          <a class="btn" href="#/ask">Ask AI</a>
        </div>
      </div>
      <div class="card">
        <h3>🌱 Soil Preparation</h3>
        <p>Start with compost, improve drainage, and plant with spacing to reduce pests and rot.</p>
      </div>
      <div class="card">
        <h3>🌦️ Weather & Planning</h3>
        <p>Plan planting times and protect livestock during extreme heat or cold snaps.</p>
      </div>
    </div>

    <div class="card">
      <h3>Future improvement</h3>
      <p>Add local language content + short videos + community Q&A for farmer-to-farmer learning.</p>
    </div>
  `;
}

function renderLanguage() {
  pageTitle.textContent = "Language Settings";
  pageSubtitle.textContent = "Start small, then expand for accessibility across Africa.";
  content.innerHTML = `
    <div class="card">
      <h3>🌍 Choose Language</h3>
      <p>Prototype starts with English, with planned expansion.</p>
      <hr class="hr"/>
      <div class="row">
        <button class="btn" data-lang="English">English (active)</button>
        <button class="btn secondary" data-lang="isiZulu">isiZulu (coming soon)</button>
        <button class="btn secondary" data-lang="Swahili">Swahili (future)</button>
      </div>
      <div class="panel" style="margin-top:12px">
        <strong>Current:</strong> <span class="muted">${state.language}</span>
        <div class="muted small" style="margin-top:6px">
          In later versions, MavunoMind AI can add translation and local phrasing support without rebuilding the platform.
        </div>
      </div>
    </div>
  `;

  content.querySelectorAll("button[data-lang]").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      // Only switch to English in prototype; others stay "planned"
      state.language = lang === "English" ? "English" : `${lang} (planned)`;
      renderLanguage();
    });
  });
}

function renderNotFound() {
  pageTitle.textContent = "Not Found";
  pageSubtitle.textContent = "That page does not exist.";
  content.innerHTML = `
    <div class="card">
      <h3>Page not found</h3>
      <p class="muted">Use the sidebar to navigate.</p>
      <div class="row" style="margin-top:12px">
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
