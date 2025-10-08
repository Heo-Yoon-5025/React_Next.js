// src/app/page.tsx
"use client"; // 이 페이지는 클라이언트 컴포넌트로 동작한다. (이벤트/상태/브라우저 API 사용)

import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // 부트스트랩 JS(토글/드롭다운 등) - 필요 시만 로드 권장
import Link from "next/link"; // 클라이언트 라우팅
import dataTexts from "./data/dataText"; // 타이틀 등 텍스트 데이터
import React from "react";
import { usePosts } from "./context/PostContext"; // ✅ 전역 데이터(Context) 소비 훅
import type { Post } from "@/types/post"; // ✅ 단일 소스 타입

// PostList 컴포넌트의 props 타입(전역 Post 타입을 그대로 사용)
interface PostProps {
  posts: Post[]; // 카드에 그릴 포스트 배열
  loading: boolean; // 로딩 상태
  error: string | null; // 에러 메시지
}

// (선택) dataTexts 구조 참고용 타입. 실제 안전성은 데이터 파일에서 as const로 보강 가능.
interface DataText {
  main: string;
  subCaps1: string;
  sub1: string;
  subCaps2: string;
  sub2: string;
  subCaps3: string;
  sub3: string;
  footer: string;
}

// 메인 홈 페이지
export default function Home() {
  // ✅ Context에서 전역 데이터 소비
  const { posts, loading, error } = usePosts();

  return (
    <main>
      {/* 상단 타이틀 - dataTexts[0]에서 main 키 사용 */}
      <h4>{dataTexts[0].main}</h4>

      {/* 포스트 카드 리스트 */}
      <PostList posts={posts} loading={loading} error={error} />

      {/* 하단 페이지네이션(샘플) */}
      <Pagination />
    </main>
  );
}

// 게시물 카드 리스트 렌더링
function PostList({ posts, loading, error }: PostProps) {
  // 로딩/에러/정상 렌더링을 세 갈래로 처리
  return (
    <>
      {/* 로딩 중 메시지 */}
      {loading && <p>로딩 중...</p>}

      {/* 에러 메시지 */}
      {error && <p className="text-danger">{error}</p>}

      {/* 정상 데이터일 때만 목록 표시 */}
      {!loading && !error && (
        <div>
          {posts.map((post) => (
            <div key={post.id} className="card m-3">
              {/* (개선 여지) next/image를 사용하면 성능/레이아웃 안정성 개선 */}
              <img
                src={`https://cdn.jsdelivr.net/gh/Heo-Yoon-5025/CDN_IMG@main/nextImg/${
                  post.id + 1
                }.PNG`}
                className="card-img-top"
                alt={post.title}
              />

              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.summary}</p>

                <p className="card-text">
                  <small>{post.date}</small>
                </p>

                {/* likeIt은 Context에서 number로 정규화됨 → 산술/표시 안전 */}
                <p className="card-text">Like it {post.likeIt}</p>

                {/* 상세로 이동: /posts/[id] - 동적 라우트에 맞춘 경로 */}
                <Link
                  href={`/posts/${post.id}`}
                  className="btn btn-outline-secondary"
                >
                  Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// 페이지네이션(샘플 UI)
function Pagination() {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item disabled">
          <a className="page-link">Previous</a>
        </li>

        <li className="page-item">
          <a className="page-link" href="#">
            1
          </a>
        </li>

        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>

        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li>

        <li className="page-item">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
