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
      data: '',
      production: 0,
      registration: now.toISOString().slice(0, 10),
      currentOwner: Web3s.GetAccount(),
      metaDate: '',
      imgPath1: '',
      imgPath2: '',
      imgPath3: '',
      imgPath4: '',
      imgPath5: '',
      imgPath6: '',
      imgPath7: '',
      imgPath8: '',
      files: [],
      draged: false,
      full: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    fetch('Guid').then(res => res.json())
      .then(data =>
        this.setState({ token: data.Guid })
      ).catch(e => console.error(e));
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
    ViraCoinToken.Issue(Web3s.Hex(this.state.token)
      , Web3s.Hex(this.state.token),
      1);

  }
  onDrop = (files) => {
    if (this.state.files.length === 9) {
      this.setState({ full: true });
      return;
    }
    files.forEach(f => {
      this.state.files.push(f);
    });
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
      </div>
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
                      </label>
                      <br />
                      <input type="text"
                        style={{ cursor: 'not-allowed' }}
                        placeholder="Name" value={this.state.token}
                        onChange={this.handleInputChange} name="token" className="form-control"
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