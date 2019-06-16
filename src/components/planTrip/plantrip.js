import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  View
} from "native-base";
import { withNavigation } from "react-navigation";
import Headerforall from "../header/header";

class CardImage extends Component {
  state = {
    data: null
  };

  fetchData = () => {
    console.log("fetching...");
    return fetch("http://192.168.43.110:4042/plan_my_trip");
  };
 

  componentDidMount() {
    this.fetchData()
      .then(res => res.json())
      .then(data => {
        this.setState({
          data
        });
      })
      .catch(err => {
        console.log(err);
      });

  }


  render() {
    const { navigation } = this.props;
    data = this.state.data;

    RenderedCards =
      data &&
      data.map((item, i) => {
        return <Trip item={item} key={i} navigation={navigation} />;
      });

    return (
      <Container>
        <Headerforall headerText={"Plan My Trip"} />
        <Content>{RenderedCards}</Content>
      </Container>
    );
  }
}
export default withNavigation(CardImage);

const Trip = ({ item, navigation }) => {
  const {
    p_name,
    p_image,
    image,
    c_name,
    longitude,
    latitude,
    nearby,
    transport,
    distance,
    best_time,
    weather,
    luggage_recommendation, 
    reach_time, 
    time_spent,
    private_tours, 
    public_transport,
    family_recom,
    hotels,
    em_number,
    iconic_places
  } = item;
  const data = {
    dataSource:{
      title: p_name,
      caption: c_name,
        url:image
    
    },
    questions:[
      {
        question: "Location Coordinates",
        answer:`${longitude }, ${latitude}`,
      },{
        question:" Near by Places ",
        answer: nearby
      },
      {
        question:" Transport ",
        answer:transport,
      },
      {
        question:"Distance",
        answer:distance,
      },
      {
        question:"What is the best time to visit?",
        answer: best_time,
      },
      {
        question:"Weather information on specific time?",
        answer: weather
      },
      {
        question:"Luggage Recommendation",
        answer:  luggage_recommendation
      },
      {
        question:"What is the eestimated time to reach?",
        answer:  reach_time
      },
      {
        question:"How much time can be spent there?",
        answer:  time_spent
      },
      {
        question:"Recommendation to visit with family?",
        answer:  family_recom
      },
      {
        question:"Accessibilty through owned vehicle or private transport?",
        answer:  transport
      },
      {
        question:"Public transport schedule",
        answer:  public_transport
      },
      {
        question:"Best Hotel around",
        answer:  hotels
      },
      {
        question:"Best point or Iconic places for photography",
        answer:  iconic_places
      },
      {
        question:"Private tour availability?",
        answer:  private_tours
      },
      {
        question:"Weather Information",
        answer:  weather
      },
      {
        question:"Emergency Numbers",
        answer:  em_number
      }
    ]
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Question", {
          data 
        });
      }}
    >
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: "" }} />
            <Body>
              <Text>{p_name}</Text>
              <Text note>{c_name}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{ uri: p_image }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};
