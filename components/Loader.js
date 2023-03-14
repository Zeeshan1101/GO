import React, { useEffect, useState } from "react";
import Head from "next/head";
const Loader = () => {
  const [q, setQ] = useState();
  useEffect(() => {
    const quote = Math.floor(Math.random() * AnimeQuote.length);
    setQ(quote);
  }, []);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Head>
        <title>Loading...</title>
      </Head>
      <div className="w-10/12 text-center">
        <div className="w-[max-content] max-w-full break-words mx-auto">
          {q ? (
            <>
              <span className="text-2xl"> &quot; </span>
              {AnimeQuote[q].quote}
              <span className="text-2xl"> &quot; </span>
              <div className="text-right">{`${AnimeQuote[q].character}  [${AnimeQuote[q].anime}] `}</div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Loader;
const AnimeQuote = [
  {
    anime: "Fairy Tail",
    character: "Ultear Milkovich",
    quote: 'The time known as "LIFE", cannot be rewound.',
  },
  {
    anime: "Naruto",
    character: "Kankuro",
    quote:
      "You tick me off. I hate short people anyway. And you're so impertinent for someone younger than me. It makes me want to break you.",
  },
  {
    anime: "Naruto",
    character: "Itachi Uchiha",
    quote:
      "No single thing is perfect by itself. That's why we're born to attract other things to make up for what we lack. I think we start walking in the right direction only after we start getting our counterparts beside us.",
  },
  {
    anime: "The Garden of Sinners",
    character: "Aozaki Touko",
    quote:
      "In a business like this, there are times when you need to change as the situation demands. I switch my personality depending on how I view things.",
  },
  {
    anime: "One Piece",
    character: "Roronoa Zoro",
    quote:
      "You've underestimated me, snow woman. When you thought you couldn't beat me, you should have run. Of course, there are things that I don't wanna cut. But... let me ask you something.\nHave you ever seen a fierce animal you were sure would never bite? Because I haven't.",
  },
  {
    anime: "Kuroshitsuji",
    character: "Ciel Phantomhive",
    quote: "Forget about revenge, and live on.",
  },
  {
    anime: "Cowboy Bebop",
    character: "Spike Spiegel",
    quote: "Don't you want to hang out and waste your life with us?",
  },
  {
    anime: "Evangelion: 2.0 You Can Not Advance",
    character: "Gendou Ikari",
    quote:
      "People live on by forgetting their memories. But there are some memories that should never be forgotten.",
  },
  {
    anime: "Seirei No Moribito",
    character: "Balsa",
    quote:
      "If you have money, life is the same no matter where you go. But if you don't have money, your life can adapt to where you are.",
  },
  {
    anime: "Baka to Test to Shoukanjuu",
    character: "Sakamoto Yuuji",
    quote:
      "There's one good thing about being an idiot. When they really get into something, they can simple-mindedly devote all of their attention to it. I guess some people would just call them obsessed, but to them, that's high praise!",
  },
  {
    anime: "Gintama",
    character: "Gintoki Sakata",
    quote:
      "You STILL don't get it? When you tossed all of that away, a few important things were discarded as well. You abandoned your friends? More like you were afraid of BEING abandoned. You fight by yourself? More like you hid yourself in solitude from the beginning. You abandoned yourself? No... You just couldn't bear the pain of having a heavy load place upon you, or being a heavy load, so you ran. Like the coward you are. If you want to live your life abandoning one thing after another, that's your choice. But to try to incite your student to join you because you can't handle being alone, makes you a fool.",
  },
  {
    anime: "Trigun",
    character: "Legato Bluesummers",
    quote:
      "It must be the way you look, Vash the Stampede. Your very existence seems to cause me undue irritation.",
  },
  {
    anime: "Hunter X Hunter",
    character: "Killua Zoldyck",
    quote:
      "If I ignore a friend I have the ability to help, wouldn't I be betraying him?",
  },
  {
    anime: "Bleach",
    character: "Shiba Kaien",
    quote:
      "Whenever you fight from this point on, there is one thing you must never do. Which is...to die alone.",
  },
  {
    anime: "Junjou Romantica",
    character: "Akihiko Usami",
    quote:
      "Even if you hate it or whatever, I'll never let go of you. If you run away, I'll probably come after you and lock you up.",
  },
  {
    anime: "xxxHOLiC",
    character: "Yuuko Ichihara",
    quote:
      "Sincerity with respect to yourself! No matter what your objective... no matter who you are... if you are going to do something or not do something, that is a promise to yourself. And the one who keeps the promise, or breaks the promise, is you. No one else can be burdened with holding you to a promise that's made to yourself.",
  },
  {
    anime: "Hamatora: The Animation",
    character: "Murasaki",
    quote: "People like you disgust me. You can't even face your own weakness.",
  },
  {
    anime: "Kaichou Wa Maid-Sama!",
    character: "Takumi Usui",
    quote:
      "Love, passion, why do we get caught up by such troublesome feelings? The mind couldn't ever get things straight, and you lose control to know what is sensible. Deep down it's all so vexing.",
  },
  {
    anime: "Toradora!",
    character: "Minori Kushieda",
    quote:
      "If you trip while running down a hallway, you'll get a nosebleed. If you trip in life, you'll cry.",
  },
  {
    anime: "Legend of the Galactic Heroes",
    character: "Reinhard von Lohengramm",
    quote:
      "There is great satisfaction in fighting for the sake of gaining power, but it’s joyless to fight for the sake of maintaining it.",
  },
  {
    anime: "Yu Yu Hakusho",
    character: "Kazuma Kuwabara",
    quote:
      "We all have to die when our time comes, but if we do our duty we don't got regrets. So taste a little piece of my sword, Toguro!",
  },
  {
    anime: "Kyoukai Senjou No Horizon",
    character: "Aoi Toori",
    quote:
      "If someone you care for is ever in the eyes of danger, don't hesitate to save himher.",
  },
  {
    anime: "Tales of the Abyss",
    character: "Guy Cecil",
    quote:
      "People aren't so simple that they can accept anything and everything.",
  },
  {
    anime: "Nekomonogatari: Kuro",
    character: "Meme Oshino",
    quote:
      "It's not like people only look for help by saying \"please help me.\" In similiar vein, it's not like you're only in love with someone if you say \"I love you.\" Everyone has things they can't say on impulse.",
  },
  {
    anime: "One Piece",
    character: "Dracule Mihawk",
    quote: "You are defeated yet you will not step back, why not?",
  },
  {
    anime: "Avatar: The Last Airbender",
    character: "King Bumi",
    quote: "I didn't know what or when, but I knew I'd know it when I knew it!",
  },
  {
    anime: "RDG: Red Data Girl",
    character: "Hodaka Murakami",
    quote:
      "There is a reason one wears make-up on stage. Applying color to one's face is almost a spell. When one's face is different, one's personality can change.",
  },
  {
    anime: "Death Note",
    character: "Ryuk",
    quote:
      "The human world is a boring place with boring people doing boring things.",
  },
  {
    anime: "CLANNAD",
    character: "Yoshino Yūsuke",
    quote:
      "Everyone makes mistakes. What's important is how to make up for it.",
  },
  {
    anime: "Kuroko No Basket",
    character: "Kuroko No Basket",
    quote:
      'No matter how hard you practice, "someday" and "maybe" aren\'t good enough. I need to know if you have ambitious goals and the will to accomplish them.',
  },
  {
    anime: "Pokémon",
    character: "Kojirou",
    quote:
      "Team Rocket may be dirty rotten criminals, but we're not in the business of destroying children's dreams! At least, not yet.",
  },
];
