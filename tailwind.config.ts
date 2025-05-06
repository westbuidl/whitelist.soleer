import type { Config } from "tailwindcss";
const { fontFamily } = require('tailwindcss/defaultTheme')



const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#F8A11C"
      },
      fontFamily: {
        Bricolage: ["Briston",],
        Inter: ['Inter',],
        Space: ['Space Grotesk',],
      },
      boxShadow:{
        secondary_shadow:"2px 2px 0px 0px #FCC90D"
      },
      backgroundImage: {
        black_hero_bg:"url(/images/hero_bg.png)",
        technology_bg:"url(/images/technology_bg.png)",
        primary_text_clip_bg:"linear-gradient(90deg, #F8A11C 0.42%, #FCC90D 99.7%)",
        hero_circle:"url(/images/hero_circle.png)",
        map_bg:"url(/images/map_bg.png)",
        token_header_bg:"linear-gradient(90deg, rgba(255, 255, 255, 0.10) 1.44%, rgba(255, 255, 255, 0.05) 100%)",
        navbar_bg:"linear-gradient(90deg, #191D22 1.44%, rgba(25, 29, 34, 0.52) 100%)",
        wall_bg:"linear-gradient(90deg, rgba(255, 255, 255, 0.10) 1.44%, rgba(255, 255, 255, 0.05) 100%)"
      },
    },
  },
  plugins: [],
};
export default config;
