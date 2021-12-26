import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import FeedBackComponent from "../../../../Components/UI/FEEDBACK/feedback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import EditFeedbackComponent from "../../../../Components/UI/EDITFEEDBACK/editfeedback";
import { useStateContext } from "../../../../Components/Provider/Provider";
const ProductPage: NextPage = (props: any) => {
  const globalState:any = useStateContext()
  const ls = require("local-storage");
  const [commentData, setCommentData] = useState([] as any[]);

  useEffect(() => {
      async function GetComments() {
        try {
          const response = await axios({
            method: "get",
            url: `http://127.0.0.1:8000/comments/comment/${props.query.feedbackid}`,
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
        GetComments()
    
  }, [props.query.feedbackid, ls]);

  return (
    <div className=" bg-gray-200 dark:bg-gray-200 h-screen relative">

        <EditFeedbackComponent post_id={commentData.post_id} comment_id={commentData.id} comment_title={commentData.title}/>
      <div className="bg-gray-200 mb-4 flex capitalize h-auto p-3 text-dark justify-between items-center">
      <Link href={`/products/${props.query.productid}`}>
          <a>
              <div className="flex items-center">
              <FontAwesomeIcon icon={faChevronLeft} />

              <div className="font-bold text-lg ml-4">Go Back</div>

              </div>
        </a>
        </Link>
        <div>
        <Button className="" onClick ={globalState.createEditfeedbacktoggle} >
            <span className="text-xs font-bold">Edit Feedback</span>
        </Button>
        </div>
      
      </div>
      <FeedBackComponent feedbackTitle={commentData.title} feedbackComment={commentData.content} feedbackUpvotes="0" commentAmount="0"/>      

    </div>
  );
};

export default ProductPage;

export async function getServerSideProps(context: any) {
  // Pass data to the page via props
  return { props: { query: context.query } };
}
