/**
 * Game State Manager
 * Manages overall game state, player data, and world state
 */

class GameState {
  constructor() {
    this.player = null;
    this.currentLocation = null;
    this.inventory = [];
    this.worldState = {};
    this.flags = new Map(); // For quest tracking and game events
    this.listeners = new Map();
  }

  setPlayer(player) {
    this.player = player;
    this.notifyListeners('playerUpdated', player);
  }

  getPlayer() {
    return this.player;
  }

  setLocation(location) {
    this.currentLocation = location;
    this.notifyListeners('locationChanged', location);
  }

  getLocation() {
    return this.currentLocation;
  }

  addToInventory(item) {
    this.inventory.push(item);
    this.notifyListeners('inventoryUpdated', this.inventory);
  }

  removeFromInventory(itemId) {
    this.inventory = this.inventory.filter(item => item.id !== itemId);
    this.notifyListeners('inventoryUpdated', this.inventory);
  }

  getInventory() {
    return [...this.inventory];
  }

  setFlag(key, value) {
    this.flags.set(key, value);
    this.notifyListeners('flagUpdated', { key, value });
  }

  getFlag(key, defaultValue = null) {
    return this.flags.get(key) ?? defaultValue;
  }

  hasFlag(key) {
    return this.flags.has(key);
  }

  setWorldState(key, value) {
    this.worldState[key] = value;
    this.notifyListeners('worldStateUpdated', { key, value });
  }

  getWorldState(key) {
    return this.worldState[key];
  }

  // Event listener system
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  notifyListeners(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  reset() {
    this.player = null;
    this.currentLocation = null;
    this.inventory = [];
    this.worldState = {};
    this.flags.clear();
    this.notifyListeners('gameReset', null);
  }
}

export default GameState;
