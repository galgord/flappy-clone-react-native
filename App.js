import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngineRef, setGameEngineRef] = useState(null);
  const [score, setScore] = useState(0);
  useEffect(() => {
    setRunning(true);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>{score}</Text>
      <GameEngine
        ref={(ref) => {
          setGameEngineRef(ref);
        }}
        systems={[Physics]}
        style={styles.gameContainer}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case 'game-over':
              setRunning(false);
              gameEngineRef.stop();
              break;
            case 'add_score':
              setScore(score + 1);
              break;
          }
        }}
        entities={entities()}>
        <StatusBar style='auto' hidden />
      </GameEngine>
      {!running ? (
        <View style={styles.gameMenu}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setRunning(true);
              setScore(0);
              gameEngineRef.swap(entities());
            }}>
            <Text style={styles.btnText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  score: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    margin: 20,
  },
  gameMenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'black',
    paddingHorizontal: 3,
    paddingVertical: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
