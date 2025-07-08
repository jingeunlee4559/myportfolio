import React, { useState, useEffect } from "react";
// ✨ 1. Firebase 설정 파일 및 Firestore 함수들 임포트
import { db } from '../firebaseConfig'; // firebaseConfig.js 파일 경로에 맞춰주세요
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";

function CommentBoard() {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState(""); // 사용자에게 메시지를 표시할 상태 추가

  // 메시지를 설정하고 일정 시간 후에 지우는 함수
  const showMessage = (msg, type = "success") => {
    setMessage({ text: msg, type: type });
    setTimeout(() => setMessage(""), 3000); // 3초 후 메시지 지우기
  };

  // ✨ 2. Firestore에서 실시간으로 댓글을 불러오는 useEffect 훅
  useEffect(() => {
    // 'comments' 컬렉션을 'createdAt' 필드 기준으로 내림차순 정렬 쿼리
    const commentsQuery = query(
      collection(db, "comments"),
      orderBy("createdAt", "desc")
    );

    // 실시간 리스너 설정
    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => ({
        id: doc.id, // 문서의 고유 ID
        ...doc.data(), // 문서 데이터 (text, nickname, createdAt)
      }));
      setComments(fetchedComments); // 상태 업데이트
      showMessage("댓글이 업데이트되었습니다.", "info"); // 정보 메시지
    }, (error) => {
      console.error("실시간 댓글 로드 중 오류 발생:", error);
      showMessage("댓글 로드 중 오류가 발생했습니다.", "error"); // 에러 메시지
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시 한 번만 실행

  // ✨ 3. 댓글 제출 핸들러 수정 (Firestore에 저장)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    const trimmedNickname = nickname.trim();

    if (!trimmedInput) {
      showMessage("메시지를 입력해주세요!", "error"); // alert 대신 메시지 표시
      return;
    }

    // 닉네임이 비어있으면 "익명"으로 설정
    const finalNickname = trimmedNickname || "익명";

    try {
      await addDoc(collection(db, "comments"), {
        text: trimmedInput,
        nickname: finalNickname,
        createdAt: serverTimestamp(), // 서버 타임스탬프 사용
      });

      // 성공적으로 저장되면 입력 필드 초기화
      setInput("");
      // setNickname(""); // 닉네임을 계속 유지하려면 이 줄을 주석 처리
      showMessage("댓글이 성공적으로 저장되었습니다!", "success");
      console.log("댓글이 Firestore에 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("댓글 저장 중 오류 발생:", error);
      showMessage("댓글 저장에 실패했습니다. 다시 시도해주세요.", "error"); // alert 대신 메시지 표시
    }
  };

  return (
    <div id='board' className="w-full max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-12">
        <span className="inline-block relative pb-6">
          Board
          <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
        </span>
      </h2>

      {/* 메시지 표시 영역 */}
      {message && (
        <div
          className={`px-4 py-3 rounded-lg text-center mb-6 animate-fade-in
            ${message.type === "success" ? "bg-green-100 text-green-800 border border-green-300" : ""}
            ${message.type === "error" ? "bg-red-100 text-red-800 border border-red-300" : ""}
            ${message.type === "info" ? "bg-blue-100 text-blue-800 border border-blue-300" : ""}
          `}
        >
          {message.text}
        </div>
      )}

      <div className="bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-100 rounded-3xl shadow-xl border border-cyan-200 p-8 flex flex-col justify-between" style={{ minHeight: 600 }}>
        {/* 댓글 목록 */}
        <div className={`flex-1 scrollbar-thin scrollbar-thumb-cyan-300 scrollbar-track-sky-50 ${comments.length > 6 ? 'overflow-y-auto max-h-[400px]' : ''}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {comments.length === 0 && (
              <p className="col-span-full text-center text-cyan-500 font-medium">
                아직 메시지가 없습니다. 첫 메시지를 남겨보세요!
              </p>
            )}
            {comments.map((c) => ( // key를 idx 대신 c.id로 변경 (Firebase 문서 ID 사용)
              <div
                key={c.id} // ✨ key를 Firestore 문서 ID로 변경
                className="h-40 bg-white/95 rounded-2xl p-4 shadow border border-cyan-100 flex flex-col overflow-hidden"
              >
                <div className="flex items-center mb-2">
                  <span className="font-bold text-cyan-700">{c.nickname}</span>
                  <span className="flex-1" />
                  <span
                    className="text-xs text-cyan-400 whitespace-nowrap ml-2"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {/* ✨ Firestore Timestamp를 Date 객체로 변환하여 표시 */}
                    {c.createdAt ? new Date(c.createdAt.toDate()).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : '로딩 중...'}
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto max-h-28 text-blue-800 text-base break-words pr-1">
                  {c.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 입력 폼 */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 mt-8 w-full max-w-2xl mx-auto"
        >
          <div className="flex flex-col gap-4 flex-grow">
            {/* 닉네임 입력 필드 */}
            <input
              id="nickname"
              type="text"
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 placeholder-gray-400 shadow focus:ring-2 focus:ring-blue-200 text-base font-medium w-full"
              placeholder="이름 또는 별명을 입력해주세요!"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={49} // ✨ Firestore 보안 규칙과 일치하도록 조정 (50자 미만)
              autoComplete="off"
            />
            {/* 메시지 입력 필드 */}
            <input
              id="message"
              type="text"
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow focus:ring-2 focus:ring-blue-200 text-base w-full"
              placeholder="하고 싶은 말을 입력해주세요!"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={499} // ✨ Firestore 보안 규칙과 일치하도록 조정 (500자 미만)
            />
          </div>
          {/* 전송 버튼 */}
          <button
            type="submit"
            className="w-24 h-24 bg-gray-500 text-white flex items-center justify-center rounded-lg shadow hover:bg-gray-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentBoard;