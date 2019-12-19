import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Counter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count)
  countRef.current = count

  useEffect(() => {
    const id = setInterval(() => {
      if (countRef.current < 20) { // ✅ This doesn't depend on `count` variable outside
        setCount(c => c + 1); // ✅ This doesn't depend on `count` variable outside
      } else {
        setCount(0)
      }
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ Our effect doesn't use any variables in the component scope

  return <Text style={styles.count}>{count}</Text>;
}

export default function App() {

  return (
    <View style={styles.container}>
      <Counter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 30,
  }
});
