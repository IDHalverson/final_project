import React from "react";
import { connect } from "react-redux";

//components
// import TeacherOnly from "../components/TeacherOnly";
// import StudentOnly from "../components/StudentOnly";
import { Card, CardHeader, CardText } from "material-ui/Card";
import { List, ListItem } from "material-ui/List";
import LoadScreen from "../../components/LoadScreen";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import "../../styles/RewardList.css";

//actions
import {
  createReward,
  getAllRewards,
  editReward,
  deleteReward
} from "../../actions/rewards";
import { loginTeacher, loginStudent } from "../../actions/index";

class TeacherRewards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingRewards: false,
      loading: true
    };
  }
  componentDidMount = async () => {
    //login the teacher
    if (Object.keys(this.props.user).length === 0) {
      // if (this.state.userType === "Teacher") {
      //   loginTeacher();
      // } else if (this.state.userType === "Student") {
      //   loginStudent();
      // }
    } else {
      this.getRewards();
      this.setState({ fetchingRewards: true });
    }
  };
  //grab all the rewards
  getRewards = async () => {
    await this.props.fetchRewards(this.props.user.id, this.props.user.kind);
    this.setState({
      fetchingRewards: false,
      loading: false
    });
  };
  onCreateReward = async () => {
    //placeholder
    //open a modal???
    //this.props.createReward()
    console.log("making a reward");
    return null;
  };
  onPurchase = async () => {
    //check points
    //show error if not possible
    //else purchase
  };
  render = () => {
    if (this.state.loading) {
      if (
        Object.keys(this.props.user).length !== 0 &&
        !this.state.fetchingRewards
      ) {
        //go fetch some data
        this.getRewards();
      }
      //display load screen
      return <LoadScreen />;
    }

    //TODO: ADD IN-PLACE EDITING FOR DESCRIPTION/ COST/VALUE
    //TODO: ADD A RADIO-BUTTON TO CHANGE THE AVAILABILITY SETTINGS
    /////////IF THE USER IS THE TEACHER
    const rewards = this.props.rewards.map(reward => {
      //custom buttons for students and teachers
      return (
        <Card key={reward._id} className="reward-container">
          <CardHeader
            title={reward.title}
            subtitle={`costs ${reward.cost || reward.value || "None"}`}
            className="reward-card-header"
            actAsExpander={true}
          />
          <CardText
            className="reward-item"
            style={{ hoverColor: "none" }}
            expandable={true}
          >
            <p>Description: {reward.description || "None"}</p>
            <p>Cost: {reward.cost || reward.value || "None"}</p>
            <p>Available: {reward.status || "Unknown"}</p>
            <FlatButton
              onClick={() => this.props.removeReward(reward._id)}
              label="delete"
            />
            <FlatButton onClick={null} label="set unavailable" />
          </CardText>
        </Card>
      );
    });
    return (
      <Paper className="reward-container">
        {/* header */}
        <div className="reward-card-title">
          <h1>{this.props.user.displayName}'s Rewards</h1>
          {/* <div onClick={this.onCreateReward}>
            <i class="fa fa-plus" aria-hidden="true" />
          </div> */}
          <FlatButton onClick={this.onCreateReward} label="create reward" />
        </div>
        {/* Rewards List */}
        <List className="reward-list">{rewards}</List>
      </Paper>
    );
  };
}

const mapStateToProps = state => {
  console.log("state in rewards = ", state);
  return {
    user: state.user,
    rewards: state.rewards,
    classrooms: state.classrooms
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createReward: teacher => {
      dispatch(createReward(teacher));
    },
    fetchRewards: (userId, userKind) => {
      dispatch(getAllRewards(userId, userKind));
    },
    removeReward: rewardId => {
      dispatch(deleteReward(rewardId));
    },
    updateReward: (id, editedReward) => {
      dispatch(editReward(id, editedReward));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherRewards);