import { useState, useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionHead from "./SectionHead";
import { guideZone } from "../lib/guide";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot } from "firebase/firestore";

const fmt = (t) => t?.toDate?.().toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }) ?? "";
const COLORS = ["#2f8cff", "#12a36b", "#f97316", "#ec4899", "#7c5cff", "#0ea5e9"];
const hue = (s = "") => COLORS[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length];
const field = "w-full rounded-2xl border-0 bg-white px-4 py-3.5 text-ink outline-none transition placeholder:text-mute/70 focus:ring-4 focus:ring-white/40";

// 전송하면 이모지가 팡 터집니다
function Burst() {
  const bits = useMemo(() => Array.from({ length: 18 }, (_, i) => ({ a: (i / 18) * Math.PI * 2 + Math.random() * 0.4, r: 80 + Math.random() * 90, e: ["🎉", "✨", "💙", "⭐", "🩵", "🎈"][i % 6], rot: Math.random() * 240 - 120 })), []);
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
      {bits.map((b, i) => <motion.span key={i} initial={{ x: 0, y: 0, opacity: 1, scale: 0.3 }} animate={{ x: Math.cos(b.a) * b.r, y: Math.sin(b.a) * b.r - 40, opacity: 0, scale: 1.4, rotate: b.rot }} transition={{ duration: 1.2, ease: "easeOut" }} className="absolute -ml-3 -mt-3 text-2xl">{b.e}</motion.span>)}
    </div>
  );
}

export default function CommentBoard() {
  // 마침표 길잡이: "방명록." 끝
  const secRef = useRef(null);
  useEffect(() => {
    const st = guideZone(secRef.current, () => secRef.current?.querySelector("h2 .gd-p"), { start: "top 60%", end: "bottom 75%" });
    return () => st.kill();
  }, []);
  const [comments, setComments] = useState([]);
  const [nickname, setNickname] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const [burst, setBurst] = useState(0);
  const [fresh, setFresh] = useState(() => new Set());
  const loaded = useRef(false);

  useEffect(() => {
    if (!db) return; // .env(Firebase 설정)가 없으면 방명록을 불러오지 않습니다.
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"), limit(30));
    return onSnapshot(q, (snap) => {
      // 처음 불러올 때는 강조하지 않고, 그 뒤에 새로 들어온 글만 잠깐 강조합니다.
      if (loaded.current) { const ids = snap.docChanges().filter((c) => c.type === "added").map((c) => c.doc.id); if (ids.length) setFresh((f) => new Set([...f, ...ids])); }
      loaded.current = true;
      setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    },
      () => setStatus({ ok: false, msg: "방명록을 불러오지 못했습니다." }));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const msg = text.trim();
    if (!msg) return setStatus({ ok: false, msg: "남기실 말을 입력해 주세요." });
    setSending(true);
    try {
      if (!db) throw new Error("Firebase 설정(.env)이 없습니다.");
      await addDoc(collection(db, "comments"), { text: msg, nickname: nickname.trim() || "익명", createdAt: serverTimestamp() });
      setText("");
      setBurst((b) => b + 1);
      setStatus({ ok: true, msg: "남겨 주셔서 감사합니다." });
    } catch {
      setStatus({ ok: false, msg: "저장하지 못했습니다. 잠시 후 다시 시도해 주세요." });
    } finally {
      setSending(false);
    }
  };

  return (
    <section ref={secRef} id="board" className="relative mt-8 overflow-clip rounded-b-[48px] proj-bg text-ink md:mt-14">
      <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-36">
      <SectionHead no="04" label="Guestbook" title="방명록" dot desc="포트폴리오에 대한 의견이나 질문을 남겨 주세요." />
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-accent shadow-[0_10px_24px_-14px_rgba(47,140,255,.6)]"><span aria-hidden="true">💬</span>글 {comments.length}개</p>
          <ul data-lenis-prevent className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
            {comments.length === 0 && <li className="rounded-3xl border border-dashed border-accent/30 bg-white/60 p-10 text-center text-mute">아직 남겨진 글이 없습니다.</li>}
            <AnimatePresence initial={false}>
              {comments.map((c) => (
                <motion.li key={c.id} layout initial={{ opacity: 0, y: -24, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 26 }} className={`gb-card flex gap-4 rounded-3xl p-5 ring-1 ring-white transition-transform hover:-translate-y-1 ${fresh.has(c.id) ? "gb-fresh" : ""}`}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-lg font-extrabold text-white" style={{ background: hue(c.nickname) }} aria-hidden="true">{[...(c.nickname || "익")][0]}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3"><b className="truncate text-ink">{c.nickname}</b><span className="shrink-0 font-mono text-xs tabular-nums text-mute">{fmt(c.createdAt)}</span></div>
                    <p className="mt-1.5 break-words text-[15px] leading-relaxed text-ink/80">{c.text}</p>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
        <form onSubmit={submit} className="relative h-fit overflow-hidden rounded-[32px] bg-gradient-to-br from-[#2f8cff] to-[#2f8cff] p-7 text-white shadow-[0_40px_80px_-36px_rgba(47,140,255,.7)] lg:sticky lg:top-28">
          <span className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/25 blur-3xl" aria-hidden="true" />
          <h3 className="relative text-2xl font-extrabold tracking-[-0.04em]">한마디 남기기</h3>
          <p className="relative mt-1 text-sm text-white/80">이름은 별명으로 적어도 됩니다.</p>
          <input value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={49} autoComplete="off" aria-label="이름 또는 별명" placeholder="이름 또는 별명" className={`${field} relative mt-5`} />
          <textarea value={text} onChange={(e) => setText(e.target.value)} maxLength={499} rows={4} aria-label="남길 말" placeholder="남기고 싶은 말을 입력해 주세요" className={`${field} relative mt-3 resize-none`} />
          <p className="relative mt-1.5 text-right font-mono text-xs tabular-nums text-white/75">{text.length} / 499</p>
          <div className="relative mt-2">
            <button type="submit" disabled={sending} className="btn mt-0 w-full !bg-white !text-accent">{sending ? "전송 중" : "전송하기"}</button>
            {burst > 0 && <Burst key={burst} />}
          </div>
          <p role="status" className={`relative mt-3 min-h-6 text-sm font-bold ${status?.ok ? "text-white" : "text-[#ffe1e4]"}`}>{status?.msg}</p>
        </form>
      </div>
      </div>
    </section>
  );
}
