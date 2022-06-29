import React from "react";
import WrapperContainer from "./WrapperContainer";

function PostComponent({ title, blogContent, coverPhoto }) {
  return (
    <WrapperContainer>
      <main>
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
