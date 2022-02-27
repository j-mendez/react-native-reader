import React from "react"
import { Button, StyleSheet, View } from "react-native"
import Reader from "react-native-reader"

export default function App() {
  const ref = React.createRef<Reader>()

  const onLazyPress = async () => {
    await ref.current!.parseHtml()
  }

  return (
    <View style={styles.container}>
      <Reader url="https://www.abcnews.com" lazy ref={ref} title="Abc News" />
      <Button
        onPress={onLazyPress}
        title="Open Reader"
        color="#841584"
        accessibilityLabel="Open abcnews reader view"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
