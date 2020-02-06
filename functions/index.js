const Telegraf = require('telegraf');
const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const bot = new Telegraf(''); // TODO insert telegram bot token

const db = admin.database();
const ref = db.ref("/");
const bucket = admin.storage().bucket();


bot.start((ctx) => {
    const chatId = ctx.chat.id;

    return ref.child(`users/${chatId}`).once("value", snapshot => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            return ctx.reply('Hi ' + userData.username);
        } else {
            ref.child("users/" + chatId).set({
                counter: 0,
                created_at: Date.now(),
                favourite_line_up: '',
                username: ctx.message.from.username
            });
            return ctx.reply('Bienvenido a  Alineacion Bot');
        }
    }).catch((error) => {
        console.error(error);
        return false;
    });
});

bot.command('4_3_3', (ctx) => {
    // TODO convert to function
    return ref.child("users/" + chatId).set({
        listening: true,
        latest_formation: '4_3_3',
        counter: 0
    }).then((result) => {
        return ctx.reply('Has elegido la formacion 4 3 3');
    }).then((result) => {
        return ctx.reply('Inserte un jugador por mensaje como en la siguiente imagen:');
    }).then((result) => {
        // TODO check if there's a better way to fetch the url
        return ctx.replyWithPhoto({ source: bucket.refFromURL('gs://alineacion-bot.appspot.com/fullImage.png') });
    })
    .catch((error) => {
        console.error(error);
        return false;
    });
});
// Listen to all messages
bot.on('text', (ctx) => {
    return ref.child(`users/${chatId}`).once("value", snapshot => {
        let userCount  = parseInt(snapshot.child('counter').value);
        // TODO Check if the counter < 11 and listening
        if (snapshot.child('listening') && userCount < 11) {
            return ref.child("users/" + chatId).set({
                counter:  userCount + 1,
                favourite_line_up: '',
                username: ctx.message.from.username
            });
        } else {
            return false;
        }
    })
    .then((result) => {
        // Check if the line up is full
        // TODO check how to fetch the counter from the result
    })
    .then((result) => {
        // Fetch the lineup and players and create image in a different function

    })
    .catch((error) => {
        console.error(error);
    })
});


bot.launch()
    .catch((error) => {
        console.error(error);
        return false;
    });


exports.bot = functions.https.onRequest((req, res) => {
    return ref.child("testdata")
        .set({
            alanisawesome: {
                date_of_birth: "June 234, 1912",
                full_name: "Alan Turing"
            },
            gracehop: {
                date_of_birth: "December 93, 1906",
                full_name: "Grace Hopper"
            }
        }).then((result) => {
            console.info(result);
            return result;
        }).catch((error) => {
            console.error(error);
            return false;
        });
    // return res.send("Hello from Alineacion bot!");
});

function getProfile(chatId) {
    return ref.child("users/" + chatId).get();
}

function setLineup(lineup){

}