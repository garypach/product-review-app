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
export default function ProductOneComponent(Props: ProductProps) {
  return (
    <div className="bg-gray-100 rounded-xl p-8 dark:bg-gray-800 flex items-center justify-between">
        <div>
        <div className="text-left space-y-4">
      <div className="text-sky-500 dark:text-sky-400">
        {Props.productTitle}
      </div>
      {/* <div className="text-gray-700 dark:text-gray-500">
        Product Description
      </div>     */}
      </div>
        </div>
        <div className="text-light">
        <FontAwesomeIcon icon={faComment} className="mr-2"/>
        {Props.commentAmount}
        </div>
    
      </div>
  );
}
