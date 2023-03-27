export default {
	state: () => ({

	}),

	mutations: {
		/**
		 * @description 根据传入字段名，更新对应字段数据
		 * @param {Object} data 
		 */
		updataState (state, data) {
			let entries = Object.entries(data)

			for (const [key, val] of entries) {
				state[key] = val
			}
		},
	},

	getters: {
		
	}
};