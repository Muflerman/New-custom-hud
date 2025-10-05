fx_version 'cerulean'
author 'Mufler'
description 'HUD for FiveM'
game 'gta5'
lua54 'yes'

shared_scripts {
    'config.lua',
}

client_scripts {
    'client/client.lua',
    'client/functions.lua',
}

server_scripts {
    'server/server.lua',
}

ui_page 'web/index.html'

files {
    'web/*.html',
    'web/*.css',
    'web/*.js'
}

