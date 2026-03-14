export const sendMessage = async (message, onChunk) => {

  const response = await fetch("http://localhost:8000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let result = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value);
    result += chunk;

    // send partial response to UI
    onChunk(result);
  }

  return result;
};