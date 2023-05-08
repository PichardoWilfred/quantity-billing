import { createStore } from "vuex";

const store = createStore({
    state:  {
        search: '',
        lists: [
            {
                id: 1,
                label: { value: 'Lista #1', editing: false },
                items: [
                    { quantity: 0, editing: false },
                ],
            },
            {
                id: 2,
                label: { value: 'Lista #2', editing: false },
                items: [
                    { quantity: 0, editing: false },
                ],
            },
        ],
        selected_list: {
            id: 1,
            label: { value: 'Lista #1', editing: false },
            items: [
                { quantity: 0, editing: false },
            ],
        },
    },
    getters: {
        lists(state) {
            if (state.search.length) {
                return state.lists.filter( list => list.label.startsWith(state.search) );
            }else {            
                return state.lists;
            }
        },
        selected_list: ({ selected_list }) => selected_list
    },
    mutations: {
        select_list(state, payload) {
            state.selected_list = payload;
        }
    },
    actions: {
        select_list({_, commit}, payload) {
            commit('select_list', payload);
        },
        add_list({ state }){
            const list_id = state.lists.length + 1;
            const list = {
                id: list_id,
                label: { value: `Lista #${list_id}`, editing: false },
                items: [
                    ,
                ],
            }
            state.lists.push(list);
        },
        add_item({ state },payload){
            state.selected_list.items.push({quantity: payload.new_value, editing: false});
        }
    }
});

export default store;