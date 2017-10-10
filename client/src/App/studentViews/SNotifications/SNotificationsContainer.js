import React from "react";
import Notifications from "./SNotifications";
import { connect } from "react-redux";

import {
  acceptEvent,
  rejectEvent,
  fetchStudentNotifications
} from "../../../redux/actions/notifications";

class NotificationsContainer extends React.Component {
  constructor() {
    super();
  }

  takeToItem = (item, id) => () => {
    if (item) {
      this.props.history.push(
        `/${item.status === "AssignedTask" ? "task" : "reward"}s`
      );
    } else {
      console.log("problems in taskToItem of SNotifications");
      this.props.history.push(`/rewards`);
    }
  };

  componentDidMount() {
    this.props.hydrateNotifications(this.props.user.id);
  }

  render() {
    const NotificationsProps = {
      takeToItem: this.takeToItem,
      notifications: this.props.notifications,
      user: this.props.user
    };
    return <Notifications {...NotificationsProps} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    notifications: state.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    confirmEvent: (t_id, s_id, ta_id, n_id) => {
      dispatch(acceptEvent(t_id, s_id, ta_id, n_id));
    },
    rejectEvent: (t_id, s_id, ta_id, n_id) => {
      dispatch(rejectEvent(t_id, s_id, ta_id, n_id));
    },
    hydrateNotifications: id => {
      dispatch(fetchStudentNotifications(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  NotificationsContainer
);
