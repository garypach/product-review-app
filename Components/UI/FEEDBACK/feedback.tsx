import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useRouter } from "next/router";
import { useStateContext } from "../../Provider/Provider";
import localStorage from "local-storage";
import styles from "../../../styles/login_styles/login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";


interface FeedbackProps {
    feedbackTitle: string,
    feedbackComment:string,
    feedbackTag:string,
    commentAmount: any,
    feedbackUpvotes:any,
    commentid:any,
}

export default function FeedBackComponent(Props: FeedbackProps) {
  const ls = require('local-storage');

  async function AddVote() {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/commentvotes/',
        data: {
            "comment_id":Props.commentid,
            "dir":1,
        },
        headers:{
          "Authorization": ls.get("token")
        }
    });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="bg-white relative sm:container w-100 mx-auto rounded-xl p-8 flex flex-col-reverse md:flex-row items-start">
          <div onClick={AddVote} className="text-regal-blue z-40 bg-project-medium-gray w-fit py-2 px-3 font-bold rounded-xl text-sm cursor-pointer mr-16 ">
        <FontAwesomeIcon icon={faThumbsUp} className="mr-2 hover:text-sky-700"/>
        {Props.feedbackUpvotes}
        </div>
        <div>
        <div className="mb-4 ">
      <div className="text-regal-blue mb-3">
        {Props.feedbackTitle}
      </div>
      <div className="text-gray-700 dark:text-gray-500">
        {Props.feedbackComment}
      </div>
      <div className="text-regal-blue  bg-project-medium-gray mt-8 py-2 px-3 font-bold rounded-xl text-sm cursor-pointer w-fit">
        {Props.feedbackTag}
      </div>      
      </div>
        </div>
      
        <div className="absolute right-10 md:top-20">
        <FontAwesomeIcon icon={faComment} className="mr-2 text-stone-400"/>
        {Props.commentAmount}
        </div>
    </div>
  );
}
