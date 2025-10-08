// src/types/post.ts
// 앱 전체에서 공통으로 쓰는 "정규화된" Post 타입.
// likeIt은 number로 고정(컨텍스트에서 정규화해 공급).

export interface Post {
  id: number;
  title: string;
  summary: string;
  date: string;
  likeIt: number; // ✅ 숫자 보장
  content?: string; // 홈 카드엔 없을 수 있어 optional 권장
}
