module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Plataforma-concept";
      return args;
    });

    config.plugin("fork-ts-checker").tap(args => {
      args[0].workers = 2;
      return args;
    });
  }
};
