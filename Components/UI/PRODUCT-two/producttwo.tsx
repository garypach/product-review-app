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

interface ProductProps {
    productTitle: string,
    commentAmount: any,
}
export default function ProductTwoComponent(Props: ProductProps) {
  return (
    <div className="bg-white border-4 border-indigo-100 border-t-regal-blue rounded-xl p-8  h-52 lg:h-60 mx-auto w-full lg:w-96 rounded-xl  flex  flex-column items-start justify-around container">
        <div>
        <div className="text-left space-y-4">
      <div className="text-regal-blue">
        {Props.productTitle}
      </div>
      <div className="text-gray-700 dark:text-gray-500">
        Product Description
      </div>    
      </div>
        </div>
        <div className="text-regal-blue">
        <FontAwesomeIcon icon={faComment} className="mr-2"/>
        <span className="text-dark">
        {Props.commentAmount}
        </span>
        </div>
      </div>
  );
}
