/**
 * Story Engine
 * Manages scenes, choices, and narrative flow
 */

class Scene {
  constructor(id, content, options = {}) {
    this.id = id;
    this.content = content; // Text content of the scene
    this.choices = options.choices || [];
    this.onEnter = options.onEnter;
    this.onExit = options.onExit;
    this.metadata = options.metadata || {};
  }

  addChoice(choiceId, text, nextSceneId, condition = null) {
    this.choices.push({
      id: choiceId,
      text,
      nextSceneId,
      condition, // Function to check if choice is available
    });
    return this;
  }

  getAvailableChoices(gameState) {
    return this.choices.filter(choice => {
      if (choice.condition) {
        return choice.condition(gameState);
      }
      return true;
    });
  }
}

class StoryEngine {
  constructor(options = {}) {
    this.scenes = new Map();
    this.currentSceneId = null;
    this.history = [];
    this.onSceneChange = options.onSceneChange;
    this.onChoiceMade = options.onChoiceMade;
  }

  registerScene(scene) {
    if (!(scene instanceof Scene)) {
      throw new Error('registerScene requires a Scene instance');
    }
    this.scenes.set(scene.id, scene);
    return this;
  }

  createScene(id, content, options = {}) {
    const scene = new Scene(id, content, options);
    this.registerScene(scene);
    return scene;
  }

  goToScene(sceneId, gameState) {
    if (!this.scenes.has(sceneId)) {
      throw new Error(`Scene '${sceneId}' not found`);
    }

    const previousSceneId = this.currentSceneId;
    const newScene = this.scenes.get(sceneId);

    // Call exit hook on previous scene
    if (previousSceneId) {
      const previousScene = this.scenes.get(previousSceneId);
      if (previousScene.onExit) {
        previousScene.onExit(gameState);
      }
    }

    // Call enter hook on new scene
    if (newScene.onEnter) {
      newScene.onEnter(gameState);
    }

    this.currentSceneId = sceneId;
    this.history.push(sceneId);

    if (this.onSceneChange) {
      this.onSceneChange({
        previousSceneId,
        newSceneId: sceneId,
        scene: newScene,
      });
    }

    return newScene;
  }

  getCurrentScene() {
    if (!this.currentSceneId) {
      return null;
    }
    return this.scenes.get(this.currentSceneId);
  }

  makeChoice(choiceId, gameState) {
    const scene = this.getCurrentScene();
    if (!scene) {
      throw new Error('No current scene');
    }

    const choice = scene.choices.find(c => c.id === choiceId);
    if (!choice) {
      throw new Error(`Choice '${choiceId}' not found in current scene`);
    }

    if (this.onChoiceMade) {
      this.onChoiceMade({
        sceneId: this.currentSceneId,
        choiceId,
        choiceText: choice.text,
        nextSceneId: choice.nextSceneId,
      });
    }

    return this.goToScene(choice.nextSceneId, gameState);
  }

  getHistory() {
    return [...this.history];
  }

  reset() {
    this.currentSceneId = null;
    this.history = [];
  }
}

export { Scene, StoryEngine };
