import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useRouter } from "next/router";
import { useStateContext } from "../../Provider/Provider";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
interface CreateProps {}
export default function CreateUserComponent(Props: CreateProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const globalState = useStateContext();

  const axios = require("axios").default;

  async function CreateUser() {
    try {
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/users",
        data: {
          email: email,
          password: password,
        },
      });
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    CreateUser();
  }
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <Form onSubmit={handleSubmit}>
      <div className="text-xl text-left flex">
        <Link href="/">
          <a className="no-underline">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="ml-3">Go Back</span>
          </a>
        </Link>

        <div className="font-bold ml-5">
          Create User
          </div>
      </div>
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
          Create User
        </Button>
      </Form>
    </div>
  );
}
