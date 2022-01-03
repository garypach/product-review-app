import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Router, useRouter } from 'next/router'
import { useEffect } from 'react'
import { useStateContext } from '../components/Provider/Provider'
import LoginUserComponent from '../components/UI/LOGIN/Login'
import axios from 'axios'
import localStorage from 'local-storage'
import Button from "react-bootstrap/Button";
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Index: NextPage = () => {
  const globalState = useStateContext()
  const router = useRouter();
  var ls = require("local-storage");

  const axios = require("axios").default;

  async function LoginGuest() {
    let Form = new FormData();
    Form.append("username", "hello2@gmail.com");
    Form.append("password", "123");
    try {
      const response = await axios({
        method: "post",
        url: "https://fastapi-socialmedia-crud.herokuapp.com/login",
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

  function handleSubmit(event: any) {
    event.preventDefault();
    LoginGuest();
  }
  return (
    <div className={styles.main}>
        <div>
      <h1 className={styles.title}>
          Welcome to Product Review!
      </h1> 
      </div>
    <div className={styles.links}>
      <div>
      <Link href="/login">
    <a>
     <Button>Login</Button>
     </a>
     </Link>
      </div>
   <div>
   <Link href="/create">
    <a>
     <Button>Create User</Button>
     </a>
     </Link>

   </div>
     </div>
     <Button onClick={handleSubmit} className="mt-4">
          Continue as Guest
        </Button>
     </div>
  )
}

export default Index
