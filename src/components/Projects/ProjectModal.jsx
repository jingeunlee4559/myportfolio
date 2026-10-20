import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { FaArrowLeft, FaArrowRight, FaCalendarDays, FaChartPie, FaCheck, FaCirclePlay, FaDesktop, FaGithub, FaImages, FaLightbulb, FaLink, FaMagnifyingGlass, FaRobot, FaServer, FaTriangleExclamation, FaTrophy, FaUserGear, FaUsers, FaWrench } from "react-icons/fa6";
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

export default function ProjectModal({ index, onClose, onChange, order }) {
  const p = index == null ? null : projects[index];
  const closeRef = useRef(null);
  const scroller = useRef(null);
  const prog = useMotionValue(0);
  const bar = useSpring(prog, { stiffness: 140, damping: 30 });
  const [act, setAct] = useState(null);

  useEffect(() => {
    if (!p) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [p, onClose]);
  useEffect(() => { scroller.current?.scrollTo({ top: 0 }); setAct(null); }, [index]);

  const d = p?.details;
  const pos = order?.indexOf(index) ?? -1;
  const go = (step) => order && onChange?.(order[(pos + step + order.length) % order.length]);
  const neighbor = (step) => projects[order?.[(pos + step + order.length) % order.length]]?.details.modalTitle;
  const periodMain = p ? d.period.replace(/\s*\(.*\)/, "") : "";
  const periodNote = p ? d.period.match(/\((.*)\)/)?.[1] : "";
  const repos = p ? (d.urls?.githubLinks ?? (d.urls?.githubURL ? [{ url: d.urls.githubURL }] : [])) : [];
  const links = p ? [...repos.map((x) => [ROLE_ICON[x.label] ?? FaGithub, x.label ? `GitHub · ${x.label}` : "GitHub", x.url, true]), d.urls?.serviceURL && [FaLink, "배포 사이트", d.urls.serviceURL, false]].filter(Boolean) : [];
  const stats = p ? [[FaCalendarDays, "기간", periodMain, periodNote], [FaUsers, "인원", d.members], [FaUserGear, "내 역할", d.roleShort], d.contribution && [FaChartPie, "기여도", d.contribution, "포트폴리오 기재 기준"]].filter(Boolean) : [];
  const proofs = p ? [
    d.award && [FaTrophy, d.award, "수상 기록"],
    d.modalImages?.length > 0 && [FaImages, `화면 캡처 ${d.modalImages.length}장`, "위 갤러리에서 확인"],
    d.videoURL && [FaCirclePlay, "시연 영상", "위 영상에서 확인"],
    ...repos.map((x) => [ROLE_ICON[x.label] ?? FaGithub, x.label ? `GitHub · ${x.label}` : "GitHub 저장소", "눌러서 코드 보기", x.url]),
  ].filter(Boolean) : [];

  // 데이터가 있는 섹션만 번호를 매겨 보여줍니다.
  const secs = p ? [["intro", "소개"], ["work", "담당 기능"], d.problems?.length && ["problems", "문제 해결"], d.techReasons?.length && ["tech", "기술 선택"], ["results", "결과"]].filter(Boolean) : [];
  const no = (k) => String(secs.findIndex(([id]) => id === k) + 1).padStart(2, "0");
  const reasonSet = p ? new Set(d.techReasons?.map((r) => r.tech.toLowerCase())) : new Set();
  const restTech = p ? d.techStack.filter((t) => ![...reasonSet].some((r) => t.toLowerCase().startsWith(r) || r.startsWith(t.toLowerCase()))) : [];
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
                    <motion.div variants={item} className="relative flex flex-wrap items-center gap-2">
                      <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 display text-sm font-semibold tabular-nums ring-1 ring-white/30 backdrop-blur">{periodMain}</p>
                      {periodNote && <p className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold ring-1 ring-white/20">{periodNote}</p>}
                      {d.award && <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-extrabold text-[#9a6200] shadow-lg"><FaTrophy aria-hidden="true" />{d.award}</p>}
                    </motion.div>
                    <motion.h2 variants={item} className="relative mt-5 max-w-4xl text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.13] tracking-[-0.055em]">{d.modalTitle}</motion.h2>
                    <motion.p variants={item} className="relative mt-4 max-w-2xl text-[17px] leading-relaxed text-white/85">{d.subtitle}</motion.p>
                    {d.techStack?.length > 0 && (
                      <motion.ul variants={item} className="relative mt-6 flex max-w-3xl flex-wrap gap-2" aria-label="사용 기술">
                        {d.techStack.slice(0, 10).map((t) => <li key={t} className="rounded-full bg-black/15 px-3 py-1 text-[12.5px] font-bold text-white/90 ring-1 ring-white/20 backdrop-blur">{t}</li>)}
                      </motion.ul>
                    )}
                    {links.length > 0 && (
                      <motion.div variants={item} className="relative mt-7 flex flex-wrap gap-2">
                        {repos.length > 1 && <p className="w-full text-[13px] font-bold text-white/70">소스 코드 · GitHub 저장소 {repos.length}개</p>}
                        {links.map(([Icon, label, url, main]) => <a key={label} href={url} target="_blank" rel="noopener noreferrer" className={main ? "pm-btn" : "pm-btn pm-btn-ghost"}><Icon aria-hidden="true" />{label}<FaArrowRight className="text-[10px] opacity-50" aria-hidden="true" /></a>)}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* 시연 영상 + 큰 화면 갤러리 */}
                  <div className="relative z-10 -mt-16 space-y-5 px-4 md:-mt-24 md:px-10">
                    {d.videoURL && <video src={d.videoURL} controls preload="none" poster={d.modalImages?.[0]} className="w-full overflow-hidden rounded-3xl border border-line bg-black shadow-[0_40px_80px_-40px_rgba(0,0,0,.55)]" />}
                    {d.modalImages?.length > 0 && <Gallery key={index} images={d.modalImages} title={d.modalTitle} />}
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
                      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
                        <p className="text-[1.1rem] font-semibold leading-[1.9] tracking-[-0.015em]"><Rich text={d.overview} /></p>
                        <aside className="pm-role relative overflow-hidden rounded-3xl p-6 md:p-7">
                          <span className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-accent/20 blur-2xl" aria-hidden="true" />
                          <p className="pm-label relative !text-accent">내 역할</p>
                          <p className="relative mt-3 text-[16.5px] font-bold leading-[1.75]">{d.roleSummary}</p>
                          <p className="pm-label relative mt-6">담당한 기능 {d.myWork.length}개 <span className="font-medium opacity-70">· 눌러서 자세히</span></p>
                          <ul className="relative mt-3 flex flex-wrap gap-2" aria-label="담당한 기능">
                            {d.myWork.map((f) => <li key={f.heading}><button type="button" onClick={() => jump("work")} className="pm-chip rounded-xl px-3 py-1.5 text-left text-[13px] font-bold leading-snug transition">{f.heading}</button></li>)}
                          </ul>
                        </aside>
                      </div>
                    </Block>

                    {/* 내가 직접 담당한 기능 */}
                    <Block root={scroller} id="work" no={no("work")} title="내가 직접 담당한 기능" hint="팀 전체가 아니라, 제가 직접 구현한 부분만 정리했습니다.">
                      <ul className="grid gap-4 md:grid-cols-2">
                        {d.myWork.map((f, k) => (
                          <li key={f.heading} className="pm-card pm-card-hover relative overflow-hidden rounded-3xl p-6 md:p-7">
                            <span className="pointer-events-none absolute -right-3 -top-5 select-none display text-7xl font-extrabold text-accent/[0.09]" aria-hidden="true">{String(k + 1).padStart(2, "0")}</span>
                            <div className="relative mb-4 flex items-center gap-3"><span className="pm-solid grid h-8 w-8 place-items-center rounded-xl display text-xs font-bold">{String(k + 1).padStart(2, "0")}</span><i className="h-1 w-8 rounded-full bg-accent/60" aria-hidden="true" /></div>
                            <b className="relative block text-[17.5px] font-extrabold leading-snug tracking-[-0.02em]">{f.heading}</b>
                            <ul className="relative mt-3.5 space-y-2.5">
                              {f.points.map((s) => (
                                <li key={s} className="flex gap-2.5 text-[14.5px] leading-[1.75] text-ink/70"><i className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" /><span><Rich text={s} /></span></li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </Block>

                    {/* 문제와 해결 */}
                    {d.problems?.length > 0 && (
                      <Block root={scroller} id="problems" no={no("problems")} title="구현 중 발생한 문제와 해결 과정" hint="문제 상황 → 원인 → 해결 → 결과 순서로 정리했습니다.">
                        <div className="space-y-5">{d.problems.map((pb, k) => <Problem key={pb.title} pb={pb} n={k + 1} />)}</div>
                      </Block>
                    )}

                    {/* 기술 선택 이유 */}
                    {d.techReasons?.length > 0 && (
                      <Block root={scroller} id="tech" no={no("tech")} title="기술을 선택한 이유" hint="포트폴리오에 정리한 선택 이유입니다.">
                        <ul className="grid gap-4 md:grid-cols-2">
                          {d.techReasons.map((r) => (
                            <li key={r.tech} className="pm-card pm-card-hover rounded-3xl p-6">
                              <span className="pm-solid inline-flex rounded-full px-4 py-1.5 text-sm font-extrabold">{r.tech}</span>
                              <p className="mt-3.5 text-[15.5px] leading-[1.8] text-ink/85">{r.reason}</p>
                            </li>
                          ))}
                        </ul>
                        {restTech.length > 0 && (
                          <>
                            <h4 className="pm-sub mb-4 mt-10"><i aria-hidden="true" />사용한 그 밖의 기술</h4>
                            <ul className="flex flex-wrap gap-2">{restTech.map((t) => <li key={t} className="pm-card rounded-full px-3.5 py-1.5 text-[13px] font-bold">{t}</li>)}</ul>
                          </>
                        )}
                      </Block>
                    )}

                    {/* 결과와 근거 */}
                    <Block root={scroller} id="results" no={no("results")} title="구현 결과와 확인 근거" hint="측정하지 않은 성능 개선이나 효과는 적지 않았습니다. 만든 것과 확인할 수 있는 근거만 정리했습니다.">
                      <ul className="space-y-3">
                        {d.results.map((r) => (
                          <li key={r.text} className="pm-card flex gap-4 rounded-3xl p-5 md:p-6">
                            <span className="pm-solid mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px]"><FaCheck aria-hidden="true" /></span>
                            <div className="min-w-0">
                              <p className="text-[16px] font-semibold leading-[1.8] text-ink/90"><Rich text={r.text} /></p>
                              {r.basis && <p className="mt-2.5 inline-flex items-center rounded-full bg-accent/12 px-3 py-1 text-xs font-extrabold text-accent">근거 · {r.basis}</p>}
                            </div>
                          </li>
                        ))}
                      </ul>
                      {proofs.length > 0 && (
                        <div className="mt-12">
                          <h4 className="pm-sub mb-4"><i aria-hidden="true" />확인할 수 있는 곳</h4>
                          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {proofs.map(([Icon, label, sub, href]) => {
                              const inner = (<>
                                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/25"><Icon aria-hidden="true" /></span>
                                <span className="min-w-0 flex-1"><b className="block text-[14.5px] font-extrabold leading-snug">{label}</b><span className="block text-[12.5px] text-mute">{sub}</span></span>
                                {href && <FaArrowRight className="shrink-0 text-xs text-mute transition group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />}
                              </>);
                              return <li key={label}>{href
                                ? <a href={href} target="_blank" rel="noopener noreferrer" className="pm-card pm-card-hover group flex h-full items-center gap-3.5 rounded-2xl p-4">{inner}</a>
                                : <div className="pm-card flex h-full items-center gap-3.5 rounded-2xl p-4">{inner}</div>}</li>;
                            })}
                          </ul>
                        </div>
                      )}
                    </Block>

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
