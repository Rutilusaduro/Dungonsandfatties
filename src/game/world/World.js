/**
 * World System
 * Manages all zones, their connections, and world state
 */

import Zone from './Zone';
import { buildWorld } from './WorldBuilder.js';

class World {
  constructor(options = {}) {
    this.name = options.name || 'The Realm';
    this.description = options.description || '';
    this.zones = new Map();
    this.currentZoneId = null;
    this.timeOfDay = 'day';
    this.season = 'spring';
  }

  // Register a zone
  addZone(zone) {
    this.zones.set(zone.id, zone);
    return this;
  }

  // Get zone by ID
  getZone(zoneId) {
    return this.zones.get(zoneId);
  }

  // Get current zone
  getCurrentZone() {
    return this.getZone(this.currentZoneId);
  }

  // Set current zone
  setCurrentZone(zoneId) {
    const zone = this.getZone(zoneId);
    if (zone) {
      this.currentZoneId = zoneId;
      zone.explore();
      return zone;
    }
    return null;
  }

  // Get all zones
  getAllZones() {
    return Array.from(this.zones.values());
  }

  // Get zone by name
  getZoneByName(name) {
    for (const zone of this.getAllZones()) {
      if (zone.name.toLowerCase().includes(name.toLowerCase())) {
        return zone;
      }
    }
    return null;
  }

  // Move to adjacent zone
  moveToZone(direction) {
    const currentZone = this.getCurrentZone();
    if (!currentZone) return null;

    const nextZoneId = currentZone.exits[direction];
    if (nextZoneId) {
      return this.setCurrentZone(nextZoneId);
    }
    return null;
  }

  // Create the full explorable world (40 zones, 60+ NPCs).
  static createSampleWorld() {
    return buildWorld();
  }
}

export default World;
