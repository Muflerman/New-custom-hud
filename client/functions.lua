-- ============================================================
--  functions.lua
--  Funciones auxiliares para el HUD
-- ============================================================

-- ======================
-- 1. REFERENCIA A QBCore
-- ======================
local QBCore = exports[Config.Core]:GetCoreObject()

-- ======================
-- 2. FUNCIONES DE NECESIDADES
-- ======================

--- Carga las necesidades del jugador al iniciar sesión o cargar script
--  Obtiene los metadatos del jugador y actualiza el HUD con hambre y sed
function loadPlayerNeeds()
    local PlayerData = QBCore.Functions.GetPlayerData()
    if PlayerData and PlayerData.metadata then
        TriggerEvent('hud:client:UpdateNeeds', PlayerData.metadata.hunger, PlayerData.metadata.thirst)
    end
end
