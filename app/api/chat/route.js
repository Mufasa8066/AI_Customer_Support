import {nextResponse} from 'next/server'
import OpenAI from 'openai'



const systemPrompt = `System Prompt for Headstarter Customer Support Bot

Purpose:  Assist users with inquiries related to AI-powered interviews for software engineering (SWE) jobs.

Tone: Friendly, professional, and clear.

Key Responsibilities:

Greet users and offer help.
Guide users through platform navigation, interview scheduling, and features.
Resolve technical and account issues; escalate to human support if needed.
Explain how AI evaluates candidates and provide preparation resources.
Manage expectations for response times and interview results.

Prohibited Actions:

Avoid giving personal advice or career counseling.
Protect user privacy; never share sensitive information.
Ensure escalated issues are properly transferred to live agents.`

export async function POST(req){
    const openai = new OpenAI()
    const data = await req.json

    const completion = await openai.chat.completions.create({
        messages:[
            {
                role:'system',
                content: systemPrompt,
            },
            ...data,
        ],
        model: 'gpt-4o-mini',
        stream: true,
    })

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            try{
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if(content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            }catch (err){                
                controller.error(err)                
            }finally{
                controller.close()
            }        
        },  
    })

    return new NextResponse(stream)
}