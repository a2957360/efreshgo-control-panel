import React, { useState, useEffect } from 'react';

// packages
import { useParams } from 'react-router-dom';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import _ from '@lodash';
import axios from '../../../../global/axios';

// components
import { Button, Icon, Tab, Tabs, TextField, MenuItem, InputAdornment } from '@material-ui/core';
import FuseLoading from '@fuse/core/FuseLoading';
import ImageUpload from './ImageUpload';
import BasicInfo_Zh from './BasicInfo_Zh';
import BasicInfo_En from './BasicInfo_En';

function ProductForm(props) {
	const { form, setForm, tabIdx, setAlert } = props;
	// const { itemNumber } = useParams();
	const [loading, setLoading] = useState(false);
	// 中文富文本
	const [editorState_Zh, setZhEditorState] = useState(
		BraftEditor.createEditorState(form.itemDescription.Zh)
	);
	// 英文富文本
	const [editorState_En, setEnEditorState] = useState(
		BraftEditor.createEditorState(form.itemDescription.En)
	);
	const [editorMedia, setEditorMedia] = useState([]); //TODO

	const handleZhEditorChange = editorState => {
		setZhEditorState(editorState);
		const content =JSON.parse( editorState.toRAW());
		setForm({...form, itemDescription: {...form.itemDescription, Zh: content}})
	};

	const handleEnEditorChange = editorState => {
		setEnEditorState(editorState);
		const content = JSON.parse(editorState.toRAW());
		setForm({...form, itemDescription: {...form.itemDescription, En: content}})
	};

	const handleEditorMediaUpload = async param => {
		const editorFormData = new FormData();
		editorFormData.append('uploadImages', param.file);
		editorFormData.append('isUploadImage', '1');
		const result = await axios.post('/imageModule.php', editorFormData);
		const imageURL = result.data.data[0];
		setEditorMedia(
			_.concat(editorMedia, {
				type: 'IMAGE',
				url: imageURL,
				id: imageURL.split('/').slice(-1)[0]
			})
		);
		param.success({
			url: imageURL,
			meta: {
				id: imageURL.split('/').slice(-1)[0],
				title: imageURL.split('/').slice(-1)[0],
				alt: imageURL.split('/').slice(-1)[0]
				//   loop: true, // 指定音视频是否循环播放
				//   autoPlay: true, // 指定音视频是否自动播放
				//   controls: true, // 指定音视频是否显示控制栏
				//   poster: 'http://xxx/xx.png', // 指定视频播放器的封面
			}
		});
	};

	if (!form || loading) {
		return <FuseLoading />;
	} else {
		return (
			<div className="p-16 sm:p-24 max-w-2xl">
				{tabIdx === 0 && <BasicInfo_Zh form={form} setForm={setForm} />}

				{tabIdx === 1 && <BasicInfo_En form={form} setForm={setForm} />}

				{tabIdx === 2 && <ImageUpload form={form} setForm={setForm} setLoading={setLoading} />}

				{tabIdx === 3 && (
					<div>
						<BraftEditor
							value={editorState_Zh}
							onChange={handleZhEditorChange}
							// onSave={submitContent}
							controls={['undo', 'redo', 'separator', 'media']}
							media={{
								// items: editorMedia,
								accepts: { image: true, video: false, audio: false },
								externals: { image: false, video: false, audio: false },
								uploadFn: handleEditorMediaUpload
							}}
						/>
					</div>
				)}

				{tabIdx === 4 &&
					<div>
						<BraftEditor
							value={editorState_En}
							onChange={handleEnEditorChange}
							// onSave={submitContent}
							controls={['undo', 'redo', 'separator', 'media']}
							media={{
								// items: editorMedia,
								accepts: { image: true, video: false, audio: false },
								externals: { image: false, video: false, audio: false },
								uploadFn: handleEditorMediaUpload
							}}
						/>
					</div>
				}

				{tabIdx === 5 && (
					<div>
						<TextField
							className="mt-8 mb-16"
							label={`最低起订量`}
							id="minimumUnit"
							name="minimumUnit"
							value={form.minimumUnit}
							InputProps={{
								endAdornment: <InputAdornment position="start">{form.itemUnit.Zh}</InputAdornment>
							}}
							type="number"
							variant="outlined"
							onChange={event => setForm({ ...form, minimumUnit: event.target.value })}
							fullWidth
						/>

						<TextField
							className="mt-8 mb-16"
							label="原价"
							id="itemPrice"
							name="itemPrice"
							value={form.itemPrice}
							InputProps={{
								startAdornment: <InputAdornment position="start">$</InputAdornment>
							}}
							type="number"
							variant="outlined"
							onChange={event => setForm({ ...form, itemPrice: event.target.value })}
							fullWidth
						/>

						<TextField
							className="mt-8 mb-16"
							label="活动价"
							id="itemSalesPrice"
							name="itemSalesPrice"
							value={form.itemSalesPrice}
							InputProps={{
								startAdornment: <InputAdornment position="start">$</InputAdornment>
							}}
							type="number"
							variant="outlined"
							onChange={event => setForm({ ...form, itemSalesPrice: event.target.value })}
							fullWidth
						/>
					</div>
				)}

			</div>
		);
	}
}

export default ProductForm;
