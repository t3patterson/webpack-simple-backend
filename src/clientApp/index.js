if(window.location.hostname === 'localhost'){
	let linkEl = document.querySelector('link[href="./css/styles.min.css"]')
	let headEl = document.querySelector('head')
	headEl.removeChild(linkEl)
}

import styles from './styles/main.scss'
import app from './scripts/app.js'
