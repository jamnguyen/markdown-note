import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    border: string;
  }
  interface PaletteOptions {
    border?: string;
  }
  interface TypographyVariants {
    // customVariant?: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    // customVariant?: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    // customVariant?: true;
  }
}
