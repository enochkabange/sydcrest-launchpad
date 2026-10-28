import * as R from "react";
export default function Form(p) {
  var o = {}, k;
  for (k in p) if (["replace", "scroll", "prefetch"].indexOf(k) < 0) o[k] = p[k];
  if (typeof o.action === "function") { var a = o.action; o.action = undefined; o.onSubmit = function (e) { e.preventDefault(); }; }
  return R.createElement("form", o);
}
