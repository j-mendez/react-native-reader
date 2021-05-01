import React from "react"
import { StyleSheet, View } from "react-native"
import Reader from "react-native-reader"

export default function App() {
  return (
    <View style={styles.container}>
      <Reader url="https://www.nytimes.com" title="The Earth is Flat" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
