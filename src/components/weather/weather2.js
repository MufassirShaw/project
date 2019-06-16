import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import {weatherConditions} from "./weathercondition.js";
import PropTypes from "prop-types";

const Weatherreport = ({ weather, temperature }) => {
  console.log(weather, temperature);
  return (
    // <View
    //   style={[
    //     styles.weatherContainer,
    //     { BackgroundColor: weatherConditions[weather].color }
    //   ]}
    // >
    //   <View style={styles.headerContainer}>
    //     <MaterialCommunityIcons
    //       size={72}
    //       name={weatherConditions[weather].icon}
    //       color={"#fff"}
    //     />
    //     <Text style={styles.tempText}>{temperature}</Text>
    //   </View>
    //   <View style={styles.bodyContainer}>
    //     <Text style={styles.title}>{weatherConditions[weather].title}</Text>
    //     <Text style={styles.subtitle}>
    //       {weatherConditions[weather].subtitle}
    //     </Text>
    //   </View>
    // </View>
     <View>
         <Text>
            {weather }
         </Text>
        <Text>
        {temperature}
        </Text>
    </View>
  );
};

Weatherreport.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  tempText: {
    fontSize: 72,
    color: "#fff"
  },
  bodyContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 60,
    color: "#fff"
  },
  subtitle: {
    fontSize: 24,
    color: "#fff"
  }
});

export default Weatherreport;
