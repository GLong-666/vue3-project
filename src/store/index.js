import { createStore } from 'vuex';

const modulesFiles = import.meta.globEager('./modules/*.js');
let modules = {};

Object?.keys(modulesFiles)?.forEach(i => {
	let key = i.match(/\/(\w*).js$/)?.[1];

	modules[key] = modulesFiles[i].default;
});

export default createStore({
	modules
});