import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import { Statics } from '../Statics';
import { Web3s, ViraCoinToken } from '../Web3/Web3';
import './Submit.css';
import { ToastContainer, ToastStore } from 'react-toasts';
import ReactDropzone from "react-dropzone";
export class Submit extends Component {
  displayName = Submit.name
  constructor(props) {
    super(props);
    Statics.IsLogin();
    var now = new Date();
    this.state = {
      token: '',
      tokenHash: '',
      data: '',
      production: 0,
      registration: now.toISOString().slice(0, 10),
      currentOwner: Web3s.GetAccount(),
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
    fetch('Guid').then(res => res.json())
      .then(data =>
        this.setState({ token: data.Guid, tokenHash: data.HexString })
      ).catch(e => console.error(e));
  }
  UploadFile(formData) {
    fetch('api/api/Assets/Up', {
      method: 'POST',
      headers: {
        'PubKey': Web3s.GetAccount(),
        'PrivateToken': Statics.GetToken()
      }, body: formData
    })
      .then(response => {
        if (response.status === 200) {
          ToastStore.success('Files uploaded successfully.', 2000);
          response.json()
        }
        else {
          ToastStore.error('Something went wrong.', 2000);
        }
      })
      .then(data => this.setState({ imgPath: this.state.imgPath + ',' + data.data }))
      .catch(err => console.error(err));
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
    event.preventDefault();
    let data = Web3s.Hex(this.state.tokenHash);
    if (this.state.files.length > 0) {
      data = Web3s.Sha3(this.state.data);
    }
    ViraCoinToken.Issue(data
      , this.state.tokenHash,
      Math.round((new Date(this.state.production)).getTime() / 1000), this.Upload,
      this.state.tokenHash, this.state.production, this.state.registration, this.state.imgPath, this.state.metaDate);
  }
  Upload(r, IV, th, pr, reg, img, meta) {
    fetch('api/api/Assets', {
      method: 'POST',
      headers: {
        'PubKey': Web3s.GetAccount(),
        'PrivateToken': Statics.GetToken(),
        'Content-Type': 'application/json'
      }, body: JSON.stringify({
        token: Web3s.Hex(th),
        data: IV,
        production: pr,
        registration: reg,
        imgPath: img,
        tx: r,
        metaDate: meta
      })
    }).then(res => {
      if (res.status === 201) {
        alert('Changes saved successfully.');
      }
      else {
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
      this.setState({ full: true });
      return;
    }
    let formData = new FormData();
    files.forEach(f => {
      this.state.files.push(f);
      formData.append(this.state.files.length, f);
      this.GetBase64(f).then(x =>
        this.setState({ data: Web3s.Sha3(this.state.data + x) }));
    });
    this.UploadFile(formData);
    this.setState({ draged: true });
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
      <div >
        <ToastContainer store={ToastStore} position={ToastContainer.POSITION.TOP_RIGHT} />
        <div className='PopUp'>
          <div className='ComponentBaseStyle'>
            <form onSubmit={this.handleSubmit}>
              <Grid fluid>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <label className="control-label">
                        Token ID
                        <Glyphicon glyph='refresh' style={{ paddingLeft: '5px', cursor: 'pointer' }}
                          onClick={() => this.setState({ tokenIsOk: !this.state.tokenIsOk })} />
                      </label>
                      <br />
                      <input type="text"
                        style={{ cursor: 'not-allowed' }}
                        placeholder="Name" value={this.state.token}
                        onChange={this.handleInputChange} name="token" className={TokenClass}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label className="control-label">
                        Owner
                       </label>
                      <br />
                      <input type="text"
                        style={{ cursor: 'not-allowed' }}
                        placeholder="Name" value={this.state.currentOwner}
                        onChange={this.handleInputChange} name="currentOwner" className="form-control"
                        readOnly
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label className="control-label">
                        Registration Date
                        </label>
                      <br />
                      <input type="date"
                        style={{ cursor: 'not-allowed' }}
                        placeholder="Name" value={this.state.registration}
                        onChange={this.handleInputChange} name="registration" className="form-control"
                        readOnly
                      />
                    </div>
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