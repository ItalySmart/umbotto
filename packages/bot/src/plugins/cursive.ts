import TelegramBot from "node-telegram-bot-api";
import { randomChoice } from "./utils/random";

const randomSequence = (options: string[]) => {
  const n = 1 + Math.floor(Math.random() * 3);
  const sequence: string[] = [];
  for (let index = 0; index < n; index++) {
    sequence.push(randomChoice(options));
  }
  return sequence.join("");
};

const translationTable = [
  { find: /a/gi, replace: ["á", "à", "å", "ä", "æ", "â", "a", "a", "a", "a"] },
  { find: /e/gi, replace: ["é", "è", "e", "ë", "ê", "e", "e", "e", "e"] },
  { find: /i/gi, replace: ["î", "i", "ï", "ì", "í", "i", "i", "i", "i"] },
  {
    find: /o/gi,
    replace: ["ô", "o", "ö", "ò", "ó", "ø", "o", "o", "o", "o", "œ"],
  },
  { find: /u/gi, replace: ["û", "u", "ü", "ù", "ú", "u", "u", "u", "u"] },
];

const convert = (msg: string) => {
  let convertedMessage = msg;
  translationTable.forEach(
    t =>
      (convertedMessage = convertedMessage.replace(
        t.find,
        randomSequence(t.replace),
      )),
  );
  return convertedMessage;
};

export const cursiveInReply =
  (bot: TelegramBot) =>
  (msg: TelegramBot.Message): void => {
    if (msg.reply_to_message) {
      const message = convert(msg.reply_to_message.text);
      bot.sendMessage(msg.chat.id, message);
    }
  };

export default (bot: TelegramBot) =>
  async (msg: TelegramBot.Message, match: RegExpMatchArray): Promise<void> => {
    bot.sendMessage(msg.chat.id, convert(match[1]));
  };
