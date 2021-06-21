import {createStore} from "vuex";
import createPersistedState from 'vuex-persistedstate';

const findUser = (state, id) => state.users.find(x=> x.id === id);
const store = createStore({
    plugins: [createPersistedState()],
    state(){
        return {
          users: []
        };
    },
    getters: {
        availableUsers: state => state.users.filter(x => !x.isDeleted),
        deletedUsers: state => state.users.filter(x => x.isDeleted),
        findUser: findUser
    },
    mutations: {
        addUser: (state,user) => state.users.push({
            ...user,
            isDeleted: false
        }),
        deleteUser(state, id) {
            const user = findUser(state,id);
            if(!user) throw "User not found";
            user.isDeleted = true;
        },
        updateUser(state,user) {
            const dbUser = findUser(state,user.id);
            if(!dbUser) throw "User not found";
            dbUser.name = user.name;
            dbUser.note = user.note;
        },
        recoverUser (state, id) {
            const user = findUser(state, id);
            user.isDeleted = false;
        }
    }
});
export default store;