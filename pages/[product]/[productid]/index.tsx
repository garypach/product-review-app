import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import FeedBackComponent from "../../../Components/UI/FEEDBACK/feedback";
import { useStateContext } from "../../../Components/Provider/Provider";
import AddFeedbackComponent from "../../../Components/UI/ADDFEEDBACK/addfeedback";

interface Array {
  title: string;
  id: number;
}

const ProductPage: NextPage = (props: any) => {
  const globalState: any = useStateContext();
  const ls = require("local-storage");
  const [data, setData] = useState<Array>({ title: "", id: null });
  const [commentData, setCommentData] = useState([] as any[]);
  const [commentDataCopy, setCommentDataCopy] = useState([] as any[]);

  const allTags = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];
  const [tagButtons, setTagButtons] = useState(allTags);

  useEffect(() => {
    async function GetProduct() {
      try {
        const response = await axios({
          method: "get",
          url: `https://fastapi-socialmedia-crud.herokuapp.com/posts/${props.query.productid}`,
          headers: {
            Authorization: ls.get("token"),
          },
        });
        setData(response.data.Post);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      async function GetComments() {
        try {
          const response = await axios({
            method: "get",
            url: `https://fastapi-socialmedia-crud.herokuapp.com/comments/${props.query.productid}`,
            headers: {
              Authorization: ls.get("token"),
            },
          });
          setCommentData(response.data);
          setCommentDataCopy(response.data);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
      GetComments();
    }
    GetProduct();
  }, [props.query.productid, ls]);

  //Filter Function
  const filter = (tag: string) => {
    let commentDataCopy;
    let filteredData;
    if (tag === "All") {
      commentDataCopy = commentData;
      setCommentDataCopy(commentDataCopy);

      return;
    }

    filteredData = commentData.filter((item) => item.Comment.tag === tag);
    commentDataCopy = filteredData;
    setCommentDataCopy(commentDataCopy);
    console.log(commentData);
  };


  const showComments = () => {
    {
      if (commentData.length === 0) {
        return (
          <div className="w-full  bg-white flex flex-column items-center relative rounded-xl p-8 mt-4">
            <Image
              src="/illustration-empty.svg"
              alt="Picture of the author"
              width={300}
              height={300}
            />
            <div className="text-center mt-3">
              Got a suggestion? Found a bug that needs to be squashed? We love
              hearing about new ideas to improve our app.
            </div>
            <div className="text-center mt-4">
              <Button
                className="bg-fuchsia-600 text-light font-bold"
                variant="flat"
                onClick={globalState.createAddfeedbacktoggle}
              >
                <span className="text-xs font-bold">+ Add Feedback</span>
              </Button>
            </div>
          </div>
        );
      } else {
        return commentDataCopy.map((item: any) => {
          return (
            <div className="mt-4" key={item.Comment.id}>
              <Link
                href={`/products/${item.Comment.post_id}/details/${item.Comment.id}`}
              >
                <a className="no-underline">
                  <FeedBackComponent
                    feedbackTitle={item.Comment.title}
                    feedbackComment={item.Comment.content}
                    feedbackTag={item.Comment.tag}
                    feedbackUpvotes={item.commentvotes}
                    commentAmount={item.replies}
                    commentid=""
                  />
                </a>
              </Link>
            </div>
          );
        });
      }
    }
  };

  return (
    <div className="sm:p-4 h-fit lg:flex lg:items-start lg:justify-center bg-project-medium-gray min-h-screen">
      <div className="sm:flex sm:mb-4 lg:w-100 sm:justify-between lg:flex-col lg:mr-10">
        <div className="bg-gray-100 relative capitalize h-auto p-3 text-light bg-gradient-to-r from-violet-500 to-fuchsia-500 flex-column  sm:rounded-xl sm:w-80 sm:mr-4 lg:m-0 lg:mb-5 lg:w-100">
          <div className="font-bold text-lg">{data?.title}</div>
          <div className="text-s italic">Feedback Board</div>
        </div>
        <div className=" w-full hidden bg-white rounded-xl p-3 dark:bg-gray-0 sm:h-26 sm:flex sm:flex-wrap sm:justify-center lg:w-80">
          {/* <div className="text-regal-blue m-1.5 bg-project-medium-gray py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              All
            </div>
            <div className="text-regal-blue m-1.5 bg-project-medium-gray py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              UI
            </div>
            <div className="text-regal-blue  m-1.5 bg-project-medium-gray py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              UX
            </div>
            <div className="text-regal-blue m-1.5 bg-project-medium-gray py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              Enhancement
            </div>
            <div className="text-regal-blue  m-1.5 bg-project-medium-gray py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              Bug
            </div>
            <div className="text-regal-blue m-1.5  bg-project-medium-gray py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              Feature
            </div> */}
          <TagButton buttons={tagButtons} filter={filter} />
        </div>
      </div>

      <div className="lg:w-full">
        <div className="bg-gray-100 flex h-auto p-3 dark:bg-gray-800 items-center justify-between sm:rounded-xl ">
          <div className="flex text-light items-center">
            <div className="text-s">Sort by:</div>
            <Dropdown>
              <Dropdown.Toggle
                variant="flat"
                id="dropdown-basic"
                className="text-white border-none"
              >
              
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => {commentDataCopy.sort((a, b) => b.commentvotes - a.commentvotes); setCommentDataCopy([...commentDataCopy]);console.log(commentDataCopy)}}>
                 Most Votes
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {commentDataCopy.sort((a, b) => a.commentvotes - b.commentvotes);setCommentDataCopy([...commentDataCopy]); console.log(commentDataCopy)}}>
                  Least Votes
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {commentDataCopy.sort((a, b) => b.replies - a.replies);setCommentDataCopy([...commentDataCopy]); console.log(commentDataCopy)}}>
                  Most Comments
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {commentDataCopy.sort((a, b) => a.replies - b.replies);setCommentDataCopy([...commentDataCopy]); console.log(commentDataCopy)}}>
                Least Comments

                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>{" "}
          </div>
          <AddFeedbackComponent post_id={data?.id} />
          <Button
            className="bg-fuchsia-600 text-light font-bold"
            variant="flat"
            onClick={globalState.createAddfeedbacktoggle}
          >
            <span className="text-xs font-bold">+ Add Feedback</span>
          </Button>
        </div>

        <div className=" w-96 sm:w-full mx-auto rounded-xl flex flex-column mt-4">
          {showComments()}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

function TagButton({ buttons, filter }: any) {
  return (
    <div className="tagbuttons">
      {buttons.map((tag: any, i: any) => {
        return (
          <Button
            key={i}
            type="button"
            onClick={() => filter(tag)}
            className="text-regal-blue  m-1.5 bg-project-medium-gray py-2 px-3 font-bold rounded-xl text-sm cursor-pointer"
          >
            {tag}
          </Button>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  // Pass data to the page via props
  return { props: { query: context.query } };
}
