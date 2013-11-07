/**
 * Created by i.sungurov on 08.10.13.
 */

enterTerminal.service("menu", function (settings, wsMenu, httpMenu) {
    return (settings.settings.httpVersion.value) ? httpMenu : wsMenu;
});