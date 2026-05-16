import math

def luminance(hex_color):
    hex_color = hex_color.lstrip('#')
    if len(hex_color) == 3:
        hex_color = ''.join([c*2 for c in hex_color])
    r, g, b = [int(hex_color[i:i+2], 16) / 255.0 for i in (0, 2, 4)]
    values = []
    for c in (r, g, b):
        if c <= 0.03928:
            values.append(c / 12.92)
        else:
            values.append(((c + 0.055) / 1.055) ** 2.4)
    return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2]

def contrast(c1, c2):
    l1 = luminance(c1)
    l2 = luminance(c2)
    if l1 < l2:
        l1, l2 = l2, l1
    return (l1 + 0.05) / (l2 + 0.05)

vars = {
    '--bg': '#f6f1e6', '--bg-soft': '#efe8d6', '--surface': '#fbf7ec', '--paper': '#fffdf6',
    '--ink': '#1a1614', '--ink-2': '#2c2722', '--ink-soft': '#5d564d', '--ink-mute': '#8a8275',
    '--hairline': '#ddd2b8', '--hairline-2': '#cfc29f', '--accent': '#a16207', '--accent-2': '#854d0e',
    '--accent-tint': '#f0e6cd', '--ok': '#4d6e3b', '--warn': '#9a3412', 'white': '#ffffff', 'black': '#000000'
}

pairs = [
    (".nav a:hover", "--ink", "--bg-soft"),
    (".nav a.active", "--bg", "--ink"),
    (".btn", "white", "--ink"), # Assuming white text on ink-ish bg
    (".btn:hover", "white", "--ink-2"),
    (".btn--ghost", "--ink", "transparent"), # background check against --bg
    (".btn--ghost:hover", "--ink", "--bg-soft"),
    (".btn--accent", "#fffdf6", "--accent"),
    (".btn--accent:hover", "#fffdf6", "--accent-2"),
    (".chip--accent", "--accent-2", "--accent-tint"),
    (".chip--ink", "--bg", "--ink"),
    (".shop a:hover", "--accent", "--accent-tint"),
    (".site-footer ul a:hover", "--accent", "--bg"),
    (".ink-mute text", "--ink-mute", "--bg"),
    (".ink-soft text", "--ink-soft", "--bg"),
    ("warn text", "--warn", "--bg")
]

print(f"{'Selector':<30} | {'Ratio':<6} | {'Status'}")
print("-" * 50)
fails = 0
passes = 0
for sel, fg, bg in pairs:
    fg_val = vars.get(fg, fg)
    bg_val = vars.get(bg, bg)
    if bg_val == "transparent": bg_val = vars['--bg']
    
    ratio = contrast(fg_val, bg_val)
    status = "PASS" if ratio >= 4.5 else "FAIL (AA Large/UI)" if ratio >= 3.0 else "FAIL"
    if ratio < 4.5: fails += 1
    else: passes += 1
    print(f"{sel:<30} | {ratio:>6.2f} | {status}")

print(f"\nSummary: {passes} Passes, {fails} Fails")
