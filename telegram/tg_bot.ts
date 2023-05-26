import { connectDB } from '../app/config/db.config';
const Telegraf = require("telegraf");

/*
@@ Author: Roland Mweze
*/

connectDB();
require("dotenv").config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
const state: Record<string, any> = {};

const placeCategory = ['Hotel 🏨', 'Restaurant/Bar 🍲', 'Park 🏞️', 'Church ⛪', 'Mosque 🕌', 'Cinema 🎥', 'Theater 🎭', 'Stadium 🏟️', 'Amusement Park 🎢', 'Library 📚', 'Night Club 🎆', 'Coffee Shop ☕', 'Supermarket 🏪', 'Hospital 🏥', 'Bank 🏦', 'University 🎓', 'Florist 🌹']

const placeCategoryMenu = Telegraf.Extra.markdown().markup((m: any) => {
    const keyboard = [];
  
    for (let i = 0; i < placeCategory.length; i += 3) {
      const row = [];
  
      for (let j = 0; j < 3; j++) {
        const placeIndex = i + j;
        if (placeIndex >= placeCategory.length) {
          break;
        }
  
        const place = placeCategory[placeIndex];
        row.push(m.callbackButton(place, `select_place_category_${place}`));
      }
  
      keyboard.push(row);
    }
    return m.inlineKeyboard(keyboard);
});


export const tgWrapper = () => {
    bot.launch();
    bot.start((ctx: any) => {
        console.log("New user has joined");
        state[ctx.from.id] = {};
        ctx.reply(
            `🔖 Welcome to the Tour Guide Bot dear *${ctx.from.first_name}*🔖 \n\n🕒 Time: ${new Date()} \n\n Kindly, choose a category of your choice:` 
            ,placeCategoryMenu
        );
    });
}






