import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { SidebarPortal } from '@plone/volto/components';
import config from '@plone/volto/registry';
import CodeBlockSidebar from './Sidebar';

class CodeBlockEdit extends React.Component {
  constructor(props) {
    super();
    this.state = {
      code: props.data.code || '',
    };
  }

  editable = React.createRef();
  textarearef = React.createRef();
  componentDidUpdate(prevProps) {
    if (this.props.selected && this.editable.current) {
      this.editable.current.focus();
    }
    const element = this.textarearef.current;
    if (element.scrollHeight > element.clientHeight) {
      element.style.height = element.scrollHeight + 'px';
    }
  }

  handleChange = (event) => {
    const { block, data } = this.props;
    const element = event.target;
    const cleanedText = element.value;
    this.setState({ code: cleanedText });
    this.props.onChangeBlock(block, { ...data, code: cleanedText });
    element.style.height = element.scrollHeight + 'px';
  };

  render = () => {
    const { block, data, onChangeBlock, selected } = this.props;
    const className = `code-block-wrapper edit ${data.style}`;
    const defaultLanguage =
      config.blocks?.blocksConfig?.codeBlock?.defaultLanguage;
    const defaultStyle = config.blocks?.blocksConfig?.codeBlock?.defaultStyle;
    if (data.language === undefined) {
      data.language = defaultLanguage;
      data.style = defaultStyle;
    }
    return (
      <div className="block code">
        <div className={className}>
          <textarea
            ref={this.textarearef}
            value={this.state.code}
            onChange={this.handleChange}
          />
          <SidebarPortal selected={selected}>
            <CodeBlockSidebar
              {...this.props}
              data={data}
              block={block}
              onChangeBlock={onChangeBlock}
            />
          </SidebarPortal>
        </div>
      </div>
    );
  };
}

export default withBlockExtensions(CodeBlockEdit);
