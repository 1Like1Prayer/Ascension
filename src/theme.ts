/**
 * MURIM ASCENSION — Design Tokens
 * Aesthetic: dark demonic-cult manhwa (Nano Machine / Chronicles of the Demon
 * Faction / Absolute Regression / Myst Might Mayhem).
 *
 * Three material layers:
 *  1. INK      — warm lacquered blacks (backgrounds, panels). Never pure #000.
 *  2. BLOOD    — demonic crimson (primary actions, the cult, danger).
 *  3. SEAL     — imperial gold (ranks, achievements, hairline dividers).
 * Plus ONE cold intruder:
 *  4. NANO     — electric cyan. The future cutting through the ancient world.
 *     RESERVED for progress: XP threads, sync state, breakthrough charge.
 *     If everything glows cyan, nothing does. Use it like a single thread.
 */

export const palette = {
  // INK — warm blacks, like an ink stone. Layered, not flat.
  ink900: '#0B0909', // app background (OLED-friendly)
  ink800: '#141011', // screen surface
  ink700: '#1D1719', // cards / panels ("lacquer")
  ink600: '#2A2225', // raised / pressed
  ink500: '#3A3034', // borders on dark

  // BLOOD — demonic crimson
  crimson600: '#8F1D26', // deep, dried
  crimson500: '#C22A33', // primary
  crimson300: '#E0565C', // hover/active, danger text
  crimsonVeil: 'rgba(194, 42, 51, 0.22)', // seal-ring outline

  // SEAL — imperial gold (ranks, milestones)
  gold500: '#C9A24B',
  gold300: '#E4C87F',
  goldHairline: 'rgba(201, 162, 75, 0.25)', // 1px dividers
  goldRule: 'rgba(201, 162, 75, 0.18)', // labelled rules, seal-ring outlines
  goldRuleFaint: 'rgba(201, 162, 75, 0.14)', // footer separators

  // NANO — the thread (progress only)
  nano400: '#45E3D8',
  nanoDim: 'rgba(69, 227, 216, 0.16)', // thread track / glow wash
  nanoGlow: 'rgba(69, 227, 216, 0.45)', // shadowColor for charged states
  nanoFocus: 'rgba(69, 227, 216, 0.40)', // border of the one focused field

  // PAPER — aged rice-paper text
  paper100: '#F0E7D8', // primary text
  paper400: '#A89C8C', // secondary text
  paper600: '#6E6459', // muted / disabled

  // SEMANTIC
  jade: '#4BA97B', // success (jade, not tech-green)
  amber: '#D9A441', // warning
  danger: '#E0565C',

  // ALLIANCES (map, banners, crests)
  orthodox: '#86A9D6', // white-blue: cranes, snow peaks
  unorthodox: '#6E8B5E', // forest-rust: bandit green
  demonic: '#C22A33', // the cult owns crimson
  icePalace: '#BFE3F2', // swing faction
  imperial: '#E4C87F', // capital gold
} as const;

/**
 * TYPE — three voices:
 *  display  : Zen Antique   — brush-ink serif; sect names, rank titles, screen
 *                             heroes. Use with restraint (it shouts).
 *  body     : Manrope       — quiet grotesk; everything readable.
 *  numeral  : Chakra Petch  — squared techno; XP counts, timers, stats.
 *                             This is the nano-machine HUD voice.
 * Expo:  npx expo install @expo-google-fonts/zen-antique
 *        @expo-google-fonts/manrope @expo-google-fonts/chakra-petch
 */
export const fonts = {
  display: 'ZenAntique_400Regular',
  body: 'Manrope_400Regular',
  bodyMedium: 'Manrope_500Medium',
  bodyBold: 'Manrope_700Bold',
  numeral: 'ChakraPetch_500Medium',
  numeralBold: 'ChakraPetch_700Bold',
} as const;

export const typeScale = {
  hero: { fontFamily: fonts.display, fontSize: 30, lineHeight: 38, letterSpacing: 0.5 },
  title: { fontFamily: fonts.display, fontSize: 22, lineHeight: 30 },
  heading: { fontFamily: fonts.bodyBold, fontSize: 17, lineHeight: 24 },
  body: { fontFamily: fonts.body, fontSize: 15, lineHeight: 22 },
  caption: { fontFamily: fonts.bodyMedium, fontSize: 12.5, lineHeight: 17, letterSpacing: 0.3 },
  // Eyebrow: tiny gold labels above titles — "RANK 5 · PROFICIENT"
  eyebrow: {
    fontFamily: fonts.numeral, fontSize: 11, lineHeight: 14,
    letterSpacing: 2.4, textTransform: 'uppercase' as const, color: palette.gold500,
  },
  stat: { fontFamily: fonts.numeralBold, fontSize: 26, lineHeight: 32 },
  statSmall: { fontFamily: fonts.numeral, fontSize: 14, lineHeight: 18, letterSpacing: 0.5 },
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, gutter: 20 } as const;

/** Sharp-ish corners: manhwa panels, not bubbly SaaS. */
export const radii = { sm: 4, md: 8, lg: 12, seal: 6, pill: 999 } as const;

export const effects = {
  // Cards sit on gold hairlines, not drop shadows (flat lacquer look)
  hairline: { borderWidth: 1, borderColor: palette.goldHairline },
  // The ONE glow in the app: a charged nano element (breakthrough ready)
  nanoCharged: {
    shadowColor: palette.nano400, shadowOpacity: 0.45,
    shadowRadius: 12, shadowOffset: { width: 0, height: 0 }, elevation: 8,
  },
  // A whisper of nanoCharged: the focused field. Live state, one at a time.
  nanoFocused: {
    shadowColor: palette.nano400, shadowOpacity: 0.08,
    shadowRadius: 14, shadowOffset: { width: 0, height: 0 },
  },
  // Crimson bloom behind a sect seal
  sealGlow: {
    shadowColor: palette.crimson500, shadowOpacity: 0.35,
    shadowRadius: 15, shadowOffset: { width: 0, height: 0 }, elevation: 8,
  },
  pressedScale: 0.97,
} as const;

/** Component recipes */
export const components = {
  screen: { flex: 1, backgroundColor: palette.ink900 },

  // Lacquer panel with a crimson "book spine" — every card is a wuxia volume
  card: {
    backgroundColor: palette.ink700,
    borderRadius: radii.md,
    borderLeftWidth: 3,
    borderLeftColor: palette.crimson600,
    padding: spacing.lg,
    ...effects.hairline,
    borderColor: 'rgba(201,162,75,0.12)',
  },

  // Rank seal: square red hanko stamp with gold border, display-font glyph
  rankSeal: {
    width: 64, height: 64, borderRadius: radii.seal,
    backgroundColor: palette.crimson600,
    borderWidth: 1.5, borderColor: palette.gold500,
    alignItems: 'center' as const, justifyContent: 'center' as const,
  },

  // XP bar: dark lacquer track + thin nano thread (2–3px), NOT a fat bar
  xpTrack: { height: 3, borderRadius: 2, backgroundColor: palette.ink600, overflow: 'hidden' as const },
  xpThread: { height: 3, borderRadius: 2, backgroundColor: palette.nano400 },

  // Field: tiny techno label over a lacquer input. Focus lights the nano thread.
  fieldLabel: {
    fontFamily: fonts.numeral, fontSize: 10.5,
    letterSpacing: 1.4, color: palette.paper400,
  },
  inputBox: {
    flexDirection: 'row' as const, alignItems: 'center' as const, gap: spacing.md,
    paddingHorizontal: 14,
    backgroundColor: palette.ink800,
    borderWidth: 1, borderColor: palette.ink600, borderRadius: radii.md,
  },
  inputBoxFocused: { borderColor: palette.nanoFocus, ...effects.nanoFocused },
  inputText: {
    flex: 1, paddingVertical: 13,
    fontFamily: fonts.body, fontSize: 14.5, color: palette.paper100,
  },

  // Hairline rule used by labelled dividers
  rule: { flex: 1, height: 1, backgroundColor: palette.goldRule },

  buttonPrimary: {
    backgroundColor: palette.crimson500, borderRadius: radii.md,
    paddingVertical: 14, paddingHorizontal: spacing.xl,
    alignItems: 'center' as const,
  },
  buttonPrimaryText: { fontFamily: fonts.bodyBold, fontSize: 16, color: palette.paper100, letterSpacing: 0.4 },

  buttonGhost: {
    backgroundColor: 'transparent', borderRadius: radii.md,
    borderWidth: 1, borderColor: palette.ink500,
    paddingVertical: 13, paddingHorizontal: spacing.xl, alignItems: 'center' as const,
  },

  // Streak talisman: vertical paper strip (ofuda). Lit = gold; unlit = ink.
  talisman: {
    width: 26, height: 44, borderRadius: 3,
    backgroundColor: palette.ink600, borderWidth: 1, borderColor: palette.ink500,
  },
  talismanLit: {
    backgroundColor: '#241C0F', borderColor: palette.gold500,
  },
} as const;

export const theme = { palette, fonts, typeScale, spacing, radii, effects, components };
export type Theme = typeof theme;
export default theme;
