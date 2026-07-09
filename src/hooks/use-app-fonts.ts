import {
  ChakraPetch_500Medium,
  ChakraPetch_700Bold,
} from '@expo-google-fonts/chakra-petch';
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';
import { ZenAntique_400Regular } from '@expo-google-fonts/zen-antique';
import { useFonts } from 'expo-font';

/** Keys must match the family names in `fonts` (@/theme). */
const FAMILIES = {
  ZenAntique_400Regular,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_700Bold,
  ChakraPetch_500Medium,
  ChakraPetch_700Bold,
};

/**
 * Gates first paint on the three brand typefaces.
 *
 * `ready` also flips on failure: a font that will not load is a degraded app,
 * not a broken one. Rendering in the system face beats holding the splash
 * screen forever.
 */
export function useAppFonts(): { ready: boolean; error: Error | null } {
  const [loaded, error] = useFonts(FAMILIES);
  return { ready: loaded || error != null, error };
}
