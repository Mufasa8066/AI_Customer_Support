'use client'
import { Stack } from "@mui/material";
import Image from "next/image";
import { useState } from "react";


export default function Home() {
 const [messages, setMessages] = useState({
  role: 'assistant',
  content: `Hi, I'm the headstarter support system. How can I assist you today?`,
 })

 const [message, setMessage] = useState('')

 return<box
    width="100vw"
    height="100vh"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center" 
>
    <Stack
    direction = "column"
    width="600px"
    height="700px"
    border="1px solid black"
    p={2}
    spacing={2}
    >
        <Stack
        direction="column"
        spacing={2}
        flexGrow={1}
        overflow="auto"
        maxHeight="100%"
        >
            
        </Stack>
    </Stack>
 </box>
}
