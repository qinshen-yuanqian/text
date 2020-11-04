const path =require("path");  //用于路径的拼接
const resolve = dir => path.resolve(__dirname, dir);   //进行路径拼接的函数

module.exports = {
    webpack: {
        alias: {
            // 这里找见的就是src的目录
            "@" : resolve("src"),
            "components": resolve("src/components")
        }
    }
}