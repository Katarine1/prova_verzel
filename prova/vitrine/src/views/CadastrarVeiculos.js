import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight, View, Image, Text, TextInput, Alert, StatusBar } from 'react-native';
import URL_SERVIDOR from '../urls/url_servidor';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const CadastrarVeiculos = ({ navigation, route }) => {

    const [id] = useState(route.params.id);

    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [foto, setFoto] = useState('');
    const [usuarioId, setUsuarioId] = useState('');

    const createFormData = (foto) => {
        setUsuarioId(`${id}`);

        const formData = new FormData();
        formData.append('mynome', nome);
        formData.append('mymarca', marca);
        formData.append('mymodelo', modelo);
        formData.append('myfile', {
            name: foto.fileName,
            type: foto.type,
            uri: foto.uri,
        });
        formData.append('myusuario_id', usuarioId);

        return formData;
    }

    const abrirFoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
            if (response) {
                setFoto(response.assets[0]);
                //console.log(response.assets[0])
            } else if (response.didCancel) {
                Alert.alert('Processo Cancelado!');
            } else if (response.errorCode) {
                Alert.alert('Imagem com Erro!');
            } else if (response.errorMessage) {
                console.log('Erro: ' + errorMessage);
            }
        });
    }

    const onCadastro = async (e) => {
        e.preventDefault();

        const data = createFormData(foto);

        const headers = {
            'headers': {
                'enc-type': 'multipart/form-data',
                'Accept': 'application/json'
            },
        }

        await axios.post(URL_SERVIDOR + '/salvar-veiculo', data, headers)
            .then(response => {
                if (response) {
                    Alert.alert("Veículo Salvo!");
                } else {
                    Alert.alert("Veículo não Salvo!");
                }
            })
            .catch(err => {
                console.log("ERRO: " + err);
                Alert.alert("ERRO: " + err);
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
                    name="nome"
                    style={styles.input}
                    placeholder="Nome"
                    placeholderTextColor="#000"
                    onChangeText={(nome) => setNome(nome)}
                />
                <TextInput
                    name="marca"
                    style={styles.input}
                    placeholder="Marca"
                    placeholderTextColor="#000"
                    onChangeText={(marca) => setMarca(marca)}
                />
                <TextInput
                    name="modelo"
                    style={styles.input}
                    placeholder="Modelo"
                    placeholderTextColor="#000"
                    onChangeText={(modelo) => setModelo(modelo)}
                />
                <TextInput
                    name="usuario_id"
                    style={styles.input}
                    placeholder="Id Usuário"
                    placeholderTextColor="#000"
                    onChangeText={(idusuario) => setUsuarioId(idusuario)}
                    value={`${id}`}
                    style={{ display: 'none' }}
                />

                {foto ? (<Image name="file" source={{ uri: foto.uri }} style={styles.foto} />) : <Text style={styles.textoSelImagem}>Clique em escolha uma foto:</Text>}

                <View style={styles.ViewBotoesAcao}>
                    <TouchableHighlight style={styles.botaoAcao}
                        underlayColor={'transparent'}
                        onPress={() => { abrirFoto() }}
                    >
                        <Text style={styles.textBotao}>Selecionar Foto</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.botaoAcao}
                        underlayColor={'transparent'}
                        onPress={e => onCadastro(e)}>
                        <Text style={styles.textBotao}>Salvar</Text>
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
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 2,
        backgroundColor: '#FF0000',
        height: 45,
    },
    textBotao: {
        width: '100%',
        height: '100%',
        color: '#FFF',
        fontSize: 15,
        fontWeight: '900',
        textTransform: 'uppercase',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    foto: {
        width: 150,
        height: 90,
        alignSelf: 'center'
    },
    ViewBotoesAcao: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    botaoAcao: {
        width: '48.5%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 2,
        marginHorizontal: 5,
        backgroundColor: '#FF0000',
        height: 45,
    },
    botaoLink: {
        width: 'auto',
        backgroundColor: '#FFF',
        alignItems: 'center',
        marginVertical: 5
    },
    textLink: {
        color: '#FF0000',
        fontSize: 15,
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    textoSelImagem: {
        color: '#000',
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 5
    }
});

export default CadastrarVeiculos;