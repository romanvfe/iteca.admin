<script lang="ts" setup>
import { ref, useSwitchLocalePath } from '#imports';
import lang from '@/config/lang';
import type { LocaleObject } from 'vue-i18n-routing';
import UiIcon from '@/components/ui/UiIcon.vue';

const { locales, locale } = useI18n();

const switchLocalPath = useSwitchLocalePath();

const isShowSuggests = ref<boolean>(false);

/**
 * Отображает язык в интерфейсе
 *
 * @param {Object<LocaleObject>>} item - объект локали
 * @returns первые 3 буквы локали или его код
 */
const getLocaleDisplayName = (item: LocaleObject) => {
    const maxLength = 3;

    return item.name?.slice(0, maxLength) ?? item.code;
};

/**
 * Показать/Скрыть список опций
 *
 * @param {boolean} val
 */
const toggleOptions = (val: boolean) => {
    isShowSuggests.value = val;
};
</script>

<template>
    <div class="login-lang-select">
        <label
            tabindex="0"
            for="login-lang-select"
            class="login-lang-select__label"
            @focus="toggleOptions(true)"
            @blur="toggleOptions(false)"
        >
            {{ lang[locale] }}

            <UiIcon
                name="icon-arrow-down"
                class="login-lang-select__label-icon"
            />
        </label>

        <transition name="fade">
            <ul
                v-if="isShowSuggests"
                class="login-lang-select__suggests"
            >
                <nuxt-link
                    v-for="item in (locales as LocaleObject[])"
                    v-slot="{ href, navigate }"
                    :key="item.code"
                    :to="switchLocalPath(item.code) || '/'"
                    custom
                >
                    <li
                        :class="[
                            'login-lang-select__suggests-item',
                            { ['login-lang-select__suggests-item--active']: item.code === locale }
                        ]"
                    >
                        <a
                            :href="href"
                            class="login-lang-select__suggests-item-link"
                            @click="navigate"
                        >
                            {{ getLocaleDisplayName(item) }}
                        </a>
                    </li>
                </nuxt-link>
            </ul>
        </transition>
    </div>
</template>

<style lang="scss">
.login-lang-select {
    position: absolute;
    top: 24px;
    right: 24px;
    width: 100%;
    max-width: 120px;

    &__label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 4px 8px;
        font-size: 16px;
        font-weight: $f-weight-semi-bold;
        line-height: 24px;
        border-radius: $radius;
        border: 1px solid rgba($black-primary, 0.2);
        color: $text-color;
        cursor: pointer;
    }

    &__suggests {
        @include list-reset();

        position: absolute;
        top: calc(100% + 8px);
        width: 100%;
        border-radius: $radius;
        border: 1px solid rgba($black-primary, 0.2);
    }

    &__suggests-item {
        padding: 8px;
        border-top: 1px solid rgba($black-primary, 0.2);
        cursor: pointer;

        &:first-child {
            border-top: none;
        }

        &:hover {
            .login-lang-select__suggests-item-link {
                color: $blue-primary;
            }
        }
    }

    &__suggests-item-link {
        display: inline-block;
        width: 100%;
        font-size: 16px;
        font-weight: $f-weight-regular;
        line-height: 24px;
        text-decoration: none;
        color: $text-color;
        transition: color 0.3s ease;
    }
}
</style>
