import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableHighlight, StatusBar } from 'react-native';
import URL_SERVIDOR from '../urls/url_servidor';

const CadastrarUsuario = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const onCadastro = async (e) => {
        e.preventDefault();

        const obj = {
            nome: nome,
            email: email,
            senha: senha
        }

        const headers = {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(obj)
        }

        let response = await fetch(URL_SERVIDOR + '/salvar-usuario', headers);

        let json = await response.json();

        if (json) {
            Alert.alert("Usuário Salvo!");
        } else {
            Alert.alert("Usuário não Salvo!");
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#FF7F50"
            />
            <View style={styles.header}>
                <Text style={styles.title}>Vitrine</Text>
                <Text style={styles.subtitle}>Veículos</Text>
            </View>
            <View style={styles.formulario}>
                <TextInput
                    name="nome"
                    style={styles.input}
                    placeholder="Nome"
                    placeholderTextColor="#000"
                    onChangeText={(nome) => setNome(nome)}
                />
                <TextInput
                    name="email"
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder="E-mail"
                    placeholderTextColor="#000"
                    onChangeText={(email) => setEmail(email)}
                />
                <TextInput
                    name="senha"
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="senha"
                    placeholderTextColor="#000"
                    onChangeText={(senha) => setSenha(senha)}
                />
                <TouchableHighlight style={styles.botao}
                    underlayColor={'transparent'}
                    onPress={e => onCadastro(e)}>
                    <Text style={styles.textBotao}>Salvar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 32,
        paddingHorizontal: 24,
        flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#FF0000',
        fontSize: 35,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '700'
    },
    subtitle: {
        color: '#000',
        fontSize: 20,
        textAlign: 'center'
    },
    formulario: {
        height: 200
    },
    input: {
        borderColor: '#FF0000',
        borderWidth: 1,
        marginVertical: 2,
        paddingHorizontal: 10,
        height: 45,
        fontSize: 16,
        color: '#000'
    },
    botao: {
        width: '100%',
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 2,
        backgroundColor: '#FF0000',
        height: 45,
    },
    textBotao: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '900',
        textTransform: 'uppercase'
    },
});

export default CadastrarUsuario;
