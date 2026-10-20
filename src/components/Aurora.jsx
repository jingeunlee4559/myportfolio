import { useEffect, useRef } from "react";
import { reduced } from "../lib/env";
import { useDark } from "../lib/theme";

const VS = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }";
const FS = `precision highp float;
uniform vec2 uR; uniform float uT; uniform vec2 uM; uniform float uDark;
vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
void main(){
  float s = min(uR.x, uR.y);
  vec2 uv = gl_FragCoord.xy / uR;
  vec2 p = (gl_FragCoord.xy - 0.5 * uR) / s;
  vec2 mp = (uM - 0.5) * uR / s;
  float t = uT * 0.14;
  float n1 = snoise(p * 1.3 + vec2(t, -t * 0.7) + mp * 0.35);
  float n2 = snoise(p * 2.1 + vec2(-t * 0.8, t) + n1 * 0.9);
  float n3 = snoise(p * 0.9 + n2 * 0.7 + vec2(t * 0.5, t * 0.3));
  vec3 base = mix(vec3(0.953, 0.976, 1.0), vec3(0.02, 0.03, 0.09), uDark);
  vec3 blue = vec3(0.184, 0.549, 1.0);
  vec3 cyan = vec3(0.24, 0.88, 1.0);
  vec3 vio  = vec3(0.50, 0.36, 1.0);
  vec3 pink = vec3(1.0, 0.54, 0.82);
  float a = smoothstep(-0.25, 0.8, n1);
  float b = smoothstep(-0.3, 0.75, n2);
  float c = smoothstep(-0.1, 0.95, n3);
  vec3 col = base;
  col = mix(col, cyan, a * mix(0.42, 0.45, uDark));
  col = mix(col, blue, b * mix(0.34, 0.7, uDark));
  col = mix(col, vio, c * mix(0.2, 0.55, uDark) * smoothstep(0.05, 0.9, uv.y * 0.6 + n2 * 0.3 + 0.3));
  col = mix(col, pink, smoothstep(0.5, 1.0, n3 + n1 * 0.35) * mix(0.26, 0.4, uDark));
  float d = length(p - mp);
  col = mix(col, vec3(1.0), exp(-d * d * 5.0) * 0.5 * (1.0 - uDark));
  col += vec3(0.1, 0.3, 0.7) * exp(-d * d * 5.0) * 0.35 * uDark;
  float fade = mix(smoothstep(0.0, 0.34, uv.y), 1.0, uDark);
  col = mix(vec3(1.0), col, fade);
  col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.02;
  gl_FragColor = vec4(col, 1.0);
}`;

// 마우스를 따라 일렁이는 오로라 배경 (WebGL). 안 되는 환경에서는 부모의 CSS 배경이 그대로 보입니다.
function AuroraGL({ dark = false, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    const gl = cv.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;
    const mk = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
      return s;
    };
    const vs = mk(gl.VERTEX_SHADER, VS), fs = mk(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return;
    const pg = gl.createProgram();
    gl.attachShader(pg, vs); gl.attachShader(pg, fs); gl.linkProgram(pg);
    if (!gl.getProgramParameter(pg, gl.LINK_STATUS)) return;
    gl.useProgram(pg);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pg, "p");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(pg, "uR"), uT = gl.getUniformLocation(pg, "uT"), uM = gl.getUniformLocation(pg, "uM"), uD = gl.getUniformLocation(pg, "uDark");
    gl.uniform1f(uD, dark ? 1 : 0);

    const K = 0.55; // 부드러운 그림이라 절반 정도 해상도로 그려도 충분합니다
    const m = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let raf = 0, vis = true, t0 = performance.now();
    const size = () => {
      const w = Math.max(2, Math.round(cv.clientWidth * K)), h = Math.max(2, Math.round(cv.clientHeight * K));
      cv.width = w; cv.height = h; gl.viewport(0, 0, w, h); gl.uniform2f(uR, w, h);
    };
    const draw = (t) => {
      m.x += (m.tx - m.x) * 0.06; m.y += (m.ty - m.y) * 0.06;
      gl.uniform1f(uT, t); gl.uniform2f(uM, m.x, m.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!vis || document.hidden) return;
      draw((performance.now() - t0) / 1000);
    };
    const move = (e) => {
      const r = cv.getBoundingClientRect();
      m.tx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      m.ty = Math.min(1, Math.max(0, 1 - (e.clientY - r.top) / r.height));
    };
    size();
    if (reduced) draw(3); else raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }, { threshold: 0 });
    io.observe(cv);
    window.addEventListener("resize", size);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener("resize", size); window.removeEventListener("pointermove", move);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [dark]);
  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}

// 라이트: WebGL 오로라. 다크: 남색 바탕 위에 파랑·보라·분홍 빛이 천천히 떠다니는 CSS 오로라 (캔버스가 밝게 남는 문제가 없습니다).
export default function Aurora({ dark, className = "" }) {
  const d = useDark(), v = dark ?? d;
  if (!v) return <AuroraGL dark={false} className={className} />;
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} aria-hidden="true">
      <span className="drift absolute -left-[10%] -top-[25%] h-[65%] w-[55%] rounded-full bg-accent/35 blur-[110px]" />
      <span className="drift absolute -right-[10%] top-[5%] h-[60%] w-[50%] rounded-full bg-violet/30 blur-[120px]" style={{ animationDelay: "-5s" }} />
      <span className="drift absolute -bottom-[25%] left-[22%] h-[55%] w-[50%] rounded-full bg-pink/20 blur-[120px]" style={{ animationDelay: "-10s" }} />
      <span className="drift absolute bottom-[10%] -left-[8%] h-[40%] w-[30%] rounded-full bg-cyan/20 blur-[110px]" style={{ animationDelay: "-3s" }} />
    </div>
  );
}
