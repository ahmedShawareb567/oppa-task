module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
            @import "src/assets/scss/global.scss";
          `,
      },
    },
  },
};
