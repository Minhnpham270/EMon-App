import * as React from 'react';

// api
//components
import {
  Box,
  Button,
  Center,
  Checkbox,
  Column,
  FormControl,
  Heading,
  Image,
  Input,
  KeyboardAvoidingView,
  Row,
  Spacer,
  Text,
  useToast,
} from 'native-base';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/redux/store';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Signin'>;

export const SigninScreen: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { loginInfo } = useSelector((state: RootState) => state.auth);
  const [username, onChangeUsername] = React.useState(loginInfo?.username);
  const [password, onChangePassword] = React.useState(loginInfo?.password);
  const [rememberMe, setRememberMe] = React.useState(!!loginInfo?.username);
  const onPressSigninButton = async () => {
    const values = {
      username,
      password,
    };
  };
  const onPressSignupLink = () => {
    props.navigation.navigate('Signup');
  };
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Center width="100%">
        <Box safeArea p="2" py="8" w="90%">
          <Image
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              marginBottom: 20,
            }}
            source={require('../../assets/images/logo.png')}
          ></Image>
          <Heading>Welcome to Lan Anh Mart</Heading>
          <Column space={3} mt="5">
            <FormControl>
              <FormControl.Label>Username/Số điện thoại</FormControl.Label>
              <Input
                value={username}
                onChangeText={onChangeUsername}
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                value={password}
                onChangeText={onChangePassword}
                type="password"
              />
            </FormControl>
            <Row space={3} width="100%">
              <Checkbox
                value=""
                isChecked={rememberMe}
                onChange={setRememberMe}
              >
                Remember me
              </Checkbox>
              <Spacer />
              <Text>Forget Password?</Text>
            </Row>
            <Button onPress={onPressSigninButton} mt="2">
              Sign in
            </Button>
            {/*<Row mt="6" justifyContent="center">*/}
            {/*  <Text>I&apos;m a new user. </Text>*/}
            {/*  <Link onPress={onPressSignupLink}>Sign Up</Link>*/}
            {/*</Row>*/}
          </Column>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  );
};
