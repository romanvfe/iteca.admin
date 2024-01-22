<script lang="ts" setup>
import LoginForm from '@/components/login/Form.vue';
import LangSelect from '@/components/login/Lang.vue';

definePageMeta({
    layout: 'empty',
});
</script>

<template>
    <div class="login-page">
        <div class="login-page__wrapper">
            <LoginForm />

            <LangSelect />
        </div>
    </div>
</template>

<style lang="scss">
.login-page {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 100vh;

    &__wrapper {
        width: 100%;
        max-width: 314px;
        padding: 20px 20px 30px;
        box-shadow: $box-shadow-primary;
    }
}
</style>
