import TelegramBot from "node-telegram-bot-api";

const translationTable = [
  { find: /c(a|i|o)/gi, replace: "ghe" },
  { find: /lt/gi, replace: "rd" },
  { find: /a|i|o/gi, replace: "e" },
  { find: /t/gi, replace: "d" },
  { find: /c/gi, replace: "g" },
  { find: /p/gi, replace: "b" },
  { find: /q/gi, replace: "g" },
];

const ghenverde = (msg: string) => {
  let convertedMessage = msg;
  translationTable.forEach(
    t => (convertedMessage = convertedMessage.replace(t.find, t.replace)),
  );
  return `hehehe ${convertedMessage} hehehe`;
};

export const keddeInReply =
  (bot: TelegramBot) =>
  (msg: TelegramBot.Message): void => {
    if (msg.reply_to_message) {
      const message = ghenverde(msg.reply_to_message.text);
      bot.sendMessage(msg.chat.id, message);
    }
  };

export default (bot: TelegramBot) =>
  async (msg: TelegramBot.Message, match: RegExpMatchArray): Promise<void> => {
    bot.sendMessage(msg.chat.id, ghenverde(match[1]));
  };
