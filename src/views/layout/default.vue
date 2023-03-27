<!-- 默认容器组件 -->
<template>
	<main
		class="flex_column"
		ref="main"
		@scroll="MainScroll"
	>
		<header class="flex_between">
			
		</header>

		<section>
			<router-view v-slot="{ Component, route }">
				<keep-alive v-if="route.meta.keepAlive">
					<component :is="Component" />
				</keep-alive>
				<component
					v-else
					:is="Component"
				/>
			</router-view>
		</section>
	</main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const $store = useStore()
const $router = useRouter()
const $route = useRoute()

// 滚动高度
const scrollTop = ref(0)
// 容器
const main = ref(null)
// 定时器
const time = ref(null)

// 页面滚动
const MainScroll = (e) => {
	if (time.value) clearTimeout(time.value)

	time.value = setTimeout(() => {
		scrollTop.value = e.target.scrollTop
		location.hash = ''
	}, 100)
}

// 跳转
const LinkTo = path => {
	$router.push({ path })
	main.value.scrollTo(0, 0)
}

</script>

<style lang="scss" scoped>
main {
	height: 100%;
	overflow-y: auto;

	header {
		
	}

	section {
		flex: 1;
	}
}
</style>