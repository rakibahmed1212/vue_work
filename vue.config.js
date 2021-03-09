module.exports = {
    devServer: {
        proxy: 'http://localhost:8000',
        disableHostCheck: true,
        port: 4000,
        public: '0.0.0.0:4000'
    },
    publicPath: "/"
}