import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useStateContext } from '../Components/Provider/Provider'
import LoginUserComponent from '../Components/UI/LOGIN/Login'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import ProductOneComponent from '../Components/UI/PRODUCT-one/productone'
import Button from "react-bootstrap/Button";
import Link from "next/link";

const Home: NextPage = () => {
  const globalState = useStateContext()
  const ls = require('local-storage');
  const [data,setData] = useState([]);

  async function GetPosts() {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/posts',
        headers:{
          "Authorization": ls.get("token")
        }
    });
      setData(response.data)
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(()=>{
    GetPosts()
  },[])

  const showProducts= () => {
    console.log(data)
    return data.map((item:any, index)=>(
      <div className="mt-4" key = {item.Post.id}>
      <ProductOneComponent productTitle={`${item.Post.title}`}  commentAmount="0" />
      </div>

    ))
  }

  return (
    <div className="bg-project-medium-gray h-screen">
 <div className="container pt-5  ">
      <div className="flex justify-between font-bold items-center">
        Give others feedback
        <Link href="/dashboard">
          <a>
        <Button className="bg-regal-blue">
          Your Product Dashboard
        </Button>
        </a>
        </Link>
      </div>

      {showProducts()}
    </div>
    </div>
   
  )
}

export default Home
