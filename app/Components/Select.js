import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import myTheme from '../utils/theme';

const Select = ({onChangeFunction, type}) => {
    const { COLORS, screenHeight, screenWidth, STYLES } = myTheme();
    const styles = useStyles(COLORS);
    const emojisWithIcons = [
        {title: 'Pending'},
        {title: 'In Transit'},
        {title: 'Arrived'},
        {title: 'Delivered'},
        {title: 'Cancelled'},
      ];

  return (
        <SelectDropdown
            data={emojisWithIcons}
            onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
            onChangeFunction(selectedItem.title)
            }}
            renderButton={(selectedItem, isOpened) => {
            return (
                <View style={styles.dropdownButtonStyle}>
                {selectedItem && (
                    <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                )}
                <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) || 'Pending ' + type + ' (Change filter)'}
                </Text>
                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
            );
            }}
            renderItem={(item, index, isSelected) => {
            return (
                <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
            );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
        />
  )
}

export default Select

const useStyles = COLORS => (StyleSheet.create({
    dropdownButtonStyle: {
      width: 'auto',
      height: 40,
      backgroundColor: COLORS.surface,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
      borderColor: COLORS.outline,
      borderWidth: 1,
      marginHorizontal: 5
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 15,
      fontWeight: '500',
      color: COLORS.outline,
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
      color: COLORS.outline
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  }));