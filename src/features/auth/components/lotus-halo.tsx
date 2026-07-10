import { useEffect, useRef } from 'react';
import { AccessibilityInfo, Animated, Easing, StyleSheet, View } from 'react-native';

import Lotus from '@/assets/lotus-svgrepo-com.svg';
import { palette } from '@/theme';

/**
 * The bloom is drawn as line art, so a hairline gold reads as a watermark rather
 * than a shape. Gold also keeps the crimson seal legible against it; a crimson
 * lotus swallows the stamp, and cyan is spoken for (progress only).
 */
const SIZE = 360;

/**
 * Distance from the top of the parent to the lotus's heart. Sits below the seal's
 * own centre (102) on purpose: the seal then nests in the upper petals and the
 * lower petals fan out behind the wordmark.
 */
const CENTER_Y = 150;

/**
 * One half of a breath. Far past the sub-300ms bar that governs UI *response*,
 * which this is not: it is ambient motion on a screen seen once a session. A
 * breath a user can consciously follow has to be slower than a gesture.
 */
const BREATH_MS = 4200;

/** Amplitude. The lotus sits behind the wordmark; it must never pull focus. */
const SCALE_TO = 1.025;
/** Multiplies against goldRule's own 0.18 alpha, so the swing is 0.126 → 0.18. */
const DIM_TO = 0.7;

/** Decorative backdrop. Absolutely positioned; give the parent a stable top edge. */
export function LotusHalo() {
  const breath = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let cancelled = false;

    const ease = Easing.inOut(Easing.ease);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breath, { toValue: 1, duration: BREATH_MS, easing: ease, useNativeDriver: true }),
        Animated.timing(breath, { toValue: 0, duration: BREATH_MS, easing: ease, useNativeDriver: true }),
      ]),
    );

    // Ambient motion carrying no information: under reduce-motion, drop it
    // entirely rather than slowing it down. The lotus still renders, at rest.
    const apply = (reduced: boolean) => {
      if (cancelled) return;
      if (reduced) {
        loop.stop();
        breath.setValue(0);
      } else {
        loop.start();
      }
    };

    AccessibilityInfo.isReduceMotionEnabled().then(apply);
    // Honour the setting when it changes, not only as it was at mount.
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', apply);

    return () => {
      cancelled = true;
      subscription.remove();
      loop.stop();
    };
  }, [breath]);

  const scale = breath.interpolate({ inputRange: [0, 1], outputRange: [1, SCALE_TO] });
  const opacity = breath.interpolate({ inputRange: [0, 1], outputRange: [DIM_TO, 1] });

  return (
    <View pointerEvents="none" style={styles.layer}>
      <Animated.View style={[styles.bloom, { opacity, transform: [{ scale }] }]}>
        {/* The asset paints with `currentColor`, so `color` tints it. */}
        <Lotus width={SIZE} height={SIZE} color={palette.goldRule} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  layer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center' },
  bloom: { position: 'absolute', top: CENTER_Y - SIZE / 2 },
});
