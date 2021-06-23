import {defineStore} from "pinia";

const findUser = (state, id) => state.users.find(x=> x.id === id);
export const useUserStore = defineStore({
    id: "userStore",
    state(){
        const localStorageData = localStorage.getItem('userStoreData');
        if(localStorageData) {
            return JSON.parse(localStorageData);
        }
        return {
          users: []
        };
    },
    getters: {
        availableUsers: state => state.users.filter(x => !x.isDeleted),
        deletedUsers: state => state.users.filter(x => x.isDeleted),
        findUser: findUser
    },
    actions: {
        addUser(user) {
            this.users.push({
                ...user,
                isDeleted: false
            })
        },
        deleteUser(id) {
            const user = findUser(this,id);
            if(!user) throw "User not found";
            user.isDeleted = true;
        },
        updateUser(user) {
            const dbUser = findUser(this,user.id);
            if(!dbUser) throw "User not found";
            dbUser.name = user.name;
            dbUser.note = user.note;
        },
        recoverUser (id) {
            const user = findUser(this, id);
            user.isDeleted = false;
        }
    }
});