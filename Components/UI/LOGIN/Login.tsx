import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useRouter } from "next/router";
import { useStateContext } from "../../Provider/Provider";
import localStorage from "local-storage";
import styles from "../../../styles/login_styles/login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface LoginProps {}
export default function LoginUserComponent(Props: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const globalState = useStateContext();
  var ls = require("local-storage");

  const axios = require("axios").default;

  async function LoginUser() {
    let Form = new FormData();
    Form.append("username", email);
    Form.append("password", password);
    try {
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/login",
        data: Form,
        headers: { "Content-Type": "multipart/form-data" },
      });
      ls.set(
        "token",
        response.data.token_type + " " + response.data.access_token
      );
      ls.set(
        "id",
        response.data.id 
      );
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    LoginUser();
  }
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className="text-xl text-left w-50">
        <Link href="/">
          <a>
            <FontAwesomeIcon icon={faArrowLeft} />
          </a>
        </Link>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" className="mb-4">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" disabled={!validateForm()} className="mt-4">
          Login
        </Button>
      </Form>
    </div>
  );
}