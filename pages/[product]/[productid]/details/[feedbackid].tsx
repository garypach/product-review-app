import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import Form from "react-bootstrap/Form";

import FeedBackComponent from "../../../../Components/UI/FEEDBACK/feedback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import EditFeedbackComponent from "../../../../Components/UI/EDITFEEDBACK/editfeedback";
import { useStateContext } from "../../../../Components/Provider/Provider";

interface Array {
  title: string;
  id: number;
  Comment:any;
  post_id:number;
  commentvotes:number;
  replies:number;
}

const ProductPage: NextPage = (props: any) => {
  const globalState: any = useStateContext();
  const ls = require("local-storage");
  const [commentData, setCommentData] = useState<Array>({ title: "", id: null,Comment:{},post_id:null,commentvotes:null,replies:null });
  const [replyData, setReplyData] = useState([] as any[]);
  const [commentBody, setCommentBody] = useState("");

  async function AddComment() {
    try {
      const response = await axios({
        method: "post",
        url: "https://fastapi-socialmedia-crud.herokuapp.com/replys",
        data: {
          content: commentBody,
          comment_id: props.query.feedbackid,
        },
        headers: {
          Authorization: ls.get("token"),
        },
      });
      setCommentBody("");
    } catch (error) {
      console.error(error);
    }
  }

  function validateForm() {
    return commentBody.length > 0 && commentBody.length < 250;
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    AddComment();
  }

  useEffect(() => {
    async function GetComments() {
      try {
        const response = await axios({
          method: "get",
          url: `https://fastapi-socialmedia-crud.herokuapp.com/comments/comment/${props.query.feedbackid}`,
          headers: {
            Authorization: ls.get("token"),
          },
        });
        setCommentData(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    async function GetReplys() {
      try {
        const response = await axios({
          method: "get",
          url: `https://fastapi-socialmedia-crud.herokuapp.com/replys/${props.query.feedbackid}`,
          headers: {
            Authorization: ls.get("token"),
          },
        });
        setReplyData(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    GetComments();
    GetReplys();
  }, [props.query.feedbackid, ls]);

  const showReplys = () => {
    return replyData.map((item: any, index) => (
      <div className="mt-4 border-b-2 border-stone-200 bg-white" key={item.id}>
        <div className="mb-4">
          @{item.owner.email.slice(0, item.owner.email.lastIndexOf("@"))}
        </div>
        <div className="mb-5">{item.content}</div>
      </div>
    ));
  };

  return (
    <div className=" bg-project-medium-gray p-4 min-h-screen relative">
      <EditFeedbackComponent
        post_id={commentData.post_id}
        comment_id={commentData?.id}
        comment_title={commentData?.Comment?.title}
      />
      <div className=" mb-4 flex capitalize h-auto text-dark justify-between items-center">
        <Link href={`/products/${props.query.productid}`}>
          <a className="no-underline">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faChevronLeft} />

              <div className="font-bold text-lg ml-4">Go Back</div>
            </div>
          </a>
        </Link>
        <div>
          <Button
            className="bg-regal-blue"
            onClick={globalState.createEditfeedbacktoggle}
          >
            <span className="text-xs font-bold">Edit Feedback</span>
          </Button>
        </div>
      </div>
      <FeedBackComponent
        feedbackTitle={commentData.Comment.title}
        feedbackComment={commentData.Comment?.content}
        feedbackTag={commentData.Comment?.tag}
        feedbackUpvotes={commentData.commentvotes}
        commentAmount={commentData.replies}
        commentid={commentData.Comment?.id}

      />

      <div className="bg-white sm:container mx-auto w-100 rounded-xl p-8 dark:bg-gray-0 flex flex-column mt-4">
        <div className="font-bold">{replyData.length} Comments</div>
        {showReplys()}
      </div>

      <div
        className={`bg-white mt-5 w-100 justify-center items-center bg-white sm:container mx-auto rounded-xl p-8 flex flex-column mt-4`}
      >
        <Form onSubmit={handleSubmit} className="w-100">
          <Form.Group controlId="body">
            <Form.Label className="text-lg font-bold mb-4">
              Add Comment{" "}
              <span className="text-xs font-light">(Max 250 characters)</span>
            </Form.Label>
            <Form.Control
              type="body"
              value={commentBody}
              placeholder="Type your comment"
              as="textarea"
              rows={4}
              className="bg-project-medium-gray"
              onChange={(e) => setCommentBody(e.target.value)}
            />
          </Form.Group>

          <div className="text-right">
            <Button
              type="submit"
              disabled={!validateForm()}
              className="mt-4 p-2 bg-fuchsia-600 border-none font-bold"
            >
              Post Comment
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProductPage;

export async function getServerSideProps(context: any) {
  // Pass data to the page via props
  return { props: { query: context.query } };
}
