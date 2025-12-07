const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");

const textInput = document.getElementById("textInput");
const sizeInput = document.getElementById("sizeInput");
const resolutionInput = document.getElementById("resolutionInput");
const customResolutionInput = document.getElementById("customResolution");
const downloadBtn = document.getElementById("downloadBtn");
const fontSelector = document.getElementById("fontSelector");

const DEFAULT_TEXT = "Neon Vibes";
let neonColor = "#00eaff"; // default
const colorPalette = document.getElementById("colorPalette");

// --- FONT CONFIG: dynamically used for both Google Fonts + select list ---
const FONT_LIST = [
  // --- DEFAULT ---
  { label: "Poppins (Default)", css: "Poppins", google: "Poppins:wght@300;700" },

  // --- MODERN / CLEAN ---
  { label: "Roboto", css: "Roboto", google: "Roboto:wght@400;700" },
  { label: "Montserrat", css: "Montserrat", google: "Montserrat:wght@400;700" },
  { label: "Inter", css: "Inter", google: "Inter:wght@400;700" },
  { label: "Nunito", css: "Nunito", google: "Nunito:wght@400;800" },
  { label: "Quicksand", css: "Quicksand", google: "Quicksand:wght@400;700" },
  { label: "Lato", css: "Lato", google: "Lato:wght@400;700" },
  { label: "Open Sans", css: "Open Sans", google: "Open+Sans:wght@400;700" },
  { label: "Raleway", css: "Raleway", google: "Raleway:wght@400;700" },
  { label: "Work Sans", css: "Work Sans", google: "Work+Sans:wght@400;700" },

  // --- FUTURISTIC / TECHNO / CYBER ---
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

  // --- RETRO / ARCADE / DISPLAY ---
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

  // --- SCRIPT / HANDWRITING ---
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

  // --- ELEGANT / LUXURY / SERIF ---
  { label: "Playfair Display", css: "Playfair Display", google: "Playfair+Display:wght@400;700" },
  { label: "Cormorant Garamond", css: "Cormorant Garamond", google: "Cormorant+Garamond:wght@400;700" },
  { label: "Merriweather", css: "Merriweather", google: "Merriweather:wght@400;700" },
  { label: "Cinzel", css: "Cinzel", google: "Cinzel:wght@400;700" },
  { label: "Cormorant Upright", css: "Cormorant Upright", google: "Cormorant+Upright:wght@400;700" },

  // --- BOLD LOGO / DISPLAY FONTS ---
  { label: "Fredoka One", css: "Fredoka One", google: "Fredoka+One" },
  { label: "Luckiest Guy", css: "Luckiest Guy", google: "Luckiest+Guy" },
  { label: "Paytone One", css: "Paytone One", google: "Paytone+One" },
  { label: "Secular One", css: "Secular One", google: "Secular+One" },
  { label: "Pathway Gothic One", css: "Pathway Gothic One", google: "Pathway+Gothic+One" },
  { label: "Oswald", css: "Oswald", google: "Oswald:wght@400;700" },
  // --- GRAFFITI / URBAN ---  
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
// --- MODERN / CLEAN (More Sans-Serif) ---
{ label: "Source Sans Pro", css: "Source Sans Pro", google: "Source+Sans+Pro:wght@400;700" },
{ label: "Ubuntu", css: "Ubuntu", google: "Ubuntu:wght@400;700" },
{ label: "Josefin Sans", css: "Josefin Sans", google: "Josefin+Sans:wght@400;700" },
{ label: "Hind", css: "Hind", google: "Hind:wght@400;700" },
{ label: "Mulish", css: "Mulish", google: "Mulish:wght@400;700" },
{ label: "Manrope", css: "Manrope", google: "Manrope:wght@400;700" },
{ label: "Barlow", css: "Barlow", google: "Barlow:wght@400;700" },
{ label: "Rubik", css: "Rubik", google: "Rubik:wght@400;700" },
{ label: "Fira Sans", css: "Fira Sans", google: "Fira+Sans:wght@400;700" },

// --- FUTURISTIC / TECHNO / CYBER (More Sci-Fi) ---
{ label: "Aldrich", css: "Aldrich", google: "Aldrich" },
{ label: "Orbit", css: "Orbit", google: "Orbit" },
{ label: "Oxanium", css: "Oxanium", google: "Oxanium:wght@400;700" },
{ label: "Changa", css: "Changa", google: "Changa:wght@400;700" },
{ label: "Bowlby One", css: "Bowlby One", google: "Bowlby+One" },
{ label: "Saira Condensed", css: "Saira Condensed", google: "Saira+Condensed:wght@400;700" },

// --- RETRO / ARCADE / DISPLAY (More Bold Display Fonts) ---
{ label: "Alfa Slab One", css: "Alfa Slab One", google: "Alfa+Slab+One" },
{ label: "Fugaz One", css: "Fugaz One", google: "Fugaz+One" },
{ label: "Bangers", css: "Bangers", google: "Bangers" },
{ label: "Chango", css: "Chango", google: "Chango" },
{ label: "Titan One", css: "Titan One", google: "Titan+One" },
{ label: "Vast Shadow", css: "Vast Shadow", google: "Vast+Shadow" },
{ label: "Ultra", css: "Ultra", google: "Ultra" },
{ label: "Shrikhand", css: "Shrikhand", google: "Shrikhand" },

// --- SCRIPT / HANDWRITING (Extra Playful / Brush Styles) ---
{ label: "Amatic SC", css: "Amatic SC", google: "Amatic+SC:wght@400;700" },
{ label: "Indie Flower", css: "Indie Flower", google: "Indie+Flower" },
{ label: "Bad Script", css: "Bad Script", google: "Bad+Script" },
{ label: "Homemade Apple", css: "Homemade Apple", google: "Homemade+Apple" },
{ label: "Nothing You Could Do", css: "Nothing You Could Do", google: "Nothing+You+Could+Do" },

// --- ELEGANT / LUXURY / SERIF (More High-End Serif Fonts) ---
{ label: "Libre Baskerville", css: "Libre Baskerville", google: "Libre+Baskerville:wght@400;700" },
{ label: "Lora", css: "Lora", google: "Lora:wght@400;700" },
{ label: "Crimson Text", css: "Crimson Text", google: "Crimson+Text:wght@400;700" },
{ label: "Domine", css: "Domine", google: "Domine:wght@400;700" },
{ label: "STIX Two Text", css: "STIX Two Text", google: "STIX+Two+Text:wght@400;700" },

// --- GRAFFITI / URBAN (More edgy / marker-style fonts) ---
{ label: "Schoolbell", css: "Schoolbell", google: "Schoolbell" },
{ label: "Waiting for the Sunrise", css: "Waiting for the Sunrise", google: "Waiting+for+the+Sunrise" },
{ label: "Short Stack", css: "Short Stack", google: "Short+Stack" },
{ label: "Freckle Face", css: "Freckle Face", google: "Freckle+Face" },
{ label: "Just Another Hand", css: "Just Another Hand", google: "Just+Another+Hand" },

];


let currentFont = FONT_LIST[0].css; // default = Poppins

// --- 1) Inject Google Fonts link dynamically ---
(function loadGoogleFonts() {
  const uniqueFamilies = [...new Set(FONT_LIST.map(f => f.google))];

  const href =
    "https://fonts.googleapis.com/css2?" +
    uniqueFamilies.map(f => "family=" + f).join("&") +
    "&display=swap";

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
})();

// --- 2) Populate font <select> dynamically ---
(function populateFontSelect() {
  FONT_LIST.forEach(font => {
    const opt = document.createElement("option");
    opt.value = font.css;
    opt.textContent = font.label;
    fontSelector.appendChild(opt);
  });

  fontSelector.value = currentFont;
})();

// --- 3) Color palette logic ---
colorPalette.querySelectorAll(".color-swatch").forEach(swatch => {
  const c = swatch.dataset.color;
  swatch.style.background = c;

  swatch.addEventListener("click", () => {
    neonColor = c;

    colorPalette.querySelectorAll(".color-swatch").forEach(s =>
      s.classList.remove("selected")
    );
    swatch.classList.add("selected");

    drawNeon();
  });
});

// --- 4) Resolution parsing ---
function parseResolution(value) {
  const parts = (value || "").toLowerCase().split("x");
  return {
    w: parseInt(parts[0], 10) || 900,
    h: parseInt(parts[1], 10) || 400
  };
}

// --- 5) Core drawing for PREVIEW canvas ---
function drawNeon() {
  const text = textInput.value.trim() || DEFAULT_TEXT;
  const fontSize = parseInt(sizeInput.value, 10) || 72;
  const color = neonColor || "#00f5ff";

  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${fontSize}px "${currentFont}", sans-serif`;

  const x = w / 2;
  const y = h / 2;

  ctx.shadowColor = color;
  ctx.shadowBlur = 40;
  ctx.fillStyle = color + "AA";
  ctx.fillText(text, x, y);

  ctx.shadowBlur = 10;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(text, x, y);

  ctx.restore();
}

// --- 6) High-res export with chosen resolution + font ---
function generateFinalPNG() {
  let selected = resolutionInput.value;

  if (selected === "custom") {
    selected = customResolutionInput.value;
  }

  const { w, h } = parseResolution(selected);

  const exportCanvas = document.createElement("canvas");
  const ectx = exportCanvas.getContext("2d");

  exportCanvas.width = w;
  exportCanvas.height = h;

  const text = textInput.value.trim() || DEFAULT_TEXT;
  const fontSize = parseInt(sizeInput.value, 10) || 72;
  const color = neonColor;

  ectx.clearRect(0, 0, w, h);
  ectx.save();
  ectx.textAlign = "center";
  ectx.textBaseline = "middle";

  // scale font size relative to base width (900)
  const scaledSize = fontSize * (w / 900);
  ectx.font = `${scaledSize}px "${currentFont}", sans-serif`;

  const x = w / 2;
  const y = h / 2;

  ectx.shadowColor = color;
  ectx.shadowBlur = 80;
  ectx.fillStyle = color + "AA";
  ectx.fillText(text, x, y);

  ectx.shadowBlur = 20;
  ectx.fillStyle = "#ffffff";
  ectx.fillText(text, x, y);

  ectx.restore();

  // Set link href for download
  downloadBtn.href = exportCanvas.toDataURL("image/png");
}

// --- 7) Event handlers ---

// show/hide custom resolution input
resolutionInput.addEventListener("change", () => {
  customResolutionInput.style.display =
    resolutionInput.value === "custom" ? "inline-block" : "none";
});

// live preview updates
textInput.addEventListener("input", drawNeon);
sizeInput.addEventListener("input", drawNeon);

// font change -> wait for font to load, then redraw
fontSelector.addEventListener("change", () => {
  currentFont = fontSelector.value;
  // ensure the font is loaded before drawing
  if (document.fonts && document.fonts.load) {
    document.fonts.load(`72px "${currentFont}"`).then(drawNeon);
  } else {
    // fallback if document.fonts unsupported
    drawNeon();
  }
});

// download click
downloadBtn.addEventListener("click", () => {
  generateFinalPNG();
});

// --- 8) Initial draw (after fonts are likely loaded) ---
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(drawNeon);
} else {
  drawNeon();
}
