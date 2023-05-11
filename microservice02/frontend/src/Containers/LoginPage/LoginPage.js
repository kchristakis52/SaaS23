import { StatusBar } from 'expo-status-bar' ;
import { StyleSheet ,View } from "react-native" ;
import GoogleButton from 'react-google-button';
import classes from "./LoginPage.module.css" ;

export default function Login(){
    return(
        <div className={classes.mainbody}>
            <View style={styles.container}>
                <StatusBar style='auto' />
                <GoogleButton onClick ={() => {console.log("Someone tried to sign in")}} />
            </View>
        </div>
    );   
}

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        backgroundColor : "#fff",
        alignItems: "center" ,
        justifyContent: "center",
    },
});