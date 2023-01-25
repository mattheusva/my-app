import { Share, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";

export default function ResultImc(props) {

    const onShare = async () => {
        const result = await Share.share({
            message: `Meu IMC hoje é ${props.resultImc}`,
        })
    }

    return (
        <View style={styles.contextImc}>
            <View style={styles.boxShareButton}>
                {props.resultImc != null ?
                    <TouchableOpacity style={styles.shareButton} onPress={onShare}>
                        <Text style={styles.shareText}>Compartilhar</Text>
                    </TouchableOpacity>
                    :
                    <View />
                }
            </View>
            <Text style={styles.titleResultImc}>
                {props.messageResultImc}
            </Text>
            <Text style={styles.resultImc}>
                {props.resultImc}
            </Text>
        </View>
    );
}