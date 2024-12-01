<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const banners = [
  {
    id: 1,
    image: 'https://placehold.co/1920x800/f8fafc/1e293b',
    title: 'Nova Coleção',
    subtitle: 'Descubra as últimas tendências',
    cta: 'Explorar',
    link: '/produtos?category=novidades'
  },
  {
    id: 2,
    image: 'https://placehold.co/1920x800/f8fafc/1e293b',
    title: 'Promoção Especial',
    subtitle: 'Até 50% de desconto',
    cta: 'Ver Ofertas',
    link: '/produtos?category=promocao'
  }
]

const swiperInstance = ref<Swiper | null>(null)

onMounted(() => {
  swiperInstance.value = new Swiper('.swiper', {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  })
})
</script>

<template>
  <div class="swiper w-full">
    <div class="swiper-wrapper">
      <div
        v-for="banner in banners"
        :key="banner.id"
        class="swiper-slide relative"
      >
        <img
          :src="banner.image"
          :alt="banner.title"
          class="w-full h-[500px] sm:h-[600px] lg:h-[800px] object-cover"
        />
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center px-4">
            <h2 class="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-4">
              {{ banner.title }}
            </h2>
            <p class="text-lg sm:text-xl mb-8 font-light">
              {{ banner.subtitle }}
            </p>
            <RouterLink
              :to="banner.link"
              class="inline-block bg-black text-white px-8 py-3 text-sm rounded-full hover:bg-gray-900 transition-colors"
            >
              {{ banner.cta }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>