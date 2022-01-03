import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useStateContext } from '../components/Provider/Provider'
import axios from 'axios'
import ProductTwoComponent from '../components/UI/PRODUCT-two/producttwo'
import Button from "react-bootstrap/Button";
import Link from "next/link";
import CreateProductComponent from '../components/UI/CREATEPRODUCT/createproduct'

const Dashboard: NextPage = () => {
  const globalState:any = useStateContext()
  const ls = require('local-storage');
  const [data,setData] = useState([]);

  async function GetPosts() {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://fastapi-socialmedia-crud.herokuapp.com/posts/userposts',
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
      <a className="no-underline">
      <div className="mt-4  mx-4 ">
      <ProductTwoComponent productTitle={`${item.Post.title}`}  commentAmount={item.comments} />
      </div>
      </a>
      </Link>
    ))
  }

  return (
    <div className="bg-project-medium-gray min-h-screen lg:h-screen">
<div className="container pt-5 flex flex-column" >
   <div className="flex flex-column w-96 mx-auto text-center ">
     <div className="flex justify-between">
       <div>
       <Link href="/home">
          <a>
        <Button className="">
        <span className="text-xs">
          Return Home
        </span>
        </Button>
        </a>
        </Link>
       </div>
   
        <div>
        <Button className="" onClick ={globalState.createPosttoggle}>
        <span className="text-xs">
          Add Product
        </span>
        </Button>
        </div>
     </div>
     <div>
        <h1 className="text-2xl mt-5 font-bold">
          Dashboard
      </h1> 
        </div>
   </div>
   <CreateProductComponent/>
      <div className="lg:flex lg:flex-wrap justify-center container">
    {showProducts()}
    </div>
    </div>
    </div>
 
   
  )
}

export default Dashboard
