import axios from 'axios';
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableHighlight, View, Image, ScrollView, StatusBar } from 'react-native';
import URL_IMAGEM from '../urls/url_imagem';
import URL_SERVIDOR from '../urls/url_servidor';

const Home = ({ navigation, route }) => {

    const [id] = useState(route.params.id);

    const [dados, setDados] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, [navigation]);

    useEffect(() => {
        navigation.addListener('beforeRemove', e => {
            e.preventDefault();
            Alert.alert('Atenção!', 'Deseja sair da aplicação?', [
                { text: 'No', onPress: () => { }, style: 'cancel' },
                { text: 'Yes', onPress: () => navigation.dispatch(e.data.action), style: 'destructive' }],
            );
        });
        listarVeiculos();

    }, [navigation]);

    const atualizarLista = () => {
        return listarVeiculos();
    }

    const listarVeiculos = async () => {
        const headers = {
            'method': 'GET',
        }

        try{
            let response = await fetch(URL_SERVIDOR + '/listar-veiculo/' + id, headers);

            let json = await response.json();

            setDados(json);
            
        } catch(err) {
            setDados([]);
        }
            
        
    }

    const excluirVeiculo = async (idParam) => {

        await axios.delete(URL_SERVIDOR + '/excluir-veiculo/' + idParam)
            .then((response) => {
                if (response) {
                    Alert.alert('Excluir:', 'Deseja realmente excluir o veículo?', [
                        { text: 'No', onPress: () => { }, style: 'cancel' },
                        { text: 'Yes', style: 'destructive', onPress: () => { Alert.alert('Veículo Excluído!'); } }
                    ]);
                } else {
                    Alert.alert('Veículo não excluído!');
                }
            })
            .catch((err) => {
                Alert.alert('"Erro: ' + err);
            });
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFF"
            />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Veículos</Text>
                <TouchableHighlight style={styles.headerBotao}
                    underlayColor={'transparent'}
                    onPress={() => atualizarLista()}>
                    <Text style={styles.headerTextBotaoAtualizar}>Atualizar</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.headerBotao}
                    underlayColor={'transparent'}
                    onPress={() => navigation.navigate('CadastrarVeiculos', { id: `${id}` })}>
                    <Text style={styles.headerTextBotao}>Cadastrar</Text>
                </TouchableHighlight>
            </View>

            <ScrollView style={styles.scrollView} vertical={true} horizontal={false}>
                <View style={styles.body}>
                    {
                        dados.map((item) => {

                            const urlImage = URL_IMAGEM + `${item.foto}`;
                            if(id === item.usuario_id) {
                                return (
                                    <View style={styles.viewLista} key={item.id}>
                                        <View style={styles.viewImagemLista}>
                                            <Image source={{ uri: urlImage }} style={styles.imagemVeiculo} />
                                        </View>
                                        <Text style={styles.textoNome}>{item.nome}</Text>
                                        <Text style={styles.textoMarca}>{item.marca}</Text>
                                        <Text style={styles.textoModelo}>{item.modelo}</Text>
                                        <View style={styles.bodyView}>
                                            <TouchableHighlight style={styles.bodyBotao}
                                                underlayColor={'transparent'}
                                                onPress={() => navigation.navigate('EditarVeiculos', { id: `${item.id}`, idUsuario: `${id}`, nome: `${item.nome}`, marca: `${item.marca}`, modelo: `${item.modelo}` })}>
                                                <Text style={styles.bodyTextBotao}>Editar</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight style={styles.bodyBotao}
                                                underlayColor={'transparent'}
                                                onPress={() => { excluirVeiculo(item.id) }}>
                                                <Text style={styles.bodyTextBotao}>Excluir</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                )
                            } else{
                                return(<View style={styles.body}></View>)
                            }                            
                        })}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.footerTexto}>Kba@2021</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    headerTitle: {
        width: 100,
        color: '#FF0000',
        fontSize: 20,
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    headerBotao: {
        backgroundColor: '#FFF',
        padding: 5,
        borderRadius: 10
    },
    headerTextBotao: {
        width: 110,
        color: '#FF0000',
        fontSize: 15,
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    headerTextBotaoAtualizar: {
        width: 110,
        color: '#FF0000',
        fontSize: 15,
        fontWeight: '700',
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    header: {
        height: 50,
        paddingHorizontal: 24,
        backgroundColor: '#FFF',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    body: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 25,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FF7F50'
    },
    scrollView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FF7F50'
    },
    footer: {
        height: 30,
        paddingHorizontal: 24,
        backgroundColor: '#FFF',
        justifyContent: 'center'
    },
    footerTexto: {
        color: '#FF0000',
        fontSize: 16,
        fontWeight: '900',
        textAlign: 'center'
    },
    imagemVeiculo: {
        width: 170,
        height: 80,
        marginLeft: 10,
        marginTop: 5
    },
    viewLista: {
        width: 300,
        height: 200,
        marginBottom: 10,
        paddingHorizontal: 2,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#FF0000',
        backgroundColor: '#FFF',
        justifyContent: 'center',
    },
    viewImagemLista: {
        alignItems: 'center'
    },
    textoNome: {
        fontSize: 18,
        fontWeight: '900',
        color: '#FF0000',
        marginLeft: 10,
        textTransform: 'uppercase'
    },
    textoMarca: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF0000',
        marginLeft: 10
    },
    textoModelo: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
        marginLeft: 10
    },
    bodyBotao: {
        width: 70,
        height: 22,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FF0000',
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop: 5
    },
    bodyTextBotao: {
        width: '100%',
        height: '100%',
        fontSize: 14,
        fontWeight: '700',
        color: '#FF0000',
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    bodyView: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Home;
