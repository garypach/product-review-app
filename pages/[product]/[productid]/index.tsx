import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { slide as Menu } from 'react-burger-menu'

import FeedBackComponent from "../../../Components/UI/FEEDBACK/feedback";
import { useStateContext } from "../../../Components/Provider/Provider";
import AddFeedbackComponent from "../../../Components/UI/ADDFEEDBACK/addfeedback";
const ProductPage: NextPage = (props: any) => {
  const globalState: any = useStateContext();
  const ls = require("local-storage");
  const [data, setData] = useState([] as any[]);
  const [commentData, setCommentData] = useState([] as any[]);
 
  const styles = {
    bmBurgerButton: {
      position: 'absolute',
      width: '25px',
      height: '20px',
      right:'30px',
      top: '16px',
    },
    bmBurgerBars: {
      background: 'white'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '29px',
      width: '29px'
    },
    bmCross: {
      background: 'black'
    },
    bmMenuWrap: {
      position: 'fixed',
      top:'55px',
      height: '100%'
    },
    bmMenu: {
      background: 'rgb(243 ,244 ,246)',
      padding: '2.5em .5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
  
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }
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
      GetComments();
    }
    GetProduct();
  }, [props.query.productid, ls]);

  const showComments = () => {
    {
      if (commentData.length === 0) {
        return (
          <div className="bg-gray-100 w-100 flex flex-column items-center relative rounded-xl p-8 dark:bg-gray-100 mt-4">
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
        return commentData.map((item: any, index) => (
          <div className="mt-4 w-fit mx-auto" key={item.id}>
            <Link href={`/products/${item.post_id}/details/${item.id}`}>
              <a className="no-underline">
                <FeedBackComponent
                  feedbackTitle={item.title}
                  feedbackComment={item.content}
                  feedbackTag={item.tag}
                  feedbackUpvotes="0"
                  commentAmount="0"
                />
              </a>
            </Link>
          </div>
        ));
      }
    }
  };

  return (
    <div className=" bg-gray-200 dark:bg-gray-200 sm:p-4 h-fit">
      <div className="sm:flex sm:mb-4 sm:justify-between">
      <div className="bg-gray-100 relative capitalize h-auto p-3 text-light bg-gradient-to-r from-violet-500 to-fuchsia-500 flex-column  sm:rounded-xl sm:w-80 sm:mr-4">
        <div className="font-bold text-lg">{data.title}</div>
        <div className="text-s italic">Feedback Board</div>
        {/* <Menu className="sm" styles={ styles } width={ '300px' } right noOverlay>
          <div className="flex flex-wrap w-100 bg-white rounded-xl p-3 dark:bg-gray-0 ">
            <div className="text-regal-blue m-1.5 bg-gray-200 py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              all
            </div>
            <div className="text-regal-blue m-1.5 bg-gray-200 py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              UI
            </div>
            <div className="text-regal-blue  m-1.5 bg-gray-200 py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              UX
            </div>
            <div className="text-regal-blue m-1.5 bg-gray-200 py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              Enhancement
            </div>
            <div className="text-regal-blue  m-1.5 bg-gray-200 py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              Bug
            </div>
            <div className="text-regal-blue m-1.5  bg-gray-200 py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              Feature
            </div>
          </div>
        </Menu> */}
        
      </div>
      <div className="sm:flex flex-wrap w-100 hidden bg-white rounded-xl p-3 dark:bg-gray-0 sm:max-w-lg sm:h-26 ">
            <div className="text-regal-blue m-1.5 bg-gray-200 py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              All
            </div>
            <div className="text-regal-blue m-1.5 bg-gray-200 py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              UI
            </div>
            <div className="text-regal-blue  m-1.5 bg-gray-200 py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              UX
            </div>
            <div className="text-regal-blue m-1.5 bg-gray-200 py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              Enhancement
            </div>
            <div className="text-regal-blue  m-1.5 bg-gray-200 py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              Bug
            </div>
            <div className="text-regal-blue m-1.5  bg-gray-200 py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
              Feature
            </div>
          </div>
      </div>
      
      <div className="bg-gray-100 flex h-auto p-3 dark:bg-gray-800 items-center justify-between sm:rounded-xl ">
        <div className="flex text-light">
          <div className="text-s">Sort by:</div>
          <div className="text-m font-bold">Most Votes</div>
        </div>
        <AddFeedbackComponent post_id={data.id} />
        <Button
          className="bg-fuchsia-600 text-light font-bold"
          variant="flat"
          onClick={globalState.createAddfeedbacktoggle}
        >
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
