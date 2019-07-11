const DpExample = () => {
  return (
    <DynamicPlaceholder
      sentences={['alex123', 'homie777', '420human', 'alcohater']}
      sentenceDelay={1500}
      render={dp => {
        const handleChange = event => {
          if (dp.isTyping) {
            dp.reset();
          }
          this.rootChangeHandler(event);
        };
        const focusHandler = () => dp.startTyping();
        const blurHandler = () => dp.reset();

        return (
          <input
            type="text"
            id=""
            placeholder={dp.placeholder}
            spellCheck={false}
            value={this.props.value}
            onChange={changeHandler}
            onFocus={focusHandler}
            onBlur={blurHandler}
            className="input"
          />
        );
      }}
    />
  );
};
