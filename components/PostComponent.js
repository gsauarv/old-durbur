import Link from "next/link";
import React from "react";
import WrapperContainer from "./WrapperContainer";
import { BiArrowBack } from "react-icons/bi";

function PostComponent({ title, blogContent, coverPhoto }) {
  return (
    <WrapperContainer>
      <main>
        <Link href={"/"}>
          <a>
            <div className="flex justify-between w-40 hover:cursor-pointer hover:underline align-middle  h-10 text-center my-6  rounded-lg self-start">
              <BiArrowBack className="self-start text-lg text-center " />
              <p>Back To Home</p>
            </div>
          </a>
        </Link>

        <h1 className="text-2xl text-left font-bold my-4">{title}</h1>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: blogContent }}
        />
      </main>
    </WrapperContainer>
  );
}

export default PostComponent;
