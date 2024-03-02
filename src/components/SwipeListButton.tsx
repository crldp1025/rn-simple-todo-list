import { Button } from '@rneui/themed'
import React from 'react'
import { StyleSheet } from 'react-native'
import colors from '../constant/Colors'

interface ISwipeListButton {
  icon?: {
    name: string,
    color?: string
  },
  position?: 'left' | 'right',
  btnColor?: string,
  handleOnPress?: (item: any) => void
}

const SwipeListButton = ({
  icon = {
    name: 'info-circle',
    color: colors.white
  },
  position = 'right',
  btnColor = colors.red,
  handleOnPress
}: ISwipeListButton) => {
  return (
    <Button
      icon={icon}
      style={(position === 'right') ? styles.alignRight : styles.alignLeft} 
      buttonStyle={[styles.buttonStyle, {backgroundColor: btnColor}]}
      onPress={handleOnPress}
    />
  )
}

export default SwipeListButton

const styles = StyleSheet.create({
  alignRight: {
    alignSelf: 'flex-end'
  },
  alignLeft: {
    alignSelf: 'flex-start'
  },
  buttonStyle: {
    width: 100,
    minHeight: '100%'
  }
})