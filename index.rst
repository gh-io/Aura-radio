<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>aura.web — Private Digital Ecosystem</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="aura — privacy-first search, tools, and services." />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="aura.web — Private Digital Ecosystem">
  <meta property="og:description" content="aura — privacy-first search, tools, and services.">

  <style>
    :root {
      --bg: #ffffff;
      --text: #1f1f1f;
      --muted: #5f6368;
      --accent: #7b5cff;
      --border: #dadce0;
      --card: #f8f9fa;
      --shadow: rgba(0,0,0,.08);
    }

    * {
      box-sizing: border-box;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    }

    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    header {
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
    }

    header .brand {
      font-weight: 700;
      font-size: 18px;
    }

    header nav a {
      margin-left: 16px;
      text-decoration: none;
      color: var(--muted);
      font-size: 14px;
    }

    main {
      flex: 1;
      padding: 48px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .logo {
      font-size: 56px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .logo span {
      color: var(--accent);
    }

    .search-box {
      width: 100%;
      max-width: 560px;
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-radius: 999px;
      border: 1px solid var(--border);
      box-shadow: 0 1px 3px var(--shadow);
      transition: box-shadow 0.2s;
    }

    .search-box:focus-within {
      box-shadow: 0 2px 6px var(--shadow);
    }

    .search-box input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 16px;
    }

    .search-box button {
      type: submit;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 18px;
      color: var(--accent);
      transition: transform 0.1s;
    }

    .search-box button:hover {
      transform: scale(1.1);
    }

    .engine {
      margin-top: 12px;
      font-size: 13px;
      color: var(--muted);
    }

    .engine select {
      margin-left: 6px;
      padding: 2px 4px;
      border-radius: 4px;
    }

    .ecosystem {
      margin-top: 64px;
      width: 100%;
      max-width: 1000px;
    }

    .ecosystem h2 {
      text-align: center;
      margin-bottom: 32px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
    }

    .card {
      background: var(--card);
      padding: 20px;
      border-radius: 12px;
      border: 1px solid var(--border);
      box-shadow: 0 1px 3px var(--shadow);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 10px var(--shadow);
    }

    .card h3 {
      margin-top: 0;
      margin-bottom: 8px;
    }

    .card p {
      font-size: 14px;
      color: var(--muted);
      margin-bottom: 12px;
      flex: 1;
    }

    .card button {
      padding: 8px 12px;
      font-size: 13px;
      border: 1px solid var(--border);
      background: #fff;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.2s, color 0.2s, border-color 0.2s;
    }

    .card button:hover:not(:disabled) {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
    }

    .card button[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    footer {
      border-top: 1px solid var(--border);
      padding: 16px;
      font-size: 13px;
      display: flex;
      justify-content: center;
      gap: 24px;
      color: var(--muted);
    }

    footer a {
      color: inherit;
      text-decoration: none;
    }

    /* Accessibility: visually hidden labels */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0,0,0,0);
      border: 0;
    }

    /* Responsive adjustments */
    @media (max-width: 600px) {
      main {
        padding: 24px 12px;
      }

      .search-box {
        padding: 8px 12px;
      }
    }

  </style>
</head>

<body>

<header>
  <div class="brand">aura</div>
  <nav>
    <a href="#">Search</a>
    <a href="#">Products</a>
    <a href="#">Privacy</a>
  </nav>
</header>

<main>

  <div class="logo">aura<span>.web</span></div>

  <form id="searchForm" class="search-box">
    <label for="query" class="sr-only">Search</label>
    <input id="query" placeholder="Search privately…" autocomplete="off" />
    <button type="submit">🔍</button>
  </form>

  <div class="engine">
    Engine:
    <select id="engine">
      <option value="startpage">Startpage</option>
      <option value="duckduckgo">DuckDuckGo</option>
      <option value="google">Google</option>
    </select>
  </div>

  <section class="ecosystem">
    <h2>The aura ecosystem</h2>

    <div class="grid">

      <div class="card">
        <h3>aura.radio</h3>
        <p>Ad-free radio, ambient streams, and curated music — no tracking.</p>
        <button>Open radio</button>
      </div>

      <div class="card">
        <h3>aura.build</h3>
        <p>Privacy-first website builder for developers & creators.</p>
        <button>Start building</button>
      </div>

      <div class="card">
        <h3>aura.finance</h3>
        <p>Stocks, crypto, and market insights without profiling.</p>
        <button>View markets</button>
      </div>

      <div class="card">
        <h3>aura.mail</h3>
        <p>Encrypted email designed for simplicity and security.</p>
        <button disabled aria-disabled="true">Coming soon</button>
      </div>

      <div class="card">
        <h3>aura.docs</h3>
        <p>Private notes and documents — yours only.</p>
        <button disabled aria-disabled="true">Coming soon</button>
      </div>

    </div>
  </section>

</main>

<footer>
  <a href="#">Privacy</a>
  <a href="#">Terms</a>
  <a href="#">Contact</a>
</footer>

<script>
  const form = document.getElementById("searchForm");
  const query = document.getElementById("query");
  const engine = document.getElementById("engine");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const q = query.value.trim();
    if (!q) return;

    let url;
    switch (engine.value) {
      case "startpage":
        url = "https://www.startpage.com/do/search?query=" + encodeURIComponent(q);
        break;
      case "duckduckgo":
        url = "https://duckduckgo.com/?q=" + encodeURIComponent(q);
        break;
      default:
        url = "https://www.google.com/search?q=" + encodeURIComponent(q);
    }
    // Open in the same tab
    window.location.href = url;
    // Optional: open in new tab instead:
    // window.open(url, "_blank");
  });
</script>

</body>
</html>
