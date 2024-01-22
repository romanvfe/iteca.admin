<script lang="ts" setup>
defineProps<{
    checked: boolean;
    disabled?: boolean;
}>();

const emit = defineEmits(['change']);
</script>

<template>
    <label class="ui-checkbox">
        <input
            type="checkbox"
            :checked="checked"
            :disabled="disabled"
            class="ui-checkbox__input"
            @change="emit('change', !checked)"
        >

        <span
            :class="{
                'ui-checkbox__check': true,
                'ui-checkbox__check--checked': checked,
            }"
        />

        <span
            v-if="$slots.label"
            class="ui-checkbox__label"
        >
            <slot name="label" />
        </span>
    </label>
</template>

<style lang="scss">
.ui-checkbox {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-height: 24px;
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
    line-height: 24px;
    user-select: none;
    cursor: pointer;
    box-sizing: border-box;

    &__label {
        display: inline-block;
        margin-left: 4px;
        font-size: 16px;
        font-weight: $f-weight-regular;
        line-height: 24px;
        color: $text-color;
    }

    &__input {
        @include visually-hidden;
    }

    &__check {
        position: relative;
        display: inline-block;
        flex: none;
        width: 20px;
        height: 20px;
        border-radius: $radius;
        border: 1px solid rgba($black-primary, 0.2);
        background-color: $white;
        transition: border-color 0.05s ease-out, background-color 0.05s ease-out;

        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            background: url('@/assets/icons/icon-checked.svg') no-repeat center center / cover;
            opacity: 0;
            transform: translate(-50%, -50%);
        }

        &--checked {
            background-color: $blue-primary;

            &::before {
                opacity: 1;
            }
        }
    }

    &--disabled {
        cursor: default;
    }

    &__input:focus ~ &__check {
        border-color: $blue-primary;
    }

    &__input:checked:disabled ~ &__check {
        cursor: default;
        border-color: rgba($black-primary, 0.1);
        background-color: rgba($black-primary, 0.05);

        &::before {
            color: rgba($black-primary, 0.3);
        }
    }
}
</style>
