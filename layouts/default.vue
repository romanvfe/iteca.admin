<script lang="ts" setup></script>

<template>
    <div class="layout-default">
        <header class="header" id="header">
            Header
        </header>

        <main class="content">
            <slot name="default" />
        </main>

        <footer class="footer" id="footer">
            Footer
        </footer>
    </div>
</template>
