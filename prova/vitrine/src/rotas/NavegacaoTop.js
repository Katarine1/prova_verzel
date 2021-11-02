import React from 'react';
import { StyleSheet, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './../views/Login';
import Home from '../views/Home';
import CadastrarUsuario from '../views/CadastrarUsuario';
import EditarUsuario from '../views/EditarUsuario';
import Verificar from '../views/verificar';
import CadastrarVeiculos from '../views/CadastrarVeiculos';
import EditarVeiculos from '../views/EditarVeiculos';
import BoasVindas from '../views/BoasVindas';

const NavegacaoTop = ({ navigation }) => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="BoasVindas">
                <Stack.Screen
                    name="BoasVindas"
                    component={BoasVindas}
                    options={({
                        title: '',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#FF0000',
                        },
                        headerTitleStyle: {
                            height: 70,
                            alignItems: 'center',
                            color: '#FFF',
                            fontWeight: '700'
                        },
                        headerTintColor: '#fff',
                    })}
                />
                <Stack.Screen
                    name="Pesquisar"
                    component={Verificar}
                    options={({
                        title: 'Pesquisar',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#FF0000',
                        },
                        headerTitleStyle: {
                            height: 70,
                            alignItems: 'center',
                            color: '#FFF',
                            fontWeight: '700'
                        },
                        headerTintColor: '#fff',
                    })}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={({
                        title: 'Login',
                        headerTitleAlign: 'left',
                        headerStyle: {
                            backgroundColor: '#FF0000',
                        },
                        headerTitleStyle: {
                            height: 70,
                            alignItems: 'center',
                            color: '#FFF',
                            fontWeight: '700'
                        },
                        headerTintColor: '#fff',
                    })}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={({
                        title: 'Home',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#FFF',
                        },
                        headerTitleStyle: {
                            height: 70,
                            alignItems: 'center'
                        },
                        headerTintColor: '#FFF',
                    })}
                />
                <Stack.Screen
                    name="CadastrarUsuario"
                    component={CadastrarUsuario}
                    options={({
                        title: 'Cadastrar Usuário',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#FF0000',
                        },
                        headerTitleStyle: {
                            height: 70,
                            alignItems: 'center',
                            fontWeight: '700'
                        },
                        headerTintColor: '#fff',
                    })}
                />
                <Stack.Screen
                    name="EditarUsuario"
                    component={EditarUsuario}
                    options={({
                        title: 'Editar Usuário',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#FF0000',
                        },
                        headerTitleStyle: {
                            height: 70,
                            alignItems: 'center',
                            fontWeight: '700'
                        },
                        headerTintColor: '#fff',
                    })}
                />
                <Stack.Screen
                    name="CadastrarVeiculos"
                    component={CadastrarVeiculos}
                    options={({
                        title: 'Cadastrar Veículos',
                        headerTitleAlign: 'left',
                        headerStyle: {
                            backgroundColor: '#FF0000',
                        },
                        headerTitleStyle: {
                            height: 70,
                            alignItems: 'center',
                            fontWeight: '700'
                        },
                        headerTintColor: '#fff',
                    })}
                />
                <Stack.Screen
                    name="EditarVeiculos"
                    component={EditarVeiculos}
                    options={({
                        title: 'Editar Veículos',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#FF0000',
                        },
                        headerTitleStyle: {
                            height: 70,
                            alignItems: 'center'
                        },
                        headerBackTitleStyle: {
                            color: '#FFF'
                        },
                        headerTintColor: '#fff',
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    botaoTopoEditar: {
        width: 'auto',
        marginHorizontal: 5,
        marginVertical: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        paddingHorizontal: 5
    },
    textoTopoEditar: {
        color: '#FF0000',
        fontWeight: '900',
        fontSize: 16,
        paddingHorizontal: 2,
        paddingVertical: 2,
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    imgIcon: {
        width: 35,
        height: 35
    }
});

export default NavegacaoTop;