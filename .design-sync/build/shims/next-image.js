import * as R from "react";
export default function Image(p) {
  var o = {}, k;
  for (k in p) if (["priority", "fill", "quality", "placeholder", "blurDataURL", "loader", "unoptimized", "sizes"].indexOf(k) < 0) o[k] = p[k];
  if (typeof o.src === "object" && o.src) o.src = o.src.src;
  return R.createElement("img", o);
}
