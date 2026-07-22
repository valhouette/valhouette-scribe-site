# Fonts Directory

This directory should contain self-hosted font files in `.woff2` format.

## Required Fonts

Your CSS references these fonts. Add the following `.woff2` files here:

1. **Inter**
   - `inter-v13-latin-regular.woff2` (400 weight)
   - `inter-v13-latin-600.woff2` (600 weight)
   
2. **Cormorant Garamond**
   - `cormorant-garamond-v16-latin-500.woff2` (500 weight, normal)
   - `cormorant-garamond-v16-latin-500italic.woff2` (500 weight, italic)

## How to Get Fonts

### Option 1: Download from Google Fonts (Recommended)
1. Visit https://fonts.google.com
2. Search for "Inter" and "Cormorant Garamond"
3. Click the download button (arrow icon)
4. Extract the `.woff2` files

### Option 2: Use Google Fonts API (No files needed)
Edit `src/styles/global.css`:
- Remove the `@font-face` rules
- Add this to `src/layouts/BaseLayout.astro`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Cormorant+Garamond:ital,wght@0,500;1,500&display=swap" rel="stylesheet">
```

Then update the `--font-serif` and `--font-sans` CSS variables to reference the font names without the url path.

## Caching

Font files have `Cache-Control: public, max-age=31536000, immutable` - they're cached for 1 year.

## Performance Notes

- `.woff2` format is modern and provides ~30% better compression than `.woff`
- Preload links are already configured in BaseLayout.astro
- Fonts will block first paint - ensure they're optimized
- Consider using `font-display: swap` for better perceived performance

## Support

If fonts don't appear:
1. Run `npm run build && npm run preview`
2. Check browser DevTools Network tab for 404 errors
3. Verify filenames match exactly (case-sensitive)
4. Check file permissions are readable
