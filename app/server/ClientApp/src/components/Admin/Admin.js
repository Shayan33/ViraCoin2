import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import { Statics } from '../Statics';
import { Web3s, ViraICO } from '../Web3/Web3';
import './Admin.css';
import Modal from 'react-modal';
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
            fileIndex: 0,
            modalIsOpen: false,
            icodata: [],
            icoVale: 1000000000
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.GetGuid();

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
                ToastStore.success('Changes saved successfully.', 2000);
            } else {
                ToastStore.error('Something went wrong.', 2000);
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
    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {

    }
    SetICO() {
        let supp = prompt('enter supply in VC');
        let max = prompt('enter max stake for this phase');
        ViraICO.SetPhase(supp, max, r => console.log(r));
    }
    UpdateICO() {
        let supp = prompt('enter supply in VC');
        let max = prompt('enter max stake for this phase');
        ViraICO.UpdatePhase(supp, max, r => console.log(r));
    }
    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    UpadetPrice() {
        let pr = prompt('Enetr new price (X*Wei)', '5');
        ViraICO.UpdatePrice(pr);
    }
    ExceptionalContract() {
        let pr = prompt('Enetr contract address.');
        ViraICO.AddEceptionalContract(pr, x => console.log(x));
    }
    GetCarpet() {
        let pr = prompt('Enter Carpet Number', '1');
        ViraICO.GetCarpet(r => alert(r), pr);
    }
    GetICo() {
        var p = prompt('How much in %', 80);
        fetch('api/Account/ICORnd/' + p)
            .then(r => r.json())
            .then(d => this.setState({ icodata: d }))
            .catch(e => console.error(e));
        this.openModal();

    }
    GetAddICo() {
        var p = prompt('How much in %', 20);
        fetch('api/Account/AddICORnd/' + p)
            .then(r => r.json())
            .then(d => this.setState({ icodata: d }))
            .catch(e => console.error(e));
        this.openModal();

    }
    SubmitIcoAdd(id) {
        fetch('api/Account/' + id, {
            method: 'PATCH'
        })
            .catch(e => console.error(e));
    }
    render() {
        let modalData = <div>
            <Grid fluid>
                <Row>
                    {
                        this.state.icodata.map(i =>
                            <div className="ICOCOl">
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Full Name
                                     </label>
                                        <br />
                                        <label className='form-control'>{i.fullName}</label>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Public Key
                                     </label>
                                        <br />
                                        <label className='form-control'>{i.pubKey}</label>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">
                                            ID
                                     </label>
                                        <br />
                                        <label className='form-control'>{i.personalID}</label>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Email Address
                                     </label>
                                        <br />
                                        <label className='form-control'>{i.emailAddress}</label>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Phone Number
                                     </label>
                                        <br />
                                        <label className='form-control'>{i.phoneNumber}</label>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Cell Number
                                     </label>
                                        <br />
                                        <label className='form-control'>{i.cellNumber}</label>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Address
                                     </label>
                                        <br />
                                        <textarea value={i.address}
                                            className="form-control"
                                            rows={3}
                                            readOnly
                                        />
                                    </div>
                                </Col>
                                {i.gotICOCoin ?
                                    <div className="form-group">
                                        <button className="btn btn-danger" style={{ float: 'right' }}
                                            onClick={() => ViraICO.ICOAdd(i.pubKey, this.state.icoVale, r => console.log(r))}
                                        >Send More</button>
                                    </div>
                                    :
                                    <div>
                                        <div className="form-group">
                                            <button className="btn btn-primary" style={{ float: 'right', marginLeft: '5px' }}
                                                onClick={() => ViraICO.ConfirmForICO(i.pubKey, r => this.SubmitIcoAdd(i.id))}
                                            >Confirm for ICO</button>
                                            <button className="btn btn-danger" style={{ float: 'right' }}
                                                onClick={() => ViraICO.ICO(i.pubKey, this.state.icoVale, r => this.SubmitIcoAdd(i.id))}
                                            >Send</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    }
                </Row>
            </Grid>
        </div>
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
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    className="MModall"
                    contentLabel="Example Modal"
                >
                    <div style={{ float: 'right', cursor: 'pointer', fontSize: '23px' }} onClick={this.closeModal}>
                        <Glyphicon glyph="remove" className="text-danger" />
                    </div>
                    <input
                        type='number'
                        value={this.state.icoVale} name="icoVale" onChange={this.handleInputChange} className="form-control" />
                    <div style={{ marginTop: '33px' }} className="MModalll">
                        {modalData}
                    </div>
                </Modal>
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
                    <button className='btn btn-warning AdminNavButton' onClick={() => this.ExceptionalContract()}>
                        Excep Contract</button>
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
                <div className='WarningZone'>
                    <button className='btn btn-warning AdminNavButton' onClick={() => this.GetICo()} >
                        ICO</button>
                    <button className='btn btn-warning AdminNavButton' onClick={() => this.GetAddICo()} >
                        AddICO</button>
                    <button className='btn btn-warning AdminNavButton' onClick={() => this.SetICO()} >
                        Set ICO</button>
                    <button className='btn btn-warning AdminNavButton' onClick={() => this.UpdateICO()} >
                        Update ICO</button>
                    <button className='btn btn-warning AdminNavButton' onClick={() => this.UpadetPrice()} >
                        Update Price</button>
                </div>
                <div className='DangerZone'>
                    <button className='btn btn-danger AdminNavButton' onClick={() => ViraICO.Kill(r => console.log(r))}>
                        Kill</button>
                </div>
            </div >
        );
    }

}