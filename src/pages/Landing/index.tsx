import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

import landingPage from "../../assets/images/landing.png";
import studyIcon from "../../assets/images/icons/study.png";
import giveClassesIcon from "../../assets/images/icons/give-classes.png";
import heartIcon from "../../assets/images/icons/heart.png";
import { RectButton } from "react-native-gesture-handler";
import api from "../../services/api";

function Landing() {
  const { navigate } = useNavigation();
  const [totalConnections, setTotalConnections] = useState(0);

  function handleNavigationToGiveClassesPage() {
    navigate("GiveClasses");
  }
  function handleNavigationToStudyPage() {
    navigate("Study");
  }

  useEffect(() => {
    api.get("connections").then((response) => {
      const { total } = response.data;
      setTotalConnections(total);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={landingPage} style={styles.banner} />
      <Text style={styles.title}>
        Seja Bem-vindo, {"\n"}
        <Text style={styles.titleBold}>O que deseja Fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigationToStudyPage}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={studyIcon} />
          <Text style={styles.titleBold}>Estudar</Text>
        </RectButton>
        <RectButton
          onPress={handleNavigationToGiveClassesPage}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Image source={giveClassesIcon} />
          <Text style={styles.titleBold}>Dar aulas</Text>
        </RectButton>
      </View>
      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas{" "}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
}

export default Landing;
