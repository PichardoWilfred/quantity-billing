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
            }            
                return state.lists;
        },
        selected_list: ({ selected_list }) => selected_list
    },
    mutations: {
        SELECT_LIST(state, payload) {
            state.selected_list = payload;
        },
        SET_LIST(state, lists) {
            state.lists = lists
        }
    },
    actions: {
        select_list({_, commit}, payload) {
            commit('SELECT_LIST', payload);
        },
        add_list({ state, commit, dispatch }) {
            const wasEmpty = !state.lists.length;
            let list_id = state.lists.length + 1; // revisar que no esté ninguna id registrada con el mismo valor
            let amount = 0;
            const checkRepeated = () => {
                const already = state.lists.find((list)=> list.id === (list_id + amount));
                if (already) {
                    amount += 1;
                    notRepeated();
                }else {
                    list_id += amount;
                    return;
                }
            };
            checkRepeated();
            const list = {
                id: list_id,
                label: { value: `Lista #${list_id}`, editing: false },
                items: [ ],
            }
            state.lists.push(list);
            if (wasEmpty) dispatch('select_list', list);
        },
        add_item({ state }, payload) {
            state.selected_list.items.push({quantity: payload.new_value, editing: false});
        },
        remove_list({state, commit, dispatch}, id) {
            const lists = state.lists.filter((element) => id !== element.id); // has all the items select the one selected!!
            commit('SET_LIST', lists);

            if (!state.lists.length) {
                dispatch('select_list', {});
                return;
            }
            // select the new list next to the one that was deleted or simply the first we find on the array.
            const nextTo = (direction) => state.lists.find((element) => element.id === id + direction) 
            const selected_list = nextTo(1) || nextTo(-1) || state.lists[0];
            dispatch('select_list', selected_list);
        }
    }
});

export default store;