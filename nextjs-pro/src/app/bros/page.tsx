// src/app/bros/page.tsx
"use client"; // 이 페이지는 클라이언트 컴포넌트로 동작(이벤트/상태/브라우저 API 사용 가능)

import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 CSS
import dataTexts from "../data/dataText"; // 상단 타이틀/네비 텍스트 데이터
import dataBross from "../data/dataBros"; // 브로 리스트 데이터(로컬 JSON 유사 객체)

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

// 브로 데이터의 각 아이템 타입
interface BroItem {
  id: number;
  name: string;
  summary: string;
  follow: string; // 'Follow' | 'Unfollow' 로 좁힐 수도 있음
}

// 자식 컴포넌트(Bro)가 받을 props 타입
interface BroProps {
  items: BroItem[];
}

// 로컬 데이터에 타입 보증을 부여(정적 데이터라면 dataBros.tsx에서 as const를 권장)
const typedDataBross = dataBross as BroItem[];

// 페이지 컴포넌트
export default function Bros() {
  return (
    <div>
      {/* 상단 타이틀 바인딩 */}
      <h4>{dataTexts[0].subCaps1}</h4>

      {/* 리스트 렌더링 */}
      <Bro items={typedDataBross} />

      {/* 페이지네이션(샘플) */}
      <Pagination />
    </div>
  );
}

// 브로 목록을 렌더링하는 컴포넌트
function Bro({ items }: BroProps) {
  return (
    <ol className="list-group list-group-numbered m-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-start"
        >
          {/* 왼쪽: 이름/설명 */}
          <div className="ms-2 me-auto">
            <div className="fw-bold">{item.name}</div>
            <small className="text-body-tertiary">{item.summary}</small>
          </div>

          {/* 오른쪽: Follow/Unfollow 뱃지 (값에 따라 색상 변경) */}
          <span
            className={`badge rounded-pill ${
              item.follow === "Follow" ? "text-bg-success" : "text-bg-primary"
            }`}
          >
            <small>{item.follow}</small>
          </span>
        </li>
      ))}
    </ol>
  );
}

// 페이지네이션(샘플 UI)
function Pagination() {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center m-3">
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
