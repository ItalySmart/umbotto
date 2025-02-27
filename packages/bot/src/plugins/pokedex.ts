const Pokedex = require("pokedex");
import TelegramBot from "node-telegram-bot-api";
import { toTitleCase } from "./utils";

const pokedex = new Pokedex();

const makeCaption = (pokemon): string =>
  `#${pokemon.id} ${toTitleCase(pokemon.name)}\nHeight: ${
    pokemon.height / 10
  } m\nWeight: ${pokemon.weight / 10} kg`;

const pokedexByName =
  (bot: TelegramBot) =>
  (msg: TelegramBot.Message, match: RegExpMatchArray): void => {
    const pokemon = pokedex.pokemon(match[1].toLowerCase());
    bot.sendVideo(msg.chat.id, pokemon.sprites.animated, {
      caption: makeCaption(pokemon),
    });
  };

const pokedexById =
  (bot: TelegramBot) =>
  (msg: TelegramBot.Message, match: RegExpMatchArray): void => {
    const pokemon = pokedex.pokemon(+match[1]);
    bot.sendVideo(msg.chat.id, pokemon.sprites.animated, {
      caption: makeCaption(pokemon),
    });
  };

export default { byId: pokedexById, byName: pokedexByName };
