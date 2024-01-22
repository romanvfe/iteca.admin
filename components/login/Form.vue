<script lang="ts" setup>
import { ref, reactive } from '#imports';
import { useVuelidate } from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import { useGlobalStore } from '@/store/global';
import { setToken } from '@/helpers/auth';
import { API_KEY } from '@/config/config';
import UiInput from '@/components/ui/UiInput.vue';
import UiCheckbox from '@/components/ui/UiCheckbox.vue';
import UiButton from '@/components/ui/UiButton.vue';

const { t } = useI18n();
const localePath = useLocalePath();

const { setAuthFlag } = useGlobalStore();

const isShowPassword = ref<boolean>(false);

const form = reactive({
    email:    '',
    password: ''
});

const rules = {
    email: {
        required,
        minLength: minLength(2),
        $lazy:     true,
    },
    password: {
        required,
        minLength: minLength(8),
        $lazy:     true,
    }
};

const v$ = useVuelidate(rules, form);

/**
 * Показать/Скрыть пароль
 */
const togglePassword = () => {
    isShowPassword.value = !isShowPassword.value;
};

/**
 * Отпарвить данные на сервер
 */
const onSubmit = async () => {
    const isValid = await v$.value.$validate();

    if (!isValid) {
        return;
    }

    const { data } = await useFetch('/api/login/', {
        method: 'POST',
        body:   {
            apiKey: API_KEY,
            login:  form.email,
            pass:   form.password
        }
    });

    const res = await JSON.parse(String(data.value));

    if (res) {
        setToken(res.token);
        setAuthFlag(true);

        navigateTo({ path: localePath('/') });
    }
};
</script>

<template>
    <form
        class="login-form"
        @submit.prevent="onSubmit"
    >
        <h2 class="login-form__title">
            {{ t('login.title') }}
        </h2>

        <UiInput
            v-model:modelValue="form.email"
            type="text"
            name="login-form-field-email"
            :placeholder="t('login.placeholder.email')"
            :error="v$.email.$error && t('login.error.email')"
        />

        <UiInput
            v-model:modelValue="form.password"
            :type="isShowPassword ? 'text' : 'password'"
            name="login-form-field-email"
            :placeholder="t('login.placeholder.password')"
            :error="v$.password.$error && t('login.error.password')"
        />

        <UiCheckbox
            :checked="isShowPassword"
            @change="togglePassword"
        >
            <template #label>
                {{ t('login.show-pass') }}
            </template>
        </UiCheckbox>

        <UiButton
            type="submit"
            class="login-form__btn-login"
        >
            {{ t('ui.login') }}
        </UiButton>
    </form>
</template>

<style lang="scss">
.login-form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__title {
        margin-bottom: 8px;
        font-size: 16px;
        font-weight: $f-weight-semi-bold;
        line-height: 24px;
        color: $text-color;
    }
}
</style>
