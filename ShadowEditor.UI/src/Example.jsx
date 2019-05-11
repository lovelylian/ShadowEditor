// form
import Button from './form/Button.jsx';
import CheckBox from './form/CheckBox.jsx';
import Form from './form/Form.jsx';
import FormControl from './form/FormControl.jsx';
import Input from './form/Input.jsx';
import Label from './form/Label.jsx';
import Radio from './form/Radio.jsx';
import TextArea from './form/TextArea.jsx';
import Toggle from './form/Toggle.jsx';

// icon
import Icon from './icon/Icon.jsx';

// layout
import Container from './layout/Container.jsx';
import HBoxLayout from './layout/HBoxLayout.jsx';
import TabLayout from './layout/TabLayout.jsx';
import VBoxLayout from './layout/VBoxLayout.jsx';

// menu
import DropDown from './menu/DropDown.jsx';
import DropDownItem from './menu/DropDownItem.jsx';
import DropDownSeparator from './menu/DropDownSeparator.jsx';
import MenuBar from './menu/MenuBar.jsx';
import MenuItem from './menu/MenuItem.jsx';

// panel
import Panel from './panel/Panel.jsx';

// toolbar
import Toolbar from './toolbar/Toolbar.jsx';

const Style = {
    container: {
        width: '100%',
        height: '100%',
    },
    dropDown: {
        display: 'none',
    },
    main: {
        flex: 1,
    },
    workspace: {
        flex: 1,
    },
    sideBar: {
        width: '280px',
    },
    halfSideBar: {
        height: '50%',
    }
};

/**
 * 示例
 */
class Example {
    render(container) {
        const component = (
            <VBoxLayout style={Style.container}>
                {/** 菜单栏 */}
                <MenuBar>
                    <MenuItem>Scene</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>2D</MenuItem>
                    <MenuItem>Geometry</MenuItem>
                    <MenuItem>Light</MenuItem>
                    <MenuItem>Assets</MenuItem>
                    <MenuItem>Component</MenuItem>
                    <MenuItem>Play</MenuItem>
                    <MenuItem>Tool</MenuItem>
                    <MenuItem>Options</MenuItem>
                    <MenuItem>Help</MenuItem>
                </MenuBar>
                {/*<DropDown style={Style.dropDown}>
                    <DropDownItem>New</DropDownItem>
                    <DropDownItem>Save</DropDownItem>
                    <DropDownItem>Save As</DropDownItem>
                    <DropDownSeparator></DropDownSeparator>
                    <DropDownItem>Export Scene</DropDownItem>
    </DropDown>*/}
                {/* 主体 */}
                <HBoxLayout style={Style.main}>
                    {/* 工具类 */}
                    <Toolbar direction='vertical'>
                        <Icon icon={'select'}></Icon>
                        <Icon icon={'translate'}></Icon>
                        <Icon icon={'rotate'}></Icon>
                        <Icon icon={'scale'}></Icon>
                        <Icon icon={'point'}></Icon>
                        <Icon icon={'line'}></Icon>
                        <Icon icon={'spray'}></Icon>
                        <Icon icon={'texture'}></Icon>
                    </Toolbar>
                    <VBoxLayout style={Style.workspace}>
                        <Form>
                            <FormControl>
                                <Label>First Name:</Label>
                                <Input />
                            </FormControl>
                            <FormControl>
                                <Label>Last Name:</Label>
                                <Input />
                            </FormControl>
                            <FormControl>
                                <Label>Password:</Label>
                                <Input />
                                <Label>Confirm Password:</Label>
                                <Input />
                            </FormControl>
                            <FormControl>
                                <Label>Description:</Label>
                                <TextArea></TextArea>
                            </FormControl>
                            <FormControl>
                                <Button>Default</Button>
                                <Button className={'primary'}>Primary</Button>
                                <Button className={'success'}>Success</Button>
                                <Button className={'warn'}>Warn</Button>
                                <Button className={'danger'}>Danger</Button>
                                <Button className={'disabled'}>Disabled</Button>
                            </FormControl>
                            <FormControl>
                                <CheckBox></CheckBox>
                                <CheckBox selected={true}></CheckBox>
                                <CheckBox disabled={true}></CheckBox>
                                <CheckBox selected={true} disabled={true}></CheckBox>
                            </FormControl>
                            <FormControl>
                                <Radio></Radio>
                                <Radio selected={true}></Radio>
                                <Radio disabled={true}></Radio>
                                <Radio selected={true} disabled={true}></Radio>
                            </FormControl>
                            <FormControl>
                                <Toggle></Toggle>
                                <Toggle selected={true}></Toggle>
                                <Toggle disabled={true}></Toggle>
                                <Toggle selected={true} disabled={true}></Toggle>
                            </FormControl>
                        </Form>
                        <Panel title={'Panel'}></Panel>
                    </VBoxLayout>
                    {/* 右侧边栏 */}
                    <VBoxLayout style={Style.sideBar}>
                        <TabLayout>
                            <Panel title={'Hierarchy'}></Panel>
                            <Panel title={'History'}></Panel>
                        </TabLayout>
                        <Panel></Panel>
                    </VBoxLayout>
                </HBoxLayout>
            </VBoxLayout>
        );

        ReactDOM.render(component, container);
    }
}

export default Example;