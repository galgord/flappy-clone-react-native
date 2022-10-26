import Matter from 'matter-js';
import { Dimensions } from 'react-native';
import { getPipeSizePosPair } from './utils/random';

const windowWidth = Dimensions.get('window').width;
const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);

  for (let index = 1; index <= 2; index++) {
    if (entities[`ObstacleTop1`].passed && entities[`ObstacleTop2`].passed) {
      entities[`ObstacleTop${index}`].passed = false;
    }
    if (
      entities[`ObstacleTop${index}`].body.position.x <= 50 &&
      !entities[`ObstacleTop${index}`].passed
    ) {
      entities[`ObstacleTop${index}`].passed = true;
      dispatch({ type: 'add_score' });
    }

    if (entities[`ObstacleTop${index}`].body.position.x <= 0) {
      const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
      Matter.Body.setPosition(
        entities[`ObstacleTop${index}`].body,
        pipeSizePos.pipeTop.pos
      );
      Matter.Body.setPosition(
        entities[`ObstacleBottom${index}`].body,
        pipeSizePos.pipeBottom.pos
      );
    }

    Matter.Body.translate(entities[`ObstacleTop${index}`].body, {
      x: -4,
      y: 0,
    });
    Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {
      x: -4,
      y: 0,
    });
  }
  touches
    .filter((t) => t.type === 'press')
    .forEach((t) => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -5,
      });
    });

  Matter.Events.on(engine, 'collisionStart', (event) => {
    dispatch({ type: 'game-over' });
  });
  return entities;
};

export default Physics;
