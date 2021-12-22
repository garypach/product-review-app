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
import CreateProductComponent from '../Components/UI/CREATEPRODUCT/createproduct'

const Dashboard: NextPage = () => {
  const globalState:any = useStateContext()
  const ls = require('local-storage');
  const [data,setData] = useState([]);

  async function GetPosts() {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/posts/userposts',
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
    <div className="container mt-5" >
        <Link href="/home">
          <a>
        <Button className="">
        <span className="text-xs">
          Return Home
        </span>
        </Button>
        </a>
        </Link>
        <Button className="" onClick ={globalState.createPosttoggle}>
        <span className="text-xs">
          Create Post
        </span>
        </Button>
        
        <CreateProductComponent/>
     <h1 className="text-lg mt-5">
          Dashboard
      </h1> 
      {showProducts()}
    </div>
  )
}

export default Dashboard
