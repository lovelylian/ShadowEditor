import './css/EditorStatusBar.css';
import { classNames, PropTypes, Toolbar, ToolbarSeparator, Label, CheckBox, Button } from '../../third_party';
import Converter from '../../utils/Converter';
import TimeUtils from '../../utils/TimeUtils';
import VideoRecorder from '../../utils/VideoRecorder';

/**
 * 状态栏
 * @author tengge / https://github.com/tengge1
 */
class EditorStatusBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            objects: 0,
            vertices: 0,
            triangles: 0,
            showStats: app.storage.get('showStats') === undefined ? true : app.storage.get('showStats'),
            showViewHelper: app.storage.get('showViewHelper') === undefined ? true : app.storage.get('showViewHelper'),
            isThrowBall: false,
            isRecording: false,
        };

        this.handleShowStats = this.handleShowStats.bind(this);
        this.handleShowViewHelper = this.handleShowViewHelper.bind(this);
        this.handleEnableThrowBall = this.handleEnableThrowBall.bind(this);
        this.handleScreenshot = this.handleScreenshot.bind(this);
        this.handleRecord = this.handleRecord.bind(this);
    }

    render() {
        const { objects, vertices, triangles, showStats, showViewHelper, isThrowBall, isRecording } = this.state;

        return <Toolbar className={'EditorStatusBar'}>
            <Label>{_t('Object')}</Label>
            <Label>{objects}</Label>
            <Label>{_t('Vertex')}</Label>
            <Label>{vertices}</Label>
            <Label>{_t('Triangle')}</Label>
            <Label>{triangles}</Label>
            <ToolbarSeparator></ToolbarSeparator>
            <Label>{_t('Show Stats')}</Label>
            <CheckBox checked={showStats} onChange={this.handleShowStats}></CheckBox>
            <Label>{_t('View Helper')}</Label>
            <CheckBox checked={showViewHelper} onChange={this.handleShowViewHelper}></CheckBox>
            <Label>{_t('ThrowBall')}</Label>
            <CheckBox checked={isThrowBall} onChange={this.handleEnableThrowBall}></CheckBox>
            <ToolbarSeparator></ToolbarSeparator>
            <Button onClick={this.handleScreenshot}>{_t('Screenshot')}</Button>
            <Button onClick={this.handleRecord}>{isRecording ? _t('Cancel') : _t('Record')}</Button>
        </Toolbar>;
    }

    componentDidMount() {
        app.on('objectAdded.' + this.id, this.onUpdateInfo.bind(this));
        app.on('objectRemoved.' + this.id, this.onUpdateInfo.bind(this));
        app.on('geometryChanged.' + this.id, this.onUpdateInfo.bind(this));
    }

    onUpdateInfo() {
        var editor = app.editor;

        var scene = editor.scene;

        var objects = 0,
            vertices = 0,
            triangles = 0;

        for (var i = 0, l = scene.children.length; i < l; i++) {
            var object = scene.children[i];

            object.traverseVisible(function (object) {
                objects++;

                if (object instanceof THREE.Mesh) {
                    var geometry = object.geometry;

                    if (geometry instanceof THREE.Geometry) {
                        vertices += geometry.vertices.length;
                        triangles += geometry.faces.length;
                    } else if (geometry instanceof THREE.BufferGeometry) {
                        if (geometry.index !== null) {
                            vertices += geometry.index.count * 3;
                            triangles += geometry.index.count;
                        } else if (geometry.attributes.position) {
                            vertices += geometry.attributes.position.count;
                            triangles += geometry.attributes.position.count / 3;
                        }
                    }
                }
            });
        }

        this.setState({
            objects: objects.format(),
            vertices: vertices.format(),
            triangles: triangles.format(),
        });
    }

    handleShowStats() {
        const showStats = !app.storage.get('showStats');
        app.storage.set('showStats', showStats);

        Object.assign(app.stats.dom.style, {
            display: showStats ? 'block' : 'none',
        });

        this.setState({
            showStats,
        });
    }

    handleShowViewHelper() {
        const showViewHelper = !app.storage.get('showViewHelper');
        app.storage.set('showViewHelper', showViewHelper);

        app.call(`storageChanged`, this, 'showViewHelper', showViewHelper);

        this.setState({
            showViewHelper,
        });
    }

    handleEnableThrowBall(checked) {
        app.call('enableThrowBall', this, checked);
    }

    handleScreenshot() {
        const canvas = app.editor.renderer.domElement;
        const dataUrl = Converter.canvasToDataURL(canvas);
        const file = Converter.dataURLtoFile(dataUrl, TimeUtils.getDateTime());
        debugger
    }

    handleRecord() {
        if (this.state.isRecording) {
            this.stopRecord();
        } else {
            this.startRecord();
        }
    }

    startRecord() {
        if (this.recorder === undefined) {
            this.recorder = new VideoRecorder();
        }

        this.recorder.start().then(success => {
            if (success) {
                this.setState({
                    isRecording: true,
                });
            }
        });
    }

    stopRecord() {
        if (!this.recorder) {
            return;
        }

        this.recorder.stop().then(() => {
            this.setState({
                isRecording: false,
            });
        });
    }
}

export default EditorStatusBar;