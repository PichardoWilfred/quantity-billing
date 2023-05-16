import { createStore } from "vuex";
import { toRaw } from "vue";
const remove_reference = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}
const default_list = {
    id: 1,
    label: 'Lista #1',
    items: [
        { quantity: 0, editing: false },
    ],
}
const fetch_data = (item) => {
    return JSON.parse(localStorage.getItem(item));
}
const send_data = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}
const update_localStorage = (lists, selected_list) => {
    send_data('lists', lists);
    send_data('selected_list', selected_list);
}

const lists = fetch_data('lists') || [default_list];
const selected_list = fetch_data('selected_list') || default_list;

const store = createStore({
    state:  {
        search: '',
        lists,
        selected_list,
    },
    getters: {
        date() {
            const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            const d = new Date();
            return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
        },
        lists(state) {
            if (state.search.length) {
                return state.lists.filter( list => list.label.startsWith(state.search) );
            }            
                return state.lists;
        },
        selected_list: ({ selected_list }) => selected_list,
        total(state){
            let total = 0;
            state.selected_list.items.map((element) => {
                total += (element.quantity || 0) * 1;
            });
            return total;
        },
        box_quantity(state) {
            let box_quantity = 0;
            state.selected_list.items.map((element) => {
                if ((element.quantity * 1) !== 0) {
                    box_quantity += 1;
                };
            });
            return box_quantity;
        },
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
        delete_items({ state, commit, dispatch }, items) {
            let new_items = [...toRaw(state.selected_list.items)].filter( (item, index) => items.indexOf(index) === -1);
            dispatch('update_lists', { field: 'items', data: new_items })
        },
        update_lists({state, commit, dispatch }, payload) {
            const selected_list = remove_reference({...state.selected_list, [payload.field]: payload.data});
            const lists = state.lists.map((list) => {
                if (list.id === selected_list.id) {
                    list[payload.field] = payload.data;
                }
                return list;
            });
            dispatch('select_list', selected_list || state.selected_list);
            commit('SET_LIST', lists || state.lists);
        },
        select_list({state, commit, dispatch}, payload) {
            commit('SELECT_LIST', payload);
            update_localStorage(state.lists, state.selected_list);
        },
        add_list({ state, commit, dispatch }) {
            const wasEmpty = !state.lists.length;
            let list_id = state.lists.length + 1; // revisar que no esté ninguna id registrada con el mismo valor
            let amount = 0;
            const checkRepeated = () => {
                const already = state.lists.find((list)=> list.id === (list_id + amount));
                if (already) {
                    amount += 1;
                    checkRepeated();
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
            update_localStorage(state.lists, state.selected_list);
        },
        add_item({ state,commit, dispatch }, payload) { // payload.new_value
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
        },
        reset({state, commit}) {
            commit('SELECT_LIST', {});
            commit('SET_LIST', [])
            localStorage.clear();
        },
        download(){
            download_app();
        }
    }
});

 //hetting our date
let prompt_event;
window.addEventListener('appinstalled', () => {
    // Esconder la promoción de instalación de la PWA
    // hideInstallPromotion();
    // Limpiar el defferedPrompt para que pueda ser eliminado por el recolector de basura
    prompt_event = null;
    // De manera opcional, enviar el evento de analíticos para indicar una instalación exitosa
    console.log('PWA was installed');
});

// registering service workers
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('./sw.js')
}


window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    prompt_event = e;
    // Update UI to notify the user they can add to home screen
});

function download_app() {
    prompt_event.prompt();
    // Wait for the user to respond to the prompt
    prompt_event.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
            console.log("User accepted the A2HS prompt");
        } else {
            console.log("User dismissed the A2HS prompt");
        }
        prompt_event = null;
    });
}
export default store;