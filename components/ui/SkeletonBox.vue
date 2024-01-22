<script lang="ts" setup>
withDefaults(defineProps<{
    delay?: number;
    width?: string;
    height?: string;
    invert?: boolean;
    isStatic?: boolean;
}>(), {
    delay:  100,
    width:  undefined,
    height: undefined,
});
</script>

<template>
    <div class="skeleton-box">
        <div
            class="skeleton-box__inner"
            :class="{
                'skeleton-box__inner--inverted': invert,
                'skeleton-box__inner--static': isStatic,
            }"
            :style="{
                width: width,
                minHeight: height,
                animationDelay: `-${delay}ms`,
            }"
        />
    </div>
</template>

<style scoped lang="scss">
$base-color: $white-darkest;
$shine-color: $white;
$shine-color-invert: $gray-lightest;
$animation-duration: 2.6s;

.skeleton-box {
    --base-color: #{$base-color};
    --shine-color: #{$shine-color};

    position: relative;
    z-index: 0;
    display: block;
    content-visibility: auto;
    height: 22px;

    &__inner {
        display: inline-block;
        height: 100%;
        width: 100%;
        border-radius: $radius;
        vertical-align: top;
        background-image:
            linear-gradient(
                    100deg,
                    var(--base-color) 0%,
                    var(--base-color) 10%,
                    var(--shine-color) 20%,
                    var(--base-color) 22%
            );
        background-size: 200%;
        background-repeat: repeat-x;
        animation-name: shine;
        animation-duration: $animation-duration;
        animation-timing-function: linear;
        animation-iteration-count: infinite;

        &--inverted {
            --base-color: #{$shine-color-invert};
            --shine-color: #{$base-color};
            opacity: 0.5;
        }

        &--static {
            animation-play-state: paused;
        }
    }

    @for $i from 1 through 3 {
        &:nth-child(3n + #{$i}) &__inner {
            animation-delay: $i * 10ms;
        }
    }

    &--static {
        animation-play-state: paused;
        animation-delay: 0ms;
    }
}

@keyframes shine {
    0% {
        background-position-x: 60%;
    }

    50%,
    100% {
        background-position-x: -100%;
    }
}
</style>
