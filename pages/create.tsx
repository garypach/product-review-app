import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useStateContext } from '../Components/Provider/Provider'
import CreateUserComponent from '../Components/UI/CREATE/Create'
import LoginUserComponent from '../Components/UI/LOGIN/Login'
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
