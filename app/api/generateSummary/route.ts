import OpenAI from "openai";

const openai = new OpenAI();
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todos } = await request.json();
  //   console.log(todos);
  // communicate w openai
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `When responding, welcome the user always as
                        Mr. TaskMaster
                        and say welcome to the Trello Clone App.
                        Limit the response to 200 characters.`,
        },
        {
          role: "user",
          content: `Hi there, provide a summary of the following todos.
                        Count how many todos are in each category
                        such as To do. in progress and done,
                        then tell the user to have a productive day!
                        Here's the data: ${JSON.stringify(todos)}`,
        },
      ],
      stream: false,
    });

    console.log("openai data response", response.choices[0]);

    // console.log("DATA is", data);
    // console.log(data.choices[0].message);

    // return NextResponse.json(data?.choices[0].message);
  } catch (error) {
    console.log("error", error);

    // mimic response expected by calling function
    return NextResponse.json({ content: "Could not connect with ChatGPT" });
  }
}
