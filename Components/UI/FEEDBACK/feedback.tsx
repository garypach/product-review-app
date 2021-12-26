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
    commentAmount: any,
    feedbackUpvotes:any,
}
export default function FeedBackComponent(Props: FeedbackProps) {
  return (
    <div className="bg-gray-100 sm:container mx-auto w-96 rounded-xl p-8 dark:bg-gray-0 flex flex-column ">
        <div>
        <div className="mb-5 ">
      <div className="text-sky-700 dark:text-sky-700 mb-3">
        {Props.feedbackTitle}
      </div>
      <div className="text-gray-700 dark:text-gray-500">
        {Props.feedbackComment}
      </div>    
      </div>
        </div>
        <div className="flex items-center justify-between">
        <div className="text-dark bg-gray-200 py-2 px-3 font-bold rounded-xl text-sm cursor-pointer">
        <FontAwesomeIcon icon={faThumbsUp} className="mr-2 hover:text-sky-700"/>
        {Props.feedbackUpvotes}
        </div>
        <div className="">
        <FontAwesomeIcon icon={faComment} className="mr-2 text-stone-400"/>
        {Props.commentAmount}
        </div>
        </div>
      
    </div>
  );
}
