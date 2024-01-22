<script lang="ts" setup>
import { ref, computed, watch, useAttrs } from '#imports';
import UiLoader from '@/components/ui/UiLoader.vue';
import UiIcon from '@/components/ui/UiIcon.vue';

const props = defineProps<{
    type: string;
    name: string;
    modelValue: string | number;
    isLoading?: boolean;
    disabled?: boolean;
    error?: string | boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const attrs = useAttrs();

const value = ref<string>(String(props.modelValue));
const input = ref<HTMLInputElement|null>(null);

const isClearable = computed(() => value.value.length > 0);
const isShowIcon = computed(() => isClearable.value || !!props.error);

/**
 * Обновление значения
 *
 * @param {string} val
 */
const updateValue = (val: string) => {
    value.value = val;

    emit('update:modelValue', val);
};

/**
 * Обработка ввода
 *
 * @param {Event} e
 */
const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement | null;

    if (target === null || target.value === value.value) {
        return;
    }

    updateValue(target.value);
};

/**
 * Хэдлинг вставки в инпут
 *
 * @param {Event} e
 */
const handlePaste = (e: Event) => {
    setTimeout(() => {
        handleInput(e);
    }, 0);
};

/**
 * Обработчик клика на иконку
 */
const handleIconClick = () => {
    if (isClearable.value) {
        emit('update:modelValue', '');
    }
};

/**
 * Програмная установка фокуса
 */
const focus = () => {
    if (input.value === undefined) return;

    const inputElement = input.value as HTMLInputElement;

    inputElement.focus();
};

/**
 * Програмная разфокусировка
 */
const blur = () => {
    if (input.value === undefined) return;

    (input.value as HTMLInputElement).blur();
};

watch(() => props.modelValue, (next) => { value.value = String(next); }, { immediate: true});
</script>

<template>
    <div class="ui-input">
        <label
            v-if="$slots.label"
            :for="name"
            class="ui-input__label"
        >
            <slot name="label" />

            <span
                v-if="$attrs.required !== undefined"
                class="ui-input__required-sign"
            >
                *
            </span>
        </label>

        <label
            :for="name"
            :class="{
                'ui-input__wrap': true,
                'ui-input__wrap--error': error,
                'ui-input__wrap--disabled': disabled,
            }"
        >
            <input
                v-bind="attrs"
                ref="input"
                :id="name"
                :type="type"
                :value="value"
                class="ui-input__field"
                @input="handleInput"
                @paste="handlePaste"
                @drop.prevent
                @focus="focus"
                @blur="blur"
            >
            <span class="ui-input__action-box">
                <span
                    v-if="isLoading"
                    class="ui-input__loader"
                >
                    <UiLoader
                        :scale="0.7"
                        color="gray"
                    />
                </span>

                <span
                    v-else-if="!disabled && isShowIcon"
                    :class="{
                        'ui-input__icon': true,
                        'ui-input__icon--error': error
                    }"
                    @click="handleIconClick"
                >
                    <UiIcon
                        v-if="!error"
                        name="icon-clear"
                        class="ui-input__icon-clear"
                    />

                    <UiIcon
                        v-else
                        name="icon-error"
                        class="ui-input__icon-error"
                    />
                </span>
            </span>
        </label>

        <span
            v-if="error && typeof error === 'string'"
            class="ui-input__hint ui-input__hint--error"
        >
            {{ error }}
        </span>
    </div>
</template>

<style lang="scss">
.ui-input {
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 100%;
    margin: 0;
    font-weight: inherit;

    &__label {
        display: inline-block;
        margin-bottom: 4px;
        font-size: 16px;
        font-weight: $f-weight-regular;
        line-height: 24px;
        color: $text-color;
    }

    &__required-sign {
        color: $red;
    }

    &__wrap {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        border-radius: $radius;
        border: 1px solid rgba($blue-primary, 0.2);
        background-clip: padding-box;
        background-color: $white;
        color: $black-primary;
        transition: border-color 0.3s ease;

        &:focus-within {
            border-color: $blue-primary;
            outline: none;
        }

        &--disabled {
            transition: none;
            pointer-events: none;
            border-color: rgba($black-primary, 0.2);
            background: $disabled;
            color: $gray;
        }

        &--error {
            &,
            &:focus-within,
            &:hover {
                border-color: $red;
                box-shadow: 0 0 3px 0 rgba($red, 0.6);
            }
        }
    }

    &__field {
        display: block;
        width: 100%;
        height: 44px;
        padding: 10px 0 10px 16px;
        font-family: inherit;
        font-size: 16px;
        font-weight: inherit;
        line-height: 24px;
        border: none;
        background-color: transparent;
        appearance: none;

        &[type="search"] {
            &,
            &::-webkit-search-decoration {
                appearance: none;
            }

            &::-webkit-search-decoration,
            &::-webkit-search-cancel-button,
            &::-webkit-search-results-button,
            &::-webkit-search-results-decoration {
                display: none;
            }
        }

        &::-ms-reveal,
        &::-ms-clear {
            display: none;
        }

        &:placeholder-shown {
            text-overflow: ellipsis;
        }

        &:focus {
            outline: none;
        }

        &::placeholder {
            @include one-line;

            color: $gray;
        }
    }

    &__hint {
        display: block;
        padding: 4px 0;
        font-size: 16px;
        line-height: 24px;
        background-color: $white;

        &--error {
            color: $red;
        }
    }

    &__action-box {
        display: flex;
        align-items: center;
    }

    &__loader {
        position: absolute;
        top: 50%;
        right: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(-50%);
    }

    &__icon {
        position: absolute;
        top: 50%;
        right: 8px;
        transform: translateY(-50%);
    }

    &__icon-clear {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 100px;
        background-color: $gray-lightest;
        color: $white;
        cursor: pointer;
    }

    &__icon-error {
        color: $red;
    }
}
</style>
