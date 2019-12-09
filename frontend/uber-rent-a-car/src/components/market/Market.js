import React, { Component } from "react";
import "./Market.css";
import { Form, Col, Button, Toast } from "react-bootstrap";
import Slider from "react-slick";
import axios from "axios";

const apiUrl = "http://localhost:8080";
const LIST_AVAILABLE_VEHICLES = "/vehicles/list_available_vehicles";
const NEW_RENT = "/rents/add_new_rent";
const NEW_CAR = "/cars/add_new_car";
const NEW_MOTORCYCLE = "/motorcycles/add_new_motorcycle";
const NEW_CUSTOMER = "/customers/add_new_customer";

export default class Market extends Component {
  constructor() {
    super();
    this.handleInputCpf = this.handleInputCpf.bind(this);
    this.handleInputHasNumericInt = this.handleInputHasNumericInt.bind(this);
    this.handleInputHasNumericFloat = this.handleInputHasNumericFloat.bind(
      this
    );
    this.handleInputHasString = this.handleInputHasString.bind(this);
    this.handleLicensePlate = this.handleLicensePlate.bind(this);
    this.getVehiclesNamesFromApi();
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleFailure = this.toggleFailure.bind(this);
  }

  state = {
    rent: {
      customerCpf: "",
      rentedVehicle: 1,
      totalDaysOfRent: 0,
      hasInsurance: false
    },
    offer: {
      ownerCpf: "",
      modelName: "",
      licensePlate: "",
      vehicleColor: "",
      description: "",
      rentValuePerDay: ""
    },
    user: {
      cpf: "",
      name: "",
      phoneNumber: "",
      address: "",
      city: ""
    },
    numberOfSeats: "",
    hasElectricStart: false,
    vehicleTypes: ["Car", "Motorcyle"],
    electricStart: ["No eletric start", "Has electric start"],
    modelNames: [],
    isACar: true,
    totalPrice: 0,
    isBackspace: false,
    isNotADotNorADash: false,
    show: true,
    success: false,
    phrase: "",
    failure: false
  };

  toggleSuccess() {
    this.setState({ success: true });
  }

  toastSuccess = text => {
    text = this.state.phrase;
    return (
      <Toast
        onClose={() => {
          this.setState({ success: false });
        }}
        show={this.state.success}
        delay={4000}
        autohide
        className="toast-success"
      >
        <Toast.Header className="toast-header-success">
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>
          <p>{text}</p>
        </Toast.Body>
      </Toast>
    );
  };

  toggleFailure() {
    this.setState({ failure: !this.state.failure });
  }

  toastFailure = () => {
    return (
      <Toast
        onClose={() => {
          this.setState({ failure: false });
        }}
        show={this.state.failure}
        delay={4000}
        autohide
        className="toast-failure"
      >
        <Toast.Header className="toast-header-failure">
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Warning</strong>
        </Toast.Header>
        <Toast.Body>
          <p>Fill the fields below correctly!</p>
        </Toast.Body>
      </Toast>
    );
  }

  async getVehiclesNamesFromApi() {
    const response = await axios.get(apiUrl + LIST_AVAILABLE_VEHICLES);
    let allVehicles = [];
    response.data.map(vehicle => {
      allVehicles.push(vehicle);
    });

    allVehicles.map(vehicle => {
      let id = vehicle.id;
      let name = vehicle.modelName;
      let object = { [id]: name };
      this.setState({
        modelName: Object.assign(this.state.modelNames, object)
      });
    });
  }

  async postNewUser() {
    await axios
      .post(apiUrl + NEW_CUSTOMER, {
        cpf: this.state.user.cpf,
        name: this.state.user.name,
        phoneNumber: this.state.user.phoneNumber,
        address: this.state.user.address,
        city: this.state.user.city
      })
      .then(response => {
        console.log(response);
        this.setState({ phrase: "You successfully registered!" });
        this.toggleSuccess();
      })
      .catch(error => {
        console.log(error);
        this.toggleFailure();
      });
  }

  async postNewRent() {
    console.log(this.state.rent.rentedVehicle);
    let price;

    const response = await axios
      .post(
        apiUrl + NEW_RENT,
        {
            totalDaysOfRent: parseInt(this.state.rent.totalDaysOfRent),
            hasInsurance: this.state.rent.hasInsurance

        },
        {
          params: {
            vehicleId: this.state.rent.rentedVehicle,
            customerCpf: this.state.rent.customerCpf
          }
        }
      )
      .then(response => {
        console.log(response);
        console.log(this.state.rent);
        price = response.data.totalPrice;
        this.setState({
          phrase: `You successfully rented a vehicle! Total price: R$ ${price}`
        });
        this.toggleSuccess();
        console.log(price);
      })
      .catch(error => {
        console.log(error.response);
        this.toggleFailure();
      });
  }

  async postNewVehicle() {
    if (this.state.isACar) {
      await axios
        .post(
          apiUrl + NEW_CAR,
          {
            modelName: this.state.offer.modelName,
            rentValuePerDay: this.state.offer.rentValuePerDay,
            vehicleColor: this.state.offer.vehicleColor,
            description: this.state.offer.description,
            licensePlate: this.state.offer.licensePlate,
            numberOfSeats: this.state.numberOfSeats
          },
          {
            params: {
              customerCpf: this.state.offer.ownerCpf
            }
          }
        )
        .then(response => {
          console.log(response);
          this.setState({ phrase: "You successfully offered your car!" });
          this.toggleSuccess();
          this.getVehiclesNamesFromApi();
          this.forceUpdate();
        })
        .catch(error => {
          console.log(error.response);
          this.toggleFailure();
        });
    } else {
      await axios
        .post(
          apiUrl + NEW_MOTORCYCLE,
          {
            params: {
              customerCpf: this.state.offer.ownerCpf
            },
            modelName: this.state.offer.modelName,
            rentValuePerDay: this.state.offer.rentValuePerDay,
            vehicleColor: this.state.offer.vehicleColor,
            description: this.state.offer.description,
            licensePlate: this.state.offer.licensePlate,
            hasElectricStart: this.state.hasElectricStart
          },
          {
            headers: {
              "Content-type": "application/json"
            }
          }
        )
        .then(response => {
          console.log(response);
          this.setState({ phrase: "You successfully offered your car!" });
          this.toggleSuccess();
          this.getVehiclesNamesFromApi();
          this.forceUpdate();
        })
        .catch(error => {
          this.toggleFailure();
          console.log(error.response);
        });
    }
  }

  toggleHasInsurance() {
    this.setState({
      rent: Object.assign({}, this.state.rent, {
        hasInsurance: !this.state.rent.hasInsurance
      })
    });
  }

  handleVehicleType(e) {
    this.setState({ isACar: e.target.value === "Car" });
  }

  handleElectricStart(e) {
    this.setState({
      hasElectricStart: e.target.value === "Has electric start"
    });
  }

  hasMoreThanOne(stringToCheck, character) {
    let count = 0;
    for (var i = 0; i < stringToCheck.length; i++) {
      if (stringToCheck.charAt(i) === character) {
        count++;
      }
    }
    return count >= 2 ? true : false;
  }

  /**
   * Method for handling the user's input in the CPF input field;
   * @param {*} e - Event referred to the user's input;
   * @param {*} parentField - The name of the parent element in the state;
   * @param {*} cpfField - Name of the child element in the state.
   */
  handleInputCpf(e, parentField, cpfField) {
    const re = /^[0-9.-]+$/;

    console.log(this.state.rent.hasInsurance);

    if (e.target.value === "" || re.test(e.target.value)) {
      if (
        (e.target.value.length === 3 || e.target.value.length === 7) &&
        !this.state.isBackspace
      ) {
        e.target.value = e.target.value + ".";
      }
      if (e.target.value.length === 11 && !this.state.isBackspace) {
        e.target.value = e.target.value + "-";
      }

      if (this.state.isNotADotNorADash)
        this.setState({
          [parentField]: Object.assign({}, this.state[parentField], {
            [cpfField]: e.target.value
          })
        });
    }
  }

  /**
   * Method for handling the user's input in numeric fields
   * @param {*} e - Event referred to the user's input;
   * @param {*} parentField - The name of the parent element in the state;
   * @param {*} numericField - Name of the child element in the state.
   */
  handleInputHasNumericInt(e, parentField, numericField) {
    const re = /^[0-9]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      if (numericField !== undefined) {
        this.setState({
          [parentField]: Object.assign({}, this.state[parentField], {
            [numericField]: e.target.value
          })
        });
      } else {
        this.setState({ [parentField]: parseInt(e.target.value) });
      }
    }
  }

  handleInputHasNumericFloat(e, parentField, numericField) {
    const re = /^[0-9.]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      if (this.hasMoreThanOne(e.target.value, ".") === false) {
        if (numericField !== undefined) {
          this.setState({
            [parentField]: Object.assign({}, this.state[parentField], {
              [numericField]: e.target.value
            })
          });
        } else {
          this.setState({ [parentField]: e.target.value });
        }
      }
    }
  }

  handleInputHasString(e, parentField, stringField) {
    const re = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      if (stringField !== undefined) {
        this.setState({
          [parentField]: Object.assign({}, this.state[parentField], {
            [stringField]: e.target.value
          })
        });
      } else {
        this.setState({
          [parentField]: e.target.value
        });
      }
    }
  }

  handleDescription(e) {
    const re = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ .!,-]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({
        offer: Object.assign({}, this.state.offer, {
          description: e.target.value
        })
      });
    }
  }

  handleLicensePlate(e, parentField, licensePlateField) {
    const re = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ /0-9-]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      if (e.target.value.length === 3 && !this.state.isBackspace) {
        e.target.value = e.target.value + "-";
      }
      let upperCaseText = e.target.value.toUpperCase();
      this.setState({
        [parentField]: Object.assign({}, this.state[parentField], {
          [licensePlateField]: upperCaseText
        })
      });
    }
  }

  handlePhoneNumber(e) {
    const re = /^[/0-9-( )]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      if (e.target.value.length === 1 && !this.state.isBackspace) {
        e.target.value = "(" + e.target.value;
      }
      if (e.target.value.length === 3 && !this.state.isBackspace) {
        e.target.value = e.target.value + ") ";
      }
      if (e.target.value.length === 10 && !this.state.isBackspace) {
        e.target.value = e.target.value + "-";
      }

      this.setState({
        user: Object.assign({}, this.state.user, {
          phoneNumber: e.target.value
        })
      });
    }
  }

  handleVehicleId(e) {
    let key = e.target.value.split(" -")[0];
    console.log(key);
    this.setState({
      rent: Object.assign({}, this.state.rent, {
        rentedVehicle: parseInt(key)
      })
    });
  }

  testIfBackspace(e) {
    this.setState({ isBackspace: e.keyCode === 8 });
    this.setState({
      isNotADotNorADash: e.keyCode !== 190 && e.keyCode !== 109
    });
  }

  render() {
    var settings = {
      dots: true,
      speed: 650,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div>
        <div className="breaking-content"></div>
        <div className="market-container">
          {this.state.success ? this.toastSuccess() : null}
          {this.state.failure ? this.toastFailure() : null}

          <div className="car-market">
            <Slider className="slide" {...settings}>
              <div className="slide">
                <h2 className="market-title">Register</h2>
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} controlId="">
                      <Form.Label>CPF</Form.Label>
                      <Form.Control
                        onKeyDown={this.testIfBackspace.bind(this)}
                        value={this.state.user.cpf}
                        onChange={e => {
                          this.handleInputCpf(e, "user", "cpf");
                        }}
                        placeholder="Enter your CPF"
                        maxLength={14}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        onKeyDown={this.testIfBackspace.bind(this)}
                        value={this.state.user.name}
                        onChange={e => {
                          this.handleInputHasString(e, "user", "name");
                        }}
                        placeholder="Enter your name"
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        value={this.state.user.address}
                        onChange={e =>
                          this.handleInputHasString(e, "user", "address")
                        }
                        placeholder="Enter your address"
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        value={this.state.user.city}
                        onChange={e =>
                          this.handleInputHasString(e, "user", "city")
                        }
                        placeholder="Enter your city"
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        onKeyDown={this.testIfBackspace.bind(this)}
                        value={this.state.user.phoneNumber}
                        onChange={e => this.handlePhoneNumber(e)}
                        placeholder="Enter your phone number"
                        maxLength={15}
                      />
                    </Form.Group>
                  </Form.Row>
                </Form>

                <Button
                  size="lg"
                  onClick={this.postNewUser.bind(this)}
                  variant="outline-dark"
                  type="submit"
                >
                  Register
                </Button>
              </div>

              <div className="slide">
                <h2 className="market-title">Rent a Vehicle</h2>
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} controlId="">
                      <Form.Label>CPF</Form.Label>
                      <Form.Control
                        onKeyDown={this.testIfBackspace.bind(this)}
                        value={this.state.rent.customerCpf}
                        onChange={e => {
                          this.handleInputCpf(e, "rent", "customerCpf");
                        }}
                        placeholder="Enter your CPF"
                        maxLength={14}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Model Name</Form.Label>
                      <Form.Control
                        onChange={this.handleVehicleId.bind(this)}
                        as="select"
                      >
                        <option>Choose...</option>
                        {this.state.modelNames.length > 0 ? (
                          this.state.modelNames.map((vehicle, i) => {
                            return (
                              <option>
                                {i} - {vehicle}
                              </option>
                            );
                          })
                        ) : (
                          <option>
                            Sorry, we don't have vehicles available
                          </option>
                        )}
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>Days</Form.Label>
                      <Form.Control
                        value={this.state.rent.totalDaysOfRent}
                        onChange={e =>
                          this.handleInputHasNumericInt(
                            e,
                            "rent",
                            "totalDaysOfRent"
                          )
                        }
                        placeholder="Enter how many days you'll need the vehicle"
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Group
                    key={"custom-checkbox"}
                    as={Col}
                    id="formGridCheckbox"
                  >
                    <Form.Check
                      custom
                      type="checkbox"
                      id={"custom-checkbox"}
                      label="I want a Insurance"
                      onChange={this.toggleHasInsurance.bind(this)}
                    />
                  </Form.Group>
                </Form>

                <Button
                  size="lg"
                  onClick={this.postNewRent.bind(this)}
                  variant="outline-dark"
                  type="submit"
                >
                  Rent Now
                </Button>
              </div>

              <div className="slide">
                <h2 className="market-title">Offer a Vehicle</h2>
                <Form>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>CPF</Form.Label>
                      <Form.Control
                        value={this.state.offer.ownerCpf}
                        onChange={e => {
                          this.handleInputCpf(e, "offer", "ownerCpf");
                        }}
                        onKeyDown={this.testIfBackspace.bind(this)}
                        placeholder="Enter your CPF"
                        maxLength={14}
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Model Name</Form.Label>
                      <Form.Control
                        value={this.state.offer.modelName}
                        onChange={e =>
                          this.handleInputHasString(e, "offer", "modelName")
                        }
                        placeholder="Enter the vehicle's model name"
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>License Plate</Form.Label>
                      <Form.Control
                        value={this.state.offer.licensePlate}
                        onChange={e =>
                          this.handleLicensePlate(e, "offer", "licensePlate")
                        }
                        placeholder="Enter the vehicle's license plate"
                        onKeyDown={this.testIfBackspace.bind(this)}
                        maxLength={8}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Vehicle Type</Form.Label>
                      <Form.Control
                        onChange={this.handleVehicleType.bind(this)}
                        as="select"
                      >
                        {this.state.vehicleTypes.map(vehicleType => {
                          return <option>{vehicleType}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>

                    {this.state.isACar ? (
                      <Form.Group as={Col}>
                        <Form.Label>Number of Seats</Form.Label>
                        <Form.Control
                          value={this.state.numberOfSeats}
                          onChange={e =>
                            this.handleInputHasNumericInt(e, "numberOfSeats")
                          }
                          min={2}
                          max={7}
                          type="number"
                          placeholder="How many seats the car has?"
                        />
                      </Form.Group>
                    ) : (
                      <Form.Group as={Col}>
                        <Form.Label>Electric Starter</Form.Label>
                        <Form.Control
                          onChange={this.handleElectricStart.bind(this)}
                          as="select"
                        >
                          {this.state.electricStart.map(electricStartType => {
                            return <option>{electricStartType}</option>;
                          })}
                        </Form.Control>
                      </Form.Group>
                    )}

                    <Form.Group as={Col}>
                      <Form.Label>Color</Form.Label>
                      <Form.Control
                        value={this.state.offer.vehicleColor}
                        onChange={e =>
                          this.handleInputHasString(e, "offer", "vehicleColor")
                        }
                        placeholder="Vehicle color"
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Price per day</Form.Label>
                      <Form.Control
                        value={this.state.offer.rentValuePerDay}
                        onChange={e =>
                          this.handleInputHasNumericFloat(
                            e,
                            "offer",
                            "rentValuePerDay"
                          )
                        }
                        placeholder="How much per day to charge?"
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        value={this.state.offer.description}
                        onChange={this.handleDescription.bind(this)}
                        placeholder="Add a description to the vehicle"
                      />
                    </Form.Group>
                  </Form.Row>

                  <Button
                    onClick={this.postNewVehicle.bind(this)}
                    size="lg"
                    variant="outline-dark"
                  >
                    Offer Now
                  </Button>
                </Form>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}
