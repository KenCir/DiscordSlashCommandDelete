const { Client, Intents } = require('discord.js');
const ms = require('ms');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});

client.on('ready', async () => {
    console.log(`Login ${client.user.tag}`);
    console.log('ギルドコマンド削除開始');

    await client.guilds.fetch();
    client.guilds.cache.forEach(async guild => {
        await guild.commands.fetch();
        guild.commands.cache.forEach(async command => {
            await command.delete();
        });
    });

    /*
    await client.application.commands.fetch();
    client.application.commands.cache.forEach(async command => {
        await command.delete();
    });
    */
});

client.on('rateLimit', rateLimitData => {
    console.log(`レート制限\n時刻: ${(new Date()).toLocaleString('ja-JP')}\nHTTPメゾット: ${rateLimitData.method}\nHTTPリクエストルート: ${rateLimitData.route}\nHTTPリクエストパス${rateLimitData.path}\nタイムアウト: ${ms(rateLimitData.timeout)}\nリクエスト最大数: ${rateLimitData.limit}\nグローバル: ${rateLimitData.global ? 'はい' : 'いいえ'}`)
});

client.login(process.argv[2]);