local Function = nil

RegisterNUICallback("postData", function(data, cb)
    SetNuiFocus(false)
    Function(data.data[1].input)
    PlaySoundFrontend(-1, "Highlight_Cancel", "DLC_HEIST_PLANNING_BOARD_SOUNDS", 1)

    cb("ok")
end)

RegisterNUICallback("close", function(data, cb)
    SetNuiFocus(false)

    cb("ok")
end)

exports("ShowInput", function(data, fucn)
    local pResult = nil
    if not data then return end

    Function = fucn

    Wait(150)
    
    SetNuiFocus(true, true)
    SendNUIMessage({action = "show_input", data = data})
end)