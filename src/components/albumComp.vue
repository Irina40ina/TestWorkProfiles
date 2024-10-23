<script>
import {mapState} from 'vuex';
export default {
    data() {
        return {
            isFocused: false,
            photos: [],
        }
    },
    props: {
        albData: {
            type: Object,
            default: null,
            required: false, 
        },
    },
    methods: {
        handleMouseEnter() {
            this.isFocused = true;
        },
        handleMouseLeave() {
            this.isFocused = false;
        }
    },
    computed: {
        ...mapState({
            isLoadingAlbums: state => state.profile.isLoadingAlbums,
        }),
    },
}
</script>
<template>
    <!-- loader -->
    <div class="loading-container elevation-3 rounded"
    v-if="isLoadingAlbums">
        <v-skeleton-loader type="card"></v-skeleton-loader>
    </div>
    <!-- component -->
    <div v-else class="album-container elevation-3 rounded"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
        <div class="w-100 mt-1 mb-2">
            <h2 class="album-container__album-title">{{ $props.albData.title }}</h2>
        </div>
        <v-carousel 
        class="album-container__carousel"
        height="100%"
        :show-arrows="false" 
        :cycle="isFocused" 
        :continuous="isFocused" 
        :interval="1500">
            <v-carousel-item
            class="album-container__item"
            v-for="(photo, id) in $props.albData.photos"
            :key="id"
            cover
            >
            <img 
            class="album-container__img"
            :src="photo.url" 
            alt="photo" 
            />
            </v-carousel-item>
        </v-carousel>
    </div>
</template>
<style lang="scss">
@import '../styles/variables';
.album-container {
    width: 100%;
    height: 400px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &__album-title {
    text-align: center;
    color: var(--card-title-fg);
    font-size: 16px;
    font-family: var(--basic-font);
    }
    &__album-title {
        font-size: 1rem;
        padding: 0 .3rem;
        color: var(----basic-fg);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    &__item {
        width: 100%;
        height: 100%;
    }
    &__img {
        height: 100%;
        object-fit: contain;
    }
} 
.loading-container {
    width: 100%;
}
</style>    