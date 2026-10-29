import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { FaArrowLeft, FaArrowRight, FaArrowsRotate, FaCalendarDays, FaChartPie, FaCheck, FaChevronDown, FaDesktop, FaGithub, FaLightbulb, FaLink, FaMagnifyingGlass, FaRobot, FaServer, FaTriangleExclamation, FaTrophy, FaUserGear, FaUsers, FaWrench } from "react-icons/fa6";
import { projects } from "../../data/projects";
import { THEMES } from "../../data/themes";

const EASE = [0.16, 1, 0.3, 1];
const ROLE_ICON = { Frontend: FaDesktop, Backend: FaServer, AI: FaRobot };
const list = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 28, filter: "blur(8px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } } };
// 대표색 위에서 글자가 읽히도록 밝기에 따라 검정/흰색을 고릅니다.
const textOn = (hex) => { const n = parseInt(hex.slice(1), 16), l = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255); return l > 165 ? "#0a0b10" : "#ffffff"; };

// **굵게** 표시와 `코드` 표시를 살립니다.
const Rich = ({ text = "" }) =>
  text.split(/(\*\*.+?\*\*|`.+?`)/g).map((t, i) => {
    if (t.startsWith("**")) return <b key={i} className="font-bold text-ink">{t.slice(2, -2)}</b>;
    if (t.startsWith("`")) return <code key={i} className="rounded-md bg-accent/10 px-1.5 py-0.5 font-mono text-[0.88em] text-accent">{t.slice(1, -1)}</code>;
    return t;
  });

/* ───────────── 갤러리: 큰 화면 + 썸네일 + 확대 ───────────── */
function Gallery({ images, title }) {
  const [ref, api] = useEmblaCarousel({ loop: images.length > 1 });
  const [cur, setCur] = useState(0);
  const [zoom, setZoom] = useState(null);
  const thumbs = useRef(null);

  useEffect(() => {
    if (!api) return;
    const on = () => setCur(api.selectedScrollSnap());
    api.on("select", on);
    const key = (e) => {
      if (e.key === "Escape" && zoom) { e.stopPropagation(); setZoom(null); return; }
      if (e.key === "ArrowRight") api.scrollNext();
      if (e.key === "ArrowLeft") api.scrollPrev();
    };
    document.addEventListener("keydown", key, true);
    return () => { api.off("select", on); document.removeEventListener("keydown", key, true); };
  }, [api, zoom]);

  // 선택된 썸네일이 가운데 오도록 스크롤 (모달 전체는 움직이지 않게 가로로만)
  useEffect(() => {
    const box = thumbs.current, el = box?.children[cur];
    if (box && el) box.scrollTo({ left: el.offsetLeft - (box.clientWidth - el.clientWidth) / 2, behavior: "smooth" });
  }, [cur]);

  const nav = "absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-white/90 text-ink shadow-lg backdrop-blur transition hover:scale-110 hover:border-[var(--pm-c)] hover:bg-[var(--pm-c)] hover:text-[var(--pm-fg,#fff)]";
  const many = images.length > 1;
  return (
    <div>
      <div className="relative">
        <div ref={ref} className="overflow-hidden rounded-3xl">
          <div className="flex">
            {images.map((src, k) => (
              <div key={src} className="min-w-0 flex-[0_0_100%]">
                <figure className="overflow-hidden rounded-3xl border border-line bg-s2 shadow-[0_40px_80px_-40px_rgba(0,0,0,.45)]">
                  <div className="flex h-9 items-center gap-1.5 border-b border-line bg-paper px-4" aria-hidden="true">
                    <i className="h-2.5 w-2.5 rounded-full bg-[#ff6159]" /><i className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c940]" />
                    <span className="ml-3 truncate display text-[11px] font-semibold text-mute">{title}</span>
                  </div>
                  <button type="button" onClick={() => setZoom(src)} aria-label={`${k + 1}번째 화면 크게 보기`} className="group relative block w-full cursor-zoom-in bg-s2">
                    <img src={src} alt={`${title} 화면 ${k + 1}`} loading={k < 2 ? "eager" : "lazy"} className="mx-auto block h-[clamp(300px,64vh,700px)] w-full object-contain" />
                    <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-bold text-white opacity-0 backdrop-blur transition group-hover:opacity-100">클릭해서 크게 보기</span>
                  </button>
                </figure>
              </div>
            ))}
          </div>
        </div>
        {many && (
          <>
            <button type="button" aria-label="이전 화면" onClick={() => api?.scrollPrev()} className={`${nav} left-3`}><FaArrowLeft aria-hidden="true" /></button>
            <button type="button" aria-label="다음 화면" onClick={() => api?.scrollNext()} className={`${nav} right-3`}><FaArrowRight aria-hidden="true" /></button>
          </>
        )}
      </div>

      {many && (
        <div className="mt-4 flex items-center gap-4">
          <p className="shrink-0 display text-sm tabular-nums text-mute"><span className="text-accent">{String(cur + 1).padStart(2, "0")}</span> / {String(images.length).padStart(2, "0")}</p>
          <div ref={thumbs} className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
            {images.map((src, k) => (
              <button key={src} type="button" onClick={() => api?.scrollTo(k)} aria-label={`${k + 1}번째 화면 보기`} aria-current={k === cur}
                className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-xl border-2 bg-s2 transition ${k === cur ? "border-accent opacity-100" : "border-transparent opacity-55 hover:opacity-100"}`}>
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
              </button>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {zoom && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={() => setZoom(null)} className="fixed inset-0 z-[90] grid cursor-zoom-out place-items-center bg-ink/85 modal-bd p-4 backdrop-blur-md md:p-10" role="dialog" aria-modal="true" aria-label="화면 크게 보기">
            <motion.img initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} src={zoom} alt={`${title} 확대 화면`} className="max-h-full max-w-full rounded-2xl bg-white object-contain" />
            <button type="button" onClick={() => setZoom(null)} aria-label="닫기" className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-line bg-[#fff] text-xl leading-none text-[#191f28]">×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────── 확대 보기 ───────────── */
function Zoom({ src, title, onClose }) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={onClose} className="fixed inset-0 z-[90] grid cursor-zoom-out place-items-center bg-ink/85 modal-bd p-4 backdrop-blur-md md:p-10" role="dialog" aria-modal="true" aria-label="화면 크게 보기">
          <motion.img initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} src={src} alt={`${title} 확대 화면`} className="max-h-full max-w-full rounded-2xl bg-white object-contain" />
          <button type="button" onClick={onClose} aria-label="닫기" className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-line bg-[#fff] text-xl leading-none text-[#191f28]">×</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const Shot = ({ src, title, onZoom, className = "" }) => (
  <figure className={`overflow-hidden rounded-2xl border border-line bg-s2 shadow-[0_30px_60px_-36px_rgba(0,0,0,.45)] ${className}`}>
    <div className="flex h-8 items-center gap-1.5 border-b border-line bg-paper px-3.5" aria-hidden="true">
      <i className="h-2 w-2 rounded-full bg-[#ff6159]" /><i className="h-2 w-2 rounded-full bg-[#ffbd2e]" /><i className="h-2 w-2 rounded-full bg-[#28c940]" />
      <span className="ml-2 truncate text-[11px] font-semibold text-mute">{title}</span>
    </div>
    <button type="button" onClick={() => onZoom(src)} aria-label={`${title} 화면 크게 보기`} className="group relative block w-full cursor-zoom-in bg-s2">
      <img src={src} alt={`${title} 화면`} loading="lazy" className="mx-auto block max-h-[70vh] w-full object-contain" />
      <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-bold text-white opacity-0 backdrop-blur transition group-hover:opacity-100">크게 보기</span>
    </button>
  </figure>
);

/* ───────────── 사진이 없는 기능(백엔드 · API)은 탭 대신 카드로 한꺼번에 보여줍니다 ───────────── */
function ApiCards({ items, label }) {
  return (
    <div>
      <p className="mb-4 flex items-center gap-2 text-[13.5px] font-bold text-mute">
        <span className="pm-solid grid h-6 w-6 place-items-center rounded-lg text-[11px]"><FaServer aria-hidden="true" /></span>
        {label} 기능 {items.length}개 <span className="text-mute/60">· 한눈에 보기</span>
      </p>
      <ul className="grid gap-4 md:grid-cols-2">
        {items.map((it, k) => (
          <motion.li key={it.heading} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: EASE, delay: k * 0.06 }}
            className="pm-api pm-card relative overflow-hidden rounded-3xl p-6 pt-7 md:p-7 md:pt-8 md:[&:last-child:nth-child(odd)]:col-span-2">
            <span className="pm-api-no" aria-hidden="true">{String(k + 1).padStart(2, "0")}</span>
            <div className="relative flex items-center gap-3">
              <span className="pm-solid grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-[15px] shadow-[0_10px_22px_-12px_var(--pm-c)]"><FaServer aria-hidden="true" /></span>
              <h4 className="min-w-0 text-[18px] font-extrabold leading-snug tracking-[-0.03em]">{it.heading}</h4>
            </div>
            <ul className="relative mt-5 space-y-2.5">
              {it.points.map((s) => (
                <li key={s} className="flex gap-2.5 text-[14.5px] leading-[1.75] text-ink/75">
                  <FaCheck className="mt-[0.62em] shrink-0 text-[10px] text-accent" aria-hidden="true" /><span><Rich text={s} /></span>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────── 담당한 기능: 탭으로 고르면 그 기능의 화면과 설명이 보입니다 ───────────── */
// 탭 줄은 마우스로 잡고 끌거나, 휠·터치패드로 옆으로 넘기거나, 양 끝 화살표로 넘길 수 있어요.
// 선택한 탭은 항상 가운데로 옵니다. 아래 이전/다음 버튼으로 기능을 하나씩 넘겨 볼 수도 있어요.
function Features({ items: all }) {
  // group이 있는 기능(예: Talaria의 비즈니스 모드 / 문화 모드)은 모드별로 나눠 보여줍니다.
  const groups = [...new Set(all.map((x) => x.group).filter(Boolean))];
  const [grp, setGrp] = useState(groups[0] ?? null);
  const items = grp ? all.filter((x) => x.group === grp) : all;
  const [cur, setCur] = useState(0);
  useEffect(() => setCur(0), [grp]);
  const [zoom, setZoom] = useState(null);
  const [edge, setEdge] = useState({ l: false, r: false });
  const [shot, setShot] = useState(0); // 기능 안에서 몇 번째 사진인지
  const tabs = useRef(null);
  const drag = useRef({ on: false, x: 0, left: 0, moved: false });
  const f = items[Math.min(cur, items.length - 1)];
  // 사진이 하나도 없는 묶음(예: 백엔드)은 탭 대신 카드로 한꺼번에 보여줍니다.
  const cardMode = items.length > 0 && items.every((x) => !(x.images?.length || x.image));
  // 사진은 images 배열(여러 장) 또는 image(한 장) 둘 다 됩니다.
  const imgs = f.images ?? (f.image ? [f.image] : []);
  useEffect(() => setShot(0), [cur, grp]);

  // 양 끝에 더 넘길 탭이 있는지 확인 (화살표 표시용)
  const check = () => {
    const box = tabs.current; if (!box) return;
    setEdge({ l: box.scrollLeft > 4, r: box.scrollLeft + box.clientWidth < box.scrollWidth - 4 });
  };
  useEffect(() => {
    const box = tabs.current; if (!box) return;
    check();
    const ro = new ResizeObserver(check); ro.observe(box);
    // 세로 휠을 가로 이동으로 바꿔 줌. 끝에 닿으면 원래대로 창이 위아래로 스크롤돼요.
    const wheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = box.scrollWidth - box.clientWidth;
      if (max <= 0) return;
      const next = box.scrollLeft + e.deltaY;
      if ((e.deltaY < 0 && box.scrollLeft <= 0) || (e.deltaY > 0 && box.scrollLeft >= max)) return;
      e.preventDefault();
      box.scrollLeft = Math.max(0, Math.min(max, next));
    };
    box.addEventListener("wheel", wheel, { passive: false });
    return () => { ro.disconnect(); box.removeEventListener("wheel", wheel); };
  }, []);

  // 선택한 탭이 가운데 오도록
  useEffect(() => {
    const box = tabs.current, el = box?.children[cur];
    if (!box || !el) return;
    check();
    const b = box.getBoundingClientRect(), r = el.getBoundingClientRect();
    box.scrollTo({ left: box.scrollLeft + (r.left - b.left) - (b.width - r.width) / 2, behavior: "smooth" });
  }, [cur, grp]);

  // 마우스로 잡고 끌기 (터치는 원래 손가락으로 밀 수 있어서 마우스만 처리)
  const down = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { on: true, x: e.clientX, left: tabs.current.scrollLeft, moved: false };
  };
  const move = (e) => {
    const d = drag.current; if (!d.on) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) d.moved = true;
    if (d.moved) tabs.current.scrollLeft = d.left - dx;
  };
  const up = () => { drag.current.on = false; };
  // 끌었다 놓은 경우에는 탭이 눌리지 않게
  const blockClick = (e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } };
  const nudge = (dir) => tabs.current?.scrollBy({ left: dir * tabs.current.clientWidth * 0.7, behavior: "smooth" });
  const keys = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); setCur((c) => Math.min(items.length - 1, c + 1)); }
    if (e.key === "ArrowLeft") { e.preventDefault(); setCur((c) => Math.max(0, c - 1)); }
  };

  const arrow = "absolute top-0 bottom-1 z-10 flex w-14 items-center";
  const prev = items[cur - 1], next = items[cur + 1];
  return (
    <div>
      {groups.length > 1 && (
        <div className="mb-4 inline-flex max-w-full overflow-x-auto rounded-full p-1 pm-pill [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="모드">
          {groups.map((g) => (
            <button key={g} type="button" onClick={() => setGrp(g)} aria-pressed={g === grp}
              className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[13.5px] font-extrabold transition sm:px-4 sm:text-[14px] ${g === grp ? "pm-solid shadow-[0_8px_18px_-10px_var(--pm-c)]" : "text-mute hover:text-ink"}`}>{g}</button>
          ))}
        </div>
      )}
      {cardMode && <ApiCards items={items} label={grp ?? "담당"} />}
      <div className={cardMode ? "hidden" : ""}>
      <div className="relative">
        <div ref={tabs} role="tablist" aria-label="담당한 기능" onScroll={check} onKeyDown={keys}
          onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up} onClickCapture={blockClick}
          className={`-mx-1 flex select-none gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${edge.l || edge.r ? "cursor-grab active:cursor-grabbing" : ""}`}>
          {items.map((it, k) => (
            <button key={it.heading} type="button" role="tab" aria-selected={k === cur} tabIndex={k === cur ? 0 : -1} onClick={() => setCur(k)} draggable={false}
              className={`shrink-0 rounded-full px-4 py-2.5 text-[14px] font-bold transition ${k === cur ? "pm-solid shadow-[0_10px_22px_-12px_var(--pm-c)]" : "pm-card text-mute hover:text-ink"}`}>
              <span className="mr-1.5 font-mono text-[11px] opacity-60">{String(k + 1).padStart(2, "0")}</span>{it.heading}
            </button>
          ))}
        </div>
        {edge.l && (
          <div className={`${arrow} left-0 justify-start bg-gradient-to-r from-[var(--pm-fade)] to-transparent`}>
            <button type="button" onClick={() => nudge(-1)} aria-label="왼쪽 탭 더 보기" className="pm-card grid h-9 w-9 place-items-center rounded-full text-xs shadow-md transition hover:scale-105"><FaArrowLeft aria-hidden="true" /></button>
          </div>
        )}
        {edge.r && (
          <div className={`${arrow} right-0 justify-end bg-gradient-to-l from-[var(--pm-fade)] to-transparent`}>
            <button type="button" onClick={() => nudge(1)} aria-label="오른쪽 탭 더 보기" className="pm-card grid h-9 w-9 place-items-center rounded-full text-xs shadow-md transition hover:scale-105"><FaArrowRight aria-hidden="true" /></button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={cur} role="tabpanel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: EASE }} className="mt-5">
          {imgs.length > 0 && (
            <>
              <AnimatePresence mode="wait">
                <motion.div key={imgs[shot]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Shot src={imgs[shot]} title={`${f.heading}${imgs.length > 1 ? ` (${shot + 1}/${imgs.length})` : ""}`} onZoom={setZoom} />
                </motion.div>
              </AnimatePresence>
              {imgs.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]" role="group" aria-label="이 기능의 화면">
                  {imgs.map((src, k) => (
                    <button key={src} type="button" onClick={() => setShot(k)} aria-label={`${k + 1}번째 화면 보기`} aria-pressed={k === shot}
                      className={`relative h-16 w-28 shrink-0 overflow-hidden rounded-xl border-2 bg-s2 transition ${k === shot ? "border-accent opacity-100" : "border-transparent opacity-55 hover:opacity-100"}`}>
                      <img src={src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
          <div className={`${imgs.length ? "mt-6" : "mt-1"} grid gap-x-10 gap-y-3 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)]`}>
            <div>
              <p className="display text-[13px] font-bold text-accent tabular-nums">{String(cur + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</p>
              <h4 className="mt-1 text-[20px] font-extrabold leading-snug tracking-[-0.03em]">{f.heading}</h4>
            </div>
            <ul className="space-y-1.5">
              {f.points.map((s) => <li key={s} className="flex gap-2.5 text-[15px] leading-[1.8] text-ink/75"><i className="mt-[0.75em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" /><span><Rich text={s} /></span></li>)}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 이전 / 다음 기능 */}
      <div className="mt-7 grid grid-cols-2 gap-3">
        {prev ? (
          <button type="button" onClick={() => setCur(cur - 1)} className="pm-card group flex min-w-0 items-center gap-3 rounded-2xl px-4 py-3 text-left transition hover:-translate-y-0.5">
            <FaArrowLeft className="shrink-0 text-xs text-mute transition group-hover:-translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
            <span className="min-w-0"><span className="block text-[12px] font-bold text-mute">이전 기능</span><span className="block truncate text-[14px] font-extrabold">{prev.heading}</span></span>
          </button>
        ) : <span />}
        {next ? (
          <button type="button" onClick={() => setCur(cur + 1)} className="pm-card group flex min-w-0 items-center justify-end gap-3 rounded-2xl px-4 py-3 text-right transition hover:-translate-y-0.5">
            <span className="min-w-0"><span className="block text-[12px] font-bold text-mute">다음 기능</span><span className="block truncate text-[14px] font-extrabold">{next.heading}</span></span>
            <FaArrowRight className="shrink-0 text-xs text-mute transition group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
          </button>
        ) : <span />}
      </div>
      </div>
      <Zoom src={zoom} title={f.heading} onClose={() => setZoom(null)} />
    </div>
  );
}

/* ───────────── 공통 조각 ───────────── */
const Block = ({ id, no, title, hint, root, children }) => (
  <motion.section id={`pm-${id}`} initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ root, once: true, margin: "0px 0px -60px 0px" }} transition={{ duration: 0.9, ease: EASE }}>
    <h3 className="flex items-center gap-3 text-[1.65rem] font-extrabold tracking-[-0.04em] md:text-3xl">
      <span className="pm-solid grid h-9 min-w-9 place-items-center rounded-full px-2 display text-xs font-bold shadow-[0_10px_22px_-10px_var(--pm-c)]">{no}</span>{title}<i className="ml-2 h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" aria-hidden="true" />
    </h3>
    {hint && <p className="mb-7 mt-2.5 pl-12 text-[13.5px] text-mute">{hint}</p>}
    <div className={hint ? "" : "mt-7"}>{children}</div>
  </motion.section>
);

const TONE = {
  coral: "bg-coral/12 text-coral dark:bg-coral/20 dark:text-[#ff9aa2]",
  sun: "bg-sun/25 text-[#9a6200] dark:bg-sun/15 dark:text-[#ffd37a]",
  accent: "bg-accent/12 text-accent",
  mint: "bg-mint/12 text-mint dark:bg-mint/15 dark:text-[#4fe0a6]",
};
const STEP = {
  situation: ["문제 상황", FaTriangleExclamation, "coral"],
  cause: ["원인", FaMagnifyingGlass, "sun"],
  solution: ["해결 방법", FaWrench, "accent"],
};

// 요구사항이 바뀌었을 때 어떻게 대응했는지: 언제·왜 → 대응 → 결과
const CSTEP = [["situation", "상황", FaArrowsRotate, "accent"], ["response", "대응", FaWrench, "sun"], ["result", "결과", FaCheck, "mint"]];
function Collab({ cb }) {
  return (
    <article className="pm-card overflow-hidden rounded-3xl">
      <header className="flex flex-wrap items-center gap-3 border-b border-line bg-accent/[0.06] px-6 py-5 md:px-8">
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-white">{cb.tag ?? "요구사항 변경"}</span>
        <h4 className="text-lg font-extrabold leading-snug tracking-[-0.025em] md:text-xl">{cb.title}</h4>
        {cb.when && <span className="ml-auto rounded-full bg-ink/5 px-3 py-1 text-[12.5px] font-bold text-mute">{cb.when}</span>}
      </header>
      <ol className="relative space-y-6 px-6 py-7 md:px-8">
        <i className="absolute bottom-12 left-[calc(1.5rem+17px)] top-12 w-px bg-ink/10 md:left-[calc(2rem+17px)]" aria-hidden="true" />
        {CSTEP.map(([key, label, Icon, tone]) => cb[key] && (
          <li key={key} className="relative flex gap-4">
            <span className={`z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm ${TONE[tone]}`}><Icon aria-hidden="true" /></span>
            <div className="min-w-0 pt-0.5">
              <p className={`w-fit rounded-full px-3 py-0.5 text-[12.5px] font-extrabold ${TONE[tone]}`}>{label}</p>
              {Array.isArray(cb[key])
                ? <ul className="mt-2 space-y-1.5">{cb[key].map((t) => <li key={t} className="flex gap-2.5 text-[15.5px] leading-[1.75] text-ink/85"><span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-40" aria-hidden="true" /><span><Rich text={t} /></span></li>)}</ul>
                : <p className="mt-2 text-[15.5px] leading-[1.85] text-ink/85"><Rich text={cb[key]} /></p>}
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}

function Problem({ pb, n }) {
  return (
    <article className="pm-card overflow-hidden rounded-3xl">
      <header className="flex items-start gap-3 border-b border-line bg-coral/[0.07] px-6 py-5 dark:bg-coral/[0.10] md:px-8">
        <span className="mt-0.5 rounded-full bg-coral px-2.5 py-0.5 display text-xs font-bold tabular-nums text-white">#{String(n).padStart(2, "0")}</span>
        <h4 className="text-lg font-extrabold leading-snug tracking-[-0.025em] md:text-xl">{pb.title}</h4>
      </header>
      <ol className="relative space-y-6 px-6 py-7 md:px-8">
        <i className="absolute bottom-12 left-[calc(1.5rem+17px)] top-12 w-px bg-ink/10 md:left-[calc(2rem+17px)]" aria-hidden="true" />
        {Object.entries(STEP).map(([key, [label, Icon, tone]]) => pb[key] && (
          <li key={key} className="relative flex gap-4">
            <span className={`z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm ${TONE[tone]}`}><Icon aria-hidden="true" /></span>
            <div className="min-w-0 pt-0.5">
              <p className={`w-fit rounded-full px-3 py-0.5 text-[12.5px] font-extrabold ${TONE[tone]}`}>{label}</p>
              <p className="mt-2 text-[15.5px] leading-[1.85] text-ink/85"><Rich text={pb[key]} /></p>
            </div>
          </li>
        ))}
        {pb.result?.length > 0 && (
          <li className="relative flex gap-4">
            <span className={`z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm ${TONE.mint}`}><FaCheck aria-hidden="true" /></span>
            <div className="min-w-0 pt-0.5">
              <p className={`w-fit rounded-full px-3 py-0.5 text-[12.5px] font-extrabold ${TONE.mint}`}>결과</p>
              <ul className="mt-2 space-y-1.5">
                {pb.result.map((r) => <li key={r} className="flex gap-2.5 text-[15.5px] leading-[1.75] text-ink/85"><FaCheck className="mt-[0.5em] shrink-0 text-xs text-mint" aria-hidden="true" /><span>{r}</span></li>)}
              </ul>
            </div>
          </li>
        )}
      </ol>
      {pb.lesson && (
        <footer className="flex gap-3 border-t border-line bg-accent/[0.07] px-6 py-4 md:px-8">
          <FaLightbulb className="mt-1 shrink-0 text-accent" aria-hidden="true" />
          <p className="text-[14.5px] leading-[1.75] text-ink/80"><b className="mr-2 text-accent">배운 점</b>{pb.lesson}</p>
        </footer>
      )}
    </article>
  );
}


// 프로젝트 소개: 배경 → 해결 → 결과 세 문단 (문단이 셋이 아니면 그냥 문단으로)
const INTRO_LABEL = ["배경", "해결", "결과"];
function Intro({ text = "" }) {
  const paras = text.split("\n\n");
  const v = (typeof window !== "undefined" && window.__introV) || "A";
  if (paras.length !== 3) return <div className="max-w-3xl space-y-4">{paras.map((t) => <p key={t} className="text-[1.08rem] font-semibold leading-[1.9]"><Rich text={t} /></p>)}</div>;
  if (v === "B") return (
    <ol className="pm-flow grid gap-3 lg:grid-cols-3 lg:gap-4">
      {paras.map((t, k) => (
        <li key={k} className={`relative rounded-3xl p-6 md:p-7 ${k === 2 ? "pm-role" : "pm-card"}`}>
          <p className="pm-label !text-accent">{String(k + 1).padStart(2, "0")} · {INTRO_LABEL[k]}</p>
          <p className="mt-3 text-[15.5px] font-medium leading-[1.85] text-ink/80 [&_strong]:font-bold [&_strong]:text-ink [&_b]:font-bold [&_b]:text-ink"><Rich text={t} /></p>
          {k < 2 && <span className="pm-flow-arrow" aria-hidden="true"><FaArrowRight /></span>}
        </li>
      ))}
    </ol>
  );
  return (
    <dl className="max-w-3xl">
      {paras.map((t, k) => (
        <div key={k} className={`grid gap-1.5 py-5 md:grid-cols-[64px_1fr] md:gap-6 ${k === 2 ? "pm-role -mx-5 mt-3 rounded-3xl px-5 md:-mx-7 md:px-7" : "border-b border-ink/[0.07]"} ${k === 0 ? "pt-0" : ""}`}>
          <dt className="pm-label !text-accent md:pt-[0.35em]">{INTRO_LABEL[k]}</dt>
          <dd className="m-0 text-[1.06rem] font-medium leading-[1.9] tracking-[-0.015em] text-ink/80 [&_strong]:font-bold [&_strong]:text-ink [&_b]:font-bold [&_b]:text-ink"><Rich text={t} /></dd>
        </div>
      ))}
    </dl>
  );
}


// 소개 칸(새 형식): 핵심 한 줄 → 개요 → 불편·해결 → 성과
const Tech = ({ list }) => list?.length > 0 && <ul className="pm-st-tech">{list.map((x) => <li key={x}>{x}</li>)}</ul>;
function Story({ st, award }) {
  return (
    <div className="pm-st">
      <div className="pm-st-top1">
        <p className="pm-st-h">{st.headline}<span className="text-accent">.</span></p>
        <div>
          <p className="pm-label !text-accent">개요</p>
          <p className="mt-2.5 text-[1.02rem] font-medium leading-[1.85] text-ink/75">{st.summary}</p>
        </div>
      </div>
      <ol className="pm-cd pm-card">
        {st.pairs.map((pr, k) => (
          <li key={pr.problem} className="pm-cd-row">
            <span className="pm-cd-no pm-solid">{k + 1}</span>
            <div className="min-w-0">
              <p className="pm-cd-p"><span className="sr-only">불편: </span>{pr.problem}</p>
              <div className="pm-cd-s">
                <FaArrowRight className="pm-cd-ar" aria-hidden="true" />
                <div className="min-w-0"><p><span className="sr-only">해결: </span><Rich text={pr.solution} /></p><Tech list={pr.tech} /></div>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div className="pm-st-out">
        <div>
          <p className="pm-label !text-accent">성과</p>
          <p className="mt-2 text-[1.04rem] font-semibold leading-[1.8]"><Rich text={st.outcome} /></p>
        </div>
        {award && <p className="pm-st-award"><FaTrophy aria-hidden="true" />{award}</p>}
      </div>
    </div>
  );
}

export default function ProjectModal({ index, onClose, onChange, order }) {
  const p = index == null ? null : projects[index];
  const closeRef = useRef(null);
  const scroller = useRef(null);
  const prog = useMotionValue(0);
  const bar = useSpring(prog, { stiffness: 140, damping: 30 });
  const [act, setAct] = useState(null);
  const [allShots, setAllShots] = useState(false);

  useEffect(() => {
    if (!p) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [p, onClose]);
  useEffect(() => { scroller.current?.scrollTo({ top: 0 }); setAct(null); setAllShots(false); }, [index]);

  const d = p?.details;
  const pos = order?.indexOf(index) ?? -1;
  const go = (step) => order && onChange?.(order[(pos + step + order.length) % order.length]);
  const neighbor = (step) => projects[order?.[(pos + step + order.length) % order.length]]?.details.modalTitle;
  const periodMain = p ? d.period.replace(/\s*\(.*\)/, "") : "";
  const periodNote = p ? d.period.match(/\((.*)\)/)?.[1] : "";
  const repos = p ? (d.urls?.githubLinks ?? (d.urls?.githubURL ? [{ url: d.urls.githubURL }] : [])) : [];
  const links = p ? [...repos.map((x) => [ROLE_ICON[x.label] ?? FaGithub, x.label ? `GitHub · ${x.label}` : "GitHub", x.url, true]), d.urls?.serviceURL && [FaLink, "배포 사이트", d.urls.serviceURL, false]].filter(Boolean) : [];
  const stats = p ? [[FaCalendarDays, "기간", periodMain, periodNote], [FaUsers, "인원", d.members], [FaUserGear, "내 역할", d.roleShort], d.contribution && [FaChartPie, "기여도", d.contribution, "포트폴리오 기재 기준"]].filter(Boolean) : [];
  // 데이터가 있는 섹션만 번호를 매겨 보여줍니다.
  const st = p ? d.story : null;
  const secs = p ? [["intro", "소개"], ["work", "담당 기능"], d.collab?.length && ["collab", "요구사항 대응"], d.problems?.length && ["problems", "문제 해결"], !st && d.techReasons?.length && ["tech", "기술 선택"], !st && ["results", "결과 요약"], d.techStack?.length && ["stack", "기술 스택"]].filter(Boolean) : [];
  const no = (k) => String(secs.findIndex(([id]) => id === k) + 1).padStart(2, "0");
  const c = p ? THEMES[index].c : "#2f8cff";
  const on = act ?? secs[0]?.[0];

  const onScroll = (e) => {
    const t = e.currentTarget, top = t.getBoundingClientRect().top;
    prog.set(t.scrollTop / Math.max(1, t.scrollHeight - t.clientHeight));
    let cur = null;
    for (const [id] of secs) { const el = t.querySelector(`#pm-${id}`); if (el && el.getBoundingClientRect().top - top < 180) cur = id; }
    setAct(cur);
  };
  const jump = (id) => {
    const t = scroller.current, el = t?.querySelector(`#pm-${id}`);
    if (t && el) t.scrollTo({ top: el.getBoundingClientRect().top - t.getBoundingClientRect().top + t.scrollTop - (window.matchMedia("(min-width:1024px)").matches ? 20 : 76), behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {p && (
        <motion.div key="modal" data-lenis-prevent className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/40 modal-bd backdrop-blur-xl sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={onClose}>
          <motion.div role="dialog" aria-modal="true" aria-label={d.modalTitle} style={{ "--pm-c": c, "--pm-fg": textOn(c) }} onClick={(e) => e.stopPropagation()}
            initial={{ y: 80, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0, scale: 0.98 }} transition={{ type: "spring", stiffness: 240, damping: 28 }}
            className="pm-root pm-shell relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[32px] border border-line shadow-[0_60px_140px_-30px_rgba(20,20,60,.5)] sm:h-[min(92vh,980px)] sm:rounded-[36px]">
            {/* 상단 바 */}
            <div className="pm-topbar relative flex shrink-0 items-center justify-between gap-3 border-b border-line px-5 py-3.5 md:px-8">
              <motion.i style={{ scaleX: bar }} className="absolute inset-x-0 -bottom-px h-[3px] origin-left bg-gradient-to-r from-accent to-cyan" aria-hidden="true" />
              <p className="flex min-w-0 items-center gap-3 display text-xs font-semibold text-mute"><span className="shrink-0"><span className="text-accent">{String(pos + 1).padStart(2, "0")}</span> / {String(order?.length ?? 0).padStart(2, "0")}</span><span className="hidden h-3 w-px bg-line sm:block" aria-hidden="true" /><span className="hidden truncate font-sans sm:block">{d.modalTitle}</span></p>
              <div className="flex gap-2">
                {order && [[-1, FaArrowLeft, "이전 프로젝트"], [1, FaArrowRight, "다음 프로젝트"]].map(([step, Icon, label]) => (
                  <button key={label} type="button" onClick={() => go(step)} aria-label={label} title={neighbor(step)} className="pm-ico grid h-10 w-10 place-items-center rounded-full border border-line text-sm transition"><Icon aria-hidden="true" /></button>
                ))}
                <button ref={closeRef} type="button" onClick={onClose} aria-label="닫기" className="pm-ico grid h-10 w-10 place-items-center rounded-full border border-line text-xl leading-none transition hover:rotate-90"><span aria-hidden="true">×</span></button>
              </div>
            </div>

            <div ref={scroller} data-lenis-prevent onScroll={onScroll} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait">
                <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  {/* 머리말 */}
                  <motion.div variants={list} initial="hidden" animate="show" className="pm-head relative overflow-hidden px-6 pb-24 pt-9 md:px-12 md:pb-32 md:pt-12">
                    <span className="pointer-events-none absolute -right-2 top-0 select-none display text-[11rem] font-extrabold leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,.34)] md:text-[16rem]" aria-hidden="true">{String(pos + 1).padStart(2, "0")}</span>
                    {d.award && <motion.div variants={item} className="relative mb-5 flex flex-wrap items-center gap-2">
                      <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-extrabold text-[#9a6200] shadow-lg"><FaTrophy aria-hidden="true" />{d.award}</p>
                    </motion.div>}
                    <motion.h2 variants={item} className="relative max-w-4xl text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.13] tracking-[-0.055em]">{d.modalTitle}</motion.h2>
                    <motion.p variants={item} className="relative mt-4 max-w-2xl text-[17px] leading-relaxed text-white/85">{d.subtitle}</motion.p>
                    {links.length > 0 && (
                      <motion.div variants={item} className="relative mt-7 flex flex-wrap gap-2">
                        {repos.length > 1 && <p className="w-full text-[13px] font-bold text-white/70">소스 코드 · GitHub 저장소 {repos.length}개</p>}
                        {links.map(([Icon, label, url, main]) => <a key={label} href={url} target="_blank" rel="noopener noreferrer" className={main ? "pm-btn" : "pm-btn pm-btn-ghost"}><Icon aria-hidden="true" />{label}<FaArrowRight className="text-[10px] opacity-50" aria-hidden="true" /></a>)}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* 시연 영상 + 큰 화면 갤러리 */}
                  <div className="relative z-10 -mt-16 space-y-5 px-4 md:-mt-24 md:px-10">
                    {d.videoURL
                      ? <video src={d.videoURL} controls preload="none" poster={d.modalImages?.[0]} className="w-full overflow-hidden rounded-3xl border border-line bg-black shadow-[0_40px_80px_-40px_rgba(0,0,0,.55)]" />
                      : d.modalImages?.length > 0 && <Gallery key={index} images={d.modalImages} title={d.modalTitle} />}
                  </div>

                  {/* 섹션 바로가기 */}
                  <nav aria-label="상세 목차" className="pm-nav sticky top-0 z-20 mt-12 flex gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] md:px-12 lg:hidden">
                    {secs.map(([id, label]) => (
                      <button key={id} type="button" onClick={() => jump(id)} aria-current={on === id} className={`pm-pill shrink-0 rounded-full px-4 py-2 text-[13.5px] font-bold transition ${on === id ? "pm-pill-on" : ""}`}><span className="mr-1.5 font-mono text-[10.5px] opacity-60">{no(id)}</span>{label}</button>
                    ))}
                  </nav>

                  <div className="grid gap-x-14 px-6 pb-14 pt-12 md:px-12 lg:grid-cols-[170px_minmax(0,1fr)] lg:pt-16">
                    <aside className="hidden lg:block" aria-label="목차">
                      <div className="sticky top-6">
                        <p className="pm-label mb-3">목차</p>
                        <ol className="border-l border-line">
                          {secs.map(([id, label]) => (
                            <li key={id}><button type="button" onClick={() => jump(id)} aria-current={on === id} className={`pm-side -ml-px flex w-full items-center gap-2.5 border-l-2 py-2.5 pl-4 text-left text-[14px] font-bold transition ${on === id ? "pm-side-on" : ""}`}><span className="font-mono text-[11px] opacity-60">{no(id)}</span>{label}</button></li>
                          ))}
                        </ol>
                        {links.length > 0 && (
                          <div className="mt-7 space-y-2">
                            {links.map(([Icon, label, url]) => <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="pm-card flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[13.5px] font-bold transition hover:-translate-y-0.5"><Icon className="text-accent" aria-hidden="true" />{label}</a>)}
                          </div>
                        )}
                      </div>
                    </aside>
                  <motion.div variants={list} initial="hidden" animate="show" className="min-w-0 space-y-24">
                    {/* 핵심 정보 */}
                    <motion.dl variants={item} className={`pm-strip grid gap-px overflow-hidden rounded-3xl sm:grid-cols-2 ${stats.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
                      {stats.map(([Icon, k, v, sub]) => {
                        const pct = k === "기여도" ? parseInt(v, 10) : null;
                        return (
                          <div key={k} className="pm-cell p-5 md:p-6">
                            <dt className="flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-xl bg-accent/15 text-[13px] text-accent"><Icon aria-hidden="true" /></span><span className="pm-label">{k}</span></dt>
                            <dd className="mt-3 text-[16px] font-extrabold leading-snug tracking-[-0.02em]">{v}</dd>
                            {pct > 0 && <dd className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: pct / 100 }} transition={{ duration: 1.2, ease: EASE, delay: 0.5 }} className="pm-solid block h-full origin-left rounded-full" /></dd>}
                            {sub && <dd className="mt-1.5 text-[12.5px] font-semibold text-mute">{sub}</dd>}
                          </div>
                        );
                      })}
                    </motion.dl>

                    {/* 소개 + 내 역할 */}
                    <Block root={scroller} id="intro" no={no("intro")} title="프로젝트 소개">
                      {d.story ? <Story st={d.story} award={d.award} /> : <Intro text={d.overview} />}
                    </Block>

                    {/* 내가 직접 담당한 기능 */}
                    <Block root={scroller} id="work" no={no("work")} title="내가 직접 담당한 기능">
                      <Features key={index} items={d.myWork} />
                      {d.videoURL && d.modalImages?.length > 0 && (
                        <div className="mt-6">
                          <button type="button" onClick={() => setAllShots((v) => !v)} aria-expanded={allShots} className="pm-card inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-bold transition hover:-translate-y-0.5">
                            전체 화면 캡처 {d.modalImages.length}장 {allShots ? "접기" : "보기"}<FaChevronDown className={`text-[11px] transition ${allShots ? "rotate-180" : ""}`} aria-hidden="true" />
                          </button>
                          {allShots && <div className="mt-5"><Gallery key={`g-${index}`} images={d.modalImages} title={d.modalTitle} /></div>}
                        </div>
                      )}
                    </Block>

                    {/* 협업 · 요구사항 대응 */}
                    {d.collab?.length > 0 && (
                      <Block root={scroller} id="collab" no={no("collab")} title="협업과 요구사항 대응">
                        <div className="space-y-5">{d.collab.map((cb) => <Collab key={cb.title} cb={cb} />)}</div>
                      </Block>
                    )}

                    {/* 문제와 해결 */}
                    {d.problems?.length > 0 && (
                      <Block root={scroller} id="problems" no={no("problems")} title="구현 중 발생한 문제와 해결 과정">
                        <div className="space-y-5">{d.problems.map((pb, k) => <Problem key={pb.title} pb={pb} n={k + 1} />)}</div>
                      </Block>
                    )}

                    {/* 기술 선택 이유 */}
                    {!st && d.techReasons?.length > 0 && (
                      <Block root={scroller} id="tech" no={no("tech")} title="기술을 선택한 이유">
                        <ul className="grid gap-4 md:grid-cols-2">
                          {d.techReasons.map((r) => (
                            <li key={r.tech} className="pm-card pm-card-hover rounded-3xl p-6">
                              <span className="pm-solid inline-flex rounded-full px-4 py-1.5 text-sm font-extrabold">{r.tech}</span>
                              <p className="mt-3.5 text-[15.5px] leading-[1.8] text-ink/85">{r.reason}</p>
                            </li>
                          ))}
                        </ul>
                      </Block>
                    )}

                    {/* 결과 요약 */}
                    {!st && <Block root={scroller} id="results" no={no("results")} title="결과 요약">
                      <ul className="pm-card divide-y divide-ink/[0.07] overflow-hidden rounded-3xl">
                        {d.results.map((r) => (
                          <li key={r.text} className="flex gap-4 px-5 py-4 md:px-7 md:py-5">
                            <span className="pm-solid mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px]"><FaCheck aria-hidden="true" /></span>
                            <p className="text-[15.5px] font-semibold leading-[1.8] text-ink/90"><Rich text={r.text} /></p>
                          </li>
                        ))}
                      </ul>
                    </Block>}

                    {/* 기술 스택 */}
                    {d.techStack?.length > 0 && (
                      <Block root={scroller} id="stack" no={no("stack")} title="기술 스택">
                        <ul className="flex flex-wrap gap-2">{d.techStack.map((t) => <li key={t} className="pm-card rounded-full px-4 py-2 text-[13.5px] font-bold">{t}</li>)}</ul>
                        {st && d.techReasons?.length > 0 && (
                          <div className="mt-9">
                            <h4 className="pm-why-h"><i aria-hidden="true" />기술 선택 포인트</h4>
                            <ul className="pm-why pm-card">
                              {d.techReasons.map((r, k) => (
                                <li key={r.tech} className="pm-why-row">
                                  <span className="pm-why-t"><i className="pm-solid" aria-hidden="true">{k + 1}</i>{r.tech}</span>
                                  <p>{r.reason.replace(/\s*\(팀 기술 선택\)/, "")}{/\(팀 기술 선택\)/.test(r.reason) && <em>팀 선택</em>}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </Block>
                    )}

                    {order && (
                      <motion.div variants={item} className="grid gap-4 md:grid-cols-2">
                        <button type="button" onClick={() => go(-1)} className="pm-card pm-card-hover group flex items-center gap-4 rounded-3xl p-6 text-left">
                          <span className="pm-arrow grid h-12 w-12 shrink-0 place-items-center rounded-full transition group-hover:-translate-x-1.5"><FaArrowLeft aria-hidden="true" /></span>
                          <span className="min-w-0"><span className="pm-label">이전 프로젝트</span><span className="mt-1 block text-[16px] font-extrabold leading-snug">{neighbor(-1)}</span></span>
                        </button>
                        <button type="button" onClick={() => go(1)} className="pm-head group relative flex items-center justify-between gap-4 overflow-hidden rounded-3xl p-6 text-left transition hover:brightness-110">
                          <span className="relative min-w-0"><span className="text-[13px] font-bold text-white/75">다음 프로젝트</span><span className="mt-1 block text-[16px] font-extrabold leading-snug md:text-[17px]">{neighbor(1)}</span></span>
                          <span className="pm-arrow-w relative grid h-12 w-12 shrink-0 place-items-center rounded-full transition group-hover:translate-x-1.5"><FaArrowRight aria-hidden="true" /></span>
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
