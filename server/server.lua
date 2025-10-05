-- ============================================================
--  server.lua (HUD principal - lógica servidor)
--  Reestructurado para mayor claridad, sin cambiar funcionalidad
-- ============================================================

-- ======================
-- 1. REFERENCIAS Y ESTADO
-- ======================
local QBCore = exports['qb-core']:GetCoreObject()
local ResetStress = false

-- ======================
-- 2. EVENTOS: MANEJO DE ESTRÉS
-- ======================

--- Incrementa el estrés del jugador
-- @param amount number -> cantidad de estrés a sumar
RegisterNetEvent('hud:server:GainStress', function(amount)
    if Config.DisableStress then return end

    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    if not Player then return end

    local Job, JobType = Player.PlayerData.job.name, Player.PlayerData.job.type

    -- Whitelist de trabajos
    if Config.WhitelistedJobs[JobType] or Config.WhitelistedJobs[Job] then return end

    -- Calcular nuevo nivel de estrés
    local currentStress = Player.PlayerData.metadata['stress'] or 0
    local newStress = ResetStress and 0 or (currentStress + amount)

    if newStress < 0 then newStress = 0 end
    if newStress > 100 then newStress = 100 end

    -- Guardar y notificar
    Player.Functions.SetMetaData('stress', newStress)
    TriggerClientEvent('hud:client:UpdateStress', src, newStress)
    TriggerClientEvent('QBCore:Notify', src, 'Te estás estresando', 'error', 1500)
end)

--- Reduce el estrés del jugador
-- @param amount number -> cantidad de estrés a restar
RegisterNetEvent('hud:server:RelieveStress', function(amount)
    if Config.DisableStress then return end

    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    if not Player then return end

    -- Calcular nuevo nivel de estrés
    local currentStress = Player.PlayerData.metadata['stress'] or 0
    local newStress = ResetStress and 0 or (currentStress - amount)

    if newStress < 0 then newStress = 0 end
    if newStress > 100 then newStress = 100 end

    -- Guardar y notificar
    Player.Functions.SetMetaData('stress', newStress)
    TriggerClientEvent('hud:client:UpdateStress', src, newStress)
    TriggerClientEvent('QBCore:Notify', src, 'Relajando')
end)
