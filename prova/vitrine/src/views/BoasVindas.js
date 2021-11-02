import React, { useLayoutEffect } from 'react';
import { StatusBar, StyleSheet, View, Text, TouchableHighlight } from 'react-native';

const BoasVindas = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFF"
            />
            <View style={styles.body}>
                <View style={styles.body}>
                    <Text style={styles.titulo}>Katarine</Text> 
                    <Text style={styles.subtitulo}>Bezerra de Albuquerque</Text>                   
                </View>

                <View style={styles.bodyView}>
                    <Text style={styles.subtitulo}>Prova</Text>
                    <Text style={styles.descricao}>React Native</Text>                    
                </View>

                <View style={styles.bodyView}>
                    <Text style={styles.subtitulo}>Descrição</Text>
                    <Text style={styles.descricao}>Node JS</Text>
                    <Text style={styles.descricao}>Banco de Dados MySql</Text>
                </View>

                <View style={styles.bodyView}>
                    <Text style={styles.subtitulo}>Sobre</Text>
                    <Text style={styles.descricao}>kba.2879@gmail.com</Text>
                    <Text style={styles.descricao}>Rio de Janeiro - RJ</Text>                    
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableHighlight
                    style={styles.botaoAcesso}
                    onPress={() => navigation.navigate("Login")}
                    underlayColor={'transparent'}
                >
                    <Text style={styles.botaoTextoAcesso}>Acessar</Text>
                </TouchableHighlight>
                <Text style={styles.descricao}>kba@2021</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    body: {
        width: '100%',
        flex: 4,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    bodyView: {
        width: '90%',
        flex: 3,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FF0000',
        marginVertical: 5
    },
    footer: {
        width: '100%',
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    botaoAcesso: {
        width: 120,
        height: 35,
        backgroundColor: '#FF0000',
        borderRadius: 5,
        marginBottom:3 
    },
    botaoTextoAcesso: {
        fontSize: 18,
        fontWeight: '900',
        color: '#FFF',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingTop: 5,
        textTransform: 'uppercase'        
    },
    titulo: {
        color: '#FF0000',
        fontSize: 35,
        textAlign: 'center',
        fontWeight: '900',
        letterSpacing:2
    },
    subtitulo: {
        color: '#FF0000',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: '900',
        letterSpacing:2
    },
    descricao: {
        color: '#FF0000',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: '700',
        letterSpacing:2
    }
});

export default BoasVindas;

