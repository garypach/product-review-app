import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import FeedBackComponent from "../../../Components/UI/FEEDBACK/feedback";
import { useStateContext } from '../../../Components/Provider/Provider'
import AddFeedbackComponent from "../../../Components/UI/ADDFEEDBACK/addfeedback";

const ProductPage: NextPage = (props: any) => {
  const globalState:any = useStateContext()
  const ls = require("local-storage");
  const [data, setData] = useState([] as any[]);
  const [commentData, setCommentData] = useState([] as any[]);

  useEffect(() => {
    async function GetProduct() {
      try {
        const response = await axios({
          method: "get",
          url: `http://127.0.0.1:8000/posts/${props.query.productid}`,
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
            url: `http://127.0.0.1:8000/comments/${props.query.productid}`,
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
    }
    GetProduct();
  }, [props.query.productid, ls]);

  
  const showComments = () =>{
    {if (commentData.length === 0){
      return (
        <div className="bg-gray-100 w-100 rounded-xl p-8 dark:bg-gray-100 mt-4">
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
          <Button className="">
            <span className="text-xs font-bold">+ Add Feedback</span>
          </Button>
        </div>
      </div>
      )
    }
    else{
      return commentData.map((item:any, index)=>(
        <div className="mt-4" key={item.id}>

        <Link href={`/products/${item.post_id}/details/${item.id}`} >
          <a>
          <FeedBackComponent feedbackTitle={item.title} feedbackComment={item.content} feedbackUpvotes="0" commentAmount="0"/>
          </a>
        </Link>
       </div>
      ))
    }
    }
  }
  

  return (
    <div className=" bg-gray-200 dark:bg-gray-200">
      <div className="bg-gray-100 capitalize h-auto p-3 text-light bg-gradient-to-r from-violet-500 to-fuchsia-500 flex-column justify-end">
        <div className="font-bold text-lg">{data.title}</div>
        <div className="text-s italic">Feedback Board</div>
      </div>
      <div className="bg-gray-100 flex h-auto p-3 dark:bg-gray-800 items-center justify-between">
        <div className="flex text-light">
          <div className="text-s">Sort by:</div>
          <div className="text-m font-bold">Most Votes</div>
        </div>
        <AddFeedbackComponent post_id={data.id}/>
        <Button className="" onClick ={globalState.createAddfeedbacktoggle}>
          <span className="text-xs font-bold">+ Add Feedback</span>
        </Button>
      </div>
      {showComments()}
    </div>
  );
};

export default ProductPage;

export async function getServerSideProps(context: any) {
  // Pass data to the page via props
  return { props: { query: context.query } };
}
