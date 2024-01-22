<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue';
import debounce from 'lodash.debounce';
import { useGlobalStore } from '@/store/global';
import { authCheck } from '@/helpers/auth';

const WAIT = 100;

const localePath = useLocalePath();

const { setAuthFlag } = useGlobalStore();

/**
 * Записывает значение скролла в кастомную переменную.
 */
const spyScroll = debounce(() => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
}, WAIT);

onMounted(() => {
    window.addEventListener('scroll', spyScroll);

    if (!authCheck()) {
        setAuthFlag(false);

        navigateTo({ path: localePath('/login') });
    }
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', spyScroll);
});
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
