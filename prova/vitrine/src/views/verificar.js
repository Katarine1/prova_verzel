import React, { useState } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import URL_SERVIDOR from '../urls/url_servidor';

const Verificar = ({ navigation }) => {

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const onListar = async () => {

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

        let response = await fetch(URL_SERVIDOR + '/listar', headers);

        let json = await response.json();
        //console.log(json[0])

        if (!json[0]) {
            Alert.alert("Dados Incorretos!");
        } else {
            setId(json[0].id);
            setNome(json[0].nome);
            setEmail(json[0].email);
            setSenha(json[0].senha);
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
                <Text style={styles.textoTopo}>Pesquise para editar os dados.{'\n\n'}</Text>
            </View>

            <View style={styles.dados}>
                <View style={styles.formulario}>
                    <TextInput
                        name="id"
                        style={styles.input}
                        placeholderTextColor="#000"
                        editable={false}
                        value={`${id}`}
                        style={{ display: 'none' }}
                    />

                    <TextInput
                        name="nome"
                        style={styles.input}
                        placeholder="Nome"
                        placeholderTextColor="#000"
                        onChangeText={(nome) => setNome(nome)}
                        style={{ display: 'none' }}
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
                        onPress={() => onListar()}>
                        <Text style={styles.textBotao}>Pesquisar</Text>
                    </TouchableHighlight>

                </View>

                <View style={styles.viewTopo}>
                    <TouchableHighlight
                        style={styles.botaoTopo}
                        onPress={() => { navigation.navigate('EditarUsuario', { id: `${id}`, nome: nome, email: email, senha: senha }) }}
                        underlayColor={'transparent'}
                    >
                        <View style={styles.botaoEditar}>
                            <Text style={styles.txt}>{`${nome}`}</Text>
                            <Text style={styles.txtBotao}>Editar</Text>
                        </View>
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
    dados: {
        height: 230,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formulario: {
        width: '100%',
        height: 230,
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    botaoTopo: {
        width: '100%',
        height: 40,
        marginHorizontal: 5,
        backgroundColor: '#FFF',
        borderRadius: 5,
        paddingHorizontal: 5
    },
    textoTopo: {
        width: 'auto',
        color: '#FF0000',
        fontWeight: '700',
        fontSize: 18,
        paddingHorizontal: 2,
        paddingVertical: 1,
        textAlign: 'center'
    },
    textoEdite: {
        height: 50
    },
    txt: {
        width: '100%',
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginBottom: 5,
        borderBottomColor: '#FF0000',
        borderBottomWidth: 1,
    },
    txtBotao: {
        width: '100%',
        fontSize: 18,
        fontWeight: '900',
        textTransform: 'uppercase',
        color: '#FFF',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginVertical: 5,
        backgroundColor: '#FF0000',
    },
    botaoEditar: {
        width: '100%',
        height: 55,
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

export default Verificar;