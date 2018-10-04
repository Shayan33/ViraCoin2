import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import { Statics } from '../Statics';
import { Web3s, ViraICO } from '../Web3/Web3';
import './Admin.css';
import ReactDropzone from "react-dropzone";
import { ToastContainer, ToastStore } from 'react-toasts';
export class Admin extends Component {
    displayName = Admin.name;
    constructor(props) {
        super(props);
        ViraICO.Owner();
        this.state = {
            token: '',
            tokenHash: '',
            data: '',
            production: 0,
            metaDate: '',
            imgPath: '',
            files: [],
            draged: false,
            full: false,
            tokenIsOk: true,
            fileIndex: 0
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.GetGuid();
    }
    GetGuid() {
        fetch('Guid').then(res => res.json())
            .then(data =>
                this.setState({
                    token: data.Guid,
                    tokenHash: data.HexString
                })
            ).catch(e => console.error(e));
        setTimeout(
            function () {
                this.CheckGuid();
            }
                .bind(this),
            500
        );
    }
    CheckGuid() {
        fetch('CheckGuid',
            {
                method: 'GET',
                headers: {
                    'data': this.state.token
                }
            })
            .then(res => res.json())
            .then(d => d.status === "Ok" ?
                this.setState({
                    tokenHash: d.HexString,
                    tokenIsOk: true
                }) :
                this.setState({
                    tokenIsOk: false
                }))
            //.then(d => alert(d.status))
            .catch(e => console.error(e));
    }
    UploadFile(formData) {
        fetch('api/Assets/Up', {
            method: 'POST',
            headers: {
                hi: 'bye'
            },
            body: formData
        })
            .then(r => r.json())
            .then(data => this.setState({
                imgPath: this.state.imgPath + ',' + data.data
            }))
            .catch(err => console.error(err));
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (String(name)) setTimeout(
            function () {
                this.CheckGuid();
            }
                .bind(this),
            500
        );
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.tokenIsOk) {
            let data = Web3s.Hex(this.state.tokenHash);
            if (this.state.files.length > 0) {
                data = Web3s.Sha3(this.state.data);
            }
            ViraICO.AddCarpet(data, this.state.tokenHash,
                Math.round((new Date(this.state.production)).getTime() / 1000), this.Upload,
                this.state.production, this.state.imgPath, this.state.metaDate);
        }
        else alert('Wrong Token ID.');
    }
    Upload(r, IV, th, pr, img, meta) {
        fetch('api/Assets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: Web3s.Hex(th),
                data: IV,
                production: pr,
                imgPath: img,
                tx: r,
                metaDate: meta
            })
        }).then(res => {
            if (res.status === 201) {
                alert('Changes saved successfully.');
            } else {
                alert('Something went wrong.');
            }
        })
            .catch(err => console.error(err));
    }
    GetBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    onDrop = (files) => {
        if (this.state.files.length === 9) {
            this.setState({
                full: true
            });
            return;
        }
        let formData = new FormData();
        files.forEach(f => {
            this.state.files.push(f);
            formData.append(this.state.files.length, f);
            this.GetBase64(f).then(x =>
                this.setState({
                    data: Web3s.Sha3(this.state.data + x)
                }));
        });
        this.UploadFile(formData);
        this.setState({
            draged: true
        });
    }
    UpadetPrice() {
        let pr = prompt('Enetr new price (X*Wei)', '5');
        ViraICO.UpdatePrice(pr);
    }
    GetCarpet() {
        let pr = prompt('Enter Carpet Number', '1');
        ViraICO.GetCarpet(r => alert(r), pr);
    }
    render() {
        let DragContent = !this.state.draged ? <div>
            <br />
            <h3>Drag a file here...</h3>
            <h4>or if you want click here to select a file.</h4>
        </div> : <div style={{ overflow: 'auto' }}>
                {
                    this.state.files.map(f =>
                        <Col md={2} sm={3} xsm={4}>
                            <div className="Files">
                                <img src={require('../../img/png.png')} alt="file" className="FileImage" />
                                <i style={{ color: 'black' }}>{f.name}</i>
                            </div>
                        </Col>
                    )
                }
                {
                    this.state.full ? <div className="FullUpload">
                        <br />
                        <br />
                        <h1 className='text-center text-danger'>Full</h1>
                    </div>
                        : <div></div>
                }
            </div>;
        let TokenClass = this.state.tokenIsOk ? "form-control Success" : "form-control Danger";
        return (
            <div className='container Admin'>
                <ToastContainer store={ToastStore} position={ToastContainer.POSITION.TOP_RIGHT} />
                <div className='AdminNav'>
                    <button className='btn btn-info AdminNavButton' onClick={() => ViraICO.GetFunds(r => alert(r))}>
                        Funds</button>
                    <button className='btn btn-info AdminNavButton' onClick={() => ViraICO.TotallSupply(r => alert(r))}>
                        Totall Supply</button>
                    <button className='btn btn-info AdminNavButton' onClick={() => ViraICO.SpentSupply(r => alert(r))}>
                        Spent Supply</button>
                    <button className='btn btn-info AdminNavButton' onClick={() => ViraICO.GetCount(r => alert(r))}>
                        Count</button>
                    <button className='btn btn-info AdminNavButton' onClick={() => ViraICO.GetPrice(r => alert(r))}>
                        Get Price</button>
                    <button className='btn btn-primary AdminNavButton' onClick={() => this.UpadetPrice()}>
                        UpdatePrice</button>
                    <button className='btn btn-primary AdminNavButton' onClick={() => this.GetCarpet()}>
                        Get Carpet</button>
                    <button className='btn btn-primary AdminNavButton' onClick={() => ViraICO.Withdraw()}>
                        Withdraw</button>
                </div>
                <form onSubmit={this.handleSubmit} className='AdminContent'>
                    <Grid fluid>
                        <Row>
                            <Col md={6}>
                                <div className="form-group">
                                    <label className="control-label">
                                        Token ID
                            <Glyphicon glyph='refresh' style={{ paddingLeft: '5px', cursor: 'pointer' }}
                                            onClick={() => this.GetGuid()} />
                                    </label>
                                    <br />
                                    <input type="text"
                                        placeholder="Name" value={this.state.token}
                                        onChange={this.handleInputChange} name="token" className={TokenClass}

                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <label className="control-label">
                                        Production Date
                          </label>
                                    <br />
                                    <input type="date"
                                        style={{ border: '1px solid #3080D6' }}
                                        value={this.state.production}
                                        onChange={this.handleInputChange} name="production" className="form-control"
                                        required
                                    />
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="form-group">
                                    <label className="control-label">
                                        Description
                           </label>
                                    <br />
                                    <textarea value={this.state.metaDate} name="metaDate" onChange={this.handleInputChange} className="form-control"
                                        rows={8}
                                    />
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="form-group">
                                    <label className="control-label">
                                        Images
                           </label>
                                    <br />
                                    <ReactDropzone
                                        className="form-control FileUploader"
                                        onDrop={this.onDrop}>
                                        {DragContent}
                                    </ReactDropzone>
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="form-group" style={{ float: 'right' }}>
                                    <input type="submit" value="Submit" className="form-control"
                                        className="btn btn-primary btnnnn"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </form>
                <div className='DangerZone'>
                    <button className='btn btn-danger AdminNavButton' onClick={() => ViraICO.InitiatingIsOver()}>
                        End Initiating</button>
                    <button className='btn btn-danger AdminNavButton' onClick={() => ViraICO.Kill()}>
                        Kill</button>
                </div>
            </div >
        );
    }

}