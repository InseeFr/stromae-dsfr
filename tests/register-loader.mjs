import { register } from 'node:module'

register('./extension-loader.mjs', import.meta.url)
