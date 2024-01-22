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
 * @param {Object<LocaleObject>} item - объект локали
 */
const getLocaleDisplayName = (item: LocaleObject) => item.name;

/**
 * Отобразить/Скрыть опции
 *
 * @param {boolean} bool
 */
const toggleOptions = (bool: boolean) => {
    isShowSuggests.value = bool;
};
</script>

<template>
    <div class="lang-select">
        <label
            for="lang-select"
            class="lang-select__label"
        >
            <UiIcon
                name="icon-global"
                class="lang-select__label-icon"
            />

            {{ lang[locale] }}

            <UiIcon
                name="icon-arrow-down"
                :class="{
                    'lang-select__label-icon': true,
                    'lang-select__label-icon--active': isShowSuggests
                }"
            />

            <input
                id="lang-select"
                type="checkbox"
                class="lang-select__field"
                @focus="toggleOptions(true)"
                @blur="toggleOptions(false)"
            >
        </label>

        <transition name="fade">
            <ul
                v-if="isShowSuggests"
                class="lang-select__suggests"
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
                            'lang-select__suggests-item',
                            { ['lang-select__suggests-item--active']: item.code === locale }
                        ]"
                    >
                        <a
                            :href="href"
                            class="lang-select__suggests-item-link"
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
.lang-select {
    &__label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        width: 100%;
        min-width: 140px;
        padding: 8px 4px;
        font-size: 14px;
        font-weight: $f-weight-regular;
        line-height: 20px;
        border-radius: $radius;
        border: 1px solid $gray-lightest;
        background-color: $white-darkest;
        color: $gray-darker;
        cursor: pointer;
    }

    &__label-icon {
        transition: transform 0.3s ease;

        &--active {
            transform: rotate(-180deg);
        }
    }

    &__field {
        @include visually-hidden();
    }

    &__suggests {
        @include list-reset();

        position: absolute;
        top: calc(100% + 8px);
        width: 100%;
        border-radius: $radius;
        background-color: $white;
        box-shadow: 0 2px 5px 0 rgba($black-primary, 0.15);
        overflow: hidden;
    }

    &__suggests-item {
        padding: 8px;
        transition: background 0.5s ease;
        cursor: pointer;

        &--active,
        &:hover {
            background: $orange;

            .lang-select__suggests-item-link {
                color: $white;
            }
        }
    }

    &__suggests-item-link {
        display: inline-block;
        width: 100%;
        font-size: 14px;
        font-weight: $f-weight-regular;
        line-height: 20px;
        text-decoration: none;
        color: $gray-darker;
    }
}
</style>
