import React, {useContext, useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios'
import { useRouter } from "next/router";
import {useStateContext} from '../../Provider/Provider'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../styles/create_post_styles/create_posts.module.css";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

interface CreateProps {

}
export default function CreateProductComponent(Props: CreateProps){
    const [productTitle, setProductTitle] = useState("");
    const [productBody, setProductBody] = useState("");
    const router = useRouter();
    const globalState:any = useStateContext()
    const axios = require('axios').default;
    const ls = require('local-storage');

  async function CreatePost() {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://fastapi-socialmedia-crud.herokuapp.com/posts/',
        data: {
            "title":productTitle,
            "content":productBody,
        },
        headers:{
          "Authorization": ls.get("token")
        }
    });
    globalState.createPosthide();
    setProductTitle("");
    setProductBody("");

    } catch (error) {
      console.error(error);
    }
  }

    function validateForm() {
      return productTitle.length > 0 && productTitle.length < 50 && productBody.length > 0 && productBody.length < 250;
    }
  
    function handleSubmit(event:any) {
      event.preventDefault();
      CreatePost();
    }   
    
    function onCancel(){
      globalState.createPosthide()
      setProductTitle("");
      setProductBody("");  
    }

    return(
        <div className={`bg-white rounded-xl p-8 dark:bg-gray-0 w-96 max-w-lg flex justify-center container items-center flex-col ${styles.mobilemenu} ${globalState.createPostOpen ? styles.mobileactive : ''}`}>
        <Form onSubmit={handleSubmit}>
          <Form.Group  controlId="title" className="mb-4">
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              autoFocus
              type="title"
              className="bg-project-light-gray"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group  controlId="body">
            <Form.Label>Product Description <span className="text-xs">(Max 250 letters)</span></Form.Label>
            <Form.Control
              type="body"
              value={productBody}
              as="textarea" rows={3}
              className="bg-project-light-gray"

              onChange={(e) => setProductBody(e.target.value)}
            />
          </Form.Group>
          <div className="flex flex-column">
        <Button type="submit" disabled={!validateForm()} className="mt-4 bg-regal-blue text-light font-bold" variant="flat">
          Add Feedback
        </Button>
        <Button onClick={onCancel} className="mt-4 font-bold bg-slate-600 text-light	" variant ="flat">
          Cancel
        </Button>
       
        </div>
        </Form>
      </div>
    )
}
