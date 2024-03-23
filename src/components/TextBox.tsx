import {Input} from '@rneui/themed';
import React, {ComponentProps, ComponentPropsWithoutRef} from 'react';
import colors from '../constant/Colors';
import {TextInput} from 'react-native';

interface ITextBoxProps extends ComponentProps<typeof TextInput> {
  placeholder?: string;
  value: any;
}

const TextBox = ({placeholder = '', value, ...props}: ITextBoxProps) => {
  return (
    <>
      <Input
        placeholder={placeholder}
        inputStyle={{
          backgroundColor: colors.lightGray,
          paddingHorizontal: 16,
          paddingVertical: 14,
          borderRadius: 10,
        }}
        inputContainerStyle={{
          borderColor: 'transparent',
        }}
        value={value}
        {...props}
      />
    </>
  );
};

export default TextBox;
