import * as mc from "@minecraft/server"
const { world, system } = mc;

import { QDPH } from "./QDPH.js"

const dp = new QDPH()

world.beforeEvents.chatSend.subscribe(e => {
    const { sender: player, message } = e;
    if (message.startsWith('!')) {
        e.cancel = true
        system.run(() => {
            const [command, key, value] = message.split(" ")
            if (command == "!set") dp.set(key, value)
            if (command == "!get") player.sendMessage(`${dp.get(key)}`)
            if (command == "!has") player.sendMessage(`${dp.has(key)}`)
            if (command == "!delete") dp.delete(key)
            if (command == "!clear") dp.clear()
            if (command == "!values") player.sendMessage(JSON.stringify(dp.values()))
            if (command == "!keys") player.sendMessage(JSON.stringify(dp.keys()))
            if (command == "!entries") player.sendMessage(JSON.stringify(dp.entries()))
        })
    }
})

// Syntax: !<command> <key> <value>
