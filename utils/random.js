import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getPipeSizePosPair = (addToPosX = 0) => {
  let yPostTop = -getRandom(300, windowHeight - 100);

  const pipeTop = {
    pos: { x: windowWidth + addToPosX, y: yPostTop },
    size: { width: 50, height: windowHeight * 2 },
  };

  const pipeBottom = {
    pos: { x: windowWidth + addToPosX, y: windowHeight * 2 + 200 + yPostTop },
    size: { width: 50, height: windowHeight * 2 },
  };

  return { pipeTop, pipeBottom };
};
