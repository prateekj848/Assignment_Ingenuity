const path= require('path');
const { LoaderOptionsPlugin } = require('webpack');

module.exports={
    mode:'development',
    entry:'./src/index.ts',
    module:{
        rules:[
            {
                test:/\.ts$/,
                use:'ts-loader',
                include: [path.resolve(__dirname,'src')]
            },
            {
                 test:/\.css$/,
                 use:['style-loader','css-loader'],
                 include:[path.resolve(__dirname,'css')]
            },
            {
                test:/\.html$/i,
                use:['html-loader'],
                include:[path.resolve(__dirname,'public')]
           }
        ]
    },
    resolve:{
      extensions:['.ts','.js','.css','.html']

    },
    output:{
        
        filename: 'bundle.js',
        path: path.resolve(__dirname,'public')
    }
}