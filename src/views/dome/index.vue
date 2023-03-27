<template>
    <div class="container">

        <div
            v-if="swiper_list.length > 0"
            class="swiper_box"
        >
            <ElCarousel
                height="1000px"
                :interval="5000"
            >
                <ElCarouselItem
                    v-for="item in swiper_list"
                    :key="item.id"
                >
                    <img :src="item.image">
                </ElCarouselItem>
            </ElCarousel>

            <section class="flex_column section_1">
                <strong>{{ lang.text_1 }}</strong>
                <strong>{{ lang.text_2 }}</strong>
                <strong @click="ClickFindMore">{{ lang.text_3 }}</strong>
            </section>
        </div>

        <section
            id="section_2"
            class="section_2"
        >
            <div class="flex_center title">
                <strong>{{ lang.text_4 }}</strong>
            </div>

            <div class="flex_center explain_box">
                <div class="text">
                    <strong>{{ lang.text_5 }}</strong>

                    <p>{{ lang.text_6 }}</p>
                </div>

                <img
                    class="width_350"
                    src="@/assets/images/home_img_2.png"
                >
            </div>

            <div class="flex_center explain_box_2">
                <img
                    class="width_580"
                    src="@/assets/images/home_img_3.png"
                >

                <div class="text">
                    <strong>{{ lang.text_7 }}</strong>

                    <p>{{ lang.text_8 }}</p>
                </div>
            </div>
        </section>

        <section class="section_3">
            <div class="z_2">
                <div class="flex_center title">
                    <strong>{{ lang.text_9 }}</strong>
                </div>

                <div class="flex_center title_2">
                    <span>{{ lang.text_10 }}</span>
                </div>

                <div class="flex_start step_box">
                    <div class="flex_column step_item">
                        <div class="flex_center index">1</div>

                        <p class="content">{{ lang.text_11 }}</p>
                    </div>

                    <div class="flex_column step_item">
                        <div class="flex_center index">2</div>

                        <p class="content">{{ lang.text_12 }}</p>
                    </div>

                    <div class="flex_column step_item">
                        <div class="flex_center index">3</div>

                        <p class="content">{{ lang.text_13 }}</p>
                    </div>
                </div>

                <div class="flex_start step_box">
                    <div class="flex_column step_item">
                        <div class="flex_center index">4</div>

                        <p class="content">{{ lang.text_14 }}</p>
                    </div>

                    <div class="flex_column step_item">
                        <div class="flex_center index">5</div>

                        <p class="content">{{ lang.text_15 }}</p>
                    </div>

                    <div class="flex_column step_item">
                        <div class="flex_center index">6</div>

                        <p class="content">{{ lang.text_16 }}</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section_4">
            <div class="flex_center title">
                <strong>{{ lang.text_17 }}</strong>
            </div>

            <div class="flex_center title_2">
                <span>{{ lang.text_18 }}</span>
            </div>

            <div class="flex_center">
                <div class="form">
                    <div class="form_item">
                        <input
                            v-model="form.name"
                            type="text"
                            :placeholder="lang.text_19"
                        >
                    </div>

                    <div class="form_item">
                        <input
                            v-model="form.email"
                            type="email"
                            :placeholder="lang.text_20"
                        >
                    </div>

                    <div class="form_item">
                        <input
                            v-model="form.mobile"
                            type="tel"
                            :placeholder="lang.text_21"
                        >
                    </div>

                    <div class="form_item">
                        <textarea
                            v-model="form.content"
                            type="textarea"
                            rows="5"
                            :placeholder="lang.text_22"
                        ></textarea>
                    </div>

                    <div class="flex_center">
                        <button
                            class="submit"
                            @click="Submit"
                        >{{ lang.text_23 }}</button>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElCarousel, ElCarouselItem } from 'element-plus'
import { submitConsultingServer, getSwiperList } from './api'

const $store = useStore()

const lang = computed(() => $store.getters.lang.home)
// 表单
const form = ref({})
// 轮播列表
const swiper_list = ref([])

onMounted(() => {
    // 查询轮播图片
    getSwiperList()
        .then(res => {
            swiper_list.value = res?.data || []
        })
})

// 提交
const Submit = () => {
    if (!form.value.name || !form.value.email || !form.value.mobile || !form.value.content) {
        ElMessage({
            message: 'Please improve the form',
            type: 'error'
        })
        return
    }

    // 提交
    submitConsultingServer({
        name: form.value.name,
        email: form.value.email,
        mobile: form.value.mobile,
        content: form.value.content,
    })
        .then(res => {
            ElMessage({
                message: 'success',
                type: 'success'
            })

            form.value = ref({})
        })
}

// 点击寻找更多
const ClickFindMore = () => {
    location.hash = 'section_2'
}

</script>

<style lang='scss' scoped>
.container {

    .swiper_box {
        position: relative;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .section_1 {
        // background: url('@/assets/images/home_img_1.png') no-repeat 35% 0/125%;
        // background-attachment: fixed;
        // box-shadow: inset 0px 10000px 0px rgb(0 0 0 / 40%);
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        padding: 300px 400px;

        strong:nth-of-type(1) {
            font-size: 48px;
            text-align: center;
        }

        strong:nth-of-type(2) {
            font-size: 28px;
            margin: 30px 0px 50px;
            text-align: center;
        }

        strong:nth-of-type(3) {
            font-size: 16px;
            padding: 12px 18px;
            border: 3px solid #ffffff;
            border-radius: 30px;
            cursor: pointer;
        }
    }

    .section_2 {
        padding: 75px 0px;
        background: #e8eaec;

        .title {
            font-size: 44px;
            color: #000000;
            margin-bottom: 40px;
        }

        .explain_box {
            margin-bottom: 20px;

            .text {
                width: 600px;
                padding: 45px;
                background: #eaeff6;
                margin-right: 20px;

                strong {
                    font-size: 28px;
                    color: #222222;
                    display: block;
                    margin-bottom: 20px;
                }

                p {
                    font-size: 16px;
                    color: #222222;
                    line-height: 30px;
                }
            }

            img {
                align-self: flex-start;
                width: 350px;
            }

        }

        .explain_box_2 {

            .text {
                width: 350px;
                padding: 45px;
                background: #eaeff6;
                align-self: flex-start;

                strong {
                    font-size: 28px;
                    color: #222222;
                    display: block;
                    margin-bottom: 20px;
                }

                p {
                    font-size: 16px;
                    color: #222222;
                    line-height: 30px;
                }
            }

            img {
                width: 600px;
                margin-right: 20px;
            }

        }
    }

    .section_3 {
        background: url('@/assets/images/home_img_4.png') no-repeat 0 0/100% 100%;
        background-attachment: fixed;
        box-shadow: inset 0px 10000px 0px rgb(0 0 0 / 40%);
        padding: 80px 0px;
        color: #ffffff;

        .title {
            font-size: 44px;
            margin-bottom: 20px;
        }

        .title_2 {
            font-size: 28px;
            margin-bottom: 40px;
        }

        .step_box {
            padding: 0px 400px;

            .step_item {
                width: 33.3%;
                align-self: flex-start;

                .index {
                    border: 1px solid #ffffff;
                    width: 55px;
                    height: 55px;
                    font-weight: bold;
                    font-size: 26px;
                    align-self: center;
                }

                .content {
                    font-size: 24px;
                    line-height: 1.45;
                    text-align: center;
                    padding: 30px 10px;
                    margin-bottom: 10px;
                }
            }
        }

    }

    .section_4 {
        background: url('@/assets/images/home_img_5.png') no-repeat 0 0/100% 100%;
        background-attachment: fixed;
        position: relative;
        padding: 80px 0px;

        .title {
            font-size: 44px;
            margin-bottom: 20px;
            color: #ffffff;
        }

        .title_2 {
            font-size: 28px;
            margin-bottom: 40px;
            color: #ffffff;
        }

        .form {
            width: 500px;

            .form_item {
                padding: 10px;
                background: #ffffff;
                margin-bottom: 20px;
                border-radius: 3px;

                input,
                textarea {
                    width: 100%;
                    font-size: 18px;
                    font-family: none;
                }

            }

            button.submit {
                background: #46658e;
                color: #ffffff;
                border: none;
                padding: 25px 45px;
                font-size: 24px;
                font-weight: bold;
                border-radius: 40px;
                cursor: pointer;

                &:hover {
                    background: #4d6f9c;
                }
            }
        }
    }
}
</style>