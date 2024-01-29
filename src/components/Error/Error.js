export const fetchError = (messageApi) => {
  messageApi.open({
    type: 'error',
    content: 'This is an error message',
  });
};
