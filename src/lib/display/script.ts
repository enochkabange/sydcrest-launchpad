import { STORAGE_KEY, THEME_COLOR } from "./prefs";

/**
 * Runs in <head> before the first paint (app/layout.tsx), so a saved theme or
 * text size never flashes in after the page shows. Kept tiny and in plain
 * ES5: it runs on every page load on every phone. It mirrors rootAttributes
 * in prefs.ts (script.test.ts keeps them in step) and exposes itself as
 * window.__sydDisplay so the settings controls re-apply through the same code.
 *
 * "system" theme removes data-theme, which lets the prefers-color-scheme
 * rules in tokens.css follow the device, even with JavaScript off.
 */
export const DISPLAY_SCRIPT = `(function(){var d=document.documentElement;function s(n,v){if(v)d.setAttribute(n,v);else d.removeAttribute(n)}function a(){var p={};try{p=JSON.parse(localStorage.getItem(${JSON.stringify(
  STORAGE_KEY,
)}))||{}}catch(e){}var t=p.theme==="light"||p.theme==="dark"?p.theme:null;s("data-theme",t);s("data-text-size",p.textSize===112||p.textSize===125||p.textSize===150?String(p.textSize):null);s("data-motion",p.motion==="reduce"?"reduce":null);s("data-contrast",p.contrast==="more"?"more":null);s("data-underline-links",p.underlineLinks===true?"on":null);s("data-spacing",p.spacing==="wide"?"wide":null);s("data-font",p.font==="system"?"system":null);var m=document.querySelectorAll('meta[name="theme-color"]');for(var i=0;i<m.length;i++){var k=t?t==="dark":/dark/.test(m[i].media||"");m[i].setAttribute("content",k?"${THEME_COLOR.dark}":"${THEME_COLOR.light}")}}window.__sydDisplay=a;a()})()`;
