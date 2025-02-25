interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: string;
  image?: string;
}

interface OpenRouterMessage {
  role: "user" | "assistant";
  content: any[];
}

const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const sendMessageToGemini = async (
  message: string,
  apiKey: string,
  previousMessages: Message[] = [],
  image?: File,
) => {
  try {
    let content: any[] = [];

    // Always add the text content first if it exists
    if (message.trim()) {
      content.push({ type: "text", text: message });
    }

    if (image) {
      const base64Image = await convertImageToBase64(image);
      content.push({
        type: "image_url",
        image_url: {
          url: base64Image,
        },
      });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://github.com/TempoLabsAI",
          "X-Title": "Tempo Chat App",
        },
        body: JSON.stringify({
          model: "google/gemini-pro-vision",
          messages: [
            ...previousMessages.map((msg) => ({
              role: msg.isAI ? "assistant" : "user",
              content: [{ type: "text", text: msg.content }],
            })),
            {
              role: "user",
              content,
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "API request failed");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenRouter:", error);
    throw error;
  }
};
