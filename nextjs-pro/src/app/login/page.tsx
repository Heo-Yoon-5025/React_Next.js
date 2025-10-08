// src/app/login/page.tsx
"use client"; // 이 페이지는 클라이언트 컴포넌트로 동작(이벤트/상태/브라우저 API 사용 가능)

import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 CSS (이 페이지는 JS 번들 불필요)

import { useState } from "react"; // 폼 상태 및 이벤트 처리용

export default function Login() {
  // 간단한 폼 상태 (실서비스에선 폼 라이브러리/검증을 권장)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);

  // 기본 제출 이벤트 방지 + 임시 처리
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지
    // TODO: 서버 액션/Route Handler 호출로 로그인 처리
    console.log({ email, password, autoLogin });
    alert("Demo: 콘솔을 확인해 보세요!");
  };

  return (
    <div className="m-3">
      <h4>Log in</h4>

      {/* 접근성: <form>에 onSubmit, 라벨 htmlFor/id 매칭 */}
      <form onSubmit={onSubmit}>
        {/* 이메일 */}
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              id="inputEmail3"
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email} // ← 컨트롤드 인풋
              onChange={(e) => setEmail(e.target.value)}
              required // ← 브라우저 기본 검증
              autoComplete="email"
            />
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              id="inputPassword3"
              type="password"
              className="form-control"
              value={password} // ← 컨트롤드 인풋
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
        </div>

        {/* 자동 로그인 체크 */}
        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input
                id="gridCheck1"
                className="form-check-input"
                type="checkbox"
                checked={autoLogin}
                onChange={(e) => setAutoLogin(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="gridCheck1">
                Auto login
              </label>
            </div>
          </div>
        </div>

        {/* 제출 버튼 */}
        <button type="submit" className="btn btn-primary">
          Log in
        </button>
      </form>
    </div>
  );
}
