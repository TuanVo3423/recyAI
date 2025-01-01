import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ConversationSummaryMemory } from 'langchain/memory';
import { LLMChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';

interface IGeminiRequest {
  handleStream: (token: string) => void;
  handleStreamEnd: (token: string) => void;
  handleStreamStart?: () => void;
  prompt?: any;
  GeminiParams?: any;
}

export const GeminiRequest = ({
  handleStream,
  handleStreamEnd,
  handleStreamStart,
  prompt,
  GeminiParams,
}: IGeminiRequest) => {
  const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    temperature: 0.3,
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken(token: string) {
          handleStream(token);
        },
        handleLLMEnd(token: string) {
          handleStreamEnd(token);
        },
        handleLLMStart() {
          if (handleStreamStart) {
            handleStreamStart();
          }
          return;
        },
      },
    ],
    ...GeminiParams,
  });

  const chain = new LLMChain({ llm: model, prompt });
  return {
    chain,
  };
};

export const GeminiRequestNotStream = ({ prompt }: IGeminiRequest) => {
  const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    temperature: 0.3,
  });

  const chain = new LLMChain({ llm: model, prompt });
  return {
    chain,
  };
};

export const GeminiRequestWithMemory = ({
  handleStream,
  prompt,
  GeminiParams,
}: IGeminiRequest) => {
  const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    temperature: 0.3,
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken(token: string) {
          handleStream(token);
        },
      },
    ],
    ...GeminiParams,
  });
  const memory = new ConversationSummaryMemory({
    memoryKey: 'chat_history',
    llm: model,
  });
  const chain = new LLMChain({ llm: model, prompt, memory });
  return {
    memory,
    chain,
  };
};