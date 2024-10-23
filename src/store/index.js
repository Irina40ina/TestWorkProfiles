import {createStore} from "vuex";
import { usersListModule } from "./usersListModule";
import { profileModule } from "./profileModule";
import { postListModule } from "./postListModule";

export default createStore({
    modules: {
        users: usersListModule,
        profile: profileModule,
        posts: postListModule,
    }
})