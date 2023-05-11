import { createStore } from "vuex";
const remove_reference = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}
const store = createStore({
    state:  {
        search: '',
        lists: [
            {
                id: 1,
                label: 'Lista #1',
                items: [
                    { quantity: 0, editing: false },
                ],
            },
            {
                id: 2,
                label: 'Lista #2',
                items: [
                    { quantity: 0, editing: false },
                ],
            },
        ],
        selected_list: {
            id: 1,
            label: 'Lista #1',
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
            state.lists = lists;
        },
    },
    actions: {
        change_label({ state, commit, dispatch }, label) {
            dispatch('update_lists', { field: 'label', data: label })
        },
        delete_items({ state, commit, dispatch }, items){
            let new_items = remove_reference(state.selected_list.items);
            items.map((item) => {
                new_items.splice(item, 1)
            })
            dispatch('update_lists', { field: 'items', data: new_items })
        },
        update_lists({state, commit, dispatch }, payload) {
            const selected_list = remove_reference({...state.selected_list, [payload.field]: payload.data});
            const lists = state.lists.map((list) => {
                if (list.id === selected_list.id) {
                    list[payload.field] = payload.data;
                }
                return list;
            })
            dispatch('select_list', selected_list || state.selected_list);
            commit('SET_LIST', lists || state.lists);
        },
        select_list({state, commit, dispatch}, payload) {
            // dispatch('update_lists', { field: 'items', data: state.selected_list.items })
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
                label: `Lista #${list_id}`,
                items: [ ],
            }
            state.lists.push(list);
            if (wasEmpty) dispatch('select_list', list);
        },
        add_item({ state,commit, dispatch }, payload) {
            // payload.new_value
            const new_items = state.selected_list.items;
            new_items.push({ quantity: payload.new_value, editing: false });
            dispatch('update_lists', { field: 'items', data: new_items });
        },
        remove_list({state, commit, dispatch}, id) {
            const lists = state.lists.filter((element) => id !== element.id); // has all the items select the one selected!!
            commit('SET_LIST', lists);

            if (!state.lists.length) {
                dispatch('select_list', {});
                return;
            }
            // select the new list next to the one that was deleted or simply the first we find on the array.
            const nextTo = (direction) => state.lists.find((element) => element.id === id + direction);
            const selected_list = nextTo(1) || nextTo(-1) || state.lists[0];
            dispatch('select_list', selected_list);
        }
    }
});

export default store;