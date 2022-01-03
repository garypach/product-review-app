import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useStateContext } from '../components/Provider/Provider'
import CreateUserComponent from '../components/UI/CREATE/Create'
import LoginUserComponent from '../components/UI/LOGIN/Login'
import styles from '../styles/Home.module.css'

const Create: NextPage = () => {
  const globalState = useStateContext()

  return (
    <div>
        <CreateUserComponent/>
    </div>
  )
}

export default Create
