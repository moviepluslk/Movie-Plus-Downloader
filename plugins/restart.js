const config = require('../config')
const { cmd, commands } = require('../command')
const { sleep } = require('../lib/functions')
const { exec } = require('child_process')

cmd({
    pattern: "restart",
    desc: "Update all files and restart the bot",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        reply("Updating files and restarting...🧬")
        
        // Pull the latest changes from the repository
        await exec("git pull origin main", (error, stdout, stderr) => {
            if (error) {
                console.log(`Error pulling latest files: ${error.message}`)
                return reply(`Error pulling latest files: ${error.message}`)
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`)
                return reply(`stderr: ${stderr}`)
            }
            console.log(`stdout: ${stdout}`)
        })

        // Wait for the pull to complete before restarting
        await sleep(1500)

        // Restart the bot using pm2
        exec("pm2 restart all", (error, stdout, stderr) => {
            if (error) {
                console.log(`Error restarting bot: ${error.message}`)
                return reply(`Error restarting bot: ${error.message}`)
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`)
                return reply(`stderr: ${stderr}`)
            }
            console.log(`stdout: ${stdout}`)
            reply("Bot updated and restarted successfully! 🚀")
        })
    } catch (e) {
        console.log(e)
        reply(`Error: ${e}`)
    }
})
