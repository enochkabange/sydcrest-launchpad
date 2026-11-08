import * as R from "react";
var Link = R.forwardRef(function Link(p, ref) {
  var o = {}, k;
  for (k in p) if (["href", "prefetch", "replace", "scroll", "shallow", "passHref", "legacyBehavior", "locale", "onNavigate", "as"].indexOf(k) < 0) o[k] = p[k];
  var h = p.href;
  o.href = typeof h === "string" ? h : h && h.pathname ? h.pathname + (h.query ? "?" + new URLSearchParams(h.query).toString() : "") : "#";
  o.ref = ref;
  return R.createElement("a", o);
});
export default Link;
