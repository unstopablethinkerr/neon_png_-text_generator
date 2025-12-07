// script.js - combined & updated
const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d", { alpha: true });

const textInput = document.getElementById("textInput");
const sizeInput = document.getElementById("sizeInput");
const resolutionInput = document.getElementById("resolutionInput");
const customResolutionInput = document.getElementById("customResolution");
const downloadBtn = document.getElementById("downloadBtn");
const fontSelector = document.getElementById("fontSelector");
const colorPalette = document.getElementById("colorPalette");
const alignInput = document.getElementById("alignInput");
const lineHeightInput = document.getElementById("lineHeightInput");

const DEFAULT_TEXT = "Neon Vibes";
let neonColor = "#00eaff"; // default

// ----- FONT LIST (already defined earlier in your code) -----
const FONT_LIST = [
  { label: "Poppins (Default)", css: "Poppins", google: "Poppins:wght@300;700" },
  { label: "Roboto", css: "Roboto", google: "Roboto:wght@400;700" },
  { label: "Montserrat", css: "Montserrat", google: "Montserrat:wght@400;700" },
  { label: "Inter", css: "Inter", google: "Inter:wght@400;700" },
  { label: "Nunito", css: "Nunito", google: "Nunito:wght@400;800" },
  { label: "Quicksand", css: "Quicksand", google: "Quicksand:wght@400;700" },
  { label: "Lato", css: "Lato", google: "Lato:wght@400;700" },
  { label: "Open Sans", css: "Open Sans", google: "Open+Sans:wght@400;700" },
  { label: "Raleway", css: "Raleway", google: "Raleway:wght@400;700" },
  { label: "Work Sans", css: "Work Sans", google: "Work+Sans:wght@400;700" },
  { label: "Orbitron", css: "Orbitron", google: "Orbitron:wght@400;700" },
  { label: "Audiowide", css: "Audiowide", google: "Audiowide" },
  { label: "Exo 2", css: "Exo 2", google: "Exo+2:wght@400;700" },
  { label: "Teko", css: "Teko", google: "Teko:wght@400;700" },
  { label: "Rajdhani", css: "Rajdhani", google: "Rajdhani:wght@400;700" },
  { label: "Chakra Petch", css: "Chakra Petch", google: "Chakra+Petch:wght@400;700" },
  { label: "Syncopate", css: "Syncopate", google: "Syncopate:wght@400;700" },
  { label: "Encode Sans Semi Condensed", css: "Encode Sans Semi Condensed", google: "Encode+Sans+Semi+Condensed:wght@400;700" },
  { label: "Sarpanch", css: "Sarpanch", google: "Sarpanch:wght@400;700" },
  { label: "Jura", css: "Jura", google: "Jura:wght@400;700" },
  { label: "Press Start 2P", css: "Press Start 2P", google: "Press+Start+2P" },
  { label: "Monoton", css: "Monoton", google: "Monoton" },
  { label: "Righteous", css: "Righteous", google: "Righteous" },
  { label: "Bebas Neue", css: "Bebas Neue", google: "Bebas+Neue" },
  { label: "Black Ops One", css: "Black Ops One", google: "Black+Ops+One" },
  { label: "Kanit", css: "Kanit", google: "Kanit:wght@400;700" },
  { label: "Anton", css: "Anton", google: "Anton" },
  { label: "Russo One", css: "Russo One", google: "Russo+One" },
  { label: "Staatliches", css: "Staatliches", google: "Staatliches" },
  { label: "Bungee", css: "Bungee", google: "Bungee" },
  { label: "Dancing Script", css: "Dancing Script", google: "Dancing+Script:wght@700" },
  { label: "Pacifico", css: "Pacifico", google: "Pacifico" },
  { label: "Great Vibes", css: "Great Vibes", google: "Great+Vibes" },
  { label: "Satisfy", css: "Satisfy", google: "Satisfy" },
  { label: "Cookie", css: "Cookie", google: "Cookie" },
  { label: "Yellowtail", css: "Yellowtail", google: "Yellowtail" },
  { label: "Kaushan Script", css: "Kaushan Script", google: "Kaushan+Script" },
  { label: "Courgette", css: "Courgette", google: "Courgette" },
  { label: "Allura", css: "Allura", google: "Allura" },
  { label: "Handlee", css: "Handlee", google: "Handlee" },
  { label: "Playfair Display", css: "Playfair Display", google: "Playfair+Display:wght@400;700" },
  { label: "Cormorant Garamond", css: "Cormorant Garamond", google: "Cormorant+Garamond:wght@400;700" },
  { label: "Merriweather", css: "Merriweather", google: "Merriweather:wght@400;700" },
  { label: "Cinzel", css: "Cinzel", google: "Cinzel:wght@400;700" },
  { label: "Cormorant Upright", css: "Cormorant Upright", google: "Cormorant+Upright:wght@400;700" },
  { label: "Fredoka One", css: "Fredoka One", google: "Fredoka+One" },
  { label: "Luckiest Guy", css: "Luckiest Guy", google: "Luckiest+Guy" },
  { label: "Paytone One", css: "Paytone One", google: "Paytone+One" },
  { label: "Secular One", css: "Secular One", google: "Secular+One" },
  { label: "Pathway Gothic One", css: "Pathway Gothic One", google: "Pathway+Gothic+One" },
  { label: "Oswald", css: "Oswald", google: "Oswald:wght@400;700" },
  { label: "Rock Salt", css: "Rock Salt", google: "Rock+Salt" },
  { label: "Permanent Marker", css: "Permanent Marker", google: "Permanent+Marker" },
  { label: "Give You Glory", css: "Give You Glory", google: "Give+You+Glory" },
  { label: "Reenie Beanie", css: "Reenie Beanie", google: "Reenie+Beanie" },
  { label: "Gloria Hallelujah", css: "Gloria Hallelujah", google: "Gloria+Hallelujah" },
  { label: "Shadows Into Light", css: "Shadows Into Light", google: "Shadows+Into+Light" },
  { label: "Shadows Into Light Two", css: "Shadows Into Light Two", google: "Shadows+Into+Light+Two" },
  { label: "Covered By Your Grace", css: "Covered By Your Grace", google: "Covered+By+Your+Grace" },
  { label: "Cabin Sketch", css: "Cabin Sketch", google: "Cabin+Sketch:wght@400;700" },
  { label: "Finger Paint", css: "Finger Paint", google: "Finger+Paint" },
  { label: "Kranky", css: "Kranky", google: "Kranky" },
  { label: "Special Elite", css: "Special Elite", google: "Special+Elite" },
  { label: "Source Sans Pro", css: "Source Sans Pro", google: "Source+Sans+Pro:wght@400;700" },
  { label: "Ubuntu", css: "Ubuntu", google: "Ubuntu:wght@400;700" },
  { label: "Josefin Sans", css: "Josefin Sans", google: "Josefin+Sans:wght@400;700" },
  { label: "Hind", css: "Hind", google: "Hind:wght@400;700" },
  { label: "Mulish", css: "Mulish", google: "Mulish:wght@400;700" },
  { label: "Manrope", css: "Manrope", google: "Manrope:wght@400;700" },
  { label: "Barlow", css: "Barlow", google: "Barlow:wght@400;700" },
  { label: "Rubik", css: "Rubik", google: "Rubik:wght@400;700" },
  { label: "Fira Sans", css: "Fira Sans", google: "Fira+Sans:wght@400;700" },
  { label: "Aldrich", css: "Aldrich", google: "Aldrich" },
  { label: "Orbit", css: "Orbit", google: "Orbit" },
  { label: "Oxanium", css: "Oxanium", google: "Oxanium:wght@400;700" },
  { label: "Changa", css: "Changa", google: "Changa:wght@400;700" },
  { label: "Bowlby One", css: "Bowlby One", google: "Bowlby+One" },
  { label: "Saira Condensed", css: "Saira Condensed", google: "Saira+Condensed:wght@400;700" },
  { label: "Alfa Slab One", css: "Alfa Slab One", google: "Alfa+Slab+One" },
  { label: "Fugaz One", css: "Fugaz One", google: "Fugaz+One" },
  { label: "Bangers", css: "Bangers", google: "Bangers" },
  { label: "Chango", css: "Chango", google: "Chango" },
  { label: "Titan One", css: "Titan One", google: "Titan+One" },
  { label: "Vast Shadow", css: "Vast Shadow", google: "Vast+Shadow" },
  { label: "Ultra", css: "Ultra", google: "Ultra" },
  { label: "Shrikhand", css: "Shrikhand", google: "Shrikhand" },
  { label: "Amatic SC", css: "Amatic SC", google: "Amatic+SC:wght@400;700" },
  { label: "Indie Flower", css: "Indie Flower", google: "Indie+Flower" },
  { label: "Bad Script", css: "Bad Script", google: "Bad+Script" },
  { label: "Homemade Apple", css: "Homemade Apple", google: "Homemade+Apple" },
  { label: "Nothing You Could Do", css: "Nothing You Could Do", google: "Nothing+You+Could+Do" },
  { label: "Libre Baskerville", css: "Libre Baskerville", google: "Libre+Baskerville:wght@400;700" },
  { label: "Lora", css: "Lora", google: "Lora:wght@400;700" },
  { label: "Crimson Text", css: "Crimson Text", google: "Crimson+Text:wght@400;700" },
  { label: "Domine", css: "Domine", google: "Domine:wght@400;700" },
  { label: "STIX Two Text", css: "STIX Two Text", google: "STIX+Two+Text:wght@400;700" },
  { label: "Schoolbell", css: "Schoolbell", google: "Schoolbell" },
  { label: "Waiting for the Sunrise", css: "Waiting for the Sunrise", google: "Waiting+for+the+Sunrise" },
  { label: "Short Stack", css: "Short Stack", google: "Short+Stack" },
  { label: "Freckle Face", css: "Freckle Face", google: "Freckle+Face" },
  { label: "Just Another Hand", css: "Just Another Hand", google: "Just+Another+Hand" }
];

let currentFont = FONT_LIST[0].css; // default = Poppins

// ---------- Helpers: load Google Fonts & populate selector ----------
(function loadGoogleFonts() {
  const uniqueFamilies = [...new Set(FONT_LIST.map(f => f.google))].filter(Boolean);
  if (uniqueFamilies.length === 0) return;
  const href =
    "https://fonts.googleapis.com/css2?" +
    uniqueFamilies.map(f => "family=" + f).join("&") +
    "&display=swap";

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
})();

(function populateFontSelect() {
  FONT_LIST.forEach(font => {
    const opt = document.createElement("option");
    opt.value = font.css;
    opt.textContent = font.label;
    fontSelector.appendChild(opt);
  });
  fontSelector.value = currentFont;
})();

// ---------- Color palette ----------
colorPalette.querySelectorAll(".color-swatch").forEach(swatch => {
  const c = swatch.dataset.color;
  swatch.style.background = c;
  swatch.addEventListener("click", () => {
    neonColor = c;
    colorPalette.querySelectorAll(".color-swatch").forEach(s => s.classList.remove("selected"));
    swatch.classList.add("selected");
    drawNeon();
  });
});

// ---------- Resolution utils ----------
function parseResolution(value) {
  const parts = (value || "").toLowerCase().split(/[x×]/);
  return {
    w: parseInt(parts[0], 10) || 900,
    h: parseInt(parts[1], 10) || 400
  };
}

function setCanvasSize(w, h) {
  canvas.width = w;
  canvas.height = h;
  // visually scale canvas CSS width to container (keeps preview responsive)
  // (we rely on CSS to set #previewCanvas { width:100% } so don't set style here)
  drawNeon();
}

// initialize canvas to default preview resolution
setCanvasSize(900, 400);

// ---------- Text measuring & wrapping (used by both preview & export) ----------
function measureTextWidth(ctxObj, text, fontSpec) {
  ctxObj.save();
  ctxObj.font = fontSpec;
  const w = ctxObj.measureText(text).width;
  ctxObj.restore();
  return w;
}

// Wrap a paragraph (no explicit \n inside) into lines fitting maxWidth
function wrapLineToWidth(paragraph, maxWidth, fontSpec, ctxObj) {
  const words = paragraph.split(/\s+/);
  const lines = [];
  let current = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const test = current ? (current + " " + word) : word;
    const width = measureTextWidth(ctxObj, test, fontSpec);
    if (width <= maxWidth || current === "") {
      current = test;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

// Draw justified line inside maxWidth starting at x = left (padding)
function drawJustifiedLine(ctxObj, text, left, y, maxWidth, fontSpec) {
  const words = text.split(/\s+/);
  if (words.length === 1) {
    ctxObj.textAlign = "left";
    ctxObj.fillText(text, left, y);
    return;
  }
  let totalWordsWidth = 0;
  words.forEach(w => totalWordsWidth += measureTextWidth(ctxObj, w, fontSpec));
  const totalSpace = maxWidth - totalWordsWidth;
  const gap = totalSpace / (words.length - 1);

  let cursor = left;
  ctxObj.textAlign = "left";
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    ctxObj.fillText(w, cursor, y);
    const wWidth = measureTextWidth(ctxObj, w, fontSpec);
    cursor += wWidth + gap;
  }
}

// ---------- Core render function for a provided canvas context ----------
function renderTextOnContext(ctxObj, canvasW, canvasH, options = {}) {
  const {
    text = DEFAULT_TEXT,
    fontSize = 72,
    fontFamily = currentFont,
    color = neonColor,
    align = "center",
    lineHeight = parseFloat(lineHeightInput ? lineHeightInput.value : 1.2),
    padding = 40,
    isExport = false
  } = options;

  ctxObj.clearRect(0, 0, canvasW, canvasH);

  // prepare
  const fontSpec = `${fontSize}px "${fontFamily}", sans-serif`;
  ctxObj.font = fontSpec;
  ctxObj.textBaseline = "top";

  // splitting paragraphs by explicit newlines
  const paragraphs = text.split(/\n/);

  const maxWidth = canvasW - padding * 2;
  const lines = [];
  paragraphs.forEach((para) => {
    const trimmed = para.trim();
    if (trimmed === "") {
      // blank line placeholder
      lines.push({ text: "", isLastLineInParagraph: true });
      return;
    }
    const wrapped = wrapLineToWidth(trimmed, maxWidth, fontSpec, ctxObj);
    wrapped.forEach((ln, idx) => {
      lines.push({ text: ln, isLastLineInParagraph: idx === wrapped.length - 1 });
    });
  });

  const lineHeightPx = fontSize * lineHeight;
  const totalHeight = lines.length * lineHeightPx;
  // start Y: vertically center if text is shorter than canvas, otherwise start at padding
  let startY = Math.max(padding, (canvasH - totalHeight) / 2);

  // draw lines
  for (let i = 0; i < lines.length; i++) {
    const { text: lineText, isLastLineInParagraph } = lines[i];
    const y = startY + i * lineHeightPx;

    if (!lineText) continue; // blank line => skip (keep vertical spacing)

    // set font & base shadow settings
    ctxObj.font = fontSpec;

    // Neon outer glow
    ctxObj.shadowColor = color;
    ctxObj.shadowBlur = Math.max(12, fontSize * 0.55);
    ctxObj.fillStyle = color + (isExport ? "AA" : "AA");

    if (align === "justify" && !isLastLineInParagraph) {
      // draw glow for justified (left anchored)
      const leftX = padding;
      drawJustifiedLine(ctxObj, lineText, leftX, y, maxWidth, fontSpec);

      // inner core
      ctxObj.shadowBlur = 0;
      ctxObj.fillStyle = "#ffffff";
      drawJustifiedLine(ctxObj, lineText, leftX, y, maxWidth, fontSpec);
    } else {
      // normal align: left, center, right
      let x;
      if (align === "left") {
        ctxObj.textAlign = "left";
        x = padding;
      } else if (align === "right") {
        ctxObj.textAlign = "right";
        x = canvasW - padding;
      } else {
        ctxObj.textAlign = "center";
        x = canvasW / 2;
      }

      // glow pass
      ctxObj.fillStyle = color + (isExport ? "AA" : "AA");
      ctxObj.fillText(lineText, x, y);

      // inner core
      ctxObj.shadowBlur = 0;
      ctxObj.fillStyle = "#ffffff";
      ctxObj.fillText(lineText, x, y);
    }
  }

  // reset shadow
  ctxObj.shadowBlur = 0;
  ctxObj.shadowColor = "transparent";
}

// ---------- drawNeon (preview) ----------
function drawNeon() {
  const text = textInput.value || DEFAULT_TEXT;
  const fontSize = parseInt(sizeInput.value, 10) || 72;
  const color = neonColor || "#00eaff";
  const align = alignInput ? alignInput.value : "center";
  const lineHeight = lineHeightInput ? parseFloat(lineHeightInput.value) : 1.2;

  renderTextOnContext(ctx, canvas.width, canvas.height, {
    text,
    fontSize,
    fontFamily: currentFont,
    color,
    align,
    lineHeight,
    padding: 40,
    isExport: false
  });
}

// ---------- High-res export ----------
function generateFinalPNG() {
  let selected = resolutionInput.value;
  if (selected === "custom") {
    selected = customResolutionInput.value;
  }
  const { w, h } = parseResolution(selected);

  // create export canvas
  const exportCanvas = document.createElement("canvas");
  const ectx = exportCanvas.getContext("2d", { alpha: true });
  exportCanvas.width = w;
  exportCanvas.height = h;

  // choose scaled font size proportional to base preview width (900)
  const previewBase = 900;
  const fontSizePreview = parseInt(sizeInput.value, 10) || 72;
  const scaledFontSize = Math.max(10, Math.round(fontSizePreview * (w / previewBase)));

  renderTextOnContext(ectx, w, h, {
    text: textInput.value || DEFAULT_TEXT,
    fontSize: scaledFontSize,
    fontFamily: currentFont,
    color: neonColor,
    align: alignInput ? alignInput.value : "center",
    lineHeight: lineHeightInput ? parseFloat(lineHeightInput.value) : 1.2,
    padding: Math.round(40 * (w / previewBase)),
    isExport: true
  });

  // prepare download: set download link href to data URL and trigger download if clicked
  downloadBtn.href = exportCanvas.toDataURL("image/png");
  // if user clicked the button (generateFinalPNG called from click handler), allow default anchor behavior to download
}

// ---------- Event handlers ----------

// resolution UI
resolutionInput.addEventListener("change", () => {
  if (resolutionInput.value === "custom") {
    customResolutionInput.style.display = "inline-block";
  } else {
    customResolutionInput.style.display = "none";
    const { w, h } = parseResolution(resolutionInput.value);
    setCanvasSize(w, h);
  }
});

customResolutionInput.addEventListener("change", () => {
  const v = customResolutionInput.value.trim();
  const m = v.match(/^(\d+)\s*[x×]\s*(\d+)$/i);
  if (m) {
    setCanvasSize(parseInt(m[1], 10), parseInt(m[2], 10));
  } else {
    alert("Please enter custom resolution like 2000x500");
  }
});

// live preview updates
textInput.addEventListener("input", drawNeon);
sizeInput.addEventListener("input", drawNeon);
if (alignInput) alignInput.addEventListener("change", drawNeon);
if (lineHeightInput) lineHeightInput.addEventListener("input", drawNeon);

// font change -> wait for font to load, then redraw
fontSelector.addEventListener("change", () => {
  currentFont = fontSelector.value;
  if (document.fonts && document.fonts.load) {
    // load a representative weight/size — helps ensure text renders correctly
    document.fonts.load(`72px "${currentFont}"`).then(drawNeon).catch(drawNeon);
  } else {
    drawNeon();
  }
});

// download click
downloadBtn.addEventListener("click", (e) => {
  // generate final PNG and let the anchor link (downloadBtn) carry the data URL to the user
  generateFinalPNG();
  // if downloadBtn is an <a>, the href is now set; allow default navigation
});

// initial draw after fonts are loaded
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(drawNeon).catch(drawNeon);
} else {
  drawNeon();
}

// ---------- share button + toast (kept from your script) ----------
const shareBtn = document.getElementById("share-btn");
const copyToast = document.getElementById("copy-toast");

function showToast() {
  copyToast.classList.add("show");
  setTimeout(() => {
    copyToast.classList.remove("show");
  }, 2000);
}

async function copyCurrentUrl() {
  const url = window.location.href;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      const tempInput = document.createElement("input");
      tempInput.value = url;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    }
    showToast();
  } catch (err) {
    console.error("Failed to copy: ", err);
    alert("Could not copy the link.");
  }
}

if (shareBtn) shareBtn.addEventListener("click", copyCurrentUrl);
