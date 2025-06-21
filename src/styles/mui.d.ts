import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    border: string;
    retro: {
      amber: string;
      pink: string;
      cyan: string;
      purple: string;
      green: string;
      blue: string;
      cream: string;
      beige: string;
      brown: string;
      shadow: string;
    };
  }
  interface PaletteOptions {
    border?: string;
    retro?: {
      amber?: string;
      pink?: string;
      cyan?: string;
      purple?: string;
      green?: string;
      blue?: string;
      cream?: string;
      beige?: string;
      brown?: string;
      shadow?: string;
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TypographyVariants {
    // customVariant?: React.CSSProperties;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TypographyVariantsOptions {
    // customVariant?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TypographyPropsVariantOverrides {
    // Add custom variant overrides here when needed
    // Example: customVariant?: true;
  }
}
