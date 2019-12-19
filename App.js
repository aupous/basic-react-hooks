import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useInterval } from "./src/utils/useInterval";

function Counter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  countRef.current = count;

  useEffect(() => {
    const id = setInterval(() => {
      if (countRef.current < 20) {
        // ✅ This doesn't depend on `count` variable outside
        setCount(c => c + 1); // ✅ This doesn't depend on `count` variable outside
      } else {
        setCount(0);
      }
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ Our effect doesn't use any variables in the component scope

  return <Text style={styles.count}>{count}</Text>;
}

export default function App() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [active, setActive] = useState(true);

  useInterval(
    () => {
      // Your custom logic here
      setCount(count + 1);
    },
    delay,
    active
  );

  function startInterval() {
    setActive(true);
  }

  function clearInterval() {
    setActive(false);
  }

  function handleDelayChange(text) {
    setDelay(parseInt(text, 10));
  }

  return (
    <View style={styles.container}>
      <View flex={1} style={styles.subContainer}>
        <Counter />
      </View>
      <View flex={2} style={styles.subContainer}>
        <Text>Timer with custom hook</Text>
        <Text>{count}</Text>
        <TextInput
          style={styles.textInput}
          value={delay.toString()}
          onChangeText={handleDelayChange}
        />
        <Button onPress={startInterval} title="Start" />
        <Button onPress={clearInterval} title="Stop" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  subContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    width: 80,
    height: 30,
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5,
    marginTop: 5,
    backgroundColor: "#fff"
  },
  count: {
    fontSize: 30
  }
});
