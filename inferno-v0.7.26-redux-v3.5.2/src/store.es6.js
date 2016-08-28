'use strict';

import { combineReducers, createStore } from 'redux'

function _random(max) {
    return Math.round(Math.random()*1000)%max;
}

const BUILD_DATA = 'BUILD_DATA';
const DELETE = 'DELETE';
const RUN = 'RUN';
const ADD = 'ADD';
const UPDATE = 'UPDATE';
const SELECT = 'SELECT';
const RUN_LOTS = 'RUN_LOTS';
const CLEAR = 'CLEAR';
const SWAP_ROWS = 'SWAP_ROWS';

export function buildData() {
  return {
    type: BUILD_DATA
  };
}

export function remove(id) {
  return {
    type: DELETE,
    id
  };
}

export function run() {
  return {
    type: RUN
  };
}

export function add() {
  return {
    type: ADD
  };
}

export function update() {
  return {
    type: UPDATE
  }
}

export function select(id) {
  return {
    type: SELECT,
    id
  };
}

export function runLots() {
  return {
    type: RUN_LOTS
  };
}

export function clear() {
  return {
    type: CLEAR
  };
}

export function swapRows() {
  return {
    type: SWAP_ROWS
  }
}

class Store {
    constructor(data = [], selected = undefined, id = 1) {
        this.data = data;
        this.selected = selected;
        this.id = id;
    }
    buildData(count = 1000) {
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++)
            data.push({id: this.id++, label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)] });
        return data;
    }
    updateData(mod = 10) {
        for (let i=0;i<this.data.length;i+=10) {
            this.data[i] = Object.assign({}, this.data[i], {label: this.data[i].label + ' !!!'});
        }
    }
    delete(id) {
        const idx = this.data.findIndex(d => d.id==id);
        this.data = this.data.filter((e,i) => i!=idx);
        return this;
    }
    run() {
        this.data = this.buildData();
        this.selected = undefined;
    }
    add() {
        this.data = this.data.concat(this.buildData(1000));
    }
    update() {
        this.updateData();
    }
    select(id) {
        this.selected = id;
    }
    runLots() {
        this.data = this.buildData(10000);
        this.selected = undefined;
    }
    clear() {
        this.data = [];
        this.selected = undefined;
    }
    swapRows() {
        if(this.data.length > 10) {
            var a = this.data[4];
            this.data[4] = this.data[9];
            this.data[9] = a;
        }
    }
}

function dataStore(state = new Store(), action) {
  let needCopy = false;
  switch (action.type) {
    case BUILD_DATA:
      state.buildData(action.count);
      break;
    case DELETE:
      state.delete(action.id);
      break;
    case RUN:
      state.run();
      break;
    case ADD:
      state.add();
      break;
    case UPDATE:
      state.update();
      needCopy = true;
      break;
    case SELECT:
      state.select(action.id);
      break;
    case RUN_LOTS:
      state.runLots();
      break;
    case CLEAR:
      state.clear();
      break;
    case SWAP_ROWS:
      state.swapRows();
      needCopy = true;
      break;
    default:
      break;
  }

  return new Store(needCopy ? state.data.slice(0) : state.data, state.selected, state.id);
}

export default createStore(combineReducers({
  store: dataStore
}))
