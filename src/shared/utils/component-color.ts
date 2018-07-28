import { UITheme } from '../enums';

import { TransparencyComponent, TransparencyText } from '../models/transparency';

export const getComponentColor = (
  color: string,
  toggled: boolean,
  disabled: boolean,
  theme: UITheme,
  background: boolean = true,
  transparency?: any,
  returnOnlyAlpha: boolean = false,
) => {
  if (transparency == null) {
    transparency = background ? TransparencyComponent : TransparencyText;
  }

  const { light, dark } = transparency;
  const isLightTheme = theme === UITheme.Light;
  const rgb = isLightTheme ? 0 : 255;

  let alpha;

  if (disabled) {
    alpha = isLightTheme ? light.disabled : dark.disabled;
  } else if (!toggled) {
    alpha = isLightTheme ? light.inactive : dark.inactive;
  }

  if (returnOnlyAlpha) return alpha;
  return alpha != null ? `rgba(${rgb}, ${rgb}, ${rgb}, ${alpha})` : color;
};

export const getComponentRippleColor = (color: string, toggled: boolean, theme: UITheme) => {
  if (toggled) return color;
  return theme === UITheme.Light ? '#000' : '#fff';
};

export const getComponentOpacity = (
  toggled: boolean,
  disabled: boolean,
  theme: UITheme,
  background: boolean = true,
  transparency?: any,
) => getComponentColor(null, toggled, disabled, theme, background, transparency, true);

const transparency = TransparencyText;
export const getComponentForeground = (
  disabled: boolean,
  theme: UITheme,
  opacity = {
    disabled: {
      light: transparency.light.disabled,
      dark: transparency.dark.disabled
    },
    enabled: {
      light: transparency.light.inactive,
      dark: transparency.dark.inactive
    }
  }
) => {
  if (disabled) {
    if (theme === UITheme.Light) {
      return `rgba(0,0,0,${opacity.disabled.light})`;
    }
    return `rgba(255,255,255,${opacity.disabled.dark})`;
  }
  if (theme === UITheme.Light) {
    return `rgba(0,0,0,${opacity.enabled.light})`;
  }
  return `rgba(255,255,255,${opacity.enabled.dark})`;
};
