import { Component } from 'react';

class DynamicPlaceholder extends Component {
  static defaultProps = {
    letterDelay: 100, // in milliseconds
    sentenceDelay: 1000, // in milliseconds
    loop: false,
  };

  get defaultPlaceholder() {
    return `${this.props.sentences.join(', ')}...`;
  }

  get initialState() {
    return {
      placeholder: this.defaultPlaceholder,
    };
  }

  get placeholder() {
    return this.state.placeholder;
  }

  get isTyping() {
    return this.timeouts.size > 0;
  }

  state = this.initialState;
  timeouts = new Set();

  typeString = (str, done) => {
    const strLength = str.length;
    const typeToIndex = index => {
      const isLastIndex = index === strLength - 1;
      const placeholder = str.substr(0, index + 1);
      this.setState({ placeholder }, () => {
        isLastIndex && done();
      });
    };

    for (let i = 0; i < strLength; i++) {
      const tmt = setTimeout(typeToIndex, i * this.props.letterDelay, i);
      this.timeouts.add(tmt);
    }
  };

  processSentence = index => {
    const sentencesLength = this.props.sentences.length;
    const afterSentenceTyped = () => {
      const tmt = setTimeout(() => {
        if (!this.props.loop && index + 1 === sentencesLength) {
          this.setState({ placeholder: '' });
          return;
        }

        const nextIndex = (index + 1) % sentencesLength;
        this.processSentence(nextIndex);
      }, this.props.sentenceDelay);
      this.timeouts.add(tmt);
    };

    this.typeString(this.props.sentences[index], afterSentenceTyped);
  };

  startTyping = () => {
    this.processSentence(0);
  };

  cleanUp = () => {
    this.timeouts.forEach(tmt => {
      clearTimeout(tmt);
    });
  };

  reset = done => {
    this.cleanUp();
    this.setState(this.initialState, done);
  };

  componentWillUnmount() {
    this.cleanUp();
  }

  render() {
    return this.props.render(this);
  }
}

export default DynamicPlaceholder;
