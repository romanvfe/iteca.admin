<script lang="ts" setup>
import LangSelect from '@/components/LangSelect.vue';

definePageMeta({
    layout: 'empty',
});
</script>

<template>
    <div class="login-page">
        <div class="login-page__wrapper">
            <LangSelect
                class="login-page__lang-select"
            />
        </div>
    </div>
</template>

<style lang="scss">
.login-page {
    position: relative;
    width: 100%;
    max-width: 100%;
    min-height: 10vh;

    &__lang-select {
        position: absolute;
        top: 16px;
        right: 16px;
    }
}
</style>
