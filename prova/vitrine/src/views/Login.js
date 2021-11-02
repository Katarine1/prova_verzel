import React, { useLayoutEffect, useState } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import URL_SERVIDOR from '../urls/url_servidor';

const Login = ({ navigation }) => {
    
    const [nome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableHighlight
                    style={styles.botaoTopoEditar}
                    onPress={() => { navigation.navigate('Pesquisar') }}
                    underlayColor={'transparent'}
                >
                    <Text style={styles.textoTopoEditar}>Editar Dados</Text>
                </TouchableHighlight>
            ),
        });
    }, []);

    const onLogin = async (e) => {
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

        let response = await fetch(URL_SERVIDOR + '/listar', headers)
        
        let json = await response.json();
        //console.log(json[0]);
        
        if (!json[0]) {
           Alert.alert("Dados Incorretos!");
        } else {
            let id = json[0].id;
           navigation.navigate('Home', {id: id, email: email, senha: senha});
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

            <View style={styles.dados}>
                <View style={styles.formulario}>

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
                        onPress={e => onLogin(e)}>
                        <Text style={styles.textBotao}>Entrar</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.botaoTopo}
                        onPress={() => { navigation.navigate('CadastrarUsuario') }}
                        underlayColor={'transparent'}
                    >
                        <Text style={styles.textoCad}>Não tem Cadastro, Clique aqui</Text>
                    </TouchableHighlight>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 32,
        paddingHorizontal: 24,
        height: '100%',
        backgroundColor: '#FFF'
    },
    topo: {
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
    },
    botaoTopoEditar: {
        width: 130,
        marginHorizontal: 5,
        marginVertical: 2,
        backgroundColor: '#FF0000',
        borderRadius: 5,
        paddingHorizontal: 5
    },
    textoTopoEditar: {
        width:'100%',
        height: '100%',
        color: '#FFF',
        fontWeight: '900',
        fontSize: 16,
        paddingHorizontal: 2,
        paddingVertical: 2,
        textTransform: 'uppercase',
        textAlign: 'center'
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
        fontWeight: '700',
    },
    subtitle: {
        color: '#000',
        fontSize: 20,
        textAlign: 'center'
    },
    dados: {
        height: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formulario: {
        width: '100%',
        height: 300,
        flex: 2
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
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 2,
        backgroundColor: '#FF0000',
        height: 40,
    },
    textBotao: {
        width: '100%',
        height: '100%',
        color: '#FFF',
        fontSize: 16,
        fontWeight: '900',
        textTransform: 'uppercase',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    inputEmail: {
        borderColor: '#CCC',
        borderWidth: 1,
        marginTop: 70,
        marginBottom: 5,
        paddingHorizontal: 10,
        height: 45,
        fontSize: 16,
        color: '#000'
    },
    viewTopo: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    botaoTopo: {
        width: '100%',
        marginHorizontal: 5,
        backgroundColor: '#FFF',
        borderRadius: 5,
        paddingHorizontal: 5
    },
    textoTopo: {
        color: '#FF0000',
        fontWeight: '900',
        fontSize: 16,
        paddingHorizontal: 2,
        paddingVertical: 5,
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    textoCad: {
        color: '#FF0000',
        fontWeight: '700',
        fontSize: 16,
        paddingHorizontal: 2,
        paddingVertical: 5,
        textAlign: 'center'
    },
    textoEdite: {
        display: 'flex'
    },
    txt: {
        color: '#000'
    }
});

export default Login;