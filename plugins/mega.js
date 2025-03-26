const { cmd, commands } = require("../command");
const fetch = require("node-fetch");
const { fetchJson } = require("../lib/functions");
const axios = require("axios");
const cheerio = require("cheerio");
const mega = require('mega');

cmd(
  {
    pattern: "get",
    desc: "kok",
    category: "pp",
    use: "/start < Text >",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    },
  ) => {
    try {
      let data = await fetchJson(
        `http://links.server.moviepluslk.xyz/api.php?slug=${q}`,
      );
      if (!data || !Array.isArray(data) || data.length === 0) {
        return reply("⚠️ File එක සොයාගත නොහැකි විය ⚠️\n\nමෙයට හේතුව විය හැක්කේ ටොකන් එක කල් ඉකුත් වීමයි,Download පිටුව Reload කර නැවත උත්සහ කරන්න,එහෙම කරලත් වැඩ නැත්තම් 0768480793 ට දන්වන්න\n\n> ❯⏤͟͟͞͞★𝗠𝗢𝗩𝗜𝗘🇵 🇱 🇺 🇸 ☆❯⏤͟͟͞͞");
      }

      let fileInfo = data[0];

      let size = fileInfo.file_size;
      let downloadlink = fileInfo.mega_link; // Assuming you now have MEGA link in the API response
      let title = fileInfo.file_name;

      let message = `- 📁 \`File Name\` : ${title}
- 📈 \`File Size\` : ${size}

✅ *ඔබට අවශ්‍ය වීඩියො පිටපත Upload කරමින් පවතී* ✅
- *තවත් පරිශීලකයින්ට විඩියො පිටපත් Upload කරමින් පවතී*
- *ඔබගේ අවස්තාව එන තෙක් කරුණාකර රැදී සිටින්න*

> ❯⏤͟͟͞͞★𝗠𝗢𝗩𝗜𝗘🇵 🇱 🇺 🇸 ☆❯⏤͟͟͞͞`;

      let message2 = `- 📁 \`File Name\` : ${title}
- 📈 \`File Size\` : ${size}

❌ *සමාවෙන්න මෙම විඩියො පිටපත 2GB කට වඩා වැඩියි, එම නිසා උඩුගත කළ නොහැක, අපහසු තාවය පිළිබඳව සමාවෙන්න..*

> ❯⏤͟͟͞͞★𝗠𝗢𝗩𝗜𝗘🇵 🇱 🇺 🇸 ☆❯⏤͟͟͞͞`;

      const fileSizeInGB = parseFloat(size);

      if (fileSizeInGB > 2) {
        await conn.sendMessage(from, { text: message2 }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
      } else {
        await conn.sendMessage(from, { text: message }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: "📥", key: mek.key } });
        await conn.sendMessage(from, { react: { text: "📤", key: mek.key } });
        let links = await convertDownloadToMegaLink(downloadlink);
        await conn.sendMessage(
          from,
          {
            document: { url: links },
            caption: `*${title}*\n\n> *❯⏤͟͟͞͞★𝗠𝗢𝗩𝗜𝗘🇵 🇱 🇺 🇸 ☆❯⏤͟͟͞͞*`,
            mimetype: "video/mp4",
            fileName: `🎬MOVIEPLUS🎬 ${title}.mp4`,
          },
          { quoted: mek },
        );
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
      }
    } catch (e) {
      console.log(e);
      await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
    }
  },
);

async function convertDownloadToMegaLink(downloadLink) {
  // Use MEGA.nz SDK to handle the link
  try {
    const client = mega({
      email: 'your_email@example.com', // Replace with actual MEGA account email
      password: 'your_password' // Replace with actual MEGA account password
    });

    const file = await client.download(downloadLink);
    return file.link; // This would be the download URL from MEGA
  } catch (error) {
    console.log('Error with MEGA download:', error);
    return "Invalid MEGA link";
  }
}
