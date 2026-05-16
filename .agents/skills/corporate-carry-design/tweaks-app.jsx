// tweaks-app.jsx — Corporate Carry tweaks panel

const CC_TAGLINES = {
  modern: "modern",
  busy: "busy",
  prepared: "prepared",
  organized: "organized",
  hybrid: "hybrid"
};

const CC_TAGLINE_SUBS = {
  modern: "A curated guide to the gadgets, tools, and backpack essentials that help office professionals work smarter — minus the gimmicks, the affiliate sludge, and the listicles you'll never finish reading.",
  busy:   "Office gadgets, work-bag essentials, and time-saving tools for people whose calendars are already full enough.",
  prepared: "The chargers, pouches, notebooks, and quiet little tools that make you the most prepared person in the conference room.",
  organized: "A curated kit for professionals who'd rather walk into Monday with a system than a to-do list of errands.",
  hybrid: "The work-bag essentials, desk upgrades, and travel kit for people splitting Tuesdays at the office and Thursdays at the kitchen table."
};

const ACCENT_PRESETS = {
  "#a16207": { tint: "#f0e6cd", hover: "#854d0e" }, // dijon
  "#1d4ed8": { tint: "#e0e7ff", hover: "#1e3a8a" }, // royal
  "#9a3412": { tint: "#fde8e0", hover: "#7c2d12" }, // brick
  "#15803d": { tint: "#dcfce7", hover: "#14532d" }, // moss
  "#0f172a": { tint: "#e2e8f0", hover: "#020617" }, // ink (monochrome accent)
};

const BG_PRESETS = {
  "#f6f1e6": { soft: "#efe8d6", surface: "#fbf7ec", paper: "#fffdf6", hairline: "#ddd2b8" }, // cream
  "#f4f4f0": { soft: "#e8e8df", surface: "#fafaf6", paper: "#ffffff", hairline: "#d8d8cf" }, // bone
  "#eaebe7": { soft: "#dededa", surface: "#f1f1ed", paper: "#fafaf6", hairline: "#c8cac3" }, // stone
  "#1c1714": { soft: "#2a221c", surface: "#241d18", paper: "#2f2620", hairline: "#3b3027" }, // night
};

function hexToRGB(h) {
  const x = h.replace('#','');
  const r = parseInt(x.slice(0,2),16), g = parseInt(x.slice(2,4),16), b = parseInt(x.slice(4,6),16);
  return [r,g,b];
}
function isDark(h) {
  const [r,g,b] = hexToRGB(h);
  const lum = (0.2126*r + 0.7152*g + 0.0722*b)/255;
  return lum < 0.4;
}

function isValidRgba(value) {
  return /^rgba\(\s*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,\s*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,\s*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,\s*(?:0|1|0?\.\d+)\s*\)$/i.test(String(value || '').trim());
}

function rgbaAlpha(value, fallback) {
  const m = String(value || '').trim().match(
    /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/i,
  );
  if (!m) return fallback;
  const n = Number(m[1]);
  return Number.isNaN(n) ? fallback : Math.max(0, Math.min(1, n));
}

function hexToRgba(hex, alpha) {
  const [r, g, b] = hexToRGB(hex);
  return `rgba(${r}, ${g}, ${b}, ${Number(alpha).toFixed(2)})`;
}

function CCApp() {
  const defaults = window.__TWEAK_DEFAULTS || {
    accent: "#a16207",
    bg: "#f6f1e6",
    tagline: "modern",
    density: "comfortable",
    showGrain: true,
    headlineStyle: "italic-serif",
    highlightRgba: "rgba(240, 230, 205, 0.9)",
    overlayBgRgba: "rgba(250, 249, 247, 0.78)",
  };
  const [t, setTweak] = useTweaks(defaults);

  // Apply theme as CSS variables on :root
  React.useEffect(() => {
    const root = document.documentElement;
    const accent = ACCENT_PRESETS[t.accent] || ACCENT_PRESETS["#a16207"];
    const bg = BG_PRESETS[t.bg] || BG_PRESETS["#f6f1e6"];
    const dark = isDark(t.bg);
    const overlayBg = isValidRgba(t.overlayBgRgba)
      ? t.overlayBgRgba.trim()
      : 'rgba(250, 249, 247, 0.78)';
    const highlightBg = isValidRgba(t.highlightRgba)
      ? t.highlightRgba.trim()
      : accent.tint;

    root.style.setProperty('--accent', t.accent);
    root.style.setProperty('--accent-2', accent.hover);
    root.style.setProperty('--accent-tint', accent.tint);
    root.style.setProperty('--cc-highlight-rgba', highlightBg);
    root.style.setProperty('--twk-bg', overlayBg);

    root.style.setProperty('--bg', t.bg);
    root.style.setProperty('--bg-soft', bg.soft);
    root.style.setProperty('--surface', bg.surface);
    root.style.setProperty('--paper', bg.paper);
    root.style.setProperty('--hairline', bg.hairline);

    if (dark) {
      root.style.setProperty('--ink',      '#f3eee5');
      root.style.setProperty('--ink-2',    '#dccfba');
      root.style.setProperty('--ink-soft', '#a09080');
      root.style.setProperty('--ink-mute', '#6e6354');
      root.style.setProperty('--hairline-2','#5a4d3f');
    } else {
      root.style.setProperty('--ink',      '#1a1614');
      root.style.setProperty('--ink-2',    '#2c2722');
      root.style.setProperty('--ink-soft', '#5d564d');
      root.style.setProperty('--ink-mute', '#8a8275');
      root.style.setProperty('--hairline-2', t.bg === '#eaebe7' ? '#b3b6ad' : '#cfc29f');
    }

    // density
    const den = t.density === 'compact' ? 0.75 : t.density === 'roomy' ? 1.2 : 1;
    document.querySelectorAll('.section').forEach(s => {
      s.style.paddingTop = (72 * den) + 'px';
      s.style.paddingBottom = (72 * den) + 'px';
    });

    // Grain
    let grain = document.getElementById('cc-grain');
    if (t.showGrain) {
      if (!grain) {
        grain = document.createElement('div');
        grain.id = 'cc-grain';
        grain.style.cssText = `
          position: fixed; inset: 0; pointer-events: none; z-index: 9999;
          mix-blend-mode: multiply; opacity: 0.06;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/></svg>");
        `;
        document.body.appendChild(grain);
      }
      grain.style.display = 'block';
    } else if (grain) {
      grain.style.display = 'none';
    }
  }, [t.accent, t.bg, t.density, t.showGrain, t.highlightRgba, t.overlayBgRgba]);

  // Tagline word + sub
  React.useEffect(() => {
    document.querySelectorAll('[data-tagline-em]').forEach(el => {
      el.textContent = CC_TAGLINES[t.tagline] || "modern";
    });
    document.querySelectorAll('[data-tagline-sub]').forEach(el => {
      el.textContent = CC_TAGLINE_SUBS[t.tagline] || CC_TAGLINE_SUBS.modern;
    });
  }, [t.tagline]);

  // Headline emphasis style
  React.useEffect(() => {
    let style = document.getElementById('cc-headline-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'cc-headline-style';
      document.head.appendChild(style);
    }
    if (t.headlineStyle === 'italic-serif') {
      style.textContent = `
        h1 .em, .em {
          font-style: italic;
          font-family: "Times New Roman", "Times", serif;
          font-weight: 500;
          color: var(--accent);
          letter-spacing: -0.02em;
        }`;
    } else if (t.headlineStyle === 'underline-sans') {
      style.textContent = `
        h1 .em, .em {
          font-style: normal;
          font-family: var(--font-sans);
          font-weight: 600;
          color: var(--ink);
          letter-spacing: -0.03em;
          text-decoration: underline;
          text-decoration-color: var(--accent);
          text-decoration-thickness: 6px;
          text-underline-offset: 8px;
        }`;
    } else if (t.headlineStyle === 'highlight') {
      style.textContent = `
        h1 .em, .em {
          font-style: normal;
          font-family: var(--font-sans);
          font-weight: 600;
          color: var(--ink);
          letter-spacing: -0.03em;
          background: var(--cc-highlight-rgba, var(--accent-tint));
          padding: 0 0.1em;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }`;
    } else if (t.headlineStyle === 'mono') {
      style.textContent = `
        h1 .em, .em {
          font-style: normal;
          font-family: var(--font-mono);
          font-weight: 500;
          color: var(--accent);
          letter-spacing: -0.04em;
          font-size: 0.86em;
        }`;
    }
  }, [t.headlineStyle]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Theme" />
      <TweakColor
        label="Accent"
        value={t.accent}
        options={Object.keys(ACCENT_PRESETS)}
        onChange={(v) => {
          const next = ACCENT_PRESETS[v] || ACCENT_PRESETS['#a16207'];
          const alpha = rgbaAlpha(t.highlightRgba, 0.9);
          setTweak({
            accent: v,
            highlightRgba: hexToRgba(next.tint, alpha),
          });
        }}
      />
      <TweakColor
        label="Background"
        value={t.bg}
        options={Object.keys(BG_PRESETS)}
        onChange={(v) => {
          const alpha = rgbaAlpha(t.overlayBgRgba, 0.78);
          setTweak({
            bg: v,
            overlayBgRgba: hexToRgba(v, alpha),
          });
        }}
      />
      <TweakToggle
        label="Paper grain"
        value={t.showGrain}
        onChange={(v) => setTweak('showGrain', v)}
      />
      <TweakRgba
        label="Highlight RGBA"
        value={t.highlightRgba || ''}
        placeholder="rgba(240, 230, 205, 0.9)"
        fallbackHex={(ACCENT_PRESETS[t.accent] || ACCENT_PRESETS['#a16207']).tint}
        fallbackAlpha={0.9}
        onChange={(v) => setTweak('highlightRgba', v)}
      />
      <TweakRgba
        label="Overlay BG RGBA"
        value={t.overlayBgRgba || ''}
        placeholder="rgba(250, 249, 247, 0.78)"
        fallbackHex={t.bg || '#f6f1e6'}
        fallbackAlpha={0.78}
        onChange={(v) => setTweak('overlayBgRgba', v)}
      />

      <TweakSection label="Headline" />
      <TweakSelect
        label="Emphasis style"
        value={t.headlineStyle}
        options={[
          { value: 'italic-serif', label: 'Italic serif' },
          { value: 'underline-sans', label: 'Underlined sans' },
          { value: 'highlight', label: 'Highlighted block' },
          { value: 'mono', label: 'Monospace' },
        ]}
        onChange={(v) => setTweak('headlineStyle', v)}
      />
      <TweakSelect
        label="Tagline word"
        value={t.tagline}
        options={[
          { value: 'modern', label: 'modern professional' },
          { value: 'busy', label: 'busy professional' },
          { value: 'prepared', label: 'prepared professional' },
          { value: 'organized', label: 'organized professional' },
          { value: 'hybrid', label: 'hybrid professional' },
        ]}
        onChange={(v) => setTweak('tagline', v)}
      />

      <TweakSection label="Layout" />
      <TweakRadio
        label="Density"
        value={t.density}
        options={['compact', 'comfortable', 'roomy']}
        onChange={(v) => setTweak('density', v)}
      />
    </TweaksPanel>
  );
}

(function mount() {
  const el = document.createElement('div');
  el.id = 'cc-tweaks-root';
  document.body.appendChild(el);
  ReactDOM.createRoot(el).render(<CCApp />);
})();
