const MODULE_ID = "a-clean-modern-ui";
const FULL_BLUR = "saturate(100%) blur(50px)";

const DEFAULT_ACCENT_COLOR = "#5380d4";
const DEFAULT_BLUR_LEVEL = "Medium";
const DEFAULT_CORNER_RADIUS = "15";

const BLUR_BG_LIGHT_DEFAULT = "#ffffffa8";
const BLUR_BG_THICK_LIGHT_DEFAULT = "#d2d2d2fa";
const BLUR_FG_LIGHT_DEFAULT = "#ffffffa3";
const BLUR_FG_BRIGHT_LIGHT_DEFAULT = "#ffffff"
const TEXT_COLOR_LIGHT_DEFAULT = "#1e1e1e";
const TEXT_HEADING_LIGHT_DEFAULT = "black";

const BLUR_BG_DARK_DEFAULT = "#262626db";
const BLUR_BG_THICK_DARK_DEFAULT = "#2d2d2dfc";
const BLUR_FG_DARK_DEFAULT = "#212121a3";
const BLUR_FG_BRIGHT_DARK_DEFAULT = "#171717fc"
const TEXT_COLOR_DARK_DEFAULT = "#d8d8d8";
const TEXT_HEADING_DARK_DEFAULT = "white";


/*
================ DEFAULTS ================
  --accent-color: #396dd1;
  --blur-filter-low: saturate(200%) blur(50px);
  --blur-filter-med: saturate(200%) blur(50px);
  --blur-filter-high: saturate(200%) blur(50px);
  --corner-radius: 15px;
  --text-color: #1e1e1e;
  --blur-background: #ffffffa8;
  --blur-background-thick: #bdbdbdf0;
  --blur-foreground: #ffffffa3;
  --blur-foreground-bright: #ffffffde;
  --drop-shadow: 0 0 9px #0000006e;
  --faintest-color: #00000014;

================ Colors: =================
Default Blue: #396dd1
Sky: #7391d3
Red:#cc1919
Orange:#e17810
Pink:#d53ea1
Green:#008f10
Purple:#8342db
Teal:#329f94
Yellow:#ffff26
Mint:#5faa75

================ LIGHT THEME =============
TEXT COLOR: #1e1e1e
BG: #ffffffa8
BG THICK: #bdbdbdf0
FG: #ffffffa3
FG Bright: #ffffffde
Faintest Color: #00000014

================ DARK THEME ==============
TEXT COLOR: #eeeeee
BG: #292929a8
BG THICK: #262626f0
FG: #212121a3
FG BRIGHT: 

*/

Hooks.on("init", function () {
    game.settings.register(MODULE_ID, 'AccentColor', {
        name: "Accent Color",
        default: 0,
        type: Number,
        scope: 'client',
        config: true,
        choices: ['Blue', 'Red', 'Foundary Orange', 'Pink', 'Green', 'Purple', 'Teal', 'Yellow', 'Mint']
    })
    game.settings.register(MODULE_ID, 'Theme', {
        name: "Theme",
        hint: "UI Theme",
        default: 0,
        type: String,
        scope: 'client',
        config: true,
        choices: ['Light', 'Dark']
    });
    game.settings.register(MODULE_ID, 'Blur', {
        name: "Blur Level",
        hint: "Control the level of blur effect behind some hud elements. This setting may cause performance issues. FULL - ONLY Recommended for desktops with dedicated GPU. MEDIUM - Recommended for mid spec laptops or desktops withno GPU, LOW - Only enables the blur on large elements like actor sheets & windows, NONE - Removes the blur effect and replaces the backgrounds with more opaque colors",
        default: 1,
        type: String,
        scope: 'client',
        config: true,
        choices: ['FULL', 'MEDIUM', 'LOW', 'NONE'],
    });
    game.settings.register(MODULE_ID, 'Corners', {
        name: "Corner Radius",
        hint: "Change the how 'rounded' the UI looks.",
        default: 1,
        type: Number,
        default: 15,
        scope: 'client',
        config: true,
        range: { min: 5, max: 20, step: 1 }
    });
    game.settings.register(MODULE_ID, "HideNav", {
        name: "Hide Navigation",
        hint: "Collapse the navigation bar by default",
        default: false,
        type: Boolean,
        scope: 'client',
        config: true
    });
    ApplySettings();

});

Hooks.on("ready", function () {
    if (!game.settings.get(MODULE_ID, "HideNav"))
        return;
    collapse("nav-toggle")
});

Hooks.on("closeSettingsConfig", function () {
    ApplySettings();
});

function ApplySettings() {
    let root = document.documentElement;
    root.style.setProperty("--accent-color", GetColor(game.settings.get(MODULE_ID, "AccentColor")));
    root.style.setProperty("--corner-radius", game.settings.get(MODULE_ID, "Corners") + "px");
    SetTheme();
    SetBlur();
}
function collapse(toggleId) {
    let target = document.getElementById(toggleId);
    if (target) {
        target.click();
    }
}
function GetColor(color) {
    switch (color) {
        case 0: return "#5380d4"; /* Default blue */
            break;
        case 1: return "#cc1919"; /* Red */
            break;
        case 2: return "#ff6400"; /* Orange */
            break;
        case 3: return "#d53ea1"; /* Pink */
            break;
        case 4: return "#008f10"; /* Green */
            break;
        case 5: return "#8342db"; /* Purple */
            break;
        case 6: return "#329f94"; /* Teal */
            break;
        case 7: return "#ffff26"; /* Yellow */
            break;
        case 8: return "#5faa75"; /* Mint */
            break;
    }
}
function SetTheme() {
    let root = document.documentElement;
    root.style.setProperty("--text-color", GetTheme() ? TEXT_COLOR_DARK_DEFAULT : TEXT_COLOR_LIGHT_DEFAULT);
    root.style.setProperty("--text-heading", GetTheme() ? TEXT_HEADING_DARK_DEFAULT : TEXT_HEADING_LIGHT_DEFAULT);
    root.style.setProperty("--blur-foreground", GetTheme() ? BLUR_FG_DARK_DEFAULT : BLUR_FG_LIGHT_DEFAULT);
    root.style.setProperty("--blur-foreground-bright", GetTheme() ? BLUR_FG_BRIGHT_DARK_DEFAULT : BLUR_FG_BRIGHT_LIGHT_DEFAULT);

    root.style.setProperty("--icon-invert", GetTheme() ? "none" : "invert(1)");
}
function GetTheme() {
    //Returns true for dark mode
    return game.settings.get(MODULE_ID, "Theme") === "1" ? true : false;
}
function SetBlur(blurLevel) {
    let root = document.documentElement;
    switch (blurLevel != null ? blurLevel : game.settings.get(MODULE_ID, "Blur")) {
        case "0": {
            root.style.setProperty("--blur-filter-high", FULL_BLUR);
            root.style.setProperty("--blur-filter-med", FULL_BLUR);
            root.style.setProperty("--blur-filter-low", FULL_BLUR);

            root.style.setProperty("--blur-background-high", GetTheme() ? BLUR_BG_DARK_DEFAULT : BLUR_BG_LIGHT_DEFAULT);
            root.style.setProperty("--blur-background-med", GetTheme() ? BLUR_BG_DARK_DEFAULT : BLUR_BG_LIGHT_DEFAULT);
            root.style.setProperty("--blur-background-low", GetTheme() ? BLUR_BG_DARK_DEFAULT : BLUR_BG_LIGHT_DEFAULT);

            //Fix for bug where control tools get misaligned with blur on
            root.style.setProperty("--control-tools-fix", "-5px");
        } break;
        case "1": {
            root.style.setProperty("--blur-filter-high", "None");
            root.style.setProperty("--blur-filter-med", FULL_BLUR);
            root.style.setProperty("--blur-filter-low", FULL_BLUR);

            root.style.setProperty("--blur-background-high", GetTheme() ? BLUR_BG_THICK_DARK_DEFAULT : BLUR_BG_THICK_LIGHT_DEFAULT);
            root.style.setProperty("--blur-background-med", GetTheme() ? BLUR_BG_DARK_DEFAULT : BLUR_BG_LIGHT_DEFAULT);
            root.style.setProperty("--blur-background-low", GetTheme() ? BLUR_BG_DARK_DEFAULT : BLUR_BG_LIGHT_DEFAULT);

            //Fix for bug where control tools get misaligned with blur on
            root.style.setProperty("--control-tools-fix", "0px");
        } break;
        case "2": {
            root.style.setProperty("--blur-filter-high", "None");
            root.style.setProperty("--blur-filter-med", "None");
            root.style.setProperty("--blur-filter-low", FULL_BLUR);

            root.style.setProperty("--blur-background-high", GetTheme() ? BLUR_BG_THICK_DARK_DEFAULT : BLUR_BG_THICK_LIGHT_DEFAULT);
            root.style.setProperty("--blur-background-med", GetTheme() ? BLUR_BG_THICK_DARK_DEFAULT : BLUR_BG_THICK_LIGHT_DEFAULT);
            root.style.setProperty("--blur-background-low", GetTheme() ? BLUR_BG_DARK_DEFAULT : BLUR_BG_LIGHT_DEFAULT);

            //Fix for bug where control tools get misaligned with blur on
            root.style.setProperty("--control-tools-fix", "0px");
        } break;
        case "3": {
            root.style.setProperty("--blur-filter-high", "None");
            root.style.setProperty("--blur-filter-med", "None");
            root.style.setProperty("--blur-filter-low", "None");

            root.style.setProperty("--blur-background-high", GetTheme() ? BLUR_BG_THICK_DARK_DEFAULT : BLUR_BG_THICK_LIGHT_DEFAULT);
            root.style.setProperty("--blur-background-med", GetTheme() ? BLUR_BG_THICK_DARK_DEFAULT : BLUR_BG_THICK_LIGHT_DEFAULT);
            root.style.setProperty("--blur-background-low", GetTheme() ? BLUR_BG_THICK_DARK_DEFAULT : BLUR_BG_THICK_LIGHT_DEFAULT);

            //Fix for bug where control tools get misaligned with blur on
            root.style.setProperty("--control-tools-fix", "0px");
        } break;
    }
}
