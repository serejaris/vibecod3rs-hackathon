
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `Ты 'VIBE' (ВАЙБ), AI-ассистент хакатона Vibe Coding Hackathon.
      Организатор: сообщество vibecod3rs.
      Старт: 30 ноября.
      Локация: Онлайн и Telegram.
      
      Тон: Киберпанк, дружелюбный, технический, но расслабленный ("на потоке"). Используй эмодзи: ⚡️, 🔮, 💻, 🌀.
      
      Ключевая информация:
      - Категории (Треки): Игры, Телеграм-боты, Веб-сайты.
      - Призы: Участие бесплатное. Финалисты получают скидку на курс по вайб-кодингу. Победитель (1 место) получает курс бесплатно.
      - Ссылка на регистрацию: Google Doc форма.
      - Сообщество: vibecod3rs в Telegram.
      
      Отвечай кратко (до 50 слов). Если спрашивают про регистрацию, отправляй к кнопке на сайте.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Системы оффлайн. (Отсутствует API Key)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Связь прервана.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Сигнал потерян. Попробуйте позже.";
  }
};
