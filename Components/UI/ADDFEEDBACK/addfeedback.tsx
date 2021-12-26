import React, {useContext, useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios'
import { useRouter } from "next/router";
import {useStateContext} from '../../Provider/Provider'
import Link from "next/link";
import styles from "../../../styles/add_feedback_styles/add_feedback.module.css";

interface FeedbackProps {
post_id:any
}
export default function AddFeedbackComponent(props:FeedbackProps){
    const [feedbackTitle, setFeedbackTitle] = useState("");
    const [feedbackBody, setFeedbackBody] = useState("");
    const router = useRouter();
    const globalState:any = useStateContext()
    const axios = require('axios').default;
    const ls = require('local-storage');

  async function AddFeedBack() {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/comments/',
        data: {
            "title":feedbackTitle,
            "content":feedbackBody,
            "post_id":props.post_id,
        },
        headers:{
          "Authorization": ls.get("token")
        }
    });
    globalState.createAddfeedbackhide();
    setFeedbackTitle("");
    setFeedbackBody("");

    } catch (error) {
      console.error(error);
    }
  }

    function validateForm() {
      return feedbackTitle.length > 0 && feedbackTitle.length < 50 && feedbackBody.length > 0 && feedbackBody.length < 250;
    }
  
    function handleSubmit(event:any) {
      event.preventDefault();
      AddFeedBack();
    }   
    
    function onCancel(){
      globalState.createAddfeedbackhide()
      setFeedbackTitle("");
      setFeedbackBody("");  
    }

    return(
        <div className={`bg-white rounded-xl p-8 dark:bg-gray-0 flex justify-center container items-center h-screen flex-col ${styles.mobilemenu} ${globalState.createAddfeedbackOpen ? styles.mobileactive : ''}`}>
        <Form onSubmit={handleSubmit}>
          <Form.Group  controlId="title" className="mb-4">
            <Form.Label>Feedback Title</Form.Label>
            <Form.Control
              autoFocus
              type="title"
              value={feedbackTitle}
              onChange={(e) => setFeedbackTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group  controlId="body">
            <Form.Label> Feedback Comment <span className="text-xs">(Max 250 letters)</span></Form.Label>
            <Form.Control
              type="body"
              value={feedbackBody}
              as="textarea" rows={3}
              onChange={(e) => setFeedbackBody(e.target.value)}
            />
          </Form.Group>
          <Button  onClick = {onCancel} className="mt-4 mr-5">
            Cancel
          </Button>
          <Button type="submit" disabled={!validateForm()} className="mt-4">
            Post
          </Button>
        </Form>
      </div>
    )
}
  