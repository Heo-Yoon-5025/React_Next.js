"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import dataTexts from "@/app/data/dataText";
import { useState } from "react";
import { usePosts } from "@/app/context/PostContext";
import { useParams } from "next/navigation";
import type { Post } from "@/types/post";

interface DetailContentProps {
  post: Post;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

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

export default function Detail() {
  const { posts, loading, error } = usePosts();
  const params = useParams();
  const postId = Number(params.id);
  const [count, setCount] = useState(0);

  const post = posts.find((p) => p.id === postId);

  if (loading) {
    return <div className="m-3 text-center">데이터 로딩 중입니다...</div>;
  }

  if (error) {
    return (
      <div className="m-3 text-danger text-center">
        데이터를 불러오는 데 실패했습니다.
      </div>
    );
  }

  if (!post) {
    return (
      <div className="m-3 text-center">
        해당 포스트를 찾을 수 없습니다. (ID: {postId})
      </div>
    );
  }

  return (
    <div>
      <h4>{dataTexts[0].subCaps3}</h4>
      <Details post={post} count={count} setCount={setCount} />
      <Comment />
    </div>
  );
}
function Details({ post, count, setCount }: DetailContentProps) {
  return (
    <>
      <div className="card m-3">
        <img
          src={
            `https://raw.githubusercontent.com/lshjju/cdn/refs/heads/main/girls/` +
            (post.id + 1) +
            `.PNG`
          }
          className="card-img-top"
          alt="..."
        />

        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.content}</p>
          <p className="card-text">작성일: {post.date}</p>
          <div className="mt-2">
            <button
              type="button"
              className="btn active"
              onClick={() => {
                setCount(count + 1);
              }}
              data-bs-toggle="button"
              aria-pressed="true"
            >
              ❤️️
            </button>
            <span> {count + Number(post.likeIt)} </span>
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
