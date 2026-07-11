# Murim Ascension

A workout app with a dark demonic-cult manhwa aesthetic. Expo + expo-router.

```bash
npm install
npm start        # then press i / a / w
```

## Layout

| Path                  | Purpose                                                |
| --------------------- | ------------------------------------------------------ |
| `src/theme.ts`        | Design tokens — palette, type scale, component recipes  |
| `src/app/_layout.tsx` | Root stack; loads the three font families              |
| `src/app/index.tsx`   | Login — "the gate of the sect"                         |

## Theme rules

Read the header comment in `src/theme.ts` before adding UI. The rule that is
easiest to break: **nano-cyan (`nano400`) is reserved.** It marks progress and
live state — XP threads, sync, breakthrough charge, the focused input. If
everything glows cyan, nothing does.

Cards sit on gold hairlines, not drop shadows. The only glow in the app is a
charged nano element.
