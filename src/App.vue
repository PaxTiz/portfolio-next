<template>
  <Topbar />
  <router-view />
  <Footer />
</template>

<script setup>
import Topbar from '@/components/layout/Topbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>