<script lang="ts" setup>
import { ref } from '#imports';

type IconProps = {
    name: string;
    filled?: boolean;
};

const props = defineProps<IconProps>();
const icon = ref({});

const iconsImport = import.meta.glob('/assets/icons/**/**.svg', { as: 'raw', eager: false });
const rawIcon = await iconsImport[`/assets/icons/${props.name}.svg`]();

icon.value = rawIcon;

if (!rawIcon) {
    console.error(`Icon '${props.name}' doesn't exist in 'assets/icons'`);
}
</script>

<template>
    <span
        :class="[
            $style.icon,
            {
                [$style.filled]: !filled
            }
        ]"
        v-html="rawIcon"
    />
</template>

<style lang="scss" module>
.icon {
    display: flex;
}

.filled,
.filled * {
    fill: currentcolor !important;
}
</style>
