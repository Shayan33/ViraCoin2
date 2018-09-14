import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import { ToastContainer, ToastStore } from 'react-toasts';
import { Statics } from '../Statics';
import './Account.css';
export class Account extends Component {
    displayName = Account.name
    constructor(props) {
        super(props);
        Statics.IsLogin();
        this.state = { name: '', middleName: '', lastName: '', emailAddress: '', phoneNumber: '', cellNumber: '', address: '' };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.FetchData();
    }
    FetchData() {
        fetch('api/api/Account/' + Statics.GetToken(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'PrivateToken': Statics.GetToken()
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    name: data.name,
                    middleName: data.middleName,
                    lastName: data.lastName,
                    emailAddress: data.emailAddress,
                    phoneNumber: data.phoneNumber,
                    cellNumber: data.cellNumber,
                    address: data.address
                });
            }).catch(r => console.log(r));
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        fetch('api/api/Account/' + Statics.GetToken(), {
            method: 'POST',
            headers: {

                'PrivateToken': Statics.GetToken(),
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                name: this.state.name,
                middleName: this.state.middleName,
                lastName: this.state.lastName,
                emailAddress: this.state.emailAddress,
                phoneNumber: this.state.phoneNumber,
                cellNumber: this.state.cellNumber,
                address: this.state.address
            })
        }).then(response => {
            response.json();
            if (response.status === 200) ToastStore.success('Changes saved successfully.', 2000);
            else ToastStore.error('Something went wrong.', 2000);
        }).then(data => {
            this.setState({
                name: data.name,
                middleName: data.middleName,
                lastName: data.lastName,
                emailAddress: data.emailAddress,
                phoneNumber: data.phoneNumber,
                cellNumber: data.cellNumber,
                address: data.address
            });
        })
            .catch(r => console.log(r));
        event.preventDefault();
    }
    render() {
        return (
            <div >
                <ToastContainer store={ToastStore} position={ToastContainer.POSITION.TOP_RIGHT} />
                <div className='PopUp'>
                    <div className='AccountStyle'>
                        <form onSubmit={this.handleSubmit}>
                            <Grid fluid>
                                <Row>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label className="control-label">
                                                Name
                                    </label>
                                            <br />
                                            <input type="text"
                                                placeholder="Name" value={this.state.name}
                                                onChange={this.handleInputChange} name="name" className="form-control"

                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">
                                                Middle Name
                                    </label>
                                            <br />
                                            <input type="text"
                                                placeholder="Middle Name" value={this.state.middleName}
                                                onChange={this.handleInputChange} name="middleName" className="form-control"

                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">
                                                Last Name
                                    </label>
                                            <br />
                                            <input type="text"
                                                placeholder="Last Name" value={this.state.lastName}
                                                onChange={this.handleInputChange} name="lastName" className="form-control"

                                            />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label className="control-label">
                                                Email Address
                                    </label>
                                            <br />
                                            <input type="email"
                                                placeholder="example@gmail.com" value={this.state.emailAddress}
                                                onChange={this.handleInputChange} name="emailAddress" className="form-control"

                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">
                                                Phone Number
                                    </label>
                                            <br />
                                            <input type="tel"
                                                placeholder="123-456-7890" value={this.state.phoneNumber}
                                                onChange={this.handleInputChange} name="phoneNumber" className="form-control"

                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">
                                                Cell Number
                                    </label>
                                            <br />
                                            <input type="tel"
                                                placeholder="123-456-7890" value={this.state.cellNumber}
                                                onChange={this.handleInputChange} name="cellNumber" className="form-control"

                                            />
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className="form-group">
                                            <label className="control-label">
                                                Address
                                    </label>
                                            <br />
                                            <textarea value={this.state.address} name="address" onChange={this.handleInputChange} className="form-control"
                                                rows={8}
                                            />
                                        </div>
                                        <div className="form-group" style={{ float: 'right' }}>
                                            <input type="submit" value="Submit" className="form-control"
                                                className="btn btn-primary"
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Grid>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}