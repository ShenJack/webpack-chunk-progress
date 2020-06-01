# Provide progressive loading ability to webpack chunks

## Prerequisite
This plugin would record all your webpack assets' size and attach them to your `index.html`,
so make sure your project's output includes a `index.html`, and it should have a `<body></body>` tag, then the plugin would inject the records here.

One best practice is to use HtmlWebpackPlugin, which would generate a `index.html` file.

## Usage
install plugin
```shell script
yar:n add -D webpack-chunk-progress
```

add plugin to webpack config
```javascript
const WebpackChunkProgress = require('webpack-chunk-progress')

module.exports = {
    //...
    plugins: [
        new WebpackChunkProgress(),
        // ...
    ]
}
```

where you want to load a chunk:
```javascript
function onProgress(progress) {
    console.log(progress)
    document.getElementById('react-app').innerText = Math.round(progress * 100) + '%'
}

import {load} from 'webpack-chunk-progress/lib/helper'
load(() => import(/* webpackChunkName: 'app' */'./app/index.js'), 'app', onProgress).then(module => {
    /*use your module*/
    module.default()
})
```

the load function takes 3 args, they are:
1. webpack loader function, you need to specify a `NamedChunk`
2. chunkName, same as the chunk name you specified in arg 1.
3. the onProgress function

## Caveats

### CORS
This plugin would replace the default chunk loading function(JSONP) used in Webpack with XHR request, in order to provide progress when loading a chunk, that means, CORS problems may occur if some related headers aren't set.

### webpack-dev-server
In development, especially when you are using a `webpack-dev-server`, for some reason, you need to disable the gzip option to make this plugin work.
