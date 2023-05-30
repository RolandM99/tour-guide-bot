import { connectDB } from '../app/config/db.config';
const Telegraf = require("telegraf");

/*
@@ Author: Roland Mweze
*/

connectDB();
require("dotenv").config();

// interface placeState {
//     placeCategory: string;
//     placeId: string;
//     placeName: string;
//     placeDescription: string;
// };

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
const state: Record<string, any> = {};

const placeCategory = ['Hotel 🏨', 'Restaurant/Bar 🍲', 'Park 🏞️', 'Church ⛪', 'Mosque 🕌', 'Cinema 🎥', 'Theater 🎭', 'Stadium 🏟️', 'Tourism Park 🎢', 'Library 📚', 'Night Club 🎆', 'Coffee Shop ☕', 'Supermarket 🏪', 'Hospital 🏥', 'Bank 🏦', 'University 🎓', 'Florist 🌹']

const placesUrl = 'http://localhost:3002/api/places/all';

// function to display categories of places
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

// function to get places from the database and display them by mapping through the array of places
const getPlaces = async (ctx: any, category: string) => {
    const places = await fetch(placesUrl).then((res: any) => res.json());
    const placesByCategory = places.filter((place: any) => place.description === category);
    
    if (placesByCategory.length === 0) {
      ctx.reply(`No places found for ${category} category`);
    } else {
      const inlineButtons = placesByCategory.map((place: any) => {
        return [
          {
            text: place.name,
            callback_data: `select_place_${place._id}`, // Replace `place.id` with the appropriate property that represents the unique identifier for each place
          },
        ];
      });
      
      ctx.reply(`Select ${category} to visit:`, {
        reply_markup: {
          inline_keyboard: inlineButtons,
        },
      });
    }
  };
  


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

    bot.action(/select_place_category_(.*)/, (ctx: any) => {
        const category = ctx.match[1];
        state[ctx.from.id].category = category;
        getPlaces(ctx, category);
    });

    // by clicking on a place, the user will be able to see the details of the place by retrieving the place from the database and displaying it on the tg bot UI
    bot.action(/select_place_(.*)/, async (ctx: any) => {
        const placeId = ctx.match[1];
        state[ctx.from.id].placeId = placeId;
        const place = await fetch(placesUrl).then((res: any) => res.json());
        const placeDetails = place.filter((place: any) => place._id === placeId);
        console.log(placeDetails);
        ctx.reply(
            `🔖 *${placeDetails[0].name}* 🔖 \n\n📍 *Location:* ${placeDetails[0].location} \n\n📝 *Description:* ${placeDetails[0].description} \n\n 🕒 *Open Hour:* ${placeDetails[0].open_hour} \n\n 🕒 *Close Hour:* ${placeDetails[0].close_hour}`
            , { parse_mode: "Markdown" }
        );
    });
}






