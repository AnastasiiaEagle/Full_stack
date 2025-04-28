'use client';

import { useParams  } from "next/navigation";


export default function Post() {
    const params = useParams();
   
    return (
        <h1>Post {params.id}</h1>
    );
  }