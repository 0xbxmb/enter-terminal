'use it for start server with no popup windows

Set WshShell = CreateObject("WScript.Shell" )
WshShell.Run chr(34) & "start.bat" & Chr(34), 0
Set WshShell = Nothing