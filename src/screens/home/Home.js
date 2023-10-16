import React, { Component } from "react";
import Header from "../../common/header/Header";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons"; // Import the specific FontAwesome icon
import { Link } from "react-router-dom";

import "./Home.css";

// Custom Styles to override Material UI default styles
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  grid: {
    // style for the grid component
    padding: "20px",
    marginLeft: "0.5%",
    marginRight: "0.5%",
    transform: "translateZ(0)",
    cursor: "pointer",
  },
  gridCard: {
    // Style for the Grid card
    "@media (min-width: 1200px)": {
      flex: "0",
      maxWidth: "25%",
      flexBasis: "25%",
    },
    "@media (min-width: 960px) and (max-width:1200px)": {
      flex: "0",
      maxWidth: "33%",
      flexBasis: "33%",
    },
  },
  card: {
    // Style for the card and responsive code for different screen size
    height: "500px",
    "@media (min-width: 1300px)": {
      height: "500px",
    },
    "@media (min-width: 960px) and (max-width:1300px)": {
      height: "375px",
    },
  },
  media: {
    // style for the image in the card
    height: "40%",
    width: "100%",
  },
  title: {
    // Style for the Title in the Card
    fontSize: "25px",
    "@media (min-width: 1300px)": {
      fontSize: "35px",
    },
    "@media (min-width: 960px) and (max-width:1300px)": {
      fontSize: "30px",
    },
    "@media (max-width: 960px)": {
      fontSize: "30px",
    },
  },
  categories: {
    // Style for the categories in the card
    fontSize: "16px",
    "@media (min-width: 1300px)": {
      fontSize: "22px",
    },
    "@media (min-width: 960px) and (max-width:1300px)": {
      fontSize: "20px",
    },
    "@media (max-width: 960px)": {
      fontSize: "22px",
    },
  },
  cardContent: {
    // Styles for the card content
    padding: "10px",
    marginLeft: "20px",
    marginRight: "20px",
    height: "20%",
    display: "flex",
    alignItems: "center",
  },
  cardActionArea: {
    // Style for the Card action area button
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "normal",
    justifyContent: "space-between",
  },
});

class Home extends Component {
  constructor() {
    super();
    this.state = {
      restaurant: [],
      isSearchOn: false,
      allRestaurantData: [],
    };
  }

  componentDidMount() {
    let data = null;
    let xhrRestaurant = new XMLHttpRequest();
    let that = this;
    xhrRestaurant.addEventListener("readystatechange", function () {
      if (xhrRestaurant.readyState === 4 && xhrRestaurant.status === 200) {
        let restaurant = JSON.parse(xhrRestaurant.responseText);
        that.setState({
          restaurant: restaurant.restaurants,
          allRestaurantData: restaurant.restaurants,
        });
      }
    });
    xhrRestaurant.open("GET", this.props.baseUrl + "restaurant");
    xhrRestaurant.send(data);
  }

  updateSearchRestaurant = (searchRestaurant, searchOn) => {
    if (searchOn) {
      if (!this.state.isSearchOn) {
        this.setState({
          restaurant: searchRestaurant,
          isSearchOn: true,
        });
      } else {
        this.setState({
          restaurant: searchRestaurant,
        });
      }
    } else {
      this.setState({
        restaurant: this.state.allRestaurantData,
        isSearchOn: false,
      });
    }
  };

  restaurantCardClicked = (restaurantId) => {
    this.props.history.push("/restaurant/" + restaurantId);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
          baseUrl={this.props.baseUrl}
          showHeaderSearchBox={true}
          updateSearchRestaurant={this.updateSearchRestaurant}
        />
        <div className="flex-container">
          <Grid
            container
            spacing={3}
            wrap="wrap"
            alignContent="center"
            className={classes.grid}
          >
            {this.state.restaurant !== null ? (
              this.state.restaurant.length > 0 ? (
                this.state.restaurant.map((restaurant) => (
                  <Grid
                    key={restaurant.id}
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    className={classes.gridCard}
                  >
                    <Card className={classes.card}>
                      <CardActionArea
                        className={classes.cardActionArea}
                        component={Link}
                        to={"/restaurant/" + restaurant.id}
                      >
                        <CardMedia
                          className={classes.media}
                          image={restaurant.photo_URL}
                          title={restaurant.restaurant_name}
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography
                            className={classes.title}
                            variant="h5"
                            component="h2"
                          >
                            {restaurant.restaurant_name}
                          </Typography>
                        </CardContent>
                        <CardContent className={classes.cardContent}>
                          <Typography
                            variant="subtitle1"
                            component="p"
                            className={classes.categories}
                          >
                            {restaurant.categories}
                          </Typography>
                        </CardContent>
                        <CardContent className={classes.cardContent}>
                          <div className="card-bottom-info">
                            <span className="rest-rating">
                              <span>
                                <FontAwesomeIcon
                                  icon={faStar}
                                  size="lg"
                                  color="white"
                                />
                              </span>
                              <Typography variant="caption" component="p">
                                {restaurant.customer_rating}
                              </Typography>
                              <Typography variant="caption" component="p">
                                ({restaurant.number_customers_rated})
                              </Typography>
                            </span>
                            <span className="rest-for-two">
                              <Typography
                                variant="caption"
                                component="p"
                                style={{ fontSize: "14px" }}
                              >
                                <i className="fa fa-inr" aria-hidden="true"></i>
                                {restaurant.average_price}
                              </Typography>
                              <Typography
                                variant="caption"
                                component="p"
                                style={{ fontSize: "14px" }}
                              >
                                for two
                              </Typography>
                            </span>
                          </div>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography variant="body1" component="p">
                  No restaurant with the given name.
                </Typography>
              )
            ) : (
              <Typography variant="body1" component="p">
                Loading...
              </Typography>
            )}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
