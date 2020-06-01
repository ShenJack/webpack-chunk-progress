
import {load} from "../lib/helper";


function onAppProgress(progress) {
    console.log(progress)
    document.getElementById('react-app').innerText = Math.round(progress * 100) + '%'
}

window.loadApp = function () {
    load(() => import(/* webpackChunkName: 'app' */'./app/index.js'), 'app', onAppProgress).then(app => {
        app.default()
    })
}

