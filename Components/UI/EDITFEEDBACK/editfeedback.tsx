import React, {useContext, useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios'
import { useRouter } from "next/router";
import {useStateContext} from '../../Provider/Provider'
import Link from "next/link";
import styles from "../../../styles/edit_feedback_styles/edit_feedback.module.css";

interface FeedbackProps {
post_id:any
comment_id:any
comment_title:any
}
export default function EditFeedbackComponent(props:FeedbackProps){
    const [feedbackTitle, setFeedbackTitle] = useState("");
    const [feedbackBody, setFeedbackBody] = useState("");
    const router = useRouter();
    const globalState:any = useStateContext()
    const axios = require('axios').default;
    const ls = require('local-storage');

  async function EditFeedBack() {
    try {
      const response = await axios({
        method: 'put',
        url: `http://127.0.0.1:8000/comments/${props.comment_id}`,
        data: {
            "title":feedbackTitle,
            "content":feedbackBody,
            "post_id":props.post_id,
        },
        headers:{
          "Authorization": ls.get("token")
        }
    });
    globalState.createEditfeedbackhide();
    setFeedbackTitle("");
    setFeedbackBody("");

    } catch (error) {
      console.error(error);
    }
  }
  async function DeleteFeedBack() {
    try {
      const response = await axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/comments/${props.comment_id}`,
        headers:{
          "Authorization": ls.get("token")
        }
    });
    globalState.createEditfeedbackhide();
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
      EditFeedBack();
    }   
    
    function onCancel(){
      globalState.createEditfeedbackhide()
      setFeedbackTitle("");
      setFeedbackBody("");  
    }

    function onDelete(event:any) {
        event.preventDefault();
        DeleteFeedBack();
        router.push(`/products/${props.post_id}`)
      }   

    return(
        <div className={`bg-white absolute left-0 right-0 w-96 rounded-xl p-8 dark:bg-gray-0 flex justify-center  items-center flex-col ${styles.mobilemenu} ${globalState.createEditfeedbackOpen ? styles.mobileactive : ''}`}>

        <Form onSubmit={handleSubmit}>
            <div className="text-dark font-bold mb-3 text-lg">
                Editing `{props.comment_title}`
                </div>
          <Form.Group  controlId="title" className="mb-4">
            <Form.Label>Feedback Title</Form.Label>
            <Form.Control
              autoFocus
              type="title"
              value={feedbackTitle}
              className="bg-gray-200"
              onChange={(e) => setFeedbackTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group  controlId="body">
            <Form.Label> Feedback Comment <span className="text-xs">(Max 250 letters)</span></Form.Label>
            <Form.Control
              type="body"
              value={feedbackBody}
              as="textarea" rows={3}
              className="bg-gray-200"
              onChange={(e) => setFeedbackBody(e.target.value)}
            />
          </Form.Group>
          <div className="flex flex-column">
          <Button type="submit" disabled={!validateForm()} className="mt-4 bg-fuchsia-600 text-light font-bold" variant="flat">
            Save Changes
          </Button>
          <Button  onClick = {onCancel} className="mt-4 font-bold bg-slate-600 text-light	" variant ="flat">
            Cancel
          </Button>
          <Button   onClick = {onDelete} className="mt-4 bg-red-600 font-bold" variant="danger">
            Delete
          </Button>
          </div>
        </Form>
      </div>
    )
}
  