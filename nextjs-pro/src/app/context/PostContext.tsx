// src/app/context/PostContext.tsx
"use client"; // Next.js의 클라이언트 컴포넌트임을 명시한다.

import React, {
  createContext, // Context API 인스턴스를 생성한다.
  useContext, // Context 값을 읽어오는 훅.
  useState, // 컴포넌트 내 상태를 관리하기 위한 훅.
  useEffect, // 사이드이펙트를 처리하기 위한 훅 (데이터 fetch 등).
  ReactNode, // children 타입 정의용.
} from "react";
import axios from "axios"; // HTTP 통신 라이브러리.
import type { Post } from "@/types/post"; // 앱 전역 단일 타입 소스.

// JSON 원본 데이터의 예상 구조를 정의 (API 응답 원형)
type RawPost = {
  id: number | string;
  title: string;
  summary: string;
  content?: string; // 일부 데이터에는 content가 없을 수도 있으므로 optional
  date: string;
  likeIt: number | string; // 숫자/문자열 혼용 가능성 있음
};

// Context에서 관리할 데이터 구조를 정의
interface PostContextType {
  posts: Post[]; // 정규화된 포스트 배열
  loading: boolean; // 로딩 상태
  error: string | null; // 에러 메시지
}

// Context 생성 (초기값 undefined → Provider 외부에서 접근 방지)
const PostContext = createContext<PostContextType | undefined>(undefined);

// Provider 컴포넌트 — 데이터를 fetch하고 children에게 공급
export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // GitHub Raw JSON 데이터 fetch
        const res = await axios.get<RawPost[]>(
          "https://raw.githubusercontent.com/lshjju/cdn/refs/heads/main/text/engtext.json"
        );

        // 🔽 데이터를 정규화하여 Post 타입에 맞게 변환
        const normalized: Post[] = res.data.map((x) => ({
          id: Number(x.id),
          title: String(x.title),
          summary: String(x.summary),
          content: x.content ? String(x.content) : "",
          date: String(x.date),
          likeIt: Number(x.likeIt), // 문자열이라도 number로 통일
        }));

        setPosts(normalized);
      } catch (err) {
        console.error("앗! 포스트를 가져오는 데 문제가 생겼어:", err);
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const value = { posts, loading, error };
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

// Context 소비를 위한 Custom Hook
export const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePosts는 PostProvider 내부에서 사용해야 합니다.");
  }
  return context;
};
