<script lang="ts" setup>
import { computed, useAttrs } from '#imports';
import type { ButtonTheme } from '@/types/ui/Button';
import UiLoader from '@/components/ui/UiLoader.vue';

const props = defineProps<{
    type: string,
    theme?: ButtonTheme,
    disabled?: boolean,
    isLoading?: boolean,
    isSmall?: boolean,
    label?: string,
}>();

const attrs = useAttrs();

/**
 * Тема
 */
const themeType = computed(() => props.theme);

/**
 * Цвет лоадера
 */
const loaderColor = computed(() => {
    if (props.disabled) {
        return 'gray';
    }

    return 'white';
});

/**
 * Тип компоненты
 */
const component = computed(() => {
    let component = 'button';

    if (attrs?.to) {
        component = 'router-link';
    }

    if (attrs?.href) {
        component = 'a';
    }

    return component;
});
</script>

<template>
    <component
        v-bind="attrs"
        ref="button"
        :is="component"
        :type="component === 'button' ? type : null"
        :disabled="disabled || undefined"
        :class="[
            'ui-button',
            {
                'ui-button--disabled': disabled,
                [`ui-button--${themeType}`]: themeType,
                'ui-button--small': isSmall,
                'is-loading': isLoading,
            }
        ]"
    >
        <span
            v-if="$slots.iconBefore"
            :class="{
                'ui-button__icon': true,
                'ui-button__icon--before': $slots.iconBefore
            }"
        >
            <slot name="iconBefore" />
        </span>
        <slot name="default">
            {{ label }}
        </slot>
        <div
            v-if="isLoading"
            class="ui-button__loader"
        >
            <UiLoader
                :scale="0.7"
                :color="loaderColor"
            />
        </div>
        <span
            v-if="$slots.iconAfter"
            :class="{
                'ui-button__icon': true,
                'ui-button__icon--after': $slots.iconAfter
            }"
        >
            <slot name="iconAfter" />
        </span>
    </component>
</template>

<style lang="scss">
.ui-button {
    @include button-reset();

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 44px;
    padding: 0 16px;
    font-size: inherit;
    line-height: inherit;
    border-radius: $radius-medium;
    border: 1px solid transparent;
    box-shadow: 0 2px 4px 0 rgba($black-primary, 0.1);
    text-decoration: none;
    outline: none;
    color: $white;
    background: $orange-darker;
    transition: box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease;

    &:active,
    &:hover {
        background: $orange;
        color: $white;
        box-shadow: none;
        text-decoration: none;
    }

    &__icon {
        margin-right: 4px;
    }

    &:disabled,
    &--disabled {
        pointer-events: none;
        box-shadow: none;
        background-color: $disabled;
        border-color: rgba($black-primary, 0.1);
        color: $gray;

        &:hover,
        &:focus {
            color: $gray;
        }
    }

    &__loader {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        transform-origin: center;
        transform: translateY(-50%);
        margin: auto;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
            display: flex;
        }
    }

    &.is-loading {
        color: transparent;
        user-select: none;
        pointer-events: none;
        border-color: rgba($black-primary, 0.1);
        background-color: $white-darkest;
        box-shadow: none;
    }

    &--small {
        height: 36px;
    }
}
</style>
