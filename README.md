# Technisch Kaizen website

Static site: open `index.html`, or upload this whole folder to any host (Netlify, Cloudflare Pages, GitHub Pages).

## Before going live
1. `python3 tools/set-domain.py yourdomain.com` - sets canonical URLs, sitemap, robots and schema.
2. Edit `assets/js/config.js` - email, phone, Calendly, Razorpay page, form endpoint, analytics.
3. Fill the `[Name]`, `[Role]`, `[Add CIN]` placeholders in `about.html`.
4. Have `privacy-policy.html`, `terms.html` and `refund-policy.html` reviewed by a legal professional and replace the `[...]` brackets.
5. Test the enquiry form end to end, then submit `sitemap.xml` in Google Search Console.
6. Host `404.html` as the custom not-found page (Netlify and Cloudflare Pages do this automatically).

## Structure
- `assets/css`: `style.css` (base theme), `pages.css`, `layout.css`, `fonts.css`
- `assets/js`: `main.js` (nav, tabs, finder), `contact.js` (enquiry form), `wave.js` (background), `config.js` (your settings)
- `assets/fonts`, `assets/img`: self-hosted fonts, favicon, social share image
