interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: string;
}

interface OpenRouterMessage {
  role: "user" | "assistant";
  content: any[];
}

export const sendMessageToGemini = async (
  message: string,
  apiKey: string,
  previousMessages: Message[] = [],
) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-pro-exp-02-05:free",
          messages: [
            ...previousMessages.map((msg) => ({
              role: msg.isAI ? "assistant" : "user",
              content: [{ type: "text", text: msg.content }],
            })),
            {
              role: "user",
              content: [{ type: "text", text: message }],
            },
          ],
        }),
      },
    );

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenRouter:", error);
    throw error;
  }
};
