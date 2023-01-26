import { useState } from "react";
import {
    TouchableOpacity,
    Text,
    TextInput,
    View,
    Vibration,
    Pressable,
    Keyboard,
    FlatList,
} from "react-native";
import ResultImc from "../ResultImc";
import styles from "./style";

export default function Form() {

    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState('Preencha o peso e altura')
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState('Calcular')
    const [errorMessage, setErrorMessage] = useState(null)
    const [imcList, setImcList] = useState([])

    function verifyImc() {
        if (imc === null) {
            Vibration.vibrate()
            setErrorMessage('Campo obrigatório*')
        }
    }

    function calcImc() {
        let heightFormat = height.replace(',', '.')
        let totalImc = (weight / (heightFormat * heightFormat)).toFixed(2);
        setImcList((arr) => [...arr, { id: new Date().getTime(), imc: totalImc }]);
        setImc(totalImc);
    }

    function validationImc() {
        if (weight != null && height != null) {
            calcImc()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu imc é igual:")
            setTextButton("Calcular Novamente")
            setErrorMessage(null)
        } else {
            verifyImc()
            setImc(null)
            setTextButton("Calcular")
            setMessageImc("Preencha o peso e altura")
        }
    }

    return (
        <View style={styles.formContext}>
            {imc == null ? (
                <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                    <Text style={styles.formLabel}>Altura</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setHeight}
                        value={height}
                        placeholder="Ex. 1.75"
                        keyboardType="numeric"
                    />
                    <Text style={styles.formLabel}>Peso</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setWeight}
                        value={weight}
                        placeholder="Ex. 75.555"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        style={styles.buttonCalculator}
                        title={textButton}
                        onPress={() => validationImc()}
                    >
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </Pressable>
            ) : (
                <View style={styles.exhibitionResultImc}>
                    <ResultImc messageResultImc={messageImc} resultImc={imc} />
                    <TouchableOpacity
                        style={styles.buttonCalculator}
                        title={textButton}
                        onPress={() => validationImc()}
                    >
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
            )}
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.listImcs}
                data={imcList.reverse()}
                renderItem={({ item }, key) => {
                    return (
                        <Text style={styles.resultImcItem}>
                            <Text style={styles.textResultItemList} key={key}>Resultado IMC =</Text>
                            {item.imc}
                        </Text>
                    );
                }}
                keyExtractor={item => item.id}
            />
        </View>
    );
}