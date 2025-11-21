module.exports = {
  content: ["./src/**/*.{vue,js,ts}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["sunset", "dark", "forest", "black"], // выбери свои
    darkTheme: "black", // тема по умолчанию для `dark` класса
    lightTheme: "black",
    base: true, // применяет base стили
    styled: true,
    utils: true,
    prefix: "", // без префикса (daisy-)
    logs: true,
  },
};
