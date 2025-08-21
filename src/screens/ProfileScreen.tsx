import React from 'react';
import { View, Button, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

export const ProfileScreen = () => {
  const { control, handleSubmit } = useForm({ defaultValues: { name: '', email: '' } });
  const onSubmit = (data: any) => console.log(data);

  return (
    <View style={{ flex:1, padding:20 }}>
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange } }) => (
          <TextInput placeholder="Name" value={value} onChangeText={onChange} style={{ borderWidth:1, marginBottom:10, padding:10 }} />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <TextInput placeholder="Email" value={value} onChangeText={onChange} style={{ borderWidth:1, marginBottom:10, padding:10 }} />
        )}
      />
      <Button title="Save Profile" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
