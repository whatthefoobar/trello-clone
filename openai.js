import OpenAI from "openai";

const openai = new OpenAI({
  organization: process.env.OPENAI_API_ORGANIZATION,
});

export default openai;

// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// export default openai;
