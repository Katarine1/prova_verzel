import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableHighlight, StatusBar } from 'react-native';
import URL_SERVIDOR from '../urls/url_servidor';

const EditarUsuario = ({ navigation, route }) => {

    const [id, setId] = useState(route.params.id);
    const [nome, setNome] = useState(route.params.nome);
    const [email, setEmail] = useState(route.params.email);
    const [senha, setSenha] = useState(route.params.senha);

    const onEditar = async (e) => {
        e.preventDefault();

        const objEd = {
            nome: nome,
            email: email,
            senha: senha,
        }

        const headersEd = {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(objEd)
        }

        let responseEd = await fetch(URL_SERVIDOR + '/atual-usuario/' + `${id}`, headersEd);

        let jsonEd = await responseEd.json();
        console.log("Atualizar: " + jsonEd);

        if (!jsonEd) {
            Alert.alert("Dados Incorretos!");

        } else {
            console.log(jsonEd.dados);
            Alert.alert('Usuário Atualizado!')
        }
    }

    const onExcluir = async (e) => {
        e.preventDefault();

        await axios.delete(URL_SERVIDOR + '/excluir-veiculo-usuario/' + `${id}`)
            .then((response) => {
                if (response) {
                    axios.delete(URL_SERVIDOR + '/excluir-usuario/' + `${id}`)
                        .then((response) => {
                            if (response) {
                                Alert.alert('Excluir:', 'Deseja realmente excluir o usuário e seus dados?', [
                                    { text: 'No', onPress: () => { }, style: 'cancel' },
                                    { text: 'Yes', style: 'destructive', onPress: () => { Alert.alert('Usuário Excluído!') } }
                                ]);
                            } else {
                                Alert.alert('Usuário não excluído!');
                            }
                        })
                        .catch((err) => {
                            Alert.alert('"Erro: ' + err);
                        });
                } else {
                    Alert.alert('Usuário não excluído!');
                }
            })
            .catch((err) => {
                Alert.alert('"Erro: ' + err);
            });
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
                    name="id"
                    style={styles.input}
                    placeholder="Id"
                    placeholderTextColor="#000"
                    onChangeText={(idd) => setId(idd)}
                    value={`${id}`}
                    style={{ display: 'none' }}
                />
                <TextInput
                    name="nome"
                    style={styles.input}
                    placeholder="Nome"
                    placeholderTextColor="#000"
                    onChangeText={(nome) => setNome(nome)}
                    value={nome}
                />
                <TextInput
                    name="email"
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder="E-mail"
                    placeholderTextColor="#000"
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                />
                <TextInput
                    name="senha"
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="senha"
                    placeholderTextColor="#000"
                    onChangeText={(senha) => setSenha(senha)}
                    value={senha}
                />
                <View style={styles.acoes}>
                    <TouchableHighlight style={styles.botao}
                        underlayColor={'transparent'}
                        onPress={(e) => onEditar(e)}>
                        <Text style={styles.textBotao}>Atualizar</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.botao}
                        underlayColor={'transparent'}
                        onPress={(e) => onExcluir(e)}>
                        <Text style={styles.textBotao}>Excluir</Text>
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
        width: '48.5%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 2,
        marginHorizontal: 5,
        backgroundColor: '#FF0000',
        height: 45,
    },
    textBotao: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '900',
        textTransform: 'uppercase'
    },
    txt: {
        color: '#000'
    },
    acoes: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EditarUsuario;
