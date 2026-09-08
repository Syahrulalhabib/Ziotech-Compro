import { DICTIONARY } from './dictionary.js';

// Google Translate GTX endpoint with localStorage caching
const TRANSLATE_CACHE_KEY = 'ziotech_translations_cache_v2';

function getCache() {
  try {
    return JSON.parse(localStorage.getItem(TRANSLATE_CACHE_KEY) || '{}');
  } catch {
    return {};
  }
}

function setCache(cache) {
  try {
    localStorage.setItem(TRANSLATE_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // ignore quota error
  }
}

export async function translateText(text, targetLang = 'en', sourceLang = 'id') {
  if (!text || typeof text !== 'string' || !text.trim() || targetLang === sourceLang) {
    return text;
  }

  const trimmed = text.trim();

  // 1. Instant check from local dictionary (0ms latency, handles known data)
  if (targetLang === 'en' && DICTIONARY[trimmed]) {
    return DICTIONARY[trimmed];
  }

  // 2. Check localStorage cache
  const cache = getCache();
  const cacheKey = `${sourceLang}_${targetLang}:${trimmed}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  // 3. Fallback to Google Translate GTX API for custom dynamic content
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(trimmed)}`;
    const res = await fetch(url);
    if (!res.ok) return text;
    const json = await res.json();
    const translated = (json[0] || []).map(seg => seg[0]).join('');
    if (translated) {
      cache[cacheKey] = translated;
      setCache(cache);
      return translated;
    }
    return text;
  } catch (err) {
    console.warn('Translation failed, fallback to original:', err);
    return text;
  }
}

export async function translateContent(data, targetLang = 'en') {
  if (!data || targetLang !== 'en') return data;

  const clone = JSON.parse(JSON.stringify(data));

  // Translate home
  if (clone.home) {
    if (clone.home.heroTitle) clone.home.heroTitle = await translateText(clone.home.heroTitle);
    if (clone.home.heroSubtitle) clone.home.heroSubtitle = await translateText(clone.home.heroSubtitle);
    if (clone.home.introBadge) clone.home.introBadge = await translateText(clone.home.introBadge);
    if (clone.home.introTitle) clone.home.introTitle = await translateText(clone.home.introTitle);
    if (clone.home.introDescription) clone.home.introDescription = await translateText(clone.home.introDescription);
    if (clone.home.introDescription2) clone.home.introDescription2 = await translateText(clone.home.introDescription2);
    if (clone.home.introTag) clone.home.introTag = await translateText(clone.home.introTag);
    if (clone.home.clientPartnersTitle) clone.home.clientPartnersTitle = await translateText(clone.home.clientPartnersTitle);
    if (Array.isArray(clone.home.heroTitles)) {
      clone.home.heroTitles = await Promise.all(clone.home.heroTitles.map(t => translateText(t)));
    }
  }

  // Translate about
  if (clone.about) {
    if (clone.about.title) clone.about.title = await translateText(clone.about.title);
    if (clone.about.description) clone.about.description = await translateText(clone.about.description);
    if (clone.about.vision) clone.about.vision = await translateText(clone.about.vision);
    if (clone.about.mission) clone.about.mission = await translateText(clone.about.mission);
  }

  // Translate pageHeaders
  if (clone.pageHeaders) {
    for (const page of Object.keys(clone.pageHeaders)) {
      if (clone.pageHeaders[page]?.title) {
        clone.pageHeaders[page].title = await translateText(clone.pageHeaders[page].title);
      }
      if (clone.pageHeaders[page]?.subtitle) {
        clone.pageHeaders[page].subtitle = await translateText(clone.pageHeaders[page].subtitle);
      }
    }
  }

  // Translate services
  if (Array.isArray(clone.services)) {
    clone.services = await Promise.all(
      clone.services.map(async (svc) => {
        if (!svc) return svc;
        const s = { ...svc };
        if (s.title) s.title = await translateText(s.title);
        if (s.description) s.description = await translateText(s.description);
        if (Array.isArray(s.features)) {
          s.features = await Promise.all(s.features.map(f => translateText(f)));
        }
        return s;
      })
    );
  }

  // Translate projects
  if (Array.isArray(clone.projects)) {
    clone.projects = await Promise.all(
      clone.projects.map(async (proj) => {
        if (!proj) return proj;
        const p = { ...proj };
        if (p.title) p.title = await translateText(p.title);
        if (p.description) p.description = await translateText(p.description);
        if (p.category) p.category = await translateText(p.category);
        if (p.location) p.location = await translateText(p.location);
        return p;
      })
    );
  }

  // Translate company
  if (clone.company) {
    if (clone.company.workingHours) clone.company.workingHours = await translateText(clone.company.workingHours);
  }

  return clone;
}
