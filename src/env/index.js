/**
 * 获取环境变量
 * development.k8s
 */
export const getEnv = () => {
  let envment = {};
  try {
    const NODE_ENV = process.env.NODE_ENV; // production || development
    const APP_ENV = process.env.APP_ENV; // k8s
    let envName = APP_ENV || 'k8s';
    // debugger;
    const envFile = require(`./${NODE_ENV}/${envName}.js`);
    envment = envFile.default || envFile;
    return envment;
  } catch (error) {
    console.error('找不到环境文件，默认测试环境k8s', error);
    const envFile = require(`./production/k8s.js`);
    envment = envFile.default || envFile;
    return envment;
  }
};
