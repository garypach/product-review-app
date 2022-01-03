import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Router, useRouter } from 'next/router'
import { useEffect } from 'react'
import { useStateContext } from '../components/Provider/Provider'
import LoginUserComponent from '../components/UI/LOGIN/Login'
import styles from '../styles/Home.module.css'

const Login: NextPage = () => {
  const globalState = useStateContext()
  return (
    <div>
      <LoginUserComponent/>
    </div>
  )
}

export default Login
