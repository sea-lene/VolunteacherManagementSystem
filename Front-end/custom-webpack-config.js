const webpack=require('webpack')

module.exports={
    plugins:[
        new webpack.DefinePlugin({
            $ENV:{
                url:JSON.stringify(process.env.API_URL),
                apiKey: JSON.stringify(process.env.API_KEY),
                authDomain: JSON.stringify(process.env.AUTH_DOMAIN),
                databaseURL:JSON.stringify(process.env.DATABASE_URL),
                projectId: JSON.stringify(process.env.PROJECT_ID),
                storageBucket: JSON.stringify(process.env.STORAGE_BUCKET),
                messagingSenderId: JSON.stringify(process.env.MESSAGING_SENDER_ID),
                appId: JSON.stringify(process.env.APP_ID),
                measurementId:JSON.stringify(process.env.MEASUREMENT_ID)
            }
        })
    ]
}