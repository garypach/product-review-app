import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useRouter } from "next/router";
import { useStateContext } from "../../Provider/Provider";
import Link from "next/link";
import styles from "../../../styles/add_feedback_styles/add_feedback.module.css";

interface FeedbackProps {
  post_id: any;
}
export default function AddFeedbackComponent(props: FeedbackProps) {
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackBody, setFeedbackBody] = useState("");
  const [feedbackTag, setFeedbackTag] = useState("Enhancement");
  const router = useRouter();
  const globalState: any = useStateContext();
  const axios = require("axios").default;
  const ls = require("local-storage");

  async function AddFeedBack() {
    try {
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/comments/",
        data: {
          title: feedbackTitle,
          content: feedbackBody,
          tag:feedbackTag,
          post_id: props.post_id,
        },
        headers: {
          Authorization: ls.get("token"),
        },
      });
      globalState.createAddfeedbackhide();
      setFeedbackTitle("");
      setFeedbackBody("");
    } catch (error) {
      console.error(error);
    }
  }

  function validateForm() {
    return (
      feedbackTitle.length > 0 &&
      feedbackTitle.length < 50 &&
      feedbackBody.length > 0 &&
      feedbackBody.length < 250
    );
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    AddFeedBack();
  }

  function onCancel() {
    globalState.createAddfeedbackhide();
    setFeedbackTitle("");
    setFeedbackBody("");
  }

  return (
    <div
      className={`bg-white rounded-xl z-10 w-96 p-8 dark:bg-gray-0 flex justify-center container items-center flex-col ${
        styles.mobilemenu
      } ${globalState.createAddfeedbackOpen ? styles.mobileactive : ""}`}
    >
      <Form onSubmit={handleSubmit}>
      <div className="text-dark font-bold mb-3 text-lg">
                Create New Feedback
            </div>
        <Form.Group controlId="title" className="mb-4">
          <Form.Label>Feedback Title</Form.Label>
          <Form.Control
            autoFocus
            type="title"
            value={feedbackTitle}
            className="bg-gray-200 p-2"

            onChange={(e) => setFeedbackTitle(e.target.value)}
          />
        </Form.Group>
        <div className="text-dark font-bold mb-3 text-lg">
                Feedback Category
        </div>
        <Form.Select onChange={(e) => setFeedbackTag(e.target.value)} aria-label="Default select category" className="p-2 bg-gray-200 mb-4">
          <option value="Enhancement">Enchancement</option>
          <option value="UI">UI</option>
          <option value="UX">UX</option>
          <option value="Bug">Bug</option>
        </Form.Select>
        <Form.Group controlId="body">
          <Form.Label>
            {" "}
            Feedback Comment <span className="text-xs">(Max 250 letters)</span>
          </Form.Label>
          <Form.Control
            type="body"
            value={feedbackBody}
            as="textarea"
            rows={3}
            className="bg-gray-200 "

            onChange={(e) => setFeedbackBody(e.target.value)}
          />
        </Form.Group>
        <div className="flex flex-column">
        <Button type="submit" disabled={!validateForm()} className="mt-4 bg-fuchsia-600 text-light font-bold" variant="flat">
          Add Feedback
        </Button>
        <Button onClick={onCancel} className="mt-4 font-bold bg-slate-600 text-light	" variant ="flat">
          Cancel
        </Button>
       
        </div>
      </Form>
    </div>
  );
}
