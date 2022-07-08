import Link from "next/link";
import React from "react";

function Blogcard({ title, author, coverPhoto, datePublished, slug }) {
  return (
    <Link href={"blog/" + slug}>
      <div className="my-5 hover:cursor-pointer">
        {/* image cover */}
        <div className="overflow-hidden rounded-md bg-slate-600 mt-2">
          <img
            src={coverPhoto.url}
            alt={title}
            className={
              "h-[250px] overflow-hidden object-cover object-center mx-auto w-full rounded-lg"
            }
          />
        </div>
        {/* title */}
        <h1 className="text-lg text-gray-600 font-bold">{title}</h1>
        {/* read time */}
        <div className="flex gap-2  h-4 align-middle">
          {/* min read */}
          <span className="text-sm">
            <span className="text-gray-400">5 min read</span>
          </span>
          <div className="h-2 bg-slate-500 w-2 rounded-full mt-[6px]"></div>
          <p className="text-sm text-gray-400">{datePublished}</p>
        </div>
      </div>
    </Link>
  );
}

export default Blogcard;
