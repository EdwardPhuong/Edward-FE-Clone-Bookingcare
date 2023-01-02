import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import "./ManageSpecialty.scss";
import { LANGUAGES, CommonUtils } from "../../../utils";
import * as action from "../../../store/actions";
import userService from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			imageBase64: "",
			descriptionHTML: "",
			descriptionMarkdown: "",
			fileName: "",
		};
	}

	async componentDidMount() {}

	async componentDidUpdate(prevProps, prevState, snapshot) {}

	handleOnChangeInput = (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		this.setState({
			...copyState,
		});
	};

	handleEditorChange = ({ html, text }) => {
		this.setState({
			descriptionHTML: html,
			descriptionMarkdown: text,
		});
	};

	handleOnChangeImage = async (event) => {
		let data = event.target.files;
		let file = data[0];
		if (file) {
			let base64 = await CommonUtils.getBase64(file);
			this.setState({
				imageBase64: base64,
				fileName: file.name,
			});
		}
	};

	handleSaveNewSpecialty = async () => {
		let response = await userService.createNewSpecialty({
			name: this.state.name,
			imageBase64: this.state.imageBase64,
			descriptionHTML: this.state.descriptionHTML,
			descriptionMarkdown: this.state.descriptionMarkdown,
		});
		if (response && response.errCode === 0) {
			toast.success("Successfully created new specialty !");
			this.setState({
				name: "",
				imageBase64: "",
				descriptionHTML: "",
				descriptionMarkdown: "",
				fileName: "",
			});
		} else {
			toast.error("Error creating new specialty !");
			console.log("Edward Check Response: ", response);
		}
	};

	render() {
		let { language } = this.props;
		return (
			<div className="manage-specialty-container">
				<div className="ms-title">Quản Lý Chuyên Khoa</div>
				<div className="add-new-specialty row">
					<div className="col-6 form-group">
						<label>Tên Chuyên Khoa</label>
						<input
							className="form-control"
							type="text"
							value={this.state.name}
							onChange={(event) => this.handleOnChangeInput(event, "name")}
						/>
					</div>
					<div className="col-6 form-group">
						<div className="right-content-specialty">
							<label>Upload Ảnh Chuyên Khoa</label>
							<input
								id="previewImg"
								type="file"
								hidden
								onChange={(event) => this.handleOnChangeImage(event)}
							/>
							<div className="down">
								<label className="label-upload" htmlFor="previewImg">
									Tải Ảnh <i className="fas fa-upload"></i>
								</label>
								<label>{this.state.fileName}</label>
							</div>
						</div>
					</div>
					<div className="col-12">
						<MdEditor
							style={{ height: "500px" }}
							renderHTML={(text) => mdParser.render(text)}
							onChange={this.handleEditorChange}
							value={this.state.descriptionMarkdown}
						/>
					</div>
					<div className="col-12">
						<button
							className="btn-save-specialty"
							onClick={() => this.handleSaveNewSpecialty()}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
