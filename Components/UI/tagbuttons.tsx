import React from 'react'
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Link from "next/link";

function TagButton({buttons, filter}:any) {
    return (
        <div className="tagbuttons">
            {
                buttons.map((tag:any, i:any)=>{
                    return <Button key={i} type="button" onClick={()=> filter(tag)} className="btn">{tag}</Button>
                })
            }
        </div>
    )
}

export default TagButton;