import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useStateContext } from '../Components/Provider/Provider'
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
      <Link key = {item.Post.id} href={`/product/${item.Post.id}`}>
      <a>
      <div className="mt-4">
      <ProductOneComponent productTitle={`${item.Post.title}`}  commentAmount="0" />
      </div>
      </a>
      </Link>
    ))
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-200">
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
          Add Product
        </span>
        </Button>
        
        <CreateProductComponent/>
     <h1 className="text-lg mt-5">
          Dashboard
      </h1> 
      {showProducts()}
    </div>
    </div>
   
  )
}

export default Dashboard
