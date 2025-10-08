// src/app/posts/[id]/page.tsx
"use client"; // 이 파일은 클라이언트 컴포넌트에서 실행된다.(이벤트/상태 사용)

import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 CSS
import dataTexts from "@/app/data/dataText"; // 타이틀 등 텍스트 데이터
import { useState } from "react"; // 로컬 상태(좋아요 카운트)에 사용
import { usePosts } from "@/app/context/PostContext"; // ✅ 전역 데이터(Context) 소비 훅
import { useParams } from "next/navigation"; // 동적 라우트 파라미터 접근
import type { Post } from "@/types/post"; // ✅ 단일 소스 타입

// 상세 카드에 내려줄 Props 타입
interface DetailContentProps {
  post: Post; // 표시할 게시물
  count: number; // 페이지 내 추가 좋아요 수
  setCount: React.Dispatch<React.SetStateAction<number>>; // 추가 좋아요 setter
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

// 동적 라우트 상세 페이지 컴포넌트
export default function PostDetailPage() {
  // ✅ 전역 데이터(Context) 소비
  const { posts, loading, error } = usePosts();

  // /posts/[id] 의 [id] 읽기 (예: /posts/3 → params.id === "3")
  const params = useParams<{ id: string }>();
  const postId = Number(params.id); // 문자열 ID를 숫자로 변환

  // 페이지 내 '추가' 좋아요 상태(예: 버튼 클릭 증가분)
  const [count, setCount] = useState(0);

  // 현재 URL의 id와 일치하는 게시물 찾기
  const post = posts.find((p) => p.id === postId);

  // 1) 로딩 처리
  if (loading) {
    return <div className="m-3 text-center">데이터 로딩 중입니다...</div>;
  }

  // 2) 에러 처리
  if (error) {
    return (
      <div className="m-3 text-danger text-center">
        데이터를 불러오는 데 실패했습니다.
      </div>
    );
  }

  // 3) Not Found 처리 (잘못된 id)
  if (!post) {
    return (
      <div className="m-3 text-center">
        해당 포스트를 찾을 수 없습니다. (ID: {postId})
      </div>
    );
  }

  // 4) 정상 렌더링
  return (
    <div>
      {/* 상단 타이틀 - dataTexts[0]에서 상세용 타이틀 사용 */}
      <h4>{dataTexts[0].subCaps3}</h4>

      {/* 상세 카드 */}
      <Details post={post} count={count} setCount={setCount} />

      {/* 댓글 폼 */}
      <Comment />
    </div>
  );
}

// 상세 카드 컴포넌트
function Details({ post, count, setCount }: DetailContentProps) {
  return (
    <>
      <div className="card m-3">
        {/* (개선 여지) next/image 사용 권장 */}
        <img
          src={`https://raw.githubusercontent.com/lshjju/cdn/refs/heads/main/girls/${
            post.id + 1
          }.PNG`}
          className="card-img-top"
          alt={post.title}
        />

        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>

          {/* 상세 내용 - 없을 수 있으니 빈 문자열일 수도 있음(Context에서 보정) */}
          <p className="card-text">{post.content ?? ""}</p>

          <p className="card-text">작성일: {post.date}</p>

          {/* 좋아요: 기본 likeIt(숫자) + 페이지 내 추가 count */}
          <div className="mt-2">
            <button
              type="button"
              className="btn active"
              onClick={() => setCount((v) => v + 1)} // 안전한 증가 패턴
              data-bs-toggle="button"
              aria-pressed="true"
            >
              ❤️️
            </button>
            <span> {count + post.likeIt} </span>
          </div>

          <p className="card-text">
            <small className="text-body-secondary">
              Last updated 3 mins ago
              <br />
              Default like: {post.likeIt}
            </small>
          </p>
        </div>
      </div>
    </>
  );
}

// 부트스트랩 폼 예시(접근성 속성 포함)
function Comment() {
  return (
    <div className="m-3">
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Comment
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll share your story
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>

        <button type="submit" className="btn btn-outline-secondary">
          Submit
        </button>
      </form>
    </div>
  );
}
