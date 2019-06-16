import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Icon,
  Accordion,
  Text,
  View
} from "native-base";
import Slideshow from "react-native-image-slider-show";
import { withNavigation } from "react-navigation";
import Headerforall from "../header/header";

class Question extends Component {
  constructor(props) {
    super(props);


    this.state = {
      position: 1,
      interval: null,
      dataSource: [],
      dataArray: [
        {
          title: "Best time to visit",
          content: ""
        },
      ]
    };
  }

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.dataSource.length
              ? 0
              : this.state.position + 1
        });
      }, 2000)
    });
  }

  componentDidMount() {
    
    const {dataSource, questions} = this.props.navigation.getParam("data");
    if(!this.state.dataSource.length){

      let dataArr= questions.map((item)=>{
        return {
          title:item.question,
          content:item.answer
        }
      })
      // const keys = Object.keys(questions);
      // let dataArr= [];
      
      // for(i=0; i <keys.length; i++){
      //   dataArr.push({
      //     title:keys[i],
      //     content: questions[keys[i]]
      //   })
      // }
       
      this.setState({
        dataSource:[{
          ...dataSource
        }],
        dataArray:[
          ...dataArr
        ]
      })
    }
  }
  
  
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  

  _renderHeader(item, expanded) {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#baeff2"
        }}
      >
        <Text style={{ fontWeight: "300", justifyContent: "flex-end" }}>
          {" "}
          {item.title}
        </Text>
        {expanded ? (
          <Icon style={{ fontSize: 18 }} name="remove" />
        ) : (
          <Icon style={{ fontSize: 18 }} name="add" />
        )}
      </View>
    );
  }
  _renderContent(item) {
    return (
      <Text
        style={{
          backgroundColor: "white",
          padding: 10,
          fontStyle: "Sans-serif"
        }}
      >
        {item.content}
      </Text>
    );
  }
  render() {
    
    if(!this.state.dataSource){
      return(<Text>Loading...</Text>)
    }

    return (
      <Container>
        <Headerforall headerText={"Plan My Trip"} />
        <Content>
          <View>
            <Slideshow
              dataSource={this.state.dataSource}
              position={this.state.position}
              onPositionChanged={position => this.setState({ position })}
            />
          </View>
          <View style={{ marginTop: 5 }}>
            <Accordion
              dataArray={this.state.dataArray}
              animation={true}
              expanded={true}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
            />
          </View>
        </Content> 
      </Container>
    );
  }
}
export default withNavigation(Question);
