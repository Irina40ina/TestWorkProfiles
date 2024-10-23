<script>
import {mapGetters} from 'vuex';
export default {
    emits: ['openProfile'],
    methods: {
        openProfile(id) {
            this.$emit('openProfile', id);
        },
    },
    computed: {
        ...mapGetters({
            filteredUsers: 'users/filteredUsers',
        })
    },
}
</script>
<template>
    <!-- Компонент списка пользователей -->
    <v-list-item
    v-for="(user, id) in filteredUsers"
    :key="id"
    rounded="shaped"
    density="compact"
    >
    <!-- Аватар -->
        <template v-slot:prepend>
            <div class="profile__avatar">
                <h1 class="avatar-stub">{{ user.name.split(' ').map(w => w[0]).join('').toUpperCase() }}</h1>
            </div>
        </template>
    <!-- Имя -->
        <v-list-item-title>{{ user.username }}</v-list-item-title>
    <!-- Место работы -->
        <v-list-item-subtitle>Work in: {{ user.company.name }}</v-list-item-subtitle>
    <!-- Кнопка для открытия профиля -->
        <template v-slot:append>
            <v-btn
            color="grey-lighten-1"
            icon="mdi-information"
            variant="text"
            @click="openProfile(user.id)"
            ></v-btn>
        </template>
    </v-list-item>
</template>
<style scoped>
        .profile__avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgb(161, 80, 161);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .avatar-stub {
        color: white;
        font-size: 1rem;
    }
    .v-list-item  {
        gap: 2rem;
    }

</style>