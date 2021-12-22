import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Router, useRouter } from 'next/router'
import { useEffect } from 'react'
import { useStateContext } from '../Components/Provider/Provider'
import LoginUserComponent from '../Components/UI/LOGIN/Login'
import axios from 'axios'
import localStorage from 'local-storage'
import Button from "react-bootstrap/Button";
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Index: NextPage = () => {
  const globalState = useStateContext()

  return (
    <div className={styles.main}>
        <div>
      <h1 className={styles.title}>
          Welcome to Feedback!
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
     </div>
  )
}

export default Index
