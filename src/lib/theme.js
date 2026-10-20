import { useSyncExternalStore } from "react";

// 다크/라이트 상태는 <html class="dark"> 하나로 관리합니다. 새로고침하면 항상 라이트로 시작합니다.
const subs = new Set();
const get = () => document.documentElement.classList.contains("dark");
export function setTheme(dark) {
  document.documentElement.classList.toggle("dark", dark);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#0a1022" : "#dff1ff");
  subs.forEach((f) => f());
}
export const useDark = () => useSyncExternalStore((cb) => { subs.add(cb); return () => subs.delete(cb); }, get, () => false);
